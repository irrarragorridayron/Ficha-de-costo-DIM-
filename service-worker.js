const CACHE_NAME="ficha-costo-dim-v2";
const APP_FILES=["./","./index.html","./manifest.webmanifest","./service-worker.js","./icons/icon-192.png","./icons/icon-512.png"];
self.addEventListener("install",e=>e.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(APP_FILES)).then(()=>self.skipWaiting())));
self.addEventListener("activate",e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener("fetch",e=>{if(e.request.method!=="GET")return;e.respondWith(caches.match(e.request).then(c=>c||fetch(e.request).then(r=>{if(r&&r.status===200&&r.type==="basic"){const x=r.clone();caches.open(CACHE_NAME).then(ca=>ca.put(e.request,x))}return r}).catch(()=>caches.match("./index.html")))})
