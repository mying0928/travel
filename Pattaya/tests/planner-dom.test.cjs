const {test}=require('node:test'),assert=require('node:assert/strict');
const {JSDOM,VirtualConsole}=require('jsdom');
const fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'..'),html=fs.readFileSync(path.join(root,'index.html'),'utf8'),app=fs.readFileSync(path.join(root,'app.js'),'utf8'),core=fs.readFileSync(path.join(root,'planner-core.js'),'utf8');
const data=JSON.parse(app.match(/const itineraryData = (\{[\s\S]*?\n\});/)[1]);
const pause=ms=>new Promise(resolve=>setTimeout(resolve,ms));
async function boot({hash='',state,legacy,now,blocked=false,worker=false}={}){
 const errors=[],scrolls=[],vc=new VirtualConsole();vc.on('jsdomError',error=>errors.push(error.message));
 const dom=new JSDOM(html,{url:'https://example.test/travel/Pattaya/'+hash,runScripts:'outside-only',pretendToBeVisual:true,virtualConsole:vc});const w=dom.window;
 w.matchMedia=()=>({matches:false,addEventListener(){}});w.fetch=()=>Promise.reject(Error('test offline'));w.HTMLCanvasElement.prototype.getContext=()=>null;
 Object.defineProperty(w.HTMLElement.prototype,'innerText',{get(){return this.textContent;}});
 w.HTMLElement.prototype.scrollTo=function(options){this.scrollLeft=options.left||0;};w.scrollTo=options=>{scrolls.push(options);w.scrollY=options.top||0;w.dispatchEvent(new w.Event('scroll'));};
 w.HTMLElement.prototype.getBoundingClientRect=function(){let top=0,height=100;if(this.classList.contains('timeline-container')){top=1000;height=2200;}if(this.classList.contains('timeline-item')){top=1100+Math.max(0,[...this.parentElement.querySelectorAll('.timeline-item')].indexOf(this))*240;height=220;}if(this.classList.contains('day-route-spread'))top=500;return {top:top-w.scrollY,bottom:top-w.scrollY+height,height,width:100,left:0,right:100};};
 Object.defineProperty(w.HTMLElement.prototype,'offsetHeight',{get(){return this.classList.contains('date-navigation')?70:50;}});Object.defineProperty(w.HTMLElement.prototype,'offsetWidth',{get(){return 80;}});
 if(now){const DateOriginal=w.Date;w.Date=class extends DateOriginal{constructor(...args){super(...(args.length?args:[now]));}static now(){return +new DateOriginal(now);}};}
 if(state)w.localStorage.setItem('pattaya-reading-v3',JSON.stringify(state));if(legacy)w.localStorage.setItem('pattaya-reading-v2',JSON.stringify(legacy));
 if(blocked)Object.defineProperty(w,'localStorage',{get(){throw Error('blocked');}});
 let printed=0;w.print=()=>{printed++;w.dispatchEvent(new w.Event('beforeprint'));};
 if(worker){
  Object.defineProperty(w,'isSecureContext',{value:true});
  const {MessageChannel}=require('node:worker_threads');w.MessageChannel=MessageChannel;
  const active={postMessage(message,ports){ports[0].postMessage({type:'PROGRESS',done:23,total:23});ports[0].postMessage({type:'DONE'});ports[0].close();}};
  const registration={active,addEventListener(){},update:()=>Promise.resolve()};Object.defineProperty(w.navigator,'serviceWorker',{value:{register:async()=>registration,ready:Promise.resolve(registration),getRegistration:async()=>undefined,addEventListener(){}}});
 }
 if(w.document.readyState!=='complete')await new Promise(resolve=>w.addEventListener('load',resolve,{once:true}));w.eval(core);w.eval(app);w.document.dispatchEvent(new w.Event('DOMContentLoaded'));await pause(50);
 return {w,d:w.document,dom,errors,scrolls,printed:()=>printed,close(){dom.window.close();}};
}
test('Dates default closed, ignore old quick/timeline memory and close the previous day',async()=>{
 const t=await boot({state:{quick:true,timelines:{day2:true}}});try{
  const {d,w}=t;const click=day=>d.querySelector(`[data-target="${day}"]`).click();
  assert([...d.querySelectorAll('.timeline-container')].every(el=>el.classList.contains('hidden')));
  t.scrolls.length=0;click('day2');assert.equal(t.scrolls.length,1);assert(d.getElementById('timeline-day2').classList.contains('hidden'));
  d.querySelector('[data-direct-timeline="day2"]').click();assert(!d.getElementById('timeline-day2').classList.contains('hidden'));
  click('day3');assert(d.getElementById('timeline-day2').classList.contains('hidden'));assert(d.getElementById('timeline-day3').classList.contains('hidden'));
  d.querySelector('#day3 .view-timeline-btn').click();assert(!d.getElementById('timeline-day3').classList.contains('hidden'));
  click('day2');assert(d.getElementById('timeline-day3').classList.contains('hidden'));assert(d.getElementById('timeline-day2').classList.contains('hidden'));
  w.history.back();await pause(100);assert.equal(d.querySelector('.nav-btn[aria-current]').dataset.target,'day3');assert(d.getElementById('timeline-day3').classList.contains('hidden'));
  assert.equal(t.errors.length,0,t.errors.join('\n'));
 }finally{t.close();}
});
test('Search and direct links open a stable item; maps connect in both directions; copy fallback is usable',async()=>{
 const t=await boot();try{
  const {d,w}=t;const input=d.getElementById('trip-search');input.value='Seafood';input.dispatchEvent(new w.Event('input'));assert(d.querySelector('#search-results button'));
  const item=data.day3.items[5];d.querySelector(`#search-results [data-go-item="${item.id}"]`).click();await pause(40);assert.equal(w.location.hash,'#day3/'+item.id);assert(!d.getElementById('timeline-day3').classList.contains('hidden'));
  const article=d.getElementById('day3-item-'+item.id);article.querySelector('[data-locate-day]').click();const jump=d.getElementById('map-itinerary-day3');assert(!jump.hidden);assert.equal(jump.dataset.goItem,item.id);jump.click();assert(w.location.hash.includes(item.id));
  article.querySelector('[data-share-item]').click();await pause(10);assert(article.querySelector('.share-status input').value.includes('#day3/'+item.id));
  const ids=[...d.querySelectorAll('[id]')].map(el=>el.id);assert.equal(ids.length,new Set(ids).size);assert.equal(t.errors.length,0,t.errors.join('\n'));
 }finally{t.close();}
});
test('Old reading/detail/photo memory is migrated and a stable direct URL overrides the old position',async()=>{
 const item=data.day3.items[5],t=await boot({hash:'#day3/'+item.id,legacy:{position:{day:'day2',item:'day2-item-3',offset:20},expanded:['day3-details-5'],photos:['day3-photo-5']}});try{
  assert(t.d.getElementById('day3-details-'+item.id).open);assert(!t.d.getElementById('day3-photo-'+item.id).classList.contains('photo-expanded'));assert.equal(t.d.querySelector('.nav-btn[aria-current]').dataset.target,'day3');assert.equal(t.errors.length,0,t.errors.join('\n'));
 }finally{t.close();}
});
test('Manual booking status and notes persist without sending orders',async()=>{
 const t=await boot();let state;try{
  t.d.getElementById('booking-panel').open=true;await pause(20);const {d,w}=t,row=d.querySelector('.booking-row'),select=row.querySelector('select'),input=row.querySelector('input');select.value='confirmed';select.dispatchEvent(new w.Event('change',{bubbles:true}));input.value='18:00 飯店大廳';input.dispatchEvent(new w.Event('input',{bubbles:true}));
  state=JSON.parse(w.localStorage.getItem('pattaya-reading-v3'));assert.equal(state.bookings[row.dataset.bookingKey].status,'confirmed');assert.equal(state.bookings[row.dataset.bookingKey].meeting,'18:00 飯店大廳');
 }finally{t.close();}
 const restored=await boot({state});try{restored.d.getElementById('booking-panel').open=true;await pause(20);assert.equal(restored.d.querySelector('.booking-row select').value,'confirmed');assert.equal(restored.d.querySelector('.booking-row input').value,'18:00 飯店大廳');assert.equal(restored.errors.length,0,restored.errors.join('\n'));}finally{restored.close();}
});
test('Expense create/edit/remove/undo updates daily split and keeps currencies separate',async()=>{
 const t=await boot();try{
  const {d,w}=t,form=d.getElementById('expense-form');form.elements.day.value='day8';form.elements.label.value='測試接送';form.elements.status.value='confirmed';form.elements.status.dispatchEvent(new w.Event('change'));form.elements.amount.value='1234.50';form.elements.currency.value='TWD';form.elements.basis.value='group';form.dispatchEvent(new w.Event('submit',{bubbles:true,cancelable:true}));
  const stored=JSON.parse(w.localStorage.getItem('pattaya-reading-v3')),added=stored.expenses.find(row=>row.label==='測試接送');assert(added);assert(d.querySelector('[data-cost-summary="day8"]').textContent.includes('308.63'));
  d.querySelector(`[data-edit-expense="${added.id}"]`).click();form.elements.amount.value='1200';form.dispatchEvent(new w.Event('submit',{bubbles:true,cancelable:true}));assert(d.querySelector('[data-cost-summary="day8"]').textContent.includes('300 NT$'));
  d.querySelector(`[data-remove-expense="${added.id}"]`).click();assert(!d.querySelector(`[data-edit-expense="${added.id}"]`));d.getElementById('expense-undo').click();assert(d.querySelector(`[data-edit-expense="${added.id}"]`));assert.equal(t.errors.length,0,t.errors.join('\n'));
 }finally{t.close();}
});
test('Printing all eight days does not change active date or expansion state',async()=>{
 const t=await boot({hash:'#day3'});try{t.d.querySelector('[data-print-scope="all"]').click();assert.equal(t.printed(),1);assert.equal(t.d.querySelectorAll('#print-view .print-day').length,8);assert.equal(t.d.querySelectorAll('#print-view article').length,72);assert.equal(t.d.querySelectorAll('#print-view iframe').length,0);assert.equal(t.w.location.hash,'#day3');t.w.dispatchEvent(new t.w.Event('afterprint'));assert.equal(t.d.getElementById('print-view').textContent,'');assert.equal(t.errors.length,0,t.errors.join('\n'));}finally{t.close();}
});
test('Chart library is requested only on expansion and failed loading can be retried',async()=>{
 const t=await boot();try{const {d,w}=t;assert(!d.querySelector('#chart-library'));const fold=d.querySelector('.budget-fold');fold.open=true;await pause(20);assert(d.getElementById('chart-library'));d.getElementById('chart-library').dispatchEvent(new w.Event('error'));await pause(20);assert(!d.getElementById('chart-retry').hidden);d.getElementById('chart-retry').click();await pause(10);assert(d.getElementById('chart-library'));assert.equal(t.errors.length,0,t.errors.join('\n'));}finally{t.close();}
});
test('Today uses Bangkok time and manual next stop can be reset to schedule mode',async()=>{
 const t=await boot({now:'2027-04-11T03:00:00Z'});try{const {d,w}=t;assert(d.getElementById('today-brief').textContent.includes('企鵝'));let select=d.getElementById('manual-next-plan');select.value=data.day2.items[9].id;select.dispatchEvent(new w.Event('change'));assert(d.getElementById('today-brief').textContent.includes('手動選擇的下一站'));select=d.getElementById('manual-next-plan');select.value='';select.dispatchEvent(new w.Event('change'));assert(d.getElementById('today-brief').textContent.includes('時間表參考'));assert.equal(t.errors.length,0,t.errors.join('\n'));}finally{t.close();}
});
test('Offline preparation reports success only after the worker finishes; blocked storage still works',async()=>{
 const t=await boot({worker:true});try{t.d.getElementById('prepare-offline').click();await pause(60);assert(t.d.getElementById('offline-status').textContent.includes('已儲存'));assert.equal(t.errors.length,0,t.errors.join('\n'));}finally{t.close();}
 const blocked=await boot({blocked:true,hash:'#day1'});try{assert.equal(blocked.d.getElementById('day1').style.display,'block');blocked.d.querySelector('[data-direct-timeline="day1"]').click();assert(blocked.d.getElementById('storage-status').textContent.includes('無法保存'));assert.equal(blocked.errors.length,0,blocked.errors.join('\n'));}finally{blocked.close();}
});

