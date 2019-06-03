importScripts('/_nuxt/workbox.4c4f5ca6.js')

workbox.precaching.precacheAndRoute([
  {
    "url": "/_nuxt/29b26e8415f350d6885c.js",
    "revision": "fd5c4cff41f28d6cb5ac128ca4adf400"
  },
  {
    "url": "/_nuxt/699fbdf87b8fb0755c89.js",
    "revision": "8d315235b9fc5062ac2023b9e24634e7"
  },
  {
    "url": "/_nuxt/7e91f947ae554355f2fd.js",
    "revision": "ec39259ba2546f0cf7476c39fe81594e"
  },
  {
    "url": "/_nuxt/a8bf975e9ebd2c7657cd.js",
    "revision": "fea65ee92d58e23861396fcd43dd2f76"
  },
  {
    "url": "/_nuxt/ac5553d2e7ca89fb292f.js",
    "revision": "6083a82c682e09d35270ba647fe96410"
  },
  {
    "url": "/_nuxt/dd142bebefea14ba84f5.js",
    "revision": "bd72b4987daf381caed17a4fb3748836"
  },
  {
    "url": "/_nuxt/fe1a88dbe7117688406e.js",
    "revision": "8a933da6e64a55eda9944abfa874ab8a"
  }
], {
  "cacheId": "wedding-rsvp",
  "directoryIndex": "/",
  "cleanUrls": false
})

workbox.clientsClaim()
workbox.skipWaiting()

workbox.routing.registerRoute(new RegExp('/_nuxt/.*'), workbox.strategies.cacheFirst({}), 'GET')

workbox.routing.registerRoute(new RegExp('/.*'), workbox.strategies.networkFirst({}), 'GET')
