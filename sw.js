const CACHE_NAME = "trabado-v1";

const FILES_TO_CACHE = [
  "./",
  "./index.html",
  "./juego.html",
  "./reglas.html",
  "./manifest.json",

  "./img/fondo.jpg",
  "./img/reglas.png",
  "./img/zombius.png",
  "./img/icon-192.png",
  "./img/icon-512.png",

  "./sounds/menu.mp3",
  "./sounds/juego.mp3",
  "./sounds/slide.mp3",

  "./fonts/pixelgamer-regular.otf"
];

// instalar
self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE))
  );
  self.skipWaiting();
});

// activar
self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

// fetch
self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(res => res || fetch(e.request))
  );
});