
export function makeSlug(s: string): string {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove non-word characters (except spaces/hyphens)
    .replace(/\s+/g, '-')     // Replace spaces with dashes
    .replace(/-+/g, '-');
}
