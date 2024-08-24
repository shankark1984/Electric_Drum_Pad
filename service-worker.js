// service-worker.js

// Cache name
const CACHE_NAME = 'v1';

// Resources to cache
const urlsToCache = [
    '/',
    '/index.html',
    '/styles.css',
    '/scripts.js',
    // '/images/logo.png'
    '/favicon.ico',
    '/sounds/kick.wav',
    '/sounds/snare.wav',
    '/sounds/hihat.wav',
    '/sounds/tom1.wav',
    '/sounds/tom2.wav',
    '/sounds/tom3.wav',
    '/sounds/crash.wav',
    '/sounds/ride.wav',
    '/sounds/clap.wav'
];

// Install event: Caching files
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

// Fetch event: Serving cached content
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                // Cache hit - return response
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
    );
});

// Activate event: Cleanup old caches
self.addEventListener('activate', (event) => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
