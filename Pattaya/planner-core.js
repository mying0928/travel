/* Pure itinerary helpers, shared by the page and regression checks. */
(function(root,factory){
    const api=factory();
    if(typeof module==='object'&&module.exports)module.exports=api;
    else root.TripTools=api;
})(typeof window!=='undefined'?window:globalThis,function(){
    'use strict';
    const currencies=['THB','TWD'];
    function plain(text){return String(text||'').replace(/<[^>]*>/g,' ').replace(/&(?:amp|nbsp|quot|lt|gt);/g,m=>({'&amp;':'&','&nbsp;':' ','&quot;':'"','&lt;':'<','&gt;':'>'}[m])).replace(/\s+/g,' ').trim();}
    function normalize(text){return plain(text).normalize('NFKC').toLocaleLowerCase().replace(/\s+/g,' ').trim();}
    function search(data,query){
        const terms=normalize(query).split(' ').filter(Boolean);
        if(!terms.length)return [];
        return Object.entries(data).flatMap(([day,value])=>value.items.map(item=>({day,item,text:normalize([item.title,item.summary,item.details].join(' '))}))).filter(row=>terms.every(term=>row.text.includes(term)));
    }
    function routeHash(day,item){return '#'+day+(item?'/'+encodeURIComponent(item):'');}
    function parseRoute(hash,data){
        let path;try{path=decodeURIComponent(String(hash).replace(/^#/,''));}catch{return null;}
        const [day,item,...extra]=path.split('/');
        if(extra.length||!(day==='overview'||Object.hasOwn(data,day)))return null;
        if(item&&(!data[day]||!data[day].items.some(x=>x.id===item)))return null;
        return {day,item:item||null};
    }
    function bangkokClock(now=new Date()){
        const p=Object.fromEntries(new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Bangkok',year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',hourCycle:'h23'}).formatToParts(now).map(x=>[x.type,x.value]));
        return {date:`${p.year}-${p.month}-${p.day}`,minutes:Number(p.hour)*60+Number(p.minute),time:`${p.hour}:${p.minute}`,day:p.year==='2027'&&p.month==='04'&&Number(p.day)>=10&&Number(p.day)<=17?'day'+(Number(p.day)-9):null};
    }
    function timeRange(item){
        const times=[...item.time.matchAll(/(\d{1,2}):(\d{2})/g)].map(x=>Number(x[1])*60+Number(x[2]));
        if(!times.length)return null;
        const start=item.startMinutes??times[0];
        let end=times.length>1?times.at(-1):start+60;
        if(end<start)end+=1440;
        return {start,end};
    }
    function nextPlan(items,minutes,manual){
        const selected=items.find(item=>item.id===manual);
        if(selected)return {item:selected,mode:'manual'};
        const timed=items.map(item=>({item,range:timeRange(item)})).filter(x=>x.range);
        const current=timed.filter(x=>x.range.start<=minutes&&x.range.end>minutes).at(-1);
        if(current)return {item:current.item,mode:'current'};
        const next=timed.find(x=>x.range.start>minutes);
        return next?{item:next.item,mode:'next'}:{item:null,mode:'finished'};
    }
    function migrateState(value,data,legacy){
        if(!value||typeof value!=='object'||Array.isArray(value))value={};
        function migrateId(id){
            if(typeof id!=='string')return null;
            const old=id.match(/^(day[1-8])-(item|details|photo)-(\d+)$/);
            if(!old)return id;
            const key=legacy[old[1]]?.[Number(old[3])];return key?`${old[1]}-${old[2]}-${key}`:null;
        }
        const position=value.position;
        const valid=position&&Object.hasOwn(data,position.day);
        const list=key=>Array.isArray(value[key])?value[key].map(migrateId).filter(Boolean):[];
        return {
            quick:value.quick===true,expanded:list('expanded'),photos:list('photos'),
            timelines:value.timelines&&typeof value.timelines==='object'?Object.fromEntries(Object.entries(value.timelines).filter(([day,open])=>Object.hasOwn(data,day)&&typeof open==='boolean')):{},
            position:valid?{day:position.day,item:migrateId(position.item),anchor:typeof position.anchor==='string'?position.anchor:null,offset:Number.isFinite(position.offset)?position.offset:0}:null,
            bookings:value.bookings&&typeof value.bookings==='object'&&!Array.isArray(value.bookings)?value.bookings:{},
            expenses:Array.isArray(value.expenses)?value.expenses.map(validExpense).filter(Boolean):null,
            manualNext:value.manualNext&&typeof value.manualNext==='object'?value.manualNext:{}
        };
    }
    function validExpense(value){
        if(!value||typeof value!=='object'||typeof value.id!=='string'||!/^[-a-zA-Z0-9]{1,100}$/.test(value.id)||!/^day[1-8]$/.test(value.day)||!currencies.includes(value.currency)||!['confirmed','estimate','unknown'].includes(value.status)||!['group','person'].includes(value.basis))return null;
        if(value.status!=='unknown'&&(typeof value.amount!=='number'||!Number.isFinite(value.amount)||value.amount<0||value.amount>1e8))return null;
        return {id:value.id,day:value.day,itemId:typeof value.itemId==='string'?value.itemId:null,label:String(value.label||'未命名費用').slice(0,150),amount:value.status==='unknown'?null:value.amount,currency:value.currency,basis:value.basis,status:value.status,note:String(value.note||'').slice(0,1000)};
    }
    function expenseTotals(rows,day){
        const totals={confirmed:{THB:0,TWD:0},estimate:{THB:0,TWD:0},unknown:0};
        for(const raw of rows){const row=validExpense(raw);if(!row||(day&&day!=='all'&&row.day!==day))continue;if(row.status==='unknown'){totals.unknown++;continue;}
            const cents=Math.round(row.amount*100)*(row.basis==='person'?4:1);totals[row.status][row.currency]+=cents;
        }
        return totals;
    }
    return {plain,normalize,search,routeHash,parseRoute,bangkokClock,timeRange,nextPlan,migrateState,validExpense,expenseTotals};
});
