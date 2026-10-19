import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { validate } from '../src/entry.ts';
import type { Tree } from '../src/entry.ts';

const slug = /^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/;
export async function tree(root: string): Promise<Tree> {
  const records: Tree['records'] = []; const ids = new Set<string>(); const names = new Set<string>();
  async function directories(path: string): Promise<string[]> {
    const children = await readdir(path, { withFileTypes: true });
    for (const child of children) if (!child.isDirectory() || !slug.test(child.name)) throw new Error(`Expected a kebab-case directory: ${join(path, child.name)}`);
    return children.map(c => c.name).sort();
  }
  for (const catalog of await directories(root)) for (const category of await directories(join(root, catalog))) for (const type of await directories(join(root, catalog, category))) {
    const folder = join(root, catalog, category, type); const children = await readdir(folder, { withFileTypes: true });
    const files = ['index.json', 'keywords.json', 'meta.json', 'additionalInfo.json'];
    if (children.length !== 4 || !children.every(child => child.isFile() && files.includes(child.name))) throw new Error(`Expected index.json, keywords.json, meta.json, additionalInfo.json in ${folder}`);
    const [blurb, keywords, meta, additionalInfo] = await Promise.all(files.map(async name => JSON.parse(await readFile(join(folder, name), 'utf8')) as unknown));
    if (typeof blurb !== 'string' || !blurb.trim() || !meta || typeof meta !== 'object' || Array.isArray(meta) || Object.keys(meta).some(k => !['slug', 'name', 'aliases'].includes(k)) || !Array.isArray(additionalInfo) || !additionalInfo.length || new Set(additionalInfo).size !== additionalInfo.length || !additionalInfo.every(url => {
      if (typeof url !== 'string') return false;
      const parsed = new URL(url); return parsed.protocol === 'https:' && !parsed.username && !parsed.password;
    })) throw new Error(`Invalid definition files: ${folder}`);
    const entry = validate({ ...meta, category, keywords, blurb, summary: blurb.split('\n')[0], additionalInfo });
    if (entry.slug !== type) throw new Error(`Entry slug must match its directory: ${folder}`);
    const key = `${catalog}/${type}`, name = `${catalog}/${entry.name.toLowerCase().replace(/[^a-z0-9]/g, '')}`;
    if (ids.has(key) || names.has(name)) throw new Error(`Duplicate catalog entry: ${key}`);
    ids.add(key); names.add(name);
    if (catalog === 'diagrams' && (entry.keywords.length < 5 || blurb.length < 400)) throw new Error(`Incomplete diagram recipe: ${folder}`);
    records.push({ path: `/${catalog}/${category}/${type}`, catalog, category, entry });
  }
  return { version: '0.1.0', records };
}
