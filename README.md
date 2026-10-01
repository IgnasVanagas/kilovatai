# Kilovatai

Lithuanian company landing page built with React and Vite. Images and fonts are served locally. The production output is a static website in `dist/`.

## Publish on Vercel

The repository includes `vercel.json` with these settings:

| Setting               | Value                             |
| --------------------- | --------------------------------- |
| Framework             | Vite                              |
| Root directory        | Repository root (`.`)             |
| Node.js               | 22.x, specified in `package.json` |
| Install command       | `npm ci`                          |
| Build command         | `npm run build`                   |
| Output directory      | `dist`                            |
| Environment variables | None required                     |

### From a Git repository

1. Commit the project files, including `package-lock.json` and `vercel.json`, and push to your Git provider.
2. In Vercel, choose **Add New → Project** and import that repository.
3. Keep the root directory at the repository root. Vercel reads the build settings from `vercel.json`.
4. Select **Deploy**. After deployment, add your domain under the project's **Settings → Domains** if needed.

This local repository has not been connected to a remote or a Vercel project as part of deployment preparation.

### From the command line

Run from this project directory:

```sh
npx vercel login
npx vercel
```

The second command links the directory to your selected Vercel account/project and creates a preview deployment. Review that deployment, then publish to production:

```sh
npx vercel --prod
```

Vercel builds the source project; do not set the root directory to `dist` or `public`. There are no serverless functions or databases to configure. Section links such as `/#kontaktai` work without a catch-all rewrite.

Vite's fingerprinted `/assets/` files receive long-lived cache headers. Images in `/images/` keep Vercel's default cache behavior, so replacing an image at the same path does not give browsers a year-long stale copy. `.vercelignore` excludes local dependencies, development artifacts, tests, and original design assets from CLI uploads; the optimized images in `public/images/` are included.

See the official [Vite deployment guide](https://vercel.com/docs/frameworks/frontend/vite) and [Vercel CLI deploy reference](https://vercel.com/docs/cli/deploy).

## Contact form

The form prepares an SMS to **+370 666 09997** and provides a copy-to-clipboard option. Visitors send the message from their own messaging app. Form data is not submitted to a backend or sent by email. This works on the HTTPS deployment without API keys.

## Local development

Use Node.js 22 and npm:

```sh
npm ci
npm run dev
```

## Production verification

```sh
npm run build
npm run preview
```

To run browser checks against the compiled production site:

```sh
npm run test:production
```

The tests use installed Google Chrome through Playwright. If Chrome is unavailable, install the test browser with `npx playwright install chrome`. Production tests start a temporary preview server on port 4173 and stop it when finished. They cover responsive layouts, contact-form validation and SMS preparation, service selection, keyboard navigation, and automated accessibility checks.

`npm test` runs the same checks against the development server. Screenshots are saved to `artifacts/`; test output and local Vercel settings are excluded from Git.
