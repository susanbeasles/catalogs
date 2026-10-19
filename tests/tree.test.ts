import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, rm, symlink } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { tree } from '../scripts/tree.ts';
test('four definition files create an endpoint; slug mismatches and executable files fail validation', async () => {
  const root = await mkdtemp(join(tmpdir(), 'catalog-tree-'));
  try {
    const folder = join(root, 'tools', 'editors', 'canvas'); await mkdir(folder, { recursive: true });
    const data = { 'index.json': 'A concise entry about a canvas.', 'keywords.json': ['draw', 'canvas'], 'meta.json': { slug: 'canvas', name: 'Canvas', aliases: [] }, 'additionalInfo.json': ['https://example.com/docs'] };
    for (const [name, value] of Object.entries(data)) await writeFile(join(folder, name), JSON.stringify(value));
    const result = await tree(root); assert.equal(result.records[0]!.path, '/tools/editors/canvas');
    await writeFile(join(folder, 'meta.json'), JSON.stringify({ ...data['meta.json'], slug: 'wrong' }));
    await assert.rejects(tree(root), /slug/i);
    await writeFile(join(folder, 'meta.json'), JSON.stringify(data['meta.json']));
    await writeFile(join(folder, 'run.ts'), 'throw new Error("must never execute")'); await assert.rejects(tree(root), /expected/i);
    await rm(join(folder, 'run.ts')); await rm(join(folder, 'index.json')); await symlink(join(folder, 'meta.json'), join(folder, 'index.json')); await assert.rejects(tree(root), /expected/i);
  } finally { await rm(root, { recursive: true, force: true }); }
});
