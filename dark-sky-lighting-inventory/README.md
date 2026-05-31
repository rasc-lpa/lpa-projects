# Dark Sky Lighting Inventory

A web-based lighting survey tool for dark sky sites, built for the [Royal Astronomical Society of Canada – Light Pollution Abatement](https://rasc-lpa.github.io/lpa-projects/) program.

[!\[Live tool](https://img.shields.io/badge/Live%20tool-rasc--lpa.github.io-0F6E56?style=flat-square)](https://rasc-lpa.github.io/dark-sky-lighting-inventory/)

\---

## What it does

Helps site managers, astronomers, and conservationists survey and track outdoor lighting across dark sky sites — with full year-over-year comparison so improvements can be measured over time.

**Key features**

* **RASC-compatible** — fields and lookup tables match the official RASC Lighting Inventory form
* **EXIF geolocation** — GPS coordinates extracted automatically from phone photos
* **Spectrum uploads** — attach screenshots from spectrometer apps (Spectroid, Spectrometer+, etc.)
* **Illustrated tooltips** — SVG diagrams explain luminaire types, shielding states, and CCT guidance
* **Year-over-year comparison** — track compliance rate, total wattage, and CCT warnings across survey years
* **Fixture map** — SVG map of all geo-tagged luminaires, colour-coded by compliance status
* **CSV import/export** — import from previous RASC spreadsheets; export for sharing or archiving for future reference
* **Progressive Web App** — works offline, installable on iOS and Android home screens
* **No account required** — all data stored locally in the browser

\---

## Getting started

### Use online

Visit [**rasc-lpa.github.io/dark-sky-lighting-inventory**](https://rasc-lpa.github.io/dark-sky-lighting-inventory/) — no installation needed.

### Run locally

```bash
git clone https://github.com/rasc-lpa/dark-sky-lighting-inventory.git
cd dark-sky-lighting-inventory
# Open index.html in your browser, or serve with any static server:
npx serve .
```

### Install as a mobile app (PWA)

**iOS:** Open in Safari → Share → Add to Home Screen  
**Android:** Open in Chrome → menu (⋮) → Add to Home Screen

\---

## RASC 5-principle framework

All fields and compliance checks are built around the RASC lighting principles:

|Principle|Description|
|-|-|
|**Need**|Is permanent lighting really needed?|
|**Target**|Use shielded luminaires aimed downward|
|**Quantity**|Use the lowest illumination level needed|
|**Colour**|CCT ≤2200K best practice; ≤2700K acceptable|
|**Control**|Extinguish or dim when not in use|

\---

## Enabling GPS in photos

For EXIF geolocation to work, your phone's camera needs location access:

**iOS:** Settings → Privacy \& Security → Location Services → Camera → While Using the App

**Android:** Camera app → Settings → Location tags → On

See the **Guide** tab in the app for full step-by-step instructions.

\---

## Data \& storage

All data is stored in your browser's `localStorage`. To avoid data loss:

* Use **Export CSV** regularly and keep backups
* Each CSV export can be re-imported in future sessions or shared with colleagues

**Storage estimates per site:**

|Content|Approx. size|
|-|-|
|Fixture data (text only)|\~5 KB per site|
|Photos (per image)|0.5–2 MB|
|Spectrum screenshots|0.2–1 MB|

For larger deployments or multi-user access, see [docs/hosting.md](docs/hosting.md).

\---

## Contributing

Pull requests welcome. Please open an issue first for significant changes.

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

\---

## Roadmap

* \[ ] Leaflet/OpenStreetMap tile-based map view
* \[ ] PDF report export
* \[ ] Google Sheets sync option
* \[ ] Multi-user / hosted backend (Supabase)
* \[ ] Native mobile app (React Native)
* \[ ] Configurable CCT thresholds per site/zone

\---

## Licence

[MIT](LICENSE)

\---

*Built with ♥ for dark skies by* [*RASC Light Pollution Abatement*](https://www.rasc.ca/light-pollution/)

