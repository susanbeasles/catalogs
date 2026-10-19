import { base } from './entry.ts';
import { query } from './query.ts';

interface Storage {
  match(request: Request): Promise<Response | undefined>;
  put(request: Request, response: Response): Promise<void>;
}
interface App { fetch(request: Request): Promise<Response> }
const edgeTtl = 86_400;

function key(request: Request, revision: string): Request | undefined {
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
  params.sort(); url.pathname = '/__catalogs/' + revision + path; url.search = params.toString(); url.hash = '';
  return new Request(url, { method: 'GET' });
}

function present(response: Response, request: Request, state: 'HIT' | 'MISS'): Response {
  const headers = new Headers(response.headers);
  headers.set('Cache-Control', 'public, max-age=60, must-revalidate');
  // Internal versioned entries live for a day. An outer, unversioned CDN entry
  // must not mask a newly deployed Worker and its new content revision.
  headers.set('Cloudflare-CDN-Cache-Control', 'no-store');
  headers.set('X-Cache', state);
  const etag = headers.get('ETag');
  const same = (tag: string) => tag.trim().replace(/^W\//, '');
  const matches = etag && request.headers.get('If-None-Match')?.split(',').some(tag => tag.trim() === '*' || same(tag) === same(etag));
  if (matches) { headers.delete('Content-Length'); return new Response(null, { status: 304, headers }); }
  return new Response(request.method === 'HEAD' ? null : response.body, { status: response.status, headers });
}

export async function cached(request: Request, app: App, revision: string, storage: Storage, waitUntil: (task: Promise<unknown>) => void): Promise<Response> {
  let cacheKey: Request | undefined;
  try { cacheKey = key(request, revision); } catch { /* The service returns the validation error. */ }
  if (!cacheKey) return app.fetch(request);
  try {
    const hit = await storage.match(cacheKey);
    if (hit) return present(hit, request, 'HIT');
  } catch { console.warn('Catalog cache read failed; serving from source'); }
  const response = await app.fetch(new Request(request, { method: 'GET' }));
  if (response.status !== 200 || response.headers.has('Set-Cookie') || /\b(private|no-store)\b/.test(response.headers.get('Cache-Control') ?? '')) {
    return request.method === 'HEAD' ? new Response(null, { status: response.status, headers: response.headers }) : response;
  }
  const headers = new Headers(response.headers);
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(cacheKey.url));
  headers.set('ETag', 'W/"' + revision + '-' + Array.from(new Uint8Array(digest), b => b.toString(16).padStart(2, '0')).join('') + '"');
  headers.set('Cache-Control', `public, max-age=${edgeTtl}, immutable`);
  headers.delete('Cloudflare-CDN-Cache-Control');
  const entry = new Response(response.body, { status: 200, headers });
  waitUntil(storage.put(cacheKey, entry.clone()).catch(() => { console.warn('Catalog cache write failed; response still served'); }));
  return present(entry, request, 'MISS');
}
