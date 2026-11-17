/* Source runtime. build-offline.cjs writes a versioned sw.js before deployment. */
const CACHE_NAME='pattaya-trip-'+VERSION;
const base=new URL('./',self.location.href);
const absolute=path=>new URL(path,base).href;
const coreUrls=CORE.map(absolute),imageUrls=IMAGES.map(absolute);
function withTimeout(request,ms){
    const controller=new AbortController();const timer=setTimeout(()=>controller.abort(),ms);
    return fetch(request,{signal:controller.signal}).finally(()=>clearTimeout(timer));
}
self.addEventListener('install',event=>event.waitUntil((async()=>{
    const cache=await caches.open(CACHE_NAME);
    for(const url of coreUrls){const response=await fetch(new Request(url,{cache:'reload'}));if(!response.ok)throw Error('Offline shell unavailable');await cache.put(url,response);}
    if(!self.registration.active)await self.skipWaiting();
})()));
self.addEventListener('activate',event=>event.waitUntil((async()=>{
    // Preserve the immediately previous version while other tabs may still use it.
    const names=(await caches.keys()).filter(name=>name.startsWith('pattaya-trip-'));
    const obsolete=names.filter(name=>name!==CACHE_NAME).slice(0,-1);
    await Promise.all(obsolete.map(name=>caches.delete(name)));await self.clients.claim();
})()));
let preparation=null;
const downloadPorts=new Set();
async function prepareImages(){
    const cache=await caches.open(CACHE_NAME);let cursor=0,done=0,failed=0;
    async function download(){
        while(cursor<imageUrls.length){
            const url=imageUrls[cursor++];
            try{if(!await cache.match(url)){const response=await withTimeout(new Request(url,{cache:'reload'}),15000);if(!response.ok)throw Error('image unavailable');await cache.put(url,response);}}
            catch{failed++;}
            for(const port of downloadPorts)port.postMessage({type:'PROGRESS',done:done+1,total:imageUrls.length});done++;
        }
    }
    await Promise.all([download(),download(),download()]);if(failed)throw Error('Incomplete download');
}
self.addEventListener('message',event=>{
    if(event.data?.type==='ACTIVATE'){self.skipWaiting();return;}
    const port=event.ports?.[0];if(!port)return;
    if(event.data?.type==='STATUS'){
        event.waitUntil((async()=>{const cache=await caches.open(CACHE_NAME);let done=0;for(const url of imageUrls)if(await cache.match(url))done++;port.postMessage({type:'STATUS',version:VERSION,done,total:imageUrls.length});})());return;
    }
    if(event.data?.type!=='PREPARE')return;
    downloadPorts.add(port);
    if(!preparation)preparation=prepareImages().finally(()=>{preparation=null;});
    event.waitUntil(preparation.then(()=>port.postMessage({type:'DONE',version:VERSION}),()=>port.postMessage({type:'ERROR',message:'Incomplete offline download'})).finally(()=>downloadPorts.delete(port)));
});
self.addEventListener('fetch',event=>{
    const request=event.request;if(request.method!=='GET')return;
    const url=new URL(request.url);
    if(request.mode==='navigate'&&url.origin===base.origin&&url.pathname.startsWith(base.pathname)){
        event.respondWith((async()=>{const cache=await caches.open(CACHE_NAME);return await cache.match(absolute('index.html')) || fetch(request);})());return;
    }
    const local=url.origin===base.origin;
    if(local&&(url.pathname.startsWith(base.pathname)||coreUrls.includes(url.href))){
        event.respondWith((async()=>{
            const cache=await caches.open(CACHE_NAME),cached=await cache.match(request);
            if(cached)return cached;
            try{return await withTimeout(request,5000);}
            catch{
                const fallback=IMAGE_FALLBACKS[url.pathname];if(fallback){const image=await cache.match(absolute(fallback));if(image)return image;}
                return Response.error();
            }
        })());return;
    }
    // Essential text remains usable if remote animation/font libraries cannot load.
    if(!local&&['script','style','font'].includes(request.destination)){
        event.respondWith(withTimeout(request,1800).catch(()=>new Response('',{headers:{'Content-Type':request.destination==='script'?'application/javascript':'text/css'}})));
    }
});
