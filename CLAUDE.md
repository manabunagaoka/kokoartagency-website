# CLAUDE.md

Guidance for working in this repo. Read this first.

## What this is
KOKO Art Agency marketing site — a Next.js 15 (App Router) gallery for ~20 illustrators.
Deployed on Vercel. Pushing to `main` auto-deploys production.

## Architecture (the non-obvious parts)
- **Artist metadata** (name, slug, bio, links, featured flag) lives in
  `src/lib/data.ts` as a hardcoded `artists` array.
- **Per-artist image lists** live in `src/app/api/artists/[slug]/images/route.ts`
  in `ARTIST_IMAGE_DATA` (filenames + optional videos), served via an API route.
- **Image files** live under `public/images/artists/<FolderName>/`. The slug→folder
  mapping is in both `route.ts` (`getArtistFolderName`) and `scripts/sync-images.js`.
- **Image delivery differs by environment** (important):
  - **Dev** serves images from local `public/`.
  - **Production** serves from **Cloudinary** (cloud `djp2leb00`), with a delivery
    transform `c_limit,h_800,w_800,q_auto:good` (GIFs served untransformed).
  - Consequence: a missing/broken Cloudinary asset is **invisible in dev** and only
    breaks in production. Always verify image changes against Cloudinary, not dev.

## Images: maintenance workflow
Use the sync tool — do NOT hand-edit `ARTIST_IMAGE_DATA` or upload manually.
1. Drop image files into `public/images/artists/<Folder>/`.
2. `npm run sync-images:dry`  # preview (no changes)
3. `npm run sync-images`       # upload missing, downscale oversized, fix names,
                               # update route.ts, audit the live CDN
4. `git add -A && git commit && git push`

`scripts/sync-images.js` handles: idempotent Cloudinary upload, auto-downscaling
files over ~9.5MB to ≤2400px (`sharp`), filename sanitizing, macOS Unicode quirks,
and a final audit of every referenced image against the live CDN.

### Cloudinary filename rules (cause of past production breakage)
- **No `&`** in filenames — it breaks the delivery URL (HTTP 400). Use `-and-`.
- **Keep source files ≤10MB** — Cloudinary's free plan rejects larger uploads.
  (`sync-images` auto-downscales, but know the limit.)
- Avoid `? # %` and stray leading/trailing spaces. macOS screenshot names contain a
  narrow no-break space (U+202F) and non-ASCII names vary by NFC/NFD — the sync tool
  normalizes for comparison, so don't "fix" working files by hand.

### Cloudinary credentials
`.env.local` (gitignored) holds `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`,
`CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`. Needed only by the sync/upload scripts.

## URL redirects
Legacy old-site URLs were flat (`/francois-avril`); the new site nests under
`/artists/[slug]`. `next.config.ts` `redirects()` 308-redirects every artist slug.
If you add a new artist, add its slug to that `artistSlugs` list too.

## Deploy
- `git push origin main` → Vercel builds & deploys production.
- Run `npm run build` locally before pushing; a failed build keeps the current
  production deploy live (Vercel won't swap in a broken build).

## Conventions
- Session notes go in `session-notes/<MONTH><DAY>-<YEAR>.md` (e.g. `JUL4-2026.md`).
