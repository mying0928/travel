const itineraryData = {
    day0: {
        navInfo: { date: '9/1', day: '(週二)' },
        title: "出發日・飛向冰島",
        themeImage: "https://commons.wikimedia.org/wiki/Special:FilePath/J%C3%B6kuls%C3%A1rl%C3%B3n-Aurora.jpg",
        highlights: [
            { icon: "fa-plane-departure", text: "阿聯酋 EK 367" },
            { icon: "fa-clock", text: "23:50 起飛" },
            { icon: "fa-suitcase-rolling", text: "行前打包" }
        ],
        items: [
            { time: "白天", title: "正常上班・最後打包確認", icon: "fa-suitcase-rolling", content: { description: "出發前最後檢查：國際駕照＋台灣駕照都要帶、信用卡 4 位數 PIN 碼已致電銀行開通、保暖衣物（9 月夜間約 3-7°C）。", subsections: [
                { title: "🚫 通關食物守則（絕對禁止）", description: "培根、熱狗、香腸、生豬肉、家禽類或任何未經完全煮熟的肉製品（含肉鬆、肉乾）——一律禁止入境，查獲面臨沒收與重罰。" },
                { title: "✅ 可以攜帶入境", description: "乾麵、真空白米、餅乾、零食、剝皮辣椒味噌醬、白胡椒粉、肉骨茶湯包、玉米濃湯粉、雞粉（高度加工製品通常可安全過關）。泡麵建議選海鮮／素食／單純肉燥口味，避開含大塊真空肉包的款式。" }
                ] } },
            { time: "21:30", title: "抵達桃園機場", icon: "fa-plane-departure", content: { description: "建議 21:30 前抵達，辦理登機手續。" } },
            { time: "23:50", title: "桃園機場起飛（阿聯酋 EK 367）", icon: "fa-plane", content: { description: "夜間航班，經杜拜轉機飛往冰島凱夫拉維克機場（KEF）。<br>💡 機上可以開始調整時差、補眠。" } }
        ]
    },
    day1: {
        navInfo: { date: '9/2', day: '(週三)' },
        title: "抵達冰島・取車與首夜補給",
        themeImage: "https://commons.wikimedia.org/wiki/Special:FilePath/Hallgr%C3%ADmskirkja_church,_Reykjavik,_Iceland.jpg",
        highlights: [
            { icon: "fa-plane-arrival", text: "18:25 抵達 KEF" },
            { icon: "fa-car", text: "兩台 Kia Sportage" },
            { icon: "fa-store", text: "首夜超市補給" }
        ],
        items: [
            { time: "18:25", title: "抵達凱夫拉維克國際機場（KEF）", icon: "fa-plane-arrival", content: { description: "入境、取行李、辦理租車手續（兩台 Sportage）。", subsections: [
                { title: "🍺 機場免稅店買酒，省一半稅金", description: "冰島酒精稅極高，一般超市僅賣酒精濃度低於 2.25% 的「模擬啤酒」。針對這班 18:25 抵達的班機，建議直接在 KEF 機場免稅店買齊整趟行程的酒——價格約為市區國營專賣店 Vínbúðin 的半價，且 Vínbúðin 營業時間極短，一旦錯過機場就要付雙倍金錢與排隊時間。" },
                { title: "💳 加油機 PIN 碼確認", description: "冰島自助加油機必須輸入 4 位數 PIN 碼（預借現金密碼），務必確認出發前已致電台灣發卡銀行開通，否則在無人加油站受困，緊急拖吊費可能高達數萬台幣。" }
            ] } },
            { time: "約 19:10", title: "開車前往雷克雅維克", icon: "fa-car", content: { description: "車程約 45 分鐘。", transport: "取車完成約 19:30，此時 Bónus（小豬）已經關門（10:00-18:30）。" } },
            { time: "晚間", title: "首夜超市補給（Krónan 或小型超市）", icon: "fa-shopping-basket", content: { description: "小豬超市已關，請直接前往機場附近或市區的 Krónan（黃臉，營業時間較長）或小型超市，購買今晚簡易晚餐與明天早餐的食材。", subsections: [
                { title: "🐷 Bónus（小豬）", description: "全冰島最便宜，自煮團首選，必買 Skyr、羊排。營業時間最短（10:00-18:30），須精準配時。" },
                { title: "🟡 Krónan（黃臉）", description: "生鮮品質優、規模大，營業時間較小豬長，是延時補給的最佳備案，也是南岸維克鎮（Vík）的靈魂命脈。" },
                { title: "🟢 Nettó", description: "分佈廣泛，東部與北部大城的關鍵站點，常有 24 小時門市。" },
                { title: "🔴 10-11", description: "24 小時營業，但價格常比小豬貴 2-3 倍，除非深夜急用否則嚴禁進入。" }
            ] } },
            { time: "住宿", title: "雷克雅維克（第 1 晚）", icon: "fa-hotel", content: { description: "今晚早點休息，調整時差。" } }
        ]
    },
    day2: {
        navInfo: { date: '9/3', day: '(週四)' },
        title: "黃金圈一日遊",
        themeImage: "https://commons.wikimedia.org/wiki/Special:FilePath/Gullfoss,_an_iconic_waterfall_of_Iceland.jpg",
        highlights: [
            { icon: "fa-water", text: "Gullfoss 黃金瀑布" },
            { icon: "fa-hot-tub", text: "Geysir 間歇泉" },
            { icon: "fa-shopping-basket", text: "雷市大採購" }
        ],
        items: [
            { time: "09:30", title: "Þingvellir 國家公園", icon: "fa-mountain", content: { description: "歐美板塊交界裂谷，世界遺產。", transport: "停留約 1 小時；停車費 ISK 1,000。" } },
            { time: "11:00", title: "Brúarfoss 瀑布", icon: "fa-water", content: { description: "夢幻土耳其藍瀑布，來回步行約 40 分鐘。", transport: "停留約 1 小時。" } },
            { time: "12:30", title: "Geysir 間歇泉", icon: "fa-hot-tub", content: { description: "Strokkur 每 5-10 分鐘噴發一次，免門票。", transport: "停留約 1 小時；停車 ISK 1,000。" } },
            { time: "14:00", title: "Gullfoss 黃金瀑布", icon: "fa-water", content: { description: "雙層大瀑布，上下觀景台都值得走一趟，免費參觀。", transport: "停留約 1 小時。" } },
            { time: "15:30", title: "Kerið 火山口湖", icon: "fa-mountain", content: { description: "紅色火山口配藍綠湖水的強烈對比色。", transport: "停留約 30 分鐘；門票 ISK 400。" } },
            { time: "17:00", title: "回到雷克雅維克・超市大採購", icon: "fa-shopping-basket", content: { description: "在雷克雅維克 Bónus 進行「前半段最重要大採購」，晚餐自炊或外食。", subsections: [
                { title: "🛒 前半段大採購清單", description: "醃製羊排（天然放牧無騷味，省去調味麻煩）、Ísey Skyr（建議買 500g 大包裝性價比最高）、吐司、雞蛋，以及每包僅約 102 ISK 的義大利麵。" }
            ] } },
            { time: "住宿", title: "雷克雅維克（第 2 晚，同一間）", icon: "fa-hotel", content: { description: "時差調整日，節奏輕鬆不要太拚。" } }
        ]
    },
    day3: {
        navInfo: { date: '9/4', day: '(週五)' },
        title: "南岸瀑布與黑沙灘",
        themeImage: "https://commons.wikimedia.org/wiki/Special:FilePath/Sk%C3%B3gafoss_July_2014.JPG",
        highlights: [
            { icon: "fa-water", text: "Seljalandsfoss 水簾洞" },
            { icon: "fa-water", text: "Skógafoss 彩虹瀑布" },
            { icon: "fa-umbrella-beach", text: "Reynisfjara 黑沙灘" }
        ],
        items: [
            { time: "09:00", title: "Seljalandsfoss 水簾洞瀑布", icon: "fa-water", content: { description: "可以走到瀑布後方！雨衣必備。", transport: "停留約 45 分鐘；停車 ISK 900。" } },
            { time: "10:00", title: "Gljúfrabúi 秘密瀑布", icon: "fa-water", content: { description: "Seljalandsfoss 旁走路 5 分鐘，藏在峽縫裡，會全身濕。", transport: "停留約 20 分鐘。" } },
            { time: "11:30", title: "Skógafoss 彩虹瀑布", icon: "fa-water", content: { description: "瀑底感受磅礡水勢，也可爬階梯上頂看全景，天晴時常見彩虹。", transport: "停留約 1 小時。" } },
            { time: "14:00", title: "Dyrhólaey 海岬", icon: "fa-mountain", content: { description: "燈塔頂端俯瞰黑沙灘全景＋天然石拱門。", transport: "停留約 30 分鐘。" } },
            { time: "15:00", title: "Reynisfjara 黑沙灘", icon: "fa-water", content: { description: "玄武岩石柱＋海蝕洞，經典冰島景觀。", transport: "停留約 45 分鐘。" }, danger: "絕對遠離海浪，瘋狗浪真的會捲人。" },
            { time: "16:30", title: "Vík 紅頂小教堂", icon: "fa-church", content: { description: "山坡上俯瞰小鎮的經典畫面，日落時分最美。", transport: "停留約 15 分鐘。" } },
            { time: "17:00", title: "Vík 黑沙灘散步", icon: "fa-umbrella-beach", content: { description: "鎮上的沙灘，人少、悠閒，跟白天去的 Reynisfjara 不同地點。", transport: "停留約 30 分鐘。" } },
            { time: "補給", title: "Vík（Krónan）補足生鮮", icon: "fa-shopping-basket", content: { description: "從 Hveragerði（雷市東側）到 Egilsstaðir（東部大城）之間約 500 公里的路段完全沒有小豬超市，Vík 的 Krónan 是進入東南部前的最後大型生鮮據點，務必在此補足麵包、蔬菜與乳製品。" } },
            { time: "住宿", title: "Vík", icon: "fa-hotel", content: { description: "Vík 住宿最搶手，務必提早訂。" } },
            { time: "🌌 極光", title: "第 3 晚｜Vík ⭐⭐⭐⭐ 光害很低", icon: "fa-star", content: { description: "Vík 人口不到 800 人，離開主街就非常暗，是南岸最佳極光觀測地之一。", subsections: [
                { title: "最推薦：Vík 黑沙灘（鎮上那個，非 Reynisfjara）", description: "從住宿走路就到，面朝南方大海完全無光害，極光倒映在黑沙上超夢幻。" },
                { title: "備選：Vík 教堂山坡", description: "居高臨下看整個天空，但需要爬坡。" }
            ] }, danger: "不要半夜去 Reynisfjara：夜間海浪看不清非常危險。" }
        ]
    },
    day4: {
        navInfo: { date: '9/5', day: '(週六)' },
        title: "峽谷＋冰川健行 ⭐",
        themeImage: "https://commons.wikimedia.org/wiki/Special:FilePath/Vatnaj%C3%B6kull_National_Park_banner_2.jpg",
        highlights: [
            { icon: "fa-water", text: "Fjaðrárgljúfur 峽谷" },
            { icon: "fa-person-hiking", text: "Skaftafell 冰川健行" },
            { icon: "fa-utensils", text: "Höfn 龍蝦晚餐" }
        ],
        items: [
            { time: "09:30", title: "Fjaðrárgljúfur 峽谷", icon: "fa-water", content: { description: "Vík 東邊 40 分鐘，蛇型峽谷步道，從上方俯瞰超壯觀。", transport: "停留約 45 分鐘。" } },
            { time: "13:00", title: "⭐ Skaftafell 冰川健行", icon: "fa-person-hiking", content: { description: "必去行程！走上 Falljökull 冰川，冰爪冰斧裝備團方提供。", transport: "活動約 3-4 小時。" }, warning: "冰川健行團必須提前 2-3 週在網路上預訂，建議訂 13:00 或 14:00 的場次。業者推薦：Arctic Adventures、Icelandic Mountain Guides、Troll Expeditions。需穿硬底登山鞋（沒有可現場租 ISK 1,500）；停車費 ISK 1,040。" },
            { time: "18:30", title: "Höfn 龍蝦晚餐", icon: "fa-utensils", content: { description: "冰島海螯蝦必吃！推薦 Pakkhús 或 Humarhöfnin。", transport: "用餐約 1.5 小時。" } },
            { time: "補給", title: "Höfn（Nettó）補足乾貨", icon: "fa-shopping-basket", content: { description: "享受完海螯蝦大餐後，同時在當地的 Nettó 補足進入東部峽灣所需的乾貨。" } },
            { time: "住宿", title: "Höfn", icon: "fa-hotel", content: { description: "" } },
            { time: "🌌 極光", title: "第 4 晚｜Höfn ⭐⭐⭐⭐ 光害很低", icon: "fa-star", content: { description: "小漁港人口約 2,000，鎮外就是農田和冰川，光害極低。", subsections: [
                { title: "最推薦：港口東側堤防", description: "走路可到，面朝大海和 Vatnajökull 冰川方向，極光搭配冰川倒影的畫面絕美。" },
                { title: "備選：蝙蝠山 Stokksnes 方向", description: "如果下午去過蝙蝠山知道路，晚上開回去 15 分鐘，零光害＋尖山前景，攝影大片。" },
                { title: "最方便：住宿門口", description: "Höfn 周邊的農場民宿通常直接站在門外就能看，不用開車。" }
            ] } }
        ]
    },
    day5: {
        navInfo: { date: '9/6', day: '(週日)' },
        title: "冰河湖＋蝙蝠山",
        themeImage: "https://commons.wikimedia.org/wiki/Special:FilePath/Jokulsarlon_banner.jpg",
        highlights: [
            { icon: "fa-icicles", text: "Jökulsárlón 冰河湖" },
            { icon: "fa-gem", text: "Diamond Beach" },
            { icon: "fa-mountain", text: "蝙蝠山 Vestrahorn" }
        ],
        items: [
            { time: "09:00", title: "⭐ Jökulsárlón 冰河湖", icon: "fa-icicles", content: { description: "必去！藍冰山漂浮湖面，常有海豹出沒。", transport: "停留約 1-1.5 小時；Zodiac 快艇團約 ISK 12,000。" } },
            { time: "10:30", title: "Diamond Beach 鑽石沙灘", icon: "fa-gem", content: { description: "冰河湖對面走路 5 分鐘，冰塊散落黑沙灘上如鑽石。", transport: "停留約 30 分鐘。" } },
            { time: "12:30", title: "Sea Viewpoint", icon: "fa-binoculars", content: { description: "一號公路旁海岸觀景台，免費。", transport: "停留約 30 分鐘。" } },
            { time: "14:00", title: "蝙蝠山 Vestrahorn (Stokksnes)", icon: "fa-mountain", content: { description: "尖山倒映黑沙灘的經典畫面，私人土地收費 ISK 1,000/人。", transport: "停留約 1 小時。" } },
            { time: "15:00", title: "出發前往 Egilsstaðir", icon: "fa-car", content: { description: "約 3.5 小時車程，沿途東峽灣風景優美，會經過 Djúpivogur 等東峽灣小漁村，可隨時停下拍照休息。" }, tip: "走法重點：早上從 Höfn 往西開去冰河湖，回頭經 Höfn 繼續往東到蝙蝠山，再往北到 Egilsstaðir，不走回頭路。" },
            { time: "18:30", title: "抵達 Egilsstaðir", icon: "fa-hotel", content: { description: "住宿：Egilsstaðir。" } },
            { time: "🌌 極光", title: "第 5 晚｜Egilsstaðir ⭐⭐⭐ 光害低", icon: "fa-star", content: { description: "東部樞紐小鎮，光害不高但也不是最低。", subsections: [
                { title: "最推薦：Lagarfljót 湖邊", description: "鎮南方的大湖，開車 5-10 分鐘找一處湖邊停車，湖面倒映極光非常美。" },
                { title: "備選：鎮外農田空地", description: "往任何方向開出鎮 5 分鐘，找一條無路燈的岔路停下來就行。" }
            ] } }
        ]
    },
    day6: {
        navInfo: { date: '9/7', day: '(週一)' },
        title: "彩虹小鎮＋北上米湖",
        themeImage: "https://commons.wikimedia.org/wiki/Special:FilePath/Sey%C3%B0isfj%C3%B6r%C3%B0ur_Sept_2019_1.jpg",
        highlights: [
            { icon: "fa-palette", text: "Seyðisfjörður 彩虹小鎮" },
            { icon: "fa-water", text: "Dettifoss 黛提瀑布" },
            { icon: "fa-star", text: "全程最佳極光夜" }
        ],
        items: [
            { time: "08:30", title: "Seyðisfjörður 彩虹小鎮", icon: "fa-palette", content: { description: "翻山 25 分鐘到達，早上光線拍彩虹路最漂亮。", transport: "停留約 1-1.5 小時。" } },
            { time: "10:00", title: "回到 Egilsstaðir，往北出發", icon: "fa-car", content: { description: "準備往北前往米湖。" } },
            { time: "14:00", title: "Dettifoss 黛提瀑布", icon: "fa-water", content: { description: "歐洲水量最大瀑布，轟鳴聲遠遠就聽到。", transport: "停留約 1 小時；停車場走 15-20 分鐘。" } },
            { time: "17:00", title: "抵達米湖", icon: "fa-hotel", content: { description: "住宿：米湖 Reykjahlíð。這天車程較長但景點少，是環島中段的喘息日。" } },
            { time: "🌌 極光", title: "第 6 晚｜米湖 Mývatn ⭐⭐⭐⭐⭐ 全程最佳！", icon: "fa-star", content: { description: "米湖周圍幾乎零光害，住宿密度極低，是全冰島數一數二的極光觀測聖地。這一晚是整趟旅程看到極光機率最高的夜晚，天晴機率高就一定要出門看！用 vedur.is 同時查極光預報＋雲圖。", subsections: [
                { title: "最推薦：米湖東岸（Reykjahlíð 附近）", description: "湖邊任何一處停下來都行，極光倒映在平靜湖面上是經典畫面。" },
                { title: "備選：Dimmuborgir 停車場", description: "白天去過所以知道路，晚上熔岩奇石當前景拍極光很有氣氛。" },
                { title: "備選：Hverir 地熱區方向", description: "地熱蒸氣搭配極光很超現實，但硫磺味晚上更重。" },
                { title: "最方便：住宿門口", description: "米湖的 guesthouse 和農場幾乎都是站在門外直接看，這就是為什麼推薦訂鎮外的住宿。" }
            ] }, tip: "這晚如果天晴，設鬧鐘 23:00 和 01:00 各起來看一次，不要錯過。" }
        ]
    },
    day7: {
        navInfo: { date: '9/8', day: '(週二)' },
        title: "米湖地熱日 🔥",
        themeImage: "https://commons.wikimedia.org/wiki/Special:FilePath/Hverir_Geothermal_Area_(52424275240).jpg",
        highlights: [
            { icon: "fa-fire", text: "Hverir 硫磺地熱區" },
            { icon: "fa-hot-tub", text: "Mývatn Nature Baths" },
            { icon: "fa-water", text: "Goðafoss 眾神瀑布" }
        ],
        items: [
            { time: "09:00", title: "Dimmuborgir 暗黑城堡", icon: "fa-mountain", content: { description: "熔岩形成的奇形怪石迷宮，步道平緩多條路線。", transport: "停留約 1 小時。" } },
            { time: "10:15", title: "Grjótagjá 地熱洞穴", icon: "fa-water", content: { description: "《權力遊戲》拍攝地，可看不能泡（水溫過高）。", transport: "停留約 15 分鐘。" } },
            { time: "11:00", title: "Krafla 火山口", icon: "fa-mountain", content: { description: "Víti 翠綠火山口湖，可繞火山口一圈。", transport: "停留約 45 分鐘。" } },
            { time: "12:00", title: "Hverir 硫磺地熱區", icon: "fa-fire", content: { description: "沸騰泥漿池＋噴氣孔，像走在外星球，硫磺味很重。", transport: "停留約 30 分鐘。" } },
            { time: "13:00", title: "Mývatn Nature Baths", icon: "fa-hot-tub", content: { description: "北部版藍湖！人少、景美、約 ISK 5,900，強力推薦。", transport: "停留約 1.5 小時。" } },
            { time: "15:30", title: "Goðafoss 眾神瀑布", icon: "fa-water", content: { description: "馬蹄形瀑布，往 Akureyri 路上順路。", transport: "停留約 45 分鐘。" } },
            { time: "17:00", title: "抵達 Akureyri", icon: "fa-hotel", content: { description: "晚餐吃好的犒賞自己。全程最輕鬆的一天，車程不到 2 小時，景點全部集中在米湖周邊，Dimmuborgir、Grjótagjá、Krafla、Hverir 全在開車 5-15 分鐘內，幾乎零繞路。" } },
            { time: "補給", title: "Akureyri 補給", icon: "fa-shopping-basket", content: { description: "冰島第二大城，超市資源豐富，適合補充長途拉車所需的提神飲料與即食點心。" } },
            { time: "🌌 極光", title: "第 7 晚｜Akureyri ⭐⭐⭐ 光害中等", icon: "fa-star", content: { description: "冰島第二大城，市區有一定光害，但比雷克雅維克好很多。", subsections: [
                { title: "最推薦：Kjarnaskógur 森林公園", description: "Akureyri 南邊開車 5 分鐘，森林邊緣的空地光害極低，是當地人的極光秘境。" },
                { title: "備選：峽灣對岸", description: "過橋到對岸，完全脫離市區光害，面朝北方天空。" }
            ] } }
        ]
    },
    day8: {
        navInfo: { date: '9/9', day: '(週三)' },
        title: "回雷克雅維克",
        themeImage: "https://commons.wikimedia.org/wiki/Special:FilePath/Akureyri_Fjord,_North_Iceland_(51335225478).jpg",
        highlights: [
            { icon: "fa-water", text: "Hraunfossar 熔岩瀑布" },
            { icon: "fa-mountain", text: "Grábrók 火山口" },
            { icon: "fa-road", text: "拉車最長的一天" }
        ],
        items: [
            { time: "08:30", title: "從 Akureyri 出發", icon: "fa-car", content: { description: "今天拉車最長，約 400 公里、行車 4.5-5 小時，早點出門。" } },
            { time: "11:00", title: "Kolugljúfur 峽谷瀑布", icon: "fa-water", content: { description: "一號公路旁的隱藏版峽谷瀑布。", transport: "停留約 30 分鐘。" } },
            { time: "13:00", title: "Grábrók 火山口", icon: "fa-mountain", content: { description: "一號公路旁，爬上去只要 15 分鐘看全景。", transport: "停留約 30 分鐘。" } },
            { time: "14:00", title: "Hraunfossar 熔岩瀑布", icon: "fa-water", content: { description: "水從熔岩層縫隙湧出，綿延幾百公尺，旁邊還有 Barnafoss。", transport: "停留約 30 分鐘。" } },
            { time: "18:00", title: "抵達雷克雅維克", icon: "fa-hotel", content: { description: "晚餐推薦冰島熱狗（Bæjarins Beztu）或羊肉湯。住宿：雷克雅維克（第 3 晚）。三個景點全在一號公路上或旁邊，不用特別繞路；中途可在 Blönduós 或 Borgarnes 加油、上廁所、買咖啡。" } },
            { time: "補給", title: "Borgarnes 簡易補給", icon: "fa-shopping-basket", content: { description: "回雷市前的最後休息站，可做簡易補充。" } },
            { time: "🌌 極光", title: "第 8 晚｜雷克雅維克 ⭐⭐ 光害較高", icon: "fa-star", content: { description: "同第 1-2 晚。如果前面都沒看到，最後機會就靠 Grótta 燈塔。", subsections: [
                { title: "最推薦：Grótta 燈塔", description: "雷克雅維克西端海角，三面環海、背對城市光源，退潮時可走到燈塔，是市區公認最佳極光點。開車 10 分鐘。" },
                { title: "備選：Perlan 珍珠樓周邊", description: "Öskjuhlíð 山丘上，樹林擋住部分城市光害，居高臨下視野開闊。開車 5 分鐘。" }
            ] } }
        ]
    },
    day9: {
        navInfo: { date: '9/10', day: '(週四)' },
        title: "市區漫遊＋藍湖告別",
        themeImage: "https://commons.wikimedia.org/wiki/Special:FilePath/Iceland_Blue_Lagoon.jpg",
        highlights: [
            { icon: "fa-church", text: "Hallgrímskirkja 大教堂" },
            { icon: "fa-spa", text: "Blue Lagoon 藍湖" },
            { icon: "fa-plane-departure", text: "01:10 起飛回程" }
        ],
        items: [
            { time: "09:00", title: "Hallgrímskirkja 大教堂", icon: "fa-church", content: { description: "塔頂 360° 全景，門票 ISK 1,200。", transport: "停留約 45 分鐘。" } },
            { time: "09:45", title: "Skólavörðustígur 彩虹街", icon: "fa-palette", content: { description: "教堂門口往下走就是。", transport: "停留約 15 分鐘。" } },
            { time: "10:00", title: "Laugavegur 購物大街", icon: "fa-bag-shopping", content: { description: "買紀念品、冰島毛衣。", transport: "停留約 1 小時。" } },
            { time: "11:15", title: "Harpa 音樂廳", icon: "fa-building", content: { description: "玻璃蜂巢外觀，海邊散步順路。", transport: "停留約 30 分鐘。" } },
            { time: "11:45", title: "Sun Voyager 太陽航海者", icon: "fa-ship", content: { description: "Harpa 旁海邊不鏽鋼維京船雕塑。", transport: "停留約 10 分鐘。" } },
            { time: "12:00", title: "午餐", icon: "fa-utensils", content: { description: "市區五個點全部步行範圍內，2-3 小時搞定。", transport: "用餐約 1 小時。" } },
            { time: "13:00", title: "回住宿退房、取行李上車", icon: "fa-suitcase-rolling", content: { description: "" } },
            { time: "15:00", title: "⭐ Blue Lagoon 藍湖", icon: "fa-spa", content: { description: "必去！訂下午 3-4 點場次，Comfort 方案約 ISK 11,990。", transport: "停留約 2-3 小時。藍湖離機場只要 20 分鐘，排最後一站最順。" } },
            { time: "18:30", title: "抵達機場、還車、check in", icon: "fa-plane-departure", content: { description: "航班 01:10 起飛，18:30 到機場非常充裕。" } },
            { time: "01:10", title: "凱夫拉維克機場起飛", icon: "fa-plane", content: { description: "經哥本哈根轉機。" } }
        ]
    },
    day10: {
        navInfo: { date: '9/11-12', day: '(週五-六)' },
        title: "轉機哥本哈根・回台灣",
        themeImage: "https://commons.wikimedia.org/wiki/Special:FilePath/Hallgr%C3%ADmskirkja_church,_Reykjavik,_Iceland.jpg",
        highlights: [
            { icon: "fa-city", text: "哥本哈根轉機" },
            { icon: "fa-plane-arrival", text: "16:15 抵達桃園" }
        ],
        items: [
            { time: "06:20", title: "抵達哥本哈根（CPH）", icon: "fa-plane-arrival", content: { description: "轉機停留 8 小時 55 分。", subsections: [
                { title: "💡 順路市區小旅行", description: "搭地鐵進市區約 13 分鐘：Nyhavn 彩色房子 → Amalienborg 王宮 → 小美人魚，時間充裕可以順路走一圈。" }
            ] } },
            { time: "15:15", title: "從哥本哈根起飛", icon: "fa-plane", content: { description: "經杜拜轉機返回台灣。" } },
            { time: "16:15", title: "抵達桃園機場（9/12 週六）", icon: "fa-plane-arrival", content: { description: "旅程結束，歡迎回家！" } }
        ]
    }
};

