const CACHE_NAME = "sec2-portal-v1";
const APP_SHELL = [
  "./",
  "./index.html",
  "./css/style.css",
  "./js/api.js",
  "./js/app.js",
  "./js/ui.js",
  "./js/incidencias.js",
  "./js/reportes.js",
  "./js/notificaciones.js",
  "./logoPng.png",
  "./manifest.json"
];

self.addEventListener("install", function(event) {
  self.skipWaiting();

  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(APP_SHELL).catch(function() {
        return Promise.resolve();
      });
    })
  );
});

self.addEventListener("activate", function(event) {
  event.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(
        keys
          .filter(function(key) {
            return key !== CACHE_NAME;
          })
          .map(function(key) {
            return caches.delete(key);
          })
      );
    }).then(function() {
      return self.clients.claim();
    })
  );
});

self.addEventListener("fetch", function(event) {
  if (event.request.method !== "GET") {
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then(function(response) {
        const copy = response.clone();

        caches.open(CACHE_NAME).then(function(cache) {
          cache.put(event.request, copy).catch(function() {});
        });

        return response;
      })
      .catch(function() {
        return caches.match(event.request).then(function(cached) {
          return cached || caches.match("./index.html");
        });
      })
  );
});
