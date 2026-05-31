/**
 * Dark Sky Lighting Inventory
 * RASC-compatible outdoor lighting survey tool
 * https://github.com/rasc-lpa/dark-sky-lighting-inventory
 */

'use strict';

// ─── TOOLTIP / ILLUSTRATED HELP CONTENT ──────────────────────────────────────

const TIPS = {
  lumType: {
    title: 'Luminaire types',
    text: 'The fixture housing style. Shielding and light distribution vary significantly by type.',
    svgs: {
      'Wallpack':     '<svg width="40" height="40" viewBox="0 0 40 40"><rect x="8" y="10" width="24" height="16" rx="2" fill="none" stroke="#0F6E56" stroke-width="1.5"/><rect x="8" y="22" width="24" height="6" rx="1" fill="#E1F5EE" stroke="#0F6E56" stroke-width="1"/><line x1="20" y1="28" x2="20" y2="36" stroke="#888" stroke-width="1.5"/><path d="M14 22 Q20 14 26 22" fill="#FAEEDA" stroke="#BA7517" stroke-width="1"/></svg>',
      'Flood':        '<svg width="40" height="40" viewBox="0 0 40 40"><rect x="10" y="8" width="20" height="14" rx="3" fill="none" stroke="#0F6E56" stroke-width="1.5"/><line x1="10" y1="22" x2="6" y2="30" stroke="#888" stroke-width="1.5"/><line x1="20" y1="22" x2="20" y2="32" stroke="#888" stroke-width="1.5"/><line x1="30" y1="22" x2="34" y2="30" stroke="#888" stroke-width="1.5"/><ellipse cx="20" cy="14" rx="7" ry="5" fill="#E1F5EE" stroke="#0F6E56" stroke-width="1"/></svg>',
      'Bollard':      '<svg width="40" height="40" viewBox="0 0 40 40"><rect x="16" y="28" width="8" height="8" rx="1" fill="#ccc" stroke="#888" stroke-width="1"/><rect x="15" y="10" width="10" height="20" rx="3" fill="none" stroke="#0F6E56" stroke-width="1.5"/><ellipse cx="20" cy="13" rx="5" ry="3" fill="#FAEEDA" stroke="#BA7517" stroke-width="1"/></svg>',
      'Roadway':      '<svg width="40" height="40" viewBox="0 0 40 40"><line x1="8" y1="36" x2="8" y2="12" stroke="#888" stroke-width="2"/><line x1="8" y1="12" x2="28" y2="12" stroke="#888" stroke-width="2"/><ellipse cx="32" cy="12" rx="5" ry="4" fill="#FAEEDA" stroke="#BA7517" stroke-width="1.5"/><path d="M27 16 L37 16 L35 20 L29 20 Z" fill="#E1F5EE" stroke="#0F6E56" stroke-width="1"/></svg>',
      'Spot':         '<svg width="40" height="40" viewBox="0 0 40 40"><circle cx="20" cy="12" r="7" fill="none" stroke="#0F6E56" stroke-width="1.5"/><circle cx="20" cy="12" r="4" fill="#FAEEDA" stroke="#BA7517" stroke-width="1"/><line x1="20" y1="4" x2="20" y2="1" stroke="#888" stroke-width="1.5"/><path d="M14 22 L26 22 L28 36 L12 36 Z" fill="rgba(250,238,218,.5)" stroke="#BA7517" stroke-width="0.5" stroke-dasharray="2,2"/></svg>',
      'Wall sconce':  '<svg width="40" height="40" viewBox="0 0 40 40"><rect x="4" y="8" width="6" height="24" fill="#ddd" stroke="#888" stroke-width="1"/><path d="M10 12 Q22 14 24 20 Q22 26 10 28 Z" fill="#E1F5EE" stroke="#0F6E56" stroke-width="1.5"/><ellipse cx="18" cy="20" rx="4" ry="5" fill="#FAEEDA" stroke="#BA7517" stroke-width="1"/></svg>',
      'Step':         '<svg width="40" height="40" viewBox="0 0 40 40"><rect x="4" y="26" width="14" height="6" rx="1" fill="#ddd" stroke="#888" stroke-width="1"/><rect x="18" y="20" width="14" height="6" rx="1" fill="#ddd" stroke="#888" stroke-width="1"/><rect x="6" y="22" width="8" height="4" rx="1" fill="#FAEEDA" stroke="#BA7517" stroke-width="1"/><path d="M6 22 L14 22 L12 18 L8 18 Z" fill="rgba(225,245,238,.7)" stroke="#0F6E56" stroke-width="0.5"/></svg>',
      'String lights':'<svg width="40" height="40" viewBox="0 0 40 40"><path d="M4 14 Q12 18 20 14 Q28 10 36 14" fill="none" stroke="#888" stroke-width="1.5"/><circle cx="10" cy="16" r="3" fill="#FAEEDA" stroke="#BA7517" stroke-width="1"/><circle cx="20" cy="14" r="3" fill="#FAEEDA" stroke="#BA7517" stroke-width="1"/><circle cx="30" cy="16" r="3" fill="#FAEEDA" stroke="#BA7517" stroke-width="1"/></svg>'
    }
  },
  shielding: {
    title: 'Shielding states',
    text: 'How well the fixture contains light within the intended target area.',
    svgs: {
      'Fully shielded':    '<svg width="60" height="50" viewBox="0 0 60 50"><rect x="20" y="4" width="20" height="12" rx="2" fill="#E1F5EE" stroke="#0F6E56" stroke-width="1.5"/><rect x="14" y="14" width="32" height="6" rx="1" fill="#0F6E56"/><path d="M18 20 L42 20 L44 36 L16 36 Z" fill="rgba(250,238,218,.6)" stroke="#BA7517" stroke-width="1" stroke-dasharray="2,2"/><text x="30" y="46" text-anchor="middle" font-size="8" fill="#0F6E56" font-weight="500">Fully</text></svg>',
      'Partially shielded':'<svg width="60" height="50" viewBox="0 0 60 50"><rect x="20" y="8" width="20" height="12" rx="2" fill="#E1F5EE" stroke="#0F6E56" stroke-width="1.5"/><rect x="20" y="6" width="20" height="5" rx="1" fill="#0F6E56"/><path d="M18 20 L42 20 L44 36 L16 36 Z" fill="rgba(250,238,218,.6)" stroke="#BA7517" stroke-width="1" stroke-dasharray="2,2"/><path d="M20 8 L26 2 M30 6 L30 1 M34 8 L38 2" stroke="#BA7517" stroke-width="1" stroke-dasharray="1.5,1.5"/><text x="30" y="46" text-anchor="middle" font-size="8" fill="#BA7517" font-weight="500">Partial</text></svg>',
      'Unshielded':        '<svg width="60" height="50" viewBox="0 0 60 50"><circle cx="30" cy="16" r="10" fill="#FAEEDA" stroke="#A32D2D" stroke-width="1.5"/><path d="M22 20 L38 20 L40 34 L20 34 Z" fill="rgba(250,238,218,.6)" stroke="#A32D2D" stroke-width="1" stroke-dasharray="2,2"/><path d="M20 14 L14 8 M24 10 L20 3 M30 8 L30 1 M36 10 L40 3 M40 14 L46 8" stroke="#A32D2D" stroke-width="1" stroke-dasharray="1.5,1.5"/><text x="30" y="46" text-anchor="middle" font-size="8" fill="#A32D2D" font-weight="500">Unshielded</text></svg>'
    }
  },
  activity: {
    title: 'Activity levels',
    text: 'How intensively the area is used — determines the minimum required illumination.',
    items: [
      { label: 'Low',          col: '#0F6E56', desc: 'Parking lots, building exteriors, paths. Not regular task areas. (~22 lux min)' },
      { label: 'High',         col: '#0F6E56', desc: 'Frequently used walkways, building access and egress points. (~54 lux min)' },
      { label: 'Event',        col: '#BA7517', desc: 'Theatrical or sporting events — temporary congregation.' },
      { label: 'Visual task',  col: '#BA7517', desc: 'Work requiring specific illumination: assembly, inspection, reading. Level depends on task difficulty.' }
    ]
  },
  cct: {
    title: 'Colour temperature (CCT)',
    text: 'Measured in Kelvin. Lower = warmer/amber. Higher = cooler/blue-white. Blue-rich light harms nocturnal wildlife and disrupts human sleep.',
    items: [
      { label: '≤2200K',    col: '#BA7517', desc: 'Best practice. Amber/PC Amber LED. Minimal ecological impact.' },
      { label: '2200–2700K',col: '#0F6E56', desc: 'Acceptable. Warm white LED. Good colour rendering.' },
      { label: '3000K+',    col: '#A32D2D', desc: 'Marginal. Not recommended for dark sky sites.' },
      { label: '4000K+',    col: '#A32D2D', desc: 'High blue content. Harmful to wildlife and night sky.' }
    ]
  },
  lampType: {
    title: 'Lamp types',
    text: 'The light source technology. Affects CCT, colour rendering, efficiency, and dark-sky suitability.',
    items: [
      { label: 'PC Amber / Amber LED', col: '#0F6E56', desc: 'Best choice — very low blue, high efficiency, long life.' },
      { label: 'LED – Other',          col: '#BA7517', desc: 'Check CCT carefully. Many are too blue (>3000K).' },
      { label: 'Low-pressure sodium',  col: '#0F6E56', desc: 'Monochromatic amber. Excellent for dark sky but poor colour rendering.' },
      { label: 'High-pressure sodium', col: '#BA7517', desc: 'Warm amber. Better CRI than LPS. Legacy but acceptable.' },
      { label: 'Metal halide',         col: '#A32D2D', desc: 'High blue/UV content. Not recommended.' },
      { label: 'Fluorescent / CFL',    col: '#BA7517', desc: 'Moderate. CCT and mercury content are concerns.' }
    ]
  },
  zone: {
    title: 'Lighting zones (LZ)',
    text: 'Defines the ambient light level expected in the area. Dark sky sites are typically LZ0 or LZ1.',
    items: [
      { label: 'LZ0', col: '#0F6E56', desc: 'Intrinsically dark — no artificial light expected. Wilderness, dark sky reserves.' },
      { label: 'LZ1', col: '#0F6E56', desc: 'Low — developed areas in dark sky sites. Minimal light intrusion.' },
      { label: 'LZ2', col: '#BA7517', desc: 'Moderate — rural, villages, low-density suburban areas.' },
      { label: 'LZ3', col: '#BA7517', desc: 'Suburban — medium/high density, shopping districts, industrial parks.' }
    ]
  }
};

