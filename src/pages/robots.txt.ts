import type { APIRoute } from 'astro';
import { withBase } from '../lib/url';

export const prerender = true;

export const GET: APIRoute = ({ site }) => {
  const sitemap = new URL(withBase('/sitemap-index.xml'), site).toString();
  // /cv.pdf carries personal contact details (phone). Humans can still
  // download it from /cv/ and the contact block; compliant crawlers
  // (search and AI alike) are asked to stay out.
  const cvPdf = withBase('/cv.pdf');
  return new Response(
    `User-agent: *\nAllow: /\nDisallow: ${cvPdf}\n\nSitemap: ${sitemap}\n`,
    {
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    },
  );
};
