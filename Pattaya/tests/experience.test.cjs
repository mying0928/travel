const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path');
const tools=require('../planner-core.js');
const root=path.resolve(__dirname,'..'),app=fs.readFileSync(path.join(root,'app.js'),'utf8');
const data=JSON.parse(app.match(/const itineraryData = (\{[\s\S]*?\n\});/)[1]);
const legacy=JSON.parse(app.match(/const legacyItemIds = (\{[^\n]+\});/)[1]);
const assets=JSON.parse(app.match(/const imageAssets = (\{[^\n]+\});/)[1]);
const costs=JSON.parse(app.match(/const defaultExpenses = (\[[\s\S]*?\n\]);/)[1]);
test('Bangkok calendar handles travel boundaries independent of device timezone',()=>{
 for(const [instant,day] of [['2027-04-09T16:59:59Z',null],['2027-04-09T17:00:00Z','day1'],['2027-04-16T23:30:00Z','day8'],['2027-04-17T16:59:59Z','day8'],['2027-04-17T17:00:00Z',null]])assert.equal(tools.bangkokClock(new Date(instant)).day,day);
});
test('All 73 stable item links are unique and resolve to the correct day',()=>{
 const ids=new Set();for(const [day,value] of Object.entries(data))for(const item of value.items){const hash=tools.routeHash(day,item.id);assert(!ids.has(hash));ids.add(hash);assert.deepEqual(tools.parseRoute(hash,data),{day,item:item.id});}
 assert.equal(ids.size,73);assert.equal(tools.parseRoute('#day3/missing',data),null);assert.equal(tools.parseRoute('#%zz',data),null);
});
test('Old saved positions, details and photos migrate and survive inserting a new segment',()=>{
 const old={position:{day:'day3',item:'day3-item-5',offset:22},expanded:['day3-details-5'],photos:['day3-photo-5']};
 const inserted=structuredClone(data);inserted.day3.items.unshift({id:'new-lunch',title:'New stop'});
 const state=tools.migrateState(old,inserted,legacy);assert.equal(state.position.item,'day3-item-'+legacy.day3[5]);assert.equal(state.expanded[0],'day3-details-'+legacy.day3[5]);assert.equal(state.photos[0],'day3-photo-'+legacy.day3[5]);assert.equal(state.position.offset,22);
});
test('Malformed saved state is rejected without blocking the page',()=>{
 for(const value of [null,[],42,'bad'])assert.equal(tools.migrateState(value,data,legacy).quick,false);
 const state=tools.migrateState({quick:'false',position:{day:'day3',item:4,offset:'bad'},expanded:['day3-details-5',null],photos:7,expenses:[{id:'bad'}]},data,legacy);
 assert.equal(state.quick,false);assert.equal(state.position.item,null);assert.equal(state.position.offset,0);assert.deepEqual(state.photos,[]);assert.deepEqual(state.expenses,[]);
});
test('Search matches Chinese, mixed case, full-width input and multiple words',()=>{
 assert(tools.search(data,'海鮮').some(row=>row.item.title.includes('Seafood')));
 assert(tools.search(data,'ＢＩＧ C').some(row=>row.item.title.includes('Big C Extra')));
 assert(tools.search(data,'按摩').length>0);assert.deepEqual(tools.search(data,'   '),[]);assert.deepEqual(tools.search(data,'<script>missing</script>'),[]);
});
test('Schedule reference supports manual selection, overnight sessions and the Taiwan departure timezone',()=>{
 const zoo=data.day2.items;assert.equal(tools.nextPlan(zoo,600).item.title,'企鵝館・10:00 散步');
 assert.equal(tools.nextPlan(zoo,600,zoo[9].id).mode,'manual');assert.equal(tools.nextPlan(zoo,600,zoo[9].id).item.id,zoo[9].id);
 assert.equal(tools.timeRange(data.day3.items[9]).end,1500);assert.equal(tools.timeRange(data.day1.items[0]).start,415);assert.equal(tools.nextPlan(data.day8.items,1300).mode,'finished');
});
test('Confirmed quotes, estimates and currencies stay separate and transfers are counted once',()=>{
 const totals=tools.expenseTotals(costs,'day1');assert.equal(totals.confirmed.THB,300000);assert.equal(totals.confirmed.TWD,193300);assert.equal(totals.unknown,5);assert.equal(totals.estimate.THB,0);
 const day2=tools.expenseTotals(costs,'day2');assert.equal(day2.confirmed.THB,280000);assert.equal(day2.estimate.THB,335000);
 assert.equal(tools.validExpense({id:'x',day:'day1',currency:'THB',basis:'group',status:'confirmed',amount:NaN}),null);
});
test('Both directions of every map/itinerary connection point to valid entries',()=>{
 for(const value of Object.values(data)){
  for(const point of value.route)assert(value.items.some(item=>item.id===point.itemId));
  for(const item of value.items)for(const index of item.routeIndices)assert(value.route[index]);
 }
});
test('All responsive variants and offline basic images exist',()=>{
 for(const day of Object.values(data))for(const file of [day.themeImage,...day.items.filter(item=>item.photo).map(item=>item.photo.file)]){
  const asset=assets[file];assert(asset,file);assert(asset.width>0&&asset.height>0);for(const variant of asset.variants){assert(variant.width<=asset.width);assert(fs.statSync(path.join(root,variant.file)).size>0);}
 }
});

test('The chosen Deluxe plan replaces the basic jump and all eight days expose individual expenses',()=>{
 const sky=costs.filter(row=>row.itemId===data.day3.items[0].id&&row.status!=='unknown');assert.equal(sky.length,1);assert.equal(sky[0].amount,15650);assert.equal(sky[0].amount*4,62600);
 assert(data.day3.items[0].summary.includes('62,600'));
 const total=tools.expenseTotals(costs,'all');assert.equal(total.confirmed.THB+total.estimate.THB,9214600);assert.equal(total.confirmed.TWD+total.estimate.TWD,193300);
 for(const day of Object.keys(data))assert(costs.some(row=>row.day===day));
 assert(!costs.some(row=>row.id.startsWith('unknown-')));
});
test('Price updates refresh unchanged seeds, preserve custom figures, and do not restore deleted old rows',()=>{
 const prior=JSON.parse(app.match(/const priorExpenseSeeds = (\[[\s\S]*?\n\]);/)[1]);
 const skyId=prior.find(row=>row.itemId===data.day3.items[0].id).id;
 const untouched=tools.reconcileExpenses(prior,prior,costs);assert.equal(untouched.find(row=>row.id===skyId).amount,15650);assert(untouched.some(row=>row.id==='ticket-zoo'));
 const edited=prior.map(row=>row.id===skyId?{...row,amount:16000,note:'my custom quote'}:row).filter(row=>row.id!==prior[0].id);
 const result=tools.reconcileExpenses(edited,prior,costs);assert.equal(result.find(row=>row.id===skyId).amount,16000);assert.equal(result.find(row=>row.id===skyId).note,'my custom quote');assert(!result.some(row=>row.id===prior[0].id));
 assert.equal(new Set(result.map(row=>row.id)).size,result.length);
});
