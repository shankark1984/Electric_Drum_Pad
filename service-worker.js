// Define a version for your cache
const CACHE_NAME = 'v008';

// List of assets to cache
const assetsToCache = [
    '/',
    '/index.html',
    '/styles.css',
    '/scripts.js',
    '/favicon.ico',
    '/sounds/kick.wav',
    '/sounds/snare.wav',
    '/sounds/hihat.wav',
    '/sounds/tom1.wav',
    '/sounds/tom2.wav',
    '/sounds/tom3.wav',
    '/sounds/crash.wav',
    '/sounds/ride.wav',
    '/sounds/clap.wav',
    '/sounsa/hhopen.wav'
];

// Install event - caching the assets
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened cache');
                return cache.addAll(assetsToCache);
            })
            .catch(error => {
                console.error('Failed to open cache: ', error);
            })
    );
});

// Activate event - cleaning up old caches
self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        console.log('Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
        .then(() => {
            // Ensure that the service worker is controlling all clients immediately
            return self.clients.claim();
        })
    );
});

// Fetch event - serving cached assets or falling back to the network
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Cache hit - return the response from the cache
                if (response) {
                    return response;
                }

                // Clone the request because requests are streams and can only be consumed once
                const fetchRequest = event.request.clone();

                return fetch(fetchRequest).then(
                    networkResponse => {
                        // Check if we received a valid response
                        if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
                            return networkResponse;
                        }

                        // Clone the response because responses are streams and can only be consumed once
                        const responseToCache = networkResponse.clone();

                        // Open the cache and store the response
                        caches.open(CACHE_NAME)
                            .then(cache => {
                                cache.put(event.request, responseToCache);
                            })
                            .catch(error => {
                                console.error('Failed to cache response: ', error);
                            });

                        return networkResponse;
                    }
                );
            })
            .catch(error => {
                console.error('Fetch failed; returning offline page instead.', error);
                // You can return an offline page here if needed
                // return caches.match('/offline.html');
            })
    );
});
