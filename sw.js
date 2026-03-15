const CACHE_NAME = 'interval-timer-v2';

const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon.svg',
  './sounds/Three.mp3',
  './sounds/Two.mp3',
  './sounds/One.mp3',
  './sounds/Go.mp3',
  './sounds/Pause.mp3',
  './sounds/Half-way%20through.mp3',
  './sounds/Coming%20up.mp3',
  './sounds/Workout%20Finished.mp3',
  './sounds/KettleBell%20Swings.mp3',
  './sounds/Bicycle%20Crunches.mp3',
  './sounds/Goblet%20Sqats.mp3',
  './sounds/Flutter%20Kicks.mp3',
  './sounds/Russian%20Twist.mp3',
  './sounds/Kettlebell%20Press.mp3',
  './sounds/V-sit-ups.mp3',
  './sounds/Ketlebell%20Round.mp3',
  './sounds/Reverse%20Crunch.mp3',
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});
