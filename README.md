# 🏍️ 420Doma's Trip — Motorcycle Telemetry & Trip Tracker

[![Python](https://img.shields.io/badge/Python-3.9+-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
[![Flask](https://img.shields.io/badge/Flask-2.x-000000?style=for-the-badge&logo=flask&logoColor=white)](https://flask.palletsprojects.com/)
[![Leaflet](https://img.shields.io/badge/Leaflet-1.9.4-199900?style=for-the-badge&logo=leaflet&logoColor=white)](https://leafletjs.com/)
[![Chart.js](https://img.shields.io/badge/Chart.js-3.x-FF6384?style=for-the-badge&logo=chartdotjs&logoColor=white)](https://www.chartjs.org/)
[![PWA Ready](https://img.shields.io/badge/PWA-Ready-5A0FC8?style=for-the-badge&logo=pwa&logoColor=white)](#)

> **Un dashboard moderno, fluido ed elegante per monitorare in tempo reale i viaggi in moto, le statistiche chilometriche e la mappa termica delle strade percorse.**

---

## 🌟 Cos'è e cosa fa

**420Doma's Trip** è una suite completa per il tracciamento e l'analisi dei percorsi in motocicletta. Riceve le posizioni GPS inviate dallo smartphone durante i viaggi, elabora i dati con filtri ad alta precisione e offre una plancia di controllo interattiva accessibile da qualsiasi dispositivo (Desktop e Mobile / PWA).

Che si tratti del tragitto quotidiano o di un grande tour su passi montani, il sistema trasforma i semplici punti GPS in un'esperienza visiva ricca di dettagli, grafici e mappe termiche.

---

## ✨ Caratteristiche Principali

### 📟 Dashboard & Odometro Animato
- **Contachilometri in Tempo Reale**: Odometro principale stile analogico/meccanico con animazione a rullo per i chilometri percorsi oggi.
- **Statistiche Rapide**: Totale ultimi 7 giorni, record storico della miglior giornata e contatore **Streak** (stile Duolingo) per le giornate con oltre 100 km percorsi.
- **Chilometraggio Storico**: Totale assoluto cumulativo di tutti i chilometri mai registrati dall'inizio delle uscite.

### 🗺️ Mappa Heatmap delle Strade
- **Mappa Interattiva Leaflet**: Visualizzazione completa di tutte le strade percorse sul territorio.
- **Gradiente di Velocità**: Tracciato cromatico diviso per fasce di velocità:
  - 🟢 **Velocità Bassa** (fino a 40 km/h)
  - 🟡 **Velocità Media** (fino a 60 km/h)
  - 🟠 **Velocità Alta** (fino a 90 km/h)
  - 🔴 **Full Gas** (oltre 90 km/h)
- **Dettagli al Tocco**: Interazione con i singoli tratti di strada per verificare la velocità istantanea di quel passaggio.

### 📈 Grafici e Calendario Interattivo
- **Grafico Ultimi 30 Giorni**: Istogramma dinamico basato su **Chart.js** con gradienti personalizzati per analizzare le uscite dell'ultimo mese.
- **Calendario a Mappa Termica**: Calendario mensile navigabile in cui ogni riga/giorno sfuma cromaticamente in base all'intensità dei km percorsi.
- **Scheda Dettaglio Giornaliero**: Selezione di un qualsiasi giorno per consultare la distanza esatta e la velocità media di movimento effettivo.

### 📱 Telemetria Dispositivo
- **Stato Telefono Live**: Indicatore di stato per la batteria dello smartphone e lo stato di connessione aggiornato in tempo reale.

### 🎨 Design Premium & PWA
- **Tema Asfalto & Ambra**: Interfaccia scura e moderna studiata appositamente per appassionati di motori.
- **Progressive Web App**: Supporto Service Worker (`sw.js`) e `manifest.json` per installare l'applicazione direttamente sulla schermata home dello smartphone come fosse un'app nativa.

---

## 🏗️ Architettura del Progetto

Il progetto si compone di due elementi principali che lavorano in perfetta sinergia:

```
├── index.html        # Frontend Single Page App (UI, Grafici, Mappa, Calendario)
├── app.py            # Backend Python / Flask API & Motore di Calcolo
├── manifest.json     # Configurazione PWA per dispositivi mobili
├── sw.js             # Service Worker per il caching offline PWA
└── viaggi_moto.db    # Database SQLite per l'archiviazione locale
```

### 🧠 Motore di Elaborazione GPS (`app.py`)
- **Formula di Haversine**: Calcolo preciso della distanza sferica tra coordinate successive.
- **Filtro Anti-Rumore**: Eliminazione delle micro-oscillazioni del GPS quando si è fermi al semaforo o in sosta.
- **Separazione Tempo di Movimento**: Distinzione tra tempo totale e tempo di guida effettivo per calcolare la velocità media reale (escludendo le soste).
- **Gestione Buffer Cronologico**: Ricostruzione accurata dei dati inviati in differita dallo smartphone al rientro da zone senza copertura di rete.

---

## 🛠️ Tecnologie Utilizzate

- **Frontend**: HTML5, CSS3 Custom Properties, JavaScript ES6+, [Leaflet.js](https://leafletjs.com/), [Chart.js](https://www.chartjs.org/), Google Fonts (*Rajdhani*, *Inter*, *JetBrains Mono*).
- **Backend**: Python 3, [Flask](https://flask.palletsprojects.com/), [Flask-CORS](https://flask-cors.readthedocs.io/), SQLite3, `zoneinfo`.
- **Integrazione Telemetria**: [Traccar Client](https://www.traccar.org/client/) (Protocollo OsmAnd).

---

## 🚀 Guida all'Installazione

### 1. Requisiti
- Python 3.9 o superiore
- Uno smartphone con l'app gratuita **Traccar Client** installata (iOS / Android)

### 2. Configurazione del Backend
1. Clona la repository sul tuo server o Raspberry Pi:
   ```bash
   git clone https://github.com/tuo-username/420doma-trip.git
   cd 420doma-trip
   ```

2. Installa le dipendenze necessarie:
   ```bash
   pip install flask flask-cors
   ```

3. Avvia il server backend:
   ```bash
   python3 app.py
   ```
   *Il server sarà attivo per default sulla porta `1717`.*

### 3. Configurazione dell'App Traccar Client
Sullo smartphone:
1. Apri **Traccar Client**.
2. Imposta l'**URL del Server** puntando al tuo indirizzo backend:
   `http://<INDIRIZZO_SERVER>:1717/api/traccar`
3. Imposta la frequenza d'invio desiderata (es. 10 - 30 secondi) e attiva il servizio.

### 4. Configurazione del Frontend
Apri il file `index.html` ed imposta l'indirizzo del tuo backend nella variabile `URL_API` e `URL_API_HEATMAP`. Puoi ospitare `index.html` su **GitHub Pages**, **Nginx**, **Apache** o servirlo direttamente.

---

## 👤 Crediti e Autore

Realizzato con passione per le due ruote da **420Doma**.

---
*Buon viaggio e piega con testa! 🏍️💨*
