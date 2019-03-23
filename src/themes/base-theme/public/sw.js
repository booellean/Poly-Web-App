const staticCacheName= 'poly-';
const staticCacheVer = 'v1';
const staticCache = staticCacheName + staticCacheVer; //full version name

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
self.addEventListener('install', (e) =>{
  e.waitUntil(
    caches.open(staticCache).then( (cache) =>{
      return cache.addAll([
        './index.html',
        './manifest.json',
        './js/script.min.js',
        './js/loading-bar.min.js',
        './js/service_worker.min.js',
        './css/style.min.css',
        './img/8-bit-border.png',
        './img/scanlines.png',
        './img/idle.gif',
        './img/logo-120.png'
      ]);
    })
  );
});

/**
* @description Deletes old cache from old version
* @param {string} cacheName
* @param {string} staticCacheName
* @param {string} staticCache
* @returns {string} During service worker activation, deletes all cache that is no longer found in new service worker version
*/
self.addEventListener('activate', (e) =>{
  e.waitUntil(
    caches.keys().then( (cacheNames) =>{
      return Promise.all(
        cacheNames.filter( (cacheName) =>{
          return cacheName.startsWith(staticCacheName) && cacheName != staticCache;
        }).map( (cacheName) =>{
          return caches.delete(cacheName);
        })
      );
    })
  );
});


/**
* @description fetches from cache or server if content is not cached
* @param {string} res
* @returns {string} returns cache if it is found, else caches the e.request from the server if it is not found
*/
self.addEventListener('fetch', (e) =>{
  if(e.request.method === 'GET'){ //Stops interceptions of POST requests
    e.respondWith(
      caches.open(staticCache).then( (cache) =>{
        return fetch(e.request).then( (res) =>{
          cache.put(e.request, res.clone());
          return res;
        })
      })
    );
  }
});