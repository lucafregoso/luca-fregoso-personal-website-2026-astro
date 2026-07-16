# Deploying to GitHub Pages

The repo includes a workflow at `.github/workflows/deploy.yml` that checks,
tests, and builds every pull request. A push to `develop`
publishes the site only after those same quality gates pass. You only need to
do two things.

## 1. Configure deployment URLs

Deployment URLs are configurable without editing source code:

- Locally, copy `.env.example` to `.env.local` and override `SITE_URL` or
  `BASE_PATH` as needed. Local environment files are ignored by Git.
- In GitHub, add repository variables named `SITE_URL` and `BASE_PATH` under
  **Settings → Secrets and variables → Actions → Variables**. The workflow has
  GitHub Pages defaults, so these variables are only required when the domain
  or base path changes.

These values are public deployment configuration, not secrets. Personal
content and verified profile URLs remain in the typed `src/data/site.ts` file.

GitHub serves this repository at
`https://lucafregoso.github.io/luca-fregoso-personal-website-2026-astro/`.
All internal links, CSS, the CV and media respect `BASE_PATH` automatically.

## 2. Turn on Pages with GitHub Actions as the source

On GitHub: **Settings → Pages → Build and deployment → Source → "GitHub Actions"**.
That's it. Push to `develop` and the Actions tab will show the build; when it's
green, your site is live at `https://USERNAME.github.io/REPO/`.

```bash
git add -A
git commit -m "Deploy site"
git push origin develop
```

Protect `develop` under **Settings → Branches** and require the
**Build and test** status check before merging. This keeps pull requests from
bypassing the deployment gate.

## Later: moving to the custom domain (luca-fregoso.com)

When you're ready to use your own domain:

1. Set the GitHub repository variable `SITE_URL` to
   `https://www.luca-fregoso.com` and `BASE_PATH` to `/`.
2. Add a file named `CNAME` (no extension) inside the `public/` folder,
   containing a single line: `www.luca-fregoso.com`
3. In **Settings → Pages → Custom domain**, enter the same domain and save.
4. At your domain registrar, point DNS at GitHub Pages
   (a `CNAME` record for `www` → `USERNAME.github.io`).

After that, every push to `develop` rebuilds and republishes automatically —
which is exactly what makes the "Lately" stream easy to keep fresh:
add a markdown file in `src/content/now/`, commit, push, done.
