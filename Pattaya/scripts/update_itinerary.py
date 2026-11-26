from pathlib import Path
import json
p=Path(__file__).resolve().parents[1]/'index.html';s=p.read_text();(p.parent/'index.before-itinerary-polish.html').write_text(s)
def link(url,label): return f'<a class="booking-link" href="{url}" target="_blank" rel="noopener noreferrer">{label} ↗</a>'
def row(t,h,brief,details,icon='fa-location-dot'):return dict(time=t,title=h,summary=brief,details=details,icon=icon)
zoo='https://www.klook.com/en-US/activity/338-khao-kheow-open-zoo-pattaya/'
zofficial='https://khaokheowzoothailand.org/site/khaokheow.zoothailand.org/en/index.html'
house='https://chillpainai.com/public/en/products/11257'
show='https://www.thailandactivitytickets.com/activity/imagine-79-show-pattaya-tickets'
sky='https://thaiskyadventures.com/begin-your-booking/'
cruise='https://www.klook.com/zh-TW/activity/106819-ocean-sky-cruise-with-show-in-pattaya/'
spa='https://letsrelaxspa.com/branches/pattaya-beachfront/'
island='https://www.pattayacoral.com/'
def day(title,img,highlights,loc,items):return dict(title=title,themeImage=img,highlights=[dict(icon=ic,text=t) for ic,t in highlights],locations=loc,items=items)
d2=day('綠山動物園・午後拍照與夜生活','images/khao-kheow-zoo.jpg',[('fa-paw','Moo Deng・企鵝'),('fa-camera','House of Benedict'),('fa-moon','79 秀・六巷')],{'綠山動物園':dict(lat=13.215,lon=101.056)},[
 row('07:30–08:30','海灘路 → 綠山動物園','預留約 1 小時車程，提前安排回程接送。','<p>車程按 45～60 分鐘規劃，依海灘路實際上車點與路況調整。建議包車等候或約定 13:30 接回，今日車資另詢價。</p>','fa-car'),
 row('08:30–08:45','換票・租四人球車','先換票，再確認租金、超時費與擔保方式。',f'<p>選非泰國居民門票；換票地點依憑證。球車依你提供的參考價：前 2 小時 500 THB＋保險 50 THB／車，四人基本均攤 137.5 THB／人。</p><p>08:45 租至 13:30 共 4 小時 45 分鐘，超出基本方案 2 小時 45 分鐘；超時費另計。護照、押金或其他擔保方式與可租數量須現場確認，早到不保證有車。</p>'+link(zoo,'動物園門票')+link(zofficial,'園方資訊'),'fa-ticket'),
 row('08:45–09:40','Moo Deng・草食動物區','先看侏儒河馬，再依園區動線看水豚、坡鹿與長頸鹿。','<p>以當日園區地圖及開放展區為準，不依未核實的分區顏色趕路。動物是否露面、餵食是否開放，依現場安排；草料費另計。</p>','fa-paw'),
 row('09:40–10:20','企鵝館・10:00 散步','提前找位置，保留移動與等候時間。',f'<p>園方目前列首場 10:00；當日可能調整。餵食與合照須依現場開放，費用另計。</p>'+link(zofficial,'查看當日場次'),'fa-paw'),
 row('10:20–11:30','移動・11:00 大象場次','看完企鵝直接前往大象區，不插入遠端展區。',f'<p>依目前園方時刻安排 11:00，取代原稿 11:30；4/11 為週日，入園後再次確認時刻。</p>'+link(zofficial,'園方表演時刻'),'fa-water'),
 row('11:30–12:15','Food Center 午餐','補水、用餐，避開中午最熱的一段。','<p>午餐與飲料自理，安排約 45 分鐘。</p>','fa-utensils'),
 row('12:15–13:00','猛獸區・鳥園補看','依距離擇近參觀，不為餵食繞遠路。','<p>白獅、白虎與鳥園以當日開放為準；餵食種類、場次與價格不先視為保證項目。</p>','fa-paw'),
 row('13:00–13:30','回租借站・還車','結清超時費，取回擔保物。','<p>保留回程與驗車時間；確認證件或押金已取回，再前往接送點。</p>','fa-car'),
 row('13:30–15:00','動物園 → House of Benedict','直接南下，交通預留約 1～1.5 小時。','<p>此為排程緩衝，非即時導航；若塞車，縮短拍照時段，不壓縮晚餐與接送。</p>','fa-car'),
 row('15:00–16:30','House of Benedict','主題造景拍照、下午茶，停留約 90 分鐘。',f'<p>售票頁目前列外國成人 200 THB／人，四人 800 THB；餐飲另計。選 Non-Thai Adult，2027/4/11 可訂日期與實付價格依結帳頁。</p>'+link(house,'House of Benedict 訂票'),'fa-camera'),
 row('16:30–18:15','返回海灘路・休息與晚餐','回民宿整理後就近用餐，Terminal 21 視體力再去。','<p>回程先留 30～45 分鐘，再休息、吃飯。避免為了逛街錯過 79 秀接送。</p>','fa-utensils'),
 row('18:15–19:00','前往 79 秀','接送或叫車時間依方案確認。','<p>若方案含飯店接送，依憑證集合，不把接車時間當成開演時間。</p>','fa-car'),
 row('19:00–20:15','IMAGINE 79 成人秀','保留約一輪演出及進出場時間。',f'<p>18+；攜帶可核驗年齡的證件，手機與攝影器材依場館規則寄存，場內不拍攝。方案依護照類別選擇，請向售票商確認台灣護照適用性。</p><p>待確認 2027/4/11 營運、時段與票價。Klook 20608 中文頁目前顯示 89 秀，因此此處改附 79 秀專屬售票頁。</p>'+link(show,'79 秀方案與預訂'),'fa-ticket'),
 row('20:15–20:45','79 秀 → 六巷','預留叫車與移動時間，依演出結束時間順延。','<p>以叫車或已約定的接送為主；不先假設有固定 10 THB 雙條車直達。</p>','fa-car'),
 row('20:45–23:00','Soi 6 酒吧街','找間喜歡的酒吧小酌、聊天與玩桌遊。','<p>飲品、互動飲料與交通另計，點單前看菜單。店家營業時間各異，結束後返回海灘路民宿。</p>','fa-moon'),
 row('費用備註','四人費用・待訂項目','球車基本 550 THB＋Benedict 門票參考 800 THB。','<p>兩項參考小計 1,350 THB／四人，非全日總額。另加球車超時、動物園門票、包車、79 秀、餐飲與酒吧消費；未確認或未購買的項目不列為已付款。</p>','fa-wallet')])
