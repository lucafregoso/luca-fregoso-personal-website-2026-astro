// Prefix an absolute site path with Astro's configured base.
// Works whether base is "/" (root deploy) or "/repo" (subfolder).
// Use for any asset in /public referenced by an absolute path.
export function withBase(path: string): string {
  // BASE_URL is the only base Astro exposes on import.meta.env
  // (SITE_URL is a process-level env read in astro.config.mjs).
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const clean = path.startsWith('/') ? path : `/${path}`;
  return `${base}${clean}`;
}
