export interface Metadata { slug: string; name: string; aliases: string[] }
export interface Definition {
  index: string; keywords: string[]; meta: Metadata; additionalInfo: string[];
}
export interface Entry extends Metadata {
  category: string; keywords: string[]; summary: string; blurb: string; additionalInfo: string[];
  [field: string]: unknown;
}
export interface Record {
  path: string; catalog: string; category: string; entry: Entry;
}
export interface Tree { version: string; records: Record[] }
export function object(value: unknown): { [key: string]: unknown } {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error('Expected an object');
  return value as { [key: string]: unknown };
}
export function validate(value: unknown): Entry {
  const data = object(value);
  for (const field of ['slug', 'name', 'category', 'summary']) if (typeof data[field] !== 'string' || !String(data[field]).trim()) throw new Error(`Missing ${field}`);
  for (const field of ['aliases', 'keywords']) if (!Array.isArray(data[field]) || !(data[field] as unknown[]).every(v => typeof v === 'string' && v.trim()) || new Set(data[field] as unknown[]).size !== (data[field] as unknown[]).length) throw new Error(`Invalid ${field}`);
  if (!(data.keywords as string[]).length) throw new Error('Keywords are required');
  return data as Entry;
}
