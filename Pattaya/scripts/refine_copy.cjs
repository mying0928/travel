const fs=require('fs'),vm=require('vm');const file=__dirname+'/../index.html';let h=fs.readFileSync(file,'utf8');
const start=h.indexOf('const itineraryData = ')+ 'const itineraryData = '.length,end=h.indexOf(';\n\n            // --- INITIALIZATION',start);
const d=vm.runInNewContext('('+h.slice(start,end)+')');
const first=[
['桃園飛曼谷','07:55 起飛、10:40 抵達 BKK，抵達後改用泰國時間。','4/10（六）TG637 自桃園第 1 航廈出發，飛行 3 小時 45 分鐘；台灣比泰國快 1 小時。'],
['下機・前往入境區','抵達後預留約 30 分鐘下機與步行。','10:40 為航班抵達時間；遠端登機門或接駁可能延長移動時間。'],
['入境・領行李・海關','約 60 分鐘辦理手續，整體出機場抓 1.5～2 小時。','先入境審查，再領行李、通過海關。行李卸載與入境排隊時間可能重疊；排程以航班準點及一般人潮估算。'],
['與司機會合','預計 12:30 上車，集合點依司機訊息。','補水、洗手間並聯絡司機；提供 TG637 航班，請司機追蹤實際抵達時間。'],
['BKK → 海灘路民宿','車程約 2～2.5 小時，四人包車 1,400 THB。',null],
['入住・午餐與休息','抵達後至 17:00 約有 2～2.5 小時。','依房東約定入住或寄放行李，附近吃午餐、洗澡休息。距 19:30 開演約 4.5～5 小時，含用餐與交通時間。'],
['前往 DAM Pattaya','預留一小時叫車、交通與找入口。',null],
['DAM 海濱晚餐','四人前排方案待購票，第一排座位待確認。',null],
['火舞秀・演後拍照','19:30 開演，20:00～20:30 拍照。',null],
['返回民宿・費用紀錄','已知包車報價 1,400 THB／四人，其餘待填。',null]
];d.day1.items.forEach((x,i)=>{x.title=first[i][0];x.summary=first[i][1];if(first[i][2])x.details='<p>'+first[i][2]+'</p>';});
d.day1.title='抵達芭達雅・DAM 火舞之夜';
d.day4.title='潑水節・海灘路水戰';d.day6.title='七珍佛山・東芭樂園・前往曼谷';d.day7.title='曼谷購物・按摩與河畔夜景';d.day8.title='曼谷返台・抵達高雄';
for(const [id,briefs] of Object.entries({day4:['睡到自然醒，出門前做好防水與防曬。','午後參與海灘路水戰，活動範圍依當日安排。','回房盥洗後，再到海邊吃晚餐。'],day6:['退房後包車前往七珍佛山。','在東芭樂園散步，看花園與天空步道。','約 16:00 出發前往曼谷，車程另留塞車緩衝。','入住後前往夜市，營業地點出發前再確認。'],day7:['BTS 串連 Siam、Central World 商圈。','Big C 買伴手禮，再安排按摩或 SPA。','ICONSIAM 或高空酒吧二選一。'],day8:['前一晚整理行李，07:00 從曼谷飯店出發。','08:30 前到 BKK，辦理報到與退稅。','TG630，11:45 曼谷起飛、16:15 抵達高雄。']}))d[id].items.forEach((x,i)=>x.summary=briefs[i]);
h=h.slice(0,start)+JSON.stringify(d,null,4)+h.slice(end);
h=h.replaceAll('戲水南洋・芭達雅浪遊','芭達雅・曼谷').replace('潑水節狂歡、海島秘境與金輝聖殿的八日詩篇','8 天海岸假期，從海風到城市夜景').replace('YOUR FLIGHTS','航班資訊');
fs.writeFileSync(file,h);
