/* eslint-disable no-console */

import { register } from 'register-service-worker'

if (process.env.NODE_ENV === 'production') {
  register(`${process.env.BASE_URL}service-worker.js`, {
    ready () {
      console.log('CLIENT: service worker registration complete.');
    },
    registered () {
      console.log('Service worker has been registered.')
    },
    cached () {
      console.log('Content has been cached for offline use.')
    },
    updatefound () {
      console.log('New content is downloading.')
    },
    updated () {
      console.log('New content is available; please refresh.')
    },
    offline () {
      console.log('No internet connection found. App is running in offline mode.')
    },
    error (error) {
      console.error('Error during service worker registration:', error)
    },
    function() {
      console.log('CLIENT: service worker registration failure.');
    }
  });
} else {
  console.log('CLIENT: service worker is not supported.');
}

var version = 'v1::';

self.addEventListener('install', function (event) {
  console.log('WORKER : install event in progress.');
  event.waitUntil(
    caches.open(version + 'fundamentals')
      .then(function (cache) {
        return cache.addAll(['/', '/styles/main.css', '/scripts/main.js']);
      })
      .then(function() {
        console.log('WORKER: install completed');
      })
  );
});

function isSuccessful(response) {
  return response &&
    response.status === 200 &&
    response.type === 'basic';
}

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request)
      .then(function (response) {
        if (response) {
          return response; // Cache hit
        }

        return fetch(event.request.clone())
          .then(function (response) {
            if (!isSuccessful(response)) {
              return response;
            }
            console.log('WORKER: fetch response from network.', event.request.url);

            caches
              .open(version + 'pages')
              .then(function (cache) {
                cache.put(event.request, response.clone());
              })
            .then(function() {
              console.log('WORKER: fetch response stored in cache.', event.request.url);
            });

            return response;
          }
        );
      })
    );
});

self.addEventListener("activate", function(event) {
  /* Just like with the install event, event.waitUntil blocks activate on a promise.
     Activation will fail unless the promise is fulfilled.
  */
  console.log('WORKER: activate event in progress.');

  event.waitUntil(
    caches
      /* This method returns a promise which will resolve to an array of available
         cache keys.
      */
      .keys()
      .then(function (keys) {
        // We return a promise that settles when all outdated caches are deleted.
        return Promise.all(
          keys
            .filter(function (key) {
              // Filter by keys that don't start with the latest version prefix.
              return !key.startsWith(version);
            })
            .map(function (key) {
              /* Return a promise that's fulfilled
                 when each outdated cache is deleted.
              */
              return caches.delete(key);
            })
        );
      })
      .then(function() {
        console.log('WORKER: activate completed.');
      })
  );
});



