import { Catalog } from './catalog.ts';
import type { Tree } from './entry.ts';
import { mcp } from './mcp.ts';
import { page } from './page.ts';

export function service(tree: Tree) {
  const catalog = new Catalog(tree);
  const catalogs = [...new Set(tree.records.map(r => r.catalog))].sort().map(slug => ({ slug, path: '/' + slug, count: tree.records.filter(r => r.catalog === slug).length }));
  return {
    async fetch(request: Request): Promise<Response> {
      let response: Response;
      try {
        const url = new URL(request.url); const path = url.pathname.replace(/\/$/, '') || '/';
        if (request.method === 'OPTIONS') response = new Response(null, { status: 204 });
        else if (path === '/mcp') response = await mcp(request, catalog);
        else if (!['GET', 'HEAD'].includes(request.method)) response = new Response(null, { status: 405, headers: { Allow: 'GET, HEAD, OPTIONS' } });
        else if (path === '/') response = url.searchParams.get('format') === 'json' || request.headers.get('Accept')?.includes('application/json') ? Response.json({ version: tree.version, total: tree.records.length, catalogs, categories: catalog.categories(), mcp: '/mcp' }) : new Response(page, { headers: { 'Content-Type': 'text/html; charset=utf-8' } });
        else {
          const record = catalog.get(path); const segments = path.slice(1).split('/');
          if (record) response = Response.json(record);
          else if (segments.length <= 2 && catalog.records.some(r => r.catalog === segments[0] && (segments.length === 1 || r.category === segments[1]))) {
            const query = url.searchParams.get('q') ?? '', offset = Number(url.searchParams.get('offset') ?? 0), limit = Number(url.searchParams.get('limit') ?? 20);
            response = Response.json({ ...catalog.search(query, segments[0], segments[1], offset, limit), categories: catalog.categories(segments[0]) });
          } else response = Response.json({ error: 'Catalog path not found' }, { status: 404 });
        }
      } catch (error) { response = Response.json({ error: error instanceof Error ? error.message : 'Invalid request' }, { status: 400 }); }
      const headers = new Headers(response.headers);
      headers.set('Access-Control-Allow-Origin', '*'); headers.set('Access-Control-Allow-Methods', 'GET, HEAD, POST, OPTIONS');
      headers.set('Access-Control-Allow-Headers', 'Content-Type, MCP-Protocol-Version, Accept');
      headers.set('X-Content-Type-Options', 'nosniff'); headers.set('Referrer-Policy', 'no-referrer'); headers.set('X-Frame-Options', 'DENY');
      headers.set('Content-Security-Policy', "default-src 'none'; script-src 'unsafe-inline'; style-src 'unsafe-inline'; connect-src 'self'; img-src 'self' data:; base-uri 'none'; form-action 'self'; frame-ancestors 'none'");
      if (!headers.has('Cache-Control')) headers.set('Cache-Control', request.method === 'GET' && response.ok ? 'public, max-age=60' : 'no-store');
      return new Response(request.method === 'HEAD' ? null : response.body, { status: response.status, headers });
    },
  };
}
