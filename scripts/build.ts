import { mkdir, writeFile } from 'node:fs/promises';
import { tree } from './tree.ts';
const data = await tree(new URL('../app', import.meta.url).pathname);
if (!data.records.length) throw new Error('Cannot deploy an empty catalog');
await mkdir(new URL('../.generated', import.meta.url), { recursive: true });
await writeFile(new URL('../.generated/tree.json', import.meta.url), JSON.stringify(data));
console.log(JSON.stringify({ entries: data.records.length, catalogs: [...new Set(data.records.map(r => r.catalog))], categories: new Set(data.records.map(r => r.catalog + '/' + r.category)).size }));
