const itineraryData = {
    day1: {
        navInfo: { date: '9/8', day: '(週日)' },
        title: "青森初見・港町與睡魔之夜",
        themeImage: "images/aomori_bay_bridge.webp",
        highlights: [
            { icon: "fa-plane-arrival", text: "抵達青森" },
            { icon: "fa-apple-alt", text: "A-Factory" },
            { icon: "fa-drum", text: "睡魔之家" },
            { icon: "fa-guitar", text: "三味線居酒屋" }
        ],
        items: [
            { time: "14:20 - 15:30", title: "抵達青森機場・專車接送", icon: "fa-plane-arrival", content: { description: "班機抵達青森機場(AOJ)，使用預約的 NearMe 機場接送前往市區飯店。<br>⭐ 備註：7人共 9980 日幣。" } },
            { time: "15:30 - 16:30", title: "ReLabo Hotel 寄放行李", icon: "fa-hotel", content: { description: "前往2024年7月新開幕的車站共構飯店，先寄放行李，稍作休整後準備開始探索！<br>🏨 <b>飯店特色</b>：6樓 Wellness Center 包含大浴場、個室溫泉及全天候供應咖啡茶飲的 Lounge。", transport: "位於 JR 青森站樓上，交通極為便利。" } },
            { time: "16:30 - 18:00", title: "港邊雙體驗：A-Factory & 睡魔之家", icon: "fa-city", content: { description: "感受青森的兩大魅力：蘋果與睡魔祭。", subsections: [
                { title: "🏭 A-Factory", description: "在海港旁的蘋果工廠散步，尋找各種蘋果伴手禮，必吃 Gelato 冰淇淋 (推薦: あかね、玉林)，二樓還可試喝西打酒。" },
                { title: "👹 睡魔之家 WARASSE", description: "步行 2 分鐘即可抵達。在此可以近距離觀賞睡魔祭的巨型燈籠花車，感受祭典的震撼力。每日還有囃子演奏體驗。<br><b>門票：</b>成人 620円 | <b>營業時間：</b>09:00-18:00 (最終入館 17:30)" }
            ], transport: "從飯店步行即可輕鬆抵達。" } },
            { time: "18:30 onwards", title: "晚餐：津輕三味線居酒屋", icon: "fa-utensils", content: { description: "晚餐有兩個選擇，都能欣賞到津輕三味線的現場演奏：<br>1. <b>津軽じょっぱり漁屋酒場</b>：氣氛熱鬧，主打三味線演奏。<br>2. <b>ねぶたの國たか久</b>：包含跳人舞、打鼓等更豐富的表演，但觀看表演需點指定套餐。", transport: "兩家店都在市區，可從飯店步行或搭乘短程計程車。" } }
        ]
    },
    day2: {
        navInfo: { date: '9/9', day: '(週一)' },
        title: "自然巡禮・市場、蘋果與紅葉前線",
        themeImage: "images/hakkoda_ropeway.webp",
        highlights: [
            { icon: "fa-fish", text: "古川市場" },
            { icon: "fa-tree", text: "弘前蘋果公園" },
            { icon: "fa-mountain", text: "八甲田山" }
        ],
        items: [
            { time: "08:00 - 09:30", title: "青森魚菜中心 (古川市場)", icon: "fa-concierge-bell", content: { description: "早餐來一頓自製的豪華海鮮丼！先在案內所購買餐券，換一碗白飯，然後到各攤位用剩下的餐券換取喜歡的新鮮海鮮，組合出獨一無二的美味。"} },
            { time: "10:00 - 12:30", title: "弘前蘋果公園", icon: "fa-apple-alt", content: { description: "前往被譽為「東北富士山」的岩木山下的蘋果公園。除了品嚐蘋果咖哩、蘋果豬排等特色美食外，最重要的是體驗親手採摘蘋果的樂趣！<br>🍎 <b>活動</b>：抵達後，先到「りんごの家」報名蘋果採摘體驗。", transport: "從青森市區開車約 1 小時。" } },
            { time: "14:00 - 16:00", title: "八甲田山纜車", icon: "fa-gondola", content: { description: "搭乘纜車，僅需 10 分鐘即可從山麓站直達山頂。這裡是日本紅葉最早來到的地方之一，9月中旬的山頂已有機會看到「草紅葉」的壯麗景觀。<br>🎫 <b>票務</b>：建議直接在櫃檯購買 2,200 日幣的來回票。", transport: "從弘前開車約 1 小時。" } },
            { time: "16:00 - 16:30", title: "城倉大橋", icon: "fa-bridge", content: { description: "在從八甲田山前往青森屋的路上，順道參觀日本最長的上路式拱橋。從橋上可以眺望城倉溪流的壯麗景色。", transport: "位於八甲田山至青森屋途中。" } },
            { time: "18:00", title: "入住 星野集團 青森屋", icon: "fa-star", content: { description: "辦理入住手續，準備享受青森屋獨特的款待和豐富的晚間活動。", transport: "從八甲田山開車約 1.5 小時。" } }
        ]
    },
    day3: {
        navInfo: { date: '9/10', day: '(週二)' },
        title: "奧入瀨溪流與十和田湖",
        themeImage: "images/oirase_stream.webp",
        highlights: [
            { icon: "fa-water", text: "奧入瀨溪流" },
            { icon: "fa-ship", text: "十和田湖" },
            { icon: "fa-shopping-cart", text: "八食中心" }
        ],
        items: [
            { time: "上午", title: "奧入瀨溪流散策", icon: "fa-person-hiking", content: { description: "沿著溪流悠閒散步，欣賞被青苔覆蓋的岩石、清澈的流水與數個風格各異的瀑布。空氣清新，綠意盎然，是日本最美的溪流景觀之一。" } },
            { time: "中午", title: "十和田湖畔巡遊", icon: "fa-sailboat", content: { description: "在廣闊的破火山口湖「十和田湖」湖畔用餐、散步。也可考慮搭乘遊覽船，從湖上欣賞周圍的壯麗山景。" } },
            { time: "下午", title: "八食中心・海鮮與伴手禮", icon: "fa-store", content: { description: "前往八戶地區最大的市場「八食中心」。這裡不僅能買到新鮮的海產和當地伴手禮，最特別的是可以將剛買的海鮮，拿到市場內的「七厘村」炭烤區，立即享受最新鮮的炭烤海味！", transport: "從十和田湖區域開車約 1.5 小時。" } },
            { time: "晚上", title: "入住八戶", icon: "fa-bed", content: { description: "在八戶市區的飯店辦理入住。" } }
        ]
    },
    day4: {
        navInfo: { date: '9/11', day: '(週三)' },
        title: "岩手雙溪谷名勝",
        themeImage: "images/genbikei.webp",
        highlights: [
            { icon: "fa-place-of-worship", text: "盛岡八幡宮" },
            { icon: "fa-cookie-bite", text: "嚴美溪飛天糰子" },
            { icon: "fa-anchor", text: "猊鼻溪遊船" }
        ],
        items: [
            { time: "上午", title: "盛岡八幡宮", icon: "fa-torii-gate", content: { description: "離開八戶後，首先前往盛岡市，參拜當地最重要的信仰中心「盛岡八幡宮」。" } },
            { time: "中午", title: "嚴美溪・體驗飛天糰子", icon: "fa-candy-cane", content: { description: "欣賞嚴美溪的溪谷風光，並體驗這裡最有趣的活動：將錢放入籃子中，敲響木板，對岸的店家就會用纜繩將熱騰騰的「郭公糰子」送到你手中！" } },
            { time: "下午", title: "猊鼻溪遊船", icon: "fa-water", content: { description: "乘坐傳統的平底船，在船夫吟唱著「猊鼻追分」的歌聲中，悠閒地穿梭於高聳的石灰岩峭壁之間，享受寧靜而詩意的時光。" } },
            { time: "晚上", title: "入住仙台", icon: "fa-city", content: { description: "結束岩手的行程後，驅車前往宮城縣的首府仙台市並辦理入住。" } }
        ]
    },
    day5: {
        navInfo: { date: '9/12', day: '(週四)' },
        title: "日本三景・松島灣巡禮",
        themeImage: "images/matsushima.webp",
        highlights: [
            { icon: "fa-ship", text: "松島遊船" },
            { icon: "fa-store-alt", text: "仙台市區逛街" }
        ],
        items: [
            { time: "上午", title: "搭乘火車前往松島", icon: "fa-train", content: { description: "從仙台站搭乘 JR 仙石線前往松島海岸站，準備探訪名列「日本三景」之一的松島。" } },
            { time: "中午", title: "松島灣遊船", icon: "fa-sailboat", content: { description: "搭乘遊覽船，環繞散佈在海灣中的 260 多個大小島嶼。船上會有詳細的解說，讓你認識各個奇岩怪石的由來與傳說。" } },
            { time: "下午", title: "返回仙台市區・逛街購物", icon: "fa-shopping-bag", content: { description: "回到仙台市區，可以逛逛最熱鬧的商店街，採買藥妝、伴手禮，並在此享用晚餐。" } }
        ]
    },
    day6: {
        navInfo: { date: '9/13', day: '(週五)' },
        title: "最終祈願・告別東北",
        themeImage: "images/sendai_airport.webp",
        highlights: [
            { icon: "fa-coins", text: "金蛇水神社" },
            { icon: "fa-plane-departure", text: "搭機返程" }
        ],
        items: [
            { time: "上午", title: "金蛇水神社", icon: "fa-fan", content: { description: "在前往機場前，參拜以祈求財運、事業運聞名的金蛇水神社。這裡有獨特的蛇紋石，據說撫摸後可以帶來好運。" } },
            { time: "中午", title: "前往仙台機場・搭機回程", icon: "fa-plane-departure", content: { description: "在機場或附近享用在東北的最後一餐，隨後辦理登機手續，搭機返回溫暖的家。" } }
        ]
    }
};