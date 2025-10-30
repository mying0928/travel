const itineraryData = {
    day1: {
        title: "抵達・熱鬧的上野初體驗",
        themeImage: "image/ueno-arrival-theme.webp",
        highlights: [
            { icon: "fa-plane-departure", text: "抵達機場" },
            { icon: "fa-train", text: "Skyliner" },
            { icon: "fa-utensils", text: "阿美橫丁" }
        ],
        items: [
            { time: "上午", title: "啟程・飛往成田機場", icon: "fa-plane-departure", content: { description: "✈️ 從高雄小港機場出發，搭機飛往東京成田機場，準備開啟期待已久的旅程！" } },
            { time: "下午", title: "入境・前往田端", icon: "fa-plane-arrival", content: { description: "🛬 辦理入境手續、領取行李後，前往市區下榻處。", transport: "建議搭乘 <strong>Skyliner 🚆</strong> 至日暮里站，再轉乘 <strong>JR山手線</strong> 僅一站即可抵達田端站辦理入住。" } },
            { time: "傍晚", title: "阿美橫丁・初探庶民活力", icon: "fa-utensils", content: { description: "🏮 安頓好行李後，前往充滿活力的阿美橫丁商店街。感受在地市場的熱鬧氣氛，並在此解決晚餐，品嚐各式各樣的B級美食 🍢。", transport: "從 <strong>JR田端站</strong> 搭乘山手線或京濱東北線至 <strong>上野站</strong> 或 <strong>御徒町站</strong> (約 5-7 分鐘)。" } }
        ]
    },
    day2: {
        title: "上野漫步・古韻與新空的交響",
        themeImage: "image/ueno-park-theme.jpg",
        highlights: [
            { icon: "fa-tree", text: "上野公園" },
            { icon: "fa-building", text: "晴空塔" },
            { icon: "fa-drumstick-bite", text: "叙々苑" }
        ],
        items: [
            { time: "08:00 - 09:00", title: "晨間準備・享用早餐", icon: "fa-coffee", content: { description: "☀️ 享用早餐，為充滿文化與活力的一天做好準備！" } },
            { time: "09:00 - 09:30", title: "出發・前往上野公園", icon: "fa-train", content: { description: "從田端出發，迎接公園的綠意與文化氣息。", transport: "從 <strong>JR田端站</strong> 搭乘山手線或京濱東北線至 <strong>上野站</strong> (約 5-7 分鐘)。" } },
            { time: "09:30 - 13:30", title: "上野恩賜公園・深度探索", icon: "fa-tree", content: { 
                description: "🌸 您有充裕的4小時，可以好好探索這個巨大的城市綠洲。",
                transport: "上野車站出站即達，此區域內各景點間建議步行探索。",
                subsections: [
                    { title: "🐼 Ueno Zoo (上野動物園) (建議停留 2.5-3小時)", description: "與可愛的動物們相見歡，特別是人氣明星熊貓！🐼" },
                    { title: "🌳 公園散策 (建議停留 1-1.5小時)", description: "悠閒參觀金碧輝煌的<strong>上野東照宮</strong>，並在櫻花大道與**不忍池**畔享受春日風光 🌸。" }
                ]
            }},
            { time: "13:30 - 15:30", title: "阿美橫町・午餐與尋寶", icon: "fa-utensils", content: { description: "🏮 走進上野最熱鬧的露天市集！在這裡可以找到便宜的藥妝、零食，還有知名的二木菓子。午餐可以品嚐海鮮丼飯 🍣 等道地小吃，感受充滿叫賣聲的下町活力 🛍️。", transport: "從上野公園步行即可抵達。" } },
            { time: "15:30 - 16:30", title: "轉場・前往晴空塔", icon: "fa-subway", content: { description: "從上野的古典氛圍，轉換場景至現代化的東京地標 🏙️。", transport: "從 <strong>上野站</strong> 搭乘東京Metro銀座線至 <strong>淺草站</strong>，再轉乘東武晴空塔線至 <strong>東京晴空塔站</strong> (總耗時約 20-25 分鐘)。" } },
            { time: "16:30 - 19:30", title: "晴空塔・高空展望與都會漫遊", icon: "fa-building", content: {
                description: "登上東京地標，將壯麗的城市夜景盡收眼底。這個黃金時段更能同時欣賞日落與華燈初上的美景 ✨。在晴空塔底下，您有以下選擇：",
                transport: "晴空塔站出站即達，此區域內建議步行探索。",
                subsections: [
                    { title: "墨田水族館 <a href='https://www.sumida-aquarium.com/cn_han/index.html' target='_blank' class='text-blue-500 hover:underline text-sm'>(官方資訊)</a>", description: "位於晴空塔內的都市型水族館，可以近距離觀賞企鵝和海狗 🐧。<br>票價：成人（18歲以上）¥2,500" },
                    { title: "晴空塔內購物", description: "在「東京晴空街道 (Tokyo Solamachi)」享受購物樂趣。這裡有超過300家店鋪，從動漫迷必逛的「寶可夢中心 👾」、「吉卜力共和國 🌳」，到伴手禮首選「東京芭娜娜 🍌」晴空塔限定口味，以及文具雜貨Loft等，應有盡有。" }
                ]
            }},
            { time: "19:30後", title: "晚餐・晴空下的燒肉饗宴", icon: "fa-drumstick-bite", content: {
                description: "🥩 在晴空街道商場30樓的**叙々苑**享用高級燒肉，同時從高空俯瞰東京的璀璨夜景 🌃，為完美的一天畫上句點。",
                transport: "位於晴空街道商場內，步行即可抵達。",
                links: [
                    { icon: "fas fa-globe", text: "官方網站", url: "https://www.jojoen.co.jp/shop/jojoen/soramachi/" },
                    { icon: "fas fa-calendar-check", text: "預約連結 (Tabelog)", url: "https://tabelog.com/tokyo/A1312/A131203/13141275/?cid=google_yoyaku" },
                    { icon: "fas fa-map-marker-alt", text: "Google Map", url: "https://maps.app.goo.gl/etcYuHWXHyzZph69A" }
                ]
            }}
        ]
    },
    day3: {
        title: "台場漫遊・航向淺草和服體驗",
        themeImage: "image/tsukiji-odaiba-theme.jpg",
        highlights: [
            { icon: "fa-robot", text: "台場" },
            { icon: "fa-ship", text: "水上巴士" },
            { icon: "fa-torii-gate", text: "淺草寺" }
        ],
        items: [
            { time: "08:00 - 09:00", title: "晨間準備・享用早餐", icon: "fa-coffee", content: { description: "☀️ 美好的一天從早餐開始！在住處悠閒地享用早餐 🥐，為今天的台場與淺草之旅做好準備。" } },
            { time: "09:00 - 10:00", title: "出發・前往未來港灣台場", icon: "fa-train-tram", content: { description: "🌉 搭上電車，經由彩虹大橋或地下隧道，向著充滿現代感的人工島前進 🏝️。", transport: "從 <strong>JR田端站</strong> 搭乘山手線至「新橋站」，<br>再轉乘無人駕駛的 <strong>百合海鷗號 (Yurikamome) 🚝</strong> 至「台場海濱公園站」或「台場站」，享受窗外的海灣景色。" } },
            { time: "10:00 - 13:00", title: "台場巡禮・鋼彈與女神的競演", icon: "fa-robot", content: {
                description: "🏙️ 抵達台場後，你有充足的時間可以探索經典地標，並在商場內享用午餐 🍽️。",
                transport: "此區域景點間距離較近，建議步行探索。",
                subsections: [
                    { title: "🗽 富士電視台 & 自由女神像 (建議停留 1.5小時)", description: "與女神像及彩虹大橋合影 📸，感受東京灣的開闊，並可參觀富士電視台的球體展望室。" },
                    { title: "🤖 DiverCity 廣場 & 獨角獸鋼彈 (建議停留 1.5小時)", description: "朝聖實物大的獨角獸鋼彈，感受其震撼力 🤖，並可逛逛商場內的鋼彈基地。" }
                ]
            }},
            { time: "13:00 - 13:30", title: "漫步碼頭・準備搭乘水上巴士", icon: "fa-ship", content: { description: "🚶‍♀️ 悠閒散步至 'お台場海浜公園' 碼頭，準備搭乘水上巴士，從不同的視角欣賞東京。", transport: "從 DiverCity 廣場步行約 10-15 分鐘即可抵達台場海濱公園碼頭。" } },
            { time: "13:30 - 14:30", title: "隅田川遊船・航向淺草", icon: "fa-water", content: {
                description: "🌇 從台場碼頭搭乘水上巴士，沿著隅田川航向淺草，從水上欣賞東京的城市天際線與橋樑風光 🌉。",
                links: [{ text: "KKday 預訂頁面", url: "https://www.kkday.com/zh-tw/product/28490" }],
                special: {
                    summary: "水上巴士參考班次 (請以官網為準)",
                    content: "此處時間為行程規劃參考，實際請務必依據官網公告的船班時間為準。<ul class='list-disc list-inside mt-2 pl-4 bg-gray-50 p-2 rounded'><li>快速 A1 班次：10:30出航~11:30抵達淺草</li><li>快速 A2 班次：14:15出航~15:15抵達淺草</li><li>快速 A3 班次：17:10出航~18:10抵達淺草</li></ul>"
                }
            }},
            { time: "15:00 - 15:30", title: "抵達淺草・變身和服美人", icon: "fa-user-tie", content: { description: "👘 抵達淺草碼頭後，前往預約好的和服店，挑選喜愛的花色，由專人協助換裝，變身完成 ✨！", transport: "抵達淺草碼頭後，步行約 5-10 分鐘即可抵達和服店區域。" } },
            { time: "15:30 - 18:30", title: "和服漫步・穿梭淺草古街", icon: "fa-torii-gate", content: { description: "🏮 穿著美麗的和服，悠閒地參拜香火鼎盛的<strong>淺草寺</strong>、在掛著巨大燈籠的<strong>雷門</strong>前拍照留念 📸，並在熱鬧的<strong>仲見世商店街</strong>逛街、品嚐人形燒等特色小吃 🍡。", transport: "此區域景點密集，全程建議步行探索。" } },
            { time: "18:30 - 19:00", title: "歸還和服", icon: "fa-undo", content: { description: "✅ 回到和服店，換回現代服裝，結束美好的和服體驗。", transport: "步行返回和服店。" } },
            { time: "19:00 - 19:30", title: "夜訪淺草・步行前往餐廳", icon: "fa-walking", content: { description: "🌙 感受入夜後稍微靜謐的淺草，輕鬆散步 🚶‍♂️ 至預定的晚餐地點。", transport: "步行即可抵達餐廳。" } },
            { time: "19:30後", title: "晚餐・極厚牛舌專門店", icon: "fa-drumstick-bite", content: { description: "🥩 前往**牛たんの檸檬 浅草店**，品嚐美味的厚切牛舌燒肉，為豐富的一天畫下完美句點 😋。" } }
        ]
    },
    day4: {
        title: "箱根周遊・火山與湖光山色",
        themeImage: "image/hakone-theme.webp",
        highlights: [
            { icon: "fa-mountain", text: "大涌谷" },
            { icon: "fa-ship", text: "海賊船" },
            { icon: "fa-torii-gate", text: "箱根神社" }
        ],
        items: [
            { time: "06:00 - 09:30", title: "清晨啟程・奔向箱根", icon: "fa-ticket-alt", content: { 
                description: "🌄 為了充分享受箱根的一天，我們需要早點出發！",
                subsections: [
                    { title: "06:30 前往新宿", description: "從 <strong>JR田端站</strong> 搭山手線至 <strong>新宿站</strong> (車程約 20 分鐘)。" },
                    { title: "07:00-07:30 啟程前往箱根", description: "在新宿站購買「<a href='https://www.hakonenavi.jp/international/tw/discount_passes/free_pass' target='_blank' class='text-blue-500 hover:underline'>箱根周遊券</a>」後，搭乘以下任一車種前往「箱根湯本站」。<ul class='list-disc list-inside mt-1 pl-4'><li><a href='https://www.odakyu.jp/tc/romancecar/' target='_blank' class='text-blue-500 hover:underline'>浪漫特快 🚆</a>：速度最快、最舒適，需另外加購特急券。</li><li><a href='https://www.odakyu.jp/tc/transport/' target='_blank' class='text-blue-500 hover:underline'>小田急電鐵</a>：較經濟實惠的選擇。</li></ul>" }
                ]
            }},
            { time: "09:30 - 12:00", title: "大涌谷・地獄谷的呼吸", icon: "fa-mountain", content: { description: "♨️ 搭乘經典的箱根交通工具，一路攀升至白煙繚繞的火山谷 🌋。在這裡可以遠眺富士山 🗻，並品嚐延年益壽的「黑玉子」溫泉蛋 ⚫。", transport: "1. 搭乘 <strong>箱根登山電車</strong> 至「強羅站」。<br>2. 轉乘 <strong>箱根登山纜車</strong> 至「早雲山站」。<br>3. 換乘 <strong>箱根空中纜車</strong> 🚠 前往「大涌谷站」。" } },
            { time: "12:00 - 13:30", title: "箱根海賊船・蘆之湖巡航", icon: "fa-ship", content: { description: "🏴‍☠️ 登上華麗的海賊船 🚢，在蘆之湖上航行，欣賞湖光山色與遠方的富士山景。巡航時間約 20-30 分鐘。", transport: "從「大涌谷站」繼續搭乘 <strong>箱根空中纜車</strong> 🚠 至「桃源台站」，在此處的「桃源台港」碼頭搭乘海賊船。" } },
            { time: "13:30 - 15:30", title: "元箱根港・湖畔午餐與鳥居", icon: "fa-utensils", content: { description: "⛩️ 抵達「元箱根港」後，您可以在湖畔的餐廳享用午餐 🍽️。餐後，步行至湖邊的停車場，尋找拍攝水上「平和的鳥居」的經典角度。若時間和體力允許，可再步行約20分鐘至**箱根神社**本殿參拜。", transport: "海賊船將會抵達「元箱根港」。此區域景點建議步行探索。" } },
            { time: "15:30 - 17:00", title: "箱根湯本・溫泉街散策", icon: "fa-store", content: { description: "🍡 回到箱根的門戶「箱根湯本」，在熱鬧的商店街上選購伴手禮、品嚐溫泉饅頭 🎁，為箱根之旅畫下句點。", transport: "從「元箱根港」搭乘 <strong>箱根登山巴士 (H或K路線)</strong> 🚌 返回「箱根湯本站」。" } },
            { time: "17:00後", title: "滿載而歸・告別箱根", icon: "fa-train", content: { description: "從 <strong>箱根湯本站</strong> 搭乘 <strong>小田急浪漫特快</strong> 🚆 返回新宿，再轉乘JR山手線回到田端。" } }
        ]
    },
    day5: {
        title: "都會巡禮・阿佐谷、澀谷與新宿",
        themeImage: "image/shibuya-shinjuku-theme.webp",
        highlights: [
            { icon: "fa-om", text: "阿佐谷神明宮" },
            { icon: "fa-users", text: "澀谷" },
            { icon: "fa-moon", text: "新宿" }
        ],
        items: [
            { time: "08:00 - 09:00", title: "晨間準備・享用早餐", icon: "fa-coffee", content: { description: "☀️ 美好的一天從早餐開始！在出發前悠閒地享用早餐，為今天的旅程儲備滿滿的能量。" } },
            { time: "09:00 - 10:30", title: "阿佐谷神明宮・結緣參拜", icon: "fa-om", content: { description: "⛩️ 前往以獨特的刺繡御朱印「神結」聞名的阿佐谷神明宮，為這趟旅程祈求美好的緣分。", transport: "從 <strong>JR田端站</strong> 搭乘山手線至新宿，轉乘中央・總武線至 <strong>阿佐ヶ谷站</strong> (總耗時約 30-35 分鐘)。" } },
            { time: "10:30 - 13:00", title: "澀谷十字路口・潮流中心初探", icon: "fa-users", content: { description: "🚶‍♂️ 回到潮流的中心地帶！與忠犬八公像合影 🐕，並在全世界最繁忙的澀谷十字路口感受人潮脈動。之後在周邊的百貨或巷弄中尋找美食，享用午餐 🍜。", transport: "從 <strong>阿佐ヶ谷站</strong> 搭乘中央・總武線至新宿，轉乘山手線至 <strong>澀谷站</strong> (總耗時約 25-30 分鐘)。" } },
            { time: "13:00 - 15:30", title: "午後靜謐・明治神宮或新宿御苑", icon: "fa-tree", content: {
                description: "🏙️ 從澀谷的喧囂中短暫抽離，選擇一個你喜歡的地方享受寧靜的午後。",
                transport: "從 <strong>澀谷站</strong> 搭乘JR山手線至 <strong>原宿站</strong> (明治神宮) 或 <strong>新宿站</strong> (新宿御苑)。",
                subsections: [
                    { title: "方案一：明治神宮 🌳", description: "參拜紀念明治天皇與昭憲皇太后的莊嚴神宮，漫步於都市中的廣闊森林，感受片刻的寧靜。", links: [{ text: "官網資訊", url: "https://www.meijijingu.or.jp/en/visit/" }] },
                    { title: "方案二：新宿御苑 🌸", description: "探訪融合日式、法式、英式風格的庭園。春天時是著名的賞櫻景點，平時也是都市中的一片綠洲。<br><strong>入場費：</strong> 一般 500日圓 (※可使用交通IC卡付款)", links: [{ text: "官網資訊", url: "https://www.env.go.jp/garden/shinjukugyoen/2_guide/guide.html" }] }
                ]
            }},
            { time: "15:30 - 17:30", title: "新宿東口・3D貓咪與花園神社", icon: "fa-cat", content: { description: "🐾 探訪新宿東口的熱鬧街區！抬頭尋找「Cross Shinjuku Vision」上逼真的巨大3D貓咪 🐈，再步行至隱身於鬧區中的「花園神社」⛩️，感受都會中難得的寧靜。", transport: "此區域景點間距離很近，建議步行探索。" } },
            { time: "17:30 - 19:00", title: "晚餐・極厚牛舌饗宴", icon: "fa-drumstick-bite", content: {
                description: "🥩 晚餐時間！從東口步行至西新宿，途中快速穿梭充滿昭和風情的「思出橫丁」，感受下班後居酒屋的熱鬧氣氛，接著前往「新宿焼肉 牛たんの檸檬 総本店」品嚐美味的牛舌定食！(※注意：定食有用餐時間60分鐘限制)",
                transport: "步行前往餐廳。",
                links: [{ text: "點我訂位", url: "https://maps.app.goo.gl/qPrSRGfzxqEkiCyj8" }]
            }},
            { time: "19:00 - 22:00", title: "新宿不夜城・黃金街的深夜探險", icon: "fa-moon", content: {
                description: "✨ 體驗新宿越夜越美麗的魅力！",
                transport: "「思出橫丁」、「歌舞伎町」、「黃金街」皆位於新宿車站周邊，步行即可輕鬆往返。",
                subsections: [
                    { title: "🏮 思出橫丁 (Omoide Yokocho)", description: "晚餐後重返此地，深入探索狹窄巷弄中的串燒店與居酒屋，感受濃厚的懷舊氛圍。" },
                    { title: "🌃 歌舞伎町 (Kabukicho)", description: "欣賞夜晚更加閃亮的3D貓咪、尋找藏在飯店上方的哥吉拉頭像 🦖，感受五光十色的街區活力。" },
                    { title: "🥃 新宿黃金街 (Golden Gai)", description: "最後鑽進由數百家微型酒吧組成的黃金街，這裡保留了戰後東京的樣貌，是體驗在地夜生活的絕佳地點。" }
                ]
            }},
            { time: "22:00 - 22:30", title: "滿載而歸・返回住處", icon: "fa-train", content: { description: "結束充實的一天，準備返回住處。", transport: "從 <strong>JR新宿站</strong> 搭乘 <strong>山手線</strong> 返回 <strong>田端站</strong> (車程約 25 分鐘)。" } }
        ]
    },
    day6: {
        title: "經典巡禮・皇居與東京鐵塔",
        themeImage: "image/tokyo-tower-azabudai-theme.avif",
        highlights: [
            { icon: "fa-landmark", text: "皇居" },
            { icon: "fa-tower-broadcast", text: "東京鐵塔" },
            { icon: "fa-shopping-bag", text: "KITTE" }
        ],
        items: [
            { time: "08:00 - 09:00", title: "晨間準備・享用早餐", icon: "fa-coffee", content: { description: "☀️ 美好的一天從早餐開始！在住處悠閒地享用早餐 🥐，為今天的經典巡禮做好準備。" } },
            { time: "09:00 - 09:30", title: "出發・前往皇居區域", icon: "fa-train", content: { description: "準備好探索東京的心臟地帶！", transport: "從「田端」站搭乘 <strong>JR京濱東北線</strong> 或 <strong>JR山手線</strong> 🚆 前往「東京」站 (車程約 15-20 分鐘)。" } },
            { time: "09:30 - 11:30", title: "皇居東御苑・探訪江戶城跡", icon: "fa-landmark", content: { description: "免費參觀江戶城舊址、天守台遺跡 🏯，感受歷史的厚重。<br><strong>[注意]</strong>：每週一、週五固定休園 (若遇假日則順延)。", transport: "從東京車站「丸之內中央口」步行約 10-15 分鐘至「大手門」入口。" } },
            { time: "11:30 - 12:30", title: "千鳥淵公園・護城河畔散策", icon: "fa-leaf", content: { description: "春天時是東京最著名的賞櫻名所之一 🌸，沿著護城河悠閒散步，享受寧靜時光。", transport: "從皇居東御苑「北桔橋門」離開，沿護城河往北散步約 15-20 分鐘至「千鳥淵綠道」。" } },
            { time: "12:30 - 14:00", title: "午餐 & 前往增上寺", icon: "fa-utensils", content: { description: "在「九段下」站附近享用午餐 🍜，補充體力後繼續下午的行程。", transport: "從「九段下」站搭乘 <strong>都營三田線</strong> 🚇 (往「日吉」或「白金高輪」方向) 至「御成門」站 (車程約 15 分鐘)。" } },
            { time: "14:00 - 14:30", title: "增上寺・鐵塔與古寺的合影", icon: "fa-landmark", content: { description: "參拜德川家的靈廟，並從寺廟廣場拍攝以古老寺廟為前景、現代東京鐵塔為背景的經典照片 📸。", transport: "「御成門」站 B6 出口即達。" } },
            { time: "14:30 - 17:00", title: "東京鐵塔・登上經典地標", icon: "fa-tower-broadcast", content: { description: "登上東京的昭和時代象徵 🗼，建議登塔欣賞白天、日落至傍晚的景色。", transport: "從增上寺步行 10-15 分鐘即可抵達。" } },
            { time: "17:00 - 17:30", title: "前往東京車站", icon: "fa-train", content: { description: "準備前往晚餐地點，欣賞東京車站的夜景。", transport: "從東京鐵塔步行至 JR「浜松町」站，搭乘 <strong>JR京濱東北線</strong> 或 <strong>JR山手線</strong> (2 站，約 5 分鐘) 抵達「東京」站。" } },
            { time: "17:30 - 20:00", title: "KITTE丸之內・晚餐與車站夜景", icon: "fa-shopping-bag", content: { description: "在 KITTE 商場的 B1、5F、6F 餐廳享用晚餐 🌃。餐後務必至 6 樓「屋頂花園」，免費拍攝東京車站紅磚站房的經典夜景。", transport: "東京車站「丸之內南口」出站即達。" } },
            { time: "20:00 - 22:30", title: "夜間自由探索 (三選一)", icon: "fa-moon", content: {
                description: "晚餐後的自由活動時間，可以根據您的喜好選擇一個地方繼續探索 ✨。",
                subsections: [
                    { title: "【選擇 1：秋葉原】(電器 / 玩具 / 動漫) 🎮", description: "目標是「Yodobashi Camera (ヨドバシAkiba)」(營業至 22:00)。<br><strong>交通：</strong>從東京車站搭乘 <strong>JR京濱東北線</strong> 或 <strong>JR山手線</strong> (2 站，約 4 分鐘) 抵達「秋葉原」站。<br><strong>返回田端：</strong>從「秋葉原」站搭乘 <strong>JR山手線</strong> (外回) 直達「田端」站 (約 10-12 分鐘)。" },
                    { title: "【選擇 2：銀座】(藥妝 / 零食 / 雜貨) 🛍️", description: "目標是「唐吉訶德 (Don Quijote) 銀座本館」(24 小時營業)。<br><strong>交通：</strong>從東京車站步行 15-20 分鐘，或搭地鐵丸之內線 1 站到「銀座」。<br><strong>返回田端：</strong>從銀座步行至 JR「有樂町」站，搭乘 <strong>JR山手線</strong> (內回) 直達「田端」站 (約 20 分鐘)。" },
                    { title: "【選擇 3：新宿】(感受氛圍 / 綜合) 🌃", description: "目標是新宿東口、歌舞伎町周邊、遊戲中心、唐吉訶德 (24 小時)。<br><strong>交通：</strong>從東京車站搭乘 <strong>JR中央線快速</strong> (約 15 分鐘) 抵達「新宿」站。<br><strong>返回田端：</strong>從「新宿」站搭乘 <strong>JR山手線</strong> (外回) 直達「田端」站 (約 20-22 分鐘)。" }
                ]
            }}
        ]
    },
    day7: {
        title: "富士絕景・河口湖的完美一日",
        themeImage: "image/kawaguchiko-fuji-theme.avif",
        highlights: [
            { icon: "fa-cable-car", text: "天上山公園" },
            { icon: "fa-ship", text: "河口湖遊覽船" },
            { icon: "fa-music", text: "音樂盒之森" }
        ],
        items: [
            { time: "06:00 - 09:30", title: "啟程・奔向富士山", icon: "fa-train", content: { description: "🗻 清晨從東京出發，搭上直達特急列車，窗外景色將從都市叢林逐漸轉變為壯麗山景。<ul class='list-disc list-inside mt-2 text-sm'><li><strong>06:20-07:00：</strong>從田端出發前往新宿。</li><li><strong>07:00-09:30：</strong>從 <strong>新宿站</strong> 搭乘 JR 特急「富士回遊」號 🚄 直達河口湖。</li></ul>" } },
            { time: "09:30 - 10:00", title: "抵達河口湖・購買周遊券", icon: "fa-map-signs", content: { description: "抵達後，先在車站購買「河口湖周遊巴士券」🚌。別忘了在車站前的羅森便利商店拍下與富士山的經典合照 📸！", transport: "車站出站後即可開始活動。" } },
            { time: "10:00 - 12:00", title: "天上山公園・纜車絕景", icon: "fa-cable-car", content: { description: "搭上纜車，攀升至能將富士山與河口湖全景盡收眼底的觀景台，感受令人屏息的壯闊美景 😍。", transport: "在車站前的 <strong>1號巴士站牌</strong> 搭乘 <strong>河口湖周遊巴士 (紅線)</strong> 🚌 至「No.11 遊覽船・山纜車入口」站 (約 15 分鐘)。" } },
            { time: "12:00 - 13:00", title: "河口湖遊覽船・湖上風光", icon: "fa-ship", content: { description: "從湖上欣賞富士山，感受不同角度的靜謐與美麗。遊覽船將帶您環湖，享受微風與開闊的視野 🛶。", transport: "從天上山公園纜車站步行下山即可抵達遊覽船碼頭。" } },
            { time: "13:00 - 14:30", title: "耍猴劇場・歡樂藝能秀", icon: "fa-theater-masks", content: { description: "🐵 欣賞日本傳統的猴子藝能表演，牠們的聰明才智絕對會讓您捧腹大笑 😂。", transport: "從「遊覽船・山纜車入口」站搭乘 <strong>紅線巴士</strong> 🚌 至「No.16 耍猴劇場・木之花美術館」站。" } },
            { time: "14:30 - 17:00", title: "河口湖音樂盒之森・悠閒午茶時光", icon: "fa-music", content: { description: "🎶 從耍猴劇場步行至隔壁，走進如同歐洲童話般的庭園。您有充裕的時間可以在此的景觀餐廳享用午餐或下午茶 ☕，並欣賞世界級的音樂盒收藏。", transport: "從耍猴劇場步行約 2 分鐘即可抵達。" } },
            { time: "17:00 - 17:30", title: "返回河口湖車站", icon: "fa-bus", content: { description: "準備告別富士山，返回東京。", transport: "從「音樂盒之森美術館」站搭乘 <strong>紅線巴士</strong> 🚌 返回「河口湖車站」。" } },
            { time: "17:30後", title: "歸途・告別富士", icon: "fa-train", content: { description: "帶著滿滿的美景與回憶，搭上返回東京的列車。", transport: "從河口湖車站搭乘 <strong>JR 特急「富士回遊」號</strong> 🚄 或<strong>高速巴士</strong>返回新宿。" } }
        ]
    },
    day8: [
        {
            title: "秋葉原・文化與次文化交錯",
            themeImage: "image/akihabara-theme.webp",
            highlights: [
                { icon: "fa-torii-gate", text: "神田明神" },
                { icon: "fa-robot", text: "動漫模型" },
                { icon: "fa-gamepad", text: "電玩中心" }
            ],
            items: [
                { time: "08:00 - 09:00", title: "晨間準備・享用早餐", icon: "fa-coffee", content: { description: "☀️ 美好的一天從早餐開始，為今天的秋葉原探索儲備能量！" } },
                { time: "09:00 - 09:30", title: "出發・前往秋葉原", icon: "fa-train", content: { description: "搭上電車，向著充滿活力的電氣街前進！", transport: "從「田端」站搭乘 <strong>JR山手線</strong> (內回) 或 <strong>JR京濱東北線</strong> 前往「秋葉原」站 (車程約 10 分鐘)。" } },
                { time: "09:30 - 10:30", title: "神田明神・動漫聖地巡禮", icon: "fa-torii-gate", content: { description: "⛩️ 參訪守護秋葉原的宏偉神社，這裡也是《Love Live!》等動漫的聖地。您可以在此尋找獨特的「IT 御守」。", transport: "從秋葉原站電氣街口步行約 10 分鐘。" } },
                { time: "10:30 - 12:00", title: "電氣街核心・無線電會館探險", icon: "fa-building", content: { description: "🤖 走入秋葉原的中心，回到車站前的地標<strong>秋葉原無線電會館</strong>，在這棟「動漫高塔」中快速瀏覽琳瑯滿目的模型、公仔和卡牌。", transport: "從神田明神步行返回電氣街區域約 10 分鐘。" } },
                { time: "12:00 - 13:00", title: "午餐・AKIBA_ICHI美食街", icon: "fa-utensils", content: { description: "🍱 在車站旁的「秋葉原 UDX」大樓 2-3 樓的「AKIBA_ICHI」餐廳街用餐，這裡選擇多樣且環境舒適。", transport: "從無線電會館步行約 3-5 分鐘。" } },
                { time: "13:00 - 15:00", title: "午後漫步・從萬世橋到職人街", icon: "fa-bridge-water", content: { description: "🎨 下午來點不一樣的。先到舊萬世橋車站改建的<strong>mAAch ecute</strong>，在神田川畔享受片刻悠閒。接著探訪鐵軌下的<strong>2k540職人街</strong>，欣賞日本手作工藝品。(2k540週三公休)", transport: "此區域建議全程步行探索。" } },
                { time: "15:00 - 17:00", title: "自由時間・動漫與電器挖寶", icon: "fa-gem", content: { description: "💎 這是您的主要購物時段，您可以依興趣選擇：<div class='mt-2'><strong>電器：</strong> 逛「友都八喜 (Yodobashi-Akiba)」。</div><div class='mt-1'><strong>動漫二手：</strong> 逛「Mandarake Complex」(整棟黑色的二手專賣店) 或「Super Potato」(傳奇復古遊戲店)。</div>", transport: "步行即可在各店家間移動。" } },
                { time: "17:00 - 18:00", title: "娛樂時間・GiGO電玩中心", icon: "fa-gamepad", content: { description: "🎮 體驗日本的大型電玩中心，玩玩夾娃娃機或最新的音樂遊戲，感受秋葉原的另一種活力。", transport: "步行即可抵達。" } },
                { time: "18:00 - 19:30", title: "晚餐・秋葉原美食探索", icon: "fa-drumstick-bite", content: { description: "🥩 可在秋葉原周邊尋找美食，例如知名的拉麵或丼飯 (如「Roast Beef 大野」)。", transport: "步行即可抵達。" } },
                { time: "19:30 - 21:30", title: "夜景採買・感受不夜城魅力", icon: "fa-moon", content: { description: "✨ 晚餐後，在霓虹閃爍的<strong>中央通</strong>漫步，感受賽博龐克般的未來都市感。之後可前往 24 小時營業的<strong>唐吉訶德</strong>完成最後的採買任務。", transport: "步行即可抵達。" } },
                { time: "21:30後", title: "滿載而歸・告別秋葉原", icon: "fa-train", content: { description: "結束充實的一天，準備返回住處。", transport: "從「秋葉原」站搭乘 <strong>JR京濱東北線</strong> 或 <strong>JR山手線</strong> 返回「田端」站。" } }
            ]
        },
        {
            title: "池袋・動漫聖地與都市夜遊",
            themeImage: "image/ikebukuro-theme.webp",
            highlights: [
                { icon: "fa-fish", text: "太陽城水族館" },
                { icon: "fa-heart", text: "Animate" },
                { icon: "fa-utensils", text: "無敵家拉麵" }
            ],
            items: [
                { time: "08:00 - 09:00", title: "晨間準備・享用早餐", icon: "fa-coffee", content: { description: "☀️ 起床梳洗，享用早餐，為池袋的動漫與都市探險日做好準備！" } },
                { time: "09:00 - 09:30", title: "出發・前往池袋", icon: "fa-train", content: { description: "搭上電車，向著今天的目的地前進！", transport: "從「田端」站搭乘 <strong>JR山手線</strong> (外回) 🚆 前往「池袋」站 (車程約 10-12 分鐘)。" } },
                { time: "09:30 - 12:00", title: "太陽城水族館・天空的企鵝", icon: "fa-fish", content: { description: "參觀位於太陽城頂樓的都市型水族館 🏙️，欣賞可愛的「天空的企鵝」在頭頂上的空中水槽游泳 🐧。", transport: "抵達池袋站後，由「東口」出站，沿著Green大通步行約 11 分鐘至「太陽城」。" } },
                { time: "12:00 - 13:00", title: "午餐・太陽城美食探索", icon: "fa-utensils", content: { description: "在太陽城內的「ALPA 購物中心」餐廳街，或 Sunshine 60 大樓的景觀餐廳享用午餐 🍱。 (例如 3F 的「和幸豬排」)" } },
                { time: "13:00 - 16:00", title: "Animate總店・乙女路的動漫巡禮", icon: "fa-heart", content: { description: "沉浸在動漫、漫畫與周邊商品的世界 📚，探索女性向的動漫二手店，這裡是粉絲們的天堂 💖。", transport: "從太陽城步行至 Animate 池袋總店約 10 分鐘。" } },
                { time: "16:00 - 18:00", title: "陽光60瞭望台・黃昏與夜景", icon: "fa-building", content: { description: "返回太陽城，登上 60 樓的「陽光60瞭望台 (TENBOU-PARK)」🌳，欣賞東京從黃昏到夜景的壯麗變化 🌇。<br><strong>[注意]</strong>：瞭望台通常開放至 20:00，建議提早前往。" } },
                { time: "18:00 - 19:30", title: "晚餐・拉麵激戰區", icon: "fa-utensils", content: { description: "前往池袋東口的拉麵激戰區享用晚餐，例如大名鼎鼎的「無敵家拉麵」或「一蘭拉麵」🍜。" } },
                { time: "19:30 - 21:30", title: "池袋夜生活・自由探索", icon: "fa-moon", content: {
                    description: "晚餐後的自由活動時間 🥳，可以根據您的喜好選擇一個地方繼續探索 ✨。",
                    subsections: [
                        { title: "【選擇 1：動漫娛樂】 🎮", description: "前往 <strong>GiGO 池袋</strong> (大型電玩中心，營業至 23:00) 玩夾娃娃機和最新遊戲。" },
                        { title: "【選擇 2：聲光藝術】 💡", description: "步行至 <strong>池袋西口公園</strong>，欣賞「GLOBAL RING」的夜間聲光秀。" },
                        { title: "【選擇 3：觀賞電影】 🎬", description: "參觀豪華的 <strong>Grand Cinema Sunshine</strong> (營業至 23:00)。" },
                        { title: "【選擇 4：購物血拼】 🛍️", description: "在車站附近的「唐吉訶德」、「Bic Camera」或「Parco 百貨」進行最後採買。" }
                    ]
                }},
                { time: "21:30後", title: "滿載而歸", icon: "fa-train", content: { description: "結束充實的一天，準備返回住處。", transport: "從「池袋」站搭乘 <strong>JR山手線</strong> (內回) 返回「田端」站。" } }
            ]
        }
    ],
    day9: {
        title: "最終採購・滿載而歸",
        themeImage: "image/shopping-theme.webp",
        highlights: [
            { icon: "fa-gifts", text: "伴手禮採購" },
            { icon: "fa-utensils", text: "最後的午餐" },
            { icon: "fa-plane-departure", text: "前往機場" }
        ],
        items: [
            { time: "上午", title: "最終補貨・伴手禮採購", icon: "fa-gifts", content: { description: "🛍️ 享用早餐後，這是您查漏補缺的最後機會。可以去前一天沒逛夠的店家，或是前往大型連鎖雜貨店「驚安的殿堂・唐吉訶德」一次買齊藥妝、零食和各種有趣的伴手禮 🎁。" } },
            { time: "13:00後", title: "告別的午餐・前往機場", icon: "fa-plane-departure", content: { description: "在市區享用在日本的最後一餐 🍱，之後返回住處整理行李，準備前往機場，結束愉快的旅程。", transport: "從市區搭乘 <strong>Skyliner</strong> 或 <strong>N'EX 成田特快</strong> 🚆 前往成田機場。" } }
        ]
    }
};