d3=day('高空跳傘・海上晚餐與高空夜景','images/thai-sky-adventures.jpg',[('fa-plane','Thai Sky Adventures'),('fa-ship','日落郵輪'),('fa-moon','ZAMĀ Skybar')],{'Royal Garden Plaza':dict(lat=12.927,lon=100.879),'Bali Hai 碼頭區域':dict(lat=12.920,lon=100.867)},[
 row('07:00–12:00','Thai Sky Adventures 雙人跳傘','預約上午第一批；接送、講習與候跳共抓半天。',f'<p>07:00 為希望安排的接送時間，須由業者確認。高度、攝影與飯店接送是否包含，以所選方案為準。官網目前基本方案參考 9,700 THB／人；若四人皆跳約 38,800 THB，2027 價格及附加費依結帳。</p><p>風況可能延誤，12:00 不保證返回市區。</p>'+link(sky,'跳傘官網預訂'),'fa-plane'),
 row('12:00–13:00','返回市區・午餐','依實際回程時間，在海灘路附近用餐。','<p>先確認接送下車點。若跳傘延後，優先縮短百貨時間。</p>','fa-utensils'),
 row('13:00–16:00','Royal Garden Plaza','午餐後逛街；Ripley’s 選一兩項體驗即可。','<p>位於海灘路，逛街本身不需門票；Ripley’s 展館與遊樂設施另購。最晚 16:00 結束，為郵輪報到留緩衝。</p>','fa-shopping-bag'),
 row('16:00–17:30','前往集合點・郵輪報到','保留交通、找售票處與登船時間。',f'<p>目標約 17:00 前抵達憑證指定集合處；報到截止與接駁安排須先確認。原稿 Anytime Café、A 碼頭與接駁時刻尚未核實，不作為固定指示。</p>'+link(cruise,'確認郵輪方案與集合點'),'fa-ticket'),
 row('18:00–19:45','Ocean Sky 升級版・日落場','海上自助餐、歌舞與夜景，選日落場銜接下一站。',f'<p>Klook 現為「亞特蘭蒂斯海天 PLUS」，列日落場 18:00～19:45；與原稿「東方公主號」名稱不直接混用。預訂四人時確認自助餐與表演包含內容。</p><p>此安排以選到日落場為前提；20:00 晚餐場會與後續行程衝突。票價待選 2027/4/12 後填入。</p>'+link(cruise,'Klook 日落場預訂'),'fa-ship'),
 row('19:45–20:30','下船・前往中天','預留約 45 分鐘，下船後叫車至 D Varee 飯店。','<p>19:45 是方案結束時間，不保證已到岸。依實際接駁下船與路況調整，晚到則縮短酒吧停留。</p>','fa-car'),
 row('20:30–21:45','ZAMĀ Skybar・38 樓','中天海岸夜景與調酒，建議預約四人桌。',link('https://zama.asia/','ZAMĀ 官網訂位')+'<p>位於 D Varee Jomtien Beach 飯店 38 樓；飲品與餐飲依現場菜單，訂位條件以官網為準。</p>','fa-moon'),
 row('21:45–22:30','中天 → Soi 6','預留叫車與跨區移動時間。','<p>這段以叫車規劃，約 30～45 分鐘作排程緩衝，非固定導航車程。</p>','fa-car'),
 row('22:30–01:00（彈性）','六巷續攤・依營業情況','看店家與體力決定停留時間，隨時可回民宿。','<p>01:00 為最晚預留時間，不保證每家店營業至此；若六巷已收店就直接返宿。飲品含互動飲料先看菜單，不固定以 200 THB 計。</p>','fa-moon')])
