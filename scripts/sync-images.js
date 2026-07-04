/**
 * sync-images.js — one-command image maintenance for the KOKO Art Agency site.
 *
 * What it does, per artist folder under public/images/artists/<Folder>/:
 *   1. Sanitizes problem filenames (removes "&", trims stray spaces) and renames
 *      them on disk — these characters break Cloudinary delivery URLs.
 *   2. Uploads any image that isn't already on Cloudinary (idempotent: existing
 *      assets are skipped, so re-running is cheap and safe).
 *   3. Keeps src/app/api/artists/[slug]/images/route.ts in sync: fixes renamed
 *      references and appends any new folder images that weren't listed yet.
 *   4. Runs a final audit and reports anything still broken.
 *
 * Usage:  node scripts/sync-images.js         (full sync + upload)
 *         node scripts/sync-images.js --dry   (report only, no changes/uploads)
 *
 * Requires Cloudinary credentials in .env.local (gitignored).
 */
const path = require('path');
const fs = require('fs');
const https = require('https');
require('dotenv').config({ path: path.join(__dirname, '..', '.env.local') });
const { v2: cloudinary } = require('cloudinary');
const sharp = require('sharp');

// Cloudinary's free plan rejects image uploads over 10MB. Anything above the
// safety threshold is downscaled (longest side -> MAX_DIM) before upload — the
// site only ever displays at <=800px, so 2400px keeps ample retina headroom.
const SAFE_UPLOAD_BYTES = 9.5 * 1024 * 1024;
const MAX_DIM = 2400;

const DRY = process.argv.includes('--dry');
const ROOT = path.dirname(__dirname);
const ROUTE_FILE = path.join(ROOT, 'src', 'app', 'api', 'artists', '[slug]', 'images', 'route.ts');
const CLOUD = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

