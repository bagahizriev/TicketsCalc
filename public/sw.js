const CACHE_NAME = "tickets-calc-v2";
const urlsToCache = ["/TicketsCalc/", "/TicketsCalc/offline", "/TicketsCalc/manifest.json", "/TicketsCalc/icon.svg"];

// Install - cache essential files
self.addEventListener("install", (event) => {
    event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache)));
    // Force the waiting service worker to become the active service worker
    self.skipWaiting();
});

// Fetch - Network First strategy (always try network first, fallback to cache)
self.addEventListener("fetch", (event) => {
    event.respondWith(
        fetch(event.request)
            .then((response) => {
                // If we got a valid response, clone it and update the cache
                if (response && response.status === 200) {
                    const responseToCache = response.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, responseToCache);
                    });
                }
                return response;
            })
            .catch(() => {
                // Network failed, try cache
                return caches.match(event.request).then((cachedResponse) => {
                    if (cachedResponse) {
                        return cachedResponse;
                    }
                    // If not in cache and it's a navigation request, show offline page
                    if (event.request.mode === "navigate") {
                        return caches.match("/TicketsCalc/offline");
                    }
                    // For other requests, return a basic response
                    return new Response("Offline", {
                        status: 503,
                        statusText: "Service Unavailable",
                    });
                });
            }),
    );
});

// Activate - clean up old caches
self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log("Deleting old cache:", cacheName);
                        return caches.delete(cacheName);
                    }
                }),
            );
        }),
    );
    // Take control of all pages immediately
    self.clients.claim();
});

// Message handler for manual cache refresh
self.addEventListener("message", (event) => {
    if (event.data && event.data.type === "SKIP_WAITING") {
        self.skipWaiting();
    }
    if (event.data && event.data.type === "CLEAR_CACHE") {
        event.waitUntil(
            caches.keys().then((cacheNames) => {
                return Promise.all(cacheNames.map((cacheName) => caches.delete(cacheName)));
            }),
        );
    }
});
