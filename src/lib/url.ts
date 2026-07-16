// Prefix an absolute site path with Astro's configured base.
// Works whether base is "/" (root deploy) or "/repo" (subfolder).
// Use for any asset in /public referenced by an absolute path.
export function withBase(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const clean = path.startsWith('/') ? path : `/${path}`;
  return `${base}${clean}`;
}
