const {test}=require('node:test'),assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const root=path.resolve(__dirname,'..'),source=fs.readFileSync(path.join(root,'sw.js'),'utf8');
function worker(){
 const handlers={},stores=new Map(),messages=[];let offline=false,failImage=false;
 const abs=value=>typeof value==='string'?new URL(value,'https://example.test/travel/Pattaya/').href:value.url;
 const caches={async open(name){if(!stores.has(name))stores.set(name,new Map());const rows=stores.get(name);return {async match(key){return rows.get(abs(key))?.clone();},async put(key,value){rows.set(abs(key),value.clone());}};},async keys(){return [...stores.keys()];},async delete(name){return stores.delete(name);}};
 const self={location:{href:'https://example.test/travel/Pattaya/sw.js'},registration:{active:null},clients:{claim:async()=>{}},skipWaiting:async()=>{},addEventListener(name,fn){handlers[name]=fn;}};
 const c={self,caches,URL,Request,Response,AbortController,setTimeout,clearTimeout,fetch:async request=>{const url=abs(request);if(offline||failImage&&url.includes('images/optimized/'))throw Error('offline');return new Response('asset:'+url,{headers:{'Content-Type':'text/plain'}});}};
 vm.createContext(c);vm.runInContext(source,c);
 async function event(name,fields={}){let pending,result;handlers[name]({...fields,waitUntil(promise){pending=promise;},respondWith(promise){result=promise;}});if(pending)await pending;return result?await result:null;}
 return {event,messages,stores,setOffline(value){offline=value;},failImages(){failImage=true;},async message(type){messages.length=0;await event('message',{data:{type},ports:[{postMessage(value){messages.push(value);}}]});return messages;}};
}
test('Install saves a complete versioned local shell, and explicit download saves basic photos',async()=>{
 const w=worker();await w.event('install');await w.message('PREPARE');assert.equal(w.messages.at(-1).type,'DONE');const progress=w.messages.filter(message=>message.type==='PROGRESS');assert.equal(progress.length,23);assert.equal(progress.at(-1).done,23);
 await w.message('STATUS');assert.equal(w.messages[0].done,23);assert.equal(w.messages[0].total,23);
});
test('Offline navigation uses its own cached document; high-resolution photos fall back to cached basics',async()=>{
 const w=worker();await w.event('install');await w.message('PREPARE');w.setOffline(true);
 const document=await w.event('fetch',{request:{method:'GET',mode:'navigate',url:'https://example.test/travel/Pattaya/?foo=1'}});assert((await document.text()).endsWith('index.html'));
 const image=await w.event('fetch',{request:{method:'GET',mode:'cors',url:'https://example.test/travel/Pattaya/images/optimized/hero-pattaya-songkran-1920.webp'}});assert((await image.text()).includes('hero-pattaya-songkran-640.webp'));
 assert.equal(await w.event('fetch',{request:{method:'GET',mode:'navigate',url:'https://example.test/travel/Tokyo/'}}),null);
});
test('Failed photo downloads are reported as incomplete, not ready',async()=>{
 const w=worker();await w.event('install');w.failImages();await w.message('PREPARE');assert.equal(w.messages.at(-1).type,'ERROR');assert(!w.messages.some(message=>message.type==='DONE'));
});
test('Offline remote animation scripts have a safe fallback so local text can start',async()=>{
 const w=worker();w.setOffline(true);const response=await w.event('fetch',{request:{method:'GET',mode:'cors',destination:'script',url:'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js'}});assert.equal(response.status,200);assert.equal(await response.text(),'');assert(response.headers.get('Content-Type').includes('javascript'));
});
test('Generated shell URLs match the current document and all basic image assets exist',()=>{
 const html=fs.readFileSync(path.join(root,'index.html'),'utf8'),core=JSON.parse(source.match(/const CORE=(\[[^\n]+\]);/)[1]),images=JSON.parse(source.match(/const IMAGES=(\[[^\n]+\]);/)[1]);
 for(const url of core){assert(fs.existsSync(path.join(root,url.split('?')[0])));if(url.includes('?'))assert(html.includes(url));}
 for(const image of images)assert(fs.existsSync(path.join(root,image)));
});