cloudinary.config({
  cloud_name: CLOUD,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// slug -> on-disk folder name (matches route.ts getArtistFolderName)
const ARTIST_FOLDERS = {
  'anna-hrachovec': 'AnnaHrachovec', 'chico-hayasaki': 'ChicoHayasaki',
  'chris-long': 'ChrisLong', 'dominique-corbasson': 'DominiqueCorbasson',
  'eveline-tarunadjaja': 'EverlineTarunadjaja', 'francois-avril': 'FrançoisAvril',
  'gisela-goppel': 'GiselaGoppel', 'jeffrey-fulvimari': 'JeffreyFulvimari',
  'kana-kobayashi': 'KanaKobayashi', 'kenzo-minami': 'KenzoMinami',
  'lisa-grue': 'LisaGrue', 'lulu': 'LULU*', 'marcus-oakley': 'MarcusOakley',
  'masaki-ryo': 'MasakiRyo', 'masayuki-ogisu': 'MasayukiOgisu', 'miho-s': 'Miho_S',
  'stina-persson': 'StinaPersson', 'superdeux': 'Superdeux',
  'tina-berning': 'TinaBerning', 'tomoto': 'TOMOTO',
};

const IMG_RE = /\.(jpg|jpeg|png|gif|webp)$/i;

// Make a filename safe for a Cloudinary delivery URL.
function sanitize(filename) {
  const ext = path.extname(filename);
  let base = filename.slice(0, filename.length - ext.length);
  base = base
    .replace(/&/g, '-and-')     // "&" breaks the URL (Cloudinary returns 400)
    .replace(/[?#%]/g, '')      // other URL-hostile characters
    .replace(/^ +| +$/g, '');   // drop leading/trailing ASCII spaces (incl. before ext)
  // NOTE: deliberately does NOT touch internal or exotic whitespace — some
  // existing filenames rely on their exact bytes and already deliver fine.
  return base + ext;
}

// Natural sort so "2" < "10" when appending new files.
function natCompare(a, b) {
  return a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });
}

const nfc = (s) => s.normalize('NFC');
// Canonical key for dedup only: ignores Unicode-normalization and whitespace
// differences (e.g. macOS's narrow no-break space before "PM" in screenshots),
// so a disk file isn't mistaken for a new file just because of invisible bytes.
const canonKey = (s) => nfc(s).replace(/\s+/g, ' ').trim();
const publicIdOf = (slug, filename) =>
  `koko-art-agency/artists/${slug}/${filename.replace(/\.[^/.]+$/, '')}`;

// Pull the ARTIST_IMAGE_DATA object literal out of route.ts.
function readRouteData(src) {
  const declIdx = src.indexOf('const ARTIST_IMAGE_DATA');
  const start = src.indexOf('= {', declIdx) + 2;
  let depth = 0, end = -1;
  for (let i = start; i < src.length; i++) {
    if (src[i] === '{') depth++;
    else if (src[i] === '}') { depth--; if (depth === 0) { end = i + 1; break; } }
  }
  return eval('(' + src.slice(start, end) + ')');
}

// Surgically replace one artist's `images: [ ... ]` array in the route.ts source,
// leaving every other artist (and all videos/formatting) byte-for-byte untouched.
// Filenames never contain '[' or ']', so the first ']' after the array opens is its end.
function replaceArtistImages(src, slug, images) {
  const at = src.indexOf(`"${slug}": {`);
  if (at === -1) throw new Error(`slug not found in route.ts: ${slug}`);
  const open = src.indexOf('[', src.indexOf('images:', at));
  const close = src.indexOf(']', open);
  const body = images.map((f) => `      ${JSON.stringify(f)}`).join(',\n');
  return src.slice(0, open) + '[\n' + body + '\n    ]' + src.slice(close + 1);
}

// HEAD a Cloudinary URL to confirm it delivers (mirrors route.ts URL logic).
function head(url) {
  return new Promise((res) => {
    https.request(url, { method: 'HEAD' }, (r) => { r.resume(); res(r.statusCode); })
      .on('error', () => res(0)).end();
  });
}
function deliveryUrl(slug, filename) {
  const base = `https://res.cloudinary.com/${CLOUD}/image/upload`;
  const id = publicIdOf(slug, filename);
  return filename.toLowerCase().endsWith('.gif')
    ? `${base}/${id}`
    : `${base}/c_limit,h_800,w_800,q_auto:good/${id}`;
}

// Downscale an oversized image in place so it fits under the upload cap.
// Format is preserved (sharp keeps the input codec). Returns {before, after} or null.
async function downscaleIfOversized(filePath) {
  const before = fs.statSync(filePath).size;
  if (before <= SAFE_UPLOAD_BYTES) return null;
  const out = await sharp(fs.readFileSync(filePath))
    .rotate() // respect EXIF orientation before we strip metadata
    .resize({ width: MAX_DIM, height: MAX_DIM, fit: 'inside', withoutEnlargement: true })
    .toBuffer();
  if (!DRY) fs.writeFileSync(filePath, out);
  return { before, after: out.length };
}

async function existingPublicIds(slug) {
  const set = new Set();
  let next;
  do {
    const res = await cloudinary.api.resources({
      type: 'upload', prefix: `koko-art-agency/artists/${slug}`,
      max_results: 500, next_cursor: next,
    });
    // Store canonical keys: Cloudinary's Admin API and route.ts can disagree on
    // Unicode normalization for non-ASCII names, even though delivery works.
    res.resources.forEach((r) => set.add(canonKey(r.public_id)));
    next = res.next_cursor;
  } while (next);
  return set;
}

async function main() {
  console.log(`\n${DRY ? '🔍 DRY RUN — ' : ''}Syncing images for cloud "${CLOUD}"\n`);
  const src = fs.readFileSync(ROUTE_FILE, 'utf8');
  const data = readRouteData(src);

  const renames = [];       // [{folder, from, to}]
  const uploads = [];       // [{slug, filename}]
  const appended = [];      // [{slug, filename}]
  const resized = [];       // [{slug, filename, before, after}]
  const changedSlugs = [];  // artists whose images[] array needs rewriting in route.ts

  for (const [slug, folderName] of Object.entries(ARTIST_FOLDERS)) {
    const dir = path.join(ROOT, 'public', 'images', 'artists', folderName);
    if (!fs.existsSync(dir)) { console.log(`⚠️  missing folder: ${folderName}`); continue; }

    // 1) Sanitize + rename problem files on disk.
    const diskFiles = fs.readdirSync(dir).filter((f) => IMG_RE.test(f) && !f.startsWith('.'));
    const renameMap = new Map(); // originalName -> finalName
    for (const f of diskFiles) {
      const clean = sanitize(f);
      renameMap.set(f, clean);
      if (clean !== f) {
        renames.push({ folder: folderName, from: f, to: clean });
        if (!DRY) fs.renameSync(path.join(dir, f), path.join(dir, clean));
      }
    }
    const finalDiskFiles = [...renameMap.values()];

    // 2) Rebuild this artist's image list: keep curated order (sanitized),
    //    then append any folder files not yet listed (natural sort), deduped by NFC.
    const original = data[slug]?.images || [];
    const listed = original.map(sanitize);
    const seen = new Set(listed.map(canonKey));
    const extras = finalDiskFiles
      .filter((f) => !seen.has(canonKey(f)))
      .sort(natCompare);
    extras.forEach((f) => { appended.push({ slug, filename: f }); seen.add(canonKey(f)); });

    if (!data[slug]) data[slug] = { images: [], videos: [] };
    data[slug].images = [...listed, ...extras];
    if (!data[slug].videos) data[slug].videos = [];

    // Flag for a surgical route.ts rewrite only if this artist's list actually changed.
    if (JSON.stringify(original) !== JSON.stringify(data[slug].images)) changedSlugs.push(slug);

    // 3) Upload anything on the list that Cloudinary doesn't already have.
    //    Existence check is read-only, so run it even in dry mode for a truthful report.
    const existing = await existingPublicIds(slug);
    for (const filename of data[slug].images) {
      const pid = publicIdOf(slug, filename);
      if (existing.has(canonKey(pid))) continue;          // already on Cloudinary → nothing to do
      const filePath = path.join(dir, filename);
      if (!fs.existsSync(filePath)) { console.log(`⚠️  ${slug}: needs upload but no local file → ${filename}`); continue; }
      const isGif = filename.toLowerCase().endsWith('.gif');
      // Shrink oversized files first so they clear the 10MB upload cap (GIFs can't be
      // safely resized without losing animation — flag those instead of silently failing).
      if (isGif) {
        if (fs.statSync(filePath).size > SAFE_UPLOAD_BYTES) {
          console.log(`   ⚠️  ${slug}/${filename}: GIF over 10MB, cannot auto-resize — skipping`);
          continue;
        }
      } else {
        const rs = await downscaleIfOversized(filePath);
        if (rs) {
          resized.push({ slug, filename, ...rs });
          console.log(`   🗜  downscaled ${slug}/${filename}  ${(rs.before / 1e6).toFixed(1)}MB → ${(rs.after / 1e6).toFixed(1)}MB`);
        }
      }
      uploads.push({ slug, filename });
      if (!DRY) {
        await cloudinary.uploader.upload(filePath, {
          folder: `koko-art-agency/artists/${slug}`,
          public_id: filename.replace(/\.[^/.]+$/, ''),
          resource_type: 'auto',
          overwrite: false,
          // GIFs: no transformation (preserves animation, avoids errors)
          transformation: isGif ? undefined : [{ width: 1200, height: 1200, crop: 'limit', quality: 'auto:good' }],
        });
        console.log(`   ⬆️  ${slug}/${filename}`);
      }
    }
  }

  // 4) Write route.ts back — only the arrays of artists that changed (videos untouched).
  if (!DRY && changedSlugs.length) {
    let next = src;
    for (const slug of changedSlugs) next = replaceArtistImages(next, slug, data[slug].images);
    fs.writeFileSync(ROUTE_FILE, next);
  }

  console.log('\n── Summary ──');
  console.log(`renamed:  ${renames.length}`);
  renames.forEach((r) => console.log(`   ${r.folder}: ${r.from}  →  ${r.to}`));
  console.log(`appended to lists: ${appended.length}`);
  appended.forEach((a) => console.log(`   ${a.slug}: ${a.filename}`));
  console.log(`downscaled (>10MB): ${resized.length}`);
  resized.forEach((r) => console.log(`   ${r.slug}: ${r.filename}  ${(r.before / 1e6).toFixed(1)}MB → ${(r.after / 1e6).toFixed(1)}MB`));
  console.log(`uploaded: ${uploads.length}`);
  uploads.forEach((u) => console.log(`   ${u.slug}: ${u.filename}`));

  // Final audit (skip in dry run — nothing was uploaded).
  if (!DRY) {
    console.log('\n── Audit (verifying every referenced image delivers) ──');
    let broken = 0, total = 0;
    for (const slug of Object.keys(data)) {
      for (const filename of data[slug].images) {
        total++;
        const code = await head(deliveryUrl(slug, filename));
        if (code !== 200) { broken++; console.log(`   ❌ ${slug}: ${filename} → ${code}`); }
      }
    }
    console.log(`\nChecked ${total} images — ${broken === 0 ? '✅ all deliver' : `❌ ${broken} still broken`}`);
  }
}

main().then(() => console.log('\nDone.')).catch((e) => {
  console.error('\n💥 sync failed:', e.error ? e.error.message : e.message);
  process.exit(1);
});