// 極光觀測指南：每晚住宿地點對應的觀測建議
const auroraGuide = [
    { night: "第 1-2 晚", place: "雷克雅維克", dates: "9/2-9/3", stars: 2, note: "城市光害是全程最大的，但強極光在市區也看得見。", spots: ["Grótta 燈塔（最推薦，開車 10 分鐘）", "Perlan 珍珠樓周邊（開車 5 分鐘）", "Sun Voyager 雕塑海邊（備案）"] },
    { night: "第 3 晚", place: "Vík", dates: "9/4", stars: 4, note: "人口不到 800 人，離開主街就非常暗。", spots: ["Vík 黑沙灘（鎮上那個，非 Reynisfjara）", "Vík 教堂山坡"] },
    { night: "第 4 晚", place: "Höfn", dates: "9/5", stars: 4, note: "小漁港，鎮外就是農田和冰川，光害極低。", spots: ["港口東側堤防（最推薦）", "蝙蝠山 Stokksnes 方向", "住宿門口"] },
    { night: "第 5 晚", place: "Egilsstaðir", dates: "9/6", stars: 3, note: "東部樞紐小鎮，光害不高但也不是最低。", spots: ["Lagarfljót 湖邊（最推薦）", "鎮外農田空地"] },
    { night: "第 6 晚", place: "米湖 Mývatn", dates: "9/7", stars: 5, note: "全程最佳！幾乎零光害，是全冰島數一數二的觀測聖地。", spots: ["米湖東岸（Reykjahlíð 附近）", "Dimmuborgir 停車場", "Hverir 地熱區方向", "住宿門口"] },
    { night: "第 7 晚", place: "Akureyri", dates: "9/8", stars: 3, note: "冰島第二大城，市區有一定光害，但比雷市好很多。", spots: ["Kjarnaskógur 森林公園（最推薦）", "峽灣對岸", "Forest Lagoon 溫泉方向"] },
    { night: "第 8-9 晚", place: "雷克雅維克", dates: "9/9-9/10", stars: 2, note: "同第 1-2 晚，最後機會就靠 Grótta 燈塔。", spots: ["Grótta 燈塔"] }
];
