// sw.js - This file needs to be in the root of the directory to work,
//         so do not move it next to the other scripts

const CACHE_NAME = 'lab-8-starter';

// Installs the service worker. Feed it some initial URLs to cache
self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      // B6. TODO - Add all of the URLs from RECIPE_URLs here so that they are
      //            added to the cache when the ServiceWorker is installed
      return cache.addAll([
        '/',
  '/index.html',
  '/assets/scripts/main.js',
  '/assets/styles/main.css',
  '/assets/components/RecipeCard.js',
  '/assets/images/icons/icon.png',
  '/assets/images/icons/icon-large.png',
  'https://suhanii2310.github.io/Lab8_Starter/recipes/1_50-thanksgiving-side-dishes.json',
  'https://suhanii2310.github.io/Lab8_Starter/recipes/2_roasting-turkey-breast-with-stuffing.json',
  'https://suhanii2310.github.io/Lab8_Starter/recipes/3_moms-cornbread-stuffing.json',
  'https://suhanii2310.github.io/Lab8_Starter/recipes/4_50-indulgent-thanksgiving-side-dishes-for-any-holiday-gathering.json',
  'https://suhanii2310.github.io/Lab8_Starter/recipes/5_healthy-thanksgiving-recipe-crockpot-turkey-breast.json',
  'https://suhanii2310.github.io/Lab8_Starter/recipes/6_one-pot-thanksgiving-dinner.json'
      ]);
    })
  );
});

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Service Worker: Caching files...');
      return cache.addAll(FILES_TO_CACHE);
    })
  );
});

// Activates the service worker
self.addEventListener('activate', function (event) {
  event.waitUntil(self.clients.claim());
});

// Intercept fetch requests and cache them
self.addEventListener('fetch', function (event) {
  // We added some known URLs to the cache above, but tracking down every
  // subsequent network request URL and adding it manually would be very taxing.
  // We will be adding all of the resources not specified in the intiial cache
  // list to the cache as they come in.
  /*******************************/
  // This article from Google will help with this portion. Before asking ANY
  // questions about this section, read this article.
  // NOTE: In the article's code REPLACE fetch(event.request.url) with
  //       fetch(event.request)
  // https://developer.chrome.com/docs/workbox/caching-strategies-overview/
  /*******************************/
  // B7. TODO - Respond to the event by opening the cache using the name we gave
  //            above (CACHE_NAME)
  // B8. TODO - If the request is in the cache, return with the cached version.
  //            Otherwise fetch the resource, add it to the cache, and return
  //            network response.

  event.respondWith(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.match(event.request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(event.request).then((networkResponse) => {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        }).catch((err) => {
          console.warn('Fetch failed; likely offline:', err);
        });
      });
    })
  );
});