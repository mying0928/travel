        let reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change',event=>{reduceMotion=event.matches;});

        document.addEventListener('DOMContentLoaded', function () {
            // --- DOM Elements ---
            const navButtons = document.querySelectorAll('.nav-btn');
            const dateStrip = document.getElementById('date-strip');
            const dateTrack = document.getElementById('date-track');
            const dailySectionsContainer = document.getElementById('daily-sections-container');
            let currentActiveSectionId = null;
            let isAnimating = false;
            let navigationAnimations = [];
            let activeRoute = '';
            let restoringHistory = false;
            let navigationSerial = 0;
            let frontCostsRendered = false;
            const mapTimers = {};
            const selectedRoutes = {};
            const itemLinkCache = new WeakMap();
            const imageAssets = {"images/bkk-departure-hall.jpg":{"width":2048,"height":1536,"variants":[{"file":"images/optimized/bkk-departure-hall-640.webp","width":640},{"file":"images/optimized/bkk-departure-hall-1280.webp","width":1280},{"file":"images/optimized/bkk-departure-hall-1920.webp","width":1920}]},"images/dam-option-4.jpg":{"width":1366,"height":683,"variants":[{"file":"images/optimized/dam-option-4-640.webp","width":640},{"file":"images/optimized/dam-option-4-1280.webp","width":1280},{"file":"images/optimized/dam-option-4-1366.webp","width":1366}]},"images/dam-pattaya-fire-panorama.jpg":{"width":1295,"height":862,"variants":[{"file":"images/optimized/dam-pattaya-fire-panorama-640.webp","width":640},{"file":"images/optimized/dam-pattaya-fire-panorama-1280.webp","width":1280},{"file":"images/optimized/dam-pattaya-fire-panorama-1295.webp","width":1295}]},"images/hero-pattaya-songkran.jpg":{"width":2048,"height":1151,"variants":[{"file":"images/optimized/hero-pattaya-songkran-640.webp","width":640},{"file":"images/optimized/hero-pattaya-songkran-1280.webp","width":1280},{"file":"images/optimized/hero-pattaya-songkran-1920.webp","width":1920}]},"images/house-of-benedict.jpg":{"width":1200,"height":800,"variants":[{"file":"images/optimized/house-of-benedict-640.webp","width":640},{"file":"images/optimized/house-of-benedict-1200.webp","width":1200}]},"images/hua-takhe-cat-boat.webp":{"width":2000,"height":1333,"variants":[{"file":"images/optimized/hua-takhe-cat-boat-640.webp","width":640},{"file":"images/optimized/hua-takhe-cat-boat-1280.webp","width":1280},{"file":"images/optimized/hua-takhe-cat-boat-1920.webp","width":1920}]},"images/khao-kheow-elephant.jpg":{"width":750,"height":469,"variants":[{"file":"images/optimized/khao-kheow-elephant-640.webp","width":640},{"file":"images/optimized/khao-kheow-elephant-750.webp","width":750}]},"images/khao-kheow-penguin-parade.jpg":{"width":1200,"height":900,"variants":[{"file":"images/optimized/khao-kheow-penguin-parade-640.webp","width":640},{"file":"images/optimized/khao-kheow-penguin-parade-1200.webp","width":1200}]},"images/khao-kheow-zoo.jpg":{"width":800,"height":533,"variants":[{"file":"images/optimized/khao-kheow-zoo-640.webp","width":640},{"file":"images/optimized/khao-kheow-zoo-800.webp","width":800}]},"images/koh-larn.jpg":{"width":1700,"height":510,"variants":[{"file":"images/optimized/koh-larn-640.webp","width":640},{"file":"images/optimized/koh-larn-1280.webp","width":1280},{"file":"images/optimized/koh-larn-1700.webp","width":1700}]},"images/lof-land.jpg":{"width":640,"height":960,"variants":[{"file":"images/optimized/lof-land-640.webp","width":640}]},"images/moo-deng.jpg":{"width":771,"height":1024,"variants":[{"file":"images/optimized/moo-deng-640.webp","width":640},{"file":"images/optimized/moo-deng-771.webp","width":771}]},"images/nong-nooch-garden.jpg":{"width":2048,"height":1535,"variants":[{"file":"images/optimized/nong-nooch-garden-640.webp","width":640},{"file":"images/optimized/nong-nooch-garden-1280.webp","width":1280},{"file":"images/optimized/nong-nooch-garden-1920.webp","width":1920}]},"images/phra-tamnak-viewpoint-day.jpg":{"width":700,"height":600,"variants":[{"file":"images/optimized/phra-tamnak-viewpoint-day-640.webp","width":640},{"file":"images/optimized/phra-tamnak-viewpoint-day-700.webp","width":700}]},"images/riverside-carnival-cruise.jpg":{"width":1500,"height":1001,"variants":[{"file":"images/optimized/riverside-carnival-cruise-640.webp","width":640},{"file":"images/optimized/riverside-carnival-cruise-1280.webp","width":1280},{"file":"images/optimized/riverside-carnival-cruise-1500.webp","width":1500}]},"images/runway-night-market.jpg":{"width":900,"height":650,"variants":[{"file":"images/optimized/runway-night-market-640.webp","width":640},{"file":"images/optimized/runway-night-market-900.webp","width":900}]},"images/seafood-station.jpg":{"width":1536,"height":2048,"variants":[{"file":"images/optimized/seafood-station-640.webp","width":640},{"file":"images/optimized/seafood-station-1280.webp","width":1280},{"file":"images/optimized/seafood-station-1536.webp","width":1536}]},"images/sky-gallery-sunset.jpg":{"width":1200,"height":800,"variants":[{"file":"images/optimized/sky-gallery-sunset-640.webp","width":640},{"file":"images/optimized/sky-gallery-sunset-1200.webp","width":1200}]},"images/sky-wide-exit.webp":{"width":1295,"height":971,"variants":[{"file":"images/optimized/sky-wide-exit-640.webp","width":640},{"file":"images/optimized/sky-wide-exit-1280.webp","width":1280},{"file":"images/optimized/sky-wide-exit-1295.webp","width":1295}]},"images/sky-wide-tandem.webp":{"width":1295,"height":971,"variants":[{"file":"images/optimized/sky-wide-tandem-640.webp","width":640},{"file":"images/optimized/sky-wide-tandem-1280.webp","width":1280},{"file":"images/optimized/sky-wide-tandem-1295.webp","width":1295}]},"images/songkran-water-splash.jpg":{"width":1920,"height":1080,"variants":[{"file":"images/optimized/songkran-water-splash-640.webp","width":640},{"file":"images/optimized/songkran-water-splash-1280.webp","width":1280},{"file":"images/optimized/songkran-water-splash-1920.webp","width":1920}]},"images/zama-skybar.webp":{"width":1200,"height":801,"variants":[{"file":"images/optimized/zama-skybar-640.webp","width":640},{"file":"images/optimized/zama-skybar-1200.webp","width":1200}]},"images/真理寺.jpg":{"width":1600,"height":1147,"variants":[{"file":"images/optimized/真理寺-640.webp","width":640},{"file":"images/optimized/真理寺-1280.webp","width":1280},{"file":"images/optimized/真理寺-1600.webp","width":1600}]},"images/bangkok-city-link-deluxe-king.jpg":{"width":1500,"height":1000,"variants":[{"file":"images/optimized/bangkok-city-link-deluxe-king-640.webp","width":640},{"file":"images/optimized/bangkok-city-link-deluxe-king-1280.webp","width":1280}]}};

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
                "details": "<div class=\"detail-copy\"><p>4/10（六）TG637 自桃園第 1 航廈出發，飛行 3 小時 45 分鐘；台灣比泰國快 1 小時。</p></div><div class=\"detail-copy\"><p>機票費用：每人 NT$12,294；四人 NT$49,176，整趟只計一次。</p></div>",
                "summary": "07:55 起飛、10:40 抵達 BKK，抵達後改用泰國時間。",
                "notice": "航班時間為各地當地時間；抵達曼谷後，行程一律使用泰國時間。",
                "kind": "transport",
                "disclosureLabel": "",
                "id": "s-a2a077bc48",
                "routeIndices": [
                    0
                ],
                "startMinutes": 415
            },
            {
                "time": "10:40–11:10",
                "title": "下機・前往入境區",
                "icon": "fa-person-walking-luggage",
                "details": "<div class=\"detail-copy\"><p>10:40 為航班抵達時間；遠端登機門或接駁可能延長移動時間。</p></div>",
                "summary": "抵達後預留約 30 分鐘下機與步行。",
                "notice": "",
                "kind": "transport",
                "disclosureLabel": "",
                "id": "s-e692da9752",
                "routeIndices": [
                    0
                ]
            },
            {
                "time": "11:10–12:10",
                "title": "入境・領行李・海關",
                "icon": "fa-passport",
                "details": "<div class=\"detail-copy\"><p>先入境審查，再領行李、通過海關。行李卸載與入境排隊時間可能重疊；排程以航班準點及一般人潮估算。</p></div>",
                "summary": "約 60 分鐘辦理手續，整體出機場抓 1.5～2 小時。",
                "notice": "抵達至出關約抓 1.5～2 小時，排隊與行李時間可能變動。",
                "kind": "transport",
                "disclosureLabel": "",
                "id": "s-46680b4569",
                "routeIndices": [
                    0
                ]
            },
            {
                "time": "12:10–12:30",
                "title": "與司機會合",
                "icon": "fa-car",
                "details": "<div class=\"detail-copy\"><p>補水、洗手間並聯絡司機；提供 TG637 航班，請司機追蹤實際抵達時間。</p></div>",
                "summary": "預計 12:30 上車，集合點依司機訊息。",
                "notice": "",
                "kind": "transport",
                "disclosureLabel": "",
                "id": "s-34d03e99d2",
                "routeIndices": [
                    0
                ]
            },
            {
                "time": "12:30–13:30（估）",
                "title": "BKK → 春武里 LOF LAND",
                "summary": "出關後包車前往 LOF LAND，先抓約 1～1.5 小時車程。",
                "details": "<div class=\"detail-copy\"><p>路線：BKK → LOF LAND 停留 2 小時 → 芭達雅海灘路附近民宿。</p><p><strong>四人包車總價 <mark class=\"cost-tag\">1,800 THB</mark>，平均每人 <mark class=\"cost-tag\">450 THB</mark>。</strong></p><ul><li>BKK → 芭達雅機場接送：<mark class=\"cost-tag\">1,300 THB</mark>／車（四人）。</li><li>LOF LAND 景點停留加價：<mark class=\"cost-tag\">500 THB</mark>。</li></ul><p>此為你提供的整段接送報價，含上述停留加價；LOF LAND 門票及晚間市區叫車另計。</p></div><div class=\"trip-links\"><a class=\"trip-link\" href=\"https://maps.app.goo.gl/FmaH19S7VuRyycdq8\" target=\"_blank\" rel=\"noopener noreferrer\" aria-label=\"LOF LAND 地圖（另開分頁）\">LOF LAND 地圖<span aria-hidden=\"true\">↗</span></a></div>",
                "kind": "transport",
                "icon": "fa-car",
                "notice": "以約 12:30 上車估算；出關或交通延後時，後續行程同步順延。",
                "disclosureLabel": "接送路線與包車費用",
                "id": "s-95e9a46204",
                "routeIndices": [
                    1
                ],
                "needsBooking": true
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
                },
                "id": "s-7361eefacf",
                "routeIndices": [
                    1
                ],
                "needsBooking": true
            },
            {
                "time": "15:30–17:30（估）",
                "title": "LOF LAND → 民宿・入住盥洗換裝",
                "summary": "LOF LAND 結束後搭原包車回民宿，辦理入住、放行李與盥洗換裝，再出發去 DAM。",
                "details": "<div class=\"detail-copy\"><p>此段車程抓約 1～1.5 小時，費用已計入整段包車 1,800 THB，不另重複加總。</p></div><div class=\"detail-copy\"><p>依民宿約定辦理入住。這段約 30～60 分鐘，優先留給盥洗換裝；午餐可在機場上車前簡單解決或先準備輕食。</p></div><div class=\"detail-copy\"><p><strong>芭達雅住宿：4/10 入住、4/15 退房，共 5 晚。</strong>每人 NT$3,968，四人 NT$15,872。</p><p>地址：88 Soi Pattayasaisong 11, Pattaya City, 春武里 20150, 泰國</p></div><div class=\"trip-links\"><a class=\"trip-link\" href=\"https://www.google.com/maps/search/?api=1&amp;query=88+Soi+Pattayasaisong+11+Pattaya+20150\" target=\"_blank\" rel=\"noopener noreferrer\">住宿地址地圖</a></div>",
                "kind": "transport",
                "icon": "fa-car",
                "notice": "加入 LOF LAND 後，下午休息時間較短；若晚到，先放行李再前往晚餐。",
                "disclosureLabel": "",
                "id": "s-7d521d25bb",
                "routeIndices": [
                    2
                ]
            },
            {
                "time": "17:30–18:15（估）",
                "title": "海灘路 → DAM Pattaya",
                "summary": "叫車前往 DAM，目標 18:15 左右入座。",
                "details": "<div class=\"detail-copy\"><p>預留約 45 分鐘叫車、交通與找入口；地址依 Klook 憑證確認。此段市區車資另計。</p></div><div class=\"trip-links\"><a class=\"trip-link\" href=\"https://www.google.com/maps/search/?api=1&amp;query=DAM+Pattaya\" target=\"_blank\" rel=\"noopener noreferrer\" aria-label=\"DAM Pattaya 地圖（另開分頁）\">DAM Pattaya 地圖<span aria-hidden=\"true\">↗</span></a></div>",
                "kind": "transport",
                "icon": "fa-car",
                "notice": "",
                "disclosureLabel": "",
                "id": "s-ead83eefec",
                "routeIndices": [
                    3
                ]
            },
            {
                "time": "18:15–19:30",
                "title": "DAM 海濱晚餐",
                "icon": "fa-utensils",
                "details": "<div class=\"detail-copy\"><p>先報到入座、享用晚餐，再欣賞火舞。四人前排方案費用 <strong><mark class=\"cost-tag\">NT$1,933</mark>／四人</strong>，平均 <strong><mark class=\"cost-tag\">NT$483.25</mark>／人</strong>。第一排座位與餐飲內容依方案及訂單確認；額外加點另計。</p></div><div class=\"trip-links\"><a class=\"trip-link\" href=\"https://www.klook.com/zh-TW/activity/186411-dam-beach-fireshow-pattaya/\" target=\"_blank\" rel=\"noopener noreferrer\" aria-label=\"Klook 四人海濱方案（另開分頁）\">Klook 四人海濱方案<span aria-hidden=\"true\">↗</span></a></div>",
                "summary": "四人海濱前排方案 NT$1,933，平均每人 NT$483.25。",
                "notice": "第一排座位及套餐內容以訂單確認；餐飲加點另計。",
                "kind": "dining",
                "disclosureLabel": "套餐內容與訂票",
                "id": "s-b4bed3a682",
                "routeIndices": [
                    3
                ],
                "needsBooking": true
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
                },
                "id": "s-5d050d926d",
                "routeIndices": [
                    3
                ]
            },
            {
                "time": "20:30 後",
                "title": "Soi 6・六巷小酌",
                "summary": "火舞與拍照結束後叫車前往六巷，依體力決定停留時間。",
                "icon": "fa-moon",
                "details": "<div class=\"detail-copy\"><p>從 DAM Pattaya 叫車前往海灘路 Soi 6；20:30 為離開 DAM 的預計時間，抵達依叫車與路況調整。找間酒吧喝一杯、聊天或玩桌遊，結束後返回民宿。</p><p>交通、飲品與互動飲料另計，點單前確認菜單價格。</p></div><div class=\"detail-copy\"><p>晚間行程結束後返回同一間芭達雅民宿；回程叫車以住宿地址為目的地，車資另計。</p></div><div class=\"trip-links\"><a class=\"trip-link\" href=\"https://www.google.com/maps/search/?api=1&amp;query=88+Soi+Pattayasaisong+11+Pattaya+20150\" target=\"_blank\" rel=\"noopener noreferrer\">返回民宿地圖</a></div>",
                "notice": "",
                "kind": "night",
                "disclosureLabel": "",
                "id": "s-8aebcc324b",
                "routeIndices": [
                    4,
                    5
                ]
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
                "googleQuery": "Suvarnabhumi Airport Thailand",
                "itemId": "s-e692da9752"
            },
            {
                "name": "LOF LAND",
                "lat": 13.3187621,
                "lon": 100.9798617,
                "note": "依你提供的 Google Maps 定位。",
                "approx": false,
                "googleQuery": "LOF LAND Chonburi Thailand",
                "itemId": "s-7361eefacf"
            },
            {
                "name": "芭達雅民宿",
                "lat": 12.93,
                "lon": 100.884,
                "approx": true,
                "googleQuery": "88 Soi Pattayasaisong 11, Pattaya City, Chon Buri 20150, Thailand",
                "note": "民宿地址：88 Soi Pattayasaisong 11, Pattaya City, 春武里 20150, 泰國；導航以地址搜尋結果確認入口。",
                "itemId": "s-7d521d25bb"
            },
            {
                "name": "DAM Pattaya",
                "lat": 12.99,
                "lon": 100.912,
                "note": "以 Google Maps 的 DAM Pattaya 店家搜尋結果及訂位資訊確認入口。",
                "approx": true,
                "googleQuery": "DAM Pattaya Na Kluea Chon Buri Thailand",
                "itemId": "s-b4bed3a682"
            },
            {
                "name": "Soi 6 六巷",
                "lat": 12.943,
                "lon": 100.885,
                "note": "街區位置示意。",
                "approx": true,
                "googleQuery": "Soi 6 Pattaya Thailand",
                "itemId": "s-8aebcc324b"
            },
            {
                "name": "返回芭達雅民宿",
                "lat": 12.93,
                "lon": 100.884,
                "approx": true,
                "googleQuery": "88 Soi Pattayasaisong 11, Pattaya City, Chon Buri 20150, Thailand",
                "note": "民宿地址：88 Soi Pattayasaisong 11, Pattaya City, 春武里 20150, 泰國；導航以地址搜尋結果確認入口。",
                "itemId": "s-8aebcc324b"
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
                "details": "<div class=\"detail-copy\"><p>車程按 45～60 分鐘規劃，依海灘路實際上車點與路況調整。建議包車等候或約定 13:30 接回，今日車資另詢價。</p></div><div class=\"detail-copy\"><p>出發地點：芭達雅民宿，88 Soi Pattayasaisong 11, Pattaya City, 春武里 20150, 泰國。</p></div>",
                "icon": "fa-car",
                "notice": "",
                "kind": "transport",
                "disclosureLabel": "",
                "chapter": {
                    "label": "上午",
                    "time": "07:30–11:30",
                    "title": "動物園，先走想看的重點"
                },
                "id": "s-abc08fe317",
                "routeIndices": [
                    0,
                    1
                ]
            },
            {
                "time": "08:30–08:45",
                "title": "換票・租四人球車",
                "summary": "外國成人門票 350 THB／人（四人 1,400）；另租四人球車，首 2 小時與保險先列 550 THB，超時另留預備金。",
                "details": "<div class=\"detail-copy\"><p>選非泰國居民門票；換票地點依憑證。球車依你提供的參考價：前 2 小時 <mark class=\"cost-tag\">500 THB</mark>＋保險 <mark class=\"cost-tag\">50 THB</mark>／車，四人基本均攤 <mark class=\"cost-tag\">137.5 THB</mark>／人。</p><p>08:45 租至 13:30 共 4 小時 45 分鐘，超出基本方案 2 小時 45 分鐘；超時費另計。護照、押金或其他擔保方式與可租數量須現場確認，早到不保證有車。</p></div><div class=\"trip-links\"><a class=\"trip-link\" href=\"https://www.klook.com/en-US/activity/338-khao-kheow-open-zoo-pattaya/\" target=\"_blank\" rel=\"noopener noreferrer\" aria-label=\"動物園門票（另開分頁）\">動物園門票<span aria-hidden=\"true\">↗</span></a><a class=\"trip-link\" href=\"https://khaokheowzoothailand.org/site/khaokheow.zoothailand.org/en/index.html\" target=\"_blank\" rel=\"noopener noreferrer\" aria-label=\"園方資訊（另開分頁）\">園方資訊<span aria-hidden=\"true\">↗</span></a></div><div class=\"detail-copy ticket-price-note\"><p><strong>票價／費用查核 2026/11/17</strong></p><p>園方票價與泰國觀光局均列外國成人 350 THB／人，四人 1,400 THB；園方列門票包含免費場次，不另重複加企鵝或大象表演門票。球車官方列四人座首 2 小時 500 THB／車；沿用原行程 50 THB 保險，共先列 550 THB。原安排租至 13:30，超出基本時數約 2 小時 45 分鐘；本次額外抓 600 THB 作超時預備金，這是保守估算，不是園方已核定的結帳額，實收級距請現場確認。若接送車進園，停車或車輛入園另計。</p><p>以上是目前可核實的報價或參考資料，未保證 2027 當日票價與可訂狀況；四人均按外國成人計算。</p></div><div class=\"trip-links\"><a class=\"trip-link\" href=\"https://khaokheow.zoothailand.org/en/ewt_news.php?c_id=34&n_id=173\" target=\"_blank\" rel=\"noopener noreferrer\">綠山動物園官方入場票價 ↗</a></div>",
                "icon": "fa-ticket",
                "notice": "門票與球車分開計；08:45–13:30 租用超過基本 2 小時，不能只算首段租金。",
                "kind": "activity",
                "disclosureLabel": "門票與球車租借",
                "id": "s-584c900b54",
                "routeIndices": [
                    1
                ],
                "needsBooking": true
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
                },
                "id": "s-b0f19d3a07",
                "routeIndices": [
                    1
                ]
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
                },
                "id": "s-1d97b35d1e",
                "routeIndices": [
                    1
                ]
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
                },
                "id": "s-7754be56d9",
                "routeIndices": [
                    1
                ]
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
                },
                "id": "s-325e2588e9",
                "routeIndices": [
                    1
                ]
            },
            {
                "time": "12:15–13:00",
                "title": "猛獸區・鳥園補看",
                "summary": "依距離擇近參觀，不為餵食繞遠路。",
                "details": "<div class=\"detail-copy\"><p>白獅、白虎與鳥園以當日開放為準；餵食種類、場次與價格不先視為保證項目。</p></div>",
                "icon": "fa-paw",
                "notice": "",
                "kind": "activity",
                "disclosureLabel": "",
                "id": "s-dfcef3dbb1",
                "routeIndices": [
                    1
                ]
            },
            {
                "time": "13:00–13:30",
                "title": "回租借站・還車",
                "summary": "結清超時費，取回擔保物。",
                "details": "<div class=\"detail-copy\"><p>保留回程與驗車時間；確認證件或押金已取回，再前往接送點。</p></div>",
                "icon": "fa-car",
                "notice": "",
                "kind": "transport",
                "disclosureLabel": "",
                "id": "s-79bef5c9df",
                "routeIndices": [
                    1
                ]
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
                },
                "id": "s-341770ae90",
                "routeIndices": [
                    2
                ]
            },
            {
                "time": "15:00–16:30",
                "title": "House of Benedict",
                "summary": "主題造景拍照與下午茶；外國人入場參考 200 THB／人，四人 800 THB，餐飲兌換條件現場確認。",
                "details": "<div class=\"detail-copy\"><p>售票頁目前列外國成人 <mark class=\"cost-tag\">200 THB</mark>／人，四人 <mark class=\"cost-tag\">800 THB</mark>；餐飲另計。選 Non-Thai Adult，2027/4/11 可訂日期與實付價格依結帳頁。</p></div><div class=\"trip-links\"><a class=\"trip-link\" href=\"https://chillpainai.com/public/en/products/11257\" target=\"_blank\" rel=\"noopener noreferrer\" aria-label=\"House of Benedict 訂票（另開分頁）\">House of Benedict 訂票<span aria-hidden=\"true\">↗</span></a></div><div class=\"detail-copy ticket-price-note\"><p><strong>票價／費用查核 2026/11/17</strong></p><p>泰國觀光局日本站列入場 200 THB／人，四人 800 THB。不同售票說明對餐飲折抵條件不一，這裡只計入場費，額外加點依實際消費；若票券有折抵，請扣掉折抵部分，避免餐飲重複計入。</p><p>以上是目前可核實的報價或參考資料，未保證 2027 當日票價與可訂狀況；四人均按外國成人計算。</p></div><div class=\"trip-links\"><a class=\"trip-link\" href=\"https://www.thailandtravel.or.jp/house-of-benedict/\" target=\"_blank\" rel=\"noopener noreferrer\">泰國觀光局 House of Benedict 票價 ↗</a></div>",
                "icon": "fa-camera",
                "notice": "泰國觀光局列 200 THB／人；票券是否可折抵餐飲、可抵多少及適用店家請依所購方案確認。",
                "kind": "activity",
                "disclosureLabel": "",
                "photo": {
                    "file": "images/house-of-benedict.jpg",
                    "caption": "House of Benedict・午後拍照",
                    "alt": "House of Benedict 店內主題造景",
                    "scene": "day"
                },
                "id": "s-bfbe0387ee",
                "routeIndices": [
                    2
                ],
                "needsBooking": true
            },
            {
                "time": "16:30–18:15",
                "title": "返回海灘路・休息與晚餐",
                "summary": "回民宿整理後就近用餐，Terminal 21 視體力再去。",
                "details": "<div class=\"detail-copy\"><p>回程先留 30～45 分鐘，再休息、吃飯。避免為了逛街錯過 69 Pattaya Show接送。</p></div>",
                "icon": "fa-utensils",
                "notice": "",
                "kind": "dining",
                "disclosureLabel": "",
                "id": "s-1b08c846c6",
                "routeIndices": [
                    0
                ]
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
                },
                "id": "s-4284ae4d92",
                "routeIndices": [
                    3
                ]
            },
            {
                "time": "19:00–20:15",
                "title": "69 Pattaya Show",
                "summary": "門票每人 700 THB，四人共 2,800 THB；保留演出與進出場時間。",
                "details": "<div class=\"detail-copy\"><p><strong>門票 <mark class=\"cost-tag\">700 THB</mark>／人，四人共 <mark class=\"cost-tag\">2,800 THB</mark>。</strong>依你提供的價格記錄；接送是否包含另行確認。</p><p>地點改為 69 Pattaya Show，請使用下方地圖前往。19:00–20:15 為行程預留時間，實際開演與報到時間依訂票資訊確認。</p><p>入場年齡、證件與攝影器材規定依場館要求。</p></div><div class=\"trip-links\"><a class=\"trip-link\" href=\"https://maps.app.goo.gl/g1RaXNKuRreucqLz7\" target=\"_blank\" rel=\"noopener noreferrer\">69 Pattaya Show 地圖<span aria-hidden=\"true\">↗</span></a></div>",
                "icon": "fa-ticket",
                "notice": "票價依你提供的 700 THB／人記錄；確認場次、報到時間與接送安排。",
                "kind": "activity",
                "disclosureLabel": "四人票價與場館位置",
                "id": "s-34d077ae20",
                "routeIndices": [
                    3
                ],
                "needsBooking": true
            },
            {
                "time": "20:15–20:45",
                "title": "69 Pattaya Show → 六巷",
                "summary": "預留叫車與移動時間，依演出結束時間順延。",
                "details": "<div class=\"detail-copy\"><p>以叫車或已約定的接送為主；不先假設有固定 <mark class=\"cost-tag\">10 THB</mark> 雙條車直達。</p></div>",
                "icon": "fa-car",
                "notice": "",
                "kind": "transport",
                "disclosureLabel": "",
                "id": "s-bc98b5f00d",
                "routeIndices": [
                    4
                ]
            },
            {
                "time": "20:45–23:00",
                "title": "Soi 6 酒吧街",
                "summary": "找間喜歡的酒吧小酌、聊天與玩桌遊。",
                "details": "<div class=\"detail-copy\"><p>飲品、互動飲料與交通另計，點單前看菜單。店家營業時間各異，結束後返回海灘路民宿。</p></div><div class=\"detail-copy\"><p>晚間行程結束後返回同一間芭達雅民宿；回程叫車以住宿地址為目的地，車資另計。</p></div><div class=\"trip-links\"><a class=\"trip-link\" href=\"https://www.google.com/maps/search/?api=1&amp;query=88+Soi+Pattayasaisong+11+Pattaya+20150\" target=\"_blank\" rel=\"noopener noreferrer\">返回民宿地圖</a></div>",
                "icon": "fa-moon",
                "notice": "",
                "kind": "night",
                "disclosureLabel": "",
                "id": "s-04f0c2f556",
                "routeIndices": [
                    4,
                    5
                ]
            }
        ],
        "intro": "提早出發看動物，午後留給拍照，晚餐後再接成人秀與夜生活。",
        "route": [
            {
                "name": "芭達雅民宿",
                "lat": 12.93,
                "lon": 100.884,
                "approx": true,
                "googleQuery": "88 Soi Pattayasaisong 11, Pattaya City, Chon Buri 20150, Thailand",
                "note": "民宿地址：88 Soi Pattayasaisong 11, Pattaya City, 春武里 20150, 泰國；導航以地址搜尋結果確認入口。",
                "itemId": "s-abc08fe317"
            },
            {
                "name": "綠山動物園",
                "lat": 13.2134628,
                "lon": 101.0611659,
                "note": "",
                "approx": false,
                "googleQuery": "Khao Kheow Open Zoo Thailand",
                "itemId": "s-584c900b54"
            },
            {
                "name": "House of Benedict",
                "lat": 12.8606473,
                "lon": 100.904986,
                "note": "",
                "approx": false,
                "googleQuery": "House of Benedict Pattaya",
                "itemId": "s-bfbe0387ee"
            },
            {
                "name": "69 Pattaya Show",
                "lat": 12.9537425,
                "lon": 100.8918577,
                "note": "依提供的 Google 地圖連結定位。",
                "approx": false,
                "googleQuery": "69 Pattaya Show Pattaya Thailand",
                "itemId": "s-34d077ae20"
            },
            {
                "name": "Soi 6 六巷",
                "lat": 12.943,
                "lon": 100.885,
                "note": "街區位置示意。",
                "approx": true,
                "googleQuery": "Soi 6 Pattaya Thailand",
                "itemId": "s-04f0c2f556"
            },
            {
                "name": "返回芭達雅民宿",
                "lat": 12.93,
                "lon": 100.884,
                "approx": true,
                "googleQuery": "88 Soi Pattayasaisong 11, Pattaya City, Chon Buri 20150, Thailand",
                "note": "民宿地址：88 Soi Pattayasaisong 11, Pattaya City, 春武里 20150, 泰國；導航以地址搜尋結果確認入口。",
                "itemId": "s-04f0c2f556"
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
                "summary": "跳傘費用 13,100 THB／人，四人共 52,400 THB；依你提供的價格記錄。",
                "details": "<div class=\"detail-copy\"><p><strong>跳傘費用：13,100 THB／人，四人共 52,400 THB。</strong>依你提供的報價更新；拍攝、民宿來回接送、付款與重量加價條件以實際訂單確認。</p><p>07:00 為希望安排的民宿接送時間，須由業者確認。出發與返回地址：88 Soi Pattayasaisong 11, Pattaya City, 春武里 20150, 泰國。</p><p>風況可能延誤，12:00 不保證返回市區。</p></div><div class=\"trip-links\"><a class=\"trip-link\" href=\"https://thaiskyadventures.com/begin-your-booking/\" target=\"_blank\" rel=\"noopener noreferrer\">跳傘官網預訂</a></div>",
                "icon": "fa-plane",
                "notice": "依你提供的報價編列，尚未代訂；拍攝、接送及加價條件以訂單確認。",
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
                },
                "id": "s-493b28dc98",
                "routeIndices": [
                    0,
                    1
                ],
                "needsBooking": true
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
                },
                "id": "s-1f2c4d6113",
                "routeIndices": [
                    0
                ]
            },
            {
                "time": "13:00–14:30",
                "title": "Royal Garden Plaza",
                "summary": "午餐後逛街，再接帕塔納克山觀景台；Ripley’s 視時間選一項。",
                "details": "<div class=\"detail-copy\"><p>位於海灘路，逛街本身不需門票；Ripley’s 展館與遊樂設施另購。約 14:30 結束，接著前往帕塔納克山觀景台。</p><p>若上午跳傘延後，先縮短逛街時間；仍來不及就略過白天觀景台，保留 17:00 海鮮晚餐。</p></div>",
                "icon": "fa-shopping-bag",
                "notice": "跳傘若延後，縮短逛街；觀景台依剩餘時間調整。",
                "kind": "activity",
                "disclosureLabel": "",
                "id": "s-f11619f31f",
                "routeIndices": [
                    2
                ]
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
                },
                "id": "s-2eefc5a3b4",
                "routeIndices": [
                    3
                ]
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
                },
                "id": "s-9a638904f0",
                "routeIndices": [
                    4
                ]
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
                },
                "id": "s-78c0b9bd7c",
                "routeIndices": [
                    4
                ],
                "needsBooking": true
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
                },
                "id": "s-16c03a16f0",
                "routeIndices": [
                    5
                ]
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
                },
                "id": "s-117798c4ea",
                "routeIndices": [
                    5
                ],
                "needsBooking": true
            },
            {
                "time": "21:45–22:30",
                "title": "中天 → Soi 6",
                "summary": "預留叫車與跨區移動時間。",
                "details": "<div class=\"detail-copy\"><p>這段以叫車規劃，約 30～45 分鐘作排程緩衝，非固定導航車程。</p></div>",
                "icon": "fa-car",
                "notice": "",
                "kind": "transport",
                "disclosureLabel": "",
                "id": "s-60702fef4a",
                "routeIndices": [
                    6
                ]
            },
            {
                "time": "22:30–01:00（彈性）",
                "title": "六巷續攤・依營業情況",
                "summary": "看店家與體力決定停留時間，隨時可回民宿。",
                "details": "<div class=\"detail-copy\"><p>01:00 為最晚預留時間，不保證每家店營業至此；若六巷已收店就直接返宿。飲品含互動飲料先看菜單，不固定以 <mark class=\"cost-tag\">200 THB</mark> 計。</p></div><div class=\"detail-copy\"><p>晚間行程結束後返回同一間芭達雅民宿；回程叫車以住宿地址為目的地，車資另計。</p></div><div class=\"trip-links\"><a class=\"trip-link\" href=\"https://www.google.com/maps/search/?api=1&amp;query=88+Soi+Pattayasaisong+11+Pattaya+20150\" target=\"_blank\" rel=\"noopener noreferrer\">返回民宿地圖</a></div>",
                "icon": "fa-moon",
                "notice": "",
                "kind": "night",
                "disclosureLabel": "",
                "id": "s-3646f15f55",
                "routeIndices": [
                    6,
                    7
                ]
            }
        ],
        "intro": "上午挑戰跳傘，午後逛街、上帕塔納克山看海灣，傍晚吃海鮮燒烤，再到高空酒吧看夜景。",
        "route": [
            {
                "name": "芭達雅民宿",
                "lat": 12.93,
                "lon": 100.884,
                "approx": true,
                "googleQuery": "88 Soi Pattayasaisong 11, Pattaya City, Chon Buri 20150, Thailand",
                "note": "民宿地址：88 Soi Pattayasaisong 11, Pattaya City, 春武里 20150, 泰國；導航以地址搜尋結果確認入口。",
                "itemId": "s-1f2c4d6113"
            },
            {
                "name": "Thai Sky Adventures",
                "lat": 13.1424231,
                "lon": 101.0485811,
                "note": "依業者官網的地圖連結定位。",
                "approx": false,
                "googleQuery": "Thai Sky Adventures Thailand",
                "itemId": "s-493b28dc98"
            },
            {
                "name": "Royal Garden Plaza",
                "lat": 12.9293076,
                "lon": 100.8780487,
                "note": "",
                "approx": false,
                "googleQuery": "Royal Garden Plaza Pattaya",
                "itemId": "s-f11619f31f"
            },
            {
                "name": "帕塔納克山觀景台・白天",
                "lat": 12.924,
                "lon": 100.867,
                "note": "14:30～15:30 含上下山交通，停留約 20～30 分鐘；跳傘延誤可略過。山頂位置示意，以搜尋結果確認入口。",
                "approx": true,
                "googleQuery": "Phra Tamnak Mountain Viewpoint Pattaya Thailand",
                "itemId": "s-2eefc5a3b4"
            },
            {
                "name": "Seafood Station Pattaya",
                "lat": 12.9422872,
                "lon": 100.9096122,
                "note": "依提供的 Google 地圖連結定位；餐後可先回住宿休息。",
                "approx": false,
                "googleQuery": "Seafood Station Pattaya",
                "itemId": "s-78c0b9bd7c"
            },
            {
                "name": "ZAMĀ Skybar・D Varee 飯店",
                "lat": 12.885,
                "lon": 100.883,
                "note": "38 樓；導航至 D Varee Jomtien Beach 飯店入口，再上樓。",
                "approx": true,
                "googleQuery": "ZAMA Skybar D Varee Jomtien Beach Pattaya",
                "itemId": "s-117798c4ea"
            },
            {
                "name": "Soi 6 六巷",
                "lat": 12.943,
                "lon": 100.885,
                "note": "街區位置示意。",
                "approx": true,
                "googleQuery": "Soi 6 Pattaya Thailand",
                "itemId": "s-3646f15f55"
            },
            {
                "name": "返回芭達雅民宿",
                "lat": 12.93,
                "lon": 100.884,
                "approx": true,
                "googleQuery": "88 Soi Pattayasaisong 11, Pattaya City, Chon Buri 20150, Thailand",
                "note": "民宿地址：88 Soi Pattayasaisong 11, Pattaya City, 春武里 20150, 泰國；導航以地址搜尋結果確認入口。",
                "itemId": "s-3646f15f55"
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
                },
                "id": "s-d64df5b01f",
                "routeIndices": [
                    0,
                    6
                ]
            },
            {
                "time": "13:00–14:00",
                "title": "回民宿・盥洗與午餐",
                "summary": "洗澡、換乾衣，再簡單用餐。",
                "details": "<div class=\"detail-copy\"><p>下午參觀真理寺，準備遮肩、過膝的乾爽衣褲。餐點以民宿周邊或外帶為主，避免等餐耽誤出發。</p></div>",
                "icon": "fa-house",
                "notice": "",
                "kind": "activity",
                "disclosureLabel": "",
                "id": "s-3c1126f221",
                "routeIndices": [
                    0
                ]
            },
            {
                "time": "14:00–14:30",
                "title": "海灘路 → 真理寺",
                "summary": "預留約 30 分鐘叫車與交通，依路況調整。",
                "details": "<div class=\"detail-copy\"><p>潑水節期間預約接送較好掌握時間；若塞車，參觀與晚餐同步順延，不壓縮換票及入場流程。</p></div>",
                "icon": "fa-car",
                "notice": "",
                "kind": "transport",
                "disclosureLabel": "",
                "id": "s-79ee2fc29a",
                "routeIndices": [
                    1
                ]
            },
            {
                "time": "14:30–16:30",
                "title": "真理寺・木雕工藝參觀",
                "summary": "日間成人票 500 THB／人，四人 2,000 THB；安排約 2 小時參觀木構建築與雕刻。",
                "details": "<div class=\"detail-copy\"><p>先換票並依現場安排入場；穿著遮肩、過膝服飾，安全帽等要求依工作人員指示。門票選日間票，參觀與導覽時間以當日安排為準。</p></div><div class=\"trip-links\"><a class=\"trip-link\" href=\"https://sanctuaryoftruthmuseum.com/visit-us/\" target=\"_blank\" rel=\"noopener noreferrer\" aria-label=\"真理寺參觀資訊・官網購票入口（另開分頁）\">真理寺參觀資訊・官網購票入口<span aria-hidden=\"true\">↗</span></a></div><div class=\"detail-copy ticket-price-note\"><p><strong>票價／費用查核 2026/11/17</strong></p><p>官方售票頁列成人日間票 500 THB／人，四人 2,000 THB；成人夜間票 700 THB 與本次白天行程不同，不重複列入。馬車、船、騎乘、餐飲等選購活動不預設包含，是否參加再另加。</p><p>以上是目前可核實的報價或參考資料，未保證 2027 當日票價與可訂狀況；四人均按外國成人計算。</p></div><div class=\"trip-links\"><a class=\"trip-link\" href=\"https://sanctuaryoftruthmuseum.com/shop/sanctuary-of-truth-entrance-ticket/\" target=\"_blank\" rel=\"noopener noreferrer\">真理寺官方日間票 ↗</a></div>",
                "icon": "fa-gopuram",
                "notice": "本日 14:30 參觀選日間票；不以 700 THB 夜間票計。",
                "kind": "activity",
                "disclosureLabel": "",
                "photo": {
                    "file": "images/真理寺.jpg",
                    "caption": "真理寺・近看木雕屋簷",
                    "alt": "真理寺的木雕屋簷與建築",
                    "scene": "day"
                },
                "id": "s-5cee1245ae",
                "routeIndices": [
                    1
                ],
                "needsBooking": true
            },
            {
                "time": "16:30–17:15",
                "title": "真理寺 → The Sky Gallery",
                "summary": "跨市區移動先留 45 分鐘，爭取日落前入座。",
                "details": "<div class=\"detail-copy\"><p>目的地位於帕山、Cosy Beach 附近。此為排程緩衝，非即時導航時間；節日塞車可能延後抵達。</p></div>",
                "icon": "fa-car",
                "notice": "",
                "kind": "transport",
                "disclosureLabel": "",
                "id": "s-99d3c9dabb",
                "routeIndices": [
                    2
                ]
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
                },
                "id": "s-ca389d2a79",
                "routeIndices": [
                    2
                ],
                "needsBooking": true
            },
            {
                "time": "19:30–19:45（估）",
                "title": "The Sky Gallery → 帕塔納克山觀景台",
                "summary": "晚餐後先上山看夜景，再往六巷，不先返回市區。",
                "details": "<div class=\"detail-copy\"><p>餐廳與觀景台同在南芭達雅山丘一帶，晚餐離席前先安排叫車，預留上山、下車與步行時間。15 分鐘是排程估算，潑水節路況若延後，觀景停留與後續行程同步調整。</p></div>",
                "icon": "fa-car",
                "notice": "建議先約好觀景台下山的接送，車資另計。",
                "kind": "transport",
                "disclosureLabel": "",
                "id": "s-8ce8fd8982",
                "routeIndices": [
                    3
                ]
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
                },
                "id": "s-93ef7b2925",
                "routeIndices": [
                    3
                ]
            },
            {
                "time": "20:20–21:00（估）",
                "title": "帕塔納克山觀景台 → Soi 6 六巷",
                "summary": "預留約 40 分鐘下山、叫車與節日交通緩衝。",
                "details": "<div class=\"detail-copy\"><p>從山頂搭預約車或叫車返回海灘路六巷，不另繞中天。實際抵達時間依下山接送與潑水節路況調整。</p></div>",
                "icon": "fa-car",
                "notice": "",
                "kind": "transport",
                "disclosureLabel": "",
                "id": "s-6e0abec254",
                "routeIndices": [
                    4
                ]
            },
            {
                "time": "21:00–23:00（彈性）",
                "title": "Soi 6・六巷小酌",
                "summary": "看完夜景再喝一杯，依店家營業與體力決定停留時間。",
                "details": "<div class=\"detail-copy\"><p>飲品及回民宿交通另計，點單前先看菜單。若玩水、真理寺與晚餐後已累，可從觀景台直接返宿。Terminal 21／Runway 飛機夜市留在 4/14 的原安排。</p></div><div class=\"detail-copy\"><p>晚間行程結束後返回同一間芭達雅民宿；回程叫車以住宿地址為目的地，車資另計。</p></div><div class=\"trip-links\"><a class=\"trip-link\" href=\"https://www.google.com/maps/search/?api=1&amp;query=88+Soi+Pattayasaisong+11+Pattaya+20150\" target=\"_blank\" rel=\"noopener noreferrer\">返回民宿地圖</a></div>",
                "icon": "fa-moon",
                "notice": "",
                "kind": "night",
                "disclosureLabel": "",
                "id": "s-1c1d312f97",
                "routeIndices": [
                    4,
                    5
                ]
            }
        ],
        "intro": "上午玩水，中午換裝，下午看真理寺，The Sky Gallery 日落晚餐後上山看海灣夜景，再到六巷小酌。",
        "route": [
            {
                "name": "芭達雅民宿",
                "lat": 12.93,
                "lon": 100.884,
                "approx": true,
                "googleQuery": "88 Soi Pattayasaisong 11, Pattaya City, Chon Buri 20150, Thailand",
                "note": "民宿地址：88 Soi Pattayasaisong 11, Pattaya City, 春武里 20150, 泰國；導航以地址搜尋結果確認入口。",
                "itemId": "s-d64df5b01f"
            },
            {
                "name": "真理寺",
                "lat": 12.972,
                "lon": 100.889,
                "note": "園區位置示意。",
                "approx": true,
                "googleQuery": "Sanctuary of Truth Pattaya",
                "itemId": "s-5cee1245ae"
            },
            {
                "name": "The Sky Gallery",
                "lat": 12.9215465,
                "lon": 100.8594453,
                "note": "",
                "approx": false,
                "googleQuery": "The Sky Gallery Pattaya",
                "itemId": "s-ca389d2a79"
            },
            {
                "name": "帕塔納克山觀景台",
                "lat": 12.924,
                "lon": 100.867,
                "note": "山頂位置示意；請以 Phra Tamnak Mountain Viewpoint 搜尋結果確認入口，不是山下 Pattaya City 字樣拍照點。",
                "approx": true,
                "googleQuery": "Phra Tamnak Mountain Viewpoint Pattaya Thailand",
                "itemId": "s-93ef7b2925"
            },
            {
                "name": "Soi 6 六巷",
                "lat": 12.943,
                "lon": 100.885,
                "note": "街區位置示意。",
                "approx": true,
                "googleQuery": "Soi 6 Pattaya Thailand",
                "itemId": "s-1c1d312f97"
            },
            {
                "name": "返回芭達雅民宿",
                "lat": 12.93,
                "lon": 100.884,
                "approx": true,
                "googleQuery": "88 Soi Pattayasaisong 11, Pattaya City, Chon Buri 20150, Thailand",
                "note": "民宿地址：88 Soi Pattayasaisong 11, Pattaya City, 春武里 20150, 泰國；導航以地址搜尋結果確認入口。",
                "itemId": "s-1c1d312f97"
            },
            {
                "name": "海灘路・潑水節",
                "lat": 12.936,
                "lon": 100.883,
                "approx": true,
                "googleQuery": "Pattaya Beach Road Thailand",
                "note": "海灘路活動區域示意。",
                "itemId": "s-d64df5b01f",
                "mapOnly": true
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
                "summary": "快艇出海與水上活動；先按 C1 參考方案 1,800 THB／人估，四人 7,200 THB，未代訂。",
                "details": "<div class=\"detail-copy\"><p>08:30 為規劃接送時間；碼頭、午餐、躺椅及返程以所選方案為準。拖曳傘、香蕉船、水上摩托車、浮潛或海底漫步，依套票內容選擇，不預設全部包含。</p><p>目標 16:30 前返抵芭達雅；海況或接送延後時，後續行程順延。四人套票費用先按 C1 參考價 7,200 THB 編列，確定方案後替換。</p></div><div class=\"trip-links\"><a class=\"trip-link\" href=\"https://www.pattayacoral.com/\" target=\"_blank\" rel=\"noopener noreferrer\" aria-label=\"格蘭島方案與預訂（另開分頁）\">格蘭島方案與預訂<span aria-hidden=\"true\">↗</span></a></div><div class=\"detail-copy ticket-price-note\"><p><strong>票價／費用查核 2026/11/17</strong></p><p>Ticket2Attraction 當期 C1 方案列 1,800 THB／人起，四人先估 7,200 THB，頁面列快艇、午餐、拖曳傘、水上摩托車與香蕉船。接送範圍與完整包含以所選方案憑證為準；不另重複加同一套票中的午餐或接送。基本快艇午餐方案 750 THB 起，未含相同水上項目；含海底漫步的 A 方案 2,500 THB 起屬替代方案，不是把 2,500 再加到 C1。浮潛、海底漫步與其他活動是否另付，以最終選擇為準。本次只建立預算基準，未代為購買；2027/4/14 潑水節期間價格與場次仍待確認。</p><p>以上是目前可核實的報價或參考資料，未保證 2027 當日票價與可訂狀況；四人均按外國成人計算。</p></div><div class=\"trip-links\"><a class=\"trip-link\" href=\"https://www.ticket2attraction.com/discount-tickets/pattaya-coral-island-koh-larn-day-tour/\" target=\"_blank\" rel=\"noopener noreferrer\">格蘭島快艇與水上活動方案 ↗</a></div><div class=\"detail-copy\"><p>出發地點：芭達雅民宿，88 Soi Pattayasaisong 11, Pattaya City, 春武里 20150, 泰國。</p></div>",
                "icon": "fa-ship",
                "notice": "預算以 C1 快艇午餐＋拖曳傘、水上摩托車、香蕉船為基準；海底漫步與其他加購未計。",
                "kind": "activity",
                "disclosureLabel": "水上活動方案與預訂",
                "photo": {
                    "file": "images/koh-larn.jpg",
                    "caption": "格蘭島・海岸與碧綠海水",
                    "alt": "格蘭島沙灘與碧綠海水",
                    "scene": "day"
                },
                "id": "s-fde119d910",
                "routeIndices": [
                    0,
                    2
                ],
                "needsBooking": true
            },
            {
                "time": "16:30–18:30",
                "title": "回民宿盥洗・泰式 SPA",
                "summary": "先換乾衣，再安排約 60 分鐘按摩。",
                "details": "<div class=\"detail-copy\"><p>約 16:30～17:15 返回民宿、沖澡與移動；17:15～18:30 留給報到及 60 分鐘療程。此銜接以準時回程、店面靠近住宿為前提；晚到則按摩與晚餐順延。</p><p>優先選海灘路 Soi 12 的 Let’s Relax Beachfront，或民宿附近按摩店。四人同時段、療程與實付金額先確認；兩小時 SPA 需另延後晚餐。</p></div><div class=\"trip-links\"><a class=\"trip-link\" href=\"https://letsrelaxspa.com/branches/pattaya-beachfront/\" target=\"_blank\" rel=\"noopener noreferrer\" aria-label=\"Let’s Relax 海灘路店預約資訊（另開分頁）\">Let’s Relax 海灘路店預約資訊<span aria-hidden=\"true\">↗</span></a></div><div class=\"detail-copy ticket-price-note\"><p>2026/11/17 查 Let’s Relax Pattaya Beachfront 分店官網：60 分鐘足療 875 THB、肩頸背按摩 800 THB、芳療油壓 1,400 THB；傳統泰式為 120 分鐘 1,300 THB，和原本約 60 分鐘不同。療程尚未選定，因此費用表保留待填，不把 120 分鐘價格冒充 60 分鐘，也不先改你的時程。</p></div><div class=\"trip-links\"><a class=\"trip-link\" href=\"https://letsrelaxspa.com/branches/pattaya-beachfront/\" target=\"_blank\" rel=\"noopener noreferrer\">分店官方療程與價目 ↗</a></div>",
                "icon": "fa-spa",
                "notice": "以 60 分鐘按摩安排；返程延誤時，按摩與晚餐一併順延。",
                "kind": "activity",
                "disclosureLabel": "按摩療程與預約",
                "id": "s-8b6d3a7c25",
                "routeIndices": [
                    0,
                    3
                ],
                "needsBooking": true
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
                },
                "id": "s-40189c4331",
                "routeIndices": [
                    4,
                    6
                ]
            },
            {
                "time": "20:30–23:30",
                "title": "Soi 6・六巷小酌",
                "summary": "留出前往六巷的時間，找間酒吧聊天、玩桌遊。",
                "details": "<div class=\"detail-copy\"><p>從百貨或夜市前往六巷，依路線選叫車或雙條車；先確認方向與費用，不以固定 <mark class=\"cost-tag\">10 THB</mark> 當作保證票價。</p><p>飲品與互動飲料先看菜單，依店家營業及體力提早結束。今晚仍住芭達雅，4/15 才安排退房前往曼谷。</p></div><div class=\"detail-copy\"><p>晚間行程結束後返回同一間芭達雅民宿；回程叫車以住宿地址為目的地，車資另計。</p></div><div class=\"trip-links\"><a class=\"trip-link\" href=\"https://www.google.com/maps/search/?api=1&amp;query=88+Soi+Pattayasaisong+11+Pattaya+20150\" target=\"_blank\" rel=\"noopener noreferrer\">返回民宿地圖</a></div>",
                "icon": "fa-moon",
                "notice": "",
                "kind": "night",
                "disclosureLabel": "",
                "id": "s-3a66b1cdc8",
                "routeIndices": [
                    5,
                    7
                ]
            }
        ],
        "intro": "把白天留給格蘭島，回來洗澡按摩，晚餐與逛街依體力安排。",
        "route": [
            {
                "name": "芭達雅民宿",
                "lat": 12.93,
                "lon": 100.884,
                "approx": true,
                "googleQuery": "88 Soi Pattayasaisong 11, Pattaya City, Chon Buri 20150, Thailand",
                "note": "民宿地址：88 Soi Pattayasaisong 11, Pattaya City, 春武里 20150, 泰國；導航以地址搜尋結果確認入口。",
                "itemId": "s-8b6d3a7c25"
            },
            {
                "name": "Bali Hai 碼頭區",
                "lat": 12.9273,
                "lon": 100.8677,
                "note": "實際出發點依一日團憑證。",
                "approx": true,
                "googleQuery": "Bali Hai Pier Pattaya",
                "itemId": "s-fde119d910"
            },
            {
                "name": "格蘭島",
                "lat": 12.918,
                "lon": 100.78,
                "note": "只標島嶼位置，不代表實際停靠沙灘或海上航線。",
                "approx": true,
                "googleQuery": "Ko Lan Pattaya Thailand",
                "itemId": "s-fde119d910"
            },
            {
                "name": "海灘路盥洗・SPA 區域",
                "lat": 12.931,
                "lon": 100.88,
                "note": "按摩店及民宿確切位置待確認。",
                "approx": true,
                "googleQuery": "Lets Relax Spa Pattaya Beachfront",
                "itemId": "s-8b6d3a7c25"
            },
            {
                "name": "Terminal 21",
                "lat": 12.95,
                "lon": 100.888,
                "note": "商場區域示意；飛機夜市為替代方案，未另連線。",
                "approx": true,
                "googleQuery": "Terminal 21 Pattaya",
                "itemId": "s-40189c4331"
            },
            {
                "name": "Soi 6 六巷",
                "lat": 12.943,
                "lon": 100.885,
                "note": "街區位置示意。",
                "approx": true,
                "googleQuery": "Soi 6 Pattaya Thailand",
                "itemId": "s-3a66b1cdc8"
            },
            {
                "name": "Runway 飛機夜市（擇一）",
                "lat": 12.943,
                "lon": 100.887,
                "note": "與 Terminal 21 擇一；點選可查看夜市，整天開車路線不重複安排兩個選項。",
                "approx": true,
                "optional": true,
                "googleQuery": "Runway Street Food Pattaya Thailand",
                "itemId": "s-40189c4331"
            },
            {
                "name": "返回芭達雅民宿",
                "lat": 12.93,
                "lon": 100.884,
                "approx": true,
                "googleQuery": "88 Soi Pattayasaisong 11, Pattaya City, Chon Buri 20150, Thailand",
                "note": "民宿地址：88 Soi Pattayasaisong 11, Pattaya City, 春武里 20150, 泰國；導航以地址搜尋結果確認入口。",
                "itemId": "s-3a66b1cdc8"
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
                "text": "曼谷城市連結酒店"
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
            "曼谷城市連結酒店 (Bangkok City Link Hotel)": {
                "lat": 13.75717831,
                "lon": 100.54322815
            }
        },
        "items": [
            {
                "time": "08:00–09:00（估）",
                "title": "退房・打車前往東芭樂園",
                "summary": "帶齊行李，另叫計程車／Grab 前往東芭樂園。",
                "details": "<div class=\"detail-copy\"><p>早餐後退房，以四人及行李選擇合適車型。這段為芭達雅住宿 → 東芭樂園的單程叫車，和下午跨城包車分開安排、分開計價。</p><p>入園前先確認行李寄放方式；若園區不能寄放，需事先與接送業者安排保管，不能預設上午單程司機會留車等候。</p></div><div class=\"detail-copy\"><p>出發地點：芭達雅民宿，88 Soi Pattayasaisong 11, Pattaya City, 春武里 20150, 泰國。</p></div>",
                "icon": "fa-car",
                "kind": "transport",
                "notice": "先確認行李寄放與下午包車的接人位置。",
                "disclosureLabel": "",
                "chapter": {
                    "label": "上午",
                    "time": "08:00–12:30",
                    "title": "退房後，逛東芭樂園"
                },
                "id": "s-e1a02702ae",
                "routeIndices": [
                    0,
                    1
                ],
                "needsBooking": true
            },
            {
                "time": "09:00–12:30",
                "title": "東芭樂園・花園、步道與午餐",
                "summary": "花園、步道與午餐；預算以外國成人門票＋遊園車 700 THB／人計，四人 2,800 THB，午餐另計。",
                "details": "<div class=\"detail-copy\"><p>抓約 3.5 小時含用餐，先選想看的區域，不追求全園走完。園區官網目前列每日 08:00–18:00；門票、遊園車及午餐依實際方案另計。</p><p>約 12:30 結束參觀、取行李並聯絡下午包車，目標 13:00 前出發，保留前往貓貓船的交通緩衝。</p></div><div class=\"trip-links\"><a class=\"trip-link\" href=\"https://www.nongnoochpattaya.com/en/beautiful-garden\" target=\"_blank\" rel=\"noopener noreferrer\">東芭樂園官方資訊<span aria-hidden=\"true\">↗</span></a></div><div class=\"detail-copy ticket-price-note\"><p><strong>票價／費用查核 2026/11/17</strong></p><p>目前售票商列外國成人「門票＋遊園車」標價 700 THB／人，四人 2,800 THB，本次用這個非低價促銷基準編列；Ticket2Attraction 同類方案另有 460 THB 起的網路折扣，純門票為 390 THB 起、所列原價 600 THB。所有「起」價都未確認 2027/4/15 是否適用。此預算以參觀花園與園內移動為主，不加秀、不含午餐或芭達雅至曼谷接送。若最後買純門票或含午餐套票，請替換本筆，勿將套票項目再次加總。</p><p>以上是目前可核實的報價或參考資料，未保證 2027 當日票價與可訂狀況；四人均按外國成人計算。</p></div><div class=\"trip-links\"><a class=\"trip-link\" href=\"https://www.gother.com/en-us/experiences/thailand/chonburi/nong-nooch-tropical-garden-pattaya-1776910986\" target=\"_blank\" rel=\"noopener noreferrer\">外國人門票＋遊園車方案 ↗</a></div>",
                "icon": "fa-tree",
                "kind": "activity",
                "notice": "這次預算採門票＋遊園車，不加文化秀或大象秀；午餐與進出園接送另計。",
                "disclosureLabel": "",
                "photo": {
                    "file": "images/nong-nooch-garden.jpg",
                    "caption": "東芭樂園・法式花園與造景",
                    "alt": "東芭樂園法式花園、幾何綠籬與恐龍造景",
                    "scene": "day"
                },
                "id": "s-d914f7d158",
                "routeIndices": [
                    1
                ],
                "needsBooking": true
            },
            {
                "time": "12:30–16:00（交通預留）",
                "title": "包車前往曼谷・中停 Hua Takhe",
                "summary": "東芭樂園上車，先去貓貓船，再送 曼谷城市連結酒店。",
                "details": "<div class=\"detail-copy\"><p><strong>包車路線：東芭樂園 → Si Yaek Huatakhe Cafe &amp; Guesthouse（停留約 1.5 小時）→ 曼谷城市連結酒店 (Bangkok City Link Hotel)。</strong></p><p>這不是單純芭達雅 → 曼谷直達接送，詢價需明列中停、等候、四人行李、過路費與最晚服務時間。費用待業者報價。</p><p>本段是排程預留，非即時導航車程。目標約 16:00 抵達、銜接希望預約的 16:30 船班；若店家確認其他時段，整段接送與東芭離園時間同步調整。</p></div><div class=\"trip-links\"><a class=\"trip-link\" href=\"https://maps.app.goo.gl/xf26zboBgnm63tdK7\" target=\"_blank\" rel=\"noopener noreferrer\">貓貓船位置<span aria-hidden=\"true\">↗</span></a><a class=\"trip-link\" href=\"https://www.google.com/maps/search/?api=1&query=Bangkok+City+Link+Hotel+Bangkok\" target=\"_blank\" rel=\"noopener noreferrer\">包車終點・曼谷城市連結酒店<span aria-hidden=\"true\">↗</span></a></div>",
                "icon": "fa-car",
                "kind": "transport",
                "notice": "宋干節交通需留彈性；訂車前先確認貓貓船場次及停留等候費。",
                "disclosureLabel": "",
                "chapter": {
                    "label": "午後",
                    "time": "12:30–17:30",
                    "title": "離開芭達雅，中途坐貓貓船"
                },
                "id": "s-c0ac557b28",
                "routeIndices": [
                    2
                ],
                "needsBooking": true
            },
            {
                "time": "16:00–17:30（場次待確認）",
                "title": "Hua Takhe・貓貓船",
                "summary": "Si Yaek Huatakhe 貓貓船；媒體參考 200 THB／人，四人先估 800 THB，分船與場次待店家確認。",
                "details": "<div class=\"detail-copy\"><p>貓貓船位於 Hua Takhe 老社區的 <strong>Si Yaek Huatakhe Cafe &amp; Guesthouse</strong>。先預留 16:00 到店、以 <strong>16:30 場次為預約目標</strong>，遊河約 50～60 分鐘。</p><p><strong>尚未預訂。</strong>提前向店家確認 2027/4/15 是否營業、實際場次、四人座位及費用；小船乘載有限，四人可能需分船，是否能同時出發以店家回覆為準。貓咪是否上船依現場狀況。</p><p>行李與停車、下車步行位置先和包車司機確認。若無合適船班、天候取消或嚴重塞車，改咖啡廳／老社區短停，或直接前往飯店。</p></div><div class=\"trip-links\"><a class=\"trip-link\" href=\"https://www.facebook.com/SiyaekHuatakhe\" target=\"_blank\" rel=\"noopener noreferrer\">貓貓船官方 Facebook・確認預約<span aria-hidden=\"true\">↗</span></a><a class=\"trip-link\" href=\"https://maps.app.goo.gl/xf26zboBgnm63tdK7\" target=\"_blank\" rel=\"noopener noreferrer\">貓貓船地圖<span aria-hidden=\"true\">↗</span></a><a class=\"trip-link\" href=\"https://visionthai.net/article/bangkok-cat-boat-si-yaek-huatakhe-cafe-guesthouse/\" target=\"_blank\" rel=\"noopener noreferrer\">貓貓船體驗說明<span aria-hidden=\"true\">↗</span></a></div><div class=\"detail-copy ticket-price-note\"><p><strong>票價／費用查核 2026/11/17</strong></p><p>公開媒體及體驗文章記錄非住客搭船約 200 THB／人，四人先估 800 THB；這不是已取得的官方 2027 報價。需向 Si Yaek Huatakhe Cafe & Guesthouse 確認 2027/4/15 場次、四人分船、總價與天候規則，餐飲及包車等候不含。</p><p>以上是目前可核實的報價或參考資料，未保證 2027 當日票價與可訂狀況；四人均按外國成人計算。</p></div><div class=\"trip-links\"><a class=\"trip-link\" href=\"https://eastweek.stheadline.com/pets/15771/%E6%B3%B0%E5%9C%8B%E8%B2%93%E8%B2%93%E8%88%B9-%E8%B2%93%E8%B2%93%E9%A8%8E%E8%86%8A%E9%A6%AC%E9%99%AA%E9%81%8A%E8%88%B9%E6%B2%B350%E5%88%86%E9%90%98%E5%8F%AA%E9%9C%80200%E9%8A%96\" target=\"_blank\" rel=\"noopener noreferrer\">貓貓船媒體費用參考 ↗</a></div>",
                "icon": "fa-cat",
                "kind": "activity",
                "notice": "200 THB 為媒體參考，未取得店家 2027 報價；四人可能分兩艘，先確認同時出發。",
                "disclosureLabel": "",
                "photo": {
                    "file": "images/hua-takhe-cat-boat.webp",
                    "caption": "Hua Takhe・貓咪陪伴的運河遊船",
                    "alt": "Hua Takhe 運河小船上的貓咪與河畔木屋",
                    "scene": "day"
                },
                "id": "s-5a71b2aac1",
                "routeIndices": [
                    2
                ],
                "needsBooking": true
            },
            {
                "time": "17:30–19:00（估）",
                "title": "前往曼谷城市連結酒店・辦理入住",
                "summary": "由原包車送往 曼谷城市連結酒店 (Bangkok City Link Hotel)。",
                "details": "<div class=\"detail-copy\"><p>搭原包車前往 <strong>曼谷城市連結酒店 (Bangkok City Link Hotel)</strong>，辦理入住、放行李並稍作整理。抵達時間依貓貓船結束時間與市區路況。</p><p><strong>4/15 入住、4/17 退房，共 2 晚。</strong>房型：豪華特大雙人床房（Deluxe King Room），1 張特大雙人床。照片為飯店訂房系統的房型示意。</p><p>地址：345 Ratchaprarop 12 Alley, Makkasan, Ratchathewi, Bangkok 10400, Thailand。</p><p>依你提供的住宿費：兩晚四人共 NT$4,023，每人 NT$1,005.75。</p></div><div class=\"trip-links\"><a class=\"trip-link\" href=\"https://www.google.com/maps/search/?api=1&amp;query=Bangkok+City+Link+Hotel+Bangkok\" target=\"_blank\" rel=\"noopener noreferrer\">曼谷城市連結酒店地圖</a><a class=\"trip-link\" href=\"https://hotels.cloudbeds.com/reservation/7W2mRP?rid=195267\" target=\"_blank\" rel=\"noopener noreferrer\">飯店房型介紹與照片來源</a></div>",
                "icon": "fa-car",
                "kind": "transport",
                "notice": "",
                "disclosureLabel": "",
                "chapter": {
                    "label": "傍晚",
                    "time": "17:30–20:15",
                    "title": "進曼谷，入住後吃晚餐"
                },
                "id": "s-5958cd7dd1",
                "routeIndices": [
                    3
                ],
                "needsBooking": true,
                "photo": {
                    "file": "images/bangkok-city-link-deluxe-king.jpg",
                    "caption": "曼谷城市連結酒店・Deluxe King Room 房型示意",
                    "alt": "曼谷城市連結酒店豪華特大雙人床房，一張大床、木地板與玻璃隔間浴室",
                    "scene": "day"
                }
            },
            {
                "time": "19:00–20:15（彈性）",
                "title": "飯店附近・隨意晚餐",
                "summary": "先在曼谷城市連結酒店附近找方便的餐廳。",
                "details": "<div class=\"detail-copy\"><p>不固定餐廳，依入住時間與食慾選泰式料理、商場餐廳或路邊小吃；餐費依實際消費。若抵達較晚，夜遊同步順延或縮短。</p></div>",
                "icon": "fa-utensils",
                "kind": "dining",
                "notice": "",
                "disclosureLabel": "",
                "id": "s-bd13dbbdc4",
                "routeIndices": [
                    3
                ]
            },
            {
                "time": "20:15–20:45（估）",
                "title": "飯店 → Phloen Chit",
                "summary": "從曼谷城市連結酒店叫車到 Phloen Chit，接續 Big C 與娜娜夜遊。",
                "details": "<div class=\"detail-copy\"><p>晚餐後從曼谷城市連結酒店叫車前往 Phloen Chit；車資待填。時間依當晚路況彈性順延。</p></div>",
                "icon": "fa-train-subway",
                "kind": "transport",
                "notice": "",
                "disclosureLabel": "",
                "chapter": {
                    "label": "晚間",
                    "time": "20:15–23:45（彈性）",
                    "title": "先逛 Big C，再到娜娜散步"
                },
                "id": "s-9ab860bd03",
                "routeIndices": [
                    4
                ]
            },
            {
                "time": "20:45–21:15（順路選去）",
                "title": "Big C Foodplace Mahatun Plaza・順路看看",
                "summary": "Phloen Chit 下車後，有空就順路逛逛、少量買一些；想直接去娜娜也可以略過。",
                "details": "<div class=\"detail-copy\"><p>這家是 <strong>Big C Foodplace Mahatun Plaza</strong>，位於 Mahatun Plaza 一樓、Phloen Chit 路旁。Big C 的開幕公告列面積約 386 平方公尺，屬較小型的市區超市。</p><p>適合順路補買零食、飲料及日常用品；實際伴手禮種類與庫存以現場為準。遊客常去集中採買伴手禮的，是 CentralWorld 對面的 <strong>Big C Ratchadamri</strong>，兩家不同。</p><p>預留最多約 30 分鐘，順路看看有沒有想先買的零食或日用品，沒有需要就略過、直接前往娜娜廣場。這晚買完會繼續步行，先少量採購；大量伴手禮統一留到 4/16 上午的 Big C Extra Rama IV。開幕公告與你截圖的打烊時間不同，出發前再確認 2027/4/15 營業時間。</p></div><div class=\"trip-links\"><a class=\"trip-link\" href=\"https://www.google.com/maps/search/?api=1&amp;query=Big+C+Foodplace+Mahatun+Plaza+Bangkok\" target=\"_blank\" rel=\"noopener noreferrer\">Big C Foodplace Mahatun Plaza 地圖<span aria-hidden=\"true\">↗</span></a><a class=\"trip-link\" href=\"https://www.thaipr.net/life/3554660\" target=\"_blank\" rel=\"noopener noreferrer\">分店開幕與規模介紹<span aria-hidden=\"true\">↗</span></a></div>",
                "icon": "fa-basket-shopping",
                "kind": "activity",
                "notice": "這站非必去；大量採購已排 4/16 上午 Big C Extra Rama IV。",
                "disclosureLabel": "分店差別與採買安排",
                "id": "s-9a9cdf8192",
                "routeIndices": [
                    5
                ]
            },
            {
                "time": "21:15–21:30（估）",
                "title": "Big C Mahatun Plaza → 娜娜廣場",
                "summary": "若有逛 Big C，結帳後往 Nana 方向走；略過採買則可提早開始散步。",
                "details": "<div class=\"detail-copy\"><p>從 Big C Foodplace Mahatun Plaza 出發，沿素坤逸路往東步行，前往 Soi 4 的 Nana Plaza 娜娜廣場。預留約 15 分鐘，實際依人潮與過馬路時間調整。</p></div>",
                "icon": "fa-person-walking",
                "kind": "transport",
                "notice": "",
                "disclosureLabel": "",
                "id": "s-283b1e2b39",
                "routeIndices": [
                    6
                ]
            },
            {
                "time": "21:30–22:30（彈性）",
                "title": "娜娜廣場・看夜生活",
                "summary": "以娜娜廣場為今晚主要停留點，看看街區與店家氣氛。",
                "details": "<div class=\"detail-copy\"><p>停留時間依興趣調整；有入店或點飲料再依現場菜單消費，未預訂店家、套票或活動。</p></div>",
                "icon": "fa-moon",
                "kind": "night",
                "notice": "",
                "disclosureLabel": "",
                "id": "s-962a781a66",
                "routeIndices": [
                    6
                ]
            },
            {
                "time": "22:30–23:45（彈性）",
                "title": "娜娜廣場 → 曼谷城市連結酒店",
                "summary": "夜遊後叫車返回曼谷城市連結酒店。",
                "details": "<div class=\"detail-copy\"><p>結束娜娜廣場行程後，叫 Grab／計程車返回曼谷城市連結酒店，車資另計；依當晚精神與路況調整回程時間。</p></div><div class=\"trip-links\"><a class=\"trip-link\" href=\"https://www.google.com/maps/search/?api=1&query=Bangkok+City+Link+Hotel+Bangkok\" target=\"_blank\" rel=\"noopener noreferrer\">返回飯店地圖</a></div>",
                "icon": "fa-person-walking",
                "kind": "night",
                "notice": "",
                "disclosureLabel": "",
                "id": "s-b009b79df9",
                "routeIndices": [
                    7
                ]
            }
        ],
        "intro": "上午逛東芭，午後坐貓貓船，入住曼谷後吃飯、逛娜娜，再沿素坤逸路散步。",
        "route": [
            {
                "name": "芭達雅民宿",
                "lat": 12.93,
                "lon": 100.884,
                "approx": true,
                "googleQuery": "88 Soi Pattayasaisong 11, Pattaya City, Chon Buri 20150, Thailand",
                "note": "民宿地址：88 Soi Pattayasaisong 11, Pattaya City, 春武里 20150, 泰國；導航以地址搜尋結果確認入口。",
                "itemId": "s-e1a02702ae"
            },
            {
                "name": "東芭樂園",
                "lat": 12.768,
                "lon": 100.932,
                "googleQuery": "Nong Nooch Tropical Garden Thailand",
                "note": "上午叫車抵達，下午跨城包車從園區接人。",
                "approx": true,
                "itemId": "s-d914f7d158"
            },
            {
                "name": "Hua Takhe 貓貓船",
                "lat": 13.7241522,
                "lon": 100.7897698,
                "googleQuery": "Si Yaek Huatakhe Cafe & Guesthouse Bangkok",
                "note": "包車中停；四人船位及 4/15 場次須提前確認。",
                "approx": false,
                "itemId": "s-5a71b2aac1"
            },
            {
                "name": "曼谷城市連結酒店 (Bangkok City Link Hotel)",
                "lat": 13.75717831,
                "lon": 100.54322815,
                "googleQuery": "Bangkok City Link Hotel Bangkok",
                "note": "曼谷城市連結酒店；345 Ratchaprarop 12 Alley, Makkasan, Ratchathewi, Bangkok 10400。位置依飯店訂房系統。",
                "approx": false,
                "itemId": "s-5958cd7dd1"
            },
            {
                "name": "BTS Phloen Chit・夜遊起點",
                "lat": 13.743,
                "lon": 100.549,
                "googleQuery": "BTS Phloen Chit Bangkok",
                "note": "晚餐後搭 BTS 到這裡，先逛 Big C Mahatun Plaza，再往娜娜廣場步行。",
                "approx": true,
                "mapOnly": true,
                "itemId": "s-9ab860bd03"
            },
            {
                "name": "Big C Foodplace Mahatun Plaza",
                "lat": 13.742,
                "lon": 100.55,
                "googleQuery": "Big C Foodplace Mahatun Plaza Bangkok",
                "note": "Phloen Chit 下車後先採買，再步行去娜娜廣場；小型 Foodplace，並非 CentralWorld 對面的 Big C Ratchadamri。街區位置示意，以店家搜尋結果確認入口。",
                "approx": true,
                "mapOnly": true,
                "itemId": "s-9a9cdf8192"
            },
            {
                "name": "Nana Plaza 娜娜廣場",
                "lat": 13.742,
                "lon": 100.553,
                "googleQuery": "Nana Plaza Bangkok",
                "note": "今晚主要停留點；步行段，未列入跨城開車路線。",
                "approx": true,
                "mapOnly": true,
                "itemId": "s-962a781a66"
            },
            {
                "name": "曼谷城市連結酒店・夜遊回程",
                "lat": 13.75717831,
                "lon": 100.54322815,
                "googleQuery": "Bangkok City Link Hotel Bangkok",
                "note": "曼谷城市連結酒店；345 Ratchaprarop 12 Alley, Makkasan, Ratchathewi, Bangkok 10400。位置依飯店訂房系統。",
                "approx": false,
                "mapOnly": true,
                "itemId": "s-b009b79df9"
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
                "summary": "從 曼谷城市連結酒店 打車前往大型 Big C Extra，集中採買零食、伴手禮與日用品。",
                "details": "<div class=\"detail-copy\"><p>前往你提供的 <strong>Big C Extra Rama IV（拉瑪四路店）</strong>，地址為 2929 Rama IV Road。這家是大型量販店，和前一晚 Phloen Chit 的小型 Foodplace 不同，也不是 CentralWorld 對面的 Ratchadamri 分店。</p><p>預留約兩小時含交通、挑選與結帳，集中購買想帶回台灣的零食、調味料與日用品；品牌、規格、庫存及價格以現場為準。若時間不夠，可縮短午後河畔逛街時間，不必趕著買。</p><p>建議從飯店叫車往返，採買完先回曼谷城市連結酒店 放東西，再開始下午行程。營業時間出發前依 2027/4/16 店家公告確認。</p></div><div class=\"trip-links\"><a class=\"trip-link\" href=\"https://maps.app.goo.gl/C4zUFLfaZt7VQ48bA\" target=\"_blank\" rel=\"noopener noreferrer\">Big C Extra Rama IV 地圖<span aria-hidden=\"true\">↗</span></a></div>",
                "icon": "fa-cart-shopping",
                "kind": "activity",
                "notice": "採買後先回民宿放東西；車資與購物費依實際消費。",
                "disclosureLabel": "分店位置與採購安排",
                "chapter": {
                    "label": "上午",
                    "time": "09:30–12:00",
                    "title": "先把伴手禮買好，再輕鬆逛街"
                },
                "id": "s-28d1cd31d8",
                "routeIndices": [
                    1
                ]
            },
            {
                "time": "11:30–12:00（估）",
                "title": "回曼谷城市連結酒店・放購物袋",
                "summary": "叫車回飯店，把採買物品放好後再出門。",
                "details": "<div class=\"detail-copy\"><p>將購物袋送回曼谷城市連結酒店 (Bangkok City Link Hotel)，稍作整理、喝水休息。下午出門只帶隨身用品，避免一路提著伴手禮逛街。</p></div>",
                "icon": "fa-house",
                "kind": "transport",
                "notice": "",
                "disclosureLabel": "",
                "id": "s-2fbbfb5fbe",
                "routeIndices": [
                    2
                ]
            },
            {
                "time": "12:00–13:00（估）",
                "title": "前往 ICONSIAM・午餐",
                "summary": "從曼谷城市連結酒店出發，到 ICONSIAM 找午餐、開始河畔行程。",
                "details": "<div class=\"detail-copy\"><p>採買物品已先放回飯店，輕裝前往 ICONSIAM。可依當日路況選搭 BTS 轉 Gold Line 至 Charoen Nakhon，或直接叫車；午餐在商場安排，不固定餐廳。</p></div>",
                "icon": "fa-train-subway",
                "kind": "transport",
                "notice": "",
                "disclosureLabel": "",
                "chapter": {
                    "label": "午後",
                    "time": "12:00–16:30",
                    "title": "把下午留給河畔散步"
                },
                "id": "s-54d347115d",
                "routeIndices": [
                    3
                ]
            },
            {
                "time": "13:00–16:30",
                "title": "ICONSIAM・河畔逛逛",
                "summary": "逛 SookSiam、商場與河邊步道，吃點小食、喝飲料。",
                "details": "<div class=\"detail-copy\"><p>在 ICONSIAM 河畔及商場慢慢逛，依天氣切換室內與河邊步道，不再接 Siam／CentralWorld 或固定按摩，讓下午有餘裕。</p><p>晚上船上有晚餐，不另外排一頓正式晚餐。約 16:30 結束，接著前往碼頭；報到地點以新訂單為準，不能把 ICONSIAM 當成這艘船的固定登船點。</p></div><div class=\"trip-links\"><a class=\"trip-link\" href=\"https://www.google.com/maps/search/?api=1&amp;query=ICONSIAM+Bangkok\" target=\"_blank\" rel=\"noopener noreferrer\">ICONSIAM 地圖<span aria-hidden=\"true\">↗</span></a></div>",
                "icon": "fa-water",
                "kind": "activity",
                "notice": "",
                "disclosureLabel": "",
                "id": "s-e49aa8b368",
                "routeIndices": [
                    3
                ]
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
                },
                "id": "s-a4ff7bcc58",
                "routeIndices": [
                    4
                ]
            },
            {
                "time": "18:00–19:30（依方案確認）",
                "title": "河畔嘉年華號・報到與登船",
                "summary": "沿用上次 18:15 起報到、19:00 登船的安排，提前到場找櫃檯。",
                "details": "<div class=\"detail-copy\"><p>上次曼谷檔案記錄為 <strong>18:15～19:00 報到、19:00 登船、19:30 開航</strong>；飯店官方頁目前亦列 Carnival 18:00 check-in、19:00 上船。</p><p>這次先預留 18:00 到場找櫃檯、換票與洗手間時間，最晚報到截止仍依 <strong>2027/4/16 的新憑證</strong>確認。</p></div>",
                "icon": "fa-ticket",
                "kind": "activity",
                "notice": "舊行程的已預訂狀態不沿用；本次四人票券、場次與座位仍待確認。",
                "disclosureLabel": "",
                "id": "s-4eca03218a",
                "routeIndices": [
                    4
                ]
            },
            {
                "time": "19:30–21:30（沿用上次時段）",
                "title": "Riverside Carnival・河畔嘉年華號",
                "summary": "河畔嘉年華號自助晚餐與表演；目前售票參考 1,400 THB／人，四人先估 5,600 THB。",
                "details": "<div class=\"detail-copy\"><p>依你上次曼谷行程，安排同款 <strong>Riverside Carnival Cruise 河畔嘉年華號</strong>：船上用晚餐、欣賞歌舞秀與音樂，沿河看曼谷夜景。這是上次檔案中的實際船名，並非芭達雅東方公主號。</p><p>飯店官網現有 Carnival 資訊列 <strong>19:30 開航、21:30 靠岸</strong>。此為本次排程參考，2027 日期、航線、表演、餐飲及飲品包含內容以所選方案為準。</p><p><strong>狀態：待預訂四人船票。</strong>上次檔案只寫已預訂，未列實付價格；不帶入舊訂單狀態，也不把官網已過期促銷價當成本次票價。船票先按目前一般售票參考 1,400 THB／人估算，2027/4/16 方案與實付金額待確認。</p></div><div class=\"trip-links\"><a class=\"trip-link\" href=\"https://www.riversidebangkok.com/special-offers/\" target=\"_blank\" rel=\"noopener noreferrer\">Riverside 官方 Carnival 資訊<span aria-hidden=\"true\">↗</span></a><a class=\"trip-link\" href=\"https://www.ticket2attraction.com/discount-tickets/riverside-carnival-cruise/\" target=\"_blank\" rel=\"noopener noreferrer\">河畔嘉年華號・方案查詢<span aria-hidden=\"true\">↗</span></a></div><div class=\"detail-copy ticket-price-note\"><p><strong>票價／費用查核 2026/11/17</strong></p><p>目前售票商列 Riverside Carnival 成人 1,400 THB／人，四人先估 5,600 THB；採一般售票參考而非飯店已過期的 999 THB 活動。船餐屬此方案內容，不再另加一份正式晚餐預算。飲料、稅費、樓層與表演內容依最後所選訂單。近期售票資訊同時出現 Asiatique 18:15–20:30 與特定日期 Riverside Bangkok Hotel 19:30–21:30，不能以現有 2026 場次保證 2027/4/16。現行時序暫保留並標註依訂單確認；若換碼頭，交通段也要調整。</p><p>以上是目前可核實的報價或參考資料，未保證 2027 當日票價與可訂狀況；四人均按外國成人計算。</p></div><div class=\"trip-links\"><a class=\"trip-link\" href=\"https://www.bangkokchaophraya.com/bookingCheckAll-en.jsp\" target=\"_blank\" rel=\"noopener noreferrer\">Riverside Carnival 當期成人售價與碼頭說明 ↗</a></div>",
                "icon": "fa-ship",
                "kind": "dining",
                "notice": "2027/4/16 是週五，不套用現有週一至週四四人同行促銷；出發碼頭與航班必須再核對。",
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
                },
                "id": "s-b1fbdd4fff",
                "routeIndices": [
                    4
                ],
                "needsBooking": true
            },
            {
                "time": "21:30–22:30（估）",
                "title": "下船・返回曼谷城市連結酒店",
                "summary": "靠岸後叫車回曼谷城市連結酒店 (Bangkok City Link Hotel)，整理行李準備隔日返台。",
                "details": "<div class=\"detail-copy\"><p>遊船結束後，依實際靠岸碼頭叫 Grab／計程車返回 <strong>曼谷城市連結酒店 (Bangkok City Link Hotel)</strong>。今晚不再另外排夜生活，回房整理戰利品、行李與機場資料。</p><p>4/17 約 08:00 從飯店出發，09:45 前抵達 BKK（起飛前兩小時），11:45 搭機返台；出發時間依預約接送與路況確認。</p></div><div class=\"trip-links\"><a class=\"trip-link\" href=\"https://www.google.com/maps/search/?api=1&query=Bangkok+City+Link+Hotel+Bangkok\" target=\"_blank\" rel=\"noopener noreferrer\">返回曼谷城市連結酒店<span aria-hidden=\"true\">↗</span></a></div>",
                "icon": "fa-house",
                "kind": "transport",
                "notice": "",
                "disclosureLabel": "",
                "id": "s-4047c582f1",
                "routeIndices": [
                    5
                ]
            }
        ],
        "intro": "上午買伴手禮、回民宿放好，午後逛 ICONSIAM 河畔，傍晚報到搭嘉年華號，船上吃晚餐、看秀與夜景。",
        "route": [
            {
                "name": "曼谷城市連結酒店 (Bangkok City Link Hotel)",
                "lat": 13.75717831,
                "lon": 100.54322815,
                "note": "曼谷城市連結酒店；345 Ratchaprarop 12 Alley, Makkasan, Ratchathewi, Bangkok 10400。位置依飯店訂房系統。",
                "approx": false,
                "googleQuery": "Bangkok City Link Hotel Bangkok",
                "itemId": "s-2fbbfb5fbe"
            },
            {
                "name": "Big C Extra Rama IV",
                "lat": 13.719,
                "lon": 100.574,
                "note": "拉瑪四路店，2929 Rama IV Road；街區位置示意，以提供的 Google 地圖確認入口。",
                "approx": true,
                "googleQuery": "Big C Extra Rama IV Bangkok",
                "itemId": "s-28d1cd31d8"
            },
            {
                "name": "回曼谷城市連結酒店・放購物袋",
                "lat": 13.75717831,
                "lon": 100.54322815,
                "note": "曼谷城市連結酒店；345 Ratchaprarop 12 Alley, Makkasan, Ratchathewi, Bangkok 10400。位置依飯店訂房系統。",
                "approx": false,
                "googleQuery": "Bangkok City Link Hotel Bangkok",
                "itemId": "s-2fbbfb5fbe"
            },
            {
                "name": "ICONSIAM",
                "lat": 13.7268227,
                "lon": 100.510294,
                "note": "下午逛河畔與商場，16:30 左右離開前往遊船報到碼頭。",
                "approx": false,
                "googleQuery": "ICONSIAM Bangkok",
                "itemId": "s-e49aa8b368"
            },
            {
                "name": "Riverside Bangkok Hotel・嘉年華號碼頭",
                "lat": 13.7802,
                "lon": 100.4995,
                "googleQuery": "Riverside Bangkok Hotel 195 Ratchawithi 21 Bangkok",
                "note": "暫依上次飯店碼頭方案；2027/4/16 若憑證改列 Asiatique，交通與地圖需同步調整。",
                "approx": true,
                "itemId": "s-4eca03218a"
            },
            {
                "name": "回曼谷城市連結酒店・休息備返台",
                "lat": 13.75717831,
                "lon": 100.54322815,
                "note": "曼谷城市連結酒店；345 Ratchaprarop 12 Alley, Makkasan, Ratchathewi, Bangkok 10400。位置依飯店訂房系統。",
                "approx": false,
                "googleQuery": "Bangkok City Link Hotel Bangkok",
                "itemId": "s-4047c582f1"
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
                "summary": "07:30 整理退房，約 08:00 從曼谷城市連結酒店出發，目標 09:45 前到機場。",
                "details": "<div class=\"detail-copy\"><p>前一晚整理好行李，早上從 <strong>曼谷城市連結酒店 (Bangkok City Link Hotel)</strong>辦理退房，約 <strong>08:00</strong> 搭預約接送或計程車直接前往 <strong>BKK 蘇凡納布機場國際線出境大廳</strong>。</p><p>以 <strong>09:45 前抵達機場</strong>為目標，也就是原紀錄 11:45 航班起飛前兩小時。08:00 是接送規劃時間，實際依司機建議與當日路況提前調整。</p></div>",
                "icon": "fa-car",
                "kind": "transport",
                "notice": "目的地為 BKK 蘇凡納布機場；出發時間以能在 09:45 前抵達為準。",
                "disclosureLabel": "",
                "id": "s-06f970dc3f",
                "routeIndices": [
                    1
                ],
                "needsBooking": true
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
                },
                "id": "s-c1a362f048",
                "routeIndices": [
                    1
                ]
            },
            {
                "time": "11:45 → 16:15（當地時間）",
                "title": "TG630・曼谷飛高雄",
                "summary": "11:45 從 BKK 起飛，16:15 抵達高雄 KHH。",
                "details": "<div class=\"detail-copy\"><p>依目前行程紀錄：2027/4/17（六）搭乘泰國航空 <strong>TG630</strong>，<strong>11:45 BKK → 16:15 KHH</strong>，飛行約 3 小時 30 分。泰國比台灣慢一小時，兩端皆為當地時間；實際航班資訊以機票與航空公司通知為準。</p></div>",
                "icon": "fa-plane-departure",
                "kind": "transport",
                "notice": "",
                "disclosureLabel": "",
                "id": "s-f99b8f90ab",
                "routeIndices": [
                    1
                ]
            }
        ],
        "intro": "退房後直接前往 BKK，起飛前兩小時抵達機場，辦理報到、搭機返回高雄。",
        "route": [
            {
                "name": "曼谷城市連結酒店 (Bangkok City Link Hotel)",
                "lat": 13.75717831,
                "lon": 100.54322815,
                "note": "曼谷城市連結酒店；345 Ratchaprarop 12 Alley, Makkasan, Ratchathewi, Bangkok 10400。位置依飯店訂房系統。",
                "approx": false,
                "googleQuery": "Bangkok City Link Hotel Bangkok",
                "itemId": "s-06f970dc3f"
            },
            {
                "name": "BKK 蘇凡納布機場",
                "lat": 13.69,
                "lon": 100.75,
                "note": "航廈區域示意。",
                "approx": true,
                "googleQuery": "Suvarnabhumi Airport Thailand",
                "itemId": "s-c1a362f048"
            }
        ],
        "photoCaption": "BKK 蘇凡納布機場・出境報到大廳"
    }
};
            const legacyItemIds = {"day1":["s-a2a077bc48","s-e692da9752","s-46680b4569","s-34d03e99d2","s-95e9a46204","s-7361eefacf","s-7d521d25bb","s-7d521d25bb","s-ead83eefec","s-b4bed3a682","s-5d050d926d","s-8aebcc324b"],"day2":["s-abc08fe317","s-584c900b54","s-b0f19d3a07","s-1d97b35d1e","s-7754be56d9","s-325e2588e9","s-dfcef3dbb1","s-79bef5c9df","s-341770ae90","s-bfbe0387ee","s-1b08c846c6","s-4284ae4d92","s-34d077ae20","s-bc98b5f00d","s-04f0c2f556"],"day3":["s-493b28dc98","s-1f2c4d6113","s-f11619f31f","s-2eefc5a3b4","s-9a638904f0","s-78c0b9bd7c","s-16c03a16f0","s-117798c4ea","s-60702fef4a","s-3646f15f55"],"day4":["s-d64df5b01f","s-3c1126f221","s-79ee2fc29a","s-5cee1245ae","s-99d3c9dabb","s-ca389d2a79","s-8ce8fd8982","s-93ef7b2925","s-6e0abec254","s-1c1d312f97"],"day5":["s-fde119d910","s-8b6d3a7c25","s-40189c4331","s-3a66b1cdc8"],"day6":["s-e1a02702ae","s-d914f7d158","s-c0ac557b28","s-5a71b2aac1","s-5958cd7dd1","s-bd13dbbdc4","s-9ab860bd03","s-9a9cdf8192","s-283b1e2b39","s-962a781a66","s-b009b79df9"],"day7":["s-28d1cd31d8","s-2fbbfb5fbe","s-54d347115d","s-e49aa8b368","s-a4ff7bcc58","s-4eca03218a","s-b1fbdd4fff","s-4047c582f1"],"day8":["s-06f970dc3f","s-c1a362f048","s-f99b8f90ab"]};
            const priorExpenseSeeds = [
    {
        "id": "quote-s-95e9a46204",
        "day": "day1",
        "itemId": "s-95e9a46204",
        "label": "BKK → 春武里 LOF LAND",
        "amount": 1800,
        "currency": "THB",
        "basis": "group",
        "status": "confirmed",
        "note": "原行程的四人整段包車報價，含 LOF LAND 停留加價；後段車程不重複計入。"
    },
    {
        "id": "quote-s-7361eefacf",
        "day": "day1",
        "itemId": "s-7361eefacf",
        "label": "LOF LAND・拍照與飲料",
        "amount": 300,
        "currency": "THB",
        "basis": "person",
        "status": "confirmed",
        "note": "原行程記錄：每人門票含一杯飲料，加點另計。"
    },
    {
        "id": "quote-s-b4bed3a682",
        "day": "day1",
        "itemId": "s-b4bed3a682",
        "label": "DAM 海濱晚餐",
        "amount": 1933,
        "currency": "TWD",
        "basis": "group",
        "status": "confirmed",
        "note": "原行程四人前排方案報價；是否付款仍請自行確認。"
    },
    {
        "id": "quote-s-584c900b54",
        "day": "day2",
        "itemId": "s-584c900b54",
        "label": "換票・租四人球車",
        "amount": 550,
        "currency": "THB",
        "basis": "group",
        "status": "estimate",
        "note": "原行程球車基本 2 小時 500＋保險 50；不含超時、門票或擔保。"
    },
    {
        "id": "quote-s-bfbe0387ee",
        "day": "day2",
        "itemId": "s-bfbe0387ee",
        "label": "House of Benedict",
        "amount": 200,
        "currency": "THB",
        "basis": "person",
        "status": "estimate",
        "note": "原行程售票頁參考；非 2027 實付保證價，餐飲另計。"
    },
    {
        "id": "quote-s-34d077ae20",
        "day": "day2",
        "itemId": "s-34d077ae20",
        "label": "69 Pattaya Show",
        "amount": 700,
        "currency": "THB",
        "basis": "person",
        "status": "confirmed",
        "note": "你提供的票價；接送是否包含另行確認。"
    },
    {
        "id": "quote-s-493b28dc98",
        "day": "day3",
        "itemId": "s-493b28dc98",
        "label": "Thai Sky Adventures・Deluxe 跳傘與拍攝",
        "amount": 15650,
        "currency": "THB",
        "basis": "person",
        "status": "estimate",
        "note": "你選的 Deluxe；官網商品價查核 2026/11/17。含影片、照片、開傘後教練拍攝及芭達雅接送；重量加價與可能刷卡費未含。",
        "sourceUrl": "https://thaiskyadventures.com/product/tandem-deluxe-skydive/",
        "checkedAt": "2026-11-17"
    },
    {
        "id": "quote-s-78c0b9bd7c",
        "day": "day3",
        "itemId": "s-78c0b9bd7c",
        "label": "Seafood Station Pattaya・海鮮吃到飽",
        "amount": 499,
        "currency": "THB",
        "basis": "person",
        "status": "estimate",
        "note": "沿用原行程參考預算，來源有價差，需向店家確認；未加啤酒。"
    },
    {
        "id": "unknown-day1",
        "day": "day1",
        "itemId": null,
        "label": "其他餐飲、交通、未定門票與購物",
        "amount": null,
        "currency": "THB",
        "basis": "group",
        "status": "unknown",
        "note": "尚未填寫，不以 0 元計入。酒吧飲品、單點餐點及加購依實際選擇新增。"
    },
    {
        "id": "unknown-day2",
        "day": "day2",
        "itemId": null,
        "label": "其他餐飲、交通、未定門票與購物",
        "amount": null,
        "currency": "THB",
        "basis": "group",
        "status": "unknown",
        "note": "尚未填寫，不以 0 元計入。酒吧飲品、單點餐點及加購依實際選擇新增。"
    },
    {
        "id": "unknown-day3",
        "day": "day3",
        "itemId": null,
        "label": "其他餐飲、交通、未定門票與購物",
        "amount": null,
        "currency": "THB",
        "basis": "group",
        "status": "unknown",
        "note": "尚未填寫，不以 0 元計入。酒吧飲品、單點餐點及加購依實際選擇新增。"
    },
    {
        "id": "unknown-day4",
        "day": "day4",
        "itemId": null,
        "label": "其他餐飲、交通、未定門票與購物",
        "amount": null,
        "currency": "THB",
        "basis": "group",
        "status": "unknown",
        "note": "尚未填寫，不以 0 元計入。酒吧飲品、單點餐點及加購依實際選擇新增。"
    },
    {
        "id": "unknown-day5",
        "day": "day5",
        "itemId": null,
        "label": "其他餐飲、交通、未定門票與購物",
        "amount": null,
        "currency": "THB",
        "basis": "group",
        "status": "unknown",
        "note": "尚未填寫，不以 0 元計入。酒吧飲品、單點餐點及加購依實際選擇新增。"
    },
    {
        "id": "unknown-day6",
        "day": "day6",
        "itemId": null,
        "label": "其他餐飲、交通、未定門票與購物",
        "amount": null,
        "currency": "THB",
        "basis": "group",
        "status": "unknown",
        "note": "尚未填寫，不以 0 元計入。酒吧飲品、單點餐點及加購依實際選擇新增。"
    },
    {
        "id": "unknown-day7",
        "day": "day7",
        "itemId": null,
        "label": "其他餐飲、交通、未定門票與購物",
        "amount": null,
        "currency": "THB",
        "basis": "group",
        "status": "unknown",
        "note": "尚未填寫，不以 0 元計入。酒吧飲品、單點餐點及加購依實際選擇新增。"
    },
    {
        "id": "unknown-day8",
        "day": "day8",
        "itemId": null,
        "label": "其他餐飲、交通、未定門票與購物",
        "amount": null,
        "currency": "THB",
        "basis": "group",
        "status": "unknown",
        "note": "尚未填寫，不以 0 元計入。酒吧飲品、單點餐點及加購依實際選擇新增。"
    },
    {
        "id": "pending-day1-0",
        "day": "day1",
        "itemId": "s-a2a077bc48",
        "label": "來回機票（合併票只填一次）",
        "amount": null,
        "currency": "TWD",
        "basis": "group",
        "status": "unknown",
        "note": "尚無實際報價，不以零元算入；若已含於套票或住宿，勿重複填寫。"
    },
    {
        "id": "pending-day1-1",
        "day": "day1",
        "itemId": "s-7d521d25bb",
        "label": "芭達雅住宿・第 1 晚",
        "amount": null,
        "currency": "THB",
        "basis": "group",
        "status": "unknown",
        "note": "尚無實際報價，不以零元算入；若已含於套票或住宿，勿重複填寫。"
    },
    {
        "id": "pending-day2-3",
        "day": "day2",
        "itemId": "s-1b08c846c6",
        "label": "芭達雅住宿・第 2 晚",
        "amount": null,
        "currency": "THB",
        "basis": "group",
        "status": "unknown",
        "note": "尚無實際報價，不以零元算入；若已含於套票或住宿，勿重複填寫。"
    },
    {
        "id": "pending-day3-4",
        "day": "day3",
        "itemId": "s-1f2c4d6113",
        "label": "芭達雅住宿・第 3 晚",
        "amount": null,
        "currency": "THB",
        "basis": "group",
        "status": "unknown",
        "note": "尚無實際報價，不以零元算入；若已含於套票或住宿，勿重複填寫。"
    },
    {
        "id": "pending-day4-4",
        "day": "day4",
        "itemId": "s-3c1126f221",
        "label": "芭達雅住宿・第 4 晚",
        "amount": null,
        "currency": "THB",
        "basis": "group",
        "status": "unknown",
        "note": "尚無實際報價，不以零元算入；若已含於套票或住宿，勿重複填寫。"
    },
    {
        "id": "pending-day5-3",
        "day": "day5",
        "itemId": "s-8b6d3a7c25",
        "label": "芭達雅住宿・第 5 晚",
        "amount": null,
        "currency": "THB",
        "basis": "group",
        "status": "unknown",
        "note": "尚無實際報價，不以零元算入；若已含於套票或住宿，勿重複填寫。"
    },
    {
        "id": "pending-day6-1",
        "day": "day6",
        "itemId": "s-c0ac557b28",
        "label": "包車東芭→貓貓船→彩虹雲霄酒店・含中停等候",
        "amount": null,
        "currency": "THB",
        "basis": "group",
        "status": "unknown",
        "note": "尚無實際報價，不以零元算入；若已含於套票或住宿，勿重複填寫。"
    },
    {
        "id": "pending-day6-4",
        "day": "day6",
        "itemId": "s-5958cd7dd1",
        "label": "曼谷城市連結酒店・4/15–4/17（2 晚）",
        "amount": 9870,
        "currency": "TWD",
        "basis": "group",
        "status": "estimate",
        "note": "新飯店豪華特大雙人床房（Deluxe King Room），4/15–4/17 共 2 晚。暫沿用原住宿預算 NT$9,870 ÷ 4＝每人 NT$2,467.50；本飯店實際訂單總額待確認。"
    },
    {
        "id": "pending-day7-3",
        "day": "day7",
        "itemId": "s-4047c582f1",
        "label": "Yu Sabay 住宿・第 2 晚",
        "amount": null,
        "currency": "THB",
        "basis": "group",
        "status": "unknown",
        "note": "尚無實際報價，不以零元算入；若已含於套票或住宿，勿重複填寫。"
    },
    {
        "id": "pending-day8-0",
        "day": "day8",
        "itemId": "s-06f970dc3f",
        "label": "彩虹雲霄酒店 → BKK 機場接送",
        "amount": null,
        "currency": "THB",
        "basis": "group",
        "status": "unknown",
        "note": "尚無實際報價，不以零元算入；若已含於套票或住宿，勿重複填寫。"
    }
];
            const expenseSeedRevision = "2026-11-26-city-link-4023";
            const defaultExpenses = [
    {
        "id": "quote-s-95e9a46204",
        "day": "day1",
        "itemId": "s-95e9a46204",
        "label": "BKK → 春武里 LOF LAND",
        "amount": 1800,
        "currency": "THB",
        "basis": "group",
        "status": "confirmed",
        "note": "原行程的四人整段包車報價，含 LOF LAND 停留加價；後段車程不重複計入。"
    },
    {
        "id": "quote-s-7361eefacf",
        "day": "day1",
        "itemId": "s-7361eefacf",
        "label": "LOF LAND・拍照與飲料",
        "amount": 300,
        "currency": "THB",
        "basis": "person",
        "status": "confirmed",
        "note": "原行程記錄：每人門票含一杯飲料，加點另計。"
    },
    {
        "id": "quote-s-b4bed3a682",
        "day": "day1",
        "itemId": "s-b4bed3a682",
        "label": "DAM 海濱晚餐",
        "amount": 1933,
        "currency": "TWD",
        "basis": "group",
        "status": "confirmed",
        "note": "原行程四人前排方案報價；是否付款仍請自行確認。"
    },
    {
        "id": "quote-s-584c900b54",
        "day": "day2",
        "itemId": "s-584c900b54",
        "label": "綠山動物園・四人球車首 2 小時與保險",
        "amount": 550,
        "currency": "THB",
        "basis": "group",
        "status": "estimate",
        "note": "園方首 2 小時 500／車，沿用保險 50；超時另列預備金，不含入場門票。"
    },
    {
        "id": "quote-s-bfbe0387ee",
        "day": "day2",
        "itemId": "s-bfbe0387ee",
        "label": "House of Benedict",
        "amount": 200,
        "currency": "THB",
        "basis": "person",
        "status": "estimate",
        "note": "泰國觀光局日本站 2026/11/17 查核，每人入場 200；餐飲兌換條件依票券確認。",
        "sourceUrl": "https://www.thailandtravel.or.jp/house-of-benedict/",
        "checkedAt": "2026-11-17"
    },
    {
        "id": "quote-s-34d077ae20",
        "day": "day2",
        "itemId": "s-34d077ae20",
        "label": "69 Pattaya Show",
        "amount": 700,
        "currency": "THB",
        "basis": "person",
        "status": "confirmed",
        "note": "你提供的票價；接送是否包含另行確認。"
    },
    {
        "id": "quote-s-493b28dc98",
        "day": "day3",
        "itemId": "s-493b28dc98",
        "label": "Thai Sky Adventures・雙人跳傘",
        "amount": 13100,
        "currency": "THB",
        "basis": "person",
        "status": "confirmed",
        "note": "你提供的報價：13,100 THB／人，四人 52,400 THB；拍攝、接送與額外加價條件依實際訂單確認。",
        "sourceUrl": "",
        "checkedAt": "2026-11-26"
    },
    {
        "id": "quote-s-78c0b9bd7c",
        "day": "day3",
        "itemId": "s-78c0b9bd7c",
        "label": "Seafood Station Pattaya・海鮮吃到飽",
        "amount": 499,
        "currency": "THB",
        "basis": "person",
        "status": "estimate",
        "note": "沿用原行程參考預算，來源有價差，需向店家確認；未加啤酒。"
    },
    {
        "id": "ticket-zoo",
        "day": "day2",
        "itemId": "s-584c900b54",
        "label": "綠山動物園・外國成人門票",
        "amount": 350,
        "currency": "THB",
        "basis": "person",
        "status": "estimate",
        "note": "園方與泰國觀光局現行票價查核 2026/11/17；含免費場次，球車另外列。",
        "sourceUrl": "https://khaokheow.zoothailand.org/en/ewt_news.php?c_id=34&n_id=173",
        "checkedAt": "2026-11-17"
    },
    {
        "id": "cart-overtime",
        "day": "day2",
        "itemId": "s-584c900b54",
        "label": "綠山動物園・球車超時預備金",
        "amount": 600,
        "currency": "THB",
        "basis": "group",
        "status": "estimate",
        "note": "按原租借 4 小時 45 分鐘額外暫估，非園方核定總額；實際超時費依現場級距。"
    },
    {
        "id": "ticket-truth",
        "day": "day4",
        "itemId": "s-5cee1245ae",
        "label": "真理寺・成人日間票",
        "amount": 500,
        "currency": "THB",
        "basis": "person",
        "status": "estimate",
        "note": "官方售票頁查核 2026/11/17；14:30 日間參觀，不加夜間票或選購活動。",
        "sourceUrl": "https://sanctuaryoftruthmuseum.com/shop/sanctuary-of-truth-entrance-ticket/",
        "checkedAt": "2026-11-17"
    },
    {
        "id": "ticket-nongnooch",
        "day": "day6",
        "itemId": "s-d914f7d158",
        "label": "東芭樂園・門票＋遊園車",
        "amount": 700,
        "currency": "THB",
        "basis": "person",
        "status": "estimate",
        "note": "外國成人方案參考：不以限時折扣價編列；未含秀、午餐或接送，2027 日期待確認。",
        "sourceUrl": "https://www.gother.com/en-us/experiences/thailand/chonburi/nong-nooch-tropical-garden-pattaya-1776910986",
        "checkedAt": "2026-11-17"
    },
    {
        "id": "ticket-catboat",
        "day": "day6",
        "itemId": "s-5a71b2aac1",
        "label": "Hua Takhe・貓貓船",
        "amount": 200,
        "currency": "THB",
        "basis": "person",
        "status": "estimate",
        "note": "媒體參考價，非店家 2027 報價；四人可能分兩艘，須向店家確認。",
        "sourceUrl": "https://eastweek.stheadline.com/pets/15771/%E6%B3%B0%E5%9C%8B%E8%B2%93%E8%B2%93%E8%88%B9-%E8%B2%93%E8%B2%93%E9%A8%8E%E8%86%8A%E9%A6%AC%E9%99%AA%E9%81%8A%E8%88%B9%E6%B2%B350%E5%88%86%E9%90%98%E5%8F%AA%E9%9C%80200%E9%8A%96",
        "checkedAt": "2026-11-17"
    },
    {
        "id": "ticket-carnival",
        "day": "day7",
        "itemId": "s-b1fbdd4fff",
        "label": "Riverside Carnival・晚餐遊船",
        "amount": 1400,
        "currency": "THB",
        "basis": "person",
        "status": "estimate",
        "note": "售票商當期成人參考 2026/11/17；含方案內晚餐，不套用過期或週一至四促銷，碼頭／班次待確認。",
        "sourceUrl": "https://www.bangkokchaophraya.com/bookingCheckAll-en.jsp",
        "checkedAt": "2026-11-17"
    },
    {
        "id": "tour-kohlarn",
        "day": "day5",
        "itemId": "s-fde119d910",
        "label": "格蘭島・C1 快艇午餐與三項活動",
        "amount": 1800,
        "currency": "THB",
        "basis": "person",
        "status": "estimate",
        "note": "以 C1 公開起價編列參考，不是已預訂；含拖曳傘、水上摩托車、香蕉船，海底漫步未計。",
        "sourceUrl": "https://www.ticket2attraction.com/discount-tickets/pattaya-coral-island-koh-larn-day-tour/",
        "checkedAt": "2026-11-17"
    },
    {
        "id": "pending-day1-0",
        "day": "day1",
        "itemId": "s-a2a077bc48",
        "label": "來回機票",
        "amount": 12294,
        "currency": "TWD",
        "basis": "person",
        "status": "confirmed",
        "note": "你提供的機票費用：每人 NT$12,294；四人 NT$49,176，整趟只計一次。"
    },
    {
        "id": "pending-day1-1",
        "day": "day1",
        "itemId": "s-7d521d25bb",
        "label": "芭達雅住宿・4/10–4/15（5 晚）",
        "amount": 3968,
        "currency": "TWD",
        "basis": "person",
        "status": "confirmed",
        "note": "你提供的整段住宿費：每人 NT$3,968；四人 NT$15,872。地址：88 Soi Pattayasaisong 11, Pattaya City, 春武里 20150, 泰國。整段列在入住日，不逐晚重複計價。"
    },
    {
        "id": "pending-day1-2",
        "day": "day1",
        "itemId": "s-ead83eefec",
        "label": "DAM／六巷市區叫車",
        "amount": null,
        "currency": "THB",
        "basis": "group",
        "status": "unknown",
        "note": "尚無實際報價，不以零元算入；若已含於套票或住宿，勿重複填寫。"
    },
    {
        "id": "pending-day1-3",
        "day": "day1",
        "itemId": "s-b4bed3a682",
        "label": "DAM 額外加點與當日其他餐飲",
        "amount": null,
        "currency": "THB",
        "basis": "group",
        "status": "unknown",
        "note": "尚無實際報價，不以零元算入；若已含於套票或住宿，勿重複填寫。"
    },
    {
        "id": "pending-day1-4",
        "day": "day1",
        "itemId": "s-8aebcc324b",
        "label": "六巷飲品與個人消費",
        "amount": null,
        "currency": "THB",
        "basis": "group",
        "status": "unknown",
        "note": "尚無實際報價，不以零元算入；若已含於套票或住宿，勿重複填寫。"
    },
    {
        "id": "pending-day2-0",
        "day": "day2",
        "itemId": "s-abc08fe317",
        "label": "動物園與 House of Benedict 接送",
        "amount": null,
        "currency": "THB",
        "basis": "group",
        "status": "unknown",
        "note": "尚無實際報價，不以零元算入；若已含於套票或住宿，勿重複填寫。"
    },
    {
        "id": "pending-day2-1",
        "day": "day2",
        "itemId": "s-325e2588e9",
        "label": "午餐、晚餐與額外飲料",
        "amount": null,
        "currency": "THB",
        "basis": "group",
        "status": "unknown",
        "note": "尚無實際報價，不以零元算入；若已含於套票或住宿，勿重複填寫。"
    },
    {
        "id": "pending-day2-2",
        "day": "day2",
        "itemId": "s-04f0c2f556",
        "label": "六巷飲品與市區交通",
        "amount": null,
        "currency": "THB",
        "basis": "group",
        "status": "unknown",
        "note": "尚無實際報價，不以零元算入；若已含於套票或住宿，勿重複填寫。"
    },
    {
        "id": "pending-day3-0",
        "day": "day3",
        "itemId": "s-1f2c4d6113",
        "label": "午餐與額外餐飲",
        "amount": null,
        "currency": "THB",
        "basis": "group",
        "status": "unknown",
        "note": "尚無實際報價，不以零元算入；若已含於套票或住宿，勿重複填寫。"
    },
    {
        "id": "pending-day3-1",
        "day": "day3",
        "itemId": "s-2eefc5a3b4",
        "label": "觀景台、中天與六巷叫車",
        "amount": null,
        "currency": "THB",
        "basis": "group",
        "status": "unknown",
        "note": "尚無實際報價，不以零元算入；若已含於套票或住宿，勿重複填寫。"
    },
    {
        "id": "pending-day3-2",
        "day": "day3",
        "itemId": "s-117798c4ea",
        "label": "ZAMĀ 調酒與餐點・依點餐",
        "amount": null,
        "currency": "THB",
        "basis": "group",
        "status": "unknown",
        "note": "尚無實際報價，不以零元算入；若已含於套票或住宿，勿重複填寫。"
    },
    {
        "id": "pending-day3-3",
        "day": "day3",
        "itemId": "s-3646f15f55",
        "label": "六巷飲品與個人消費",
        "amount": null,
        "currency": "THB",
        "basis": "group",
        "status": "unknown",
        "note": "尚無實際報價，不以零元算入；若已含於套票或住宿，勿重複填寫。"
    },
    {
        "id": "pending-day4-0",
        "day": "day4",
        "itemId": "s-3c1126f221",
        "label": "午餐與其他餐飲",
        "amount": null,
        "currency": "THB",
        "basis": "group",
        "status": "unknown",
        "note": "尚無實際報價，不以零元算入；若已含於套票或住宿，勿重複填寫。"
    },
    {
        "id": "pending-day4-1",
        "day": "day4",
        "itemId": "s-ca389d2a79",
        "label": "The Sky Gallery・四人單點晚餐",
        "amount": null,
        "currency": "THB",
        "basis": "group",
        "status": "unknown",
        "note": "尚無實際報價，不以零元算入；若已含於套票或住宿，勿重複填寫。"
    },
    {
        "id": "pending-day4-2",
        "day": "day4",
        "itemId": "s-79ee2fc29a",
        "label": "真理寺、觀景台與六巷交通",
        "amount": null,
        "currency": "THB",
        "basis": "group",
        "status": "unknown",
        "note": "尚無實際報價，不以零元算入；若已含於套票或住宿，勿重複填寫。"
    },
    {
        "id": "pending-day4-3",
        "day": "day4",
        "itemId": "s-1c1d312f97",
        "label": "六巷飲品與個人消費",
        "amount": null,
        "currency": "THB",
        "basis": "group",
        "status": "unknown",
        "note": "尚無實際報價，不以零元算入；若已含於套票或住宿，勿重複填寫。"
    },
    {
        "id": "pending-day5-0",
        "day": "day5",
        "itemId": "s-8b6d3a7c25",
        "label": "SPA 療程・尚未選定",
        "amount": null,
        "currency": "THB",
        "basis": "group",
        "status": "unknown",
        "note": "尚無實際報價，不以零元算入；若已含於套票或住宿，勿重複填寫。"
    },
    {
        "id": "pending-day5-1",
        "day": "day5",
        "itemId": "s-40189c4331",
        "label": "夜市晚餐與額外餐飲",
        "amount": null,
        "currency": "THB",
        "basis": "group",
        "status": "unknown",
        "note": "尚無實際報價，不以零元算入；若已含於套票或住宿，勿重複填寫。"
    },
    {
        "id": "pending-day5-2",
        "day": "day5",
        "itemId": "s-3a66b1cdc8",
        "label": "六巷飲品、市區交通與購物",
        "amount": null,
        "currency": "THB",
        "basis": "group",
        "status": "unknown",
        "note": "尚無實際報價，不以零元算入；若已含於套票或住宿，勿重複填寫。"
    },
    {
        "id": "pending-day6-0",
        "day": "day6",
        "itemId": "s-e1a02702ae",
        "label": "退房後打車至東芭樂園",
        "amount": null,
        "currency": "THB",
        "basis": "group",
        "status": "unknown",
        "note": "尚無實際報價，不以零元算入；若已含於套票或住宿，勿重複填寫。"
    },
    {
        "id": "pending-day6-1",
        "day": "day6",
        "itemId": "s-c0ac557b28",
        "label": "包車東芭→貓貓船→曼谷城市連結酒店・含中停等候",
        "amount": null,
        "currency": "THB",
        "basis": "group",
        "status": "unknown",
        "note": "尚無實際報價，不以零元算入；若已含於套票或住宿，勿重複填寫。"
    },
    {
        "id": "pending-day6-2",
        "day": "day6",
        "itemId": "s-d914f7d158",
        "label": "東芭午餐與當日其他餐飲",
        "amount": null,
        "currency": "THB",
        "basis": "group",
        "status": "unknown",
        "note": "尚無實際報價，不以零元算入；若已含於套票或住宿，勿重複填寫。"
    },
    {
        "id": "pending-day6-3",
        "day": "day6",
        "itemId": "s-9ab860bd03",
        "label": "晚間叫車與少量採買",
        "amount": null,
        "currency": "THB",
        "basis": "group",
        "status": "unknown",
        "note": "尚無實際報價，不以零元算入；若已含於套票或住宿，勿重複填寫。"
    },
    {
        "id": "pending-day6-4",
        "day": "day6",
        "itemId": "s-5958cd7dd1",
        "label": "曼谷城市連結酒店・4/15–4/17（2 晚）",
        "amount": 4023,
        "currency": "TWD",
        "basis": "group",
        "status": "confirmed",
        "note": "你提供的曼谷城市連結酒店住宿總價：4/15–4/17 共 2 晚，四人 NT$4,023 ÷ 4＝每人 NT$1,005.75；豪華特大雙人床房（Deluxe King Room）。整段列在入住日，只計一次。"
    },
    {
        "id": "pending-day7-0",
        "day": "day7",
        "itemId": "s-28d1cd31d8",
        "label": "Big C 採買與購物",
        "amount": null,
        "currency": "THB",
        "basis": "group",
        "status": "unknown",
        "note": "尚無實際報價，不以零元算入；若已含於套票或住宿，勿重複填寫。"
    },
    {
        "id": "pending-day7-1",
        "day": "day7",
        "itemId": "s-28d1cd31d8",
        "label": "民宿、超市、河畔與碼頭交通",
        "amount": null,
        "currency": "THB",
        "basis": "group",
        "status": "unknown",
        "note": "尚無實際報價，不以零元算入；若已含於套票或住宿，勿重複填寫。"
    },
    {
        "id": "pending-day7-2",
        "day": "day7",
        "itemId": "s-54d347115d",
        "label": "午餐與額外餐飲（船餐已列）",
        "amount": null,
        "currency": "THB",
        "basis": "group",
        "status": "unknown",
        "note": "尚無實際報價，不以零元算入；若已含於套票或住宿，勿重複填寫。"
    },
    {
        "id": "pending-day8-0",
        "day": "day8",
        "itemId": "s-06f970dc3f",
        "label": "曼谷城市連結酒店 → BKK 機場接送",
        "amount": null,
        "currency": "THB",
        "basis": "group",
        "status": "unknown",
        "note": "尚無實際報價，不以零元算入；若已含於套票或住宿，勿重複填寫。"
    },
    {
        "id": "pending-day8-1",
        "day": "day8",
        "itemId": "s-c1a362f048",
        "label": "機場餐飲與個人消費",
        "amount": null,
        "currency": "THB",
        "basis": "group",
        "status": "unknown",
        "note": "尚無實際報價，不以零元算入；若已含於套票或住宿，勿重複填寫。"
    },
    {
        "id": "pending-sky-surcharges",
        "day": "day3",
        "itemId": "s-493b28dc98",
        "label": "跳傘可能加價・付款／重量／保險條件待確認",
        "amount": null,
        "currency": "THB",
        "basis": "group",
        "status": "unknown",
        "note": "付款方式、重量、保險及接送是否另收費，以本次 13,100 THB 方案的實際訂單確認；尚未報價，未計入小計。",
        "sourceUrl": "",
        "checkedAt": "2026-11-26"
    }
];
            const tripState = readTripState();

            // --- INITIALIZATION ---

            function setupPage() {
                setupAnimations();
                setupSongkranWater();
                document.getElementById('begin-trip').addEventListener('click', () => document.querySelector('[data-target="day1"]').click());
                setupOverviewFolds();
                generateDailySections();
                setupRouteControls();
                setupDateNavigation();
                setupTabSwitching();
                setupScrollToTop();
                setupPracticalMode();
                setupPlannerTools();
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
                const route=TripTools.parseRoute(location.hash,itineraryData) || {day:'overview',item:null};
                const saved=tripState.position?.day===route.day&&!route.item?{...tripState.position}:null;
                navigateDay(route.day,{item:route.item,history:false,instant:true,resume:saved});
            }

            setupPage();

            // --- SETUP FUNCTIONS ---
            function itemFromId(day,id){return itineraryData[day]?.items.find(item=>item.id===id);}
            function itemElement(day,id){return document.getElementById(day+'-item-'+id);}
            function dateLabel(day){return '4/'+(Number(day.slice(3))+9);}
            function mainMapLink(item){return itemLinks(item).mapUrl || '';}
            function itemMapActions(day,item){
                return `<div class="item-actions">${item.routeIndices.map(index=>`<button type="button" data-locate-day="${day}" data-locate-index="${index}">${item.routeIndices.length>1?escapeHtml(itineraryData[day].route[index].name):'在今日地圖定位'} ↗</button>`).join('')}<button type="button" data-share-day="${day}" data-share-item="${item.id}">複製景點連結</button><span class="share-status" role="status"></span></div>`;
            }
            function focusMapPoint(day,index){
                const point=itineraryData[day].route[index];
                document.querySelector(`#${day} .route-stop[data-index="${index}"]`)?.click();
                scrollToPart(document.querySelector('#'+day+' .day-route-spread'));
                document.getElementById('route-note-'+day).textContent=point.note||point.name;
            }
            function setupPlannerTools(){
                if(!tripState.expenses)tripState.expenses=defaultExpenses.map(row=>({...row}));
                else if(tripState.expenseRevision!==expenseSeedRevision)tripState.expenses=TripTools.reconcileExpenses(tripState.expenses,priorExpenseSeeds,defaultExpenses);
                tripState.expenseRevision=expenseSeedRevision;writeTripState();
                setupHistoryNavigation();setupSearch();setupBookings();setupExpenses();setupPrinting();setupOffline();
                document.addEventListener('click',async event=>{
                    const editDay=event.target.closest('[data-edit-day-budget]');
                    if(editDay){document.getElementById('planner-desk').open=true;document.getElementById('expense-panel').open=true;document.getElementById('expense-day').value=editDay.dataset.editDayBudget;renderExpenses();scrollToPart(document.getElementById('expense-panel'));return;}
                    const allCosts=event.target.closest('[data-ledger-action]');
                    if(allCosts){document.getElementById('overview-costs').open=true;renderFrontCosts(true);document.querySelectorAll('.daily-ledger').forEach(detail=>detail.open=allCosts.dataset.ledgerAction==='open');layoutChanged();return;}
                    const locate=event.target.closest('[data-locate-day]');
                    if(locate){focusMapPoint(locate.dataset.locateDay,Number(locate.dataset.locateIndex));return;}
                    const target=event.target.closest('[data-go-day]');
                    if(target){navigateDay(target.dataset.goDay,{item:target.dataset.goItem,focus:true});return;}
                    const share=event.target.closest('[data-share-item]');
                    if(share){
                        const url=new URL(location.href);url.hash=TripTools.routeHash(share.dataset.shareDay,share.dataset.shareItem);
                        const status=share.parentElement.querySelector('.share-status');
                        try{if(!navigator.clipboard?.writeText)throw Error('clipboard');await navigator.clipboard.writeText(url.href);status.textContent='景點連結已複製';}
                        catch{
                            status.textContent='可手動複製：';let input=status.querySelector('input');
                            if(!input){input=document.createElement('input');input.readOnly=true;input.setAttribute('aria-label','景點分享連結');status.append(input);}
                            input.value=url.href;input.focus();input.select();
                        }
                    }
                });
                document.querySelectorAll('[data-open-planner]').forEach(button=>button.addEventListener('click',()=>{
                    document.getElementById('planner-desk').open=true;
                    document.getElementById(button.dataset.openPlanner).open=true;
                    if(button.dataset.costDay){document.getElementById('expense-day').value=button.dataset.costDay;renderExpenses();}
                    scrollToPart(document.getElementById(button.dataset.openPlanner));
                }));
                document.querySelectorAll('.planner-desk,.desk-panel,.daily-costs').forEach(detail=>detail.addEventListener('toggle',layoutChanged));
                renderDailyCosts();
            }
            function setupSearch(){
                const input=document.getElementById('trip-search'),results=document.getElementById('search-results'),status=document.getElementById('search-status');
                let limit=15;
                function render(){
                    const rows=TripTools.search(itineraryData,input.value);
                    results.replaceChildren();
                    if(!input.value.trim()){status.textContent='';layoutChanged();return;}
                    status.textContent=rows.length?`找到 ${rows.length} 段行程${rows.length>limit?'，先顯示 '+limit+' 段':''}`:'沒有符合的行程，試試「海鮮」「按摩」或「Big C」。';
                    rows.slice(0,limit).forEach(row=>{
                        const li=document.createElement('li'),button=document.createElement('button');button.type='button';
                        button.dataset.goDay=row.day;button.dataset.goItem=row.item.id;
                        const title=document.createElement('strong');title.textContent=dateLabel(row.day)+' · '+row.item.title;
                        const copy=document.createElement('span');copy.textContent=row.item.time+' · '+row.item.summary;
                        button.append(title,copy);li.append(button);results.append(li);
                    });
                    if(rows.length>limit){const li=document.createElement('li'),button=document.createElement('button');button.type='button';button.textContent='顯示更多結果';button.addEventListener('click',()=>{limit+=15;render();});li.append(button);results.append(li);}
                    layoutChanged();
                }
                input.addEventListener('input',()=>{limit=15;render();});
                input.addEventListener('keydown',event=>{if(event.key==='Escape'){input.value='';render();}if(event.key==='ArrowDown'){event.preventDefault();results.querySelector('button')?.focus();}if(event.key==='Enter'){event.preventDefault();results.querySelector('[data-go-day]')?.click();}});
                document.getElementById('clear-search').addEventListener('click',()=>{input.value='';render();input.focus();});render();
            }
            function safeBookingValue(key){
                const row=tripState.bookings?.[key];
                return {status:['todo','confirmed','not-needed'].includes(row?.status)?row.status:'todo',meeting:typeof row?.meeting==='string'?row.meeting:'',note:typeof row?.note==='string'?row.note:''};
            }
            function bookingLink(item){
                const template=document.createElement('template');template.innerHTML=item.details;
                const links=[...template.content.querySelectorAll('a[href]')];
                const link=links.find(a=>/訂票|預訂|訂位|方案查詢|門票|官網/.test(a.textContent)&&!a.href.includes('maps.'));
                return link?.getAttribute('href') || mainMapLink(item);
            }
            function setupBookings(){
                const list=document.getElementById('booking-list'),filter=document.getElementById('booking-filter');
                const rows=Object.entries(itineraryData).flatMap(([day,data])=>data.items.filter(item=>item.needsBooking).map(item=>({day,item,key:day+'/'+item.id})));
                function totals(){
                    const confirmed=rows.filter(row=>safeBookingValue(row.key).status==='confirmed').length;
                    const pending=rows.filter(row=>safeBookingValue(row.key).status==='todo').length;
                    document.getElementById('booking-count').textContent=`${pending} 項待處理 · ${confirmed} 項已確認；狀態由你手動記錄。`;
                }
                function render(){
                    list.innerHTML=rows.filter(row=>filter.value==='all'||safeBookingValue(row.key).status===filter.value).map(({day,item,key})=>{
                        const saved=safeBookingValue(key),url=bookingLink(item),locationName=itineraryData[day].route[item.routeIndices[0]]?.name || '';
                        return `<article class="booking-row" data-booking-key="${key}"><header><button type="button" data-go-day="${day}" data-go-item="${item.id}">${dateLabel(day)} · ${escapeHtml(item.title)} ↗</button><span>${escapeHtml(item.time)}</span></header><p class="small-note">${escapeHtml(item.summary)}</p><div class="booking-fields"><label>處理狀態<select data-booking-field="status" aria-label="${escapeHtml(item.title)} 預約狀態"><option value="todo" ${saved.status==='todo'?'selected':''}>待處理</option><option value="confirmed" ${saved.status==='confirmed'?'selected':''}>已確認</option><option value="not-needed" ${saved.status==='not-needed'?'selected':''}>不需預約／略過</option></select></label><label>集合地點／時間<input data-booking-field="meeting" maxlength="250" value="${escapeHtml(saved.meeting)}" placeholder="${escapeHtml(locationName)}" aria-label="${escapeHtml(item.title)} 集合地點與時間"></label></div><label class="booking-note">訂單或聯絡備註<textarea data-booking-field="note" maxlength="1000" rows="2" aria-label="${escapeHtml(item.title)} 備註">${escapeHtml(saved.note)}</textarea></label>${url?`<a class="trip-link" href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer">查看預約或店家資訊 ↗</a>`:''}</article>`;
                    }).join('')||'<p class="small-note">這個分類目前沒有項目。</p>';totals();layoutChanged();
                }
                function save(event){
                    const field=event.target.dataset.bookingField;if(!field)return;
                    const key=event.target.closest('[data-booking-key]').dataset.bookingKey;
                    tripState.bookings[key]={...safeBookingValue(key),[field]:event.target.value};writeTripState();totals();
                    if(field==='status'&&filter.value!=='all')render();
                }
                list.addEventListener('input',save);list.addEventListener('change',save);filter.addEventListener('change',render);totals();document.getElementById('booking-panel').addEventListener('toggle',()=>{if(document.getElementById('booking-panel').open&&!list.childElementCount)render();});
            }
            function money(cents,currency){return (cents/100).toLocaleString('zh-TW',{maximumFractionDigits:2})+' '+(currency==='TWD'?'NT$':'THB');}
            function costSummary(day){
                const totals=TripTools.expenseTotals(tripState.expenses || [],day);
                const line=status=>['THB','TWD'].map(currency=>`<span>${money(totals[status][currency],currency)}<small>四人合計 · 每人 ${money(totals[status][currency]/4,currency)}</small></span>`).join('');
                const planned=['THB','TWD'].map(currency=>`${money(totals.confirmed[currency]+totals.estimate[currency],currency)}（每人 ${money((totals.confirmed[currency]+totals.estimate[currency])/4,currency)}）`).join(' ＋ ');
                return `<p class="planned-total"><strong>已列項目規劃小計・四人</strong><span>${planned}</span></p><div class="cost-summary"><div><strong>已確認報價</strong>${line('confirmed')}</div><div><strong>參考估算・另列</strong>${line('estimate')}</div></div><p class="small-note">${totals.unknown} 筆待填，不以零元計入。已確認報價不代表已付款；兩種幣別分開加總。</p>`;
            }
            function renderFrontCosts(force=false){
                const target=document.getElementById('daily-cost-breakdown');if(!target)return;
                const openDays=new Set([...target.querySelectorAll('details[open]')].map(el=>el.dataset.ledgerDay));
                const total=TripTools.expenseTotals(tripState.expenses||[],'all');
                document.getElementById('trip-cost-totals').innerHTML='<div class="overview-total">'+['THB','TWD'].map(currency=>{const amount=total.confirmed[currency]+total.estimate[currency];return `<div><strong>${money(amount,currency)}</strong><span>四人小計 · 每人 ${money(amount/4,currency)}</span></div>`;}).join('')+`</div><p class="small-note">已報價＋參考估算；另有 ${total.unknown} 筆待填，尚非全趟總價。</p>`;
                renderBudgetValues();
                if(!force&&!document.getElementById('overview-costs').open){frontCostsRendered=false;return;}
                frontCostsRendered=true;
                const statusNames={confirmed:'已確認報價',estimate:'參考估算',unknown:'待填'};
                target.innerHTML=Object.entries(itineraryData).map(([day,data])=>{
                    const rows=(tripState.expenses||[]).filter(row=>row.day===day),totals=TripTools.expenseTotals(rows,day);
                    const known=totals.confirmed.THB+totals.estimate.THB,totalTwd=totals.confirmed.TWD+totals.estimate.TWD;
                    const subtotal=known||totalTwd?[known?money(known,'THB'):'',totalTwd?money(totalTwd,'TWD'):''].filter(Boolean).join(' ＋ '):'金額待填';
                    return `<details class="daily-ledger" data-ledger-day="${day}" ${openDays.has(day)?'open':''}><summary><span><strong>${dateLabel(day)}</strong> ${escapeHtml(data.title)}</span><span>${subtotal}<small>${totals.unknown} 項待填</small></span></summary><ol class="front-cost-list">${rows.map(row=>{
                        const group=row.amount===null?null:Math.round(row.amount*100)*(row.basis==='person'?4:1);
                        return `<li><div>${row.itemId?`<button type="button" data-go-day="${day}" data-go-item="${row.itemId}">${escapeHtml(row.label)} ↗</button>`:`<strong>${escapeHtml(row.label)}</strong>`}<p>${escapeHtml(row.note)}${row.sourceUrl?` <a href="${escapeHtml(row.sourceUrl)}" target="_blank" rel="noopener noreferrer">價格來源 ↗</a>`:''}</p></div><div class="front-cost-amount"><span>${row.amount===null?'單價待填':money(Math.round(row.amount*100),row.currency)+'／'+(row.basis==='person'?'人':'四人')}</span><strong>${group===null?'四人合計待填':'四人 '+money(group,row.currency)}</strong><small>${statusNames[row.status]}</small></div></li>`;
                    }).join('')}</ol><div class="ledger-subtotal">${costSummary(day)}<button type="button" data-edit-day-budget="${day}">編輯 ${dateLabel(day)} 費用 ↗</button></div></details>`;
                }).join('');
            }
            function renderBudgetValues(){
                const body=document.getElementById('budget-values-body');if(!body)return;
                body.innerHTML=Object.keys(itineraryData).map(day=>{
                    const totals=TripTools.expenseTotals(tripState.expenses||[],day);
                    return `<tr><th scope="row">${dateLabel(day)}</th><td>${money(totals.confirmed.THB/4,'THB')}</td><td>${money(totals.estimate.THB/4,'THB')}</td><td>${totals.unknown} 項</td></tr>`;
                }).join('');
                window.dispatchEvent(new Event('itinerary:costs'));
            }
            function budgetChartData(){
                const days=Object.keys(itineraryData),totals=days.map(day=>TripTools.expenseTotals(tripState.expenses||[],day));
                return {labels:days.map(dateLabel),datasets:[
                    {label:'已確認報價／人（THB）',data:totals.map(total=>total.confirmed.THB/400),backgroundColor:'#26786eaa',borderRadius:4},
                    {label:'參考估算／人（THB）',data:totals.map(total=>total.estimate.THB/400),backgroundColor:'#b58558aa',borderRadius:4}
                ]};
            }

            function renderDailyCosts(){document.querySelectorAll('[data-cost-summary]').forEach(box=>box.innerHTML=costSummary(box.dataset.costSummary));renderFrontCosts();layoutChanged();}
            function renderExpenses(){
                const day=document.getElementById('expense-day').value,list=document.getElementById('expense-list');
                document.getElementById('expense-totals').innerHTML=costSummary(day);
                const labels={confirmed:'已確認報價',estimate:'參考估算',unknown:'待填'};
                list.innerHTML=(tripState.expenses || []).filter(row=>day==='all'||row.day===day).map(row=>`<article class="expense-row"><div><strong>${dateLabel(row.day)} · ${escapeHtml(row.label)}</strong><span>${labels[row.status]} · ${row.amount===null?'金額待填':escapeHtml(row.amount.toLocaleString('zh-TW'))+' '+(row.currency==='TWD'?'NT$':'THB')+'／'+(row.basis==='person'?'人':'四人')}</span><p class="small-note">${escapeHtml(row.note)}</p></div><div><button type="button" data-edit-expense="${row.id}">編輯</button><button type="button" data-remove-expense="${row.id}">移除</button></div></article>`).join('')||'<p class="small-note">尚未新增費用。</p>';
                renderDailyCosts();
            }
            function setupExpenses(){
                const filter=document.getElementById('expense-day'),form=document.getElementById('expense-form'),amount=form.elements.amount;
                let undo=null;
                const dates=Object.keys(itineraryData).map(day=>`<option value="${day}">${dateLabel(day)}</option>`).join('');filter.innerHTML='<option value="all">全部八天</option>'+dates;form.elements.day.innerHTML=dates;
                function amountMode(){amount.disabled=form.elements.status.value==='unknown';amount.required=!amount.disabled;}
                function reset(){form.reset();form.elements.expenseId.value='';document.getElementById('expense-submit').textContent='新增費用';amountMode();}
                filter.addEventListener('change',renderExpenses);form.elements.status.addEventListener('change',amountMode);document.getElementById('expense-cancel').addEventListener('click',reset);
                form.addEventListener('submit',event=>{
                    event.preventDefault();if(!form.reportValidity())return;
                    const id=form.elements.expenseId.value || 'custom-'+(crypto.randomUUID?.() || Date.now().toString(36)+'-'+Math.random().toString(36).slice(2));
                    const prior=tripState.expenses.find(row=>row.id===id);
                    const row=TripTools.validExpense({id,day:form.elements.day.value,itemId:prior?.itemId || null,label:form.elements.label.value.trim(),amount:amount.disabled?null:Number(amount.value),currency:form.elements.currency.value,basis:form.elements.basis.value,status:form.elements.status.value,note:form.elements.note.value.trim(),sourceUrl:prior?.sourceUrl,checkedAt:prior?.checkedAt});
                    if(!row)return;
                    tripState.expenses=tripState.expenses.filter(value=>value.id!==id).concat(row);writeTripState();renderExpenses();reset();document.getElementById('expense-message').textContent='費用已儲存在這台裝置。';
                });
                document.getElementById('expense-list').addEventListener('click',event=>{
                    const edit=event.target.closest('[data-edit-expense]'),remove=event.target.closest('[data-remove-expense]');
                    if(edit){const row=tripState.expenses.find(value=>value.id===edit.dataset.editExpense);for(const key of ['day','label','amount','currency','basis','status','note'])form.elements[key].value=row[key]??'';form.elements.expenseId.value=row.id;document.getElementById('expense-submit').textContent='儲存修改';amountMode();form.elements.label.focus();}
                    if(remove){undo=tripState.expenses.find(value=>value.id===remove.dataset.removeExpense);tripState.expenses=tripState.expenses.filter(value=>value!==undo);writeTripState();renderExpenses();document.getElementById('expense-undo').hidden=false;document.getElementById('expense-message').textContent='已移除一筆費用，可復原。';}
                });
                document.getElementById('expense-undo').addEventListener('click',()=>{if(!undo)return;tripState.expenses.push(undo);undo=null;writeTripState();renderExpenses();document.getElementById('expense-undo').hidden=true;});reset();document.getElementById('expense-panel').addEventListener('toggle',()=>{if(document.getElementById('expense-panel').open)renderExpenses();});
            }
            function printBooking(day,item){
                if(!item.needsBooking)return '';
                const saved=safeBookingValue(day+'/'+item.id);
                if(saved.status==='todo'&&!saved.meeting&&!saved.note)return '';
                const status={todo:'待處理',confirmed:'已確認', 'not-needed':'不需預約／略過'}[saved.status];
                return `<p class="print-booking">本機預約紀錄：${status}${saved.meeting?' · '+escapeHtml(saved.meeting):''}${saved.note?'<br>'+escapeHtml(saved.note):''}</p>`;
            }
            function setupPrinting(){
                let scope=null;
                function render(){
                    const selected=scope || (itineraryData[currentActiveSectionId]?currentActiveSectionId:'all');
                    const days=selected==='all'?Object.keys(itineraryData):[selected];
                    document.getElementById('print-view').innerHTML='<h1>芭達雅・曼谷旅行手帳</h1><p>2027/4/10—4/17 · 四人 · 時間依各段註記，抵達後採泰國當地時間。</p>'+days.map(day=>{
                        const data=itineraryData[day];return `<section class="print-day"><h2>${dateLabel(day)} · ${escapeHtml(data.title)}</h2><p>${escapeHtml(data.intro)}</p><p>地點：${data.route.map(point=>escapeHtml(point.name)).join(' → ')}</p>${costSummary(day)}${data.items.map(item=>`<article><h3>${escapeHtml(item.time)} · ${escapeHtml(item.title)}</h3><p>${escapeHtml(item.summary)}</p>${item.notice?`<p>提醒：${escapeHtml(item.notice)}</p>`:''}${item.details}${printBooking(day,item)}</article>`).join('')}</section>`;
                    }).join('');
                }
                document.querySelectorAll('[data-print-scope]').forEach(button=>button.addEventListener('click',()=>{
                    scope=button.dataset.printScope==='all'?'all':itineraryData[currentActiveSectionId]?currentActiveSectionId:tripDayAt() || 'day1';render();window.print();
                }));
                window.addEventListener('beforeprint',render);window.addEventListener('afterprint',()=>{scope=null;document.getElementById('print-view').replaceChildren();});
            }
            function setupOffline(){
                const button=document.getElementById('prepare-offline'),status=document.getElementById('offline-status'),update=document.getElementById('offline-update');
                let registration=null,requesting=false;
                function deadline(promise,ms){return new Promise((resolve,reject)=>{const timer=setTimeout(()=>reject(Error('timeout')),ms);promise.then(value=>{clearTimeout(timer);resolve(value);},error=>{clearTimeout(timer);reject(error);});});}
                function savedStatus(worker){
                    if(!worker)return;
                    const channel=new MessageChannel(),timer=setTimeout(()=>channel.port1.close(),4000);
                    channel.port1.onmessage=event=>{clearTimeout(timer);channel.port1.close();if(event.data.type==='STATUS'&&!registration?.waiting){status.textContent=event.data.done===event.data.total?'這一版的文字與基本圖片已完整儲存；可重新下載確認。':`已保留文字行程與 ${event.data.done}／${event.data.total} 張基本圖片，可繼續下載。`;}};
                    worker.postMessage({type:'STATUS'},[channel.port2]);
                }
                const network=()=>document.getElementById('network-state').textContent=navigator.onLine===false?'目前離線 · 地圖、即時天氣與外部訂票頁需要網路。':'離線儲存只保留本機行程；地圖、即時資訊與外部頁面需要網路。';
                window.addEventListener('online',network);window.addEventListener('offline',network);network();
                if(!('serviceWorker'in navigator)||!window.isSecureContext || location.protocol==='file:'){
                    status.textContent='離線儲存需要 HTTPS 或 localhost 預覽；直接開啟檔案時可先列印／另存 PDF。';button.disabled=true;return;
                }
                function waiting(){if(registration?.waiting){update.hidden=false;document.getElementById('offline-update-banner').hidden=false;status.textContent='有新版行程可用；按下更新後重新載入。';}}
                button.addEventListener('click',async()=>{
                    if(requesting)return;requesting=true;button.disabled=true;
                    try{
                        registration=registration || await deadline(navigator.serviceWorker.register('sw.js',{scope:'./',updateViaCache:'none'}),20000);
                        registration.addEventListener('updatefound',()=>registration.installing?.addEventListener('statechange',waiting));
                        waiting();if(registration.waiting)return;const ready=await deadline(navigator.serviceWorker.ready,20000);
                        const worker=registration.active || ready.active;
                        if(!worker)throw Error('worker unavailable');
                        status.textContent='正在儲存文字與圖片，請保持此頁開啟…';
                        await new Promise((resolve,reject)=>{
                            const channel=new MessageChannel();const timer=setTimeout(()=>{channel.port1.close();reject(Error('timeout'));},120000);
                            channel.port1.onmessage=event=>{
                                const data=event.data;
                                if(data.type==='PROGRESS')status.textContent=`正在儲存離線圖片 ${data.done}／${data.total}…`;
                                if(data.type==='DONE'){clearTimeout(timer);channel.port1.close();resolve();}
                                if(data.type==='ERROR'){clearTimeout(timer);channel.port1.close();reject(Error(data.message));}
                            };
                            worker.postMessage({type:'PREPARE'},[channel.port2]);
                        });
                        status.textContent='本版文字、地址與基本圖片已儲存。請在瀏覽器中重新開啟此網址使用離線行程；不是地圖的離線下載。';
                    }catch{status.textContent='未能完整儲存，可能是網路或儲存空間不足。請重試，或列印／另存 PDF。';}
                    finally{requesting=false;button.disabled=false;}
                });
                update.addEventListener('click',()=>{registration?.waiting?.postMessage({type:'ACTIVATE'});});
                navigator.serviceWorker.addEventListener('controllerchange',()=>{if(!update.hidden)location.reload();});
                navigator.serviceWorker.getRegistration('./').then(value=>{registration=value;waiting();if(value){savedStatus(value.active);value.update().catch(()=>{});value.addEventListener('updatefound',()=>value.installing?.addEventListener('statechange',waiting));}}).catch(()=>{});
            }

            // Shared reading state stays on this device; URLs remain shareable by date.
            function readTripState() {
                try {
                    const raw=localStorage.getItem('pattaya-reading-v3') || localStorage.getItem('pattaya-reading-v2') || '{}';
                    return TripTools.migrateState(JSON.parse(raw),itineraryData,legacyItemIds);
                }catch{return TripTools.migrateState({},itineraryData,legacyItemIds);}
            }
            function writeTripState() {
                try {localStorage.setItem('pattaya-reading-v3',JSON.stringify(tripState));}
                catch {const status=document.getElementById('storage-status');if(status)status.textContent='此瀏覽器目前無法保存資料；操作仍可用，但關閉後可能遺失。';}
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
                layoutChanged();
            }
            function restoreReading(saved) {
                if (saved.day !== currentActiveSectionId) return;
                const section = document.getElementById(saved.day);
                if (!section) return;
                const item = saved.item?.startsWith(saved.day+'-item-') ? document.getElementById(saved.item) : null;
                if (item) setTimeline(saved.day,true);
                const anchor=saved.anchor?.startsWith(saved.day)?document.getElementById(saved.anchor):null;
                const target = item || anchor || section;
                const serial=navigationSerial;
                requestAnimationFrame(()=>{
                    if(serial!==navigationSerial)return;
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
                    const item = itineraryData[saved.day].items.find(item=>saved.item === saved.day+'-item-'+item.id);
                    button.textContent = '繼續看 4/' + (Number(saved.day.slice(3))+9) + (item ? ' · '+item.title : ' 的行程') + ' ↗';
                }
            }
            function setupPracticalMode() {
                tripState.quick=false;tripState.photos=[];tripState.timelines={};writeTripState();
                document.querySelectorAll('[data-direct-timeline]').forEach(button=>button.addEventListener('click',()=>{
                    setTimeline(button.dataset.directTimeline,true);
                    scrollToPart(document.getElementById('timeline-'+button.dataset.directTimeline));
                }));
                document.getElementById('resume-reading').addEventListener('click',()=>{
                    const saved = {...tripState.position};
                    navigateDay(saved.day,{resume:saved,restoreReading:true});
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
                        button.querySelector('img').sizes=open?'(max-width:900px) 90vw, 850px':'180px';
                    };
                    apply(false);
                    button.addEventListener('click',()=>{
                        const open=button.getAttribute('aria-expanded')!=='true';apply(open);
                        const img=button.querySelector('img');
                        if(!reduceMotion && img.animate)img.animate([{opacity:.5},{opacity:1}],{duration:220,easing:'ease-out'});
                        layoutChanged();
                    });
                });
                window.addEventListener('pagehide',()=>window.dispatchEvent(new Event('itinerary:save')));
                document.addEventListener('visibilitychange',()=>{if(document.hidden)window.dispatchEvent(new Event('itinerary:save'));});
                document.addEventListener('click',event=>{if(event.target.closest('a[target="_blank"]'))window.dispatchEvent(new Event('itinerary:save'));});
                window.addEventListener('pageshow',event=>{if(event.persisted){isAnimating=false;layoutChanged();}});

            }
            function todayBrief(day) {
                if(!day||!itineraryData[day])return '';
                const data=itineraryData[day],clock=TripTools.bangkokClock(),plan=TripTools.nextPlan(data.items,clock.minutes,tripState.manualNext[day]);
                const stay=Number(day.slice(3))<6?'芭達雅海灘路住宿':'曼谷城市連結酒店 (Bangkok City Link Hotel)';
                const label={manual:'手動選擇的下一站',current:'時間表參考・目前預定',next:'時間表參考・接下來',finished:'今天的時間表已到最後一段'}[plan.mode];
                const map=plan.item?mainMapLink(plan.item)||externalDayMap(day):externalDayMap(day);
                return `<p class="editorial-kicker">今天的小抄 · 泰國 ${clock.time}</p><h2>${dateLabel(day)} · ${escapeHtml(data.title)}</h2><p>${label}${plan.item?'：'+escapeHtml(plan.item.time)+' · '+escapeHtml(plan.item.title):''}</p><p class="small-note">${day==='day8'?'退房住宿':'今晚住宿'}：${stay}${day==='day8'?' · 目標 09:45 前抵達 BKK，11:45 起飛。':''}</p><p class="small-note">依原定時間表顯示，並非即時定位；延誤或調整時可手動選下一站。</p><label class="next-plan-label">下一站<select id="manual-next-plan"><option value="">依泰國時間自動顯示</option>${data.items.map(item=>`<option value="${item.id}" ${plan.mode==='manual'&&plan.item.id===item.id?'selected':''}>${escapeHtml(item.time)} · ${escapeHtml(item.title)}</option>`).join('')}</select></label><button type="button" class="editorial-text-button" data-go-day="${day}" ${plan.item?`data-go-item="${plan.item.id}"`:''}>${plan.item?'查看這段行程':'打開今天時間表'} ↗</button><a class="trip-link" href="${escapeHtml(map)}" target="_blank" rel="noopener noreferrer">${plan.item?'這一站':'今日'}地圖 ↗</a>`;
            }
            function setupTodayBrief() {
                let previous='';
                function refresh(force=false){
                    const clock=TripTools.bangkokClock(),day=clock.day,key=clock.date+clock.time+(day?tripState.manualNext[day]:'');
                    const panel=document.getElementById('today-brief');
                    if(!force&&(previous===key||panel.contains(document.activeElement)))return;previous=key;panel.hidden=!day;panel.innerHTML=todayBrief(day);
                    panel.querySelector('select')?.addEventListener('change',event=>{tripState.manualNext[day]=event.target.value;writeTripState();refresh(true);document.getElementById('manual-next-plan')?.focus({preventScroll:true});});
                    navButtons.forEach(button=>{
                        const today=button.dataset.target===day;button.classList.toggle('is-today',today);
                        if(today)button.setAttribute('title','泰國當地日期 · 今天');else button.removeAttribute('title');
                    });layoutChanged();
                }
                document.getElementById('today-brief').addEventListener('focusout',()=>setTimeout(()=>refresh(),0));
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
                const jump=document.getElementById('map-itinerary-'+day);
                jump.hidden=!point;
                if(point){jump.dataset.goDay=day;jump.dataset.goItem=point.itemId;jump.textContent='查看 '+point.name+' 的行程 ↗';}
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
                if(reduceMotion)return;
                for(const id of ['hero-title','hero-subtitle'])document.getElementById(id)?.animate?.([{opacity:0,transform:'translateY(18px)'},{opacity:1,transform:'translateY(0)'}],{duration:650,easing:'ease-out'});
            }
            function setupOverviewFolds(){
                const costs=document.getElementById('overview-costs'),live=document.getElementById('overview-live');
                costs.addEventListener('toggle',()=>{if(costs.open&&!frontCostsRendered)renderFrontCosts(true);});
                let timer=null,weatherStarted=false;
                const sync=()=>{
                    clearInterval(timer);timer=null;
                    if(live.open&&!document.hidden){
                        const update=setupCountdown();update();timer=setInterval(update,1000);
                        if(!weatherStarted){weatherStarted=true;setupWeather();}
                    }
                };
                live.addEventListener('toggle',sync);document.addEventListener('visibilitychange',sync);
                document.querySelectorAll('.overview-fold').forEach(fold=>fold.addEventListener('toggle',layoutChanged));
            }

            function setupCountdown() {
                const targetDate = new Date('2027-04-10T07:55:00+08:00').getTime();
                return () => {
                    const now = new Date().getTime();
                    const distance = targetDate - now;
                    if (distance < 0) {
                        document.getElementById('countdown').innerHTML = "<div class='col-span-4 text-2xl font-bold text-sky-600'>旅程已開始！</div>";
                        return;
                    }
                    document.getElementById('days').innerText = Math.floor(distance / (1000 * 60 * 60 * 24)).toString().padStart(2, '0');
                    document.getElementById('hours').innerText = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, '0');
                    document.getElementById('minutes').innerText = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
                    document.getElementById('seconds').innerText = Math.floor((distance % (1000 * 60)) / 1000).toString().padStart(2, '0');
                };
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
                if (dayId === 'day6') return '整天路線顯示住宿區 → 東芭樂園 → 貓貓船 → 曼谷城市連結酒店；晚上叫車到 Phloen Chit，先逛 Big C Mahatun Plaza，再到娜娜散步、叫車回飯店。夜遊點可單獨點選定位，步行連結在晚間行程內。';
                return dayId === 'day5' ? '格蘭島行程以海島位置圖呈現；船程依一日團安排。點選左側景點可查看各站，使用地圖原生資訊卡開啟 Google 地圖。' : '點選景點可查看店家位置，使用地圖原生資訊卡的連結或路線按鈕開啟 Google 地圖。住宿及區域位置僅供參考。';
            }
            function renderDayRoute(dayId, dayData) {
                return '<section id="'+dayId+'-map-anchor" class="day-route-spread" aria-label="當日 Google 地圖"><div class="route-copy"><p class="editorial-kicker">今日小路線</p><h3>今天的景點，放在同一張圖。</h3><p class="small-note">點選景點，在右側 Google 地圖定位。</p><ol class="route-stop-list">'+dayData.route.map((p,i)=>'<li><button type="button" class="route-stop" data-day="'+dayId+'" data-index="'+i+'" aria-pressed="false"><span>'+(i+1)+'</span>'+p.name+(p.mapOnly?'<small>夜遊</small>':p.optional?'<small>備選</small>':p.approx?'<small>區域</small>':'')+'</button></li>').join('')+'</ol><p class="route-stop-note" id="route-note-'+dayId+'" aria-live="polite">'+routeNote(dayId)+'</p><button class="route-reset" type="button" data-day="'+dayId+'">看整天路線 ↺</button></div><div class="route-visual google-route" id="route-visual-'+dayId+'"><iframe class="google-map-frame" id="route-map-'+dayId+'" title="4/'+(Number(dayId.slice(3))+9)+' 行程 Google 地圖" data-route-day="'+dayId+'" data-src="'+googleRouteUrl(dayId)+'" loading="lazy" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe><p class="route-map-caption" id="map-caption-'+dayId+'">Google Maps · '+dayData.route.length+' 個地點</p></div><div class="map-feedback"><p id="map-status-'+dayId+'" role="status">點選景點，查看位置。</p><a id="map-external-'+dayId+'" href="'+externalDayMap(dayId)+'" target="_blank" rel="noopener noreferrer">在 Google 地圖中開啟 ↗</a><button type="button" data-map-retry="'+dayId+'">重新載入地圖</button><button type="button" id="map-itinerary-'+dayId+'" hidden>查看這段行程 ↗</button></div></section>';
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
                const result={details:template.innerHTML,primary:primary?.outerHTML || '',mapUrl:primary?.getAttribute('href') || ''};
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
                        <article tabindex="-1" id="${dayId}-item-${item.id}" data-kind="${item.kind}" class="timeline-item relative mb-8 type-${item.kind}">
                            <div class="itinerary-margin"><span class="trip-time">${item.time}</span><span class="trip-type">${({transport:'交通・移動',dining:'用餐',night:'晚間活動',activity:'景點・體驗'})[item.kind]}</span></div>
                            <div class="trip-card ${item.photo ? 'trip-with-photo' : ''}">
                                <div class="trip-copy"><div class="trip-card-heading">
                                    <h3>${item.title}</h3><p class="trip-summary">${markPrice(item.summary || '')}</p>${renderPrimaryAction(item)}${itemMapActions(dayId,item)}${item.notice ? `<aside class="trip-notice"><strong><i class="fas fa-circle-exclamation" aria-hidden="true"></i> 注意事項</strong><p>${item.notice}</p></aside>` : ''}
                                </div>
                                ${item.disclosureLabel ? `<details class="trip-more" id="${dayId}-details-${item.id}"><summary>${item.disclosureLabel} <span aria-hidden="true">＋</span></summary><div class="trip-details">${renderItemDetails(item)}</div></details>` : `<div class="trip-inline">${renderItemDetails(item)}</div>`}</div>
                                ${item.photo ? `<figure class="itinerary-photo scene-${item.photo.scene}" id="${dayId}-photo-${item.id}"><button type="button" class="photo-expand" aria-expanded="false" aria-controls="${dayId}-image-${item.id}" aria-label="${escapeHtml(item.photo.alt)}；展開或收回照片">${responsiveImage(item.photo.file,item.photo.alt, '180px',`id="${dayId}-image-${item.id}"`)}<span class="photo-action">展開照片</span></button><figcaption>${item.photo.caption}</figcaption></figure>` : ''}
                            </div>
                        </article>
                    `).join('');

                    return `
                        <section id="${dayId}" class="content-section" style="display: none; opacity: 0;">
                            <div class="day-editorial-heading"><div class="day-folio"><span>Day</span><b>${String(Number(dayId.slice(3))).padStart(2,'0')}</b></div><div><p class="day-date">2027/4/${Number(dayId.slice(3)) + 9} · 週${['六','日','一','二','三','四','五','六'][Number(dayId.slice(3)) - 1]}</p><h2>${dayData.title}</h2><p class="day-description">${dayData.intro}</p><div class="day-places">${dayData.highlights.map(h => `<span>${h.text}</span>`).join('')}</div></div></div>
                            <div class="day-tools"><button type="button" data-direct-timeline="${dayId}">展開今日行程 ↓</button></div>
                            <div class="daily-theme-card water-photo cursor-pointer relative overflow-hidden mb-12 scene-${dayId==='day5'?'sea':dayId==='day4'?'water':['day1','day7'].includes(dayId)?'night':'day'}"><div class="day-photo-image" style="--photo-position:${dayId==='day3'?'center 55%':'center'}" aria-hidden="true">${responsiveImage(dayData.themeImage,'','(max-width:767px) 100vw, 1180px')}</div>
                                <span class="photo-day-caption">${dayData.photoCaption}</span><button aria-expanded="false" aria-controls="timeline-${dayId}" class="view-timeline-btn">閱讀今日行程 <i class="fas fa-arrow-down" aria-hidden="true"></i></button>
                            </div>
                            <details class="daily-costs"><summary>當日費用與四人分攤</summary><div data-cost-summary="${dayId}"></div><button type="button" data-open-planner="expense-panel" data-cost-day="${dayId}">編輯這天費用 ↗</button></details>
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
                document.querySelectorAll('.water-photo').forEach(photo => {
                    photo.addEventListener('pointermove', event => {
                        const rect = photo.getBoundingClientRect();
                        photo.style.setProperty('--water-x', ((event.clientX - rect.left) / rect.width * 100) + '%');
                        photo.style.setProperty('--water-y', ((event.clientY - rect.top) / rect.height * 100) + '%');
                    });
                });
                document.querySelectorAll('.trip-more').forEach(detail => detail.addEventListener('toggle', () => {
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
                    cache={day:currentActiveSectionId,top:rect.top+y,height:rect.height,navHeight:nav.offsetHeight,items,status:document.getElementById('reading-status-'+currentActiveSectionId)};
                }
                function save() {
                    clearTimeout(saveTimer);
                    if(isAnimating || !Object.hasOwn(itineraryData,currentActiveSectionId))return;
                    if(needsMeasure || cache?.day!==currentActiveSectionId){measure();needsMeasure=false;}
                    const readingTimeline=cache && window.scrollY+cache.navHeight+160>=cache.top;
                    const selected=readingTimeline?cache?.items.find(item=>item.el===active):null;
                    const section=document.getElementById(currentActiveSectionId);
                    const map=section.querySelector('.day-route-spread');
                    const anchor=!selected && map.getBoundingClientRect().top<window.innerHeight*.4 ? map : section;
                    const top=selected?selected.top:window.scrollY+anchor.getBoundingClientRect().top;
                    tripState.position={day:currentActiveSectionId,item:selected?.el.id || null,anchor:anchor.id,offset:window.scrollY-top};
                    writeTripState();updateResumeLink();rememberHistoryPosition();
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
                if(window.ResizeObserver){const observer=new ResizeObserver(()=>schedule(true));observer.observe(dailySectionsContainer);observer.observe(document.querySelector('.planner-tools'));}
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
                    if(target!==currentActiveSectionId)navigateDay(target);
                }));
            }

            function routeForCurrent() {
                return {day:currentActiveSectionId || 'overview',item:TripTools.parseRoute(location.hash,itineraryData)?.item || null};
            }
            function rememberHistoryPosition() {
                if(restoringHistory || !currentActiveSectionId)return;
                const route=routeForCurrent();
                const position=tripState.position?.day===route.day?{...tripState.position}:null;
                try{history.replaceState({trip:true,...route,position,scrollY:window.scrollY},'',location.href);}catch{}
            }
            function navigateDay(day, options = {}) {
                if(!document.getElementById(day))return;
                const serial=++navigationSerial;
                if(day!==currentActiveSectionId){
                    document.querySelectorAll('.timeline-container:not(.hidden)').forEach(timeline=>setTimeline(timeline.closest('.content-section').id,false));
                    document.querySelectorAll('.photo-expand[aria-expanded="true"]').forEach(button=>button.click());
                }
                const item=options.item?itineraryData[day]?.items.find(x=>x.id===options.item):null;
                if(options.item&&!item)return;
                restoringHistory=options.history===false;
                window.dispatchEvent(new Event('itinerary:save'));
                if(!restoringHistory)rememberHistoryPosition();
                const hash=TripTools.routeHash(day,item?.id);
                if(options.history!==false && hash!==location.hash){
                    try{history.pushState({trip:true,day,item:item?.id || null},'',hash);}catch{}
                }
                activeRoute=hash;
                switchTab(day,false,()=>{
                    const section=document.getElementById(day);
                    let destination=section;
                    if(options.resume&&options.restoreReading){restoreReading(options.resume);destination=null;}
                    else if(item){setTimeline(day,true);destination=document.getElementById(day+'-item-'+item.id);}
                    else if(options.timeline){setTimeline(day,true);destination=document.getElementById('timeline-'+day);}
                    if(options.scrollY!==undefined && !options.resume){window.scrollTo({top:Math.max(0,options.scrollY),behavior:'auto'});destination=null;}
                    if(destination)scrollToPart(destination,Boolean(options.instant));
                    if(options.focus) (item?destination:section.querySelector('h2'))?.focus({preventScroll:true});
                    layoutChanged();
                    requestAnimationFrame(()=>{if(serial!==navigationSerial)return;restoringHistory=false;rememberHistoryPosition();});
                });
            }
            function setupHistoryNavigation() {
                try{history.scrollRestoration='manual';}catch{}
                function restore(){
                    const route=TripTools.parseRoute(location.hash,itineraryData)||{day:'overview',item:null};
                    const hash=TripTools.routeHash(route.day,route.item);
                    if(hash===activeRoute)return;
                    const saved=history.state?.trip?history.state:null;
                    navigateDay(route.day,{item:route.item,history:false,instant:true,resume:saved?.position || null,scrollY:saved?.scrollY});
                }
                window.addEventListener('popstate',restore);
                window.addEventListener('hashchange',restore);
            }
            function switchTab(targetId, shouldScroll = true, onCompleteCallback = () => {}) {
                const section=document.getElementById(targetId);
                if(!section){onCompleteCallback();return;}
                navigationAnimations.forEach(animation=>animation.cancel());navigationAnimations=[];
                document.querySelectorAll('.content-section').forEach(other=>{
                    other.style.display=other===section?'block':'none';other.style.opacity=other===section?'1':'0';
                });
                currentActiveSectionId=targetId;isAnimating=false;
                navButtons.forEach(button=>{
                    const selected=button.dataset.target===targetId;
                    if(selected)button.setAttribute('aria-current','page');else button.removeAttribute('aria-current');
                    button.classList.toggle('bg-sky-500',selected);button.classList.toggle('text-white',selected);
                    button.classList.toggle('bg-sky-100',!selected);button.classList.toggle('text-sky-800',!selected);
                });
                const selected=document.querySelector('.nav-btn[aria-current="page"]');centerDateButton(selected);syncDateIndicator();
                setupDayRouteMap(targetId);
                if(!reduceMotion){
                    for(const element of section.querySelectorAll('.day-editorial-heading,.daily-theme-card')){
                        if(element.animate)navigationAnimations.push(element.animate([{opacity:.35,transform:'translateY(8px)'},{opacity:1,transform:'translateY(0)'}],{duration:260,easing:'cubic-bezier(.2,.7,.2,1)'}));
                    }
                }
                if(shouldScroll)scrollToPart(section);
                onCompleteCallback();
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
                const fold=document.querySelector('.budget-fold');
                let chart=null,loading=false;
                async function draw(){
                    if(chart||loading||!fold.open)return;loading=true;
                    const status=document.getElementById('chart-status');
                    try{
                        if(!window.Chart){
                            status.textContent='正在載入預算圖…';
                            await new Promise((resolve,reject)=>{
                                let script=document.getElementById('chart-library');
                                if(script)script.remove();script=document.createElement('script');script.id='chart-library';script.src='https://cdn.jsdelivr.net/npm/chart.js@4.4.8/dist/chart.umd.min.js';
                                const timer=setTimeout(()=>{script.remove();reject(Error('timeout'));},10000);
                                script.onload=()=>{clearTimeout(timer);resolve();};script.onerror=()=>{clearTimeout(timer);script.remove();reject(Error('load'));};document.head.append(script);
                            });
                        }
                        if(!window.Chart)throw Error('unavailable');
                        chart=new Chart(document.getElementById('budgetChart').getContext('2d'),{type:'bar',data:budgetChartData(),options:{animation:reduceMotion?false:{duration:250},responsive:true,maintainAspectRatio:false,scales:{x:{stacked:true},y:{beginAtZero:true,stacked:true}},plugins:{legend:{display:true}}}});
                        status.textContent='依目前費用明細同步更新，僅列泰銖人均；台幣與待填項目另見明細。';document.getElementById('chart-retry').hidden=true;
                    }catch{status.textContent='圖表暫時無法載入，仍可查看下方數值與費用工具。';document.getElementById('chart-retry').hidden=false;}
                    finally{loading=false;}
                }
                window.addEventListener('itinerary:costs',()=>{if(chart){chart.data=budgetChartData();chart.update();}});
                fold.addEventListener('toggle',()=>{if(fold.open){draw();chart?.resize();}});document.getElementById('chart-retry').addEventListener('click',draw);
            }

        }, {once:true});
