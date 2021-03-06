var staticCacheName = 'poly-';
var staticCacheVer = 'v1';
var staticCache = staticCacheName + staticCacheVer; //full version name
//caching code was partly derived from Google Developers, information below
/**
*Author: Google (Individual Names Not Listed)
*Date: April 9th, 2018
*Title: Caching Files with Service Worker
*Code Version: Unknown
*Type: Service Worker
*Web Address: https://developers.google.com/web/ilt/pwa/caching-'files-with-service-worker
*/
/**
* @description Caches site content
* @param {string} cache
* @param {string} staticCache
* @returns {string} During service worker installation, caches site content
*/
self.addEventListener('install', function (e) {
    e.waitUntil(caches.open(staticCache).then(function (cache) {
        return cache.addAll([
            './index.html',
            './manifest.json',
            './js/script.js',
            './js/loading-bar.js',
            './js/service_worker.js',
            './css/style.min.css',
            './img/8-bit-border.png',
            './img/scanlines.png',
            './img/idle.gif',
            './img/logo-120.png'
        ]);
    }));
});
/**
* @description Deletes old cache from old version
* @param {string} cacheName
* @param {string} staticCacheName
* @param {string} staticCache
* @returns {string} During service worker activation, deletes all cache that is no longer found in new service worker version
*/
self.addEventListener('activate', function (e) {
    e.waitUntil(caches.keys().then(function (cacheNames) {
        return Promise.all(cacheNames.filter(function (cacheName) {
            return cacheName.startsWith(staticCacheName) && cacheName != staticCache;
        }).map(function (cacheName) {
            return caches.delete(cacheName);
        }));
    }));
});
/**
* @description fetches from cache or server if content is not cached
* @param {string} res
* @returns {string} returns cache if it is found, else caches the e.request from the server if it is not found
*/
self.addEventListener('fetch', function (e) {
    if (e.request.method === 'GET') {
        e.respondWith(caches.open(staticCache).then(function (cache) {
            return fetch(e.request).then(function (res) {
                cache.put(e.request, res.clone());
                return res;
            });
        }));
    }
});
//# sourceMappingURL=sw.js.map