d5=day('格蘭島一日・按摩與海灘路夜晚','images/koh-larn.jpg',[('fa-ship','格蘭島全天'),('fa-spa','Let’s Relax'),('fa-utensils','Terminal 21')],{'Bali Hai 碼頭區域':dict(lat=12.920,lon=100.867),'格蘭島（島嶼位置示意）':dict(lat=12.918,lon=100.780),'Terminal 21 Pattaya':dict(lat=12.935,lon=100.889)},[
 row('08:30–09:30','接送・快艇前往格蘭島','民宿集合，依方案前往碼頭或海灘出發點。',f'<p>08:30 為暫定接送時間，須在訂單填入民宿位置並請業者確認。出發位置不一定是 Bali Hai，依憑證為準。</p>'+link(island,'格蘭島業者方案與預訂'),'fa-ship'),
 row('09:30–16:30','格蘭島・水上活動與午餐','海灘休息穿插水上活動，選全天套票。','<p>拖曳傘、香蕉船、水上摩托車、浮潛、海底漫步擇所選方案體驗，並非所有票種全含。訂前確認四人接送、午餐、躺椅、活動次數及返程時間。</p><p>以 16:30 前返抵芭達雅為排程目標，依海況、方案與業者實際安排調整；價格待選方案。</p>','fa-water'),
 row('16:30–17:15','回民宿・盥洗換裝','先沖澡、換乾衣，再去按摩。','<p>若船班或接送延後，按摩與晚餐一起順延；不把碼頭抵達時間當成回到房間。</p>','fa-house'),
 row('17:15–18:45','Let’s Relax・放鬆 60 分鐘','預留報到、換裝與接待時間，選海灘路店。',f'<p>可預約 Pattaya Beachfront（海灘路 Soi 12），本時段以 60 分鐘療程安排；若選 2 小時 SPA，晚餐需順延。四人同時段與價格先向店家確認。</p>'+link(spa,'Let’s Relax 海灘路店預約資訊'),'fa-spa'),
 row('18:45–19:15','前往 Terminal 21','預留約 30 分鐘移動。','<p>依民宿及按摩店位置調整；遇塞車可改在海灘路附近先吃飯。</p>','fa-car'),
 row('19:15–20:45','Terminal 21・Pier 21 晚餐','逛主題樓層，在美食街用餐。','<p>以 Terminal 21 為主，不再硬排第二個逛街點。想吃露天小吃，可改去 Runway Street Food，出發前確認當日營業。</p>','fa-utensils'),
 row('20:45–21:15','前往六巷','依實際位置叫車或搭合適路線的雙條車。','<p>先確認行車方向與收費；不把 10 THB 當成保證票價。</p>','fa-car'),
 row('21:15–23:30','Soi 6・小酌收尾','喝杯酒、玩桌遊，依體力提早返宿。','<p>酒水與交通另計。這晚仍住芭達雅，4/15 才安排退房前往曼谷。</p>','fa-moon')])
