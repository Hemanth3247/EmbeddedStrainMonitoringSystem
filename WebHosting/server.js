const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const path = require("path");

const app = express();
const PORT = 3000;

// ─── Config ─────────────────────────────────────────────────────────────────
// Change this to your FastAPI server address if needed
const FASTAPI_URL = process.env.API_URL || "http://localhost:8000";

// ─── Proxy /api/* → FastAPI ──────────────────────────────────────────────────
app.use(
  "/api",
  createProxyMiddleware({
    target: FASTAPI_URL,
    changeOrigin: true,
    pathRewrite: { "^/api": "" }, // strip /api prefix
    on: {
      error: (err, req, res) => {
        res.status(502).json({ error: "FastAPI backend unreachable", detail: err.message });
      },
    },
  })
);

// ─── Serve static files ──────────────────────────────────────────────────────
app.use(express.static(path.join(__dirname, "public")));

// ─── Fallback ────────────────────────────────────────────────────────────────
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log("\n🟢  Scale Monitor running!");
  console.log(`   Dashboard  →  http://localhost:${PORT}`);
  console.log(`   FastAPI    →  ${FASTAPI_URL}`);
  console.log("\n   Press Ctrl+C to stop\n");
});