test('Front statistics list eight days, quantities, sources and the exact selected Deluxe subtotal',async()=>{
 const t=await boot();try{
  const {d,w}=t;assert.equal(d.querySelectorAll('.daily-ledger').length,0);d.getElementById('overview-costs').open=true;await pause(20);assert.equal(d.querySelectorAll('.daily-ledger').length,8);assert.equal(d.querySelectorAll('.front-cost-list li').length,45);
  assert(d.getElementById('trip-cost-totals').textContent.includes('81,946 THB'));assert(d.getElementById('trip-cost-totals').textContent.includes('76,851 NT$'));
  const sky=[...d.querySelectorAll('.front-cost-list li')].find(row=>row.textContent.includes('Thai Sky Adventures・雙人跳傘'));assert(sky.textContent.includes('13,100 THB／人'));assert(sky.textContent.includes('52,400 THB'));assert(sky.textContent.includes('你提供的報價'));
  d.querySelector('[data-ledger-action="open"]').click();assert([...d.querySelectorAll('.daily-ledger')].every(el=>el.open));
  d.querySelector('[data-ledger-action="close"]').click();assert([...d.querySelectorAll('.daily-ledger')].every(el=>!el.open));
  d.querySelector('[data-edit-day-budget="day3"]').click();assert.equal(d.getElementById('expense-day').value,'day3');assert(d.getElementById('expense-panel').open);assert.equal(t.errors.length,0,t.errors.join('\n'));
 }finally{t.close();}
});
test('Older saved budgets receive researched tickets once; personal amounts and later removals survive reload',async()=>{
 const prior=JSON.parse(app.match(/const priorExpenseSeeds = (\[[\s\S]*?\n\]);/)[1]);
 const t=await boot({state:{expenses:prior}});let state;try{
  state=JSON.parse(t.w.localStorage.getItem('pattaya-reading-v3'));assert.equal(state.expenses.find(row=>row.itemId===data.day3.items[0].id).amount,13100);assert(state.expenses.some(row=>row.id==='ticket-truth'));
  t.d.getElementById('expense-panel').open=true;await pause(20);t.d.querySelector('[data-remove-expense="ticket-truth"]').click();state=JSON.parse(t.w.localStorage.getItem('pattaya-reading-v3'));
 }finally{t.close();}
 const again=await boot({state});try{const stored=JSON.parse(again.w.localStorage.getItem('pattaya-reading-v3'));assert(!stored.expenses.some(row=>row.id==='ticket-truth'));assert.equal(stored.expenseRevision,'2026-11-26-city-link');assert.equal(again.errors.length,0,again.errors.join('\n'));}finally{again.close();}
});
test('The lazily loaded chart and front daily figures update from the same editable rows',async()=>{
 const t=await boot();try{
  const {d,w}=t;d.getElementById('overview-costs').open=true;await pause(20);let graph;w.Chart=class{constructor(ctx,options){this.data=options.data;graph=this;}resize(){}update(){this.updated=true;}};
  d.querySelector('.budget-fold').open=true;await pause(30);assert.equal(graph.data.datasets[1].data[2],499);
  const form=d.getElementById('expense-form');form.elements.day.value='day8';form.elements.label.value='test reference fee';form.elements.status.value='estimate';form.elements.status.dispatchEvent(new w.Event('change'));form.elements.amount.value='100';form.elements.basis.value='group';form.dispatchEvent(new w.Event('submit',{bubbles:true,cancelable:true}));
  assert(graph.updated);assert.equal(graph.data.datasets[1].data[7],25);assert(d.querySelector('.daily-ledger[data-ledger-day="day8"]').textContent.includes('四人 100 THB'));assert(d.getElementById('budget-values-body').lastElementChild.textContent.includes('25 THB'));assert.equal(t.errors.length,0,t.errors.join('\n'));
 }finally{t.close();}
});

