const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const root=path.resolve(__dirname,'..');
const app=fs.readFileSync(path.join(root,'app.js'),'utf8');
const itinerary=JSON.parse(app.match(/const itineraryData = (\{[\s\S]*?\n\});/)[1]);
const assets=JSON.parse(app.match(/const imageAssets = (\{[^\n]+\});/)[1]);
const block=(name,next)=>app.slice(app.indexOf('            function '+name+'('),app.indexOf('            function '+next+'('));
function context(stored){
 const c={Intl,Date,URLSearchParams,itineraryData:itinerary,localStorage:{getItem(){if(stored instanceof Error)throw stored;return stored;}}};
 vm.createContext(c);
 vm.runInContext(block('readTripState','escapeHtml')+block('mapQuery','routeNote')+block('externalDayMap','loadRouteMap'),c);
 return c;
}
test('Bangkok calendar handles both travel boundaries independently of device timezone',()=>{
 const c=context();
 for(const [instant,day] of [['2027-04-09T16:59:59Z',null],['2027-04-09T17:00:00Z','day1'],['2027-04-16T23:30:00Z','day8'],['2027-04-17T16:59:59Z','day8'],['2027-04-17T17:00:00Z',null],['2026-04-10T10:00:00Z',null]])assert.equal(c.tripDayAt(new Date(instant)),day);
});
test('Unavailable, invalid and malformed storage leaves navigation usable',()=>{
 for(const value of [new Error('blocked'),'{broken','null','[]'])assert.equal(context(value).readTripState().quick,undefined);
 const c=context(JSON.stringify({quick:'false',photos:42,expanded:['day1-details-0',null],position:{day:'day1',item:9,anchor:{},offset:'bad'},timelines:{day1:true,day2:'yes',unknown:true}}));
 const state=JSON.parse(JSON.stringify(c.readTripState()));
 assert.equal(state.quick,false);assert.deepEqual(state.photos,[]);assert.deepEqual(state.expanded,['day1-details-0']);assert.deepEqual(state.timelines,{day1:true});assert.equal(state.position.item,null);assert.equal(state.position.offset,0);
});
test('Every day has an external map without the iframe embed parameter',()=>{
 const c=context();
 for(const day of Object.keys(itinerary)){
  const url=new URL(c.externalDayMap(day));assert.equal(url.hostname,'www.google.com');assert.equal(url.searchParams.get('api'),'1');assert.equal(url.searchParams.has('output'),false);
  if(day!=='day5'){assert(url.searchParams.get('origin'));assert(url.searchParams.get('destination'));}
 }
 assert(c.externalDayMap('day5').includes('Ko+Lan'));
 assert(!c.externalDayMap('day6').includes('Nana'));
});
test('All itinerary image variants exist and declare their original geometry',()=>{
 for(const day of Object.values(itinerary)){
  for(const file of [day.themeImage,...day.items.filter(item=>item.photo).map(item=>item.photo.file)]){
   const a=assets[file];assert(a,file);assert(a.width>0&&a.height>0);
   for(const variant of a.variants){assert(variant.width<=a.width);assert(fs.statSync(path.join(root,variant.file)).size>0);}
  }
 }
});
