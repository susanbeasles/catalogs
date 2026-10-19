import { Catalog } from './catalog.ts';
import type { Tree } from './entry.ts';
import { base } from './entry.ts';
import { mcp } from './mcp.ts';
import { page } from './page.ts';
import { query } from './query.ts';

export function service(tree: Tree) {
  const catalog = new Catalog(tree);
  const catalogs = [...new Set(tree.records.map(r => r.catalog))].sort().map(slug => ({ slug, path: base + '/' + slug, count: tree.records.filter(r => r.catalog === slug).length }));
  return {
    async fetch(request: Request): Promise<Response> {
      let response: Response;
      try {
        const url = new URL(request.url); const path = url.pathname.replace(/\/$/, '') || '/';
        if (request.method === 'OPTIONS') response = new Response(null, { status: 204 });
        else if (path === '/mcp') response = await mcp(request, catalog);
        else if (!['GET', 'HEAD'].includes(request.method)) response = new Response(null, { status: 405, headers: { Allow: 'GET, HEAD, OPTIONS' } });
        else if (path === '/robots.txt') response = new Response('User-agent: *\nDisallow: /\n', { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
        else if (path === '/' || path === base) response = path === base || url.searchParams.get('format') === 'json' || request.headers.get('Accept')?.includes('application/json') ? Response.json({ version: tree.version, revision: tree.revision, total: tree.records.length, catalogs, categories: catalog.categories(), mcp: '/mcp' }) : new Response(page, { headers: { 'Content-Type': 'text/html; charset=utf-8' } });
        else {
          const record = catalog.get(path); const segments = path.startsWith(base + '/') ? path.slice(base.length + 1).split('/') : [];
          if (record) response = Response.json(record);
          else if (segments.length >= 1 && segments.length <= 2 && catalog.records.some(r => r.catalog === segments[0] && (segments.length === 1 || r.category === segments[1]))) {
            const { search: text, category, offset, limit } = query(url);
            if (segments[1] && category && segments[1] !== category) throw new Error('Category filters disagree');
            const { query: search, ...result } = catalog.search(text, segments[0], segments[1] ?? category, offset, limit);
            response = Response.json({ search, ...result, results: result.results.map(item => {
              const entry = catalog.get(item.path)!.entry;
              return { ...item, blurb: entry.blurb, aliases: entry.aliases, additionalInfo: entry.additionalInfo };
            }), categories: catalog.categories(segments[0]) });
          } else response = Response.json({ error: 'Catalog path not found' }, { status: 404 });
        }
      } catch (error) { response = Response.json({ error: error instanceof Error ? error.message : 'Invalid request' }, { status: 400 }); }
      const headers = new Headers(response.headers);
      headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive, nosnippet');
      headers.set('X-Catalog-Revision', tree.revision);
      if (new URL(request.url).pathname === '/') headers.set('Vary', 'Accept');
      headers.set('Access-Control-Allow-Origin', '*'); headers.set('Access-Control-Allow-Methods', 'GET, HEAD, POST, OPTIONS');
      headers.set('Access-Control-Allow-Headers', 'Content-Type, MCP-Protocol-Version, Accept, If-None-Match');
      headers.set('Access-Control-Expose-Headers', 'ETag, X-Catalog-Revision, X-Cache, CF-Cache-Status');
      headers.set('X-Content-Type-Options', 'nosniff'); headers.set('Referrer-Policy', 'no-referrer'); headers.set('X-Frame-Options', 'DENY');
      headers.set('Content-Security-Policy', "default-src 'none'; script-src 'unsafe-inline'; style-src 'unsafe-inline'; connect-src 'self'; img-src 'self' data:; base-uri 'none'; form-action 'self'; frame-ancestors 'none'");
      if (!headers.has('Cache-Control')) headers.set('Cache-Control', request.method === 'GET' && response.ok ? 'public, max-age=60' : 'no-store');
      return new Response(request.method === 'HEAD' ? null : response.body, { status: response.status, headers });
    },
  };
}
