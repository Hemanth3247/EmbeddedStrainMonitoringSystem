# ⚖️ Scale Monitor

Live ESP32 + HX711 weight scale dashboard — runs with `npm start`.

## Setup

```bash
npm install
npm start
```

Then open → **http://localhost:3000**

## How it works

```
ESP32  ──POST /data──►  FastAPI :8000
                              │
                        Node.js :3000
                        (proxies /api/* → FastAPI)
                              │
                        Browser (dashboard)
```

The Node server proxies all `/api/*` requests to your FastAPI backend,
so the browser never hits FastAPI directly (no CORS issues).

## If FastAPI is on a different IP / port

Set the `API_URL` environment variable:

```bash
API_URL=http://192.168.1.50:8000 npm start
```

Or edit the `FASTAPI_URL` line in `server.js`.

## Dev mode (auto-restart on save)

```bash
npm run dev
```
