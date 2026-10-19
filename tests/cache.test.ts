import test from 'node:test';
import assert from 'node:assert/strict';
import { cached, fill } from '../src/cache.ts';
import { service } from '../src/service.ts';

const app = service({ version: 'test', revision: 'content-a', records: [{
  path: '/info/diagrams/architecture/context', catalog: 'diagrams', category: 'architecture',
  entry: { slug: 'context', name: 'System context', category: 'architecture', aliases: ['context'], keywords: ['system'], summary: 'System scope', blurb: 'System context recipe', additionalInfo: ['https://c4model.com/'] },
}] });

function harness() {
  const entries = new Map<string, Response>(); const tasks: Promise<unknown>[] = []; let calls = 0;
  const source = { async fetch(request: Request) { calls++; return app.fetch(request); } };
  return {
    entries, calls: () => calls, flush: () => Promise.all(tasks),
    fetch: (path: string, headers?: HeadersInit, revision = 'content-a', method = 'GET') => cached(new Request('https://mcp.susanb.dev' + path, { headers, method }), source, revision, {
      async fetch(request, init) {
        const key = init.cf.cacheKey, hit = entries.get(key);
        const response = hit?.clone() ?? await fill(new Request(request, { method: 'GET' }), source, revision);
        if (!hit && response.status === 200 && !response.headers.has('Set-Cookie') && !/no-store|private/.test(response.headers.get('Cache-Control') ?? '')) entries.set(key, response.clone());
        const headers = new Headers(response.headers); headers.set('CF-Cache-Status', hit ? 'HIT' : 'MISS');
        return new Response(response.body, { status: response.status, headers });
      },
    }),
  };
}

test('equivalent filters, ordering, defaults, and tracking parameters share one edge entry', async () => {
  const h = harness();
  const first = await h.fetch('/info/diagrams?category=&search=%22System%22&offset=0&limit=20');
  assert.equal(first.headers.get('X-Cache'), 'MISS'); await h.flush();
  const second = await h.fetch('/info/diagrams?utm_source=anything&search=system&category=%27%27');
  assert.equal(second.headers.get('X-Cache'), 'HIT');
  assert.equal(await first.text(), await second.text()); assert.equal(h.calls(), 1); assert.equal(h.entries.size, 1);
  assert.match(second.headers.get('Cache-Control')!, /max-age=60/);
  assert.equal(second.headers.get('Cloudflare-CDN-Cache-Control'), 'no-store');
});

test('revalidation returns a bodyless 304, HEAD shares GET, and revisions cannot serve old entries', async () => {
  const h = harness(), path = '/info/diagrams?search=system';
  const first = await h.fetch(path); const etag = first.headers.get('ETag')!; await h.flush();
  const conditional = await h.fetch(path, { 'If-None-Match': '"other", ' + etag });
  assert.equal(conditional.status, 304); assert.equal(await conditional.text(), '');
  assert.equal(conditional.headers.get('X-Cache'), 'HIT'); assert.match(conditional.headers.get('X-Robots-Tag')!, /noindex/);
  const head = await h.fetch(path, undefined, 'content-a', 'HEAD');
  assert.equal(head.status, 200); assert.equal(await head.text(), ''); assert.equal(head.headers.get('ETag'), etag);
  const next = await h.fetch(path, { 'If-None-Match': etag }, 'content-b');
  assert.equal(next.status, 200); assert.equal(next.headers.get('X-Cache'), 'MISS'); assert.notEqual(next.headers.get('ETag'), etag); assert.equal(h.calls(), 2);
});

test('HTML and JSON representations do not collide; failures and MCP writes are never cached', async () => {
  const h = harness();
  const html = await h.fetch('/'); await h.flush();
  const json = await h.fetch('/', { Accept: 'application/json' }); await h.flush();
  assert.match(html.headers.get('Content-Type')!, /text\/html/); assert.match(json.headers.get('Content-Type')!, /application\/json/);
  assert.notEqual(html.headers.get('ETag'), json.headers.get('ETag'));
  const size = h.entries.size;
  assert.equal((await h.fetch('/info/diagrams?limit=1000')).status, 400);
  assert.equal((await h.fetch('/info/missing')).status, 404);
  assert.equal((await h.fetch('/mcp', undefined, 'content-a', 'POST')).status, 415);
  await h.flush(); assert.equal(h.entries.size, size);
});

test('robots disallows every crawler and noindex applies to JSON, HTML, and errors', async () => {
  const robots = await app.fetch(new Request('https://mcp.susanb.dev/robots.txt'));
  assert.equal(await robots.text(), 'User-agent: *\nDisallow: /\n');
  for (const path of ['/', '/info/diagrams', '/info/missing', '/mcp', '/robots.txt']) {
    const response = await app.fetch(new Request('https://mcp.susanb.dev' + path));
    assert.equal(response.headers.get('X-Robots-Tag'), 'noindex, nofollow, noarchive, nosnippet');
  }
  const html = await app.fetch(new Request('https://mcp.susanb.dev/'));
  assert.match(await html.text(), /name="robots" content="noindex/);
});

test('cookie-bearing responses retain their uncacheable headers', async () => {
  const response = await fill(new Request('https://mcp.susanb.dev/info/diagrams'), { async fetch() { return new Response('private', { headers: { 'Set-Cookie': 'session=fixture' } }); } }, 'test');
  assert.equal(await response.text(), 'private'); assert.equal(response.headers.get('Cache-Control'), null); assert.equal(response.headers.get('Set-Cookie'), 'session=fixture');
});
test('caller credentials and identity headers never enter the cached entrypoint', async () => {
  const request = new Request('https://mcp.susanb.dev/info/diagrams?search=system', { headers: { Authorization: 'Bearer synthetic-fixture', Cookie: 'session=fixture', 'Cf-Access-Authenticated-User-Email': 'fixture@example.com' } });
  await cached(request, app, 'test', { async fetch(inner) {
    for (const name of ['Authorization', 'Cookie', 'Cf-Access-Authenticated-User-Email']) assert.equal(inner.headers.get(name), null);
    return fill(inner, app, 'test');
  } });
});
