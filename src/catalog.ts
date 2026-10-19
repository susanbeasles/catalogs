import type { Record as CatalogRecord, Tree } from './entry.ts';
const stop = new Set('a an and are as at be by can chart charts diagram diagrams for from how i in is it me my of on or our please show that the their this to use using want we what when where which with'.split(' '));
export function words(text: string): string[] { return [...new Set(text.normalize('NFKD').replace(/\p{M}/gu, '').toLowerCase().replace(/[^\p{L}\p{N}]+/gu, ' ').split(' ').filter(w => w && !stop.has(w)))]; }
const normalize = (text: string) => text.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, ' ').trim();
export class Catalog {
  readonly records: readonly CatalogRecord[];
  readonly #paths: Map<string, CatalogRecord>;
  readonly #index: { record: CatalogRecord; fields: [string[], number][]; name: string; aliases: string[] }[];
  constructor(tree: Tree) {
    this.records = tree.records; this.#paths = new Map(tree.records.map(r => [r.path, r]));
    this.#index = tree.records.map(record => {
      const e = record.entry;
      const positive = e.blurb.split('\n').filter(line => !/^(Avoid when|Pitfalls|Alternatives):/.test(line)).join('\n');
      const fields: [string, number][] = [[e.name, 12], [e.aliases.join(' '), 10], [e.keywords.join(' '), 8], [e.summary, 4], [positive, 2], [record.category, 3]];
      return { record, fields: fields.map(([text, weight]) => [words(text), weight]), name: normalize(e.name), aliases: e.aliases.map(normalize) };
    });
  }
  get(path: string) { return this.#paths.get(path); }
  categories(catalog?: string) {
    const counts = new Map<string, number>();
    for (const r of this.records) if (!catalog || r.catalog === catalog) counts.set(`${r.catalog}/${r.category}`, (counts.get(`${r.catalog}/${r.category}`) ?? 0) + 1);
    return [...counts].sort().map(([path, count]) => ({ path: '/' + path, count }));
  }
  search(query = '', catalog?: string, category?: string, offset = 0, limit = 20) {
    if (query.length > 300 || !Number.isSafeInteger(offset) || offset < 0 || !Number.isSafeInteger(limit) || limit < 1 || limit > 50) throw new Error('Invalid search parameters');
    const terms = words(query), phrase = normalize(query);
    const candidates = this.#index.filter(d => (!catalog || d.record.catalog === catalog) && (!category || d.record.category === category));
    const scored = candidates.map(d => {
      const r = d.record, e = r.entry;
      const match = (word: string, term: string) => word === term || word.startsWith(term) && term.length >= 4 || term.endsWith('s') && word === term.slice(0, -1);
      const matched = terms.filter(term => d.fields.some(([tokens]) => tokens.some(word => match(word, term))));
      let score = d.fields.reduce((sum, [tokens, weight]) => sum + terms.filter(term => tokens.some(word => match(word, term))).length * weight, 0) + matched.length * 12;
      if (phrase && d.name === phrase) score += 100;
      if (phrase && d.aliases.includes(phrase)) score += 80;
      score += matched.length === terms.length && terms.length ? 20 : 0;
      return { path: r.path, slug: e.slug, name: e.name, category: r.category, catalog: r.catalog, summary: e.summary, keywords: e.keywords, score, matched };
    }).filter(r => !terms.length || r.matched.length > 0).sort((a, b) => b.score - a.score || a.name.localeCompare(b.name));
    return { query, total: scored.length, offset, limit, nextOffset: offset + limit < scored.length ? offset + limit : null, results: scored.slice(offset, offset + limit) };
  }
}
