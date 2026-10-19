import { base } from './entry.ts';
import { query } from './query.ts';
interface App { fetch(request: Request): Promise<Response> }
interface Target { fetch(request: Request, init: { cf: { cacheKey: string } }): Promise<Response> }
function canonical(request: Request): URL | undefined {
  if (!['GET', 'HEAD'].includes(request.method)) return;
  const url = new URL(request.url), path = url.pathname.replace(/\/$/, '') || '/';
  if (!(path === '/' || path === '/robots.txt' || path === base || path.startsWith(base + '/'))) return;
  const params = new URLSearchParams();
  if (path === '/') {
    if (url.searchParams.get('format') === 'json' || request.headers.get('Accept')?.includes('application/json')) params.set('format', 'json');
  } else if (path.startsWith(base + '/') && path.slice(base.length + 1).split('/').length <= 2) {
    const { search, category, offset, limit } = query(url);
    if (search) params.set('search', search);
    if (category) params.set('category', category);
    if (offset) params.set('offset', String(offset));
    if (limit !== 20) params.set('limit', String(limit));
  }
  params.sort(); url.pathname = path; url.search = params.toString(); url.hash = '';
  return url;
}
function present(response: Response, request: Request): Response {
  if (response.status !== 200 && response.status !== 304 || response.headers.has('Set-Cookie') || /\b(private|no-store)\b/.test(response.headers.get('Cache-Control') ?? '')) return response;
  const headers = new Headers(response.headers);
  headers.set('Cache-Control', 'public, max-age=60, must-revalidate');
  headers.set('Cloudflare-CDN-Cache-Control', 'no-store');
  headers.set('X-Cache', headers.get('CF-Cache-Status') ?? 'BYPASS');
  const etag = headers.get('ETag'), same = (tag: string) => tag.trim().replace(/^W\//, '');
  const matches = etag && request.headers.get('If-None-Match')?.split(',').some(tag => tag.trim() === '*' || same(tag) === same(etag));
  if (matches || response.status === 304) { headers.delete('Content-Length'); return new Response(null, { status: 304, headers }); }
  return new Response(request.method === 'HEAD' ? null : response.body, { status: response.status, headers });
}
// Executed only on a native Workers Caching miss. The gateway independently
// limits browser freshness; this inner representation is stored for a day.
export async function fill(request: Request, app: App, revision: string): Promise<Response> {
  const response = await app.fetch(request);
  if (response.status !== 200 || response.headers.has('Set-Cookie') || /\b(private|no-store)\b/.test(response.headers.get('Cache-Control') ?? '')) return response;
  const url = new URL(request.url), digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(url.pathname + url.search));
  const headers = new Headers(response.headers);
  headers.set('ETag', 'W/"' + revision + '-' + Array.from(new Uint8Array(digest), b => b.toString(16).padStart(2, '0')).join('') + '"');
  headers.set('Cache-Control', 'public, max-age=86400');
  headers.set('X-Catalog-Revision', revision);
  return new Response(response.body, { status: 200, headers });
}
export async function cached(request: Request, app: App, revision: string, target: Target): Promise<Response> {
  let url: URL | undefined;
  try { url = canonical(request); } catch { /* The service returns validation errors. */ }
  if (!url) return app.fetch(request);
  const headers = new Headers();
  if (url.searchParams.get('format') === 'json') headers.set('Accept', 'application/json');
  const conditional = request.headers.get('If-None-Match');
  if (conditional) headers.set('If-None-Match', conditional);
  // Only public representation headers enter the shared cache. Credentials,
  // cookies, and Access identity headers are never forwarded to this entrypoint.
  const inner = new Request(url, { method: request.method, headers });
  let response: Response;
  try { response = await target.fetch(inner, { cf: { cacheKey: revision + ':' + url.pathname + url.search } }); }
  catch { console.warn('Catalog cache unavailable; serving from source'); response = await fill(inner, app, revision); }
  return present(response, request);
}
