/*
 * sw.js - Service Worker "Light" per Moto KM Tracker
 *
 * Scopo unico: rendere il sito installabile come PWA a schermo intero su
 * Android. NON implementa cache persistente di alcun tipo, perché questa
 * dashboard mostra dati in tempo reale (polling ogni 30s verso /api/km) e
 * una cache aggressiva delle risposte API mostrerebbe km "vecchi" o
 * bloccherebbe gli aggiornamenti. Ogni richiesta di rete passa quindi
 * semplicemente al browser come se il Service Worker non ci fosse.
 *
 * - install: si attiva subito (skipWaiting), senza pre-cache di risorse.
 * - activate: prende il controllo delle pagine aperte immediatamente
 *   (clients.claim), senza cancellare cache (non ne creiamo).
 * - fetch: passa sempre la richiesta alla rete (nessun intercept/cache).
 */

self.addEventListener("install", (evento) => {
  self.skipWaiting();
});

self.addEventListener("activate", (evento) => {
  evento.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (evento) => {
  // Nessuna strategia di cache: rispondiamo sempre con la richiesta di rete
  // originale, per evitare qualsiasi conflitto con i dati in tempo reale.
  evento.respondWith(fetch(evento.request));
});
