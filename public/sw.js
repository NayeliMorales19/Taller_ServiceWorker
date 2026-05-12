const CACHE_NAME = "cache-v1";

const ARCHIVOS =["/", "index.html"];

//Intalacion
self.addEventListener("install", function(event){
    event.waitUntil(
        caches.open(CACHE_NAME).then(function (cache){
            return cache.addAll(ARCHIVOS);
        })
    );
});


//Activacion
self.addEventListener("activate", function(event){
    event.waitUntil(
        caches.keys().then(function(nombres){
            return Promise.all(
                nombres.filter(function(nombre){
                    return nombre !== CACHE_NAME;
                }).map(function(nombre){
                    return caches.delete(nombre);
                })
            );
        })
    );
});

//Fetch-Cache First
self.addEventListener("fetch", function(event){
    event.respondWith(
        caches.match(event.request).then(function(respuesta){
            if(respuesta){
                return respuesta;
            }
            return fetch(event.request);
        })
    );
});