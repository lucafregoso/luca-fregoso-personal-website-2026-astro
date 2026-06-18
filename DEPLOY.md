# Deploying to GitHub Pages

The repo includes a workflow at `.github/workflows/deploy.yml` that builds the
site and publishes it on every push to `main`. You only need to do two things.

## 1. Set the URL in `astro.config.mjs`

GitHub will serve your repo at `https://USERNAME.github.io/REPO/`.
Open `astro.config.mjs` and set both values:

```js
export default defineConfig({
  site: 'https://USERNAME.github.io',   // your GitHub username
  base: '/REPO',                        // your repository name, with a leading slash
});
```

Example: user `lucafregoso`, repo `personal-site`:

```js
site: 'https://lucafregoso.github.io',
base: '/personal-site',
```

All internal links, the CSS, the CV and the photo already respect `base`
automatically (via `src/lib/url.ts`), so nothing else needs touching.

## 2. Turn on Pages with GitHub Actions as the source

On GitHub: **Settings → Pages → Build and deployment → Source → "GitHub Actions"**.
That's it. Push to `main` and the Actions tab will show the build; when it's
green, your site is live at `https://USERNAME.github.io/REPO/`.

```bash
git add -A
git commit -m "Deploy site"
git push origin main
```

> If your default branch is `master`, edit the `branches:` line in
> `.github/workflows/deploy.yml` accordingly.

## Later: moving to the custom domain (luca-fregoso.com)

When you're ready to use your own domain:

1. In `astro.config.mjs`, set `site: 'https://www.luca-fregoso.com'` and
   **delete the `base` line** (custom domains serve from the root).
2. Add a file named `CNAME` (no extension) inside the `public/` folder,
   containing a single line: `www.luca-fregoso.com`
3. In **Settings → Pages → Custom domain**, enter the same domain and save.
4. At your domain registrar, point DNS at GitHub Pages
   (a `CNAME` record for `www` → `USERNAME.github.io`).

After that, every push to `main` rebuilds and republishes automatically —
which is exactly what makes the "Lately" stream easy to keep fresh:
add a markdown file in `src/content/now/`, commit, push, done.