function mkTip(key, label) {
  const d = TIPS[key];
  if (!d) return label;
  let inner = '';
  if (d.svgs) {
    inner = `<div class="tt-grid">${Object.entries(d.svgs).map(([k, v]) => `<div class="tt-item">${v}<span>${k}</span></div>`).join('')}</div>`;
  } else if (d.items) {
    inner = `<div style="display:grid;gap:4px;margin-top:.4rem">${d.items.map(i => `<div style="display:flex;gap:6px;align-items:flex-start"><span style="font-size:9px;font-weight:600;color:${i.col};min-width:70px;padding-top:1px">${i.label}</span><span style="font-size:10px;color:var(--color-text-secondary,#666)">${i.desc}</span></div>`).join('')}</div>`;
  }
  return `<span class="tt-wrap">${label}<span class="tt-icon" tabindex="0">?</span><div class="tt-box"><h4>${d.title}</h4><p>${d.text}</p>${inner}</div></span>`;
}

function mkShieldTip() {
  const d = TIPS.shielding;
  return `<span class="tt-wrap">Shielding state<span class="tt-icon" tabindex="0">?</span><div class="tt-box" style="min-width:300px"><h4>${d.title}</h4><p>${d.text}</p><div style="display:flex;gap:8px;justify-content:center;margin-top:.6rem">${Object.entries(d.svgs).map(([k, v]) => `<div style="display:flex;flex-direction:column;align-items:center;gap:3px">${v}<span style="font-size:9px;text-align:center;color:var(--color-text-secondary,#666)">${k}</span></div>`).join('')}</div></div></span>`;
}

// ─── LOOKUP TABLES ────────────────────────────────────────────────────────────

const PURPOSES   = ['Amphitheatre','Area - general','Architectural','Building exit/entry','Decorative','Emergency lighting','Flag or monument','Gate','Hazard - curb/step/stairs','Kiosk','Materials handling','Monument/flag pole','Parking - covered','Parking - open','Pathway/walkway','Pier/wharf/gangway','Pool/pool deck','Refueling area','Roadway or street','Security','Sign - external','Sign - internal/digital','Sports - playing area','Task - assembly/inspection','Tower/antenna','Unloading/loading dock','Wayfinding/marker','Other'];
const LUMTYPES   = ['Area & site','Barn/gooseneck','Bollard','Can','Soffit/ceiling','Emergency','Flood','In-ground','Landscape/garden','Lantern - carriage','Lantern - post top/acorn','Pendant','Roadway','Spot','Sports','Step','String lights','Underwater','Vending machine','Wallpack','Wall sconce','Other'];
const LAMPTYPES  = ['CFL','Fluorescent tube','Halogen','High-pressure sodium','Incandescent','LED – Amber / PC Amber','LED – Other','Low-pressure sodium','Mercury vapour','Metal halide','Neon / gas-filled tube','To be determined'];
const SHIELDS    = ['Fully','Partially','Unshielded','Other','Unable to determine'];
const CONTROLS   = ['Automatic switch','Dimmer','Manual switch','Motion sensor','Photosensor','Programmable timer','None'];
const WHEN       = ['All night','Dusk to curfew','Motion-activated only','Event only','Unknown'];
const ACTIVITIES = ['Low','High','Event','Visual task – orientation','Visual task – occasional','Visual task – simple assembly','Visual task – difficult/fine'];

const PRINCIPLES = [
  ['N','#BA7517','Need',     'Is permanent lighting really needed? All lighting needs a clear purpose.'],
  ['T','#0F6E56','Target',   'Use shielded luminaires aimed downward. Minimise light beyond the target.'],
  ['Q','#0F6E56','Quantity', 'Use the lowest illumination level needed for the task.'],
  ['C','#BA7517','Colour',   'CCT ≤2200K best practice. ≤2700K acceptable. Limit blue-rich light.'],
  ['C','#0F6E56','Control',  'Extinguish or dim when not needed. Use motion sensors or timers.']
];

// ─── DATA STORE ───────────────────────────────────────────────────────────────

let D = { sites: {}, cur: null };

function loadData() {
  try { const x = localStorage.getItem('dsky_v4'); if (x) D = JSON.parse(x); } catch (e) {}
}
function saveData() {
  try { localStorage.setItem('dsky_v4', JSON.stringify(D)); } catch (e) {}
}

// ─── TAB ROUTING ──────────────────────────────────────────────────────────────

document.getElementById('nav').addEventListener('click', e => {
  const btn = e.target.closest('.tab');
  if (!btn) return;
  document.querySelectorAll('.tab').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  const t = btn.dataset.tab;
  ['sites','inventory','photos','report','import','guide'].forEach(id =>
    document.getElementById('tab-' + id).classList.toggle('hidden', id !== t));
  if (t === 'inventory') S.renderInv();
  if (t === 'photos')  { S.fillSels(); if (D.cur) S.loadPhotoTab(D.cur); }
  if (t === 'report')  { S.fillSels(); if (D.cur) S.loadReport(D.cur); }
  if (t === 'import')  S.initImport();
  if (t === 'guide')   S.renderGuide();
});

// ─── HELPERS ─────────────────────────────────────────────────────────────────

function sel(arr, val) {
  return arr.map(a => `<option${val === a ? ' selected' : ''}>${a}</option>`).join('');
}
function dmsToDD(dms, ref) {
  const d = dms[0] + dms[1] / 60 + dms[2] / 3600;
  return (ref === 'S' || ref === 'W') ? -d : d;
}

// ─── MAIN APP OBJECT ──────────────────────────────────────────────────────────

