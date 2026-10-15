// Regenerates public/cv.pdf from the /cv/ route.
// Usage: start the dev server (pnpm dev), then:
//   node scripts/generate-cv-pdf.mjs
// Configuration comes from .env.local / .env (see .env.example):
//   SITE_URL  dev server origin (falls back to the pnpm dev default)
//   CV_PHONE     injected into the PDF only, never into the page HTML
import { chromium } from '@playwright/test';

for (const file of ['.env.local', '.env']) {
  try {
    process.loadEnvFile(new URL(`../${file}`, import.meta.url).pathname);
  } catch {
    // optional files: skip silently when absent
  }
}

const baseUrl = process.env.SITE_URL ?? 'http://localhost:4600';
const url = process.env.CV_URL ?? `${baseUrl.replace(/\/$/, '')}/cv/`;
const phone = process.env.CV_PHONE;
const out = new URL('../public/cv.pdf', import.meta.url).pathname;

if (!phone) {
  console.warn('CV_PHONE is not set: the PDF will ship without a phone number.');
}

const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto(url, { waitUntil: 'networkidle' });
if (phone) {
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
