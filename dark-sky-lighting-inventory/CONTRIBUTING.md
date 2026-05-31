# Contributing to Dark Sky Lighting Inventory

Thank you for your interest in improving this tool. Contributions of all kinds are welcome — bug reports, feature suggestions, documentation, and code.

## Getting started

1. Fork the repository and clone your fork
2. Open `index.html` in a browser to run locally (no build step required)
3. Make your changes
4. Test across Chrome, Firefox, and Safari if possible
5. Open a pull request with a clear description of what you changed and why

## Project structure

```
dark-sky-lighting-inventory/
├── index.html          # App shell, layout, and CSS
├── src/
│   └── app.js          # All application logic
├── sw.js               # Service worker (PWA / offline)
├── manifest.json       # PWA manifest
├── docs/               # Extended documentation
│   └── hosting.md      # Self-hosting and deployment options
├── assets/
│   └── icons/          # PWA icons (192px, 512px)
├── README.md
├── CONTRIBUTING.md
└── LICENSE
```

## Guidelines

- **No build tooling** — this is intentionally a zero-dependency, single-page tool. Keep it that way unless there is a very strong reason.
- **Vanilla JS** — no frameworks. The codebase uses ES6+ but avoids TypeScript or transpilation to keep the contribution barrier low.
- **Lookup tables** — `PURPOSES`, `LUMTYPES`, `LAMPTYPES`, etc. in `app.js` should match the RASC Lighting Inventory form. If RASC updates their standard, update these arrays.
- **RASC compatibility** — the CSV export column order is used by the import parser. If you change export columns, update the `COL` map in `parseCSV()` accordingly, and bump the storage key `dsky_v4` to `dsky_v5` to avoid conflicts.
- **Accessibility** — tooltips are keyboard-focusable (`tabindex="0"`). Please maintain this for new interactive elements.

## Reporting bugs

Open a GitHub issue with:
- Browser and OS version
- Steps to reproduce
- What you expected vs. what happened
- Screenshot if relevant

## Feature requests

Open an issue tagged `enhancement`. Check the roadmap in README.md first — it may already be planned.

## Code of conduct

Be kind. This project exists to protect dark skies for everyone.
