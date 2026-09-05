const itineraryData = {
    day1: {
        navInfo: { date: '9/8', day: '(週二)' },
        title: "青森初見・港町與睡魔之夜",
        themeImage: "images/睡魔祭.webp",
        highlights: [
            { icon: "fa-torii-gate", text: "廣田蘋果神社" },
            { icon: "fa-drum", text: "睡魔之家＆A-Factory" },
            { icon: "fa-guitar", text: "三味線祭典晚宴" }
        ],
        items: [
            { time: "09:55 - 14:20", title: "桃園出發・飛抵青森", icon: "fa-plane-departure", content: { description: "搭乘 <b>BR122</b> 從台北桃園國際機場出發，飛行約 4 小時 25 分，14:20 抵達青森機場 (AOJ)。" } },
            { time: "14:20", title: "抵達青森機場・專車接送", icon: "fa-plane-arrival", content: { description: "班機抵達青森機場(AOJ)，使用預約的 NearMe 機場接送前往市區飯店。<br>⭐ 備註：7人共 9980 日幣。" } },
            { time: "下午", title: "ReLabo Hotel 寄放行李", icon: "fa-hotel", content: { description: "前往2024年7月新開幕的車站共構飯店 <b>ReLabo -Medical Spa & Stay</b>（官網訂通常比較便宜），先寄放行李，稍作休整後準備出發廣田神社。<br><span class=\"text-red-600 font-semibold\">⚠️ 重點：</span>御守授予所 16:30 休息，記得 16:00 前離開飯店才買得到。", transport: "位於 JR 青森站樓上，交通極為便利。", special: { summary: "🛌 展開飯店設施與 Lounge 供應時段", content: "<div><h4 class='font-semibold text-slate-800'>🛌 6樓 Wellness Center</h4><p class='text-sm text-slate-600 mt-1'>統稱 Wellness Center，涵蓋健康諮詢相談室、診療室、阿育吠陀 SPA、男女大浴場、個室溫泉、Lounge 與健身房，全部集中在 6 樓。</p></div><div><h4 class='font-semibold text-slate-800'>☕ Lounge 供應時段</h4><p class='text-sm text-slate-600 mt-1'>06:00-24:00 全天供應美式、拿鐵、卡布奇諾及 10 種口味的有機茶包；<b>15:00-24:00</b> 有 2 款青森蘋果汁、1 款鮮果水無限暢飲，加上 2-3 種小零食（<b>15:00</b> 會擺出當日限量鮮切青森蘋果，拿完為止）；<b>17:00-19:00</b> 加碼供應糖質 ZERO 啤酒；<b>06:00-10:00</b> 則有營養師監修的新鮮蔬果昔，7 種口味一週輪替、每款都加了青森蘋果，可以在 ReLabo 官網查看當天的蔬果昔口味。</p></div>" } } },
            { time: "下午", title: "廣田神社・日本唯一病厄除神社", icon: "fa-torii-gate", content: { description: "全日本唯一的「病厄除」守護神社，社內手水舍也飄著滿滿蘋果意象——紅蘋果象徵「心靈平和」、青蘋果象徵「心靈和諧」，皆是祈求驅除疾病、災難與厄運的吉祥物。", special: { summary: "🍎 展開特色御守清單", content: "<p class='text-sm text-slate-600'>青森蘋果御守（守護健康祈願）、袋住幸福的透明金魚御守、來自稻荷神使者金狐狸的庇佑（事業生活大豐收）。</p>" } } },
            { time: "傍晚", title: "港邊雙體驗：A-Factory & 睡魔之家", icon: "fa-city", content: { description: "感受青森的兩大魅力：蘋果與睡魔祭。", subsections: [
                { title: "🏭 A-Factory", description: "位於 JR 青森站北側，出站左轉可見港灣大橋，紅色建築即是睡魔之家 WARASSE。工廠內尋找各種蘋果伴手禮：蘋果派餅乾、蘋果牛奶糖、純天然蘋果茶茶包；二樓「西打酒工房」可試喝再買。必吃 Gelato 冰淇淋，可比較三種蘋果口味——最左邊「あかね」最不甜；中間「ジョナゴールド」佔全日本約 6 成產量、口感清脆，是酸甜最平衡的一款；右邊「玉林」則偏甜。" },
                { title: "👹 睡魔之家 WARASSE", description: "步行 2 分鐘即可抵達，常設展示可近距離觀賞睡魔祭的巨型燈籠花車，感受祭典的震撼力。<br>🎬 影像首映 09:30，之後每半小時（10:00 起）撥出一次、每次 10 分鐘；🥁 睡魔祭體驗（囃子演奏）平日場次為 11:10、13:10、15:10（各 20 分鐘）——傍晚才抵達可能錯過現場體驗場次，仍可盡情欣賞常設花車展示。<br><b>門票：</b>成人 620円 | <b>營業時間：</b>09:00-18:00 (最終入館 17:30)" }
            ], transport: "從飯店步行即可輕鬆抵達。" } },
            { time: "19:15", title: "晚餐：津輕三味線居酒屋", icon: "fa-utensils", content: { description: "晚餐有兩個選擇，都能欣賞到津輕三味線的現場演奏：", subsections: [
                { title: "🎸 津軽じょっぱり漁屋酒場", description: "氣氛熱鬧，主打三味線演奏。" },
                { title: "🥁 ねぶたの國たか久", description: "預約 19:15 一定要準時到，除了津輕三味線，還有跳人舞、打鼓等更豐富的表演，同時附上道地鄉土料理套餐（每人低消一杯飲料）。<span class=\"text-red-600 font-semibold\">⚠️ 重點：</span>看表演務必點指定的 4,400円 或 5,500円 套餐。" }
            ], transport: "兩家店都在市區，可從飯店步行或搭乘短程計程車。", special: { summary: "🍽️ 查看方案 A：經典在地風味套餐內容 (4,400円／約台幣 950 元)", content: "<ul class='list-disc list-inside space-y-1'><li>【刺身】陸奧灣新鮮生魚片拼盤（3種）</li><li>【名物】大干貝殼燒味噌（青森靈魂料理，蛋香濃郁）</li><li>【火鍋】八戶仙貝汁（Q彈仙貝配上熱騰騰雞湯）</li><li>【肉類】十和田燒牛五花（甜鹹醬汁炒洋蔥與牛肉）</li><li>【炸物】青森手工炸章魚腳餅</li><li>【主食】蕎麥麵或白飯</li><li>【甜點】青森蘋果小點</li></ul>" } } }
        ]
    },
    day2: {
        navInfo: { date: '9/9', day: '(週三)' },
        title: "自然巡禮・市場、蘋果與紅葉前線",
        themeImage: "images/城倉大橋.jpg",
        highlights: [
            { icon: "fa-fish", text: "古川市場海鮮丼" },
            { icon: "fa-bridge", text: "鶴舞之橋・津輕富士倒影" },
            { icon: "fa-star", text: "青森屋祭典之夜" }
        ],
        items: [
            { time: "08:00 - 09:00", title: "青森魚菜中心 (古川市場)", icon: "fa-concierge-bell", content: { description: "早餐來一頓自製的豪華海鮮丼！<br>① 先到古川市場的案內所購買餐券<br>② 拿 1 張餐券換 1 碗白飯（大碗需 2 張）<br>③ 到各攤位用餐券換取喜歡的新鮮海鮮<br>④ 到用餐區大快朵頤，組合出獨一無二的美味。", transport: "約 09:00 從市場出發，前往下一站鶴舞之橋。" } },
            { time: "上午", title: "青森「鶴舞之橋」（鶴の舞橋）", icon: "fa-bridge", content: { description: "日本最長的木造三連太鼓橋，橫跨「津輕富士見湖」，與遠方岩木山相映成絕美風景。全長 300 公尺、寬 3 公尺，於 1994 年完工，全橋使用 700 棵、樹齡超過 150 年的青森產檜木（青森扁柏）建造。晴朗無風時，湖面能映出有「津輕富士」之稱的岩木山倒影。<br>🕊️ <b>吉祥寓意：</b>三座拱橋相連的橋身外型猶如鶴展翅飛翔，日文發音也與「長生橋」諧音，象徵延年益壽。", special: { summary: "🔢 藏在細節裡的數字「三」", content: "日本文化非常鍾愛數字「三」，認為它代表著穩定與吉祥，鶴舞之橋在設計時徹底貫徹了這個概念：橋身由 3 座拱橋（太鼓橋）相連、全長正好是 300 公尺、建造時總共使用了 3,000 根圓木與 3,000 片板材、橋面寬度為 3 公尺。" } } },
            { time: "中午", title: "弘前蘋果公園", icon: "fa-apple-alt", content: { description: "前往被譽為「東北富士山」的岩木山下的蘋果公園。一抵達先到蘋果少女雕像後方的「りんごの家」報名採收體驗，並可品評蘋果汁（500円）與蘋果派（1,100円）。", transport: "從鶴舞之橋開車約 40 分鐘。", subsections: [
                { title: "🧺 採果與野餐方案", description: "以下請至商店服務櫃檯報名，會有人員帶領前往開放區域：採蘋果（8/1～11月中）每 100g 收費 100円；蘋果野餐 2,000円可挑選一瓶青森蘋果汁，並附一盒便當、野餐籃與桌椅（籃與桌椅需歸還）。<br><span class=\"text-amber-600 font-semibold\">💡 小提醒：</span>建議自備輕便環保袋，方便帶走現採的蘋果。" }
            ], special: { summary: "🍛 展開蘋果之家 (Ringo no Ie) 必吃菜單", content: "<p class='text-sm text-slate-600'>必吃蘋果咖哩飯、蘋果豬排、蘋果拉麵。</p>" } } },
            { time: "下午", title: "城倉大橋", icon: "fa-bridge", content: { description: "順道參觀日本最長的上路式拱橋，從橋上可以眺望城倉溪流的壯麗景色。<br><span class=\"text-amber-600 font-semibold\">💡 小提醒：</span>從弘前經國道 394 號前往八甲田時，會先經過城倉大橋，隨後才抵達八甲田纜車，因此把這站排在前面順向遊覽，不必走回頭路。", transport: "從弘前蘋果公園開車約 50 分鐘。" } },
            { time: "下午", title: "八甲田山纜車", icon: "fa-gondola", content: { description: "搭乘纜車，僅需 10 分鐘即可從山麓站直達山頂，每 15-20 分鐘一班車。這裡是日本紅葉最早來到的地方之一，9月中旬的山頂已有機會看到「草紅葉」的壯麗景觀。<br><span class=\"text-amber-600 font-semibold\">💡 小提醒：</span>建議直接在櫃檯購買 2,200 日幣的來回票，出發前可先上八甲田纜車官網查看最新山頂實景照片。", transport: "從城倉大橋開車約 20 分鐘。" } },
            { time: "晚上", title: "入住 星野集團 青森屋", icon: "fa-star", content: { description: "辦理入住手續，青森屋以青森四大祭典文化為主題，分為「本館」、「東館」及「西館」三幢建築，主設施都位在本館和西館連接的 1 樓空間裡。", transport: "從八甲田山開車約 1.5 小時。", subsections: [
                { title: "🏮 陸奧祭典屋 (Mutsu Matsuriya)", description: "成人 1,500円，這是青森屋的靈魂設施。每天晚上會有大型的祭典表演（需預約付費），內容結合了青森四大祭典（睡魔祭、弘前、五所川原、八戶），包含極具震撼力的三味線、笛鼓合奏，以及巨大的山車遊行。<br>亮點：結尾時所有觀眾會受邀一起跳「跳人」舞蹈（Rassera!），氣氛非常熱血。" },
                { title: "🎶 歡騰廣場 (Jawamegu Hiroba) 免費表演", description: "飯店最熱鬧的核心區，裝飾著滿滿的睡魔燈籠。舞台每天固定時段有免費的津輕三味線與民謠表演，不用預約就能在充滿燈籠氛圍的廣場欣賞。" }
            ], special: { summary: "🏨 展開更多館內設施看點（蘋果汁水龍頭・溫泉・公園・餐廳）", content: "<div><h4 class='font-semibold text-slate-800'>🍎 蘋果汁水龍頭＆蘋果扭蛋機</h4><p class='text-sm text-slate-600 mt-1'>飯店最受歡迎的設施——真的可以從牆上的水龍頭接出無限暢飲的蘋果汁（通常供應至晚上 8 點）；投幣後扭蛋機會掉出不同品種的青森蘋果。另提供色彩鮮豔的浴衣租借，非常適合館內穿著拍照。</p></div><div><h4 class='font-semibold text-slate-800'>♨️ 三大特色溫泉</h4><p class='text-sm text-slate-600 mt-1'>浮湯（露天溫泉）：溫泉池蓋在池塘中央，泡湯時視覺上與湖水連成一線，9月入住可見綠意環繞或初秋景致，非常療癒；檜木湯（內湯）：牆壁和天花板都使用高品質的青森檜木，充滿森林香氣；元湯：位於飯店園區入口附近（有免費接駁車），是深受當地人喜愛的復古風溫泉，天花板有漂亮的津輕玻璃裝飾。</p></div><div><h4 class='font-semibold text-slate-800'>🌳 青森屋公園（河童沼）</h4><p class='text-sm text-slate-600 mt-1'>飯店外圍有一大片約 22 萬坪的森林公園，圍繞著「河童沼」池塘。足湯位於公園湖畔，可邊泡腳邊欣賞湖景與森林；每天早晨可預約「四季馬車」搭乘由可愛大馬拉動的馬車繞行公園（需預約付費）；入住時間（約 15:00）飯店大門常有兩隻可愛的迷你馬與住客互動合照；園內還有可愛的八幡馬造型噴泉。</p></div><div><h4 class='font-semibold text-slate-800'>🍽️ NORESORE 食堂</h4><p class='text-sm text-slate-600 mt-1'>主打「媽媽的味道」的自助餐，由打扮成農家媽媽的工作人員現切牛排、現烤扇貝，餐點選擇非常豐富。</p></div><div><h4 class='font-semibold text-slate-800'>🍶 歡騰酒場 (Yottemare)</h4><p class='text-sm text-slate-600 mt-1'>昭和復古風的小酒館，提供當地美酒與魷魚乾等下酒菜，適合晚間小酌。</p></div>" } } }
        ]
    },
    day3: {
        navInfo: { date: '9/10', day: '(週四)' },
        title: "奧入瀨溪流與十和田湖",
        themeImage: "images/阿修羅之流.jpeg",
        highlights: [
            { icon: "fa-person-hiking", text: "奧入瀨溪流四段散策" },
            { icon: "fa-water", text: "十和田湖・乙女之像" },
            { icon: "fa-utensils", text: "八食中心炭烤" }
        ],
        items: [
            { time: "10:00", title: "青森屋出發", icon: "fa-car", content: { description: "早餐吃飽一點，減少中午另外找餐廳的時間，10:00 從青森屋出發前往奧入瀨溪流。" } },
            { time: "上午", title: "奧入瀨溪流・四段散策", icon: "fa-person-hiking", content: { description: "沿著溪流悠閒散步，欣賞被青苔覆蓋的岩石、清澈的流水與數個風格各異的瀑布，是日本最美的溪流景觀之一，依序安排四個停靠點：<br><span class=\"text-amber-600 font-semibold\">💡 小提醒：</span>石戶到雲井瀑布這段約 45-50 分鐘的徒步路段建議穿好走的鞋，並攜帶水與輕便雨具，山區天氣說變就變。", subsections: [
                { title: "① 三亂之流", description: "車停路邊，短暫下車拍照 5-10 分鐘，隨即順暢開車往前。" },
                { title: "② 石戶（石ヶ戸）→ 阿修羅之流 → 雲井瀑布", description: "司機在此放大家下車開始徒步：走約 20-25 分鐘抵達阿修羅之流，再繼續走約 25 分鐘抵達雲井瀑布。<br><span class=\"text-red-600 font-semibold\">⚠️ 重點：</span>走到雲井瀑布後，請司機在這裡的避車彎接大家上車！" },
                { title: "③ 銚子大瀑布", description: "奧入瀨溪流唯一、也是最大的瀑布。搭車抵達旁邊的避車彎，下車走 2 分鐘就能看到，看完直接上車即可。" },
                { title: "④ 子之口（十和田湖）", description: "搭車抵達終點，欣賞開闊的十和田湖美景，完美結束奧入瀨溪流行程！" }
            ] } },
            { time: "中午", title: "十和田湖畔巡遊", icon: "fa-water", content: { description: "<span class=\"text-red-600 font-semibold\">⚠️ 重點：</span>抵達十和田湖後最晚 14:30 就要啟程離開，本次行程不安排遊船。用餐可依下列兩個選項擇一：", subsections: [
                { title: "選項 A：子之口", description: "距離：車程 2 分鐘、1.4 公里。特色：剛出溪流抵達湖畔的第一站，餐廳選擇不多，但可以快速吃碗麵或咖哩飯止饑。" },
                { title: "選項 B：休屋地區", description: "距離：車程 15 分鐘、10.7 公里。特色：十和田湖觀光精華區，餐廳選擇多，有著名的「十和田烤五花肉」與蘋果派，推薦「みずうみ亭」。" },
                { title: "🚶‍♀️ 步道散策：少女湖道", description: "在碼頭廣場的右側、樹蔭底下就是「少女湖道」入口，沿途可參拜十和田神社，再走到湖畔沙灘看「乙女之像」——十和田湖最具代表性的地標。" }
            ], special: { summary: "📖 展開十和田神社＆乙女之像的小故事", content: "<div><h4 class='font-semibold text-slate-800'>⛩️ 十和田神社</h4><p class='text-sm text-slate-600 mt-1'>隱身在茂密杉木林中的古老神社，是東北著名的修驗道聖地，據說建造於西元 9 世紀，供奉著日本武尊，且被視為是水神的居所。<span class=\"text-amber-600 font-semibold\">💡 小提醒：</span>據說能量較強，可視當下身心狀態決定是否走進去參拜，若參拜可買「おより紙」拿到湖畔做水占卜；神社附近森林鬱鬱蔥蔥，步道上還有幾座小祠堂，供奉風神、火神、山神等。</p></div><div><h4 class='font-semibold text-slate-800'>🗿 乙女之像</h4><p class='text-sm text-slate-600 mt-1'>日本著名雕刻家高村光太郎的遺作，兩位高約 2.1 公尺的少女裸體面對面、左手碰左手。五官據說以高村光太郎的妻子為原型，身體以一位少女模特兒為原型，底座使用妻子故鄉福島的黑花崗石，雕像呈現出多個 A 字或三角形的空間。</p></div>" } } },
            { time: "傍晚", title: "八食中心・海鮮與伴手禮", icon: "fa-store", content: { description: "前往八戶地區最大的市場「八食中心」。這裡不僅能買到新鮮的海產和當地伴手禮，最特別的是可以將剛買的海鮮，拿到市場內的「七厘村」炭烤區，立即享受最新鮮的炭烤海味！", transport: "從十和田湖區域開車約 2 小時。", special: { summary: "🛍️ 展開推薦店鋪清單", content: "<div><h4 class='font-semibold text-slate-800'>🥩 47號店鋪「うえたいら肉店」</h4><p class='text-sm text-slate-600 mt-1'>招牌倉石牛，肉質鮮嫩值得一嚐。</p></div><div><h4 class='font-semibold text-slate-800'>🍘 32號店鋪「創季屋」</h4><p class='text-sm text-slate-600 mt-1'>南部煎餅（也是仙貝湯的原料）。</p></div><div><h4 class='font-semibold text-slate-800'>🐟🥐 38號店鋪「たこ坊」</h4><p class='text-sm text-slate-600 mt-1'>牛角麵包鯛魚燒（クロワッサンたい焼き）￥250。</p></div>" } } },
            { time: "晚上", title: "入住 Vacation Rental 八庵 HACHIAN", icon: "fa-bed", content: { description: "在八戶市區的民宿型住宿辦理入住，晚間可前往附近的屋台村小吃街，或到 24 小時營業的超市補貨。", special: { summary: "🏮 展開晚間去處（屋台村・24小時超市）", content: "<div><h4 class='font-semibold text-slate-800'>🏮 八戶屋台村 彌勒橫丁</h4><p class='text-sm text-slate-600 mt-1'>在地道地的橫丁美食街，適合晚間小酌配串燒。</p></div><div><h4 class='font-semibold text-slate-800'>🛒 MaxValu 八戶城下店</h4><p class='text-sm text-slate-600 mt-1'>AEON 永旺集團旗下的大型連鎖超市，24 小時營業是最大的優勢。</p></div>" } } }
        ]
    },
    day4: {
        navInfo: { date: '9/11', day: '(週五)' },
        title: "岩手雙溪谷名勝",
        themeImage: "images/猊鼻溪遊船.jpg",
        highlights: [
            { icon: "fa-torii-gate", text: "盛岡八幡宮水占卜" },
            { icon: "fa-cookie-bite", text: "嚴美溪飛天糰子" },
            { icon: "fa-water", text: "猊鼻溪遊船" }
        ],
        items: [
            { time: "08:00", title: "八戶出發", icon: "fa-car", content: { description: "為了銜接猊鼻溪遊船的時間，今日提早 08:00 從八戶出發前往盛岡。" } },
            { time: "上午", title: "盛岡八幡宮", icon: "fa-torii-gate", content: { description: "離開八戶後，首先前往盛岡市，參拜當地最重要的信仰中心「盛岡八幡宮」。參道第一對狛犬為開口與閉口的阿摩樣式，模樣可愛；參道左側洗心亭下手水舍的水缽相當特殊，整座水缽是直接運用河中瀑布沖刷石塊自然形成的「滝壺」，是相當難得的「水堀石」水缽。", subsections: [
                { title: "💧 水占卜與「漂浮錢幣」測好運", description: "這是一個非常有名的體驗！在本殿附近有一個裝滿水的大甕，傳說中，如果您能把「1圓硬幣」輕輕放上去並成功讓它漂浮在水面上不沉到底，幸運就會降臨！很多人會在這邊小心翼翼地挑戰。" },
                { title: "🎣 釣魚詩籤（目出鯛おみくじ）", description: "想抽籤不用手抽，用釣的！只要投入香油錢，就可以拿著小釣竿，在籤池裡釣一隻自己看對眼的「紅鯛魚」或「金目鯛」。籤詩就藏在魚尾巴裡，如果抽到不好的籤，可以把籤綁在旁邊的架子上，把魚帶回家當幸運物。" }
            ], special: { summary: "⛩️ 展開更多參拜體驗（封厄葫蘆・十二生肖尋寶・特色御守）", content: "<div><h4 class='font-semibold text-slate-800'>🎃 封厄葫蘆（厄除けひょうたん）</h4><p class='text-sm text-slate-600 mt-1'>本殿旁掛滿了無數個葫蘆，非常壯觀。這是盛岡八幡宮象徵性的驅邪方式，可以將象徵自己身上厄運的氣息吹進葫蘆裡封印起來，然後掛在神社奉納，象徵把壞運氣通通留在那裡。</p></div><div><h4 class='font-semibold text-slate-800'>🐉「尋寶」十二生肖石板與料理之神「高倍神社」</h4><p class='text-sm text-slate-600 mt-1'>從大鳥居走進參道，石板路上刻有十二生肖的文字，大家可以邊走邊找自己的生肖。此外，參道旁還有 12 座小神社，分別供奉十二生肖的守護神，記得一定要去找到自己出生年份的神社參拜，感謝守護神。境內總共有 12 座附屬神社，其中有一座小巧的「高倍神社」，裡面隱藏著「料理之神」——因為這次旅行安排了自己去市場買海鮮回民宿下廚，很適合來這裡拜一下，祈求晚上的海鮮大餐大成功！</p></div><div><h4 class='font-semibold text-slate-800'>🕊️ 特色御守與御朱印</h4><p class='text-sm text-slate-600 mt-1'>人氣第一的「鳩守」：鴿子（鳩）被視為八幡神的使者，這裡有立體可愛的鴿子造型籤詩與御守，設計非常洗鍊，深受年輕人喜歡。如果有收集御朱印的習慣，這裡的西陣織御朱印帳非常精美，觸感極佳。</p></div>" } } },
            { time: "11:30", title: "ぴょんぴょん舎 稲荷町本店", icon: "fa-utensils", content: { description: "已預約 11:30、7 位。點比較高檔的「前澤牛」、「白金豚」燒肉真的是好吃到銷魂！建議每人各點一個套餐，再單點牛肉、豬肉各一份一起吃。" } },
            { time: "下午", title: "嚴美溪・體驗飛天糰子", icon: "fa-candy-cane", content: { description: "欣賞嚴美溪的溪谷風光，並體驗這裡最有趣的活動：將錢放入籃子中，敲響木板，對岸的店家就會用纜繩將熱騰騰的「郭公糰子」送到你手中！<br>💴 紅豆、芝麻、醬油各一種口味，共 15 個一盒，500円。" } },
            { time: "下午", title: "猊鼻溪遊船", icon: "fa-water", content: { description: "乘坐傳統的平底船，在船夫吟唱著「猊鼻追分」的歌聲中，悠閒地穿梭於高聳的石灰岩峭壁之間，享受寧靜而詩意的時光。<br>🎫 票價 1,800円，不用提早買（天氣不好不會開），每小時一個班次。<span class=\"text-red-600 font-semibold\">⚠️ 重點：</span>最晚 16:00 開船，搭船過程約 90 分鐘。最後會來到攬勝丘，船會停靠讓大家上岸走走，可以從這裡看到獅子鼻＆大猊鼻岩，島上還有很特別的投石祈福活動。" } },
            { time: "晚上", title: "晚餐：だし廊 -DASHIRO(總店)", icon: "fa-utensils", content: { description: "米其林推薦，2024、2025 百名店，招牌必點的飛魚高湯、貝類高湯最為出名。<br>📍 從入住的「仙台阿爾蒙特飯店」正門出來後，沿著「南町通」往西邊（一番町的方向）直走大約 200 公尺，看到「TK大樓 (TKビル)」的一樓就是了，步行只需約 3 分鐘。<br>🕐 營業時間 17:00-21:00，最後點餐 (L.O.) 20:30。" } },
            { time: "晚間", title: "仙台站小吃巡禮", icon: "fa-ice-cream", content: { description: "飯後可順道逛逛仙台站內的甜點名店。", special: { summary: "🍡 展開仙台站甜點名店清單", content: "<div><h4 class='font-semibold text-slate-800'>Zunda茶寮 仙台站小徑店 (3F)</h4><p class='text-sm text-slate-600 mt-1'>營業時間：10:00–20:30（咖啡廳約 10:00–18:30）。</p></div><div><h4 class='font-semibold text-slate-800'>喜久水庵Zunda茶屋（喜久水庵ずんだ茶屋）</h4><p class='text-sm text-slate-600 mt-1'>招牌毛豆泥霜淇淋。</p></div><div><h4 class='font-semibold text-slate-800'>土產處Sendai（おみやげ処せんだい）(2F)</h4><p class='text-sm text-slate-600 mt-1'>喜久水庵-毛豆奶昔夾心餅、萩之月-卡士達蛋糕、Kitkat×毛豆茶寮、伊達正夢-烤飯糰煎餅、Kotama-蛤蜊最中餅乾。</p></div>" } } },
            { time: "晚上", title: "入住仙台阿爾蒙特飯店", icon: "fa-city", content: { description: "結束岩手的行程後，驅車前往宮城縣的首府仙台市並辦理入住。<br>📍 JR仙台站西口 5 分鐘，記得西口走天橋出來，直走經過 LOFT；當你在天橋上看到松本清和 TSUTAYA 的路口，下去直走就會到飯店了。<br>♨️ 大浴場女生本設施 3 樓，營業時間晚 16:00～隔日 02:00／早 06:00～09:00。" } }
        ]
    },
    day5: {
        navInfo: { date: '9/12', day: '(週六)' },
        title: "日本三景・松島灣巡禮",
        themeImage: "images/松島遊船.webp",
        highlights: [
            { icon: "fa-sailboat", text: "松島灣遊船" },
            { icon: "fa-fish", text: "松島小吃・竹輪手作" },
            { icon: "fa-utensils", text: "仙台牛舌晚餐" }
        ],
        items: [
            { time: "09:00", title: "仙台朝市", icon: "fa-store", content: { description: "距離飯店走 3 分鐘即達，是仙台在地人的日常廚房。", special: { summary: "🐟 展開朝市推薦攤位", content: "<div><h4 class='font-semibold text-slate-800'>齋藤惣菜店 KOROKKEYA</h4><p class='text-sm text-slate-600 mt-1'>招牌馬鈴薯可樂餅。</p></div><div><h4 class='font-semibold text-slate-800'>しょう家</h4><p class='text-sm text-slate-600 mt-1'>朝定食是另一個主打項目，主食為烤鮭魚，附有白飯、味噌湯、納豆、漬物、生蛋、玉子燒，一份完整的日式定食只要 550円。</p></div><div><h4 class='font-semibold text-slate-800'>隱藏版拉麵店</h4><p class='text-sm text-slate-600 mt-1'>藤惣菜店旁的小路走進去，有一家貼滿凌亂的菜單、入口十分不起眼的拉麵店，值得挖寶。</p></div>" } } },
            { time: "10:09 - 10:48", title: "搭乘火車前往松島", icon: "fa-train", content: { description: "從仙台站搭乘 JR 仙石線前往松島海岸站，準備探訪名列「日本三景」之一的松島。JR仙台站搭乘 JR 仙石線，約 25-40 分鐘至「松島海岸站」下車，步行約 5-7 分鐘即可抵達碼頭，大概 20 分鐘才有一班車。", special: { summary: "🚆 查看班次時刻表", content: "10:09 → 10:48（39分鐘）JR仙石線到 松島海岸，月台：10番月台<br>10:29 → 11:08（39分鐘）JR仙石線到 高城町，月台：10番月台<br>10:49 → 11:28（39分鐘）JR仙石線到 石巻，月台：10番月台" } } },
            { time: "上午", title: "松島散策・福浦橋與小吃", icon: "fa-camera", content: { description: "抵達松島後先來一段悠閒的海灣散策：", subsections: [
                { title: "福浦橋", description: "俗稱「相遇橋」，是 311 大地震後台日友誼見證的美麗紅橋。" },
                { title: "福浦島", description: "過福浦橋（200円）進島，推薦走到「四阿」眺望松島灣，被天然綠葉框住的海景超療癒。" }
            ], special: { summary: "🍡 展開松島小吃地圖＆竹輪手作體驗", content: "<div><h4 class='font-semibold text-slate-800'>小吃時間</h4><p class='text-sm text-slate-600 mt-1'>Pensee松島店（牡蠣咖哩麵包，400円）、枝豆麻糬甜包（300円，一鹹一甜）；「松島布丁（松島ぷりん）」販售毛豆泥口味布丁；松島雪竹屋現烤醬油仙貝。</p></div><div><h4 class='font-semibold text-slate-800'>【松島蒲鉾本舖】竹輪手作體驗</h4><p class='text-sm text-slate-600 mt-1'>笹かま手烤體驗一支 220円，現場報名即可，從 JR 松島海岸站步行約 5 分鐘；附近的朱雀庵（すざくあん）就位於瑞巖寺與松島蒲鉾本舖之間。</p></div>" } } },
            { time: "中午", title: "五大堂・瑞嚴寺", icon: "fa-place-of-worship", content: { description: "碼頭旁的五大堂是必走景點，紅色「透橋」能考驗誠心。", subsections: [
                { title: "瑞嚴寺", description: "門票：大人 700円，參觀伊達政宗重建的壯麗「本堂」（國寶，內部有華麗的拉門畫「孔雀之間」，呈現金碧輝煌的桃山美術風格）、日本三大「庫裡」（廚房）、充滿歷史感的「洞窟遺跡群」（參道兩側的岩壁被鑿成許多小洞窟，曾是修行和安置供養碑的地方，非常獨特），以及收藏珍貴文物的「青龍殿（寶物館）」（展示伊達家族文物、茶具及本堂障壁畫真跡）。" }
            ], special: { summary: "📍 展開附近的圓通院（本次不排入）", content: "<p class='text-sm text-slate-600'>門票 500円，主打禪意庭園景色、手作念珠體驗及秋季紅葉點燈，這次行程暫不安排參觀。</p>" } } },
            { time: "下午", title: "松島灣遊船", icon: "fa-sailboat", content: { description: "松島灣環島觀光船共有兩間遊船公司，「搭船處」都在 Google Map 的「松島湾観光船発着場」，可導航到「松島海岸レストハウス」即購票處，旁邊往海延伸出去的位置就是搭船地點。<br>搭右邊的「松島環島觀光船企業組合」仁王丸コース（大型船），就是現場最右邊的窗口，也是最多人推薦的船班，船程 50 分鐘，路線全長約 17 公里，會經過松島灣必看的「金島」和「仁王島」，也可以看到「景島」、「船入島」。<br>🎫 從 9:00 最晚 16:00 開船，整點一班船，要提早 15 分鐘到（看最晚一班比較不熱）。購買 KKday「宮城仙台｜日本三大景松島遊船組合套票」可包含船票＋魚餅＋烤牡蠣。" } },
            { time: "下午", title: "仙台榴岡天滿宮", icon: "fa-cat", content: { description: "距離「仙台車站」走路只要 15 分鐘，搭乘 JR仙石線到「榴ヶ岡站」下車，1號出口出來只要走 4 分鐘。是供奉學問之神—菅原道真的神社，其木製鷽鳥神籤、金雕魚神籤，非常有特色。<br>🐾 <b>特色御守與貓咪系列：</b>推出超人氣的「櫻遊貓」御朱印帳、陽光下閃耀的透明貓咪御守，以及精緻的貓狗造型神籤和金雕魚神籤。" } },
            { time: "傍晚", title: "仙台商店街", icon: "fa-shopping-bag", content: { description: "<span class=\"text-red-600 font-semibold\">⚠️ 重點：</span>注意晚餐時間 21:00 結束，最晚 20:30 前進場。抵達仙台市地下鐵南北線「廣瀨通站」，出口請走「西1」或「西2」，一出站左手邊就是 Vlandome 一番町商店街的入口（有巨大拱頂天幕的那一段）。逛街路線由北向南，一路逛到餐廳：", subsections: [
                { title: "起點：Vlandome 一番町 (ぶらんど～む一番町)", description: "巨大拱頂天幕商店街入口。" },
                { title: "轉彎處：水晶之路 (Clis Road / クリスロード)", description: "走到 Vlandome 盡頭與中央通交界處左轉，進入這條寬敞的商店街。這裡有著名的三瀧山不動院（祈求生意興隆的貓咪神社，笑口常開的福神：仙台四郎）；鯛きちTaikichi 店裡基本上有三種口味，紅豆、奶油和枝豆（假日限定）；全日本製食品舖久世福商店店內賣的東西有乾貨、果乾、高湯包、醬料、醃漬物。" },
                { title: "名掛丁商店街 (ハピナ名掛丁)", description: "這裡以美食連鎖、咖啡館、藥妝店、日用品為主。" }
            ] } },
            { time: "18:45", title: "晚餐吃牛舌：閣 名掛丁店", icon: "fa-utensils", content: { description: "已經預約 18:45，營業時間 17:00-22:30（最後點餐時間 22:00）。必點トマトサラダ（特色番茄沙拉）、牛尾粥。", special: { summary: "🔄 展開候補餐廳名單", content: "<div><h4 class='font-semibold text-slate-800'>熟成とんかつ フライ家 (Frye)</h4><p class='text-sm text-slate-600 mt-1'>與「閣」距離走路 5 分鐘，營業 17:30-21:00，最後點餐 (L.O.) 20:30，可作候補選項。</p></div><div><h4 class='font-semibold text-slate-800'>其他候補</h4><p class='text-sm text-slate-600 mt-1'>藏之莊 一番町本店（有點貴）、八仙餃子、村上屋餅店。</p></div>" } } }
        ]
    },
    day6: {
        navInfo: { date: '9/13', day: '(週日)' },
        title: "最終祈願・告別東北",
        themeImage: "images/金蛇水神社.webp",
        highlights: [
            { icon: "fa-coins", text: "金蛇水神社撫蛇祈福" },
            { icon: "fa-suitcase-rolling", text: "AEON Mall 寄放行李" },
            { icon: "fa-plane-departure", text: "仙台機場伴手禮" }
        ],
        items: [
            { time: "早上", title: "飯店早餐", icon: "fa-mug-hot", content: { description: "享用飯店早餐，也可加購 1,980円 升級版早餐。" } },
            { time: "10:00 出發", title: "仙台出發・寄放行李於 Aeon Mall", icon: "fa-suitcase-rolling", content: { description: "10:00 出發，14:00 前要到機場。搭乘「仙台空港アクセス線」到杜關之下站（杜せきのした），與 Aeon Mall 直結，寄放行李後輕裝前往金蛇水神社。<br><span class=\"text-amber-600 font-semibold\">💡 小提醒：</span>自 2026年3月14日起，原有快速列車已取消並改為各站停車，因此目前已無快速車，全數皆為普通車，從 JR 仙台站搭乘電車約 18 分鐘即可到達（參考班次：10:10-10:26）。<br>🔒 置物櫃每次 100円（使用後退還硬幣，等同免費），利用時間 10:00-20:30（僅限當天，不可隔夜）。", special: { summary: "🔒 展開置物櫃詳細樓層位置", content: "<p class='text-sm text-slate-600'>1樓服務台附近即有免費櫃（100元會退錢的）：1樓（最方便，種類最全）大型置物櫃 1 處、特大置物櫃 1 處；2樓：大型置物櫃 1 處、特大置物櫃 2 處（這層樓數量最多）；3樓：大型置物櫃 1 處、特大置物櫃 1 處。</p>" } } },
            { time: "上午", title: "金蛇水神社", icon: "fa-fan", content: { description: "在前往機場前，參拜以祈求財運、事業運聞名的金蛇水神社。從 JR 仙台站搭乘「常磐線」或「東北本線」（往白石、福島或原之町方向），在「JR 岩沼站」下車（車程約 20 分鐘）；計程車（最推薦）：從岩沼站搭計程車約 10 分鐘即可抵達，單程費用約 1,500-2,000円。", subsections: [
                { title: "🐍 撫摸蛇紋石", description: "神社內擺放著許多天然浮現蛇型紋路的「蛇紋石」，傳說先用手摸石頭，再立刻摸自己的錢包，能大幅提升財運。<br><span class=\"text-red-600 font-semibold\">⚠️ 重點：</span>在投香油錢的時候，如果投入有孔洞的 5 円或 50 円硬幣，傳說蛇會從洞裡鑽過去，導致庇佑與福氣也跟著溜走，參拜時請務必留意喔！" },
                { title: "🌳 找尋白蛇神木", description: "神社內有一棵神木，樹洞形狀極像白蛇，被視為開運招福的象徵，一旁還有齡 300 年以上的「九龍之藤」。" },
                { title: "🍛 Sando Terrace 休息處", description: "神社旁有非常現代、漂亮的咖啡廳和賣店，推薦嘗試他們的「白蛇咖哩」或蛇型甜點。這裡的御守（尤其是蛇型設計）非常精緻，很適合當作旅程最後的紀念品。" }
            ] } },
            { time: "14:00 - 16:05", title: "前往仙台機場・搭機回程", icon: "fa-plane-departure", content: { description: "14:00 要到機場，二樓是仙台機場國際線及國內線的出發樓層，可在此享用最後一餐並採買伴手禮，隨後辦理登機手續，16:05 搭乘 BR117 班機返回台北桃園（18:55 抵達）。", subsections: [
                { title: "🍜 機場美食", description: "2樓「ずんだ茶寮」吃毛豆甜點、毛豆奶昔；2樓「だし廊-GoLD」吃高湯拉麵；「陣中」牛舌專賣店（1樓/2樓）、新鮮海鮮丼「Fisherman-tei」（2樓）。<br><span class=\"text-red-600 font-semibold\">⚠️ 重點：</span>絕大多數餐廳位於安檢前，建議先享用完畢再進入安檢。" }
            ], special: { summary: "🎁 展開完整伴手禮清單（經典＋機場限定）", content: "<div><h4 class='font-semibold text-slate-800'>經典仙台伴手禮（推薦先在 2 樓一般區域購買）</h4><p class='text-sm text-slate-600 mt-1'>萩之月 (萩の月)：鬆軟海綿蛋糕包著濃郁卡士達醬，經典必買。毛豆相關甜點：毛豆麻糬、毛豆奶昔（現場喝）、毛豆泥夾心餅乾。牛舌相關產品：雖不能帶肉類回台，但牛舌口味的洋芋片、餅乾、泡麵非常熱門。白松最中 (白松がモナカ)：傳統日式和菓子。伊達繪卷 (伊達絵巻)：包有紅豆餡或奶油的蛋糕卷。笹魚板 (笹かまぼこ)：仙台特色魚板，可購買真空包裝。</p></div><div><h4 class='font-semibold text-slate-800'>機場限定與精選特產</h4><p class='text-sm text-slate-600 mt-1'>伊達蛋 (伊達な玉子)：僅在機場買得到，類似蛋形的巧克力包裹蛋糕。Gotto (ゴット)：多層次口感的手工甜點。藏王奶油起司 (蔵王クリームチーズ)：濃郁好吃的乳製品。霜柱 (Shimobashira)：冬季限定的夢幻和菓子。</p></div>" } } }
        ]
    }
};
