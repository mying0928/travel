const CACHE_NAME = 'hangzhou-trip-v1';
const CORE_ASSETS = ['./index.html', './manifest.json', './icon-192.png', './icon-512.png'];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(CORE_ASSETS))
    );
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) =>
            Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))
        )
    );
    self.clients.claim();
});

self.addEventListener('fetch', (event) => {
    const request = event.request;
    if (request.method !== 'GET') return;

    const isCoreDoc = request.mode === 'navigate' || CORE_ASSETS.some((asset) => request.url.endsWith(asset.replace('./', '')));

    if (isCoreDoc) {
        // Network-first for the page shell, so updates show up when online; fall back to cache offline.
        event.respondWith(
            fetch(request)
                .then((response) => {
                    const copy = response.clone();
                    caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
                    return response;
                })
                .catch(() => caches.match(request))
        );
        return;
    }

    // Stale-while-revalidate for everything else (CDN libs, fonts,景點照片等).
    event.respondWith(
        caches.open(CACHE_NAME).then((cache) =>
            cache.match(request).then((cached) => {
                const fetchPromise = fetch(request)
                    .then((response) => {
                        if (response.ok) cache.put(request, response.clone());
                        return response;
                    })
                    .catch(() => cached);
                return cached || fetchPromise;
            })
        )
    );
});
