// Renders the /cv/ route to PDF.
// Usage: start a server for the site (pnpm dev), then:
//   node scripts/generate-cv-pdf.mjs            → public/cv.pdf (public, no phone)
//   node scripts/generate-cv-pdf.mjs --private  → cv-private.pdf (gitignored,
//                                                 with phone, sent on request)
// Configuration comes from .env.local / .env (see .env.example):
//   CV_URL    full URL of the /cv/ page to render (wins over SITE_URL)
//   SITE_URL  server origin (falls back to the pnpm dev default)
//   CV_PHONE  personal data: only ever injected into the --private PDF
import { chromium } from '@playwright/test';

for (const file of ['.env.local', '.env']) {
  try {
    process.loadEnvFile(new URL(`../${file}`, import.meta.url).pathname);
  } catch {
    // optional files: skip silently when absent
  }
}

const isPrivate = process.argv.includes('--private');
const baseUrl = process.env.SITE_URL ?? 'http://localhost:4600';
const url = process.env.CV_URL ?? `${baseUrl.replace(/\/$/, '')}/cv/`;
const phone = process.env.CV_PHONE;
const out = new URL(isPrivate ? '../cv-private.pdf' : '../public/cv.pdf', import.meta.url).pathname;

if (isPrivate && !phone) {
  console.error('--private needs CV_PHONE (set it in .env.local).');
  process.exit(1);
}

const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto(url, { waitUntil: 'networkidle' });
if (isPrivate) {
  await page.evaluate((value) => {
    const contact = document.querySelector('[data-cv-contact]');
    if (contact) contact.textContent = `${contact.textContent} · ${value}`;
  }, phone);
}
await page.emulateMedia({ media: 'print' });
await page.pdf({
  path: out,
  format: 'A4',
  printBackground: true,
  preferCSSPageSize: true,
});
await browser.close();
console.log(`Wrote ${out}`);
