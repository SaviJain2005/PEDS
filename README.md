# PEDS — Prescription Error Detection System

AI-assisted clinical decision support for Indian OPDs.

## Features

- Digital OPD prescription pad (letterhead, demographics, BMI, vitals, diagnosis, Rx table, action bar)
- Real-time safety engine (duplicate salts, allergies, banned FDCs, paediatric/renal/dose rules, DDIs) with red/amber/green dock and clinical overrides
- Patient longitudinal history archive (allergies, chronic illness, ongoing meds, labs)
- Doctor's Study Hub (Indian drug monographs + live NIH RxNorm/openFDA/FAERS signals)
- Handwritten Rx OCR prototype (simulated scan → structured rows → safety check)
- Doctor & patient auth — OTP-only for doctors, password/self-register for patients
- Test scenarios (duplicate paracetamol, duplicate NSAID, banned FDC, penicillin allergy)

## Run locally

```bash
npm install
npm run dev        # http://localhost:5173
```

## Production build

```bash
npm run build       # -> dist/  (PEDS ready to host)
```

### Deploy to GitHub Pages

```bash
gh auth login
npm run build
npm run deploy -- <branch>        # e.g. npm run deploy -- main   (default branch)
# or custom subpath:
npm run deploy -- main peds        # -> https://<user>.github.io/<repo>/peds/
```

Then in GitHub repo settings set **Pages → Source: GitHub Actions** and the built app publishes automatically. Add a workflow at `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
  workflow_dispatch:
permissions:
  contents: read
  pages: write
  id-token: write
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20 }
      - run: npm ci
      - run: npm run build
      - uses: actions/configure-pages@v5
      - uses: actions/upload-pages-artifact@v3
        with: { path: dist }
  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment: github-pages
    permissions: { pages: write, id-token: write }
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

### Alternative static hosts

- Vercel: `vercel deploy` (framework: Vite)
- Netlify: drag & drop `dist/` or connect repo
- Cloudflare Pages: connect repo, build `npm run build`, publish `dist`

## Portable / desktop (Windows)

- `PEDS-Open.bat` + `PEDS-app.zip` — double-click launcher → serves `dist/` on localhost and opens browser.
- Extract zip to a folder; `npx serve . -l <port>` and open the URL.

## Demo accounts

- Doctors (OTP-only, demo): `drsavijain@gmail.com` / on-screen code · `drchhavigupta@gmail.com` · `drvinayjain@gmail.com`
- Patients (password): `aarav` / `patient123` · `sunita` / `patient123` · `vikram` / `patient123`

## Notes

- Live intelligence sources: NIH RxNorm (RxCUI resolution), openFDA SPL labels, openFDA FAERS adverse-event counts; 24 h local cache; offline fallback.
- The safety engine is local-first and authoritative; live data enriches labels only.
