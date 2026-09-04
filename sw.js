/*
 * sw.js - Service Worker "Light" per Moto KM Tracker
 *
 * Scopo unico: rendere il sito installabile come PWA a schermo intero su
 * Android, e far sì che l'app installata si aggiorni da sola quando esce
 * una nuova versione di index.html/sw.js, senza che l'utente debba
 * disinstallare/reinstallare o forzare manualmente un reload.
 *
 * NON implementa alcuna cache: questa dashboard mostra dati in tempo
 * reale (polling ogni 30s verso /api/km e verso l'endpoint heatmap) e
 * una cache delle risposte API mostrerebbe dati "vecchi" o bloccherebbe
 * gli aggiornamenti.
 *
 * FIX IMPORTANTE rispetto alla versione precedente:
 * L'evento "fetch" NON chiama più event.respondWith(). Chiamare
 * respondWith(fetch(...)) rifà la richiesta nel contesto del Service
 * Worker: su rete mobile instabile (cambio rete, DNS non ancora
 * risolto, handshake TLS non ancora validato in quel processo — tipico
 * con Tailscale Funnel) quel fetch "duplicato" può fallire anche quando
 * una richiesta diretta della pagina avrebbe funzionato, perché il SW è
 * un contesto di esecuzione separato dalla pagina, con il suo stesso
 * networking stack ma senza alcuna garanzia di riuscire dove la pagina
 * riesce. Non chiamando respondWith, la richiesta passa direttamente al
 * browser esattamente come se il Service Worker non esistesse: è il modo
 * più sicuro per "non fare nulla" su una richiesta di rete.
 */

const SW_VERSION = "moto-km-tracker-v2";

self.addEventListener("install", () => {
  // Attiva subito la nuova versione, senza aspettare che le vecchie
  // tab/istanze vengano chiuse.
  self.skipWaiting();
});

self.addEventListener("activate", (evento) => {
  evento.waitUntil(
    (async () => {
      // Prende il controllo di tutte le pagine aperte immediatamente.
      await self.clients.claim();

      // Avvisa tutte le pagine aperte che è stata attivata una nuova
      // versione del Service Worker, cosicché il frontend possa
      // ricaricarsi da solo (vedi listener "controllerchange" in
      // index.html) senza richiedere un intervento manuale.
      const listaClient = await self.clients.matchAll({ type: "window" });
      for (const client of listaClient) {
        client.postMessage({ tipo: "SW_ATTIVATO", versione: SW_VERSION });
      }
    })()
  );
});

// Nessun intercept delle richieste: nessuna cache, nessun fetch
// "duplicato" nel contesto del Service Worker. Il browser gestisce ogni
// richiesta (pagina, API, heatmap) esattamente come farebbe senza SW.
// (Volutamente NON c'è un listener "fetch" qui.)

// Permette al frontend di forzare un controllo aggiornamenti immediato,
// ad es. quando l'app torna in primo piano dopo essere stata in background.
self.addEventListener("message", (evento) => {
  if (evento.data && evento.data.tipo === "SKIP_WAITING") {
    self.skipWaiting();
  }
});
