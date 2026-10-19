import tree from '../.generated/tree.json' with { type: 'json' };
import { service } from './service.ts';
import { cached, fill } from './cache.ts';
import { WorkerEntrypoint } from 'cloudflare:workers';
// An edge hit needs only the revision and cache key, not a rebuilt search index.
// This shared instance holds authored public catalog data, never request state.
let source: ReturnType<typeof service> | undefined;
const app = { fetch(request: Request) { source ??= service(tree); return source.fetch(request); } };
export class Reference extends WorkerEntrypoint {
  fetch(request: Request): Promise<Response> { return fill(request, app, tree.revision); }
}
export default {
  async fetch(request: Request, _env: Env, context: ExecutionContext): Promise<Response> {
    return cached(request, app, tree.revision, context.exports.Reference);
  },
};
