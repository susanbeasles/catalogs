# Catalogs

A small, public CMS whose file structure is its router. Definitions are JSON data; the service is TypeScript running on Cloudflare Workers.

The initial [diagram catalog](docs/catalog.md) contains **312 definitions in 24 categories**, including architecture, data flows, statistical charts, decisions, planning, service design, and maps.

The public reference API is [GET https://mcp.susanb.dev/info/diagrams?category=&search=dataflow](https://mcp.susanb.dev/info/diagrams?category=&search=dataflow). It returns JSON directly, without authentication or a JSON-RPC envelope.

```text
app/
  diagrams/
    architecture/
      system-context/
        index.json           Main blurb and construction recipe
        keywords.json        Search terms
        meta.json            Name, slug, aliases
        additionalInfo.json  Supporting URLs
```

This folder becomes `/info/diagrams/architecture/system-context`. `/info` is the reference namespace; the remaining path follows the directory tree. The category and catalog are inferred from the path. The slug in `meta.json` must equal the entry directory. No route registration or database migration is required.

`index.json` contains a Markdown string, beginning with a concise summary. Keep the actual explanation, selection criteria, visual grammar, construction, checks, pitfalls, example, and alternatives here. `keywords.json` and `additionalInfo.json` are string arrays. `meta.json` is `{ "slug": "system-context", "name": "System context diagram", "aliases": ["C4 context"] }`.

The shared [JSON Schema](schemas/definition.schema.json) and [TypeScript type](src/entry.ts) describe the contract. Included editor settings associate each of the four files with its schema. Builds reject malformed data, incomplete entries, duplicate names/slugs, mismatched slugs, unexpected files, and symlinks. Catalog files are parsed as data and never executed.

Read the [diagramming guide](docs/diagramming.md) before drawing. It covers semantic boundaries, data shapes, connector routing, spacing, concise labels, accessibility, and rendered review. The numeric layout defaults are house rules.

## Read and search

- `GET /info`: catalogs, categories, counts, and service version.
- `GET /info/diagrams?category=&search=dataflow`: ranked, complete definitions, including the main blurb, keywords, aliases, and source URLs.
- `GET /info/diagrams?category=data-engineering&search=dataflow&limit=10&offset=0`: category filtering and pagination. Empty category means all categories; maximum page size is 50.
- `GET /info/diagrams/<category>/<slug>`: one complete definition.
- `GET /info/<catalog>`: the same API for any additional catalog under `app/`.

Quotation marks, whitespace, and case are normalized in filters. `category=''&search="dataflow"` and `category=&search=dataflow` mean the same thing. Every result contains its canonical `/info/...` path. Search ranks names, aliases, keywords, summaries, and blurb text; matched terms are returned for inspection.

## Caching and crawlers

Successful reference GETs use [Workers Caching](https://developers.cloudflare.com/workers/cache/) for 24 hours. The uncached gateway normalizes filters and invokes a cached `Reference` entrypoint through an in-process loopback. Equivalent filters, query ordering, default pagination, empty values, and tracking parameters share one cache key. A cache hit skips the reference handler and search-index initialization. The Cache API is deliberately avoided because Cloudflare does not support it behind Access.

Each key includes a SHA-256 revision of the catalog, serving code, build code, dependency lock, and runtime configuration. Native cache keys also include the deployed Worker version; cross-version reuse is disabled. Changes therefore invalidate edge results automatically. Caller authorization, cookies, and Access identity headers never enter the shared reference entrypoint. Cache failures fall back to the source.

Clients may reuse responses for 60 seconds. ETags support bodyless `304` responses; HEAD uses the same cached representation as GET. `X-Cache` reports HIT or MISS and `X-Catalog-Revision` identifies the source revision. An outer unversioned Cloudflare CDN entry is disabled to prevent it masking deployment invalidation. Errors, cookie-bearing/private responses, and POST operations are excluded from shared caching.

`/robots.txt` disallows all crawling. Every application response carries `X-Robots-Tag: noindex, nofollow, noarchive, nosnippet`; HTML also includes a matching robots meta tag.

## Optional MCP adapter

The existing Streamable HTTP adapter at `https://catalogs.anthonyvespoli.workers.dev/mcp` provides `catalog_search`, `catalog_get`, `catalog_compare`, `catalog_categories`, and `diagram_rules`. All are read-only. The plain GET API above is the primary reference interface.

Connect any compatible client to the deployed `/mcp` URL without authentication. This public service contains generic reference material only. It cannot access paid Excalidraw accounts, create scenes, or store backups. Those operations belong to the separate authenticated Excalidraw+ companion.

For clients that accept an MCP JSON configuration:

```json
{
  "mcpServers": {
    "catalogs": {
      "type": "http",
      "url": "https://catalogs.anthonyvespoli.workers.dev/mcp"
    }
  }
}
```

Client configuration syntax varies; use the remote HTTP or Streamable HTTP transport. A useful first call is `catalog_search` with `{ "query": "dataset provenance lineage", "limit": 5 }`, followed by `catalog_get` with the selected result's `path`.

Cloudflare currently rejects the legacy `Python-urllib/3.9` user agent before requests reach this Worker (error 1010). Node fetch, curl, and requests carrying the tested `python-httpx/0.28.1` or `modelcontextprotocol/1.0` user agents return successfully. Use a current MCP client; the service itself requires no authentication.

## Add a catalog

Create `app/<catalog>/<category>/<slug>/` with the same four definition files. Run `npm run verify`, commit, and push to `main`. The new tree is indexed and exposed at `/info/<catalog>` automatically. Catalog names, categories, and slugs use lowercase kebab-case. A category has no separate metadata file.

Do not add synonym entries to inflate catalog size. Keep aliases on the canonical entry. A variant deserves its own definition when its encoding, selection criteria, or semantic grammar changes. Cite primary sources and distinguish a formal notation from an explanatory pattern view.

## Develop and deploy

Requires Node 24+. Install with `npm ci`; use `npm run dev` for a local Worker. `npm run verify` builds the directory index, checks types, runs tests, and bundles a dry-run deployment. `npm run deploy` publishes through Wrangler for an authenticated operator.

Cloudflare Workers Builds connects this repo's `main` branch to the Worker. The build command is `npm run verify`, followed by `npx wrangler deploy`. Pull requests run the validation workflow without deployment credentials. The build fails before publication if definitions or checks fail.

After validation, main's CI uses a branch-scoped deploy hook stored as the encrypted `CATALOGS_DEPLOY_HOOK` repository secret. It checks the deployed content revision and waits for the validated revision to become live. Unchanged runtime revisions skip a redundant deployment. Hook definitions and their secure provisioning helper live in `infra`; capability URLs are never committed or logged.

Infrastructure is defined in [`susanbeasles/infra/environments/production/catalogs`](https://github.com/susanbeasles/infra/tree/feat/catalogs/environments/production/catalogs): existing resource adoption, the exact-host public Access policy, and native build settings. This repository owns content and application releases.

Only authored reference data and application source belong here. Keep account keys, local backups, private scenes, and raw personal datasets elsewhere.
