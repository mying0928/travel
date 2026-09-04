const itineraryData = {
    day1: {
        navInfo: { date: '11/12', day: '(週四)' },
        title: "佐賀初見・彌生古國與神社晨光",
        themeImage: "images/吉野里歷史公園.jpg",
        highlights: [
            { icon: "fa-landmark", text: "吉野里歷史公園" },
            { icon: "fa-torii-gate", text: "仁比山神社" },
            { icon: "fa-sun", text: "向日葵園（選配）" }
        ],
        items: [
            { time: "上午", title: "佐賀機場抵達", icon: "fa-plane-arrival", content: { description: "班機抵達佐賀機場（HSG），提領行李後租車或搭乘接駁前往市區，準備展開九州六日行。" } },
            { time: "中午 - 下午", title: "吉野里歷史公園", icon: "fa-landmark", content: { description: "日本規模最大的彌生時代環壕聚落遺址，重建了瞭望台、豎穴住居、城柵與壕溝，可以走進復原的古代村落，感受兩千多年前的聚落生活樣貌。園區腹地很大，建議預留 1.5-2 小時慢慢逛。", transport: "從佐賀機場開車或叫車前往，車程約 30-40 分鐘。" } },
            { time: "傍晚", title: "仁比山神社", icon: "fa-torii-gate", content: { description: "神埼市山腳下的古老神社，参道有石鳥居與石階，秋天楓紅時分外幽靜，遊客不多，適合安靜地散步參拜。" } },
            { time: "選配", title: "Yamada向日葵園", icon: "fa-sun", content: { description: "如果時間允許、且剛好還在花期，可以順路安排這個賞花景點；11月通常已過主要花期，建議出發前先查詢當季開花狀況，沒開的話跳過即可，不影響其他行程。" } },
            { time: "晚上", title: "入住佐賀市區或唐津方向", icon: "fa-hotel", content: { description: "第一晚在佐賀市區或唐津方向的飯店辦理入住，稍作休息。<br>💡 <b>備註</b>：日本各縣市住宿補助（如有申請）通常需要分開落在不同縣才能各自申請，安排跨縣住宿時記得留意這點。" } }
        ]
    },
    day2: {
        navInfo: { date: '11/13', day: '(週五)' },
        title: "朱紅祈願・稻荷神社與海中鳥居",
        themeImage: "images/祐德稻荷神社樓門.jpg",
        highlights: [
            { icon: "fa-tree", text: "環境藝術之森" },
            { icon: "fa-torii-gate", text: "祐德稻荷神社" },
            { icon: "fa-water", text: "大魚神社海中鳥居" }
        ],
        items: [
            { time: "上午（建議9點前到）", title: "環境藝術之森", icon: "fa-tree", content: { description: "融合自然景觀與藝術裝置的森林園區，清晨人潮較少，光線也比較柔和，適合悠閒散步拍照。<br>💡 <b>提醒</b>：建議 9 點前抵達，避開後段時間逐漸增加的遊客。" } },
            { time: "中午", title: "祐德稻荷神社", icon: "fa-torii-gate", content: { description: "日本三大稻荷神社之一，鮮豔的朱紅樓門、本殿依山而建，還有沿山坡而上、連綿不絕的千本鳥居參道，是九州數一數二壯觀的神社建築群，非常適合拍照。" } },
            { time: "下午", title: "大魚神社海中鳥居", icon: "fa-water", content: { description: "佇立在有明海海面上的六座朱紅鳥居，隨著潮汐時而佇立灘塗、時而半浸海中，是九州少見的海上鳥居景觀。<br>⚠️ <b>備註</b>：滿潮與退潮呈現的畫面完全不同——退潮時可以走近鳥居底部，滿潮時鳥居則像浮在海面上，出發前務必先查好當天的潮汐時間表，抓準想拍的畫面對應的潮汐狀態再過去。" } },
            { time: "晚上", title: "入住武雄溫泉", icon: "fa-hotel", content: { description: "前往武雄溫泉辦理入住，晚上可以順道泡個溫泉，消除一整天的疲憊。" } }
        ]
    },
    day3: {
        navInfo: { date: '11/14', day: '(週六)' },
        title: "紅葉樂園・豪斯登堡花火之夜",
        themeImage: "images/御船山樂園紅葉.jpg",
        highlights: [
            { icon: "fa-tree", text: "御船山樂園賞楓" },
            { icon: "fa-train", text: "JR前往豪斯登堡" },
            { icon: "fa-fire", text: "九州一大花火祭" }
        ],
        items: [
            { time: "上午", title: "御船山樂園賞楓", icon: "fa-tree", content: { description: "以巨大御船山為背景的日式庭園，池水、奇岩與楓紅相映成景，秋天是園區最具人氣的季節。<br>🍁 <b>備註</b>：紅葉季約落在 11 月上旬～12 月上旬，抵達時屬旺季，但實際轉紅程度仍以現場當天狀況為準。" } },
            { time: "中午 - 下午", title: "搭JR前往豪斯登堡", icon: "fa-train", content: { description: "從武雄溫泉搭乘 JR 前往豪斯登堡站，車程視班次而定，建議先查好時刻表。抵達後步行即可進入園區。", transport: "JR 佐世保線／大村線，請至 JR 九州官網或當地確認實際班次與所需時間。" } },
            { time: "傍晚", title: "入住豪斯登堡園區內", icon: "fa-hotel", content: { description: "在豪斯登堡園區內的飯店辦理入住，放好行李後即可直接展開園區內的夜間行程，不用再移動。" } },
            { time: "晚上", title: "九州一大花火祭🎆", icon: "fa-fire", content: { description: "號稱九州規模最大的花火祭典，豪斯登堡運河與歐風建築搭配璀璨煙火，是這趟行程壓軸的重頭戲之一。<br>⚠️ <b>備註</b>：花火祭確切開始時間目前尚未公告，抵達豪斯登堡後請務必先確認當日園區發放的節目表或官網公告，抓準卡位與拍照時間。" } }
        ]
    },
    day4: {
        navInfo: { date: '11/15', day: '(週日)' },
        title: "歐風園區・九十九島海景巡禮",
        themeImage: "images/九十九島.jpg",
        highlights: [
            { icon: "fa-ferris-wheel", text: "豪斯登堡續遊" },
            { icon: "fa-ship", text: "九十九島遊覽船" }
        ],
        items: [
            { time: "上午", title: "豪斯登堡上午續玩", icon: "fa-ferris-wheel", content: { description: "上午留在園區內自由活動，可以挑選前一晚沒逛完的區域，或是喜歡的設施、花園、美食街慢慢逛，不趕行程。" } },
            { time: "中午", title: "前往佐世保", icon: "fa-train", content: { description: "退房後從豪斯登堡前往佐世保市區，準備下午的九十九島行程。", transport: "JR 或租車皆可，請視當天路況與班次決定。" } },
            { time: "下午", title: "佐世保九十九島（遊覽船或展望台）", icon: "fa-ship", content: { description: "西海國立公園內大小島嶼星羅棋布的絕景海域，可以選擇搭乘遊覽船近距離穿梭島嶼間，或是到展望台居高俯瞰整片海景，兩種方式都能欣賞到九十九島的美，依當天天氣與時間擇一即可。" } },
            { time: "晚上", title: "入住糸島", icon: "fa-hotel", content: { description: "結束佐世保行程後，前往糸島辦理入住，為隔天的賞楓與海景行程做準備。" } }
        ]
    },
    day5: {
        navInfo: { date: '11/16', day: '(週一)' },
        title: "深山紅葉・夫婦岩夕照",
        themeImage: "images/二見浦夫婦岩.jpg",
        highlights: [
            { icon: "fa-tree", text: "雷山千如寺賞楓" },
            { icon: "fa-water", text: "白糸の滝" },
            { icon: "fa-torii-gate", text: "二見ヶ浦夫婦岩" }
        ],
        items: [
            { time: "上午", title: "雷山千如寺大悲王院賞楓", icon: "fa-tree", content: { description: "隱身雷山山腰的古剎，參道兩側楓樹成蔭，秋天楓紅時節整條參道被染成一片橘紅，是糸島知名的賞楓秘境，遊客比福岡市區景點少很多。" } },
            { time: "中午", title: "白糸の滝", icon: "fa-water", content: { description: "落差約 24 公尺的清澈瀑布，水流如白絲垂落，周邊步道林蔭茂密，適合稍作停留、拍照散心。" } },
            { time: "傍晚", title: "桜井二見ヶ浦夫婦岩", icon: "fa-torii-gate", content: { description: "海面上並立的一對夫婦岩，中間繫著注連繩，搭配夕陽西下時的金色海面，是糸島最具代表性的夕陽景點之一。<br>⚠️ <b>備註</b>：建議日落前 30-40 分鐘到場卡位，黃昏時段人潮較多，太晚到可能找不到理想的拍照位置。" } },
            { time: "晚上", title: "入住糸島或福岡", icon: "fa-hotel", content: { description: "視隔天行程安排，選擇留在糸島或直接移動到福岡市區入住。" } }
        ]
    },
    day6: {
        navInfo: { date: '11/17', day: '(週二)' },
        title: "最終祈願・博多告別九州",
        themeImage: "images/太宰府天滿宮.jpg",
        highlights: [
            { icon: "fa-torii-gate", text: "太宰府天滿宮" },
            { icon: "fa-bag-shopping", text: "博多市區購物" }
        ],
        items: [
            { time: "上午", title: "竈門神社", icon: "fa-torii-gate", content: { description: "位於寶滿山山腳的古老神社，以緣結（姻緣）聞名，朱紅社殿掩映在山林之間，境內清幽，很適合作為這天的第一站。" } },
            { time: "上午 - 中午", title: "太宰府天滿宮", icon: "fa-torii-gate", content: { description: "日本三大天滿宮之一，供奉學問之神菅原道真，参道兩旁的梅枝餅店家林立，本殿與心字池上的太鼓橋是經典打卡點。可以順道買幾個現烤梅枝餅當點心。" } },
            { time: "下午", title: "博多市區購物", icon: "fa-bag-shopping", content: { description: "回到博多市區，展開最後的伴手禮採買時光。", subsections: [
                { title: "🏮 中洲", description: "博多知名的屋台（路邊攤）與夜生活聚集地，白天可以先逛逛周邊街區，感受在地氣氛。" },
                { title: "🚇 天神地下街", description: "室內型商店街，不怕天氣影響，服飾、雜貨、伴手禮應有盡有，逛街走路都很方便。" },
                { title: "🎪 Canal City", description: "大型複合商場，運河造景搭配各式餐飲與品牌店鋪，適合安排最後的用餐與採購。" }
            ] } },
            { time: "傍晚", title: "福岡機場搭機返台", icon: "fa-plane-departure", content: { description: "前往福岡機場辦理登機手續，搭機返回溫暖的家，結束這趟九州楓火之旅。" } }
        ]
    }
};
