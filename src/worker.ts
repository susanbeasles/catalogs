import tree from '../.generated/tree.json' with { type: 'json' };
import { service } from './service.ts';
import { cached } from './cache.ts';
// An edge hit needs only the revision and cache key, not a rebuilt search index.
// This shared instance holds authored public catalog data, never request state.
let source: ReturnType<typeof service> | undefined;
const app = { fetch(request: Request) { source ??= service(tree); return source.fetch(request); } };
export default {
  async fetch(request: Request, _env: unknown, context: { waitUntil(task: Promise<unknown>): void }): Promise<Response> {
    if (!['GET', 'HEAD'].includes(request.method) || new URL(request.url).pathname === '/mcp') return app.fetch(request);
    let storage: Cache;
    try { storage = await caches.open('catalogs'); }
    catch { console.warn('Catalog cache unavailable; serving from source'); return app.fetch(request); }
    return cached(request, app, tree.revision, storage, task => context.waitUntil(task));
  },
};
