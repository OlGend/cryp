export function toBrandSlug(name: string): string {
  return (name || '')
    .normalize('NFKD').replace(/[\u0300-\u036f]/g, '')
    .toLowerCase().trim()
    .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

export function fromBrandSlug(slug: string): string {
  return decodeURIComponent(slug).replace(/-/g, ' ').trim();
}
