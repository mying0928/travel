const itineraryData = {
    day1: {
        navInfo: { date: '10/22', day: '(週四)' },
        title: "那霸初見・養精蓄銳",
        themeImage: "images/波上宮.jpg",
        highlights: [
            { icon: "fa-plane-arrival", text: "抵達那霸機場" },
            { icon: "fa-train", text: "Yui Rail 單軌電車" },
            { icon: "fa-martini-glass", text: "和牛與泡盛" }
        ],
        items: [
            { time: "下午", title: "抵達那霸機場", icon: "fa-plane-arrival", content: { description: "抵達那霸機場，這幾天還不用取重機，先輕裝入境、領行李，慢慢調整步調。" } },
            { time: "下午", title: "搭乘 Yui Rail 單軌電車入住市區飯店", icon: "fa-train", content: { description: "機場站直接可搭 Yui Rail 單軌電車前往市區飯店，全程步行加電車就能到，不用急著租車。", transport: "那霸機場站 → 市區各站，車程約 15-25 分鐘視飯店位置而定。" } },
            { time: "傍晚", title: "國際通散步", icon: "fa-store", content: { description: "放完行李後到國際通走走，感受那霸最熱鬧的商店街氛圍，為接下來幾天的重機環島養精蓄銳，今晚不排太滿。" } },
            { time: "晚上", title: "沖繩和牛與泡盛晚餐", icon: "fa-martini-glass", content: { description: "找一家和牛燒肉或居酒屋，配上沖繩在地泡盛，好好放鬆，調整到最佳體力再迎接後面幾天的騎乘日。" } }
        ]
    },
    day2: {
        navInfo: { date: '10/23', day: '(週五)' },
        title: "世界遺產・海濱神社慢遊",
        themeImage: "images/首里城.jpg",
        highlights: [
            { icon: "fa-landmark", text: "首里城" },
            { icon: "fa-torii-gate", text: "波上宮" },
            { icon: "fa-bag-shopping", text: "國際通續逛" }
        ],
        items: [
            { time: "上午", title: "首里城", icon: "fa-landmark", content: { description: "世界遺產首里城，琉球王國的象徵，紅牆建築風格跟本土日本神社寺廟很不一樣，慢慢逛拍照。", transport: "從那霸市區搭 Yui Rail 至首里站，再步行前往。⚠️ 開放時間與門票資訊請出發前至官網確認最新公告。" } },
            { time: "下午", title: "波上宮", icon: "fa-torii-gate", content: { description: "沖繩八社之首，建在懸崖上、鳥居配海景是這裡最特別的畫面，緊鄰海灘，順道走走也不錯。" } },
            { time: "傍晚", title: "國際通續逛・採買伴手禮", icon: "fa-bag-shopping", content: { description: "回國際通續逛，趁還沒開始騎車、方便提東西的時候先把伴手禮買一買。" } },
            { time: "晚上", title: "早點休息", icon: "fa-bed", content: { description: "明天早上就要去取重機正式出征，今晚早點休息，養好精神準備左駕適應。" } }
        ]
    },
    day3: {
        navInfo: { date: '10/24', day: '(週六)' },
        title: "重機出征！海中道路與西海岸夕陽",
        themeImage: "images/海中道路.jpg",
        highlights: [
            { icon: "fa-motorcycle", text: "取重機出發" },
            { icon: "fa-road", text: "海中道路" },
            { icon: "fa-sun", text: "殘波岬夕陽" }
        ],
        items: [
            { time: "早上", title: "那霸市區取重機", icon: "fa-motorcycle", content: { description: "早上到租車行取車，正式出征。⚠️ 台灣與日本的駕照互惠僅限普通重型機車以下等級，250cc以上重機租借通常需要日本駕照或符合特定條件，出發前務必先跟租車行確認你的駕照能租到的排氣量，避免臨場租不到車。", transport: "建議選擇鄰近單軌電車站、可代寄放行李的租車行，方便銜接前兩天的市區行程。" } },
            { time: "早上", title: "左駕適應", icon: "fa-triangle-exclamation", content: { description: "取車後先別急著上國道，日本靠左行駛跟台灣相反，建議先在租車行附近的小路練習幾分鐘，抓一下對向來車視角跟切彎習慣，適應後再上 58 號主幹道。" } },
            { time: "白天", title: "國道58號/330號 → 宜野灣", icon: "fa-route", content: { description: "沿國道 58 號、330 號騎行前往宜野灣，一路熱身，感受沖繩海岸公路的節奏。" } },
            { time: "白天", title: "海中道路（跨海狂奔）", icon: "fa-road", content: { description: "今天的壓軸路段，一條直接騎在海面上的跨海道路，兩側就是湛藍海景，是沖繩重機環島最經典的一段畫面，記得找空地停車拍照。" } },
            { time: "下午", title: "殘波岬", icon: "fa-mountain-sun", content: { description: "斷崖絕壁配燈塔的知名景點，稍作停留拍照休息。" } },
            { time: "全日里程", title: "約 110 公里（純騎乘約 3.5 小時）", icon: "fa-gauge-high", content: { description: "第一天騎乘日刻意抓比較輕鬆的里程，不用趕路，多留時間拍照跟適應左駕。" } },
            { time: "晚上", title: "入住恩納村或名護市濱海飯店", icon: "fa-bed", content: { description: "抵達恩納村或名護市，找一間濱海飯店入住，結束第一個騎乘日。" } }
        ]
    },
    day4: {
        navInfo: { date: '10/25', day: '(週日)' },
        title: "極北騎士聖地・征服古宇利大橋",
        themeImage: "images/古宇利大橋.jpg",
        highlights: [
            { icon: "fa-flag", text: "邊戶岬最北端" },
            { icon: "fa-bridge", text: "古宇利大橋" },
            { icon: "fa-star", text: "全程路況最好的一天" }
        ],
        items: [
            { time: "早上", title: "飯店出發 → 國道58號北段", icon: "fa-route", content: { description: "沿國道 58 號北段騎行，這段是山海彎道混合路況，也是全行程公認路況最好、最過癮的一段。" } },
            { time: "中午前", title: "邊戶岬（最北端騎士地標）", icon: "fa-flag", content: { description: "沖繩本島最北端，公認的騎士朝聖地標，天氣好時可以遠眺鹿兒島方向的島嶼，值得停留拍照留念。" } },
            { time: "下午", title: "奧間 → 古宇利大橋", icon: "fa-bridge", content: { description: "經奧間繼續南下，直衝古宇利大橋，湛藍到不真實的「古宇利藍」海景是這趟環島最著名的畫面之一，橋邊有觀景空間可以停車拍照。" } },
            { time: "全日里程", title: "約 150 公里（純騎乘約 4.5 小時）", icon: "fa-gauge-high", content: { description: "今天里程比昨天長，但路況是全程最好的一天，建議放慢速度多欣賞沿途山海彎道景色。" } },
            { time: "晚上", title: "入住名護市區", icon: "fa-bed", content: { description: "結束北部行程後回到名護市區入住。" } }
        ]
    },
    day5: {
        navInfo: { date: '10/26', day: '(週一)' },
        title: "純樸東海岸・絕景知念岬・那霸還車",
        themeImage: "images/知念岬公園.jpg",
        highlights: [
            { icon: "fa-water", text: "東海岸國道329號" },
            { icon: "fa-mountain-sun", text: "知念岬公園" },
            { icon: "fa-key", text: "那霸還車" }
        ],
        items: [
            { time: "早上", title: "名護 → 東海岸國道329號南下", icon: "fa-route", content: { description: "沿東海岸國道 329 號南下，車少、幾乎沒有紅綠燈，是全程騎起來最舒服放鬆的一段路。" } },
            { time: "中午前後", title: "勝連半島", icon: "fa-map-location-dot", content: { description: "沿途經過勝連半島，海景視野開闊，可視情況停留休息。" } },
            { time: "下午", title: "知念岬公園", icon: "fa-mountain-sun", content: { description: "270 度太平洋環景視野，是東海岸這段路的壓軸景點，適合停久一點拍照。" } },
            { time: "傍晚", title: "返回那霸市區還車", icon: "fa-key", content: { description: "傍晚回到那霸市區還車，建議 17:30 前完成，沖繩鄉間路段入夜後照明較少，避免摸黑騎車。" } },
            { time: "全日里程", title: "約 120 公里（純騎乘約 4 小時）", icon: "fa-gauge-high", content: { description: "三天騎乘日到此結束，總里程約 380 公里，這幾天刻意抓不趕路的節奏，把時間留給沿途風景。" } },
            { time: "晚上", title: "入住那霸市區或機場附近飯店", icon: "fa-bed", content: { description: "還車後入住那霸市區或機場附近飯店，準備明天輕鬆的最後一天。" } }
        ]
    },
    day6: {
        navInfo: { date: '10/27', day: '(週二)' },
        title: "最後採買・搭機回家",
        themeImage: "images/瀨長島.jpg",
        highlights: [
            { icon: "fa-fish", text: "第一牧志公設市場" },
            { icon: "fa-plane-departure", text: "搭機返台" }
        ],
        items: [
            { time: "上午", title: "第一牧志公設市場", icon: "fa-fish", content: { description: "那霸最知名的海鮮市場，可以買海鮮請樓上餐廳代客料理，當作環島後的最後一頓豐盛餐點。", subsections: [
                { title: "🏝️ 也可以選擇：瀨長島", description: "如果比較想放鬆，也可以改去瀨長島看飛機起降、喝杯咖啡，兩個選項擇一即可。" }
            ] } },
            { time: "中午後", title: "前往那霸機場", icon: "fa-route", content: { description: "採買結束後前往那霸機場，可再搭 Yui Rail 抵達。" } },
            { time: "下午", title: "搭機返台", icon: "fa-plane-departure", content: { description: "辦理登機手續，結束這趟不瘋狂趕路的沖繩重機環島，平安到家。" } }
        ]
    }
};
