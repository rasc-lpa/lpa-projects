# Hosting & Deployment

## GitHub Pages (recommended — free)

This is how the live tool is deployed. GitHub Pages serves the repo directly as a static site.

1. Go to the repo → **Settings** → **Pages**
2. Source: **Deploy from a branch**
3. Branch: `main`, folder: `/ (root)`
4. Save — the site will be live at `https://rasc-lpa.github.io/dark-sky-lighting-inventory/` within a minute or two

Any push to `main` redeploys automatically.

---

## Self-hosting (any static server)

Since the app is pure HTML/JS with no server-side component, it can run on any web host:

```bash
# Netlify drop: drag the folder to app.netlify.com/drop
# Vercel: vercel deploy
# AWS S3 static site: aws s3 sync . s3://your-bucket --exclude ".git/*"
# Any web server: copy all files to the document root
```

For local network use (e.g. a field laptop offline):
```bash
npx serve .
# or
python3 -m http.server 8080
```

---

## Data persistence options

### Current: localStorage (default)
- Data lives in the user's browser
- Works offline, zero setup
- Not shared between devices or users
- Export CSV regularly for backup

### Option 1: Google Sheets sync
Feasible for small teams. Requires:
- A Google Cloud project with Sheets API enabled
- OAuth 2.0 client ID (web application type)
- `gapi` script added to `index.html`

Text field data maps well to rows; photos/spectra need to live in Google Drive as linked files (Drive URLs stored in the sheet, not base64 blobs).

### Option 2: Supabase (recommended for multi-user)
[Supabase](https://supabase.com) is a free-tier Postgres + Storage backend:

1. Create a Supabase project
2. Create tables: `sites`, `surveys`, `fixtures`, `photos`
3. Enable Row Level Security with email-based auth
4. Replace `localStorage` read/write in `app.js` with `supabase-js` calls
5. Store photos/spectra in Supabase Storage buckets

The localStorage data model (`D.sites[id].surveys[year].fixtures[]`) maps directly to relational tables — the migration is mostly mechanical.

### Option 3: Firebase / Firestore
Similar to Supabase. Firestore's document model matches the nested JS object structure closely, making it a straightforward swap.

---

## PWA / Mobile app path

The app already registers a service worker and has a `manifest.json`, so it is installable as a PWA today:

- **iOS:** Safari → Share → Add to Home Screen
- **Android:** Chrome → ⋮ → Add to Home Screen

For a **native app** in future:
- The data model and business logic in `app.js` are designed to be portable
- React Native would allow reuse of the core logic with native camera/GPS APIs
- Expo is the recommended starting point for cross-platform mobile
