        let reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change',event=>{reduceMotion=event.matches;});

        document.addEventListener('DOMContentLoaded', function () {
            const motionAvailable = Boolean(window.gsap && window.ScrollTrigger && window.ScrollToPlugin);
            if (motionAvailable) gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
            // --- DOM Elements ---
            const navButtons = document.querySelectorAll('.nav-btn');
            const dateStrip = document.getElementById('date-strip');
            const dateTrack = document.getElementById('date-track');
            const dailySectionsContainer = document.getElementById('daily-sections-container');
            let currentActiveSectionId = null;
            let isAnimating = false;
            const tripState = readTripState();
            const mapTimers = {};
            const selectedRoutes = {};
            const itemLinkCache = new WeakMap();
            const imageAssets = {"images/bkk-departure-hall.jpg":{"width":2048,"height":1536,"variants":[{"file":"images/optimized/bkk-departure-hall-640.webp","width":640},{"file":"images/optimized/bkk-departure-hall-1280.webp","width":1280},{"file":"images/optimized/bkk-departure-hall-1920.webp","width":1920}]},"images/dam-option-4.jpg":{"width":1366,"height":683,"variants":[{"file":"images/optimized/dam-option-4-640.webp","width":640},{"file":"images/optimized/dam-option-4-1280.webp","width":1280},{"file":"images/optimized/dam-option-4-1366.webp","width":1366}]},"images/dam-pattaya-fire-panorama.jpg":{"width":1295,"height":862,"variants":[{"file":"images/optimized/dam-pattaya-fire-panorama-640.webp","width":640},{"file":"images/optimized/dam-pattaya-fire-panorama-1280.webp","width":1280},{"file":"images/optimized/dam-pattaya-fire-panorama-1295.webp","width":1295}]},"images/hero-pattaya-songkran.jpg":{"width":2048,"height":1151,"variants":[{"file":"images/optimized/hero-pattaya-songkran-640.webp","width":640},{"file":"images/optimized/hero-pattaya-songkran-1280.webp","width":1280},{"file":"images/optimized/hero-pattaya-songkran-1920.webp","width":1920}]},"images/house-of-benedict.jpg":{"width":1200,"height":800,"variants":[{"file":"images/optimized/house-of-benedict-640.webp","width":640},{"file":"images/optimized/house-of-benedict-1200.webp","width":1200}]},"images/hua-takhe-cat-boat.webp":{"width":2000,"height":1333,"variants":[{"file":"images/optimized/hua-takhe-cat-boat-640.webp","width":640},{"file":"images/optimized/hua-takhe-cat-boat-1280.webp","width":1280},{"file":"images/optimized/hua-takhe-cat-boat-1920.webp","width":1920}]},"images/khao-kheow-elephant.jpg":{"width":750,"height":469,"variants":[{"file":"images/optimized/khao-kheow-elephant-640.webp","width":640},{"file":"images/optimized/khao-kheow-elephant-750.webp","width":750}]},"images/khao-kheow-penguin-parade.jpg":{"width":1200,"height":900,"variants":[{"file":"images/optimized/khao-kheow-penguin-parade-640.webp","width":640},{"file":"images/optimized/khao-kheow-penguin-parade-1200.webp","width":1200}]},"images/khao-kheow-zoo.jpg":{"width":800,"height":533,"variants":[{"file":"images/optimized/khao-kheow-zoo-640.webp","width":640},{"file":"images/optimized/khao-kheow-zoo-800.webp","width":800}]},"images/koh-larn.jpg":{"width":1700,"height":510,"variants":[{"file":"images/optimized/koh-larn-640.webp","width":640},{"file":"images/optimized/koh-larn-1280.webp","width":1280},{"file":"images/optimized/koh-larn-1700.webp","width":1700}]},"images/lof-land.jpg":{"width":640,"height":960,"variants":[{"file":"images/optimized/lof-land-640.webp","width":640}]},"images/moo-deng.jpg":{"width":771,"height":1024,"variants":[{"file":"images/optimized/moo-deng-640.webp","width":640},{"file":"images/optimized/moo-deng-771.webp","width":771}]},"images/nong-nooch-garden.jpg":{"width":2048,"height":1535,"variants":[{"file":"images/optimized/nong-nooch-garden-640.webp","width":640},{"file":"images/optimized/nong-nooch-garden-1280.webp","width":1280},{"file":"images/optimized/nong-nooch-garden-1920.webp","width":1920}]},"images/phra-tamnak-viewpoint-day.jpg":{"width":700,"height":600,"variants":[{"file":"images/optimized/phra-tamnak-viewpoint-day-640.webp","width":640},{"file":"images/optimized/phra-tamnak-viewpoint-day-700.webp","width":700}]},"images/riverside-carnival-cruise.jpg":{"width":1500,"height":1001,"variants":[{"file":"images/optimized/riverside-carnival-cruise-640.webp","width":640},{"file":"images/optimized/riverside-carnival-cruise-1280.webp","width":1280},{"file":"images/optimized/riverside-carnival-cruise-1500.webp","width":1500}]},"images/runway-night-market.jpg":{"width":900,"height":650,"variants":[{"file":"images/optimized/runway-night-market-640.webp","width":640},{"file":"images/optimized/runway-night-market-900.webp","width":900}]},"images/seafood-station.jpg":{"width":1536,"height":2048,"variants":[{"file":"images/optimized/seafood-station-640.webp","width":640},{"file":"images/optimized/seafood-station-1280.webp","width":1280},{"file":"images/optimized/seafood-station-1536.webp","width":1536}]},"images/sky-gallery-sunset.jpg":{"width":1200,"height":800,"variants":[{"file":"images/optimized/sky-gallery-sunset-640.webp","width":640},{"file":"images/optimized/sky-gallery-sunset-1200.webp","width":1200}]},"images/sky-wide-exit.webp":{"width":1295,"height":971,"variants":[{"file":"images/optimized/sky-wide-exit-640.webp","width":640},{"file":"images/optimized/sky-wide-exit-1280.webp","width":1280},{"file":"images/optimized/sky-wide-exit-1295.webp","width":1295}]},"images/sky-wide-tandem.webp":{"width":1295,"height":971,"variants":[{"file":"images/optimized/sky-wide-tandem-640.webp","width":640},{"file":"images/optimized/sky-wide-tandem-1280.webp","width":1280},{"file":"images/optimized/sky-wide-tandem-1295.webp","width":1295}]},"images/songkran-water-splash.jpg":{"width":1920,"height":1080,"variants":[{"file":"images/optimized/songkran-water-splash-640.webp","width":640},{"file":"images/optimized/songkran-water-splash-1280.webp","width":1280},{"file":"images/optimized/songkran-water-splash-1920.webp","width":1920}]},"images/zama-skybar.webp":{"width":1200,"height":801,"variants":[{"file":"images/optimized/zama-skybar-640.webp","width":640},{"file":"images/optimized/zama-skybar-1200.webp","width":1200}]},"images/真理寺.jpg":{"width":1600,"height":1147,"variants":[{"file":"images/optimized/真理寺-640.webp","width":640},{"file":"images/optimized/真理寺-1280.webp","width":1280},{"file":"images/optimized/真理寺-1600.webp","width":1600}]}};

            // --- DATA ---
            const itineraryData = {
    "day1": {
        "title": "抵達芭達雅・DAM 火舞之夜",
        "themeImage": "images/dam-pattaya-fire-panorama.jpg",
        "highlights": [
            {
                "icon": "fa-camera",
                "text": "LOF LAND"
            },
            {
                "icon": "fa-water",
                "text": "芭達雅海灘路"
            },
            {
                "icon": "fa-fire",
                "text": "DAM 火舞秀"
            },
            {
                "icon": "fa-moon",
                "text": "Soi 6 六巷"
            }
        ],
        "locations": {
            "蘇凡納布機場 BKK": {
                "lat": 13.69,
                "lon": 100.75
            },
            "芭達雅海灘路（住宿區域示意）": {
                "lat": 12.928,
                "lon": 100.883
            }
        },
        "items": [
            {
                "time": "07:55 → 10:40",
                "title": "桃園飛曼谷",
                "icon": "fa-plane-departure",
                "details": "<div class=\"detail-copy\"><p>4/10（六）TG637 自桃園第 1 航廈出發，飛行 3 小時 45 分鐘；台灣比泰國快 1 小時。</p></div>",
                "summary": "07:55 起飛、10:40 抵達 BKK，抵達後改用泰國時間。",
                "notice": "航班時間為各地當地時間；抵達曼谷後，行程一律使用泰國時間。",
                "kind": "transport",
                "disclosureLabel": ""
            },
            {
                "time": "10:40–11:10",
                "title": "下機・前往入境區",
                "icon": "fa-person-walking-luggage",
                "details": "<div class=\"detail-copy\"><p>10:40 為航班抵達時間；遠端登機門或接駁可能延長移動時間。</p></div>",
                "summary": "抵達後預留約 30 分鐘下機與步行。",
                "notice": "",
                "kind": "transport",
                "disclosureLabel": ""
            },
            {
                "time": "11:10–12:10",
                "title": "入境・領行李・海關",
                "icon": "fa-passport",
                "details": "<div class=\"detail-copy\"><p>先入境審查，再領行李、通過海關。行李卸載與入境排隊時間可能重疊；排程以航班準點及一般人潮估算。</p></div>",
                "summary": "約 60 分鐘辦理手續，整體出機場抓 1.5～2 小時。",
                "notice": "抵達至出關約抓 1.5～2 小時，排隊與行李時間可能變動。",
                "kind": "transport",
                "disclosureLabel": ""
            },
            {
                "time": "12:10–12:30",
                "title": "與司機會合",
                "icon": "fa-car",
                "details": "<div class=\"detail-copy\"><p>補水、洗手間並聯絡司機；提供 TG637 航班，請司機追蹤實際抵達時間。</p></div>",
                "summary": "預計 12:30 上車，集合點依司機訊息。",
                "notice": "",
                "kind": "transport",
                "disclosureLabel": ""
            },
            {
                "time": "12:30–13:30（估）",
                "title": "BKK → 春武里 LOF LAND",
                "summary": "出關後包車前往 LOF LAND，先抓約 1～1.5 小時車程。",
                "details": "<div class=\"detail-copy\"><p>路線：BKK → LOF LAND 停留 2 小時 → 芭達雅海灘路附近民宿。</p><p><strong>四人包車總價 <mark class=\"cost-tag\">1,800 THB</mark>，平均每人 <mark class=\"cost-tag\">450 THB</mark>。</strong></p><ul><li>BKK → 芭達雅機場接送：<mark class=\"cost-tag\">1,300 THB</mark>／車（四人）。</li><li>LOF LAND 景點停留加價：<mark class=\"cost-tag\">500 THB</mark>。</li></ul><p>此為你提供的整段接送報價，含上述停留加價；LOF LAND 門票及晚間市區叫車另計。</p></div><div class=\"trip-links\"><a class=\"trip-link\" href=\"https://maps.app.goo.gl/FmaH19S7VuRyycdq8\" target=\"_blank\" rel=\"noopener noreferrer\" aria-label=\"LOF LAND 地圖（另開分頁）\">LOF LAND 地圖<span aria-hidden=\"true\">↗</span></a></div>",
                "kind": "transport",
                "icon": "fa-car",
                "notice": "以約 12:30 上車估算；出關或交通延後時，後續行程同步順延。",
                "disclosureLabel": "接送路線與包車費用"
            },
            {
                "time": "13:30–15:30（估）",
                "title": "LOF LAND・拍照與飲料",
                "summary": "停留約 2 小時，門票每人 300 THB，含一杯飲料。",
                "details": "<div class=\"detail-copy\"><p>在春武里的 LOF LAND 逛園區、拍照，再坐下喝杯飲料。</p><p><strong>門票 <mark class=\"cost-tag\">300 THB</mark>／人，含飲料一杯；四人共 <mark class=\"cost-tag\">1,200 THB</mark>。</strong>飲料可兌換品項依店家規則，加點餐食另計。</p></div><div class=\"trip-links\"><a class=\"trip-link\" href=\"https://maps.app.goo.gl/FmaH19S7VuRyycdq8\" target=\"_blank\" rel=\"noopener noreferrer\" aria-label=\"LOF LAND 地圖（另開分頁）\">LOF LAND 地圖<span aria-hidden=\"true\">↗</span></a><a class=\"trip-link\" href=\"https://www.lof-land.com/th/ticket\" target=\"_blank\" rel=\"noopener noreferrer\" aria-label=\"LOF LAND 門票預訂（另開分頁）\">LOF LAND 門票預訂<span aria-hidden=\"true\">↗</span></a></div>",
                "kind": "activity",
                "icon": "fa-camera",
                "notice": "門票以你提供的 300 THB 記錄；出發前確認預約方案與飲料兌換內容。",
                "disclosureLabel": "",
                "photo": {
                    "file": "images/lof-land.jpg",
                    "caption": "LOF LAND・未來感造景",
                    "alt": "LOF LAND 巨型金屬標誌、岩壁瀑布與綠地",
                    "scene": "day"
                }
            },
            {
                "time": "15:30–16:30／17:00（估）",
                "title": "LOF LAND → 芭達雅海灘路",
                "summary": "拍照後繼續搭原包車，前往海灘路附近民宿。",
                "details": "<div class=\"detail-copy\"><p>此段車程抓約 1～1.5 小時，費用已計入整段包車 1,800 THB，不另重複加總。</p></div>",
                "kind": "transport",
                "icon": "fa-car",
                "notice": "",
                "disclosureLabel": ""
            },
            {
                "time": "16:30／17:00–17:30",
                "title": "入住・盥洗換裝",
                "summary": "抵達後先放行李、簡單整理，再出發去 DAM。",
                "details": "<div class=\"detail-copy\"><p>依民宿約定辦理入住。這段約 30～60 分鐘，優先留給盥洗換裝；午餐可在機場上車前簡單解決或先準備輕食。</p></div>",
                "kind": "activity",
                "icon": "fa-house",
                "notice": "加入 LOF LAND 後，下午休息時間較短；若晚到，先放行李再前往晚餐。",
                "disclosureLabel": ""
            },
            {
                "time": "17:30–18:15（估）",
                "title": "海灘路 → DAM Pattaya",
                "summary": "叫車前往 DAM，目標 18:15 左右入座。",
                "details": "<div class=\"detail-copy\"><p>預留約 45 分鐘叫車、交通與找入口；地址依 Klook 憑證確認。此段市區車資另計。</p></div><div class=\"trip-links\"><a class=\"trip-link\" href=\"https://www.google.com/maps/search/?api=1&amp;query=DAM+Pattaya\" target=\"_blank\" rel=\"noopener noreferrer\" aria-label=\"DAM Pattaya 地圖（另開分頁）\">DAM Pattaya 地圖<span aria-hidden=\"true\">↗</span></a></div>",
                "kind": "transport",
                "icon": "fa-car",
                "notice": "",
                "disclosureLabel": ""
            },
            {
                "time": "18:15–19:30",
                "title": "DAM 海濱晚餐",
                "icon": "fa-utensils",
                "details": "<div class=\"detail-copy\"><p>先報到入座、享用晚餐，再欣賞火舞。四人前排方案費用 <strong><mark class=\"cost-tag\">NT$1,933</mark>／四人</strong>，平均 <strong><mark class=\"cost-tag\">NT$483.25</mark>／人</strong>。第一排座位與餐飲內容依方案及訂單確認；額外加點另計。</p></div><div class=\"trip-links\"><a class=\"trip-link\" href=\"https://www.klook.com/zh-TW/activity/186411-dam-beach-fireshow-pattaya/\" target=\"_blank\" rel=\"noopener noreferrer\" aria-label=\"Klook 四人海濱方案（另開分頁）\">Klook 四人海濱方案<span aria-hidden=\"true\">↗</span></a></div>",
                "summary": "四人海濱前排方案 NT$1,933，平均每人 NT$483.25。",
                "notice": "第一排座位及套餐內容以訂單確認；餐飲加點另計。",
                "kind": "dining",
                "disclosureLabel": "套餐內容與訂票"
            },
            {
                "time": "19:30–20:30",
                "title": "火舞秀・演後拍照",
                "icon": "fa-fire",
                "details": "<div class=\"detail-copy\"><p>火舞 19:30～20:00，拍照 20:00～20:30；實際場次依憑證及當日通知。</p></div><div class=\"trip-links\"><a class=\"trip-link\" href=\"https://www.klook.com/zh-TW/activity/186411-dam-beach-fireshow-pattaya/\" target=\"_blank\" rel=\"noopener noreferrer\" aria-label=\"Klook 演出資訊（另開分頁）\">Klook 演出資訊<span aria-hidden=\"true\">↗</span></a></div>",
                "summary": "19:30 開演，20:00～20:30 拍照。",
                "notice": "演出可能受天候或潮汐影響，出發前查看通知。",
                "kind": "activity",
                "disclosureLabel": "",
                "photo": {
                    "file": "images/dam-option-4.jpg",
                    "caption": "DAM・火焰在海風裡劃過",
                    "alt": "DAM Pattaya 火舞表演者揮動火焰的近景",
                    "scene": "night"
                }
            },
            {
                "time": "20:30 後",
                "title": "Soi 6・六巷小酌",
                "summary": "火舞與拍照結束後叫車前往六巷，依體力決定停留時間。",
                "icon": "fa-moon",
                "details": "<div class=\"detail-copy\"><p>從 DAM Pattaya 叫車前往海灘路 Soi 6；20:30 為離開 DAM 的預計時間，抵達依叫車與路況調整。找間酒吧喝一杯、聊天或玩桌遊，結束後返回民宿。</p><p>交通、飲品與互動飲料另計，點單前確認菜單價格。</p></div>",
                "notice": "",
                "kind": "night",
                "disclosureLabel": ""
            }
        ],
        "intro": "落地後先到春武里 LOF LAND 拍照，再入住海灘路，晚上看火舞、去六巷小酌。",
        "route": [
            {
                "name": "BKK 蘇凡納布機場",
                "lat": 13.69,
                "lon": 100.75,
                "note": "航廈區域示意。",
                "approx": true,
                "googleQuery": "Suvarnabhumi Airport Thailand"
            },
            {
                "name": "LOF LAND",
                "lat": 13.3187621,
                "lon": 100.9798617,
                "note": "依你提供的 Google Maps 定位。",
                "approx": false,
                "googleQuery": "LOF LAND Chonburi Thailand"
            },
            {
                "name": "海灘路住宿區",
                "lat": 12.936,
                "lon": 100.883,
                "note": "民宿確切地址待提供，先標海灘路區域。",
                "approx": true,
                "googleQuery": "Pattaya Beach Road Thailand"
            },
            {
                "name": "DAM Pattaya",
                "lat": 12.99,
                "lon": 100.912,
                "note": "以 Google Maps 的 DAM Pattaya 店家搜尋結果及訂位資訊確認入口。",
                "approx": true,
                "googleQuery": "DAM Pattaya Na Kluea Chon Buri Thailand"
            },
            {
                "name": "Soi 6 六巷",
                "lat": 12.943,
                "lon": 100.885,
                "note": "街區位置示意。",
                "approx": true,
                "googleQuery": "Soi 6 Pattaya Thailand"
            }
        ],
        "photoCaption": "DAM Pattaya・海濱火舞"
    },
    "day2": {
        "title": "綠山動物園・午後拍照與夜生活",
        "themeImage": "images/khao-kheow-zoo.jpg",
        "highlights": [
            {
                "icon": "fa-paw",
                "text": "綠山動物園"
            },
            {
                "icon": "fa-camera",
                "text": "House of Benedict"
            },
            {
                "icon": "fa-ticket",
                "text": "69 Pattaya Show"
            },
            {
                "icon": "fa-moon",
                "text": "Soi 6 六巷"
            }
        ],
        "locations": {
            "綠山動物園": {
                "lat": 13.215,
                "lon": 101.056
            }
        },
        "items": [
            {
                "time": "07:30–08:30",
                "title": "海灘路 → 綠山動物園",
                "summary": "預留約 1 小時車程，提前安排回程接送。",
                "details": "<div class=\"detail-copy\"><p>車程按 45～60 分鐘規劃，依海灘路實際上車點與路況調整。建議包車等候或約定 13:30 接回，今日車資另詢價。</p></div>",
                "icon": "fa-car",
                "notice": "",
                "kind": "transport",
                "disclosureLabel": "",
                "chapter": {
                    "label": "上午",
                    "time": "07:30–11:30",
                    "title": "動物園，先走想看的重點"
                }
            },
            {
                "time": "08:30–08:45",
                "title": "換票・租四人球車",
                "summary": "先換票，再確認租金、超時費與擔保方式。",
                "details": "<div class=\"detail-copy\"><p>選非泰國居民門票；換票地點依憑證。球車依你提供的參考價：前 2 小時 <mark class=\"cost-tag\">500 THB</mark>＋保險 <mark class=\"cost-tag\">50 THB</mark>／車，四人基本均攤 <mark class=\"cost-tag\">137.5 THB</mark>／人。</p><p>08:45 租至 13:30 共 4 小時 45 分鐘，超出基本方案 2 小時 45 分鐘；超時費另計。護照、押金或其他擔保方式與可租數量須現場確認，早到不保證有車。</p></div><div class=\"trip-links\"><a class=\"trip-link\" href=\"https://www.klook.com/en-US/activity/338-khao-kheow-open-zoo-pattaya/\" target=\"_blank\" rel=\"noopener noreferrer\" aria-label=\"動物園門票（另開分頁）\">動物園門票<span aria-hidden=\"true\">↗</span></a><a class=\"trip-link\" href=\"https://khaokheowzoothailand.org/site/khaokheow.zoothailand.org/en/index.html\" target=\"_blank\" rel=\"noopener noreferrer\" aria-label=\"園方資訊（另開分頁）\">園方資訊<span aria-hidden=\"true\">↗</span></a></div>",
                "icon": "fa-ticket",
                "notice": "球車共使用約 4 小時 45 分鐘，超時費另計；租金與擔保方式現場確認。",
                "kind": "activity",
                "disclosureLabel": "門票與球車租借"
            },
            {
                "time": "08:45–09:40",
                "title": "Moo Deng・草食動物區",
                "summary": "先看侏儒河馬，再依園區動線看水豚、坡鹿與長頸鹿。",
                "details": "<div class=\"detail-copy\"><p>以當日園區地圖及開放展區為準，不依未核實的分區顏色趕路。動物是否露面、餵食是否開放，依現場安排；草料費另計。</p></div>",
                "icon": "fa-paw",
                "notice": "",
                "kind": "activity",
                "disclosureLabel": "",
                "photo": {
                    "file": "images/moo-deng.jpg",
                    "caption": "Moo Deng・侏儒河馬",
                    "alt": "綠山動物園侏儒河馬 Moo Deng 的幼年近照",
                    "scene": "day"
                }
            },
            {
                "time": "09:40–10:20",
                "title": "企鵝館・10:00 散步",
                "summary": "提前找位置，保留移動與等候時間。",
                "details": "<div class=\"detail-copy\"><p>園方目前列首場 10:00；當日可能調整。餵食與合照須依現場開放，費用另計。</p></div><div class=\"trip-links\"><a class=\"trip-link\" href=\"https://khaokheowzoothailand.org/site/khaokheow.zoothailand.org/en/index.html\" target=\"_blank\" rel=\"noopener noreferrer\" aria-label=\"查看當日場次（另開分頁）\">查看當日場次<span aria-hidden=\"true\">↗</span></a></div>",
                "icon": "fa-paw",
                "notice": "企鵝 10:00、大象 11:00 為目前參考場次；入園後確認當日時刻。",
                "kind": "activity",
                "disclosureLabel": "",
                "photo": {
                    "file": "images/khao-kheow-penguin-parade.jpg",
                    "caption": "綠山動物園・企鵝遊行",
                    "alt": "綠山動物園企鵝沿步道排隊走向遊客",
                    "scene": "day"
                }
            },
            {
                "time": "10:20–11:30",
                "title": "移動・11:00 大象場次",
                "summary": "看完企鵝直接前往大象區，不插入遠端展區。",
                "details": "<div class=\"detail-copy\"><p>依目前園方時刻安排 11:00；4/11 為週日，入園後再次確認場次。</p></div><div class=\"trip-links\"><a class=\"trip-link\" href=\"https://khaokheowzoothailand.org/site/khaokheow.zoothailand.org/en/index.html\" target=\"_blank\" rel=\"noopener noreferrer\" aria-label=\"園方表演時刻（另開分頁）\">園方表演時刻<span aria-hidden=\"true\">↗</span></a></div>",
                "icon": "fa-water",
                "notice": "",
                "kind": "activity",
                "disclosureLabel": "",
                "photo": {
                    "file": "images/khao-kheow-elephant.jpg",
                    "caption": "綠山動物園・大象游泳",
                    "alt": "綠山動物園大象在水中游泳的水下視角",
                    "scene": "day"
                }
            },
            {
                "time": "11:30–12:15",
                "title": "Food Center 午餐",
                "summary": "補水、用餐，避開中午最熱的一段。",
                "details": "<div class=\"detail-copy\"><p>午餐與飲料自理，安排約 45 分鐘。</p></div>",
                "icon": "fa-utensils",
                "notice": "",
                "kind": "dining",
                "disclosureLabel": "",
                "chapter": {
                    "label": "午間",
                    "time": "11:30–13:30",
                    "title": "午餐、補看與還車"
                }
            },
            {
                "time": "12:15–13:00",
                "title": "猛獸區・鳥園補看",
                "summary": "依距離擇近參觀，不為餵食繞遠路。",
                "details": "<div class=\"detail-copy\"><p>白獅、白虎與鳥園以當日開放為準；餵食種類、場次與價格不先視為保證項目。</p></div>",
                "icon": "fa-paw",
                "notice": "",
                "kind": "activity",
                "disclosureLabel": ""
            },
            {
                "time": "13:00–13:30",
                "title": "回租借站・還車",
                "summary": "結清超時費，取回擔保物。",
                "details": "<div class=\"detail-copy\"><p>保留回程與驗車時間；確認證件或押金已取回，再前往接送點。</p></div>",
                "icon": "fa-car",
                "notice": "",
                "kind": "transport",
                "disclosureLabel": ""
            },
            {
                "time": "13:30–15:00",
                "title": "動物園 → House of Benedict",
                "summary": "直接南下，交通預留約 1～1.5 小時。",
                "details": "<div class=\"detail-copy\"><p>此為排程緩衝，非即時導航；若塞車，縮短拍照時段，不壓縮晚餐與接送。</p></div>",
                "icon": "fa-car",
                "notice": "",
                "kind": "transport",
                "disclosureLabel": "",
                "chapter": {
                    "label": "午後",
                    "time": "13:30–18:15",
                    "title": "拍照，再回海灘路休息"
                }
            },
            {
                "time": "15:00–16:30",
                "title": "House of Benedict",
                "summary": "主題造景拍照、下午茶，停留約 90 分鐘。",
                "details": "<div class=\"detail-copy\"><p>售票頁目前列外國成人 <mark class=\"cost-tag\">200 THB</mark>／人，四人 <mark class=\"cost-tag\">800 THB</mark>；餐飲另計。選 Non-Thai Adult，2027/4/11 可訂日期與實付價格依結帳頁。</p></div><div class=\"trip-links\"><a class=\"trip-link\" href=\"https://chillpainai.com/public/en/products/11257\" target=\"_blank\" rel=\"noopener noreferrer\" aria-label=\"House of Benedict 訂票（另開分頁）\">House of Benedict 訂票<span aria-hidden=\"true\">↗</span></a></div>",
                "icon": "fa-camera",
                "notice": "",
                "kind": "activity",
                "disclosureLabel": "",
                "photo": {
                    "file": "images/house-of-benedict.jpg",
                    "caption": "House of Benedict・午後拍照",
                    "alt": "House of Benedict 店內主題造景",
                    "scene": "day"
                }
            },
            {
                "time": "16:30–18:15",
                "title": "返回海灘路・休息與晚餐",
                "summary": "回民宿整理後就近用餐，Terminal 21 視體力再去。",
                "details": "<div class=\"detail-copy\"><p>回程先留 30～45 分鐘，再休息、吃飯。避免為了逛街錯過 69 Pattaya Show接送。</p></div>",
                "icon": "fa-utensils",
                "notice": "",
                "kind": "dining",
                "disclosureLabel": ""
            },
            {
                "time": "18:15–19:00",
                "title": "前往 69 Pattaya Show",
                "summary": "接送或叫車時間依方案確認。",
                "details": "<div class=\"detail-copy\"><p>若方案含飯店接送，依憑證集合，不把接車時間當成開演時間。</p></div>",
                "icon": "fa-car",
                "notice": "",
                "kind": "transport",
                "disclosureLabel": "",
                "chapter": {
                    "label": "晚間",
                    "time": "18:15–23:00",
                    "title": "看秀與六巷小酌"
                }
            },
            {
                "time": "19:00–20:15",
                "title": "69 Pattaya Show",
                "summary": "門票每人 700 THB，四人共 2,800 THB；保留演出與進出場時間。",
                "details": "<div class=\"detail-copy\"><p><strong>門票 <mark class=\"cost-tag\">700 THB</mark>／人，四人共 <mark class=\"cost-tag\">2,800 THB</mark>。</strong>依你提供的價格記錄；接送是否包含另行確認。</p><p>地點改為 69 Pattaya Show，請使用下方地圖前往。19:00–20:15 為行程預留時間，實際開演與報到時間依訂票資訊確認。</p><p>入場年齡、證件與攝影器材規定依場館要求。</p></div><div class=\"trip-links\"><a class=\"trip-link\" href=\"https://maps.app.goo.gl/g1RaXNKuRreucqLz7\" target=\"_blank\" rel=\"noopener noreferrer\">69 Pattaya Show 地圖<span aria-hidden=\"true\">↗</span></a></div>",
                "icon": "fa-ticket",
                "notice": "票價依你提供的 700 THB／人記錄；確認場次、報到時間與接送安排。",
                "kind": "activity",
                "disclosureLabel": "四人票價與場館位置"
            },
            {
                "time": "20:15–20:45",
                "title": "69 Pattaya Show → 六巷",
                "summary": "預留叫車與移動時間，依演出結束時間順延。",
                "details": "<div class=\"detail-copy\"><p>以叫車或已約定的接送為主；不先假設有固定 <mark class=\"cost-tag\">10 THB</mark> 雙條車直達。</p></div>",
                "icon": "fa-car",
                "notice": "",
                "kind": "transport",
                "disclosureLabel": ""
            },
            {
                "time": "20:45–23:00",
                "title": "Soi 6 酒吧街",
                "summary": "找間喜歡的酒吧小酌、聊天與玩桌遊。",
                "details": "<div class=\"detail-copy\"><p>飲品、互動飲料與交通另計，點單前看菜單。店家營業時間各異，結束後返回海灘路民宿。</p></div>",
                "icon": "fa-moon",
                "notice": "",
                "kind": "night",
                "disclosureLabel": ""
            }
        ],
        "intro": "提早出發看動物，午後留給拍照，晚餐後再接成人秀與夜生活。",
        "route": [
            {
                "name": "海灘路住宿區",
                "lat": 12.936,
                "lon": 100.883,
                "note": "民宿確切地址待提供，先標海灘路區域。",
                "approx": true,
                "googleQuery": "Pattaya Beach Road Thailand"
            },
            {
                "name": "綠山動物園",
                "lat": 13.2134628,
                "lon": 101.0611659,
                "note": "",
                "approx": false,
                "googleQuery": "Khao Kheow Open Zoo Thailand"
            },
            {
                "name": "House of Benedict",
                "lat": 12.8606473,
                "lon": 100.904986,
                "note": "",
                "approx": false,
                "googleQuery": "House of Benedict Pattaya"
            },
            {
                "name": "69 Pattaya Show",
                "lat": 12.9537425,
                "lon": 100.8918577,
                "note": "依提供的 Google 地圖連結定位。",
                "approx": false,
                "googleQuery": "69 Pattaya Show Pattaya Thailand"
            },
            {
                "name": "Soi 6 六巷",
                "lat": 12.943,
                "lon": 100.885,
                "note": "街區位置示意。",
                "approx": true,
                "googleQuery": "Soi 6 Pattaya Thailand"
            }
        ],
        "photoCaption": "綠山動物園"
    },
    "day3": {
        "title": "高空跳傘・海鮮吃到飽與高空夜景",
        "themeImage": "images/sky-wide-exit.webp",
        "highlights": [
            {
                "icon": "fa-plane",
                "text": "高空跳傘"
            },
            {
                "icon": "fa-shopping-bag",
                "text": "Royal Garden Plaza"
            },
            {
                "icon": "fa-binoculars",
                "text": "觀景台白天全景"
            },
            {
                "icon": "fa-utensils",
                "text": "Seafood Station 海鮮吃到飽"
            },
            {
                "icon": "fa-moon",
                "text": "ZAMĀ Skybar"
            }
        ],
        "locations": {
            "Royal Garden Plaza": {
                "lat": 12.927,
                "lon": 100.879
            },
            "Seafood Station Pattaya": {
                "lat": 12.9422872,
                "lon": 100.9096122
            }
        },
        "items": [
            {
                "time": "07:00–12:00",
                "title": "Thai Sky Adventures 雙人跳傘",
                "summary": "預約上午第一批；接送、講習與候跳共抓半天。",
                "details": "<div class=\"detail-copy\"><p>07:00 為希望安排的接送時間，須由業者確認。高度、攝影與飯店接送是否包含，以所選方案為準。官網目前基本方案參考 <mark class=\"cost-tag\">9,700 THB</mark>／人；若四人皆跳約 <mark class=\"cost-tag\">38,800 THB</mark>，2027 價格及附加費依結帳。</p><p>風況可能延誤，12:00 不保證返回市區。</p></div><div class=\"trip-links\"><a class=\"trip-link\" href=\"https://thaiskyadventures.com/begin-your-booking/\" target=\"_blank\" rel=\"noopener noreferrer\" aria-label=\"跳傘官網預訂（另開分頁）\">跳傘官網預訂<span aria-hidden=\"true\">↗</span></a></div>",
                "icon": "fa-plane",
                "notice": "預約上午接送；天候與候跳可能延誤，午間返回時間不保證。",
                "kind": "activity",
                "disclosureLabel": "跳傘方案與接送",
                "chapter": {
                    "label": "上午",
                    "time": "07:00–12:00",
                    "title": "把早晨留給高空"
                },
                "photo": {
                    "file": "images/sky-wide-tandem.webp",
                    "caption": "高空跳傘・自由落體",
                    "alt": "Thai Sky Adventures 雙人跳傘與地面遠景",
                    "scene": "day"
                }
            },
            {
                "time": "12:00–13:00",
                "title": "返回市區・午餐",
                "summary": "依實際回程時間，在海灘路附近用餐。",
                "details": "<div class=\"detail-copy\"><p>先確認接送下車點。若跳傘延後，優先縮短百貨時間。</p></div>",
                "icon": "fa-utensils",
                "notice": "",
                "kind": "dining",
                "disclosureLabel": "",
                "chapter": {
                    "label": "午後",
                    "time": "12:00–16:00",
                    "title": "回到市區，吃飯逛街"
                }
            },
            {
                "time": "13:00–14:30",
                "title": "Royal Garden Plaza",
                "summary": "午餐後逛街，再接帕塔納克山觀景台；Ripley’s 視時間選一項。",
                "details": "<div class=\"detail-copy\"><p>位於海灘路，逛街本身不需門票；Ripley’s 展館與遊樂設施另購。約 14:30 結束，接著前往帕塔納克山觀景台。</p><p>若上午跳傘延後，先縮短逛街時間；仍來不及就略過白天觀景台，保留 17:00 海鮮晚餐。</p></div>",
                "icon": "fa-shopping-bag",
                "notice": "跳傘若延後，縮短逛街；觀景台依剩餘時間調整。",
                "kind": "activity",
                "disclosureLabel": ""
            },
            {
                "time": "14:30–15:30（含移動）",
                "title": "帕塔納克山觀景台・白天海灣全景",
                "summary": "從 Royal Garden Plaza 叫車上山，停留約 20～30 分鐘，拍彎月海灣與港口。",
                "details": "<div class=\"detail-copy\"><p>從 Royal Garden Plaza 前往 <strong>Phra Tamnak Mountain Viewpoint</strong>，這一小時含上山、看景及下山；實際停留約 20～30 分鐘，依交通調整。白天可看清芭達雅海灣曲線、船隻與海岸城市。</p><p>約 15:30 下山後直接前往 Seafood Station，17:00 晚餐維持。若跳傘候跳延誤、下雨或太累，這站可以略過；4/13 晚餐後仍保留觀景台夜景。</p><p>此站為山頂觀景台，與山下 Pattaya City 字樣拍照點分開。交通費另計，請先安排下山接送。</p></div><div class=\"trip-links\"><a class=\"trip-link\" href=\"https://www.google.com/maps/search/?api=1&amp;query=Phra+Tamnak+Mountain+Viewpoint+Pattaya\" target=\"_blank\" rel=\"noopener noreferrer\">帕塔納克山觀景台地圖<span aria-hidden=\"true\">↗</span></a><a class=\"trip-link\" href=\"https://smartdastaapp.dasta.or.th/place/36?lang=en\" target=\"_blank\" rel=\"noopener noreferrer\">觀景台官方旅遊資訊<span aria-hidden=\"true\">↗</span></a></div>",
                "icon": "fa-binoculars",
                "kind": "activity",
                "notice": "時段含上下山交通；跳傘延誤或天候不佳就略過，晚餐時間維持。",
                "disclosureLabel": "觀景位置與交通",
                "photo": {
                    "file": "images/phra-tamnak-viewpoint-day.jpg",
                    "caption": "帕塔納克山觀景台・白天海灣全景",
                    "alt": "從帕塔納克山觀景台俯瞰芭達雅彎月形海灣、港口及沿岸城市",
                    "scene": "day"
                }
            },
            {
                "time": "15:30–17:00（估）",
                "title": "前往 Seafood Station Pattaya",
                "summary": "觀景台下山後前往 Seafood Station，預留交通與候位時間。",
                "details": "<div class=\"detail-copy\"><p>約 15:30 從觀景台下山前往 Seafood Station，以 17:00 晚餐為目標，這段含叫車、交通與候位緩衝。若略過觀景台，則從 Royal Garden Plaza 出發；車資另計。</p></div><div class=\"trip-links\"><a class=\"trip-link\" href=\"https://maps.app.goo.gl/CcbW2fsZm1MdvMN9A\" target=\"_blank\" rel=\"noopener noreferrer\">Seafood Station 地圖<span aria-hidden=\"true\">↗</span></a></div>",
                "icon": "fa-car",
                "notice": "出發前確認營業時間及四人座位。",
                "kind": "transport",
                "disclosureLabel": "",
                "chapter": {
                    "label": "傍晚",
                    "time": "15:30–18:30",
                    "title": "海鮮燒烤，慢慢吃晚餐"
                }
            },
            {
                "time": "17:00–18:30",
                "title": "Seafood Station Pattaya・海鮮吃到飽",
                "summary": "流水蝦、螃蟹與貝類自助燒烤；參考預算每人 499 THB，四人 1,996 THB。",
                "details": "<div class=\"detail-copy\"><p>自助海鮮燒烤，主打流水蝦，另有蟹、貝類、熟食與甜點。</p><p><strong>參考價 <mark class=\"cost-tag\">499 THB</mark>／人，四人 <mark class=\"cost-tag\">1,996 THB</mark>；食記記載用餐 90 分鐘。</strong>食記另列加 <mark class=\"cost-tag\">100 THB</mark>／人可選啤酒喝到飽；若四人皆加購，合計 <mark class=\"cost-tag\">2,396 THB</mark>。</p><p>常見營業資訊為每日 16:00–22:00。一般飲料、稅費及其他附加費是否包含，尚未取得店家最新確認。</p><p class=\"small-note\">2026/11/6 查詢：混血珊莎 2025/3/20 食記列 499 THB／90 分鐘；Ryoii 另列 399 THB／不限時，資料有落差。此處先以 499 THB 編列參考預算，2027/4/12 的價格、用餐時限與加購規則須向店家確認。</p></div><div class=\"trip-links\"><a class=\"trip-link\" href=\"https://maps.app.goo.gl/CcbW2fsZm1MdvMN9A\" target=\"_blank\" rel=\"noopener noreferrer\">Seafood Station 地圖<span aria-hidden=\"true\">↗</span></a><a class=\"trip-link\" href=\"https://sansalife.tw/pattaya-buffet/\" target=\"_blank\" rel=\"noopener noreferrer\">499 THB 食記與收費說明<span aria-hidden=\"true\">↗</span></a><a class=\"trip-link\" href=\"https://www.ryoiireview.com/restaurant/view/20814\" target=\"_blank\" rel=\"noopener noreferrer\">Ryoii 價格資料<span aria-hidden=\"true\">↗</span></a><a class=\"trip-link\" href=\"https://www.facebook.com/seafoodstationatpattaya\" target=\"_blank\" rel=\"noopener noreferrer\">餐廳 Facebook・確認價格<span aria-hidden=\"true\">↗</span></a></div>",
                "icon": "fa-utensils",
                "notice": "參考預算，非店家最新報價；出發前確認價格、90 分鐘限制與飲料收費。",
                "kind": "dining",
                "disclosureLabel": "菜色、四人預算與價格來源",
                "photo": {
                    "file": "images/seafood-station.jpg",
                    "caption": "Seafood Station・自助海鮮檯",
                    "alt": "Seafood Station Pattaya 招牌與冰鎮海鮮自助檯",
                    "scene": "day"
                }
            },
            {
                "time": "18:30–20:30（彈性）",
                "title": "餐後休息・前往中天",
                "summary": "飯後可先回住宿休息，再叫車至 D Varee 飯店。",
                "details": "<div class=\"detail-copy\"><p>保留飯後休息、叫車與跨區移動時間，目標 20:30 抵達 D Varee Jomtien Beach 飯店。實際出發時間依路況與訂位調整；交通費另計。</p></div>",
                "icon": "fa-car",
                "notice": "若候位或晚餐延後，可省略返宿休息，直接前往酒吧。",
                "kind": "transport",
                "disclosureLabel": "",
                "chapter": {
                    "label": "晚間",
                    "time": "18:30–01:00",
                    "title": "吃飽休息，再去看高空夜景"
                }
            },
            {
                "time": "20:30–21:45",
                "title": "ZAMĀ Skybar・38 樓",
                "summary": "中天海岸夜景與調酒；調酒參考 380–480 THB，另加服務費與 VAT。",
                "details": "<div class=\"detail-copy\"><p>位於 D Varee Jomtien Beach 飯店 38 樓，建議預約四人桌。</p><p><strong>單點參考價：</strong>調酒約 <mark class=\"cost-tag\">380–480 THB</mark>／杯；Singha 啤酒約 <mark class=\"cost-tag\">300 THB</mark>／瓶，Asahi／Corona 約 <mark class=\"cost-tag\">350 THB</mark>／瓶；肋眼牛排約 <mark class=\"cost-tag\">1,250 THB</mark>／份。價格例子來源為 Ultimate Pattaya 的餐廳指南。</p><p><strong>官網菜單註明另加 10% 服務費及 7% VAT（++）。</strong>若依先加服務費再計 VAT 估算，一杯 380–480 THB 調酒實付約 <mark class=\"cost-tag\">447–565 THB</mark>；四人各一杯約 <mark class=\"cost-tag\">1,790–2,260 THB</mark>，餐點另計。此為試算，結帳以店家為準。</p><p>官網提供餐點菜單、飲品菜單與葡萄酒單，可點下方連結查看。一般訂位的低消、訂金及特殊座位條件請於預約時確認。</p><p class=\"small-note\">查詢日期 2026/11/6；以上為現有參考價格，2027/4/12 仍以當日菜單及訂位條件為準。</p></div><div class=\"trip-links\"><a class=\"trip-link\" href=\"https://zama.asia/menu.html\" target=\"_blank\" rel=\"noopener noreferrer\">官方完整菜單・餐點／飲品／酒單<span aria-hidden=\"true\">↗</span></a><a class=\"trip-link\" href=\"https://drive.google.com/file/d/1jzMU3uEEQ4vQHHWBI0HLPc89-zteP4vh/view\" target=\"_blank\" rel=\"noopener noreferrer\">官方飲品菜單 PDF<span aria-hidden=\"true\">↗</span></a><a class=\"trip-link\" href=\"https://drive.google.com/file/d/1RD_69JRMsGeykialGNYAVef3qd8oU68V/view\" target=\"_blank\" rel=\"noopener noreferrer\">官方餐點菜單 PDF<span aria-hidden=\"true\">↗</span></a><a class=\"trip-link\" href=\"https://ultimatepattaya.com/venue/zama-skybar-pattaya/\" target=\"_blank\" rel=\"noopener noreferrer\">參考價格來源<span aria-hidden=\"true\">↗</span></a><a class=\"trip-link\" href=\"https://zama.asia/\" target=\"_blank\" rel=\"noopener noreferrer\">ZAMĀ 官網訂位<span aria-hidden=\"true\">↗</span></a></div>",
                "icon": "fa-moon",
                "notice": "菜單價格另加 10% 服務費與 7% VAT；訂位時確認低消及座位條件。",
                "kind": "night",
                "disclosureLabel": "飲品價格、稅費與官方菜單",
                "photo": {
                    "file": "images/zama-skybar.webp",
                    "caption": "ZAMĀ Skybar・高空露台",
                    "alt": "ZAMĀ Skybar 露台座席、雕塑與海景",
                    "scene": "night"
                }
            },
            {
                "time": "21:45–22:30",
                "title": "中天 → Soi 6",
                "summary": "預留叫車與跨區移動時間。",
                "details": "<div class=\"detail-copy\"><p>這段以叫車規劃，約 30～45 分鐘作排程緩衝，非固定導航車程。</p></div>",
                "icon": "fa-car",
                "notice": "",
                "kind": "transport",
                "disclosureLabel": ""
            },
            {
                "time": "22:30–01:00（彈性）",
                "title": "六巷續攤・依營業情況",
                "summary": "看店家與體力決定停留時間，隨時可回民宿。",
                "details": "<div class=\"detail-copy\"><p>01:00 為最晚預留時間，不保證每家店營業至此；若六巷已收店就直接返宿。飲品含互動飲料先看菜單，不固定以 <mark class=\"cost-tag\">200 THB</mark> 計。</p></div>",
                "icon": "fa-moon",
                "notice": "",
                "kind": "night",
                "disclosureLabel": ""
            }
        ],
        "intro": "上午挑戰跳傘，午後逛街、上帕塔納克山看海灣，傍晚吃海鮮燒烤，再到高空酒吧看夜景。",
        "route": [
            {
                "name": "海灘路住宿區",
                "lat": 12.936,
                "lon": 100.883,
                "note": "民宿確切地址待提供，先標海灘路區域。",
                "approx": true,
                "googleQuery": "Pattaya Beach Road Thailand"
            },
            {
                "name": "Thai Sky Adventures",
                "lat": 13.1424231,
                "lon": 101.0485811,
                "note": "依業者官網的地圖連結定位。",
                "approx": false,
                "googleQuery": "Thai Sky Adventures Thailand"
            },
            {
                "name": "Royal Garden Plaza",
                "lat": 12.9293076,
                "lon": 100.8780487,
                "note": "",
                "approx": false,
                "googleQuery": "Royal Garden Plaza Pattaya"
            },
            {
                "name": "帕塔納克山觀景台・白天",
                "lat": 12.924,
                "lon": 100.867,
                "note": "14:30～15:30 含上下山交通，停留約 20～30 分鐘；跳傘延誤可略過。山頂位置示意，以搜尋結果確認入口。",
                "approx": true,
                "googleQuery": "Phra Tamnak Mountain Viewpoint Pattaya Thailand"
            },
            {
                "name": "Seafood Station Pattaya",
                "lat": 12.9422872,
                "lon": 100.9096122,
                "note": "依提供的 Google 地圖連結定位；餐後可先回住宿休息。",
                "approx": false,
                "googleQuery": "Seafood Station Pattaya"
            },
            {
                "name": "ZAMĀ Skybar・D Varee 飯店",
                "lat": 12.885,
                "lon": 100.883,
                "note": "38 樓；導航至 D Varee Jomtien Beach 飯店入口，再上樓。",
                "approx": true,
                "googleQuery": "ZAMA Skybar D Varee Jomtien Beach Pattaya"
            },
            {
                "name": "Soi 6 六巷",
                "lat": 12.943,
                "lon": 100.885,
                "note": "街區位置示意。",
                "approx": true,
                "googleQuery": "Soi 6 Pattaya Thailand"
            }
        ],
        "photoCaption": "Thai Sky Adventures・高空跳傘"
    },
    "day4": {
        "title": "潑水節・真理寺・日落與山頂夜景",
        "themeImage": "images/songkran-water-splash.jpg",
        "highlights": [
            {
                "icon": "fa-faucet-drip",
                "text": "海灘路潑水節"
            },
            {
                "icon": "fa-gopuram",
                "text": "真理寺"
            },
            {
                "icon": "fa-utensils",
                "text": "The Sky Gallery"
            },
            {
                "icon": "fa-binoculars",
                "text": "帕塔納克山夜景"
            }
        ],
        "locations": {
            "海灘路（活動區域示意）": {
                "lat": 12.93,
                "lon": 100.885
            },
            "真理寺": {
                "lat": 12.972,
                "lon": 100.889
            }
        },
        "items": [
            {
                "time": "09:30–13:00",
                "title": "海灘路・潑水節水戰",
                "summary": "在住宿附近參與玩水，午前後留意回房時間。",
                "details": "<div class=\"detail-copy\"><p>穿速乾衣、帶防水袋與護目鏡，證件等重要物品留在住宿處。4/13 為宋干節期間，活動範圍與熱鬧程度依當日安排；2027 年地方活動時刻待公告。</p></div>",
                "icon": "fa-faucet-drip",
                "notice": "2027 年地方活動細節待公告，玩水範圍以當日安排為準。",
                "kind": "activity",
                "disclosureLabel": "",
                "photo": {
                    "file": "images/songkran-water-splash.jpg",
                    "caption": "宋干節・海灘路玩水",
                    "alt": "潑水節水花與水槍，節慶氣氛參考",
                    "scene": "day"
                }
            },
            {
                "time": "13:00–14:00",
                "title": "回民宿・盥洗與午餐",
                "summary": "洗澡、換乾衣，再簡單用餐。",
                "details": "<div class=\"detail-copy\"><p>下午參觀真理寺，準備遮肩、過膝的乾爽衣褲。餐點以民宿周邊或外帶為主，避免等餐耽誤出發。</p></div>",
                "icon": "fa-house",
                "notice": "",
                "kind": "activity",
                "disclosureLabel": ""
            },
            {
                "time": "14:00–14:30",
                "title": "海灘路 → 真理寺",
                "summary": "預留約 30 分鐘叫車與交通，依路況調整。",
                "details": "<div class=\"detail-copy\"><p>潑水節期間預約接送較好掌握時間；若塞車，參觀與晚餐同步順延，不壓縮換票及入場流程。</p></div>",
                "icon": "fa-car",
                "notice": "",
                "kind": "transport",
                "disclosureLabel": ""
            },
            {
                "time": "14:30–16:30",
                "title": "真理寺・木雕工藝參觀",
                "summary": "安排約 2 小時欣賞海濱木構建築與雕刻。",
                "details": "<div class=\"detail-copy\"><p>先換票並依現場安排入場；穿著遮肩、過膝服飾，安全帽等要求依工作人員指示。門票選日間票，參觀與導覽時間以當日安排為準。</p></div><div class=\"trip-links\"><a class=\"trip-link\" href=\"https://sanctuaryoftruthmuseum.com/visit-us/\" target=\"_blank\" rel=\"noopener noreferrer\" aria-label=\"真理寺參觀資訊・官網購票入口（另開分頁）\">真理寺參觀資訊・官網購票入口<span aria-hidden=\"true\">↗</span></a></div>",
                "icon": "fa-gopuram",
                "notice": "遮肩、過膝、乾爽服裝；安全帽與入場規定依現場指示。",
                "kind": "activity",
                "disclosureLabel": "",
                "photo": {
                    "file": "images/真理寺.jpg",
                    "caption": "真理寺・近看木雕屋簷",
                    "alt": "真理寺的木雕屋簷與建築",
                    "scene": "day"
                }
            },
            {
                "time": "16:30–17:15",
                "title": "真理寺 → The Sky Gallery",
                "summary": "跨市區移動先留 45 分鐘，爭取日落前入座。",
                "details": "<div class=\"detail-copy\"><p>目的地位於帕山、Cosy Beach 附近。此為排程緩衝，非即時導航時間；節日塞車可能延後抵達。</p></div>",
                "icon": "fa-car",
                "notice": "",
                "kind": "transport",
                "disclosureLabel": ""
            },
            {
                "time": "17:15–19:30",
                "title": "The Sky Gallery・日落晚餐",
                "summary": "海景日落晚餐；單點參考：凱薩沙拉 175 THB、Club Sandwich 305 THB、炸鱸魚 555 THB。",
                "details": "<div class=\"detail-copy\"><p>以海景及日落用餐為主，景觀席與鳥巢造型座位需向餐廳確認，不保證分配。</p><p><strong>Wongnai 菜單所列單點參考價：</strong>凱薩沙拉 <mark class=\"cost-tag\">175 THB</mark>／份；Club Sandwich <mark class=\"cost-tag\">305 THB</mark>／份；炸鱸魚佐魚露、芒果沙拉 <mark class=\"cost-tag\">555 THB</mark>／份。價格按菜色計算，並非固定人均或套餐價。</p><p>菜單包含泰式料理、海鮮、披薩、義大利麵、甜點及飲品；下方 Wongnai 連結可看菜色、標價與菜單照片。未找到可核實的官方完整價目菜單，先附第三方版本供挑選餐點。</p><p>目前無法確認上述價格是否已含稅與服務費，低消及景觀席條件也須訂位時確認；四人晚餐依實際點餐加總。</p><p class=\"small-note\">查詢日期 2026/11/6；Wongnai 資料可能較舊，2027/4/13 的價格以餐廳當日菜單為準。</p></div><div class=\"trip-links\"><a class=\"trip-link\" href=\"https://www.wongnai.com/restaurants/theskygallery/menu\" target=\"_blank\" rel=\"noopener noreferrer\">菜單與價格・Wongnai 參考<span aria-hidden=\"true\">↗</span></a><a class=\"trip-link\" href=\"https://sky.theskygroupth.com/sky/customer/index.php?lang=en\" target=\"_blank\" rel=\"noopener noreferrer\">The Sky Gallery 官方訂位<span aria-hidden=\"true\">↗</span></a><a class=\"trip-link\" href=\"https://www.facebook.com/theskygallerypattaya/\" target=\"_blank\" rel=\"noopener noreferrer\">餐廳 Facebook・詢問最新菜單<span aria-hidden=\"true\">↗</span></a></div>",
                "icon": "fa-utensils",
                "notice": "菜單與標價為第三方參考；訂位時確認稅費、低消及景觀席條件。",
                "kind": "dining",
                "disclosureLabel": "單點價格與菜單",
                "photo": {
                    "file": "images/sky-gallery-sunset.jpg",
                    "caption": "The Sky Gallery・海景日落晚餐",
                    "alt": "The Sky Gallery 戶外餐桌與海上日落",
                    "scene": "day"
                }
            },
            {
                "time": "19:30–19:45（估）",
                "title": "The Sky Gallery → 帕塔納克山觀景台",
                "summary": "晚餐後先上山看夜景，再往六巷，不先返回市區。",
                "details": "<div class=\"detail-copy\"><p>餐廳與觀景台同在南芭達雅山丘一帶，晚餐離席前先安排叫車，預留上山、下車與步行時間。15 分鐘是排程估算，潑水節路況若延後，觀景停留與後續行程同步調整。</p></div>",
                "icon": "fa-car",
                "notice": "建議先約好觀景台下山的接送，車資另計。",
                "kind": "transport",
                "disclosureLabel": ""
            },
            {
                "time": "19:45–20:20",
                "title": "帕塔納克山觀景台・芭達雅海灣夜景",
                "summary": "停留約 35 分鐘，欣賞彎月海灣、海灘路燈光與港口夜景。",
                "details": "<div class=\"detail-copy\"><p>前往 <strong>Phra Tamnak Mountain Viewpoint（帕塔納克山山頂觀景台）</strong>，欣賞芭達雅海灣與城市燈光。此站是山頂觀景台，與山下的 Pattaya City 字樣拍照點分開。</p><p>DASTA 官方旅遊資料目前列開放 <strong>07:00–22:00</strong>，此處安排晚餐後的夜景時段；2027/4/13 仍以現場開放及節日管制為準。停留約 30～35 分鐘即可，交通、停車或額外消費另計。</p><p>若晚餐或交通延後，縮短拍照停留；遇雨、視線不佳或臨時封閉，就直接前往六巷。</p></div><div class=\"trip-links\"><a class=\"trip-link\" href=\"https://www.google.com/maps/search/?api=1&amp;query=Phra+Tamnak+Mountain+Viewpoint+Pattaya\" target=\"_blank\" rel=\"noopener noreferrer\">帕塔納克山觀景台地圖<span aria-hidden=\"true\">↗</span></a><a class=\"trip-link\" href=\"https://smartdastaapp.dasta.or.th/place/36?lang=en\" target=\"_blank\" rel=\"noopener noreferrer\">官方旅遊資料・開放時間<span aria-hidden=\"true\">↗</span></a></div>",
                "icon": "fa-binoculars",
                "notice": "出發前確認當天開放；下山接送先安排，夜間留意階梯與路面。",
                "kind": "night",
                "disclosureLabel": "觀景位置與開放時間",
                "chapter": {
                    "label": "晚間",
                    "time": "19:30–23:00",
                    "title": "山頂看夜景，再到六巷小酌"
                }
            },
            {
                "time": "20:20–21:00（估）",
                "title": "帕塔納克山觀景台 → Soi 6 六巷",
                "summary": "預留約 40 分鐘下山、叫車與節日交通緩衝。",
                "details": "<div class=\"detail-copy\"><p>從山頂搭預約車或叫車返回海灘路六巷，不另繞中天。實際抵達時間依下山接送與潑水節路況調整。</p></div>",
                "icon": "fa-car",
                "notice": "",
                "kind": "transport",
                "disclosureLabel": ""
            },
            {
                "time": "21:00–23:00（彈性）",
                "title": "Soi 6・六巷小酌",
                "summary": "看完夜景再喝一杯，依店家營業與體力決定停留時間。",
                "details": "<div class=\"detail-copy\"><p>飲品及回民宿交通另計，點單前先看菜單。若玩水、真理寺與晚餐後已累，可從觀景台直接返宿。Terminal 21／Runway 飛機夜市留在 4/14 的原安排。</p></div>",
                "icon": "fa-moon",
                "notice": "",
                "kind": "night",
                "disclosureLabel": ""
            }
        ],
        "intro": "上午玩水，中午換裝，下午看真理寺，The Sky Gallery 日落晚餐後上山看海灣夜景，再到六巷小酌。",
        "route": [
            {
                "name": "海灘路住宿區",
                "lat": 12.936,
                "lon": 100.883,
                "note": "民宿確切地址待提供，先標海灘路區域。",
                "approx": true,
                "googleQuery": "Pattaya Beach Road Thailand"
            },
            {
                "name": "真理寺",
                "lat": 12.972,
                "lon": 100.889,
                "note": "園區位置示意。",
                "approx": true,
                "googleQuery": "Sanctuary of Truth Pattaya"
            },
            {
                "name": "The Sky Gallery",
                "lat": 12.9215465,
                "lon": 100.8594453,
                "note": "",
                "approx": false,
                "googleQuery": "The Sky Gallery Pattaya"
            },
            {
                "name": "帕塔納克山觀景台",
                "lat": 12.924,
                "lon": 100.867,
                "note": "山頂位置示意；請以 Phra Tamnak Mountain Viewpoint 搜尋結果確認入口，不是山下 Pattaya City 字樣拍照點。",
                "approx": true,
                "googleQuery": "Phra Tamnak Mountain Viewpoint Pattaya Thailand"
            },
            {
                "name": "Soi 6 六巷",
                "lat": 12.943,
                "lon": 100.885,
                "note": "街區位置示意。",
                "approx": true,
                "googleQuery": "Soi 6 Pattaya Thailand"
            }
        ],
        "photoCaption": "宋干節・水花與水槍"
    },
    "day5": {
        "title": "格蘭島全天・SPA・海灘路夜晚",
        "themeImage": "images/koh-larn.jpg",
        "highlights": [
            {
                "icon": "fa-ship",
                "text": "格蘭島"
            },
            {
                "icon": "fa-spa",
                "text": "Let’s Relax SPA"
            },
            {
                "icon": "fa-shopping-bag",
                "text": "Terminal 21／飛機夜市"
            },
            {
                "icon": "fa-moon",
                "text": "Soi 6 六巷"
            }
        ],
        "locations": {
            "Bali Hai 碼頭（依方案確認出發點）": {
                "lat": 12.92,
                "lon": 100.867
            },
            "格蘭島（島嶼位置示意）": {
                "lat": 12.918,
                "lon": 100.78
            },
            "Terminal 21 Pattaya": {
                "lat": 12.935,
                "lon": 100.889
            }
        },
        "items": [
            {
                "time": "08:30–16:30",
                "title": "格蘭島・全天跳島與水上活動",
                "summary": "飯店接送、快艇出海，沙灘放空搭配自選水上體驗。",
                "details": "<div class=\"detail-copy\"><p>08:30 為規劃接送時間；碼頭、午餐、躺椅及返程以所選方案為準。拖曳傘、香蕉船、水上摩托車、浮潛或海底漫步，依套票內容選擇，不預設全部包含。</p><p>目標 16:30 前返抵芭達雅；海況或接送延後時，後續行程順延。四人套票費用待選方案後填入。</p></div><div class=\"trip-links\"><a class=\"trip-link\" href=\"https://www.pattayacoral.com/\" target=\"_blank\" rel=\"noopener noreferrer\" aria-label=\"格蘭島方案與預訂（另開分頁）\">格蘭島方案與預訂<span aria-hidden=\"true\">↗</span></a></div>",
                "icon": "fa-ship",
                "notice": "水上活動、午餐與躺椅依套票內容，不預設全部包含。",
                "kind": "activity",
                "disclosureLabel": "水上活動方案與預訂",
                "photo": {
                    "file": "images/koh-larn.jpg",
                    "caption": "格蘭島・海岸與碧綠海水",
                    "alt": "格蘭島沙灘與碧綠海水",
                    "scene": "day"
                }
            },
            {
                "time": "16:30–18:30",
                "title": "回民宿盥洗・泰式 SPA",
                "summary": "先換乾衣，再安排約 60 分鐘按摩。",
                "details": "<div class=\"detail-copy\"><p>約 16:30～17:15 返回民宿、沖澡與移動；17:15～18:30 留給報到及 60 分鐘療程。此銜接以準時回程、店面靠近住宿為前提；晚到則按摩與晚餐順延。</p><p>優先選海灘路 Soi 12 的 Let’s Relax Beachfront，或民宿附近按摩店。四人同時段、療程與實付金額先確認；兩小時 SPA 需另延後晚餐。</p></div><div class=\"trip-links\"><a class=\"trip-link\" href=\"https://letsrelaxspa.com/branches/pattaya-beachfront/\" target=\"_blank\" rel=\"noopener noreferrer\" aria-label=\"Let’s Relax 海灘路店預約資訊（另開分頁）\">Let’s Relax 海灘路店預約資訊<span aria-hidden=\"true\">↗</span></a></div>",
                "icon": "fa-spa",
                "notice": "以 60 分鐘按摩安排；返程延誤時，按摩與晚餐一併順延。",
                "kind": "activity",
                "disclosureLabel": "按摩療程與預約"
            },
            {
                "time": "18:30–20:30",
                "title": "Terminal 21／Runway 飛機夜市",
                "summary": "晚餐與逛街二選一，移動時間一併計入。",
                "details": "<div class=\"detail-copy\"><p>Terminal 21：看航空主題樓層，在 Pier 21 美食街吃晚餐。想逛露天小吃攤，可改去 Runway Street Food；兩者為不同場所，不硬排全逛。</p><p>先留約 30 分鐘交通；依按摩結束時間調整。餐飲、購物與市區接送另計。</p></div>",
                "icon": "fa-utensils",
                "notice": "",
                "kind": "dining",
                "disclosureLabel": "",
                "photo": {
                    "file": "images/runway-night-market.jpg",
                    "caption": "Runway 飛機夜市・機身下的晚餐",
                    "alt": "Runway 夜市的大型飛機與機身下用餐人潮",
                    "scene": "night"
                }
            },
            {
                "time": "20:30–23:30",
                "title": "Soi 6・六巷小酌",
                "summary": "留出前往六巷的時間，找間酒吧聊天、玩桌遊。",
                "details": "<div class=\"detail-copy\"><p>從百貨或夜市前往六巷，依路線選叫車或雙條車；先確認方向與費用，不以固定 <mark class=\"cost-tag\">10 THB</mark> 當作保證票價。</p><p>飲品與互動飲料先看菜單，依店家營業及體力提早結束。今晚仍住芭達雅，4/15 才安排退房前往曼谷。</p></div>",
                "icon": "fa-moon",
                "notice": "",
                "kind": "night",
                "disclosureLabel": ""
            }
        ],
        "intro": "把白天留給格蘭島，回來洗澡按摩，晚餐與逛街依體力安排。",
        "route": [
            {
                "name": "海灘路住宿區",
                "lat": 12.936,
                "lon": 100.883,
                "note": "民宿確切地址待提供，先標海灘路區域。",
                "approx": true,
                "googleQuery": "Pattaya Beach Road Thailand"
            },
            {
                "name": "Bali Hai 碼頭區",
                "lat": 12.9273,
                "lon": 100.8677,
                "note": "實際出發點依一日團憑證。",
                "approx": true,
                "googleQuery": "Bali Hai Pier Pattaya"
            },
            {
                "name": "格蘭島",
                "lat": 12.918,
                "lon": 100.78,
                "note": "只標島嶼位置，不代表實際停靠沙灘或海上航線。",
                "approx": true,
                "googleQuery": "Ko Lan Pattaya Thailand"
            },
            {
                "name": "海灘路盥洗・SPA 區域",
                "lat": 12.931,
                "lon": 100.88,
                "note": "按摩店及民宿確切位置待確認。",
                "approx": true,
                "googleQuery": "Lets Relax Spa Pattaya Beachfront"
            },
            {
                "name": "Terminal 21",
                "lat": 12.95,
                "lon": 100.888,
                "note": "商場區域示意；飛機夜市為替代方案，未另連線。",
                "approx": true,
                "googleQuery": "Terminal 21 Pattaya"
            },
            {
                "name": "Soi 6 六巷",
                "lat": 12.943,
                "lon": 100.885,
                "note": "街區位置示意。",
                "approx": true,
                "googleQuery": "Soi 6 Pattaya Thailand"
            },
            {
                "name": "Runway 飛機夜市（擇一）",
                "lat": 12.943,
                "lon": 100.887,
                "note": "與 Terminal 21 擇一；點選可查看夜市，整天開車路線不重複安排兩個選項。",
                "approx": true,
                "optional": true,
                "googleQuery": "Runway Street Food Pattaya Thailand"
            }
        ],
        "photoCaption": "格蘭島"
    },
    "day6": {
        "title": "東芭樂園・貓貓船與曼谷夜遊",
        "themeImage": "images/nong-nooch-garden.jpg",
        "highlights": [
            {
                "icon": "fa-tree",
                "text": "東芭樂園"
            },
            {
                "icon": "fa-cat",
                "text": "貓貓船"
            },
            {
                "icon": "fa-house",
                "text": "Yu Sabay 民宿"
            },
            {
                "icon": "fa-person-walking",
                "text": "娜娜夜遊"
            }
        ],
        "locations": {
            "東芭樂園": {
                "lat": 12.768,
                "lon": 100.932
            },
            "貓貓船": {
                "lat": 13.7241522,
                "lon": 100.7897698
            },
            "Yu Sabay 阿Ben的曼谷民宿": {
                "lat": 13.7307398,
                "lon": 100.5705319
            }
        },
        "items": [
            {
                "time": "08:00–09:00（估）",
                "title": "退房・打車前往東芭樂園",
                "summary": "帶齊行李，另叫計程車／Grab 前往東芭樂園。",
                "details": "<div class=\"detail-copy\"><p>早餐後退房，以四人及行李選擇合適車型。這段為芭達雅住宿 → 東芭樂園的單程叫車，和下午跨城包車分開安排、分開計價。</p><p>入園前先確認行李寄放方式；若園區不能寄放，需事先與接送業者安排保管，不能預設上午單程司機會留車等候。</p></div>",
                "icon": "fa-car",
                "kind": "transport",
                "notice": "先確認行李寄放與下午包車的接人位置。",
                "disclosureLabel": "",
                "chapter": {
                    "label": "上午",
                    "time": "08:00–12:30",
                    "title": "退房後，逛東芭樂園"
                }
            },
            {
                "time": "09:00–12:30",
                "title": "東芭樂園・花園、步道與午餐",
                "summary": "以花園、天空步道及恐龍谷為主，園內安排午餐。",
                "details": "<div class=\"detail-copy\"><p>抓約 3.5 小時含用餐，先選想看的區域，不追求全園走完。園區官網目前列每日 08:00–18:00；門票、遊園車及午餐依實際方案另計。</p><p>約 12:30 結束參觀、取行李並聯絡下午包車，目標 13:00 前出發，保留前往貓貓船的交通緩衝。</p></div><div class=\"trip-links\"><a class=\"trip-link\" href=\"https://www.nongnoochpattaya.com/en/beautiful-garden\" target=\"_blank\" rel=\"noopener noreferrer\">東芭樂園官方資訊<span aria-hidden=\"true\">↗</span></a></div>",
                "icon": "fa-tree",
                "kind": "activity",
                "notice": "",
                "disclosureLabel": "",
                "photo": {
                    "file": "images/nong-nooch-garden.jpg",
                    "caption": "東芭樂園・法式花園與造景",
                    "alt": "東芭樂園法式花園、幾何綠籬與恐龍造景",
                    "scene": "day"
                }
            },
            {
                "time": "12:30–16:00（交通預留）",
                "title": "包車前往曼谷・中停 Hua Takhe",
                "summary": "東芭樂園上車，先去貓貓船，再送 Yu Sabay 民宿。",
                "details": "<div class=\"detail-copy\"><p><strong>包車路線：東芭樂園 → Si Yaek Huatakhe Cafe &amp; Guesthouse（停留約 1.5 小時）→ Yu Sabay 阿Ben的曼谷民宿。</strong></p><p>這不是單純芭達雅 → 曼谷直達接送，詢價需明列中停、等候、四人行李、過路費與最晚服務時間。費用待業者報價。</p><p>本段是排程預留，非即時導航車程。目標約 16:00 抵達、銜接希望預約的 16:30 船班；若店家確認其他時段，整段接送與東芭離園時間同步調整。</p></div><div class=\"trip-links\"><a class=\"trip-link\" href=\"https://maps.app.goo.gl/xf26zboBgnm63tdK7\" target=\"_blank\" rel=\"noopener noreferrer\">貓貓船位置<span aria-hidden=\"true\">↗</span></a><a class=\"trip-link\" href=\"https://maps.app.goo.gl/QR3cw1xd5JoHagU59\" target=\"_blank\" rel=\"noopener noreferrer\">包車終點・Yu Sabay 民宿<span aria-hidden=\"true\">↗</span></a></div>",
                "icon": "fa-car",
                "kind": "transport",
                "notice": "宋干節交通需留彈性；訂車前先確認貓貓船場次及停留等候費。",
                "disclosureLabel": "",
                "chapter": {
                    "label": "午後",
                    "time": "12:30–17:30",
                    "title": "離開芭達雅，中途坐貓貓船"
                }
            },
            {
                "time": "16:00–17:30（場次待確認）",
                "title": "Hua Takhe・貓貓船",
                "summary": "Si Yaek Huatakhe 咖啡廳報到、遊河與逛老社區。",
                "details": "<div class=\"detail-copy\"><p>貓貓船位於 Hua Takhe 老社區的 <strong>Si Yaek Huatakhe Cafe &amp; Guesthouse</strong>。先預留 16:00 到店、以 <strong>16:30 場次為預約目標</strong>，遊河約 50～60 分鐘。</p><p><strong>尚未預訂。</strong>提前向店家確認 2027/4/15 是否營業、實際場次、四人座位及費用；小船乘載有限，四人可能需分船，是否能同時出發以店家回覆為準。貓咪是否上船依現場狀況。</p><p>行李與停車、下車步行位置先和包車司機確認。若無合適船班、天候取消或嚴重塞車，改咖啡廳／老社區短停，或直接前往民宿。</p></div><div class=\"trip-links\"><a class=\"trip-link\" href=\"https://www.facebook.com/SiyaekHuatakhe\" target=\"_blank\" rel=\"noopener noreferrer\">貓貓船官方 Facebook・確認預約<span aria-hidden=\"true\">↗</span></a><a class=\"trip-link\" href=\"https://maps.app.goo.gl/xf26zboBgnm63tdK7\" target=\"_blank\" rel=\"noopener noreferrer\">貓貓船地圖<span aria-hidden=\"true\">↗</span></a><a class=\"trip-link\" href=\"https://visionthai.net/article/bangkok-cat-boat-si-yaek-huatakhe-cafe-guesthouse/\" target=\"_blank\" rel=\"noopener noreferrer\">貓貓船體驗說明<span aria-hidden=\"true\">↗</span></a></div>",
                "icon": "fa-cat",
                "kind": "activity",
                "notice": "需提前預約；16:30 是安排目標，不代表已取得船位。",
                "disclosureLabel": "",
                "photo": {
                    "file": "images/hua-takhe-cat-boat.webp",
                    "caption": "Hua Takhe・貓咪陪伴的運河遊船",
                    "alt": "Hua Takhe 運河小船上的貓咪與河畔木屋",
                    "scene": "day"
                }
            },
            {
                "time": "17:30–19:00（估）",
                "title": "前往 Yu Sabay・辦理入住",
                "summary": "由原包車送往 Yu Sabay 阿Ben的曼谷民宿。",
                "details": "<div class=\"detail-copy\"><p>依你提供的地圖前往 <strong>Yu Sabay 阿Ben的曼谷民宿</strong>，放行李、check-in 並稍作整理。抵達時間依貓貓船結束時間與市區路況。</p><p>先告知房東預估傍晚至晚間抵達，確認入住方式、接待時間及司機可停車下客的位置。</p></div><div class=\"trip-links\"><a class=\"trip-link\" href=\"https://maps.app.goo.gl/QR3cw1xd5JoHagU59\" target=\"_blank\" rel=\"noopener noreferrer\">Yu Sabay 阿Ben的曼谷民宿<span aria-hidden=\"true\">↗</span></a></div>",
                "icon": "fa-car",
                "kind": "transport",
                "notice": "",
                "disclosureLabel": "",
                "chapter": {
                    "label": "傍晚",
                    "time": "17:30–20:15",
                    "title": "進曼谷，入住後吃晚餐"
                }
            },
            {
                "time": "19:00–20:15（彈性）",
                "title": "民宿附近・隨意晚餐",
                "summary": "先在 Phrom Phong 或民宿附近找方便的餐廳。",
                "details": "<div class=\"detail-copy\"><p>不固定餐廳，依入住時間與食慾選泰式料理、商場餐廳或路邊小吃；餐費依實際消費。若抵達較晚，夜遊同步順延或縮短。</p></div>",
                "icon": "fa-utensils",
                "kind": "dining",
                "notice": "",
                "disclosureLabel": ""
            },
            {
                "time": "20:15–20:45（估）",
                "title": "搭 BTS 到 Phloen Chit",
                "summary": "從 Phrom Phong 站搭往市中心方向，在 Phloen Chit 下車。",
                "details": "<div class=\"detail-copy\"><p>晚餐後前往 BTS Phrom Phong，搭往 Siam／Khu Khot 方向，依序經 Asok、Nana，到 <strong>Phloen Chit</strong> 下車。此段時間含步行到站與候車，票價依當日公告。</p></div>",
                "icon": "fa-train-subway",
                "kind": "transport",
                "notice": "",
                "disclosureLabel": "",
                "chapter": {
                    "label": "晚間",
                    "time": "20:15–23:45（彈性）",
                    "title": "先逛 Big C，再從娜娜走回民宿"
                }
            },
            {
                "time": "20:45–21:15（順路選去）",
                "title": "Big C Foodplace Mahatun Plaza・順路看看",
                "summary": "Phloen Chit 下車後，有空就順路逛逛、少量買一些；想直接去娜娜也可以略過。",
                "details": "<div class=\"detail-copy\"><p>這家是 <strong>Big C Foodplace Mahatun Plaza</strong>，位於 Mahatun Plaza 一樓、Phloen Chit 路旁。Big C 的開幕公告列面積約 386 平方公尺，屬較小型的市區超市。</p><p>適合順路補買零食、飲料及日常用品；實際伴手禮種類與庫存以現場為準。遊客常去集中採買伴手禮的，是 CentralWorld 對面的 <strong>Big C Ratchadamri</strong>，兩家不同。</p><p>預留最多約 30 分鐘，順路看看有沒有想先買的零食或日用品，沒有需要就略過、直接前往娜娜廣場。這晚買完會繼續步行，先少量採購；大量伴手禮統一留到 4/16 上午的 Big C Extra Rama IV。開幕公告與你截圖的打烊時間不同，出發前再確認 2027/4/15 營業時間。</p></div><div class=\"trip-links\"><a class=\"trip-link\" href=\"https://www.google.com/maps/search/?api=1&amp;query=Big+C+Foodplace+Mahatun+Plaza+Bangkok\" target=\"_blank\" rel=\"noopener noreferrer\">Big C Foodplace Mahatun Plaza 地圖<span aria-hidden=\"true\">↗</span></a><a class=\"trip-link\" href=\"https://www.thaipr.net/life/3554660\" target=\"_blank\" rel=\"noopener noreferrer\">分店開幕與規模介紹<span aria-hidden=\"true\">↗</span></a></div>",
                "icon": "fa-basket-shopping",
                "kind": "activity",
                "notice": "這站非必去；大量採購已排 4/16 上午 Big C Extra Rama IV。",
                "disclosureLabel": "分店差別與採買安排"
            },
            {
                "time": "21:15–21:30（估）",
                "title": "Big C Mahatun Plaza → 娜娜廣場",
                "summary": "若有逛 Big C，結帳後往 Nana 方向走；略過採買則可提早開始散步。",
                "details": "<div class=\"detail-copy\"><p>從 Big C Foodplace Mahatun Plaza 出發，沿素坤逸路往東步行，前往 Soi 4 的 Nana Plaza 娜娜廣場。預留約 15 分鐘，實際依人潮與過馬路時間調整。</p></div>",
                "icon": "fa-person-walking",
                "kind": "transport",
                "notice": "",
                "disclosureLabel": ""
            },
            {
                "time": "21:30–22:30（彈性）",
                "title": "娜娜廣場・看夜生活",
                "summary": "以娜娜廣場為今晚主要停留點，看看街區與店家氣氛。",
                "details": "<div class=\"detail-copy\"><p>停留時間依興趣調整；有入店或點飲料再依現場菜單消費，未預訂店家、套票或活動。</p></div>",
                "icon": "fa-moon",
                "kind": "night",
                "notice": "",
                "disclosureLabel": ""
            },
            {
                "time": "22:30–23:45（彈性）",
                "title": "Nana → Asok → Phrom Phong・步行回民宿",
                "summary": "逛完沿素坤逸路往東走，經 Asok 回 Phrom Phong，再回 Yu Sabay。",
                "details": "<div class=\"detail-copy\"><p>步行路線：<strong>娜娜廣場 → 素坤逸路 → BTS Nana → Asok → Phrom Phong → Yu Sabay 民宿</strong>。預留散步及沿路停留時間；累了可從 Nana／Asok 搭 BTS 回 Phrom Phong，或直接叫車。</p></div><div class=\"trip-links\"><a class=\"trip-link\" href=\"https://www.google.com/maps/dir/?api=1&origin=BTS+Phloen+Chit+Bangkok&destination=BTS+Phrom+Phong+Bangkok&waypoints=Big+C+Foodplace+Mahatun+Plaza+Bangkok%7CNana+Plaza+Bangkok%7CBTS+Asok+Bangkok&travelmode=walking\" target=\"_blank\" rel=\"noopener noreferrer\">今晚步行路線<span aria-hidden=\"true\">↗</span></a><a class=\"trip-link\" href=\"https://maps.app.goo.gl/QR3cw1xd5JoHagU59\" target=\"_blank\" rel=\"noopener noreferrer\">回 Yu Sabay 民宿<span aria-hidden=\"true\">↗</span></a></div>",
                "icon": "fa-person-walking",
                "kind": "night",
                "notice": "",
                "disclosureLabel": ""
            }
        ],
        "intro": "上午逛東芭，午後坐貓貓船，入住曼谷後吃飯、逛娜娜，再沿素坤逸路散步。",
        "route": [
            {
                "name": "海灘路住宿區",
                "lat": 12.936,
                "lon": 100.883,
                "googleQuery": "Pattaya Beach Road Thailand",
                "note": "芭達雅住宿區示意；退房後先叫單程車。",
                "approx": true
            },
            {
                "name": "東芭樂園",
                "lat": 12.768,
                "lon": 100.932,
                "googleQuery": "Nong Nooch Tropical Garden Thailand",
                "note": "上午叫車抵達，下午跨城包車從園區接人。",
                "approx": true
            },
            {
                "name": "Hua Takhe 貓貓船",
                "lat": 13.7241522,
                "lon": 100.7897698,
                "googleQuery": "Si Yaek Huatakhe Cafe & Guesthouse Bangkok",
                "note": "包車中停；四人船位及 4/15 場次須提前確認。",
                "approx": false
            },
            {
                "name": "Yu Sabay 阿Ben的曼谷民宿",
                "lat": 13.7307398,
                "lon": 100.5705319,
                "googleQuery": "Yu Sabay 阿Ben的曼谷民宿",
                "note": "依提供的 Google 地圖定位。",
                "approx": false
            },
            {
                "name": "BTS Phloen Chit・夜遊起點",
                "lat": 13.743,
                "lon": 100.549,
                "googleQuery": "BTS Phloen Chit Bangkok",
                "note": "晚餐後搭 BTS 到這裡，先逛 Big C Mahatun Plaza，再往娜娜廣場步行。",
                "approx": true,
                "mapOnly": true
            },
            {
                "name": "Big C Foodplace Mahatun Plaza",
                "lat": 13.742,
                "lon": 100.55,
                "googleQuery": "Big C Foodplace Mahatun Plaza Bangkok",
                "note": "Phloen Chit 下車後先採買，再步行去娜娜廣場；小型 Foodplace，並非 CentralWorld 對面的 Big C Ratchadamri。街區位置示意，以店家搜尋結果確認入口。",
                "approx": true,
                "mapOnly": true
            },
            {
                "name": "Nana Plaza 娜娜廣場",
                "lat": 13.742,
                "lon": 100.553,
                "googleQuery": "Nana Plaza Bangkok",
                "note": "今晚主要停留點；步行段，未列入跨城開車路線。",
                "approx": true,
                "mapOnly": true
            },
            {
                "name": "BTS Phrom Phong・步行回程",
                "lat": 13.73,
                "lon": 100.569,
                "googleQuery": "BTS Phrom Phong Bangkok",
                "note": "娜娜經 Asok 步行回 Phrom Phong，再回民宿。",
                "approx": true,
                "mapOnly": true
            }
        ],
        "photoCaption": "東芭樂園・法式花園"
    },
    "day7": {
        "title": "Big C 採買・河畔散步與晚餐遊船",
        "themeImage": "images/riverside-carnival-cruise.jpg",
        "highlights": [
            {
                "icon": "fa-cart-shopping",
                "text": "Big C Extra Rama IV"
            },
            {
                "icon": "fa-water",
                "text": "ICONSIAM 河畔"
            },
            {
                "icon": "fa-ship",
                "text": "河畔嘉年華號"
            }
        ],
        "locations": {
            "ICONSIAM": {
                "lat": 13.726,
                "lon": 100.51
            },
            "Big C Extra Rama IV": {
                "lat": 13.719,
                "lon": 100.574
            },
            "Riverside Bangkok Hotel": {
                "lat": 13.7802,
                "lon": 100.4995
            }
        },
        "items": [
            {
                "time": "09:30–11:30（估）",
                "title": "Big C Extra Rama IV・上午購物",
                "summary": "從 Yu Sabay 打車前往大型 Big C Extra，集中採買零食、伴手禮與日用品。",
                "details": "<div class=\"detail-copy\"><p>前往你提供的 <strong>Big C Extra Rama IV（拉瑪四路店）</strong>，地址為 2929 Rama IV Road。這家是大型量販店，和前一晚 Phloen Chit 的小型 Foodplace 不同，也不是 CentralWorld 對面的 Ratchadamri 分店。</p><p>預留約兩小時含交通、挑選與結帳，集中購買想帶回台灣的零食、調味料與日用品；品牌、規格、庫存及價格以現場為準。若時間不夠，可縮短午後河畔逛街時間，不必趕著買。</p><p>建議從民宿叫車往返，採買完先回 Yu Sabay 放東西，再開始下午行程。營業時間出發前依 2027/4/16 店家公告確認。</p></div><div class=\"trip-links\"><a class=\"trip-link\" href=\"https://maps.app.goo.gl/C4zUFLfaZt7VQ48bA\" target=\"_blank\" rel=\"noopener noreferrer\">Big C Extra Rama IV 地圖<span aria-hidden=\"true\">↗</span></a></div>",
                "icon": "fa-cart-shopping",
                "kind": "activity",
                "notice": "採買後先回民宿放東西；車資與購物費依實際消費。",
                "disclosureLabel": "分店位置與採購安排",
                "chapter": {
                    "label": "上午",
                    "time": "09:30–12:00",
                    "title": "先把伴手禮買好，再輕鬆逛街"
                }
            },
            {
                "time": "11:30–12:00（估）",
                "title": "回 Yu Sabay・放購物袋",
                "summary": "叫車回民宿，把採買物品放好後再出門。",
                "details": "<div class=\"detail-copy\"><p>將購物袋送回 Yu Sabay 阿Ben的曼谷民宿，稍作整理、喝水休息。下午出門只帶隨身用品，避免一路提著伴手禮逛街。</p></div>",
                "icon": "fa-house",
                "kind": "transport",
                "notice": "",
                "disclosureLabel": ""
            },
            {
                "time": "12:00–13:00（估）",
                "title": "前往 ICONSIAM・午餐",
                "summary": "從 Yu Sabay 出發，到 ICONSIAM 找午餐、開始河畔行程。",
                "details": "<div class=\"detail-copy\"><p>採買物品已先放回民宿，輕裝前往 ICONSIAM。可依當日路況選搭 BTS 轉 Gold Line 至 Charoen Nakhon，或直接叫車；午餐在商場安排，不固定餐廳。</p></div>",
                "icon": "fa-train-subway",
                "kind": "transport",
                "notice": "",
                "disclosureLabel": "",
                "chapter": {
                    "label": "午後",
                    "time": "12:00–16:30",
                    "title": "把下午留給河畔散步"
                }
            },
            {
                "time": "13:00–16:30",
                "title": "ICONSIAM・河畔逛逛",
                "summary": "逛 SookSiam、商場與河邊步道，吃點小食、喝飲料。",
                "details": "<div class=\"detail-copy\"><p>在 ICONSIAM 河畔及商場慢慢逛，依天氣切換室內與河邊步道，不再接 Siam／CentralWorld 或固定按摩，讓下午有餘裕。</p><p>晚上船上有晚餐，不另外排一頓正式晚餐。約 16:30 結束，接著前往碼頭；報到地點以新訂單為準，不能把 ICONSIAM 當成這艘船的固定登船點。</p></div><div class=\"trip-links\"><a class=\"trip-link\" href=\"https://www.google.com/maps/search/?api=1&amp;query=ICONSIAM+Bangkok\" target=\"_blank\" rel=\"noopener noreferrer\">ICONSIAM 地圖<span aria-hidden=\"true\">↗</span></a></div>",
                "icon": "fa-water",
                "kind": "activity",
                "notice": "",
                "disclosureLabel": ""
            },
            {
                "time": "16:30–18:00（交通預留）",
                "title": "ICONSIAM → Riverside Bangkok Hotel 碼頭",
                "summary": "先依上次的飯店碼頭方案預留交通，目標 18:00 左右抵達。",
                "details": "<div class=\"detail-copy\"><p>沿用上次曼谷行程的集合地點：<strong>Riverside Bangkok Hotel</strong>，地址 <strong>195 Ratchawithi 21 Alley, Bang Yi Khan, Bang Phlat, Bangkok</strong>。從 ICONSIAM 搭 Grab／計程車前往，預留約 1.5 小時含叫車與晚間交通緩衝，並非固定車程。</p><p>目前不同售票方案亦可能從 Asiatique 出發。訂票時須確認 <strong>2027/4/16 的實際碼頭與場次</strong>；若憑證改列 Asiatique，這段交通、報到及遊船時間一起更新，不照舊碼頭前往。</p></div><div class=\"trip-links\"><a class=\"trip-link\" href=\"https://www.google.com/maps/search/?api=1&amp;query=Riverside+Bangkok+Hotel+195+Ratchawithi+21+Bangkok\" target=\"_blank\" rel=\"noopener noreferrer\">Riverside Bangkok Hotel 碼頭地圖<span aria-hidden=\"true\">↗</span></a></div>",
                "icon": "fa-car",
                "kind": "transport",
                "notice": "尚未預訂；出發前依新訂單確認碼頭，節日及尖峰交通預留時間。",
                "disclosureLabel": "",
                "chapter": {
                    "label": "傍晚",
                    "time": "16:30–19:30",
                    "title": "先到碼頭，換票登船"
                }
            },
            {
                "time": "18:00–19:30（依方案確認）",
                "title": "河畔嘉年華號・報到與登船",
                "summary": "沿用上次 18:15 起報到、19:00 登船的安排，提前到場找櫃檯。",
                "details": "<div class=\"detail-copy\"><p>上次曼谷檔案記錄為 <strong>18:15～19:00 報到、19:00 登船、19:30 開航</strong>；飯店官方頁目前亦列 Carnival 18:00 check-in、19:00 上船。</p><p>這次先預留 18:00 到場找櫃檯、換票與洗手間時間，最晚報到截止仍依 <strong>2027/4/16 的新憑證</strong>確認。</p></div>",
                "icon": "fa-ticket",
                "kind": "activity",
                "notice": "舊行程的已預訂狀態不沿用；本次四人票券、場次與座位仍待確認。",
                "disclosureLabel": ""
            },
            {
                "time": "19:30–21:30（沿用上次時段）",
                "title": "Riverside Carnival・河畔嘉年華號",
                "summary": "船上自助晚餐、歌舞表演與 DJ，欣賞湄南河沿岸夜景。",
                "details": "<div class=\"detail-copy\"><p>依你上次曼谷行程，安排同款 <strong>Riverside Carnival Cruise 河畔嘉年華號</strong>：船上用晚餐、欣賞歌舞秀與音樂，沿河看曼谷夜景。這是上次檔案中的實際船名，並非芭達雅東方公主號。</p><p>飯店官網現有 Carnival 資訊列 <strong>19:30 開航、21:30 靠岸</strong>。此為本次排程參考，2027 日期、航線、表演、餐飲及飲品包含內容以所選方案為準。</p><p><strong>狀態：待預訂四人船票。</strong>上次檔案只寫已預訂，未列實付價格；不帶入舊訂單狀態，也不把官網已過期促銷價當成本次票價。船票費用待選定 2027/4/16 方案後填入。</p></div><div class=\"trip-links\"><a class=\"trip-link\" href=\"https://www.riversidebangkok.com/special-offers/\" target=\"_blank\" rel=\"noopener noreferrer\">Riverside 官方 Carnival 資訊<span aria-hidden=\"true\">↗</span></a><a class=\"trip-link\" href=\"https://www.ticket2attraction.com/discount-tickets/riverside-carnival-cruise/\" target=\"_blank\" rel=\"noopener noreferrer\">河畔嘉年華號・方案查詢<span aria-hidden=\"true\">↗</span></a></div>",
                "icon": "fa-ship",
                "kind": "dining",
                "notice": "須選 4/16 新方案；碼頭、報到、開航與回程時間以訂單為準。",
                "disclosureLabel": "",
                "chapter": {
                    "label": "晚間",
                    "time": "19:30–22:30",
                    "title": "船上晚餐，看完夜景就回民宿"
                },
                "photo": {
                    "file": "images/riverside-carnival-cruise.jpg",
                    "caption": "Riverside Carnival・晚餐遊船",
                    "alt": "Riverside Bangkok 遊船的露天甲板與河畔燈光",
                    "scene": "night"
                }
            },
            {
                "time": "21:30–22:30（估）",
                "title": "下船・返回 Yu Sabay",
                "summary": "靠岸後叫車回阿Ben的曼谷民宿，整理行李準備隔日返台。",
                "details": "<div class=\"detail-copy\"><p>遊船結束後，依實際靠岸碼頭叫 Grab／計程車返回 <strong>Yu Sabay 阿Ben的曼谷民宿</strong>。今晚不再另外排夜生活，回房整理戰利品、行李與機場資料。</p><p>4/17 約 08:00 從民宿出發，09:45 前抵達 BKK（起飛前兩小時），11:45 搭機返台；出發時間依預約接送與路況確認。</p></div><div class=\"trip-links\"><a class=\"trip-link\" href=\"https://maps.app.goo.gl/QR3cw1xd5JoHagU59\" target=\"_blank\" rel=\"noopener noreferrer\">返回 Yu Sabay 民宿<span aria-hidden=\"true\">↗</span></a></div>",
                "icon": "fa-house",
                "kind": "transport",
                "notice": "",
                "disclosureLabel": ""
            }
        ],
        "intro": "上午買伴手禮、回民宿放好，午後逛 ICONSIAM 河畔，傍晚報到搭嘉年華號，船上吃晚餐、看秀與夜景。",
        "route": [
            {
                "name": "Yu Sabay 阿Ben的曼谷民宿",
                "lat": 13.7307398,
                "lon": 100.5705319,
                "note": "採買出發點，買完先回來放購物袋。",
                "approx": false,
                "googleQuery": "Yu Sabay 阿Ben的曼谷民宿"
            },
            {
                "name": "Big C Extra Rama IV",
                "lat": 13.719,
                "lon": 100.574,
                "note": "拉瑪四路店，2929 Rama IV Road；街區位置示意，以提供的 Google 地圖確認入口。",
                "approx": true,
                "googleQuery": "Big C Extra Rama IV Bangkok"
            },
            {
                "name": "回 Yu Sabay・放購物袋",
                "lat": 13.7307398,
                "lon": 100.5705319,
                "note": "採買出發點，買完先回來放購物袋。",
                "approx": false,
                "googleQuery": "Yu Sabay 阿Ben的曼谷民宿"
            },
            {
                "name": "ICONSIAM",
                "lat": 13.7268227,
                "lon": 100.510294,
                "note": "下午逛河畔與商場，16:30 左右離開前往遊船報到碼頭。",
                "approx": false,
                "googleQuery": "ICONSIAM Bangkok"
            },
            {
                "name": "Riverside Bangkok Hotel・嘉年華號碼頭",
                "lat": 13.7802,
                "lon": 100.4995,
                "googleQuery": "Riverside Bangkok Hotel 195 Ratchawithi 21 Bangkok",
                "note": "暫依上次飯店碼頭方案；2027/4/16 若憑證改列 Asiatique，交通與地圖需同步調整。",
                "approx": true
            },
            {
                "name": "回 Yu Sabay・休息備返台",
                "lat": 13.7307398,
                "lon": 100.5705319,
                "note": "遊船結束後返宿，整理行李，隔天退房前往 BKK。",
                "approx": false,
                "googleQuery": "Yu Sabay 阿Ben的曼谷民宿"
            }
        ],
        "photoCaption": "河畔嘉年華號・湄南河晚餐遊船"
    },
    "day8": {
        "title": "退房赴機場・曼谷返台",
        "themeImage": "images/bkk-departure-hall.jpg",
        "highlights": [
            {
                "icon": "fa-suitcase",
                "text": "退房赴機場"
            },
            {
                "icon": "fa-clock",
                "text": "09:45 前抵達 BKK"
            },
            {
                "icon": "fa-plane-departure",
                "text": "TG630 返台"
            }
        ],
        "locations": {
            "蘇凡納布機場 BKK": {
                "lat": 13.69,
                "lon": 100.75
            }
        },
        "items": [
            {
                "time": "07:30–09:45（含接送）",
                "title": "退房・前往 BKK 蘇凡納布機場",
                "summary": "07:30 整理退房，約 08:00 從 Yu Sabay 出發，目標 09:45 前到機場。",
                "details": "<div class=\"detail-copy\"><p>前一晚整理好行李，早上從 <strong>Yu Sabay 阿Ben的曼谷民宿</strong>辦理退房，約 <strong>08:00</strong> 搭預約接送或計程車直接前往 <strong>BKK 蘇凡納布機場國際線出境大廳</strong>。</p><p>以 <strong>09:45 前抵達機場</strong>為目標，也就是原紀錄 11:45 航班起飛前兩小時。08:00 是接送規劃時間，實際依司機建議與當日路況提前調整。</p></div>",
                "icon": "fa-car",
                "kind": "transport",
                "notice": "目的地為 BKK 蘇凡納布機場；出發時間以能在 09:45 前抵達為準。",
                "disclosureLabel": ""
            },
            {
                "time": "09:45–11:45",
                "title": "機場報到・託運與候機",
                "summary": "起飛前兩小時到場，依序辦理報到、託運、安檢與出境。",
                "details": "<div class=\"detail-copy\"><p>抵達後先確認 TG630 報到櫃檯與登機門，完成行李託運、安檢及出境，再依登機證時間到登機門候機。</p><p>若有退稅需求，把單據與須查驗商品準備好，查驗流程可能需要額外時間；航空公司若要求更早到場，依通知提前。</p></div>",
                "icon": "fa-suitcase-rolling",
                "kind": "transport",
                "notice": "11:45 是起飛時間，登機及報到截止時間以航空公司、登機證為準。",
                "disclosureLabel": "",
                "photo": {
                    "file": "images/bkk-departure-hall.jpg",
                    "caption": "BKK・國際線出境報到大廳",
                    "alt": "蘇凡納布機場航廈內的國際線報到櫃檯與旅客",
                    "scene": "day"
                }
            },
            {
                "time": "11:45 → 16:15（當地時間）",
                "title": "TG630・曼谷飛高雄",
                "summary": "11:45 從 BKK 起飛，16:15 抵達高雄 KHH。",
                "details": "<div class=\"detail-copy\"><p>依目前行程紀錄：2027/4/17（六）搭乘泰國航空 <strong>TG630</strong>，<strong>11:45 BKK → 16:15 KHH</strong>，飛行約 3 小時 30 分。泰國比台灣慢一小時，兩端皆為當地時間；實際航班資訊以機票與航空公司通知為準。</p></div>",
                "icon": "fa-plane-departure",
                "kind": "transport",
                "notice": "",
                "disclosureLabel": ""
            }
        ],
        "intro": "退房後直接前往 BKK，起飛前兩小時抵達機場，辦理報到、搭機返回高雄。",
        "route": [
            {
                "name": "Yu Sabay 阿Ben的曼谷民宿",
                "lat": 13.7307398,
                "lon": 100.5705319,
                "note": "曼谷住宿，依提供的地圖定位。",
                "approx": false,
                "googleQuery": "Yu Sabay 阿Ben的曼谷民宿"
            },
            {
                "name": "BKK 蘇凡納布機場",
                "lat": 13.69,
                "lon": 100.75,
                "note": "航廈區域示意。",
                "approx": true,
                "googleQuery": "Suvarnabhumi Airport Thailand"
            }
        ],
        "photoCaption": "BKK 蘇凡納布機場・出境報到大廳"
    }
};

            // --- INITIALIZATION ---

            function setupPage() {
                setupAnimations();
                setupSongkranWater();
                document.getElementById('begin-trip').addEventListener('click', () => document.querySelector('[data-target="day1"]').click());
                setupCountdown();
                setupWeather();
                generateDailySections();
                setupRouteControls();
                setupDateNavigation();
                setupTabSwitching();
                setupScrollToTop();
                setupPracticalMode();
                setupTodayBrief();
                setupDayAtmosphere();
                setupReadingExperience();
                setupDayShortcuts();
                setupChart();
                document.querySelectorAll('.jump-day').forEach(button => button.addEventListener('click', () => document.querySelector('[data-target="' + button.dataset.day + '"]').click()));
                const packing = document.querySelectorAll('[data-pack]');
                function refreshPacking() { document.getElementById('packing-status').textContent = '已準備 ' + [...packing].filter(input => input.checked).length + '／' + packing.length + ' 項'; }
                packing.forEach(input => {
                    try { input.checked = localStorage.getItem('pattaya-pack-' + input.dataset.pack) === 'yes'; } catch {}
                    input.addEventListener('change', () => { try { localStorage.setItem('pattaya-pack-' + input.dataset.pack, input.checked ? 'yes' : 'no'); } catch {} refreshPacking(); });
                });
                refreshPacking();

                document.querySelector('.preloader')?.classList.add('hidden');
                document.body.classList.add('loaded');
                const requestedDay = location.hash.slice(1);
                const firstView = Object.hasOwn(itineraryData, requestedDay) ? requestedDay : 'overview';
                const saved = tripState.position ? {...tripState.position} : null;
                isAnimating = true;
                switchTab(firstView, false, () => {
                    isAnimating = false;
                    if (firstView !== 'overview') {
                        if (saved?.day === firstView) restoreReading(saved);
                        else if (tripState.quick || tripDayAt() === firstView) {
                            setTimeline(firstView,true);
                            scrollToPart(document.getElementById('timeline-'+firstView),true);
                        } else scrollToPart(document.getElementById(firstView),true);
                    }
                });
            }

            setupPage();

            // --- SETUP FUNCTIONS ---
            // Shared reading state stays on this device; URLs remain shareable by date.
            function readTripState() {
                try {
                    const value = JSON.parse(localStorage.getItem('pattaya-reading-v2') || '{}');
                    if (!value || typeof value !== 'object' || Array.isArray(value)) return {};
                    const position=value.position;
                    const valid=position && typeof position==='object' && /^day[1-8]$/.test(position.day);
                    return {
                        quick:value.quick===true,
                        expanded:Array.isArray(value.expanded)?value.expanded.filter(x=>typeof x==='string'):[],
                        photos:Array.isArray(value.photos)?value.photos.filter(x=>typeof x==='string'):[],
                        timelines:value.timelines && typeof value.timelines==='object'?Object.fromEntries(Object.entries(value.timelines).filter(([day,open])=>/^day[1-8]$/.test(day)&&typeof open==='boolean')):{},
                        position:valid?{day:position.day,item:typeof position.item==='string'?position.item:null,anchor:typeof position.anchor==='string'?position.anchor:null,offset:Number.isFinite(position.offset)?position.offset:0}:null
                    };
                } catch { return {}; }
            }
            function writeTripState() {
                try { localStorage.setItem('pattaya-reading-v2', JSON.stringify(tripState)); } catch {}
            }
            function tripDayAt(now = new Date()) {
                const parts = Object.fromEntries(new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Bangkok',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(now).map(p=>[p.type,p.value]));
                if (parts.year !== '2027' || parts.month !== '04') return null;
                const n = Number(parts.day) - 9;
                return n >= 1 && n <= 8 ? 'day' + n : null;
            }
            function escapeHtml(text) { return String(text).replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
            function responsiveImage(file, alt, sizes = '(max-width:900px) 90vw, 320px', extra = '') {
                const asset = imageAssets[file];
                if (!asset) return `<img src="${file}" alt="${escapeHtml(alt)}" loading="lazy" decoding="async" ${extra}>`;
                return `<img src="${asset.variants[Math.min(1,asset.variants.length-1)].file}" srcset="${asset.variants.map(v=>v.file+' '+v.width+'w').join(', ')}" sizes="${sizes}" width="${asset.width}" height="${asset.height}" alt="${escapeHtml(alt)}" loading="lazy" decoding="async" ${extra}>`;
            }
            function layoutChanged() { window.dispatchEvent(new Event('itinerary:layout')); }
            function scrollToPart(element, instant = false) {
                if (!element) return;
                const nav = document.querySelector('.date-navigation');
                window.scrollTo({top:Math.max(0,window.scrollY + element.getBoundingClientRect().top - nav.offsetHeight - 48),behavior:instant || reduceMotion ? 'auto' : 'smooth'});
            }
            function setTimeline(day, open) {
                const section = document.getElementById(day);
                const timeline = section?.querySelector('.timeline-container');
                if (!timeline) return;
                timeline.classList.toggle('hidden',!open);
                const button = section.querySelector('.view-timeline-btn');
                button.setAttribute('aria-expanded',String(open));
                button.innerHTML = open ? '收起今日行程 <i class="fas fa-arrow-up" aria-hidden="true"></i>' : '閱讀今日行程 <i class="fas fa-arrow-down" aria-hidden="true"></i>';
                tripState.timelines = {...tripState.timelines,[day]:open};
                writeTripState();
                layoutChanged();
            }
            function navigateDay(day, options = {}) {
                if (isAnimating || !document.getElementById(day)) return;
                window.dispatchEvent(new Event('itinerary:save'));
                isAnimating = true;
                switchTab(day,true,()=>{
                    isAnimating = false;
                    if (options.resume) restoreReading(options.resume);
                    else if (options.timeline || tripState.quick || tripDayAt() === day) {
                        setTimeline(day,true);
                        scrollToPart(document.getElementById('timeline-'+day));
                    }
                    if (options.focus) document.getElementById(day)?.querySelector('h2')?.focus({preventScroll:true});
                    layoutChanged();
                });
            }
            function restoreReading(saved) {
                if (saved.day !== currentActiveSectionId) return;
                const section = document.getElementById(saved.day);
                if (!section) return;
                const item = saved.item?.startsWith(saved.day+'-item-') ? document.getElementById(saved.item) : null;
                if (item) setTimeline(saved.day,true);
                const anchor=saved.anchor?.startsWith(saved.day)?document.getElementById(saved.anchor):null;
                const target = item || anchor || section;
                requestAnimationFrame(()=>{
                    const offset = Number.isFinite(saved.offset) ? Math.max(-2000,Math.min(5000,saved.offset)) : -document.querySelector('.date-navigation').offsetHeight-48;
                    window.scrollTo({top:Math.max(0,window.scrollY+target.getBoundingClientRect().top+offset),behavior:'auto'});
                    layoutChanged();
                });
            }
            function updateResumeLink() {
                const button = document.getElementById('resume-reading');
                const saved = tripState.position;
                const valid = saved && Object.hasOwn(itineraryData,saved.day);
                button.hidden = !valid;
                if (valid) {
                    const item = itineraryData[saved.day].items.find((_,i)=>saved.item === saved.day+'-item-'+i);
                    button.textContent = '繼續看 4/' + (Number(saved.day.slice(3))+9) + (item ? ' · '+item.title : ' 的行程') + ' ↗';
                }
            }
            function setupPracticalMode() {
                document.querySelectorAll('[data-quick-mode]').forEach(input=>{
                    input.checked = Boolean(tripState.quick);
                    input.addEventListener('change',()=>{
                        tripState.quick = input.checked;
                        document.querySelectorAll('[data-quick-mode]').forEach(other=>other.checked=input.checked);
                        document.body.classList.toggle('quick-mode',input.checked);
                        writeTripState();
                        if (input.checked && itineraryData[currentActiveSectionId]) {
                            setTimeline(currentActiveSectionId,true);
                            scrollToPart(document.getElementById('timeline-'+currentActiveSectionId));
                        }
                        layoutChanged();
                    });
                });
                document.body.classList.toggle('quick-mode',Boolean(tripState.quick));
                document.querySelectorAll('[data-direct-timeline]').forEach(button=>button.addEventListener('click',()=>{
                    setTimeline(button.dataset.directTimeline,true);
                    scrollToPart(document.getElementById('timeline-'+button.dataset.directTimeline));
                }));
                document.getElementById('resume-reading').addEventListener('click',()=>{
                    const saved = {...tripState.position};
                    navigateDay(saved.day,{resume:saved});
                });
                updateResumeLink();
                document.getElementById('mobile-timeline').addEventListener('click',()=>{
                    setTimeline(currentActiveSectionId,true);
                    scrollToPart(document.getElementById('timeline-'+currentActiveSectionId));
                });
                document.getElementById('mobile-map').addEventListener('click',()=>scrollToPart(document.querySelector('#'+currentActiveSectionId+' .day-route-spread')));
                document.getElementById('mobile-next').addEventListener('click',()=>{
                    const n=Number(currentActiveSectionId?.slice(3));
                    navigateDay(n<8?'day'+(n+1):'overview',{timeline:n<8});
                });
                document.querySelectorAll('.trip-more').forEach(detail=>{
                    detail.open=(tripState.expanded || []).includes(detail.id);
                    detail.addEventListener('toggle',()=>{
                        const expanded=new Set(tripState.expanded || []);
                        if(detail.open)expanded.add(detail.id);else expanded.delete(detail.id);
                        tripState.expanded=[...expanded];writeTripState();layoutChanged();
                        const inner=detail.querySelector('.trip-details');
                        if(detail.open && !reduceMotion && inner.animate)inner.animate([{opacity:.3,transform:'translateY(-5px)'},{opacity:1,transform:'translateY(0)'}],{duration:220,easing:'ease-out'});
                    });
                });
                document.querySelectorAll('.photo-expand').forEach(button=>{
                    const figure=button.closest('figure');
                    const apply=open=>{
                        figure.classList.toggle('photo-expanded',open);
                        button.setAttribute('aria-expanded',String(open));
                        button.querySelector('.photo-action').textContent=open?'收回照片':'展開照片';
                        button.querySelector('img').sizes=open?'(max-width:900px) 90vw, 850px':'(max-width:900px) 320px, 320px';
                    };
                    apply((tripState.photos || []).includes(figure.id));
                    button.addEventListener('click',()=>{
                        const open=button.getAttribute('aria-expanded')!=='true';apply(open);
                        const img=button.querySelector('img');
                        if(!reduceMotion && img.animate)img.animate([{opacity:.5},{opacity:1}],{duration:220,easing:'ease-out'});
                        const ids=new Set(tripState.photos || []);if(open)ids.add(figure.id);else ids.delete(figure.id);
                        tripState.photos=[...ids];writeTripState();layoutChanged();
                    });
                });
                window.addEventListener('pagehide',()=>window.dispatchEvent(new Event('itinerary:save')));
                document.addEventListener('visibilitychange',()=>{if(document.hidden)window.dispatchEvent(new Event('itinerary:save'));});
                document.addEventListener('click',event=>{if(event.target.closest('a[target="_blank"]'))window.dispatchEvent(new Event('itinerary:save'));});
                window.addEventListener('pageshow',event=>{if(event.persisted){isAnimating=false;layoutChanged();}});
                window.addEventListener('hashchange',()=>{
                    const day=location.hash.slice(1);
                    if((day==='overview'||Object.hasOwn(itineraryData,day)) && day!==currentActiveSectionId)navigateDay(day);
                });
            }
            function todayBrief(day) {
                if (!day || !itineraryData[day]) return '';
                const data=itineraryData[day];
                const first=data.items[0];
                const stay=Number(day.slice(3)) < 6 ? '芭達雅海灘路住宿' : 'Yu Sabay 阿Ben的曼谷民宿';
                return `<p class="editorial-kicker">今天的小抄 · 泰國時間</p><h2>4/${Number(day.slice(3))+9} · ${data.title}</h2><p>${day==='day8'?'今日重點：退房、機場接送與回程航班。':`${first.time} · ${first.title}`}</p><p class="small-note">${day==='day8'?'退房住宿':'今晚住宿'}：${stay}</p><button type="button" class="editorial-text-button" data-today-day="${day}">打開今天時間表 ↗</button><a class="trip-link" href="${externalDayMap(day)}" target="_blank" rel="noopener noreferrer">今日地圖 ↗</a>`;
            }
            function setupTodayBrief() {
                let previous;
                function refresh() {
                    const day=tripDayAt();
                    if(day===previous)return;
                    previous=day;
                    const panel=document.getElementById('today-brief');
                    panel.hidden=!day;
                    panel.innerHTML=todayBrief(day);
                    panel.querySelector('button')?.addEventListener('click',()=>navigateDay(day,{timeline:true}));
                    navButtons.forEach(button=>{
                        const today=button.dataset.target===day;
                        button.classList.toggle('is-today',today);
                        if(today)button.setAttribute('title','泰國當地日期 · 今天');else button.removeAttribute('title');
                    });
                    layoutChanged();
                }
                refresh();setInterval(refresh,60000);
            }
            function externalDayMap(day) {
                if(day==='day5')return 'https://www.google.com/maps/search/?api=1&query=Ko+Lan+Pattaya+Thailand';
                const stops=routeStops(day);
                return 'https://www.google.com/maps/dir/?'+new URLSearchParams({api:'1',origin:mapQuery(stops[0]),destination:mapQuery(stops.at(-1)),waypoints:stops.slice(1,-1).map(mapQuery).join('|'),travelmode:'driving'});
            }
            function loadRouteMap(day, index = null) {
                const frame=document.getElementById('route-map-'+day);
                const visual=document.getElementById('route-visual-'+day);
                const point=Number.isInteger(index)?itineraryData[day].route[index]:null;
                if(!frame || !visual)return;
                const label=point?point.name:'今天的路線';
                const status=document.getElementById('map-status-'+day);
                const fallback=document.getElementById('map-external-'+day);
                fallback.href=point?'https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(mapQuery(point)):externalDayMap(day);
                visual.classList.add('is-loading');visual.setAttribute('aria-busy','true');
                status.textContent='正在載入 '+label+' 的地圖…';
                clearTimeout(mapTimers[day]);
                frame.onload=()=>{
                    clearTimeout(mapTimers[day]);visual.classList.remove('is-loading');visual.setAttribute('aria-busy','false');
                    status.textContent='若地圖未正常顯示，可直接在 Google 地圖開啟。';layoutChanged();
                };
                frame.onerror=()=>{
                    clearTimeout(mapTimers[day]);visual.classList.remove('is-loading');visual.setAttribute('aria-busy','false');
                    status.textContent='地圖連線未完成，請重試或在 Google 地圖開啟。';
                };
                frame.src=point?googlePointUrl(point,point.approx?13:15):googleRouteUrl(day);
                mapTimers[day]=setTimeout(()=>{
                    visual.classList.remove('is-loading');visual.setAttribute('aria-busy','false');
                    status.textContent='地圖載入較久，可重試或直接在 Google 地圖開啟。';
                },12000);
                selectedRoutes[day]=index;
            }
            function syncDateIndicator(animate = true) {
                const button=document.querySelector('.nav-btn[aria-current="page"]');
                const indicator=document.getElementById('date-indicator');
                if(!button||!indicator)return;
                const previous=indicator.getBoundingClientRect();
                indicator.style.width=button.offsetWidth+'px';
                indicator.style.height=button.offsetHeight+'px';
                indicator.style.transform=`translate(${button.offsetLeft}px, ${button.offsetTop}px)`;
                if(animate && !reduceMotion && indicator.animate && previous.width) {
                    const next=indicator.getBoundingClientRect();
                    indicator.animate([{transform:`translate(${button.offsetLeft+previous.left-next.left}px,${button.offsetTop+previous.top-next.top}px)`,width:previous.width+'px'},{transform:indicator.style.transform,width:button.offsetWidth+'px'}],{duration:280,easing:'cubic-bezier(.2,.7,.2,1)'});
                }
            }
            function setupDayAtmosphere() {
                const cards=document.querySelectorAll('.daily-theme-card');
                const motion=matchMedia('(prefers-reduced-motion: reduce)');
                const update=(card,visible)=>card.classList.toggle('scene-running',visible&&!motion.matches&&!document.hidden);
                if('IntersectionObserver'in window){
                    const visible=new Set();
                    const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
                        if(entry.isIntersecting)visible.add(entry.target);else visible.delete(entry.target);
                        update(entry.target,entry.isIntersecting);
                    }),{threshold:.12});
                    cards.forEach(card=>observer.observe(card));
                    const sync=()=>cards.forEach(card=>update(card,visible.has(card)));
                    document.addEventListener('visibilitychange',sync);motion.addEventListener('change',sync);
                }
            }


            function weatherPresentation(condition) {
                const description = String(condition.weatherDesc?.[0]?.value || '').trim().toLowerCase();
                const code = Number(condition.weatherCode);
                const groups = [
                    [[113], description === 'clear' ? 'fa-moon' : 'fa-sun', '晴朗'],
                    [[116], 'fa-cloud-sun', '多雲時晴'],
                    [[119], 'fa-cloud', '多雲'],
                    [[122], 'fa-cloud', '陰天'],
                    [[143,248,260], 'fa-smog', '有霧'],
                    [[176], 'fa-cloud-rain', '附近有零星降雨'],
                    [[263,266,293,296], 'fa-cloud-rain', '小雨'],
                    [[299,302], 'fa-cloud-rain', '中雨'],
                    [[305,308], 'fa-cloud-showers-heavy', '大雨'],
                    [[353], 'fa-cloud-rain', '陣雨'],
                    [[356,359], 'fa-cloud-showers-heavy', '強陣雨'],
                    [[200,386,389,392,395], 'fa-cloud-bolt', '雷雨'],
                    [[179,182,185,227,230,281,284,311,314,317,320,323,326,329,332,335,338,350,362,365,368,371,374,377], 'fa-snowflake', '降雪或冰凍降水']
                ];
                const match = groups.find(([codes]) => codes.includes(code));
                if (match) return {icon:match[1], description:match[2]};
                // Descriptions are a fallback when the provider omits or adds a code.
                if (/thunder/.test(description)) return {icon:'fa-cloud-bolt', description:'雷雨'};
                if (/rain|drizzle|shower/.test(description)) return {icon:'fa-cloud-rain', description:'附近有降雨'};
                if (/snow|sleet|ice|blizzard/.test(description)) return {icon:'fa-snowflake', description:'降雪或冰凍降水'};
                if (/mist|fog/.test(description)) return {icon:'fa-smog', description:'有霧'};
                if (/partly/.test(description)) return {icon:'fa-cloud-sun', description:'多雲時晴'};
                if (/cloud|overcast/.test(description)) return {icon:'fa-cloud', description:'多雲或陰天'};
                if (/sunny|clear/.test(description)) return {icon:description==='clear'?'fa-moon':'fa-sun', description:'晴朗'};
                return {icon:'fa-cloud', description:'天氣狀況待更新'};
            }

            function setupWeather() {
                fetch('https://wttr.in/Pattaya?format=j1')
                    .then(response => response.json())
                    .then(data => {
                        const condition = data.current_condition[0];
                        const temp = condition.temp_C;
                        const weather = weatherPresentation(condition);
                        const iconClass = weather.icon;
                        const translatedDesc = weather.description;

                        document.getElementById('weather-icon').className = `fas ${iconClass} text-6xl text-sky-400`;
                        document.getElementById('weather-temp').textContent = `${temp}°C`;
                        document.getElementById('weather-desc').textContent = translatedDesc;
                    })
                    .catch(error => {
                        console.error('Error fetching weather:', error);
                        document.getElementById('weather-info').innerHTML = '<div class="text-sm text-slate-500">無法載入天氣資訊</div>';
                    });
            }


            function setupSongkranWater() {
                const canvas = document.getElementById('songkran-water');
                const hero = canvas?.closest('header');
                const ctx = canvas?.getContext('2d');
                if (!ctx || !hero) return;
                const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
                let width = 0, height = 0, visible = true, frame = 0, last = 0, clock = 0;
                let drops = [], rings = [];
                function resize() {
                    const rect = hero.getBoundingClientRect();
                    width = rect.width; height = rect.height;
                    const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
                    canvas.width = Math.round(width * ratio); canvas.height = Math.round(height * ratio);
                    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
                    drops = []; rings = [];
                }
                function makeDrop(x, y, burst = false) {
                    return { x, y, vx: (width / 2 - x) * .06 + (Math.random() - .5) * (burst ? 140 : 35),
                        vy: -(burst ? 100 + Math.random() * 110 : 75 + Math.random() * 95),
                        age: 0, life: burst ? 1.2 : 2.8, radius: 1 + Math.random() * 2.2 };
                }
                function tick(now) {
                    frame = 0;
                    if (motion.matches || !visible || document.hidden) return;
                    const dt = Math.min((now - (last || now)) / 1000, .04); last = now; clock += dt;
                    ctx.clearRect(0, 0, width, height);
                    if (clock > .18 && drops.length < (width < 640 ? 26 : 42)) {
                        const left = Math.random() < .5;
                        drops.push(makeDrop(width * (left ? .04 + Math.random() * .18 : .78 + Math.random() * .18), height * .93));
                        clock = 0;
                    }
                    drops = drops.filter(drop => {
                        drop.age += dt; drop.vy += 68 * dt; drop.x += drop.vx * dt; drop.y += drop.vy * dt;
                        if (drop.age >= drop.life) return false;
                        const opacity = Math.sin(Math.PI * drop.age / drop.life) * .6;
                        ctx.strokeStyle = 'rgba(201,247,255,' + opacity + ')'; ctx.lineWidth = 1;
                        ctx.fillStyle = 'rgba(218,250,255,' + opacity * .55 + ')';
                        ctx.beginPath(); ctx.ellipse(drop.x, drop.y, drop.radius, drop.radius * 1.6, -.25, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
                        return true;
                    });
                    rings = rings.filter(ring => {
                        ring.age += dt; if (ring.age >= 1.1) return false;
                        ctx.strokeStyle = 'rgba(199,246,255,' + .45 * (1 - ring.age / 1.1) + ')'; ctx.lineWidth = 1;
                        ctx.beginPath(); ctx.ellipse(ring.x, ring.y, 12 + ring.age * 75, 5 + ring.age * 28, 0, 0, Math.PI * 2); ctx.stroke(); return true;
                    });
                    frame = requestAnimationFrame(tick);
                }
                function sync() {
                    if (frame) cancelAnimationFrame(frame);
                    frame = 0; last = 0;
                    if (!motion.matches && visible && !document.hidden) frame = requestAnimationFrame(tick);
                    else ctx.clearRect(0, 0, width, height);
                }
                let lastSplash = 0;
                hero.addEventListener('pointerdown', event => {
                    if (motion.matches || event.target.closest('button, a') || performance.now() - lastSplash < 400) return;
                    lastSplash = performance.now();
                    const rect = hero.getBoundingClientRect();
                    const x = event.clientX - rect.left, y = event.clientY - rect.top;
                    rings.push({ x, y, age: 0 }); rings = rings.slice(-3);
                    for (let i = 0; i < 10 && drops.length < 55; i++) drops.push(makeDrop(x, y, true));
                });
                document.getElementById('splash-party').addEventListener('click', () => {
                    if (motion.matches) return;
                    for (const x of [width * .2, width * .8]) {
                        rings.push({ x, y: height * .72, age: 0 });
                        for (let i = 0; i < 24; i++) drops.push(makeDrop(x, height * .78, true));
                    }
                    drops = drops.slice(-80); rings = rings.slice(-4);
                    hero.classList.remove('water-flash');
                    requestAnimationFrame(() => hero.classList.add('water-flash'));
                });
                if ('IntersectionObserver' in window) {
                    const observer = new IntersectionObserver(entries => { visible = entries[0].isIntersecting; sync(); });
                    observer.observe(hero);
                }
                if (window.ResizeObserver) new ResizeObserver(resize).observe(hero);
                else window.addEventListener('resize', resize);
                document.addEventListener('visibilitychange', sync);
                motion.addEventListener('change', sync);
                window.addEventListener('pagehide', () => { if (frame) cancelAnimationFrame(frame); frame = 0; });
                window.addEventListener('pageshow', sync);
                resize(); sync();
            }

            function setupAnimations() {
                if (!motionAvailable) return;
                const heroTitle = document.getElementById('hero-title');
                const text = heroTitle.innerText;
                heroTitle.innerHTML = text.split('').map(char => `<span class="char">${char === ' ' ? '&nbsp;' : char}</span>`).join('');
                gsap.from(heroTitle.querySelectorAll('.char'), { duration: reduceMotion ? 0 : 1.2, y: 100, autoAlpha: 0, stagger: 0.05, ease: "back.out(1.7)" });
                gsap.from("#hero-subtitle", { duration: reduceMotion ? 0 : 1, y: 30, opacity: 0, ease: "power3.out", delay: 1 });
            }

            function setupCountdown() {
                const targetDate = new Date('2027-04-10T07:55:00+08:00').getTime();
                const interval = setInterval(() => {
                    const now = new Date().getTime();
                    const distance = targetDate - now;
                    if (distance < 0) {
                        clearInterval(interval);
                        document.getElementById('countdown').innerHTML = "<div class='col-span-4 text-2xl font-bold text-sky-600'>旅程已開始！</div>";
                        return;
                    }
                    document.getElementById('days').innerText = Math.floor(distance / (1000 * 60 * 60 * 24)).toString().padStart(2, '0');
                    document.getElementById('hours').innerText = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, '0');
                    document.getElementById('minutes').innerText = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
                    document.getElementById('seconds').innerText = Math.floor((distance % (1000 * 60)) / 1000).toString().padStart(2, '0');
                }, 1000);
            }




            function mapQuery(point) {
                return point.googleQuery || (point.lat + ',' + point.lon);
            }
            function googlePointUrl(point, zoom = 15) {
                return 'https://maps.google.com/maps?' + new URLSearchParams({hl:'zh-TW', q:mapQuery(point), z:String(zoom), output:'embed'});
            }
            function routeStops(dayId) {
                return itineraryData[dayId].route.filter(point => !point.optional && !point.mapOnly);
            }
            function googleRouteUrl(dayId) {
                const stops = routeStops(dayId);
                if (dayId === 'day5') return 'https://maps.google.com/maps?hl=zh-TW&q=Ko%20Lan%20Pattaya%20Thailand&ll=12.927,100.835&z=12&output=embed';
                // Use location-based directions rather than hand-building Google's opaque pb data.
                return 'https://maps.google.com/maps?' + new URLSearchParams({hl:'zh-TW', saddr:mapQuery(stops[0]), daddr:stops.slice(1).map(mapQuery).join(' to:'), dirflg:'d', output:'embed'});
            }
            function routeNote(dayId) {
                if (dayId === 'day6') return '整天路線顯示住宿區 → 東芭樂園 → 貓貓船 → Yu Sabay；晚上另搭 BTS 到 Phloen Chit，先逛 Big C Mahatun Plaza，經娜娜步行回 Phrom Phong。夜遊點可單獨點選定位，步行連結在晚間行程內。';
                return dayId === 'day5' ? '格蘭島行程以海島位置圖呈現；船程依一日團安排。點選左側景點可查看各站，使用地圖原生資訊卡開啟 Google 地圖。' : '點選景點可查看店家位置，使用地圖原生資訊卡的連結或路線按鈕開啟 Google 地圖。住宿及區域位置僅供參考。';
            }
            function renderDayRoute(dayId, dayData) {
                return '<section id="'+dayId+'-map-anchor" class="day-route-spread" aria-label="當日 Google 地圖"><div class="route-copy"><p class="editorial-kicker">今日小路線</p><h3>今天的景點，放在同一張圖。</h3><p class="small-note">點選景點，在右側 Google 地圖定位。</p><ol class="route-stop-list">'+dayData.route.map((p,i)=>'<li><button type="button" class="route-stop" data-day="'+dayId+'" data-index="'+i+'" aria-pressed="false"><span>'+(i+1)+'</span>'+p.name+(p.mapOnly?'<small>夜遊</small>':p.optional?'<small>備選</small>':p.approx?'<small>區域</small>':'')+'</button></li>').join('')+'</ol><p class="route-stop-note" id="route-note-'+dayId+'" aria-live="polite">'+routeNote(dayId)+'</p><button class="route-reset" type="button" data-day="'+dayId+'">看整天路線 ↺</button></div><div class="route-visual google-route" id="route-visual-'+dayId+'"><iframe class="google-map-frame" id="route-map-'+dayId+'" title="4/'+(Number(dayId.slice(3))+9)+' 行程 Google 地圖" data-route-day="'+dayId+'" data-src="'+googleRouteUrl(dayId)+'" loading="lazy" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe><p class="route-map-caption" id="map-caption-'+dayId+'">Google Maps · '+dayData.route.length+' 個地點</p></div><div class="map-feedback"><p id="map-status-'+dayId+'" role="status">點選景點，查看位置。</p><a id="map-external-'+dayId+'" href="'+externalDayMap(dayId)+'" target="_blank" rel="noopener noreferrer">在 Google 地圖中開啟 ↗</a><button type="button" data-map-retry="'+dayId+'">重新載入地圖</button></div></section>';
            }
            function setupDayRouteMap(dayId) {
                const frame=document.getElementById('route-map-'+dayId);
                if(frame && !frame.getAttribute('src'))loadRouteMap(dayId);
            }
            function setupRouteControls() {
                document.querySelectorAll('.route-stop').forEach(button=>button.addEventListener('click',()=>{
                    const dayId=button.dataset.day,index=Number(button.dataset.index),point=itineraryData[dayId].route[index];
                    button.closest('.day-route-spread').querySelectorAll('.route-stop').forEach(control=>control.setAttribute('aria-pressed',String(control===button)));
                    loadRouteMap(dayId,index);
                    document.getElementById('route-note-'+dayId).textContent=point.note||point.name;
                    document.getElementById('map-caption-'+dayId).textContent=(index+1)+'. '+point.name;
                }));
                document.querySelectorAll('.route-reset').forEach(button=>button.addEventListener('click',()=>{
                    const dayId=button.dataset.day;loadRouteMap(dayId);
                    button.closest('.day-route-spread').querySelectorAll('.route-stop').forEach(control=>control.setAttribute('aria-pressed','false'));
                    document.getElementById('route-note-'+dayId).textContent=routeNote(dayId);
                    document.getElementById('map-caption-'+dayId).textContent='Google Maps · '+itineraryData[dayId].route.length+' 個地點';
                }));
                document.querySelectorAll('[data-map-retry]').forEach(button=>button.addEventListener('click',()=>loadRouteMap(button.dataset.mapRetry,selectedRoutes[button.dataset.mapRetry])));
            }

            function itemLinks(item) {
                if(itemLinkCache.has(item))return itemLinkCache.get(item);
                const template=document.createElement('template');template.innerHTML=item.details;
                const map=template.content.querySelector('a[href*="google.com/maps"],a[href*="maps.app.goo.gl"],a[href*="maps.google.com"]');
                const primary=map?map.cloneNode(true):null;
                if(primary){primary.className='trip-link primary-map-link';map.remove();}
                const result={details:template.innerHTML,primary:primary?.outerHTML || ''};
                itemLinkCache.set(item,result);return result;
            }
            function renderItemDetails(item) { return itemLinks(item).details; }
            function renderPrimaryAction(item) { return itemLinks(item).primary; }

            function markPrice(text) {
                return text.replace(/(?:NT\$\s*|THB\s*|฿\s*)[\d,]+(?:\.\d+)?|[\d,]+(?:\.\d+)?\s*THB/g, value => '<mark class="cost-tag">' + value + '</mark>');
            }

            function generateDailySections() {
                let allSectionsHtml = Object.keys(itineraryData).map(dayId => {
                    const dayData = itineraryData[dayId];
                    const timelineHtml = dayData.items.map((item,index) => `
                        ${item.chapter ? `<header class="day-chapter"><div><span>${item.chapter.label}</span><small>${item.chapter.time}</small></div><h3>${item.chapter.title}</h3></header>` : ''}
                        <article id="${dayId}-item-${index}" data-kind="${item.kind}" class="timeline-item relative mb-8 type-${item.kind}">
                            <div class="itinerary-margin"><span class="trip-time">${item.time}</span><span class="trip-type">${({transport:'交通・移動',dining:'用餐',night:'晚間活動',activity:'景點・體驗'})[item.kind]}</span></div>
                            <div class="trip-card ${item.photo ? 'trip-with-photo' : ''}">
                                <div class="trip-copy"><div class="trip-card-heading">
                                    <h3>${item.title}</h3><p class="trip-summary">${markPrice(item.summary || '')}</p>${renderPrimaryAction(item)}${item.notice ? `<aside class="trip-notice"><strong><i class="fas fa-circle-exclamation" aria-hidden="true"></i> 注意事項</strong><p>${item.notice}</p></aside>` : ''}
                                </div>
                                ${item.disclosureLabel ? `<details class="trip-more" id="${dayId}-details-${index}"><summary>${item.disclosureLabel} <span aria-hidden="true">＋</span></summary><div class="trip-details">${renderItemDetails(item)}</div></details>` : `<div class="trip-inline">${renderItemDetails(item)}</div>`}</div>
                                ${item.photo ? `<figure class="itinerary-photo scene-${item.photo.scene}" id="${dayId}-photo-${index}"><button type="button" class="photo-expand" aria-expanded="false" aria-controls="${dayId}-image-${index}" aria-label="${escapeHtml(item.photo.alt)}；展開或收回照片">${responsiveImage(item.photo.file,item.photo.alt, '(max-width:900px) 320px, 320px',`id="${dayId}-image-${index}"`)}<span class="photo-action">展開照片</span></button><figcaption>${item.photo.caption}</figcaption></figure>` : ''}
                            </div>
                        </article>
                    `).join('');

                    return `
                        <section id="${dayId}" class="content-section" style="display: none; opacity: 0;">
                            <div class="day-editorial-heading"><div class="day-folio"><span>Day</span><b>${String(Number(dayId.slice(3))).padStart(2,'0')}</b></div><div><p class="day-date">2027/4/${Number(dayId.slice(3)) + 9} · 週${['六','日','一','二','三','四','五','六'][Number(dayId.slice(3)) - 1]}</p><h2>${dayData.title}</h2><p class="day-description">${dayData.intro}</p><div class="day-places">${dayData.highlights.map(h => `<span>${h.text}</span>`).join('')}</div></div></div>
                            <div class="day-tools"><button type="button" data-direct-timeline="${dayId}">直接看時間表 ↓</button><label class="reading-preferences" style="border:0;margin:0;padding:0"><input type="checkbox" data-quick-mode>快速查行程</label></div>
                            <div class="daily-theme-card water-photo cursor-pointer relative overflow-hidden mb-12 scene-${dayId==='day5'?'sea':dayId==='day4'?'water':['day1','day7'].includes(dayId)?'night':'day'}"><div class="day-photo-image" style="--photo-position:${dayId==='day3'?'center 55%':'center'}" aria-hidden="true">${responsiveImage(dayData.themeImage,'','(max-width:767px) 100vw, 1180px')}</div>
                                <span class="photo-day-caption">${dayData.photoCaption}</span><button aria-expanded="false" aria-controls="timeline-${dayId}" class="view-timeline-btn">閱讀今日行程 <i class="fas fa-arrow-down" aria-hidden="true"></i></button>
                            </div>
                            ${renderDayRoute(dayId, dayData)}
                            <div id="timeline-${dayId}" class="timeline-container hidden relative pl-10 sm:pl-12">
                                <div class="itinerary-reading-heading"><p class="editorial-kicker">今日行程</p><h3>照著時間，慢慢走。</h3><p>時間皆為泰國當地時間；需要的訂票與交通細節，再點開看。</p><p class="reading-status" id="reading-status-${dayId}">共 ${dayData.items.length} 段行程 · 往下慢慢看</p></div>
                                <div class="timeline-line"></div>
                                <div class="timeline-line-progress"></div>
                                ${timelineHtml}
                                ${renderDayTurner(dayId)}
                            </div>
                        </section>`;
                }).join('');
                dailySectionsContainer.innerHTML = allSectionsHtml;
                Object.keys(itineraryData).forEach(day=>{
                    if(tripState.timelines?.[day] || tripState.quick || tripDayAt()===day)setTimeline(day,true);
                });
                document.querySelectorAll('.water-photo').forEach(photo => {
                    photo.addEventListener('pointermove', event => {
                        const rect = photo.getBoundingClientRect();
                        photo.style.setProperty('--water-x', ((event.clientX - rect.left) / rect.width * 100) + '%');
                        photo.style.setProperty('--water-y', ((event.clientY - rect.top) / rect.height * 100) + '%');
                    });
                });
                document.querySelectorAll('.trip-more').forEach(detail => detail.addEventListener('toggle', () => {
                    if (motionAvailable) ScrollTrigger.refresh();
                    window.dispatchEvent(new Event('itinerary:layout'));
                }));

                document.querySelectorAll('.daily-theme-card').forEach(card=>card.addEventListener('click',()=>{
                    const day=card.closest('.content-section').id;
                    const timeline=document.getElementById('timeline-'+day);
                    const open=timeline.classList.contains('hidden');
                    setTimeline(day,open);
                    scrollToPart(open?timeline:card);
                }));
            }

            function renderDayTurner(dayId) {
                const days = Object.keys(itineraryData);
                const index = days.indexOf(dayId);
                const previous = index === 0 ? 'overview' : days[index - 1];
                const next = index === days.length - 1 ? 'overview' : days[index + 1];
                const label = id => id === 'overview' ? '旅程總覽' : itineraryData[id].title;
                const date = id => id === 'overview' ? '回到總覽' : '4/' + (Number(id.slice(3)) + 9);
                return `<nav class="day-turner" aria-label="前後日期"><a href="#${previous}" data-turn-day="${previous}"><span>← ${date(previous)}</span><strong>${label(previous)}</strong></a><a href="#${next}" data-turn-day="${next}"><span>${date(next)} →</span><strong>${label(next)}</strong></a></nav>`;
            }

            function setupDayShortcuts() {
                document.querySelectorAll('[data-turn-day]').forEach(link => link.addEventListener('click', event => {
                    event.preventDefault();
                    navigateDay(link.dataset.turnDay,{focus:true});
                }));
                document.querySelectorAll('.day-editorial-heading h2, .overview-opening h2').forEach(heading => heading.setAttribute('tabindex','-1'));
                navButtons.forEach((button,index) => button.addEventListener('keydown',event => {
                    if (event.altKey || event.ctrlKey || event.metaKey) return;
                    const targets = {ArrowLeft:index - 1, ArrowRight:index + 1, Home:0, End:navButtons.length - 1};
                    if (!Object.hasOwn(targets,event.key)) return;
                    event.preventDefault();
                    if (isAnimating) return;
                    const next = navButtons[Math.max(0,Math.min(navButtons.length - 1,targets[event.key]))];
                    next.focus({preventScroll:true});
                    next.click();
                }));
            }

            function setupReadingExperience() {
                const nav=document.querySelector('.date-navigation');
                const dock=document.getElementById('mobile-trip-bar');
                const motion=matchMedia('(prefers-reduced-motion: reduce)');
                let frame=0, needsMeasure=true, cache=null, active=null, saveTimer;
                function measure() {
                    const section=document.getElementById(currentActiveSectionId);
                    const timeline=section?.querySelector('.timeline-container');
                    cache=null;
                    if(!timeline || timeline.classList.contains('hidden'))return;
                    const y=window.scrollY;
                    const rect=timeline.getBoundingClientRect();
                    const items=[...timeline.querySelectorAll('.timeline-item')].map(el=>({el,top:el.getBoundingClientRect().top+y}));
                    cache={top:rect.top+y,height:rect.height,navHeight:nav.offsetHeight,items,status:document.getElementById('reading-status-'+currentActiveSectionId)};
                }
                function save() {
                    clearTimeout(saveTimer);
                    if(isAnimating || !Object.hasOwn(itineraryData,currentActiveSectionId))return;
                    const readingTimeline=cache && window.scrollY+cache.navHeight+160>=cache.top;
                    const selected=readingTimeline?cache?.items.find(item=>item.el===active):null;
                    const section=document.getElementById(currentActiveSectionId);
                    const map=section.querySelector('.day-route-spread');
                    const anchor=!selected && map.getBoundingClientRect().top<window.innerHeight*.4 ? map : section;
                    const top=selected?selected.top:window.scrollY+anchor.getBoundingClientRect().top;
                    tripState.position={day:currentActiveSectionId,item:selected?.el.id || null,anchor:anchor.id,offset:window.scrollY-top};
                    writeTripState();updateResumeLink();
                }
                function update() {
                    frame=0;
                    if(needsMeasure){measure();needsMeasure=false;}
                    const section=document.getElementById(currentActiveSectionId);
                    const isDay=Boolean(itineraryData[currentActiveSectionId]);
                    const visible=isDay&&section&&section.getBoundingClientRect().top<nav.offsetHeight+80;
                    dock.hidden=!visible;
                    document.body.classList.toggle('has-trip-dock',Boolean(visible));
                    if(isDay)document.getElementById('mobile-next').textContent=currentActiveSectionId==='day8'?'總覽':'下一天';
                    if(!cache){nav.style.setProperty('--reading-progress','0');if(active){active.classList.remove('is-reading');active.removeAttribute('data-reading');active=null;}return;}
                    const cursor=window.scrollY+cache.navHeight+48;
                    const total=Math.max(1,cache.height-(window.innerHeight-cache.navHeight-48));
                    const progress=Math.min(1,Math.max(0,(cursor-cache.top)/total));
                    nav.style.setProperty('--reading-progress',String(progress));
                    const focus=window.scrollY+Math.min(window.innerHeight*.4,cache.navHeight+220);
                    let next=cache.items[0]?.el;
                    for(const item of cache.items){if(item.top<=focus)next=item.el;else break;}
                    if(next!==active){
                        if(active){active.classList.remove('is-reading');active.removeAttribute('data-reading');}
                        active=next;
                        if(active){active.classList.add('is-reading');active.setAttribute('data-reading','閱讀中');}
                    }
                    const index=cache.items.findIndex(item=>item.el===active)+1;
                    const text='閱讀第 '+index+'／'+cache.items.length+' 段 · '+Math.round(progress*100)+'%';
                    if(cache.status.textContent!==text)cache.status.textContent=text;
                }
                function schedule(measureAgain=false){needsMeasure=needsMeasure||measureAgain;if(!frame)frame=requestAnimationFrame(update);}
                window.addEventListener('scroll',()=>{schedule();clearTimeout(saveTimer);saveTimer=setTimeout(save,450);},{passive:true});
                window.addEventListener('resize',()=>schedule(true));
                window.addEventListener('itinerary:layout',()=>schedule(true));
                window.addEventListener('itinerary:save',save);
                if('IntersectionObserver'in window){
                    const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
                        if(!entry.isIntersecting)return;
                        if(!motion.matches)entry.target.classList.add('entry-reveal');
                        observer.unobserve(entry.target);
                    }),{threshold:.08});
                    document.querySelectorAll('.timeline-item').forEach(item=>observer.observe(item));
                }
                document.querySelectorAll('img').forEach(img=>img.addEventListener('load',()=>schedule(true),{once:true}));
                document.fonts?.ready.then(()=>schedule(true));
                motion.addEventListener('change',()=>{if(motion.matches)document.querySelectorAll('.entry-reveal').forEach(item=>item.classList.remove('entry-reveal'));});
                schedule(true);
            }

            function centerDateButton(button, behavior = reduceMotion ? 'auto' : 'smooth') {
                if (!button || !dateStrip) return;
                const stripRect = dateStrip.getBoundingClientRect();
                const buttonRect = button.getBoundingClientRect();
                const left = dateStrip.scrollLeft + buttonRect.left - stripRect.left - (dateStrip.clientWidth - buttonRect.width) / 2;
                const max = Math.max(0, dateStrip.scrollWidth - dateStrip.clientWidth);
                dateStrip.scrollTo({ left: Math.min(max, Math.max(0, left)), behavior });
            }

            function setupDateNavigation() {
                const firstArrow = document.getElementById('date-first');
                const lastArrow = document.getElementById('date-last');
                let scrollFrame = 0;
                function updateEdges() {
                    scrollFrame = 0;
                    const max = Math.max(0, dateStrip.scrollWidth - dateStrip.clientWidth);
                    firstArrow.disabled = dateStrip.scrollLeft <= 2;
                    lastArrow.disabled = dateStrip.scrollLeft >= max - 2;
                }
                function syncSizing() {
                    const first = navButtons[0];
                    const active = document.querySelector('.nav-btn[aria-current="page"]') || first;
                    centerDateButton(active, 'auto');
                    updateEdges();
                    syncDateIndicator(false);
                }
                firstArrow.addEventListener('click', () => dateStrip.scrollTo({ left: 0, behavior: reduceMotion ? 'auto' : 'smooth' }));
                lastArrow.addEventListener('click', () => dateStrip.scrollTo({ left: dateStrip.scrollWidth - dateStrip.clientWidth, behavior: reduceMotion ? 'auto' : 'smooth' }));
                dateStrip.addEventListener('scroll', () => { if (!scrollFrame) scrollFrame = requestAnimationFrame(updateEdges); }, { passive: true });
                syncSizing();
                if (window.ResizeObserver) new ResizeObserver(syncSizing).observe(dateStrip);
                else window.addEventListener('resize', syncSizing);
                document.fonts?.ready.then(syncSizing);
            }

            function setupTabSwitching() {
                navButtons.forEach(button=>button.addEventListener('click',()=>{
                    const target=button.dataset.target;
                    if(!isAnimating && target!==currentActiveSectionId)navigateDay(target);
                }));
            }

            function switchTab(targetId, shouldScroll = true, onCompleteCallback = () => {}) {
                const oldSection = currentActiveSectionId ? document.getElementById(currentActiveSectionId) : null;
                const newSection = document.getElementById(targetId);
                if (!newSection) { onCompleteCallback(); return; }

                const finishSwitch = () => {
                    currentActiveSectionId = targetId;
                    syncDateIndicator(false);
                    if (motionAvailable) ScrollTrigger.refresh();
                    if (shouldScroll) {
                        try { history.replaceState(null, '', '#' + targetId); } catch {}
                    }
                    window.dispatchEvent(new Event('itinerary:layout'));
                    onCompleteCallback();
                };
                if (!motionAvailable) {
                    if (oldSection && oldSection !== newSection) oldSection.style.display = 'none';
                    newSection.style.display = 'block';
                    newSection.style.opacity = '1';
                    navButtons.forEach(btn => {
                        const active = btn.dataset.target === targetId;
                        if (active) { btn.setAttribute('aria-current','page'); centerDateButton(btn,'auto'); }
                        else btn.removeAttribute('aria-current');
                        btn.classList.toggle('bg-sky-500',active);
                        btn.classList.toggle('text-white',active);
                        btn.classList.toggle('bg-sky-100',!active);
                        btn.classList.toggle('text-sky-800',!active);
                    });
                    syncDateIndicator();
                    setupDayRouteMap(targetId);
                    if (shouldScroll) window.scrollTo({top:window.scrollY + newSection.getBoundingClientRect().top - document.querySelector('nav').offsetHeight - 32,behavior:'auto'});
                    finishSwitch();
                    return;
                }
                const tl = gsap.timeline({ onComplete: finishSwitch });
                if (oldSection) {
                    tl.to(oldSection, { duration: reduceMotion ? 0 : 0.12, opacity: 0, ease: 'power2.in', onComplete: () => { oldSection.style.display = 'none'; } });
                }

                tl.add(() => {
                    navButtons.forEach(btn => {
                        const isTarget = btn.dataset.target === targetId;
                        if (isTarget) {
                            btn.setAttribute('aria-current', 'page');
                            centerDateButton(btn, shouldScroll && !reduceMotion ? 'smooth' : 'auto');
                        } else btn.removeAttribute('aria-current');
                        btn.classList.toggle('bg-sky-500', isTarget);
                        btn.classList.toggle('text-white', isTarget);
                        btn.classList.toggle('bg-sky-100', !isTarget);
                        btn.classList.toggle('text-sky-800', !isTarget);
                    });
                    syncDateIndicator();
                });

                tl.set(newSection, { display: 'block', opacity: 0 })
                  .to(newSection, {
                    duration: reduceMotion ? 0 : 0.22,
                    opacity: 1,
                    ease: 'power2.out',
                    onStart: () => {
                        if(!reduceMotion && newSection.querySelector('.day-editorial-heading')?.animate)newSection.querySelector('.day-editorial-heading').animate([{opacity:.3,transform:'translateY(8px)'},{opacity:1,transform:'translateY(0)'}],{duration:280,easing:'ease-out'});
                        requestAnimationFrame(() => setupDayRouteMap(targetId));
                        gsap.from(newSection.querySelectorAll('.daily-theme-card'), { opacity: 0, y: 16, duration: reduceMotion ? 0 : 0.3, ease: 'power3.out' });
                    }
                });

                if (shouldScroll) {
                    tl.to(window, { duration: reduceMotion ? 0 : 0.35, ease: 'power2.inOut', scrollTo: { y: newSection, offsetY: document.querySelector('nav').offsetHeight + 32 } }, "-=0.2");
                }
            }

            function setupScrollToTop() {
                const btn = document.getElementById('scrollToTopBtn');
                window.addEventListener('scroll', () => {
                    const isVisible = window.scrollY > 300;
                    btn.classList.toggle('opacity-0', !isVisible);
                    btn.classList.toggle('invisible', !isVisible);
                });
                btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' }));
            }

            function setupChart() {
                if (!window.Chart) return;
                const ctx = document.getElementById('budgetChart').getContext('2d');
                const budgetChart = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: ['4/10 (六)', '4/11 (日)', '4/12 (一)', '4/13 (二)', '4/14 (三)', '4/15 (四)', '4/16 (五)', '4/17 (六)'],
                        datasets: [{
                            label: '預估人均支出 (THB)',
                            data: [750, null, null, null, null, 2500, 3500, 800],
                            backgroundColor: 'rgba(14, 165, 233, 0.6)',
                            borderColor: 'rgba(14, 165, 233, 1)',
                            borderWidth: 1, borderRadius: 5,
                            hoverBackgroundColor: 'rgba(2, 132, 199, 0.8)'
                        }]
                    },
                    options: {
                        animation: false, responsive: true, maintainAspectRatio: false,
                        scales: { y: { beginAtZero: true }, x: { grid: { display: false } } },
                        plugins: { legend: { display: false } }
                    }
                });
                document.querySelector('.budget-fold').addEventListener('toggle', event => { if (event.currentTarget.open) budgetChart.resize(); });
                if (motionAvailable) ScrollTrigger.create({
                    trigger: "#budgetChart", start: "top 80%",
                    onEnter: () => { budgetChart.options.animation = { duration: reduceMotion ? 0 : 1500, easing: 'easeOutBounce' }; budgetChart.update(); },
                    once: true
                });
            }
        });
