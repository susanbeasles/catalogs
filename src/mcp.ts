import { Catalog } from './catalog.ts';
import { object } from './entry.ts';
import { rules } from './rules.ts';

const textField = { type: 'string', maxLength: 300 };
const schema = (properties: object, required: string[] = []) => ({ type: 'object', properties, required, additionalProperties: false });
const annotations = { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false };
class InputError extends Error {}
export const tools = [
  { name: 'catalog_search', description: 'Find catalog entries by intent, name, aliases, category, and keywords. Returns ranked concise summaries and canonical paths. Search, then fetch the best candidates for complete recipes.', inputSchema: schema({ query: textField, catalog: textField, category: textField, offset: { type: 'integer', minimum: 0 }, limit: { type: 'integer', minimum: 1, maximum: 50 } }), annotations },
  { name: 'catalog_get', description: 'Read the main blurb and recipe, keywords, metadata, and source URLs for one exact catalog path. For diagrams, includes the shared layout requirements.', inputSchema: schema({ path: textField }, ['path']), annotations },
  { name: 'catalog_compare', description: 'Compare two to four candidate entries side by side using their complete definitions and source links. Select according to use and avoidance criteria rather than visual novelty.', inputSchema: schema({ paths: { type: 'array', minItems: 2, maxItems: 4, uniqueItems: true, items: textField } }, ['paths']), annotations },
  { name: 'catalog_categories', description: 'List catalog categories with their exact URL paths and entry counts. Omit catalog to see all catalogs.', inputSchema: schema({ catalog: textField }), annotations },
  { name: 'diagram_rules', description: 'Read diagramming requirements: semantics, short labels, no crossing connectors or text collisions, boundary padding, accessibility, and rendered review.', inputSchema: schema({}), annotations },
];
const string = (value: unknown, fallback?: string): string | undefined => {
  if (value === undefined) return fallback;
  if (typeof value !== 'string' || value.length > 300) throw new InputError('Expected a string of at most 300 characters');
  return value;
};
export function call(catalog: Catalog, name: string, value: unknown): unknown {
  let args: { [key: string]: unknown };
  try { args = object(value ?? {}); } catch { throw new InputError('Tool arguments must be an object'); }
  const get = (path: unknown) => {
    const text = string(path); if (!text) throw new InputError('A canonical path is required');
    const record = catalog.get(text); if (!record) throw new Error('Catalog entry not found');
    return record;
  };
  const allowed: { [key: string]: string[] } = { catalog_search: ['query', 'catalog', 'category', 'offset', 'limit'], catalog_get: ['path'], catalog_compare: ['paths'], catalog_categories: ['catalog'], diagram_rules: [] };
  if (!Object.hasOwn(allowed, name) || Object.keys(args).some(k => !allowed[name]!.includes(k))) throw new InputError('Unknown tool or argument');
  if (name === 'catalog_search') {
    if (args.offset !== undefined && (!Number.isSafeInteger(args.offset) || Number(args.offset) < 0) || args.limit !== undefined && (!Number.isSafeInteger(args.limit) || Number(args.limit) < 1 || Number(args.limit) > 50)) throw new InputError('Invalid search pagination');
    return catalog.search(string(args.query, ''), string(args.catalog), string(args.category), Number(args.offset ?? 0), Number(args.limit ?? 20));
  }
  if (name === 'catalog_get') { const record = get(args.path); return { ...record, ...(record.catalog === 'diagrams' ? { rules } : {}) }; }
  if (name === 'catalog_compare') {
    if (!Array.isArray(args.paths) || args.paths.length < 2 || args.paths.length > 4 || new Set(args.paths).size !== args.paths.length) throw new InputError('Compare two to four distinct paths');
    return { entries: args.paths.map(get), rules };
  }
  if (name === 'catalog_categories') return { categories: catalog.categories(string(args.catalog)) };
  return rules;
}
const response = (value: unknown, status = 200) => Response.json(value, { status, headers: { 'Cache-Control': 'no-store' } });
export async function mcp(request: Request, catalog: Catalog): Promise<Response> {
  if (request.method !== 'POST') return new Response(null, { status: 405, headers: { Allow: 'POST' } });
  if (!request.headers.get('content-type')?.includes('application/json')) return response({ error: 'Use application/json' }, 415);
  const supported = ['2025-03-26', '2025-06-18', '2025-11-25'];
  const version = request.headers.get('MCP-Protocol-Version');
  if (version && !supported.includes(version)) return response({ error: 'Unsupported MCP protocol version' }, 400);
  const reader = request.body?.getReader(); if (!reader) return response({ error: 'Missing JSON-RPC request' }, 400);
  const chunks: Uint8Array[] = []; let bytes = 0;
  while (true) {
    const data = await reader.read(); if (data.done) break; bytes += data.value.length;
    if (bytes > 16_384) { await reader.cancel(); return response({ error: 'Request exceeds 16 KiB' }, 413); }
    chunks.push(data.value);
  }
  let body: { [key: string]: unknown };
  try {
    const merged = new Uint8Array(bytes); let offset = 0; for (const chunk of chunks) { merged.set(chunk, offset); offset += chunk.length; }
    body = object(JSON.parse(new TextDecoder().decode(merged)));
  } catch { return response({ jsonrpc: '2.0', id: null, error: { code: -32700, message: 'Invalid JSON request' } }, 400); }
  const id = body.id;
  if (body.jsonrpc !== '2.0' || typeof body.method !== 'string' || id !== undefined && typeof id !== 'string' && typeof id !== 'number') return response({ jsonrpc: '2.0', id: null, error: { code: -32600, message: 'Invalid JSON-RPC request' } }, 400);
  if (id === undefined) return new Response(null, { status: 202 });
  const result = (result: unknown) => response({ jsonrpc: '2.0', id, result });
  const error = (code: number, message: string) => response({ jsonrpc: '2.0', id, error: { code, message } });
  if (body.method === 'initialize') {
    let params: { [key: string]: unknown };
    try { params = object(body.params); object(params.capabilities); const client = object(params.clientInfo); if (typeof params.protocolVersion !== 'string' || typeof client.name !== 'string' || typeof client.version !== 'string') throw new Error(); }
    catch { return error(-32602, 'Invalid initialize parameters'); }
    return result({ protocolVersion: supported.includes(String(params.protocolVersion)) ? params.protocolVersion : '2025-11-25', serverInfo: { name: 'catalogs', version: '0.1.0' }, capabilities: { tools: {} }, instructions: 'Read-only public reference catalogs. Search by intent, fetch the complete definition, and apply its criteria and diagram_rules. These tools do not access an Excalidraw account or save scenes.' });
  }
  if (body.method === 'ping') return result({});
  if (body.method === 'tools/list') {
    try { const params = object(body.params ?? {}); if (params.cursor !== undefined) return error(-32602, 'This server has no paginated tool list'); }
    catch { return error(-32602, 'Invalid tools/list parameters'); }
    return result({ tools });
  }
  if (body.method === 'tools/call') {
    let params: { [key: string]: unknown };
    try { params = object(body.params); if (typeof params.name !== 'string') throw new Error(); }
    catch { return error(-32602, 'Invalid tools/call parameters'); }
    try { const value = call(catalog, String(params.name), params.arguments); return result({ content: [{ type: 'text', text: JSON.stringify(value) }], structuredContent: object(value), isError: false }); }
    catch (e) { if (e instanceof InputError) return error(-32602, e.message); return result({ content: [{ type: 'text', text: e instanceof Error ? e.message : 'Tool execution failed' }], isError: true }); }
  }
  return error(-32601, 'Method not found');
}
