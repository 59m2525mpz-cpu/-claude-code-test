/* Offline-Cache für die Finanzmarktwoche. App-Hülle aus dem Cache (im Hintergrund aktualisiert),
   Berichte (daten/) immer zuerst aus dem Netz, offline aus dem Cache. Version erhöhen, wenn sich die Dateiliste ändert. */
const CACHE = "finanzmarktwoche-v5";
const SHELL = ["./", "index.html", "manifest.webmanifest", "icons/apple-touch-icon.png", "icons/icon-192.png", "icons/icon-512.png", "vendor/pdf.min.js", "vendor/pdf.worker.min.js", "fonts/sofia-sans-condensed-latin-700-normal.woff2", "fonts/sofia-sans-condensed-latin-800-normal.woff2"];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k.startsWith("finanzmarktwoche-") && k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  const sameOrigin = url.origin === self.location.origin;
  const cdn = url.hostname === "cdn.jsdelivr.net";
  if (!sameOrigin && !cdn) return;
  const scope = new URL(self.registration.scope);
  if (sameOrigin && !url.pathname.startsWith(scope.pathname)) return;

  if (sameOrigin && url.pathname.startsWith(scope.pathname + "daten/")) {
    e.respondWith(
      caches.open(CACHE).then(async (c) => {
        try {
          const res = await fetch(req, { cache: "no-store" });
          if (res.ok) c.put(url.pathname, res.clone());
          return res;
        } catch {
          return (await c.match(url.pathname)) || Response.error();
        }
      })
    );
    return;
  }

  // App-Seite selbst immer zuerst aus dem Netz, damit Updates sofort ankommen; offline aus dem Cache
  if (req.mode === "navigate" || (sameOrigin && /\/index\.html$/.test(url.pathname))) {
    e.respondWith(
      caches.open(CACHE).then(async (c) => {
        try {
          const res = await fetch(req, { cache: "no-store" });
          if (res.ok) c.put("index.html", res.clone());
          return res;
        } catch {
          return (await c.match("index.html")) || Response.error();
        }
      })
    );
    return;
  }

  e.respondWith(
    caches.open(CACHE).then(async (c) => {
      const hit = await c.match(req, { ignoreSearch: sameOrigin });
      const net = fetch(req)
        .then((res) => { if (res && (res.ok || res.type === "opaque")) c.put(req, res.clone()); return res; })
        .catch(() => null);
      if (hit) { e.waitUntil(net); return hit; }
      const res = await net;
      if (res) return res;
      if (req.mode === "navigate") { const shell = await c.match("index.html"); if (shell) return shell; }
      return Response.error();
    })
  );
});