for start,end,d in [('day2','day3',d2),('day3','day4',d3),('day5','day6',d5)]:
 a=s.index('                '+start+':');b=s.index('                '+end+':',a)
 s=s[:a]+'                '+start+': '+json.dumps(d,ensure_ascii=False,indent=4)+',\n'+s[b:]
# Show the schedule immediately; put supporting detail behind native accessible disclosure controls.
a=s.index('                    const timelineHtml =');b=s.index('\n                    return `',a)
s=s[:a]+'''                    const timelineHtml = dayData.items.map(item => `
                        <details class="schedule-row">
                            <summary><span class="schedule-time">${item.time}</span><span class="schedule-main"><strong>${item.title}</strong>${item.summary ? `<span>${item.summary}</span>` : ''}</span><span class="schedule-toggle" aria-hidden="true">＋</span></summary>
                            <div class="schedule-details">${item.details}</div>
                        </details>
                    `).join('');
'''+s[b:]
s=s.replace('<div class="daily-theme-card cursor-pointer relative','<div class="daily-theme-card relative')
s=s.replace('                                <button aria-expanded="false" aria-controls="timeline-${dayId}" class="view-timeline-btn mt-6 bg-sky-500 text-white py-2 px-6 rounded-full shadow-lg hover:bg-sky-600 transition-transform hover:scale-105 flex items-center justify-center">查看詳細行程 <i class="fas fa-chevron-down ml-2"></i></button>','')
s=s.replace('<div id="timeline-${dayId}" class="timeline-container hidden relative pl-10 sm:pl-12">\n                                <div class="timeline-line"></div>\n                                <div class="timeline-line-progress"></div>','<p class="schedule-hint">時間皆為泰國當地時間 · 點開各段查看交通、費用與預訂</p><div id="timeline-${dayId}" class="schedule-list">')
a=s.index("                document.querySelectorAll('.daily-theme-card').forEach");b=s.index('\n            function setupTabSwitching()',a)
s=s[:a]+'            }\n'+s[b:]
s=s.replace('data: [350, 800, 1000, 1000, 1800, 2500, 3500, 800]', 'data: [350, null, null, 1000, null, 2500, 3500, 800]')
s=s.replace('其餘日期為規劃用粗估，實際依現場消費調整。','4/11、4/12、4/14 方案尚未定價，圖表暫留空；其餘日期為規劃用粗估，實際依現場消費調整。')
p.write_text(s)
