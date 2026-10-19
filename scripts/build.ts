import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { URL } from 'node:url';
import { tree } from './tree.ts';
const data = await tree(new URL('../app', import.meta.url).pathname);
if (!data.records.length) throw new Error('Cannot deploy an empty catalog');
const hash = createHash('sha256').update(data.revision);
for (const folder of ['src', 'scripts']) for (const name of (await readdir(new URL('../' + folder, import.meta.url))).filter(n => n.endsWith('.ts')).sort()) {
  hash.update(folder + '/' + name).update(await readFile(new URL('../' + folder + '/' + name, import.meta.url)));
}
for (const name of ['package-lock.json', 'wrangler.jsonc']) hash.update(name).update(await readFile(new URL('../' + name, import.meta.url)));
data.revision = hash.digest('hex');
await mkdir(new URL('../.generated', import.meta.url), { recursive: true });
await writeFile(new URL('../.generated/tree.json', import.meta.url), JSON.stringify(data));
console.log(JSON.stringify({ entries: data.records.length, catalogs: [...new Set(data.records.map(r => r.catalog))], categories: new Set(data.records.map(r => r.catalog + '/' + r.category)).size }));
