// Closer — Service Worker
// Strategy: cache-first for local files, network-first for CDN
// Bump CACHE_NAME version string to force all clients to update

const CACHE_NAME = 'closer-v2';

const LOCAL_FILES = [
  '/',
  '/index.html',
  '/app.js',
  '/questions.js',
  '/auth.js',
  '/leaderboard.js',
  '/styles.css',
  '/manifest.json',
  '/og-image.svg',
  '/sw.js'
];

// ─── Install: pre-cache all local files ──────────────────────────────────────
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(LOCAL_FILES))
      .then(() => self.skipWaiting()) // activate immediately, no waiting for old tabs to close
  );
});

// ─── Activate: delete stale caches from old versions ─────────────────────────
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      ))
      .then(() => self.clients.claim()) // take control of all open tabs immediately
  );
});

// ─── Fetch: serve from cache or network ──────────────────────────────────────
self.addEventListener('fetch', event => {
  // Only handle GET requests
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);
  const isLocal = url.hostname === self.location.hostname;

  if (isLocal) {
    // Cache-first for local files: instant load, works offline
    event.respondWith(
      caches.match(event.request).then(cached => {
        if (cached) return cached;
        // Not in cache yet — fetch, cache, return
        return fetch(event.request).then(response => {
          if (response.ok) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
          }
          return response;
        });
      })
    );
  } else {
    // Network-first for CDN (Tailwind, Google Fonts, Supabase)
    // Falls back to cache if offline
    event.respondWith(
      fetch(event.request)
        .then(response => {
          if (response.ok) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
          }
          return response;
        })
        .catch(() => caches.match(event.request))
    );
  }
});
