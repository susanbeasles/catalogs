export function filter(value: string | null): string {
  let text = (value ?? '').trim();
  if (text.length >= 2 && (text.startsWith('"') && text.endsWith('"') || text.startsWith("'") && text.endsWith("'"))) text = text.slice(1, -1);
  return text.normalize('NFKC').toLowerCase().trim().replace(/\s+/g, ' ');
}

export function query(url: URL) {
  const search = filter(url.searchParams.get('search')), category = filter(url.searchParams.get('category')) || undefined;
  const offset = Number(url.searchParams.get('offset') ?? 0), limit = Number(url.searchParams.get('limit') ?? 20);
  if (search.length > 300 || !Number.isSafeInteger(offset) || offset < 0 || !Number.isSafeInteger(limit) || limit < 1 || limit > 50) throw new Error('Invalid search parameters');
  return { search, category, offset, limit };
}
