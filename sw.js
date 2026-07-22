// Definimos el nombre de la memoria caché
const CACHE_NAME = 'planeador-cache-v1';

// Aquí debes poner los nombres exactos de los archivos de tu proyecto
const urlsToCache = [
  './',
  './index.html' 
];

// Evento de instalación: guarda los archivos en caché
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Archivos en caché guardados');
        return cache.addAll(urlsToCache);
      })
  );
});

// Evento fetch: intercepta las peticiones de red para que funcione sin conexión
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Devuelve el archivo desde la caché si existe, o lo busca en internet
        return response || fetch(event.request);
      })
  );
});