const S = {

  // ── SITES ─────────────────────────────────────────────────────────────────

  showNewSite() {
    document.getElementById('new-site-form').classList.remove('hidden');
    document.getElementById('ns-date').value = new Date().toISOString().split('T')[0];
  },

  createSite() {
    const name = document.getElementById('ns-name').value.trim();
    if (!name) { alert('Enter a site name.'); return; }
    const id = 's' + Date.now();
    const yr = new Date().getFullYear().toString();
    D.sites[id] = {
      id, name,
      zone:    document.getElementById('ns-zone').value,
      date:    document.getElementById('ns-date').value,
      addr:    document.getElementById('ns-addr').value,
      surv:    document.getElementById('ns-surv').value,
      email:   document.getElementById('ns-email').value,
      surveys: { [yr]: { year: yr, fixtures: [], created: Date.now() } },
      created: Date.now()
    };
    saveData();
    document.getElementById('new-site-form').classList.add('hidden');
    ['ns-name','ns-addr','ns-surv','ns-email'].forEach(i => document.getElementById(i).value = '');
    S.renderSites();
    S.fillSels();
  },

  renderSites() {
    const list = document.getElementById('sites-list');
    const emp  = document.getElementById('sites-empty');
    const sites = Object.values(D.sites);
    if (!sites.length) { list.innerHTML = ''; emp.classList.remove('hidden'); return; }
    emp.classList.add('hidden');
    list.innerHTML = sites.map(s => {
      const yrs = Object.keys(s.surveys || {}).sort();
      const ly  = yrs[yrs.length - 1];
      const fc  = ly ? (s.surveys[ly].fixtures || []).length : 0;
      const co  = ly ? (s.surveys[ly].fixtures || []).filter(f => f.compliant === 'Yes').length : 0;
      return `<li class="sli" onclick="S.openSite('${s.id}')">
        <div><div class="sln">${s.name}</div><div class="slm">${s.zone || 'Zone?'} · ${s.date || ''} · ${fc} fixture${fc !== 1 ? 's' : ''} · ${yrs.length} yr${yrs.length !== 1 ? 's' : ''}</div></div>
        <div style="display:flex;align-items:center;gap:6px">${fc ? `<span class="bdg bc">${co}/${fc} compliant</span>` : ''}<i class="ti ti-chevron-right" style="color:var(--color-text-secondary,#666)"></i></div>
      </li>`;
    }).join('');
  },

  openSite(id) {
    D.cur = id;
    document.querySelector('.tab[data-tab="inventory"]').click();
  },

  fillSels() {
    const sites = Object.values(D.sites);
    const opts  = '<option value="">Choose site…</option>' + sites.map(s => `<option value="${s.id}">${s.name}</option>`).join('');
    ['site-sel','photo-sel','report-sel'].forEach(id => {
      const el = document.getElementById(id);
      if (el) { el.innerHTML = opts; if (D.cur) el.value = D.cur; }
    });
    const imp = document.getElementById('imp-site');
    if (imp) imp.innerHTML = '<option value="">Select site…</option>' + sites.map(s => `<option value="${s.id}">${s.name}</option>`).join('');
  },

  selectSite(id) { D.cur = id; S.renderInv(); },

  currentFx() {
    if (!D.cur || !D.sites[D.cur]) return [];
    const s   = D.sites[D.cur];
    const yrs = Object.keys(s.surveys || {}).sort();
    const ly  = yrs[yrs.length - 1];
    return ly ? (s.surveys[ly].fixtures || []) : [];
  },

  currentYr() {
    if (!D.cur || !D.sites[D.cur]) return null;
    const yrs = Object.keys(D.sites[D.cur].surveys || {}).sort();
    return yrs[yrs.length - 1] || null;
  },

  // ── INVENTORY ─────────────────────────────────────────────────────────────

  renderInv() {
    const siteEl = document.getElementById('site-sel');
    if (siteEl && D.cur) siteEl.value = D.cur;
    const site = D.cur ? D.sites[D.cur] : null;
    document.getElementById('inv-title').textContent = site ? site.name : 'Select a site';
    document.getElementById('inv-meta').textContent  = site ? `${site.zone || ''} · ${site.addr || ''} · Year: ${S.currentYr() || '—'}`.replace(/^·\s*/, '') : '';
    const con = document.getElementById('fx-container');
    const emp = document.getElementById('fx-empty');
    const fx  = S.currentFx();
    if (!site || !fx.length) { con.innerHTML = ''; emp.style.display = 'block'; return; }
    emp.style.display = 'none';
    con.innerHTML = fx.map((f, i) => S.fxCard(f, i)).join('');
  },

  fxCard(f, i) {
    const bc = f.compliant === 'Yes' ? 'bc' : f.compliant === 'No' ? 'bn' : 'bt';
    return `<div class="fx">
      <div class="fxh">
        <span class="fxid"><i class="ti ti-bulb" style="font-size:12px"></i> ${f.fixId || 'Fixture ' + (i + 1)}</span>
        <div style="display:flex;gap:5px;align-items:center">
          ${f.compliant ? `<span class="bdg ${bc}">${f.compliant}</span>` : ''}
          <button class="btn btn-s" onclick="S.editFx('${f.id}')"><i class="ti ti-edit"></i></button>
          <button class="btn btn-s btn-d" onclick="S.delFx('${f.id}')"><i class="ti ti-trash"></i></button>
        </div>
      </div>
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(120px,1fr));gap:5px;font-size:11px">
        <div><span style="color:var(--color-text-secondary,#666)">Purpose:</span> ${f.purpose || '—'}</div>
        <div><span style="color:var(--color-text-secondary,#666)">Type:</span> ${f.lumType || '—'}</div>
        <div><span style="color:var(--color-text-secondary,#666)">Lamp:</span> ${f.lampType || '—'}</div>
        <div><span style="color:var(--color-text-secondary,#666)">CCT:</span> <span style="${S.cctStyle(f.cct)}">${f.cct ? f.cct + 'K' : '—'}</span></div>
        <div><span style="color:var(--color-text-secondary,#666)">Watts:</span> ${f.watts || '—'}${f.watts ? 'W' : ''}</div>
        <div><span style="color:var(--color-text-secondary,#666)">Shielding:</span> ${f.shielding || '—'}</div>
      </div>
      ${f.geoLat ? `<div class="geo" style="margin-top:6px"><i class="ti ti-map-pin" style="color:var(--ct)"></i><span class="geocd">${f.geoLat.toFixed(6)}, ${f.geoLon.toFixed(6)}</span><span style="font-size:9px;color:var(--color-text-secondary,#666)">${f.geoSrc === 'exif' ? '📷 EXIF' : '📍 GPS'}</span></div>` : ''}
      ${(f.photos && f.photos.length) || f.spectrum ? `<div style="margin-top:9px;display:flex;gap:12px;flex-wrap:wrap;align-items:flex-start">
        ${f.photos && f.photos.length ? `<div>
          <div style="font-size:10px;font-weight:500;color:var(--color-text-secondary,#666);margin-bottom:4px;text-transform:uppercase;letter-spacing:.4px">Photos (${f.photos.length})</div>
          <div style="display:flex;gap:5px;flex-wrap:wrap">${f.photos.map((p,pi) => `<img class="pth" src="${p.data}" style="cursor:zoom-in" title="Click to enlarge" onclick="S.lightboxId('${f.id}','photo',${pi})">`).join('')}</div>
        </div>` : ''}
        ${f.spectrum ? `<div>
          <div style="font-size:10px;font-weight:500;color:var(--color-text-secondary,#666);margin-bottom:4px;text-transform:uppercase;letter-spacing:.4px">Spectrum</div>
          <img src="${f.spectrum.data}" style="max-height:75px;border-radius:5px;border:.5px solid rgba(0,0,0,.1);cursor:zoom-in" title="Click to enlarge" onclick="S.lightboxId('${f.id}','spectrum')">
        </div>` : ''}
      </div>` : ''}
      ${f.notes ? `<div style="margin-top:6px;font-size:11px;color:var(--color-text-secondary,#666);padding:.35rem .6rem;background:var(--cgl);border-radius:5px">${f.notes}</div>` : ''}
    </div>`;
  },

  lightboxId(fid, type, idx) {
    const fx = S.currentFx().find(x => x.id === fid);
    if (!fx) return;
    const src = type === 'spectrum'
      ? (fx.spectrum && fx.spectrum.data)
      : (fx.photos && fx.photos[idx] && fx.photos[idx].data);
    if (!src) return;
    const ov = document.createElement('div');
    ov.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.88);z-index:2000;display:flex;align-items:center;justify-content:center;cursor:zoom-out;padding:1rem';
    ov.title = 'Click to close';
    ov.onclick = () => ov.remove();
    const img = document.createElement('img');
    img.src = src;
    img.style.cssText = 'max-width:94vw;max-height:90vh;border-radius:8px;box-shadow:0 8px 40px rgba(0,0,0,.6)';
    ov.appendChild(img);
    document.body.appendChild(ov);
  },

  cctStyle(cct) {
    if (!cct) return '';
    const k = parseInt(cct);
    return k <= 2200 ? 'color:var(--ct);font-weight:500' : k <= 2700 ? 'color:var(--ct)' : k <= 3000 ? 'color:var(--ca)' : 'color:var(--cr)';
  },

  addFixture() { if (!D.cur) { alert('Select a site first.'); return; } S._editId = null; S.modal({}); },
  editFx(id)   { S._editId = id; S.modal(S.currentFx().find(x => x.id === id) || {}); },

  delFx(id) {
    if (!confirm('Delete this fixture?')) return;
    const site = D.sites[D.cur], yr = S.currentYr();
    site.surveys[yr].fixtures = site.surveys[yr].fixtures.filter(f => f.id !== id);
    site.updated = Date.now();
    saveData(); S.renderInv(); S.renderSites();
  },

  // ── FIXTURE MODAL ─────────────────────────────────────────────────────────

  modal(f) {
    const ov = document.createElement('div');
    ov.id = 'modal-ov';
    ov.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.45);z-index:1000;display:flex;align-items:flex-start;justify-content:center;overflow-y:auto;padding:1rem';
    ov.innerHTML = `<div style="background:var(--color-background-primary,#fff);border-radius:var(--r);max-width:640px;width:100%;padding:1.25rem;margin:auto">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem">
        <div style="font-size:14px;font-weight:500">${S._editId ? 'Edit' : 'Add'} luminaire</div>
        <button class="btn btn-s" onclick="document.getElementById('modal-ov').remove()"><i class="ti ti-x"></i></button>
      </div>
      <div class="fg" style="margin-bottom:.8rem">
        <div class="fgi"><label>Fixture ID</label><input id="fi-id" value="${f.fixId || ''}" placeholder="e.g. F-01"></div>
        <div class="fgi"><label>${mkTip('zone', 'Zone')}</label><select id="fi-zone"><option value="">—</option>${sel(['LZ0','LZ1','LZ2','LZ3'], f.zone)}</select></div>
        <div class="fgi" style="grid-column:span 2"><label>Location / area</label><input id="fi-loc" value="${f.location || ''}" placeholder="Building, area, or landmark"></div>
        <div class="fgi" style="grid-column:span 2"><label>Purpose / target</label><select id="fi-pur"><option value="">Select…</option>${sel(PURPOSES, f.purpose)}</select></div>
        <div class="fgi"><label>${mkTip('activity', 'Activity level')}</label><select id="fi-act"><option value="">—</option>${sel(ACTIVITIES, f.activity)}</select></div>
        <div class="fgi"><label>No. of luminaires</label><input type="number" id="fi-num" value="${f.numLuminaires || 1}" min="1"></div>
      </div>
      <details open style="margin-bottom:.7rem;border:.5px solid rgba(0,0,0,.1);border-radius:8px;padding:.65rem">
        <summary><span class="chev">›</span> ${mkTip('lumType', 'Luminaire details')}</summary>
        <div class="fg" style="margin-top:.7rem">
          <div class="fgi"><label>Lamps per luminaire</label><input type="number" id="fi-lpl" value="${f.lampsPerLum || 1}" min="1"></div>
          <div class="fgi"><label>${mkTip('lumType', 'Luminaire type')}</label><select id="fi-lt"><option value="">Select…</option>${sel(LUMTYPES, f.lumType)}</select></div>
          <div class="fgi"><label>${mkShieldTip()}</label><select id="fi-sh"><option value="">Select…</option>${sel(SHIELDS, f.shielding)}</select></div>
          <div class="fgi"><label>Mounting height (m)</label><input type="number" id="fi-ht" value="${f.mountHeight || ''}" step="0.1" min="0"></div>
        </div>
      </details>
      <details open style="margin-bottom:.7rem;border:.5px solid rgba(0,0,0,.1);border-radius:8px;padding:.65rem">
        <summary><span class="chev">›</span> ${mkTip('lampType', 'Lamp details')}</summary>
        <div class="fg" style="margin-top:.7rem">
          <div class="fgi"><label>${mkTip('lampType', 'Lamp type')}</label><select id="fi-lamp"><option value="">Select…</option>${sel(LAMPTYPES, f.lampType)}</select></div>
          <div class="fgi"><label>${mkTip('cct', 'CCT (K)')}</label><input type="number" id="fi-cct" value="${f.cct || ''}" placeholder="e.g. 2200" min="1800" max="6500" step="50" oninput="S.cctHint(this.value)"><span style="font-size:10px;margin-top:1px" id="cct-tip"></span></div>
          <div class="fgi"><label>Watts</label><input type="number" id="fi-w" value="${f.watts || ''}" step="0.1" min="0"></div>
          <div class="fgi"><label>Lumens</label><input type="number" id="fi-lm" value="${f.lumens || ''}" min="0"></div>
        </div>
      </details>
      <details open style="margin-bottom:.7rem;border:.5px solid rgba(0,0,0,.1);border-radius:8px;padding:.65rem">
        <summary><span class="chev">›</span> Control & compliance</summary>
        <div class="fg" style="margin-top:.7rem">
          <div class="fgi"><label>When needed</label><select id="fi-when"><option value="">—</option>${sel(WHEN, f.whenNeeded)}</select></div>
          <div class="fgi"><label>Control type</label><select id="fi-ctrl"><option value="">—</option>${sel(CONTROLS, f.control)}</select></div>
          <div class="fgi"><label>Operable?</label><select id="fi-op"><option value="">—</option>${sel(['Yes','No','Broken – TBD','Unknown'], f.operable)}</select></div>
          <div class="fgi"><label>Compliant?</label><select id="fi-comp"><option value="">—</option>${sel(['Yes','No','To be determined'], f.compliant)}</select></div>
        </div>
      </details>
      <details style="margin-bottom:.7rem;border:.5px solid rgba(0,0,0,.1);border-radius:8px;padding:.65rem">
        <summary><span class="chev">›</span> Geolocation</summary>
        <div style="margin-top:.7rem">
          <div id="geo-status" class="geo">${f.geoLat ? `<i class="ti ti-map-pin" style="color:var(--ct)"></i><span class="geocd">${f.geoLat.toFixed(6)}, ${f.geoLon.toFixed(6)}</span><span style="font-size:9px">${f.geoSrc === 'exif' ? 'EXIF' : 'GPS'}</span>` : `<i class="ti ti-map-pin"></i><span style="color:var(--color-text-secondary,#666)">No location — upload a geo-tagged photo or capture below</span>`}</div>
          <button class="btn btn-s" style="margin-top:6px" onclick="S.capGeo()"><i class="ti ti-current-location"></i> Capture GPS now</button>
        </div>
      </details>
      <div class="fgi" style="margin-bottom:.8rem"><label>Notes</label><textarea id="fi-notes">${f.notes || ''}</textarea></div>
      <div style="display:flex;gap:6px;justify-content:flex-end">
        <button class="btn" onclick="document.getElementById('modal-ov').remove()">Cancel</button>
        <button class="btn btn-p" onclick="S.saveFx()"><i class="ti ti-check"></i> Save</button>
      </div>
    </div>`;
    document.body.appendChild(ov);
    if (f.cct) S.cctHint(f.cct);
    S._tmpGeo = f.geoLat ? { lat: f.geoLat, lon: f.geoLon, acc: f.geoAccuracy, src: f.geoSrc } : null;
  },

  cctHint(v) {
    const tip = document.getElementById('cct-tip');
    if (!tip) return;
    const k = parseInt(v);
    if (!k) { tip.textContent = ''; return; }
    if      (k <= 2200) { tip.textContent = '✓ Best practice';     tip.style.color = 'var(--ct)'; }
    else if (k <= 2700) { tip.textContent = '✓ Acceptable';        tip.style.color = 'var(--ct)'; }
    else if (k <= 3000) { tip.textContent = '⚠ Marginal';         tip.style.color = 'var(--ca)'; }
    else                { tip.textContent = '✗ Not recommended';   tip.style.color = 'var(--cr)'; }
  },

  _tmpGeo: null,
  _editId:  null,

  capGeo() {
    if (!navigator.geolocation) { alert('Geolocation not available.'); return; }
    const st = document.getElementById('geo-status');
    st.innerHTML = '<i class="ti ti-loader"></i> Getting location…';
    navigator.geolocation.getCurrentPosition(
      p => {
        S._tmpGeo = { lat: p.coords.latitude, lon: p.coords.longitude, acc: p.coords.accuracy, src: 'gps' };
        st.innerHTML = `<i class="ti ti-map-pin" style="color:var(--ct)"></i><span class="geocd">${p.coords.latitude.toFixed(6)}, ${p.coords.longitude.toFixed(6)}</span><span style="font-size:9px">±${Math.round(p.coords.accuracy)}m</span>`;
      },
      e => { st.innerHTML = '<i class="ti ti-map-pin-off" style="color:var(--cr)"></i> ' + e.message; },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  },

  saveFx() {
    const site = D.sites[D.cur], yr = S.currentYr(), fx = site.surveys[yr].fixtures;
    const f = S._editId ? fx.find(x => x.id === S._editId) : { id: 'f' + Date.now(), photos: [], spectrum: null };
    f.fixId        = document.getElementById('fi-id').value;
    f.zone         = document.getElementById('fi-zone').value;
    f.location     = document.getElementById('fi-loc').value;
    f.purpose      = document.getElementById('fi-pur').value;
    f.activity     = document.getElementById('fi-act').value;
    f.numLuminaires= parseInt(document.getElementById('fi-num').value) || 1;
    f.lampsPerLum  = parseInt(document.getElementById('fi-lpl').value) || 1;
    f.lumType      = document.getElementById('fi-lt').value;
    f.shielding    = document.getElementById('fi-sh').value;
    f.mountHeight  = parseFloat(document.getElementById('fi-ht').value) || null;
    f.lampType     = document.getElementById('fi-lamp').value;
    f.cct          = parseInt(document.getElementById('fi-cct').value) || null;
    f.watts        = parseFloat(document.getElementById('fi-w').value) || null;
    f.lumens       = parseInt(document.getElementById('fi-lm').value) || null;
    f.whenNeeded   = document.getElementById('fi-when').value;
    f.control      = document.getElementById('fi-ctrl').value;
    f.operable     = document.getElementById('fi-op').value;
    f.compliant    = document.getElementById('fi-comp').value;
    f.notes        = document.getElementById('fi-notes').value;
    if (S._tmpGeo) { f.geoLat = S._tmpGeo.lat; f.geoLon = S._tmpGeo.lon; f.geoAccuracy = S._tmpGeo.acc; f.geoSrc = S._tmpGeo.src; }
    if (!S._editId) fx.push(f);
    site.updated = Date.now();
    saveData(); document.getElementById('modal-ov').remove(); S.renderInv(); S.renderSites();
  },

  // ── PHOTOS & SPECTRA ──────────────────────────────────────────────────────

  loadPhotoTab(sid) {
    D.cur = sid;
    const site = D.sites[sid], con = document.getElementById('photo-content');
    if (!site) { con.innerHTML = '<div class="empty"><i class="ti ti-camera"></i><p>Select a site.</p></div>'; return; }
    const fx = S.currentFx();
    if (!fx.length) { con.innerHTML = '<div class="empty"><i class="ti ti-camera"></i><p>No fixtures yet.</p></div>'; return; }
    con.innerHTML = fx.map((f, i) => `<div class="card">
      <div class="ct"><i class="ti ti-bulb"></i> ${f.fixId || 'Fixture ' + (i + 1)} — ${f.location || f.purpose || ''}
        ${f.geoLat
          ? `<span style="font-size:10px;font-weight:400;color:var(--color-text-secondary,#666);margin-left:auto"><i class="ti ti-map-pin"></i> ${f.geoLat.toFixed(5)}, ${f.geoLon.toFixed(5)} ${f.geoSrc === 'exif' ? '(EXIF)' : '(GPS)'}</span>`
          : '<span style="font-size:10px;font-weight:400;color:var(--ca);margin-left:auto"><i class="ti ti-map-pin-off"></i> No location</span>'}
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:.85rem">
        <div>
          <div style="font-size:11px;font-weight:500;margin-bottom:5px;color:var(--color-text-secondary,#666)">Daytime photos</div>
          <div class="pr">${(f.photos || []).map((p, pi) => `<div class="pi"><img class="pth" src="${p.data}" style="cursor:zoom-in" title="Click to enlarge" onclick="S.lightboxId('${f.id}','photo',${pi})"><button class="prm" onclick="S.remPhoto('${f.id}',${pi})">×</button></div>`).join('')}</div>
          <label class="pdrop" style="display:block;margin-top:6px" onclick="document.getElementById('pin-${f.id}').click()">
            <i class="ti ti-camera-plus" style="font-size:16px;display:block;margin-bottom:2px"></i>Add photo
            <span style="font-size:9px;display:block;margin-top:1px">GPS extracted from EXIF automatically</span>
          </label>
          <input type="file" accept="image/*" multiple style="display:none" id="pin-${f.id}" onchange="S.addPhoto(event,'${f.id}')">
        </div>
        <div>
          <div style="font-size:11px;font-weight:500;margin-bottom:5px;color:var(--color-text-secondary,#666)">Spectrum screenshot</div>
          ${f.spectrum
            ? `<img src="${f.spectrum.data}" class="sprev" style="cursor:zoom-in" title="Click to enlarge" onclick="S.lightboxId('${f.id}','spectrum')" alt="Spectrum"><button class="btn btn-s btn-d" style="margin-top:5px" onclick="S.remSpec('${f.id}')"><i class="ti ti-trash"></i> Remove</button>`
            : `<label class="sdrop" style="display:block" onclick="document.getElementById('sin-${f.id}').click()"><i class="ti ti-wave-sine" style="font-size:16px;display:block;margin-bottom:2px"></i>Upload spectrum<span style="font-size:9px;display:block;margin-top:1px">PNG/JPG from spectrometer app</span></label><input type="file" accept="image/*" style="display:none" id="sin-${f.id}" onchange="S.addSpec(event,'${f.id}')">`}
        </div>
      </div>
    </div>`).join('');
  },

  addPhoto(ev, fid) {
    const site = D.sites[D.cur], yr = S.currentYr();
    const f = site.surveys[yr].fixtures.find(x => x.id === fid);
    if (!f) return;
    const files = Array.from(ev.target.files);
    let done = 0;
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = e => {
        const data = e.target.result;
        const obj  = { data, name: file.name, size: file.size, addedAt: Date.now() };
        try {
          const img = new Image();
          img.src = data;
          img.onload = () => {
            try {
              EXIF.getData(img, function () {
                const la = EXIF.getTag(this, 'GPSLatitude'),  laR = EXIF.getTag(this, 'GPSLatitudeRef');
                const lo = EXIF.getTag(this, 'GPSLongitude'), loR = EXIF.getTag(this, 'GPSLongitudeRef');
                if (la && lo) {
                  obj.lat = dmsToDD(la, laR); obj.lon = dmsToDD(lo, loR);
                  if (!f.geoLat || f.geoSrc === 'exif') { f.geoLat = obj.lat; f.geoLon = obj.lon; f.geoSrc = 'exif'; }
                }
                f.photos.push(obj); done++;
                if (done === files.length) { site.updated = Date.now(); saveData(); S.loadPhotoTab(D.cur); S.renderInv(); }
              });
            } catch { f.photos.push(obj); done++; if (done === files.length) { site.updated = Date.now(); saveData(); S.loadPhotoTab(D.cur); S.renderInv(); } }
          };
        } catch { f.photos.push(obj); done++; if (done === files.length) { site.updated = Date.now(); saveData(); S.loadPhotoTab(D.cur); S.renderInv(); } }
      };
      reader.readAsDataURL(file);
    });
  },

  remPhoto(fid, idx) {
    const site = D.sites[D.cur], yr = S.currentYr();
    const f = site.surveys[yr].fixtures.find(x => x.id === fid);
    if (!f) return;
    f.photos.splice(idx, 1); site.updated = Date.now(); saveData(); S.loadPhotoTab(D.cur);
  },

  addSpec(ev, fid) {
    const site = D.sites[D.cur], yr = S.currentYr();
    const f = site.surveys[yr].fixtures.find(x => x.id === fid);
    if (!f) return;
    const file = ev.target.files[0]; if (!file) return;
    const r = new FileReader();
    r.onload = e => { f.spectrum = { data: e.target.result, name: file.name, addedAt: Date.now() }; site.updated = Date.now(); saveData(); S.loadPhotoTab(D.cur); };
    r.readAsDataURL(file);
  },

  remSpec(fid) {
    const site = D.sites[D.cur], yr = S.currentYr();
    const f = site.surveys[yr].fixtures.find(x => x.id === fid);
    if (!f) return;
    f.spectrum = null; site.updated = Date.now(); saveData(); S.loadPhotoTab(D.cur);
  },

  // ── REPORT ────────────────────────────────────────────────────────────────

  loadReport(sid) {
    D.cur = sid;
    const selEl = document.getElementById('report-sel'); if (selEl) selEl.value = sid;
    const site  = D.sites[sid], con = document.getElementById('report-content');
    if (!site) { con.innerHTML = '<div class="empty"><i class="ti ti-chart-bar"></i><p>Select a site.</p></div>'; return; }
    const yrs  = Object.keys(site.surveys || {}).sort();
    const ly   = yrs[yrs.length - 1];
    const fx   = ly ? (site.surveys[ly].fixtures || []) : [];
    const prev = yrs.length > 1 ? yrs[yrs.length - 2] : null;
    const pfx  = prev ? (site.surveys[prev].fixtures || []) : [];
    const total   = fx.reduce((s, f) => s + (f.numLuminaires || 1), 0);
    const compliant = fx.filter(f => f.compliant === 'Yes').length;
    const nonC    = fx.filter(f => f.compliant === 'No').length;
    const totalW  = fx.reduce((s, f) => s + (f.watts || 0) * (f.numLuminaires || 1) * (f.lampsPerLum || 1), 0);
    const geo     = fx.filter(f => f.geoLat);
    const spectra = fx.filter(f => f.spectrum).length;
    const photos  = fx.filter(f => f.photos && f.photos.length).length;
    const cctWarn = fx.filter(f => f.cct && f.cct > 2700).length;
    const unsh    = fx.filter(f => f.shielding === 'Unshielded' || f.shielding === 'Partially').length;
    const cr      = fx.length ? Math.round((compliant / fx.length) * 100) : 0;
    con.innerHTML = `
      <div class="card">
        <div class="ct"><i class="ti ti-building"></i> ${site.name} — ${ly}</div>
        <div style="font-size:11px;color:var(--color-text-secondary,#666);margin-bottom:.75rem">${site.zone || ''} · ${site.addr || ''} · ${site.surv || ''}</div>
        <div class="sg">
          <div class="sc"><div class="sl">Fixtures</div><div class="sv">${fx.length}</div></div>
          <div class="sc"><div class="sl">Luminaires</div><div class="sv">${total}</div></div>
          <div class="sc"><div class="sl">Compliant</div><div class="sv" style="color:var(--ct)">${compliant}</div></div>
          <div class="sc"><div class="sl">Non-compliant</div><div class="sv" style="color:var(--cr)">${nonC}</div></div>
          <div class="sc"><div class="sl">Total watts</div><div class="sv">${Math.round(totalW)}</div></div>
          <div class="sc"><div class="sl">Geo-tagged</div><div class="sv">${geo.length}/${fx.length}</div></div>
          <div class="sc"><div class="sl">Spectra</div><div class="sv">${spectra}</div></div>
          <div class="sc"><div class="sl">Photos</div><div class="sv">${photos}</div></div>
        </div>
        <div style="font-size:11px;font-weight:500;margin-bottom:3px">Compliance rate</div>
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:.85rem"><div style="flex:1"><div class="pb"><div class="pf" style="width:${cr}%"></div></div></div><span style="font-size:12px;font-weight:500;color:var(--ct)">${cr}%</span></div>
        ${cctWarn ? `<div class="al ai"><i class="ti ti-thermometer" style="flex-shrink:0"></i><span><strong>${cctWarn} fixture${cctWarn !== 1 ? 's' : ''}</strong> with CCT &gt;2700K.</span></div>` : ''}
        ${unsh    ? `<div class="al aw"><i class="ti ti-shield-off" style="flex-shrink:0"></i><span><strong>${unsh} fixture${unsh !== 1 ? 's' : ''}</strong> partially or fully unshielded.</span></div>` : ''}
      </div>
      ${S.buildMap(geo)}
      ${S.buildYoY(fx, pfx, ly, prev, yrs, cr, totalW, cctWarn)}
      <div class="card"><div class="ct"><i class="ti ti-list-details"></i> Fixture table</div>
        <div style="overflow-x:auto"><table><thead><tr><th>ID</th><th>Purpose</th><th>Type</th><th>CCT</th><th>W</th><th>Shielding</th><th>Control</th><th>Status</th><th>Geo</th></tr></thead>
        <tbody>${fx.map((f, i) => `<tr><td>${f.fixId || 'F-' + (i + 1)}</td><td>${f.purpose || '—'}</td><td>${f.lumType || '—'}</td><td style="${S.cctStyle(f.cct)}">${f.cct ? f.cct + 'K' : '—'}</td><td>${f.watts ? f.watts + 'W' : '—'}</td><td>${f.shielding || '—'}</td><td>${f.control || '—'}</td><td><span class="bdg ${f.compliant === 'Yes' ? 'bc' : f.compliant === 'No' ? 'bn' : 'bt'}">${f.compliant || 'TBD'}</span></td><td>${f.geoLat ? `<span style="color:var(--ct)">${f.geoSrc === 'exif' ? '📷' : '📍'}</span>` : '—'}</td></tr>`).join('')}</tbody>
        </table></div>
      </div>`;
  },

  buildMap(geo) {
    if (!geo.length) return `<div class="card"><div class="ct"><i class="ti ti-map"></i> Map</div><div style="text-align:center;padding:1.5rem;color:var(--color-text-secondary,#666);font-size:12px"><i class="ti ti-map-pin-off" style="font-size:24px;display:block;margin-bottom:.4rem;opacity:.3"></i>No geo-tagged fixtures yet.</div></div>`;
    const lats = geo.map(f => f.geoLat), lons = geo.map(f => f.geoLon);
    let [minLat, maxLat, minLon, maxLon] = [Math.min(...lats), Math.max(...lats), Math.min(...lons), Math.max(...lons)];
    const pLa = (maxLat - minLat) * .18 || .0004, pLo = (maxLon - minLon) * .18 || .0004;
    minLat -= pLa; maxLat += pLa; minLon -= pLo; maxLon += pLo;
    const W = 620, H = 250;
    const tx = lon => ((lon - minLon) / (maxLon - minLon)) * W;
    const ty = lat => H - ((lat - minLat) / (maxLat - minLat)) * H;
    let grid = '';
    for (let i = 0; i <= 4; i++) { grid += `<line x1="${i*(W/4)}" y1="0" x2="${i*(W/4)}" y2="${H}" stroke="rgba(0,0,0,.05)" stroke-width="1"/><line x1="0" y1="${i*(H/4)}" x2="${W}" y2="${i*(H/4)}" stroke="rgba(0,0,0,.05)" stroke-width="1"/>`; }
    const pins = geo.map((f, i) => {
      const x = tx(f.geoLon), y = ty(f.geoLat);
      const col = f.compliant === 'Yes' ? '#0F6E56' : f.compliant === 'No' ? '#A32D2D' : '#BA7517';
      const lbl = (f.fixId || 'F' + (i + 1)).substring(0, 4);
      return `<g><circle cx="${x}" cy="${y}" r="9" fill="${col}" fill-opacity=".85" stroke="#fff" stroke-width="1.5"/><text x="${x}" y="${y+3.5}" text-anchor="middle" font-size="7" font-weight="600" fill="#fff">${lbl}</text><title>${f.fixId || 'F' + (i+1)} · ${f.geoLat.toFixed(5)}, ${f.geoLon.toFixed(5)} · ${f.compliant || 'TBD'}</title></g>`;
    }).join('');
    const leg = `<g transform="translate(6,${H-36})"><rect x="0" y="0" width="106" height="32" rx="4" fill="rgba(255,255,255,.92)" stroke="rgba(0,0,0,.08)" stroke-width="0.5"/><circle cx="10" cy="9" r="5" fill="#0F6E56"/><text x="18" y="13" font-size="8" fill="#444">Compliant</text><circle cx="10" cy="23" r="5" fill="#A32D2D"/><text x="18" y="27" font-size="8" fill="#444">Non-compliant</text><circle cx="62" cy="9" r="5" fill="#BA7517"/><text x="70" y="13" font-size="8" fill="#444">TBD</text></g>`;
    return `<div class="card"><div class="ct"><i class="ti ti-map"></i> Fixture map — ${geo.length} geo-tagged</div><div class="map-container"><svg viewBox="0 0 ${W} ${H}" style="width:100%;height:100%;background:#eef3ee">${grid}${pins}${leg}<text x="3" y="${H-3}" font-size="7" fill="rgba(0,0,0,.3)">${minLat.toFixed(4)}°, ${minLon.toFixed(4)}°</text><text x="${W-3}" y="${H-3}" font-size="7" fill="rgba(0,0,0,.3)" text-anchor="end">${maxLat.toFixed(4)}°, ${maxLon.toFixed(4)}°</text></svg></div><p style="font-size:10px;color:var(--color-text-secondary,#666);margin-top:.4rem">Relative position map. 📷 EXIF · 📍 GPS captured. Hover pins for details.</p></div>`;
  },

  buildYoY(fx, pfx, ly, prev, yrs, cr, totalW, cctWarn) {
    function df(a, b, inv) {
      if (a === b) return '<span class="diff-eq">= same</span>';
      const better = inv ? (a < b) : (a > b);
      return better ? `<span class="diff-up">▲ ${Math.abs(a - b)}</span>` : `<span class="diff-dn">▼ ${Math.abs(a - b)}</span>`;
    }
    const nextYr = `<button class="btn btn-p btn-s" onclick="S.newSurveyYr()"><i class="ti ti-calendar-plus"></i> Start ${parseInt(ly || new Date().getFullYear()) + 1} survey</button>`;
    if (prev && pfx.length) {
      const ptotal = pfx.reduce((s, f) => s + (f.numLuminaires || 1), 0);
      const pc     = pfx.filter(f => f.compliant === 'Yes').length;
      const pcr    = pfx.length ? Math.round((pc / pfx.length) * 100) : 0;
      const ptW    = pfx.reduce((s, f) => s + (f.watts || 0) * (f.numLuminaires || 1) * (f.lampsPerLum || 1), 0);
      const pCW    = pfx.filter(f => f.cct && f.cct > 2700).length;
      const curTotal = fx.reduce((s, f) => s + (f.numLuminaires || 1), 0);
      return `<div class="card"><div class="ct"><i class="ti ti-git-compare"></i> Year-over-year</div><div class="yoy-grid">
        <div class="yoy-card"><div class="yoy-year">${prev}</div><div style="font-size:11px;display:grid;gap:4px"><div style="display:flex;justify-content:space-between"><span>Fixtures</span><strong>${pfx.length}</strong></div><div style="display:flex;justify-content:space-between"><span>Luminaires</span><strong>${ptotal}</strong></div><div style="display:flex;justify-content:space-between"><span>Compliant</span><strong>${pc} (${pcr}%)</strong></div><div style="display:flex;justify-content:space-between"><span>Watts</span><strong>${Math.round(ptW)}W</strong></div><div style="display:flex;justify-content:space-between"><span>CCT warnings</span><strong>${pCW}</strong></div></div></div>
        <div class="yoy-card" style="border-color:rgba(15,110,86,.3)"><div class="yoy-year">${ly} (current)</div><div style="font-size:11px;display:grid;gap:4px"><div style="display:flex;justify-content:space-between"><span>Fixtures</span><strong>${fx.length} ${df(fx.length, pfx.length, false)}</strong></div><div style="display:flex;justify-content:space-between"><span>Luminaires</span><strong>${curTotal} ${df(curTotal, ptotal, false)}</strong></div><div style="display:flex;justify-content:space-between"><span>Compliant</span><strong>${fx.filter(f=>f.compliant==='Yes').length} (${cr}%) ${df(cr, pcr, false)}</strong></div><div style="display:flex;justify-content:space-between"><span>Watts</span><strong>${Math.round(totalW)}W ${df(Math.round(totalW), Math.round(ptW), true)}</strong></div><div style="display:flex;justify-content:space-between"><span>CCT warnings</span><strong>${cctWarn} ${df(cctWarn, pCW, true)}</strong></div></div></div>
      </div><div style="margin-top:.65rem"><div style="font-size:11px;font-weight:500;margin-bottom:4px">All survey years</div><div style="display:flex;gap:5px;flex-wrap:wrap;margin-bottom:.65rem">${yrs.map(y => `<span class="bdg ${y === ly ? 'bc' : 'bt'}">${y}</span>`).join('')}</div>${nextYr}</div></div>`;
    }
    return `<div class="card"><div class="ct"><i class="ti ti-calendar"></i> Survey years</div><p style="font-size:11px;color:var(--color-text-secondary,#666);margin-bottom:.65rem">Only one year so far. Return next year to enable comparison.</p><div style="display:flex;gap:5px;flex-wrap:wrap;margin-bottom:.65rem">${yrs.map(y => `<span class="bdg bc">${y}</span>`).join('')}</div>${nextYr}</div>`;
  },

  newSurveyYr() {
    if (!D.cur) return;
    const site = D.sites[D.cur], yrs = Object.keys(site.surveys || {}).sort();
    const last = parseInt(yrs[yrs.length - 1] || new Date().getFullYear());
    const ny   = (last + 1).toString();
    if (site.surveys[ny]) { alert(ny + ' survey already exists.'); return; }
    const prev = site.surveys[yrs[yrs.length - 1]] ? site.surveys[yrs[yrs.length - 1]].fixtures : [];
    site.surveys[ny] = {
      year: ny, created: Date.now(),
      fixtures: prev.map(f => ({ id: 'f' + Date.now() + Math.random().toString(36).slice(2), fixId: f.fixId, location: f.location, purpose: f.purpose, zone: f.zone, lumType: f.lumType, lampType: f.lampType, shielding: f.shielding, mountHeight: f.mountHeight, numLuminaires: f.numLuminaires, lampsPerLum: f.lampsPerLum, photos: [], spectrum: null, compliant: 'To be determined', notes: '' }))
    };
    saveData();
    alert(`${ny} survey created with ${prev.length} fixture(s) carried over.`);
    S.loadReport(D.cur);
  },

  exportCSV() {
    const site = D.sites[D.cur]; if (!site) { alert('Select a site.'); return; }
    const yr   = S.currentYr(), fx = site.surveys[yr] ? site.surveys[yr].fixtures : [];
    const h    = ['Survey Year','Fixture ID','Zone','Location','Purpose','Activity','Num Luminaires','Lamps/Luminaire','Luminaire Type','Shielding','Mount Height (m)','Lamp Type','CCT (K)','Watts','Lumens','When Needed','Control','Operable','Compliant','Geo Lat','Geo Lon','Geo Accuracy (m)','Geo Source','Photo Count','Photo 1 (base64)','Photo 2 (base64)','Photo 3 (base64)','Spectrum (base64)','Notes'];
    const rows = fx.map(f => {
      const photos = f.photos || [];
      const row = [yr, f.fixId, f.zone, f.location, f.purpose, f.activity, f.numLuminaires, f.lampsPerLum, f.lumType, f.shielding, f.mountHeight, f.lampType, f.cct, f.watts, f.lumens, f.whenNeeded, f.control, f.operable, f.compliant, f.geoLat ? f.geoLat.toFixed(6) : '', f.geoLon ? f.geoLon.toFixed(6) : '', f.geoAccuracy ? Math.round(f.geoAccuracy) : '', f.geoSrc || '', photos.length, photos[0] ? photos[0].data : '', photos[1] ? photos[1].data : '', photos[2] ? photos[2].data : '', f.spectrum ? f.spectrum.data : '', f.notes];
      return row.map(v => '"' + (v || '').toString().replace(/"/g, '""') + '"');
    });
    const csv  = [h.join(','), ...rows.map(r => r.join(','))].join('\n');
    const b    = new Blob([csv], { type: 'text/csv' });
    const u    = URL.createObjectURL(b);
    const a    = document.createElement('a');
    a.href = u; a.download = `lighting-${site.name.replace(/\s+/g, '-')}-${yr}.csv`;
    document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(u);
  },

  // ── IMPORT ────────────────────────────────────────────────────────────────

  initImport() { S.fillSels(); },

  showImportMode(mode) {
    document.getElementById('imp-csv').classList.toggle('hidden', mode !== 'csv');
    document.getElementById('imp-manual').classList.toggle('hidden', mode !== 'manual');
    document.getElementById('imp-csv-btn').classList.toggle('btn-p', mode === 'csv');
    document.getElementById('imp-manual-btn').classList.toggle('btn-p', mode === 'manual');
    S.fillSels();
    if (mode === 'manual') S._manualFxCount = 0;
  },

  parseCSV(ev) {
    const file = ev.target.files[0]; if (!file) return;
    const reader = new FileReader();
    reader.onload = e => {
      const lines = e.target.result.split('\n').filter(l => l.trim());
      if (!lines.length) { alert('Empty file.'); return; }
      const parse = line => {
        const r = []; let cur = '', inQ = false;
        for (let i = 0; i < line.length; i++) {
          const c = line[i];
          if (c === '"') { if (inQ && line[i + 1] === '"') { cur += '"'; i++; } else inQ = !inQ; }
          else if (c === ',' && !inQ) { r.push(cur.trim()); cur = ''; }
          else cur += c;
        }
        r.push(cur.trim()); return r;
      };
      const hdr = parse(lines[0]), rows = lines.slice(1).map(parse);
      const isLegacy = hdr[0] && hdr[0].toLowerCase().includes('fixture id');
      const COL = { yr:0,fixId:1,zone:2,loc:3,pur:4,act:5,num:6,lpl:7,lt:8,sh:9,ht:10,lamp:11,cct:12,w:13,lm:14,when:15,ctrl:16,op:17,comp:18,lat:19,lon:20,acc:21,gsrc:22 };
      const imported = rows.map((r, i) => {
        if (!r || r.length < 4) return null;
        const g = (k, fallback = '') => (isLegacy ? r[COL[k]] : r[COL[k]]) || fallback;
        const fixture = { r: i + 2,
          yr: g('yr'), fixId: g('fixId'), zone: g('zone'), loc: g('loc'), pur: g('pur'), act: g('act'),
          num: parseInt(g('num')) || 1, lpl: parseInt(g('lpl')) || 1, lt: g('lt'), sh: g('sh'),
          ht: parseFloat(g('ht')) || null, lamp: g('lamp'), cct: parseInt(g('cct')) || null,
          w: parseFloat(g('w')) || null, lm: parseInt(g('lm')) || null,
          when: g('when'), ctrl: g('ctrl'), op: g('op'), comp: g('comp'),
          lat: parseFloat(g('lat')) || null, lon: parseFloat(g('lon')) || null,
          acc: parseFloat(g('acc')) || null, gsrc: g('gsrc'), warn: []
        };
        if (fixture.cct && fixture.cct > 2700) fixture.warn.push('CCT>2700K');
        if (!fixture.sh) fixture.warn.push('no shielding data');
        return fixture;
      }).filter(Boolean);

      const preview = document.getElementById('csv-preview');
      preview.classList.remove('hidden');
      preview.innerHTML = `<div style="font-size:12px;font-weight:500;margin-bottom:.5rem">${imported.length} rows found${isLegacy ? ' (RASC legacy format)' : ''}</div>
        ${imported.slice(0, 10).map(r => `<div class="imp-row"><span style="color:var(--color-text-secondary,#666);min-width:40px">row ${r.r}</span><span class="${r.warn.length ? 'imp-warn' : 'imp-ok'}">${r.fixId || '(no ID)'}</span><span style="color:var(--color-text-secondary,#666)">${r.pur || '—'} · ${r.cct ? r.cct + 'K' : '—'} · ${r.sh || '—'} ${r.warn.length ? '⚠ ' + r.warn.join(', ') : ''}</span></div>`).join('')}
        ${imported.length > 10 ? `<div style="font-size:10px;color:var(--color-text-secondary,#666);margin-top:4px">…and ${imported.length - 10} more</div>` : ''}
        <div style="margin-top:.75rem;display:flex;gap:6px;flex-wrap:wrap">
          <select id="imp-csv-site" style="font-size:12px;padding:4px 8px;border-radius:6px;border:.5px solid rgba(0,0,0,.2)"><option value="">Select target site…</option>${Object.values(D.sites).map(s => `<option value="${s.id}">${s.name}</option>`).join('')}</select>
          <input type="number" id="imp-csv-yr" placeholder="Year" value="${imported[0] && imported[0].yr || new Date().getFullYear()}" style="width:80px;font-size:12px;padding:4px 8px;border-radius:6px;border:.5px solid rgba(0,0,0,.2)">
          <button class="btn btn-p btn-s" onclick="S.doImport(${JSON.stringify(imported).replace(/</g, '\\x3c')})"><i class="ti ti-check"></i> Import ${imported.length} fixtures</button>
        </div>`;
    };
    reader.readAsText(file);
  },

  doImport(rows) {
    const sid = document.getElementById('imp-csv-site').value;
    const yr  = document.getElementById('imp-csv-yr').value.trim();
    if (!sid) { alert('Select a target site.'); return; }
    if (!yr)  { alert('Enter a survey year.'); return; }
    const site = D.sites[sid];
    if (!site.surveys) site.surveys = {};
    if (!site.surveys[yr]) site.surveys[yr] = { year: yr, fixtures: [], created: Date.now() };
    rows.forEach(r => {
      site.surveys[yr].fixtures.push({ id: 'f' + Date.now() + Math.random().toString(36).slice(2), fixId: r.fixId, zone: r.zone, location: r.loc, purpose: r.pur, activity: r.act, numLuminaires: r.num, lampsPerLum: r.lpl, lumType: r.lt, shielding: r.sh, mountHeight: r.ht, lampType: r.lamp, cct: r.cct, watts: r.w, lumens: r.lm, whenNeeded: r.when, control: r.ctrl, operable: r.op, compliant: r.comp, geoLat: r.lat, geoLon: r.lon, geoAccuracy: r.acc, geoSrc: r.gsrc, photos: [], spectrum: null, notes: '' });
    });
    site.updated = Date.now(); saveData(); S.renderSites(); S.fillSels();
    alert(`✓ Imported ${rows.length} fixtures into "${site.name}" — ${yr} survey.`);
    document.getElementById('csv-preview').classList.add('hidden');
    document.getElementById('csv-file-in').value = '';
  },

  _manualFxCount: 0,

  addManualFx() {
    const n = S._manualFxCount++;
    const row = document.createElement('div');
    row.id = 'mfx-' + n;
    row.style.cssText = 'display:grid;grid-template-columns:repeat(auto-fit,minmax(120px,1fr));gap:6px;padding:.65rem;background:var(--cgl);border-radius:7px;margin-bottom:.5rem';
    row.innerHTML = `<div class="fgi"><label>Fixture ID</label><input class="mf-id" placeholder="F-01"></div>
      <div class="fgi"><label>Purpose</label><select class="mf-pur"><option value="">—</option>${PURPOSES.map(p => `<option>${p}</option>`).join('')}</select></div>
      <div class="fgi"><label>Lum. type</label><select class="mf-lt"><option value="">—</option>${LUMTYPES.map(t => `<option>${t}</option>`).join('')}</select></div>
      <div class="fgi"><label>Lamp type</label><select class="mf-lamp"><option value="">—</option>${LAMPTYPES.map(t => `<option>${t}</option>`).join('')}</select></div>
      <div class="fgi"><label>CCT (K)</label><input type="number" class="mf-cct" placeholder="2200"></div>
      <div class="fgi"><label>Watts</label><input type="number" class="mf-w"></div>
      <div class="fgi"><label>Shielding</label><select class="mf-sh"><option value="">—</option>${SHIELDS.map(s => `<option>${s}</option>`).join('')}</select></div>
      <div class="fgi"><label>Compliant</label><select class="mf-comp"><option value="">—</option><option>Yes</option><option>No</option><option>To be determined</option></select></div>
      <button class="btn btn-d btn-s" style="align-self:flex-end" onclick="document.getElementById('mfx-${n}').remove()"><i class="ti ti-trash"></i></button>`;
    document.getElementById('imp-fx-rows').appendChild(row);
  },

  saveManualImport() {
    const sid = document.getElementById('imp-site').value;
    const yr  = document.getElementById('imp-year').value.trim();
    if (!sid) { alert('Select a site.'); return; }
    if (!yr)  { alert('Enter a year.'); return; }
    const site = D.sites[sid];
    if (!site.surveys) site.surveys = {};
    if (!site.surveys[yr]) site.surveys[yr] = { year: yr, fixtures: [], created: Date.now() };
    const rows = document.querySelectorAll('#imp-fx-rows > div');
    rows.forEach(row => {
      site.surveys[yr].fixtures.push({ id: 'f' + Date.now() + Math.random().toString(36).slice(2), fixId: row.querySelector('.mf-id').value, purpose: row.querySelector('.mf-pur').value, lumType: row.querySelector('.mf-lt').value, lampType: row.querySelector('.mf-lamp').value, cct: parseInt(row.querySelector('.mf-cct').value) || null, watts: parseFloat(row.querySelector('.mf-w').value) || null, shielding: row.querySelector('.mf-sh').value, compliant: row.querySelector('.mf-comp').value, numLuminaires: 1, lampsPerLum: 1, photos: [], spectrum: null, notes: '' });
    });
    site.updated = Date.now(); saveData(); S.renderSites(); S.fillSels();
    alert(`✓ Saved ${rows.length} fixtures to "${site.name}" — ${yr}.`);
    document.getElementById('imp-fx-rows').innerHTML = '';
  },

  // ── GUIDE ─────────────────────────────────────────────────────────────────

  renderGuide() {
    document.getElementById('principles-list').innerHTML = PRINCIPLES.map(p =>
      `<div style="display:flex;gap:9px;padding:.6rem;background:var(--cgl);border-radius:7px"><div style="width:26px;height:26px;background:${p[1]};color:#fff;border-radius:5px;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-weight:500;font-size:11px">${p[0]}</div><div><strong style="font-size:12px">${p[2]}</strong><br><span style="font-size:11px;color:var(--color-text-secondary,#666)">${p[3]}</span></div></div>`
    ).join('');
  },

  showOS(os) {
    document.getElementById('ios-inst').classList.toggle('hidden', os !== 'ios');
    document.getElementById('and-inst').classList.toggle('hidden', os !== 'android');
    document.getElementById('ios-btn').classList.toggle('active', os === 'ios');
    document.getElementById('and-btn').classList.toggle('active', os === 'android');
  },

  // ── PWA ───────────────────────────────────────────────────────────────────

  _installPrompt: null,

  installPWA() {
    if (S._installPrompt) { S._installPrompt.prompt(); S._installPrompt = null; document.getElementById('install-banner').style.display = 'none'; }
  }

};

// ── BOOT ──────────────────────────────────────────────────────────────────────

loadData();
S.renderSites();
S.fillSels();
S.renderGuide();

// PWA install prompt
window.addEventListener('beforeinstallprompt', e => {
  e.preventDefault();
  S._installPrompt = e;
  const banner = document.getElementById('install-banner');
  banner.style.display = 'flex';
});

// Service worker registration
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js').catch(() => {});
}
