/**
 * Dark Sky Lighting Inventory — Service Worker
 * Enables offline use as a Progressive Web App
 */

const CACHE = 'dsky-v1';
const ASSETS = [
  './',
  './index.html',
  './src/app.js',
  'https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/dist/tabler-icons.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/exif-js/2.3.0/exif.js'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request).catch(() => caches.match('./index.html')))
  );
});
