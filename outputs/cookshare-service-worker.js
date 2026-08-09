const CACHE_NAME = "cookshare-live-v4";
const appUrl = path => new URL(path, self.registration.scope).toString();
const FALLBACK_URL = appUrl("cookshare-android-user-app.html");
const APP_FILES = [
  FALLBACK_URL,
  appUrl("cookshare-ui.css?v=3"),
  appUrl("cookshare-user-app-live.js?v=3"),
  appUrl("cookshare-manifest.webmanifest"),
  appUrl("cookshare-app-icon.svg")
];

self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(APP_FILES)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key)))).then(() => self.clients.claim()));
});

self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;
  event.respondWith(fetch(event.request).then(response => {
    const copy = response.clone();
    caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
    return response;
  }).catch(() => caches.match(event.request).then(cached => cached || caches.match(FALLBACK_URL))));
});
