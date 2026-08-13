const CACHE_NAME = "cookshare-live-v11";
const appUrl = path => new URL(path, self.registration.scope).toString();
const FALLBACK_URL = appUrl("cookshare-android-user-app.html");
const APP_FILES = [
  FALLBACK_URL,
  appUrl("cookshare-ui.css?v=4"),
  appUrl("cookshare-recipe-reference.css?v=7"),
  appUrl("cookshare-user-app-live.js?v=5"),
  appUrl("cookshare-manifest.webmanifest"),
  appUrl("cookshare-app-icon.svg"),
  appUrl("assets/recipe-egg-toast.jpg"),
  appUrl("assets/recipe-onion-soup.jpg"),
  appUrl("assets/recipe-tomato-pasta.jpg"),
  appUrl("assets/recipe-ricotta-salad.jpg"),
  appUrl("assets/recipe-cheese-burger.jpg"),
  appUrl("assets/recipe-oat-cookie.jpg"),
  appUrl("assets/recipe-jambon-sandwich.jpg"),
  appUrl("assets/recipe-shrimp-taco.jpg")
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
