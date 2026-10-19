import { test } from 'node:test';
import assert from 'node:assert/strict';
import { service } from '../src/service.ts';
import { Catalog } from '../src/catalog.ts';
import type { Tree } from '../src/entry.ts';

const tree: Tree = { version: 'test', records: [
  { path: '/diagrams/architecture/context', catalog: 'diagrams', category: 'architecture', entry: { slug: 'context', name: 'System context', category: 'architecture', aliases: ['C4 context'], keywords: ['system', 'people', 'external', 'boundaries', 'architecture'], summary: 'Show the system and external actors.', blurb: 'Use to explain system scope and external actors.', additionalInfo: ['https://c4model.com/diagrams/system-context'] } },
  { path: '/diagrams/distribution/histogram', catalog: 'diagrams', category: 'distribution', entry: { slug: 'histogram', name: 'Histogram', category: 'distribution', aliases: ['frequency distribution'], keywords: ['distribution', 'bins', 'frequency', 'observations', 'spread'], summary: 'Show the distribution of observations.', blurb: 'Count observations in numeric bins, retaining denominators.', additionalInfo: ['https://vega.github.io/vega-lite/examples/histogram.html'] } },
] };
const app = service(tree);
test('directory paths expose definitions, categories, and the catalog without route registration', async () => {
  const response = await app.fetch(new Request('https://example.com/diagrams/architecture/context'));
  assert.equal(response.status, 200); assert.equal((await response.json() as { entry: { slug: string } }).entry.slug, 'context');
  assert.equal((await (await app.fetch(new Request('https://example.com/diagrams/architecture'))).json() as { total: number }).total, 1);
  assert.equal((await app.fetch(new Request('https://example.com/diagrams/unknown'))).status, 404);
});
test('search ranks exact names and aliases, filters categories, and paginates', () => {
  const c = new Catalog(tree);
  assert.equal(c.search('frequency distribution').results[0]!.slug, 'histogram');
  assert.equal(c.search('C4 context').results[0]!.slug, 'context');
  assert.equal(c.search('', 'diagrams', 'architecture').total, 1);
  const page = c.search('', undefined, undefined, 0, 1); assert.equal(page.nextOffset, 1);
  assert.notEqual(page.results[0]!.slug, c.search('', undefined, undefined, 1, 1).results[0]!.slug);
  assert.throws(() => c.search('', undefined, undefined, -1), /invalid/i);
});
test('MCP initializes, discovers tools, searches and reads complete recipes without authentication', async () => {
  async function rpc(method: string, params: unknown) {
    const r = await app.fetch(new Request('https://example.com/mcp', { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json, text/event-stream' }, body: JSON.stringify({ jsonrpc: '2.0', id: 1, method, params }) }));
    assert.equal(r.status, 200); return r.json() as Promise<{ error?: { code: number }; result: { protocolVersion?: string; tools?: { name: string }[]; structuredContent?: { results?: { path: string }[]; entry?: { blurb: string } }; isError?: boolean } }>;
  }
  assert.equal((await rpc('initialize', { protocolVersion: '2025-11-25', clientInfo: { name: 'test', version: '1' }, capabilities: {} })).result.protocolVersion, '2025-11-25');
  assert.ok((await rpc('tools/list', {})).result.tools!.some(t => t.name === 'catalog_get'));
  const search = await rpc('tools/call', { name: 'catalog_search', arguments: { query: 'external actors' } });
  const path = search.result.structuredContent!.results![0]!.path;
  const recipe = await rpc('tools/call', { name: 'catalog_get', arguments: { path } });
  assert.match(recipe.result.structuredContent!.entry!.blurb, /external actors/);
  assert.equal((await rpc('tools/call', { name: 'catalog_search', arguments: { limit: '5' } })).error!.code, -32602);
  for (const name of ['toString', 'constructor', '__proto__']) assert.equal((await rpc('tools/call', { name, arguments: {} })).error!.code, -32602);
  assert.equal((await rpc('initialize', [])).error!.code, -32602);
});
test('public endpoint rejects writes, oversized requests, and unknown methods', async () => {
  assert.equal((await app.fetch(new Request('https://example.com/diagrams', { method: 'DELETE' }))).status, 405);
  assert.equal((await app.fetch(new Request('https://example.com/mcp'))).status, 405);
  assert.equal((await app.fetch(new Request('https://example.com/mcp', { method: 'OPTIONS' }))).status, 204);
  assert.equal((await app.fetch(new Request('https://example.com/mcp', { method: 'POST', headers: { 'Content-Type': 'application/json', 'MCP-Protocol-Version': 'bogus' }, body: '{}' }))).status, 400);
  assert.equal((await app.fetch(new Request('https://example.com/mcp', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: 'x'.repeat(17000) }))).status, 413);
});