test('Overview defers supporting content, forms and weather until requested',async()=>{
 const t=await boot();try{const {d,w}=t;assert.equal(d.querySelectorAll('.overview-fold[open]').length,0);assert.equal(d.querySelectorAll('.booking-row,.expense-row,.front-cost-list li').length,0);assert(!d.querySelector('script[src*="gsap"]'));assert(d.querySelector('.overview-total').textContent.includes('20,486.5'));
 d.getElementById('expense-panel').open=true;await pause(20);assert.equal(d.querySelectorAll('.expense-row').length,45);
 d.getElementById('overview-live').open=true;await pause(20);assert(d.getElementById('weather-info').textContent.includes('無法載入'));d.getElementById('overview-live').open=false;assert.equal(t.errors.length,0,t.errors.join('\n'));
 }finally{t.close();}
});

test('Photos start small, details never enlarge them, explicit expansion resets on date changes',async()=>{
 const item=data.day3.items[5],t=await boot({hash:'#day3',state:{photos:['day3-photo-'+item.id]}});try{
 const {d,w}=t;assert([...d.querySelectorAll('.photo-expand')].every(button=>button.getAttribute('aria-expanded')==='false'));
 d.querySelector('#day3 .view-timeline-btn').click();const figure=d.querySelector('#day3 .itinerary-photo'),button=figure.querySelector('.photo-expand');
 const detail=figure.closest('.trip-card').querySelector('.trip-more');if(detail){detail.open=true;await pause(20);}assert(!figure.classList.contains('photo-expanded'));assert.equal(button.querySelector('img').sizes,'180px');
 button.click();assert(figure.classList.contains('photo-expanded'));assert.equal(button.getAttribute('aria-expanded'),'true');button.click();assert(!figure.classList.contains('photo-expanded'));
 button.click();d.querySelector('[data-target="day4"]').click();assert(!figure.classList.contains('photo-expanded'));d.querySelector('[data-target="day3"]').click();assert.equal(button.getAttribute('aria-expanded'),'false');assert(d.getElementById('timeline-day3').classList.contains('hidden'));assert.equal(t.errors.length,0,t.errors.join('\n'));
 }finally{t.close();}
});
