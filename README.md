# Catalogs

A small, public CMS whose file structure is its router. Definitions are JSON data; the service is TypeScript running on Cloudflare Workers.

The initial [diagram catalog](docs/catalog.md) contains **312 definitions in 24 categories**, including architecture, data flows, statistical charts, decisions, planning, service design, and maps.

[Browse and search the live catalog](https://catalogs.anthonyvespoli.workers.dev). The public MCP address is `https://catalogs.anthonyvespoli.workers.dev/mcp`.

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

This folder becomes `/diagrams/architecture/system-context`. The category and catalog are inferred from the path. The slug in `meta.json` must equal the entry directory. No route registration or database migration is required.

`index.json` contains a Markdown string, beginning with a concise summary. Keep the actual explanation, selection criteria, visual grammar, construction, checks, pitfalls, example, and alternatives here. `keywords.json` and `additionalInfo.json` are string arrays. `meta.json` is `{ "slug": "system-context", "name": "System context diagram", "aliases": ["C4 context"] }`.

The shared [JSON Schema](schemas/definition.schema.json) and [TypeScript type](src/entry.ts) describe the contract. Included editor settings associate each of the four files with its schema. Builds reject malformed data, incomplete entries, duplicate names/slugs, mismatched slugs, unexpected files, and symlinks. Catalog files are parsed as data and never executed.

Read the [diagramming guide](docs/diagramming.md) before drawing. It covers semantic boundaries, data shapes, connector routing, spacing, concise labels, accessibility, and rendered review. The numeric layout defaults are house rules.

## Read and search

- `GET /?format=json`: catalogs, categories, counts, and service version.
- `GET /diagrams`: searchable, paginated summaries; use `?q=trust%20boundary&limit=10&offset=0`.
- `GET /diagrams/<category>`: search within a category.
- `GET /diagrams/<category>/<slug>`: the complete definition, with the main blurb, keywords, metadata, and source links.
- `GET /`: a searchable human interface over the same data.
- `POST /mcp`: a public, stateless Streamable HTTP MCP endpoint.

MCP provides `catalog_search`, `catalog_get`, `catalog_compare`, `catalog_categories`, and `diagram_rules`. All are read-only. Search ranks names, aliases, keywords, summaries, and blurb text; it is lexical retrieval, with matched terms returned for inspection. It does not invent semantic recommendations or use a paid embedding service.

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

## Add a catalog

Create `app/<catalog>/<category>/<slug>/` with the same four definition files. Run `npm run verify`, commit, and push to `main`. The new tree is indexed automatically. Catalog names, categories, and slugs use lowercase kebab-case. A category has no separate metadata file.

Do not add synonym entries to inflate catalog size. Keep aliases on the canonical entry. A variant deserves its own definition when its encoding, selection criteria, or semantic grammar changes. Cite primary sources and distinguish a formal notation from an explanatory pattern view.

## Develop and deploy

Requires Node 24+. Install with `npm ci`; use `npm run dev` for a local Worker. `npm run verify` builds the directory index, checks types, runs tests, and bundles a dry-run deployment. `npm run deploy` publishes through Wrangler for an authenticated operator.

Cloudflare Workers Builds connects this repo's `main` branch to the Worker. The build command is `npm run verify`, followed by `npx wrangler deploy`. Pull requests run the validation workflow without deployment credentials. The build fails before publication if definitions or checks fail.

Only authored reference data and application source belong here. Keep account keys, local backups, private scenes, and raw personal datasets elsewhere.
