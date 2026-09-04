# 🏍️ 420Doma's Trip — Motorcycle Telemetry & Trip Tracker

[![Python](https://img.shields.io/badge/Python-3.9+-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
[![Flask](https://img.shields.io/badge/Flask-2.x-000000?style=for-the-badge&logo=flask&logoColor=white)](https://flask.palletsprojects.com/)
[![Leaflet](https://img.shields.io/badge/Leaflet-1.9.4-199900?style=for-the-badge&logo=leaflet&logoColor=white)](https://leafletjs.com/)
[![Chart.js](https://img.shields.io/badge/Chart.js-3.x-FF6384?style=for-the-badge&logo=chartdotjs&logoColor=white)](https://www.chartjs.org/)
[![PWA Ready](https://img.shields.io/badge/PWA-Ready-5A0FC8?style=for-the-badge&logo=pwa&logoColor=white)](#)

> **A modern, smooth, and elegant dashboard for tracking real-time motorcycle trips, mileage statistics, and road heatmaps.**

---

## 🌟 Overview

**420Doma's Trip** is a comprehensive suite for tracking and analyzing motorcycle rides. It receives GPS position updates sent from your smartphone during trips, processes data with high-precision noise filtering, and provides an interactive control dashboard accessible from any device (Desktop & Mobile / PWA).

Whether it's a daily commute or a grand tour across mountain passes, the system turns raw GPS points into a rich visual experience with detailed charts and interactive heatmaps.

---

## ✨ Key Features

### 📟 Dashboard & Animated Odometer
- **Real-time Odometer**: Main analog/mechanical style odometer with rolling digit animation for today's distance.
- **Quick Stats**: Last 7 days total, historical best day record, and a **Streak counter** (Duolingo-style) for days exceeding 100 km (~62 miles).
- **Lifetime Mileage**: Total cumulative mileage recorded across all rides.

### 🗺️ Road Heatmap & Interactive Map
- **Interactive Leaflet Map**: Full map view of all roads ridden.
- **Speed Gradient Styling**: Color-coded routes categorized by speed brackets:
  - 🟢 **Low Speed** (up to 40 km/h / 25 mph)
  - 🟡 **Medium Speed** (up to 60 km/h / 37 mph)
  - 🟠 **High Speed** (up to 90 km/h / 56 mph)
  - 🔴 **Full Gas** (over 90 km/h / 56 mph)
- **Interactive Segments**: Tap or click individual route sections to check instantaneous speed at that point.

### 📈 Charts & Interactive Calendar
- **Last 30 Days Chart**: Dynamic bar chart powered by **Chart.js** featuring custom gradients to analyze monthly activity.
- **Heatmap Calendar**: Navigable monthly calendar where each day row features a color gradient scaled by distance traveled.
- **Daily Detail View**: Select any day to view exact distance covered and effective moving average speed.

### 📱 Device Telemetry
- **Live Phone Status**: Real-time status indicators for smartphone battery level and connection state.

### 🎨 Premium Design & PWA Support
- **Asphalt & Amber Theme**: Sleek dark UI tailored for motorcycling enthusiasts.
- **Progressive Web App**: Service Worker (`sw.js`) and `manifest.json` support to install the app directly on your smartphone home screen like a native app.

---

## 🏗️ Project Architecture

The application consists of two main components working seamlessly together:

```
├── index.html        # Single Page App Frontend (UI, Charts, Map, Calendar)
├── app.py            # Python / Flask API Backend & Processing Engine
├── manifest.json     # PWA Configuration for mobile devices
├── sw.js             # Service Worker for PWA offline caching
└── viaggi_moto.db    # SQLite Database for local data storage
```

### 🧠 GPS Processing Engine (`app.py`)
- **Haversine Formula**: Precise spherical distance calculation between sequential GPS points.
- **Noise Filter**: Filtering out micro-oscillations and GPS drift while stationary (traffic lights, stops).
- **Moving Time Separation**: Differentiates total elapsed time from actual riding time to calculate true average speed.
- **Delayed Buffer Management**: Accurately reconstructs historical points sent after re-entering cellular coverage.

---

## 🛠️ Tech Stack

- **Frontend**: HTML5, CSS3 Custom Properties, JavaScript ES6+, [Leaflet.js](https://leafletjs.com/), [Chart.js](https://www.chartjs.org/), Google Fonts (*Rajdhani*, *Inter*, *JetBrains Mono*).
- **Backend**: Python 3, [Flask](https://flask.palletsprojects.com/), [Flask-CORS](https://flask-cors.readthedocs.io/), SQLite3, `zoneinfo`.
- **Telemetry Integration**: [Traccar Client](https://www.traccar.org/client/) (OsmAnd protocol).

---

## 👤 Author & Credits

Crafted with passion for two wheels by **420Doma**.

---
**Ride safe, Ride or Die**🏍️💨
