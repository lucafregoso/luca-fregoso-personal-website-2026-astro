import type { APIRoute } from 'astro';
import { withBase } from '../lib/url';

export const prerender = true;

export const GET: APIRoute = ({ site }) => {
  const sitemap = new URL(withBase('/sitemap-index.xml'), site).toString();
  // /cv.pdf duplicates /cv/ (no phone on either: the phone only goes in
  // the private PDF sent on request). The page is the indexable version;
  // crawlers are asked to skip the PDF copy.
  const cvPdf = withBase('/cv.pdf');
  return new Response(
    `User-agent: *\nAllow: /\nDisallow: ${cvPdf}\n\nSitemap: ${sitemap}\n`,
    {
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    },
  );
};
