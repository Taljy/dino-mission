# DINO-MISSION

Mobile-first Dino-Quiz für Andrin (6 Jahre). Privates Familien-Projekt von Studio Da Rugna.

## Stack

- Vite + React + TypeScript + Tailwind CSS
- React Router (Tab-Navigation)
- LocalStorage für Fortschritt
- Vercel Serverless Function (`api/ask.ts`) → Anthropic API für das AI-Lexikon
- PWA-fähig (manifest + Apple Touch Icons)

## Setup

```bash
npm install
npm run dev
```

App läuft unter http://localhost:5173

## Environment Variables

Für das AI-Lexikon (`/api/ask`) wird ein Anthropic API-Key benötigt:

```
ANTHROPIC_API_KEY=sk-ant-...
```

- **Lokal**: `.env.local` im Projekt-Root anlegen und mit `vercel dev` starten, damit die Serverless-Route mitläuft.
- **Production**: Variable in den Vercel Project Settings setzen.

## Deployment (Vercel)

1. Repository auf GitHub pushen.
2. In Vercel importieren (Vite-Framework wird automatisch erkannt).
3. `ANTHROPIC_API_KEY` in den Environment Variables setzen.
4. Deploy. Die `api/`-Funktion wird automatisch als Serverless Function gebaut, die statischen Assets als SPA ausgeliefert (siehe `vercel.json`).

## Folder Structure

```
.
├── public/
│   ├── dinos/                # 16 Dino-PNGs
│   ├── manifest.json
│   ├── icon-192.png
│   ├── icon-512.png
│   └── apple-touch-icon.png
├── api/
│   └── ask.ts                # Vercel Serverless Function
├── src/
│   ├── data/dinos.ts
│   ├── hooks/
│   ├── components/
│   ├── pages/
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
└── vercel.json
```

## Notes

- Touch-Targets ≥ 48 px, alles mobile-first auf 375 px Breite gestaltet.
- Frust-Schutz: Keine harten Fehlermeldungen für Andrin.
- Bilder laden lazy (ausser Hero / aktuelle Quiz-Frage).
- Die mitgelieferten PWA-Icons sind aktuell der T-Rex als Platzhalter. Vor einem öffentlichen Release ggf. durch dedizierte Icons ersetzen.
