const itineraryData = {
    day1: {
        navInfo: { date: '3/27', day: '(週五)' },
        title: "下町春色・櫻與古街的散策",
        themeImage: "images/Ueno_Park.webp",
        highlights: [
            { icon: "fa-tree", text: "六義園枝垂櫻" },
            { icon: "fa-store", text: "谷中銀座" },
            { icon: "fa-torii-gate", text: "根津神社" }
        ],
        items: [
            { time: "07:00 - 09:00", title: "抵達・輕裝上陣", icon: "fa-plane-arrival", content: { 
                description: "🛬 抵達東京成田機場後，搭乘便捷的 <strong>Skyliner 🚆</strong> 直達日暮里。建議先將大件行李寄放於車站置物櫃，解放雙手，輕鬆開始第一天的行程！"
            }},
            { time: "09:00 - 11:00", title: "駒込・名園的勝運祈願", icon: "fa-place-of-worship", content: {
                description: "走訪江戶時代的代表性庭園，並為旅程祈求好運。🌸",
                transport: "從 <strong>JR日暮里站</strong> 搭乘山手線至 <strong>駒込站</strong> (約 5 分鐘)。",
                subsections: [
                    { title: "⛩️ 妙義神社", description: "首先來到寧靜的妙義神社，為旅程祈求「勝運」，戰勝所有挑戰！" },
                    { title: "🌸 六義園", description: "漫步至名園<strong>六義園</strong>，欣賞巨大「枝垂櫻」如瀑布般盛開的壯觀景象。" }
                ]
            }},
            { time: "11:00 - 14:00", title: "谷根千・老街的慢活時光", icon: "fa-walking", content: {
                description: "鑽進充滿懷舊風情的「谷根千」地區，感受慢活步調與老街魅力。🚶‍♀️",
                transport: "從 <strong>JR駒込站</strong> 搭乘山手線至 <strong>日暮里站</strong>，由南口出站。",
                subsections: [
                    { title: "🌳 谷中靈園", description: "穿越櫻花大道，欣賞古樹與光影交織的靜謐風景。" },
                    { title: "🌇 夕陽階梯 & 谷中銀座", description: "在經典的<strong>夕陽階梯</strong>拍照後，於<strong>谷中銀座商店街</strong>享用午餐，品嚐炸肉餅、貓尾巴甜甜圈等排隊美食。🍩" }
                ]
            }},
            { time: "14:00 - 17:30", title: "根津與上野・鳥居與櫻花祭典", icon: "fa-torii-gate", content: {
                description: "穿梭於朱紅鳥居之間，再投入上野公園熱鬧的櫻花祭典。🎉",
                transport: "從根津神社搭乘計程車至上野公園約 5-10 分鐘 (車資約 1000 日圓)。",
                subsections: [
                    { title: "⛩️ 根津神社", description: "散步至<strong>根津神社</strong>，欣賞「乙女稻荷神社」彷彿京都縮影般的千本鳥居。" },
                    { title: "🌸 上野恩賜公園", description: "投入「上野櫻花祭」的熱鬧懷抱！感受被粉紅燈籠海包圍的幸福感，欣賞櫻花樹下的歡樂景象。" }
                ]
            }},
            { time: "17:30 - 21:30", title: "上野・不夜城的晚餐與購物", icon: "fa-shopping-bag", content: {
                description: "夜幕低垂，走進充滿活力的<strong>阿美橫丁</strong>，在熱鬧的叫賣聲中享用道地晚餐，並完成最後的購物任務！",
                transport: "上野公園周邊景點皆可步行抵達。",
                subsections: [
                    { title: "🍣 晚餐時間", description: "在阿美橫丁有各式各樣的露天居酒屋、燒肉、迴轉壽司可供選擇。" },
                    { title: "🛍️ 購物行程", description: "餐後前往 24 小時營業的<strong>唐吉訶德</strong>，一站式補齊所有藥妝、零食和伴手禮。" }
                ]
            }},
            { time: "21:30 - 22:00", title: "滿載而歸", icon: "fa-hotel", content: {
                description: "🌙 結束充實的一天，返回 <strong>JR 日暮里站</strong> 取回行李，準備前往飯店辦理入住手續，好好休息。"
            }}
        ]
    },
    day2: {
        navInfo: { date: '3/28', day: '(週六)' },
        title: "上野漫步・古韻與新空的交響",
        themeImage: "images/ueno-park-theme.webp",
        highlights: [
            { icon: "fa-tree", text: "上野公園" },
            { icon: "fa-building", text: "晴空塔" },
            { icon: "fa-drumstick-bite", text: "叙々苑" }
        ],
        items: [
            { time: "08:00 - 09:00", title: "晨間準備・享用早餐", icon: "fa-coffee", content: { description: "☀️ 享用早餐，為充滿文化與活力的一天做好準備！" } },
            { time: "09:00 - 09:30", title: "出發・前往上野公園", icon: "fa-train", content: { description: "從田端出發，迎接公園的綠意與文化氣息。", transport: "從 <strong>JR田端站</strong> 搭乘山手線或京濱東北線至 <strong>上野站</strong> (約 5-7 分鐘)。" } },
            { time: "09:30 - 13:30", title: "上野恩賜公園・深度探索", icon: "fa-tree", content: { 
                description: "您有充裕的4小時，可以好好探索這個巨大的城市綠洲。🌸",
                transport: "上野車站出站即達，此區域內各景點間建議步行探索。",
                subsections: [
                    { title: "🐼 Ueno Zoo (上野動物園) (建議停留 2.5-3小時)", description: "與可愛的動物們相見歡，特別是人氣明星熊貓！" },
                    { title: "🌳 公園散策 (建議停留 1-1.5小時)", description: "悠閒參觀金碧輝煌的<strong>上野東照宮</strong>，並在櫻花大道與<strong>不忍池</strong>畔享受春日風光。" }
                ]
            }},
            { time: "13:30 - 15:30", title: "阿美橫町・午餐與尋寶", icon: "fa-utensils", content: { description: "走進上野最熱鬧的露天市集！在這裡可以找到便宜的藥妝、零食，還有知名的<strong>二木菓子</strong>。午餐可以品嚐海鮮丼飯 🍣 等道地小吃，感受充滿叫賣聲的下町活力。🛍️", transport: "從上野公園步行即可抵達。" } },
            { time: "15:30 - 16:30", title: "轉場・前往晴空塔", icon: "fa-subway", content: { description: "從上野的古典氛圍，轉換場景至現代化的東京地標。🏙️", transport: "從 <strong>上野站</strong> 搭乘東京Metro銀座線至 <strong>淺草站</strong>，再轉乘東武晴空塔線至 <strong>東京晴空塔站</strong> (總耗時約 20-25 分鐘)。" } },
            { time: "16:30 - 19:30", title: "晴空塔・高空展望與都會漫遊", icon: "fa-building", content: {
                description: "登上東京地標，將壯麗的城市夜景盡收眼底。這個黃金時段更能同時欣賞日落與華燈初上的美景。✨ 在晴空塔底下，您有以下選擇：",
                transport: "晴空塔站出站即達，此區域內建議步行探索。",
                subsections: [
                    { 
                        title: "🐧 墨田水族館", 
                        description: "位於晴空塔內的都市型水族館，可以近距離觀賞企鵝和海狗。<br>票價：成人（18歲以上）¥2,500",
                        links: [
                            { icon: "fas fa-info-circle", text: "官方資訊", url: "https://www.sumida-aquarium.com/cn_han/index.html" }
                        ]
                    },
                    { title: "🛍️ 晴空街道 (Tokyo Solamachi)", description: "享受購物樂趣！這裡有超過300家店鋪，從動漫迷必逛的「<strong>寶可夢中心</strong> 👾」、「<strong>吉卜力共和國</strong> 🌳」，到伴手禮首選「<strong>東京芭娜娜</strong> 🍌」限定口味，應有盡有。" }
                ]
            }},
            { time: "19:30後", title: "晚餐・晴空下的燒肉饗宴", icon: "fa-drumstick-bite", content: {
                description: "在<strong>晴空街道</strong>商場30樓的<strong>叙々苑</strong>享用高級燒肉，同時從高空俯瞰東京的璀璨夜景，為完美的一天畫上句點。🌃",
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
        navInfo: { date: '3/29', day: '(週日)' },
        title: "台場漫遊・航向淺草和服體驗",
        themeImage: "images/tsukiji-odaiba-theme.webp",
        highlights: [
            { icon: "fa-robot", text: "台場" },
            { icon: "fa-ship", text: "水上巴士" },
            { icon: "fa-torii-gate", text: "淺草寺" }
        ],
        items: [
            { time: "08:00 - 09:00", title: "晨間準備・享用早餐", icon: "fa-coffee", content: { description: "☀️ 美好的一天從早餐開始！在住處悠閒地享用早餐 🥐，為今天的台場與淺草之旅做好準備。" } },
            { time: "09:00 - 10:00", title: "出發・前往未來港灣台場", icon: "fa-train-tram", content: { description: "🌉 搭上電車，經由彩虹大橋或地下隧道，向著充滿現代感的人工島前進！🏝️", transport: "從 <strong>JR田端站</strong> 搭乘山手線至「新橋站」，<br>再轉乘無人駕駛的 <strong>百合海鷗號 (Yurikamome) 🚝</strong> 至「台場海濱公園站」或「台場站」，享受窗外的海灣景色。" } },
            { time: "10:00 - 13:00", title: "台場巡禮・鋼彈與女神的競演", icon: "fa-robot", content: {
                description: "抵達台場後，你有充足的時間可以探索經典地標，並在商場內享用午餐。🏙️",
                transport: "此區域景點間距離較近，建議步行探索。",
                subsections: [
                    { title: "🗽 富士電視台 & 自由女神像", description: "與女神像及彩虹大橋合影 📸，感受東京灣的開闊，並可參觀<strong>富士電視台</strong>的球體展望室。" },
                    { title: "🤖 DiverCity 廣場 & 獨角獸鋼彈", description: "朝聖實物大的<strong>獨角獸鋼彈</strong>，感受其震撼力，並可逛逛商場內的鋼彈基地。" }
                ]
            }},
            { time: "13:00 - 13:30", title: "漫步碼頭・準備搭乘水上巴士", icon: "fa-ship", content: { description: "悠閒散步至 'お台場海浜公園' 碼頭 🚶‍♀️，準備搭乘水上巴士，從不同的視角欣賞東京。", transport: "從 DiverCity 廣場步行約 10-15 分鐘即可抵達台場海濱公園碼頭。" } },
            { time: "13:30 - 14:30", title: "隅田川遊船・航向淺草", icon: "fa-water", content: {
                description: "從台場碼頭搭乘水上巴士，沿著隅田川航向淺草，從水上欣賞東京的城市天際線與橋樑風光。🌉",
                links: [{ icon: "fas fa-ticket-alt", text: "KKday 預訂頁面", url: "https://www.kkday.com/zh-tw/product/28490" }],
                special: {
                    summary: "水上巴士參考班次 (請以官網為準)",
                    content: "此處時間為行程規劃參考，實際請務必依據官網公告的船班時間為準。<ul class='list-disc list-inside mt-2 pl-4 bg-gray-50 p-2 rounded'><li>快速 A1 班次：10:30出航~11:30抵達淺草</li><li>快速 A2 班次：14:15出航~15:15抵達淺草</li><li>快速 A3 班次：17:10出航~18:10抵達淺草</li></ul>"
                }
            }},
            { time: "15:00 - 15:30", title: "抵達淺草・變身和服美人", icon: "fa-user-tie", content: { description: "抵達淺草碼頭後，前往預約好的和服店，挑選喜愛的花色，由專人協助換裝，變身完成！✨", transport: "抵達淺草碼頭後，步行約 5-10 分鐘即可抵達和服店區域。" } },
            { time: "15:30 - 18:30", title: "和服漫步・穿梭淺草古街", icon: "fa-torii-gate", content: { description: "🏮 穿著美麗的和服，悠閒地參拜香火鼎盛的<strong>淺草寺</strong>、在掛著巨大燈籠的<strong>雷門</strong>前拍照留念 📸，並在熱鬧的<strong>仲見世商店街</strong>逛街、品嚐人形燒等特色小吃 🍡。", transport: "此區域景點密集，全程建議步行探索。" } },
            { time: "18:30 - 19:00", title: "歸還和服", icon: "fa-undo", content: { description: "✅ 回到和服店，換回現代服裝，結束美好的和服體驗。", transport: "步行返回和服店。" } },
            { time: "19:00 - 19:30", title: "夜訪淺草・步行前往餐廳", icon: "fa-walking", content: { description: "🌙 感受入夜後稍微靜謐的淺草，輕鬆散步至預定的晚餐地點。", transport: "步行即可抵達餐廳。" } },
            { time: "19:30後", title: "晚餐・極厚牛舌專門店", icon: "fa-drumstick-bite", content: { description: "前往<strong>牛たんの檸檬 浅草店</strong>，品嚐美味的厚切牛舌燒肉，為豐富的一天畫下完美句點。😋" } }
        ]
    },
    day4: {
        navInfo: { date: '3/30', day: '(週一)' },
        title: "箱根周遊・火山與湖光山色",
        themeImage: "images/hakone-theme.webp",
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
                    { 
                        title: "07:00-07:30 啟程前往箱根", 
                        description: "在新宿站購買「箱根周遊券」後，搭乘以下任一車種前往「<strong>箱根湯本站</strong>」。",
                        links: [
                            { icon: "fas fa-info-circle", text: "箱根周遊券", url: "https://www.hakonenavi.jp/international/tw/discount_passes/free_pass" },
                            { icon: "fas fa-train", text: "浪漫特快 🚆", url: "https://www.odakyu.jp/tc/romancecar/" },
                            { icon: "fas fa-train", text: "小田急電鐵", url: "https://www.odakyu.jp/tc/transport/" }
                        ]
                    }
                ]
            }},
            { time: "09:30 - 12:00", title: "大涌谷・地獄谷的呼吸", icon: "fa-mountain", content: { description: "♨️ 搭乘經典的箱根交通工具，一路攀升至白煙繚繞的火山谷<strong>大涌谷</strong> 🌋。在這裡可以遠眺富士山 🗻，並品嚐延年益壽的「黑玉子」溫泉蛋 ⚫。", transport: "1. 搭乘 <strong>箱根登山電車</strong> 至「強羅站」。<br>2. 轉乘 <strong>箱根登山纜車</strong> 至「早雲山站」。<br>3. 換乘 <strong>箱根空中纜車</strong> 🚠 前往「大涌谷站」。" } },
            { time: "12:00 - 13:30", title: "箱根海賊船・蘆之湖巡航", icon: "fa-ship", content: { description: "🏴‍☠️ 登上華麗的<strong>海賊船</strong> 🚢，在蘆之湖上航行，欣賞湖光山色與遠方的富士山景。巡航時間約 20-30 分鐘。", transport: "從「大涌谷站」繼續搭乘 <strong>箱根空中纜車</strong> 🚠 至「桃源台站」，在此處的「桃源台港」碼頭搭乘海賊船。" } },
            { time: "13:30 - 15:30", title: "元箱根港・湖畔午餐與鳥居", icon: "fa-utensils", content: { description: "抵達「元箱根港」後，您可以在湖畔的餐廳享用午餐 🍽️。餐後，步行至湖邊的停車場，尋找拍攝水上「平和的鳥居」的經典角度。若時間和體力允許，可再步行約20分鐘至<strong>箱根神社</strong>本殿參拜。⛩️", transport: "海賊船將會抵達「元箱根港」。此區域景點建議步行探索。" } },
            { time: "15:30 - 17:00", title: "箱根湯本・溫泉街散策", icon: "fa-store", content: { description: "回到箱根的門戶「<strong>箱根湯本</strong>」，在熱鬧的商店街上選購伴手禮、品嚐溫泉饅頭 🍡，為箱根之旅畫下句點。🎁", transport: "從「元箱根港」搭乘 <strong>箱根登山巴士 (H或K路線)</strong> 🚌 返回「箱根湯本站」。" } },
            { time: "17:00後", title: "滿載而歸・告別箱根", icon: "fa-train", content: { description: "從 <strong>箱根湯本站</strong> 搭乘 <strong>小田急浪漫特快</strong> 🚆 返回新宿，再轉乘JR山手線回到田端。" } }
        ]
    },
    day5: {
        navInfo: { date: '3/31', day: '(週二)' },
        title: "都會巡禮・阿佐谷、澀谷與新宿",
        themeImage: "images/shibuya-shinjuku-theme.webp",
        highlights: [
            { icon: "fa-om", text: "阿佐谷神明宮" },
            { icon: "fa-users", text: "澀谷" },
            { icon: "fa-moon", text: "新宿" }
        ],
        items: [
            { time: "08:00 - 09:00", title: "晨間準備・享用早餐", icon: "fa-coffee", content: { description: "☀️ 美好的一天從早餐開始！在出發前悠閒地享用早餐，為今天的旅程儲備滿滿的能量。" } },
            { time: "09:00 - 10:30", title: "阿佐谷神明宮・結緣參拜", icon: "fa-om", content: { description: "前往以獨特的刺繡御朱印「神結」聞名的<strong>阿佐谷神明宮</strong>，為這趟旅程祈求美好的緣分。⛩️", transport: "從 <strong>JR田端站</strong> 搭乘山手線至新宿，轉乘中央・總武線至 <strong>阿佐ヶ谷站</strong> (總耗時約 30-35 分鐘)。" } },
            { time: "10:30 - 13:00", title: "澀谷十字路口・潮流中心初探", icon: "fa-users", content: { description: "回到潮流的中心地帶！與忠犬八公像合影 🐕，並在全世界最繁忙的<strong>澀谷十字路口</strong>感受人潮脈動。之後在周邊的百貨或巷弄中尋找美食，享用午餐。🍜", transport: "從 <strong>阿佐ヶ谷站</strong> 搭乘中央・總武線至新宿，轉乘山手線至 <strong>澀谷站</strong> (總耗時約 25-30 分鐘)。" } },
            { time: "13:00 - 15:30", title: "午後靜謐・明治神宮或新宿御苑", icon: "fa-tree", content: {
                description: "從澀谷的喧囂中短暫抽離，選擇一個你喜歡的地方享受寧靜的午後。🏙️",
                transport: "從 <strong>澀谷站</strong> 搭乘JR山手線至 <strong>原宿站</strong> (明治神宮) 或 <strong>新宿站</strong> (新宿御苑)。",
                subsections: [
                    { 
                        title: "方案一：明治神宮 🌳", 
                        description: "參拜紀念明治天皇與昭憲皇太后的莊嚴神宮，漫步於都市中的廣闊森林，感受片刻的寧靜。", 
                        links: [{ icon: "fas fa-info-circle", text: "官網資訊", url: "https://www.meijijingu.or.jp/en/visit/" }] 
                    },
                    { 
                        title: "方案二：新宿御苑 🌸", 
                        description: "探訪融合日式、法式、英式風格的庭園。春天時是著名的賞櫻景點，平時也是都市中的一片綠洲。<br><strong>入場費：</strong> 一般 500日圓 (※可使用交通IC卡付款)", 
                        links: [{ icon: "fas fa-info-circle", text: "官網資訊", url: "https://www.env.go.jp/garden/shinjukugyoen/2_guide/guide.html" }] 
                    }
                ]
            }},
            { time: "15:30 - 17:30", title: "新宿東口・3D貓咪與花園神社", icon: "fa-cat", content: { description: "探訪新宿東口的熱鬧街區！抬頭尋找「Cross Shinjuku Vision」上逼真的巨大3D貓咪 🐈，再步行至隱身於鬧區中的<strong>花園神社</strong>，感受都會中難得的寧靜。⛩️", transport: "此區域景點間距離很近，建議步行探索。" } },
            { time: "17:30 - 19:00", title: "晚餐・極厚牛舌饗宴", icon: "fa-drumstick-bite", content: {
                description: "晚餐時間！從東口步行至西新宿，途中快速穿梭充滿昭和風情的<strong>思出橫丁</strong>，感受下班後居酒屋的熱鬧氣氛，接著前往<strong>新宿焼肉 牛たんの檸檬 総本店</strong>品嚐美味的牛舌定食！😋 (※注意：定食有用餐時間60分鐘限制)",
                transport: "步行前往餐廳。",
                links: [{ icon: "fas fa-calendar-check", text: "預約連結 (Google Map)", url: "https://maps.app.goo.gl/qPrSRGfzxqEkiCyj8" }]
            }},
            { time: "19:00 - 22:00", title: "新宿不夜城・黃金街的深夜探險", icon: "fa-moon", content: {
                description: "✨ 體驗新宿越夜越美麗的魅力！",
                transport: "「思出橫丁」、「歌舞伎町」、「黃金街」皆位於新宿車站周邊，步行即可輕鬆往返。",
                subsections: [
                    { title: "🏮 思出橫丁 (Omoide Yokocho)", description: "晚餐後重返此地，深入探索狹窄巷弄中的串燒店與居酒屋，感受濃厚的懷舊氛圍。" },
                    { title: "🌃 歌舞伎町 (Kabukicho)", description: "欣賞夜晚更加閃亮的3D貓咪、尋找藏在飯店上方的哥吉拉頭像 🦖，感受五光十色的街區活力。" },
                    { title: "🥃 新宿黃金街 (Golden Gai)", description: "最後鑽進由數百家微型酒吧組成的<strong>新宿黃金街</strong>，這裡保留了戰後東京的樣貌，是體驗在地夜生活的絕佳地點。" }
                ]
            }},
            { time: "22:00 - 22:30", title: "滿載而歸・返回住處", icon: "fa-train", content: { description: "結束充實的一天，準備返回住處。", transport: "從 <strong>JR新宿站</strong> 搭乘 <strong>山手線</strong> 返回 <strong>田端站</strong> (車程約 25 分鐘)。" } }
        ]
    },
    day6: {
        navInfo: { date: '4/1', day: '(週三)' },
        title: "經典巡禮・皇居與東京鐵塔",
        themeImage: "images/tokyo-tower-azabudai-theme.avif",
        highlights: [
            { icon: "fa-landmark", text: "皇居" },
            { icon: "fa-tower-broadcast", text: "東京鐵塔" },
            { icon: "fa-shopping-bag", text: "KITTE" }
        ],
        items: [
            { time: "08:00 - 09:00", title: "晨間準備・享用早餐", icon: "fa-coffee", content: { description: "☀️ 美好的一天從早餐開始！在住處悠閒地享用早餐 🥐，為今天的經典巡禮做好準備。" } },
            { time: "09:00 - 09:30", title: "出發・前往皇居區域", icon: "fa-train", content: { description: "準備好探索東京的心臟地帶！", transport: "從「田端」站搭乘 <strong>JR京濱東北線</strong> 或 <strong>JR山手線</strong> 🚆 前往「東京」站 (車程約 15-20 分鐘)。" } },
            { time: "09:30 - 11:30", title: "皇居東御苑・探訪江戶城跡", icon: "fa-landmark", content: { description: "免費參觀<strong>皇居東御苑</strong>的江戶城舊址、天守台遺跡 🏯，感受歷史的厚重。<br><strong>[注意]</strong>：每週一、週五固定休園 (若遇假日則順延)。", transport: "從東京車站「丸之內中央口」步行約 10-15 分鐘至「大手門」入口。" } },
            { time: "11:30 - 12:30", title: "千鳥淵公園・護城河畔散策", icon: "fa-leaf", content: { description: "春天時是東京最著名的賞櫻名所之一 🌸，沿著<strong>千鳥淵公園</strong>的護城河悠閒散步，享受寧靜時光。", transport: "從皇居東御苑「北桔橋門」離開，沿護城河往北散步約 15-20 分鐘至「千鳥淵綠道」。" } },
            { time: "12:30 - 14:00", title: "午餐 & 前往增上寺", icon: "fa-utensils", content: { description: "在「九段下」站附近享用午餐 🍜，補充體力後繼續下午的行程。", transport: "從「九段下」站搭乘 <strong>都營三田線</strong> 🚇 (往「日吉」或「白金高輪」方向) 至「御成門」站 (車程約 15 分鐘)。" } },
            { time: "14:00 - 14:30", title: "增上寺・鐵塔與古寺的合影", icon: "fa-landmark", content: { description: "參拜德川家的靈廟<strong>增上寺</strong>，並從寺廟廣場拍攝以古老寺廟為前景、現代<strong>東京鐵塔</strong>為背景的經典照片。📸", transport: "「御成門」站 B6 出口即達。" } },
            { time: "14:30 - 17:00", title: "東京鐵塔・登上經典地標", icon: "fa-tower-broadcast", content: { description: "登上東京的昭和時代象徵 🗼 <strong>東京鐵塔</strong>，建議登塔欣賞白天、日落至傍晚的景色。", transport: "從增上寺步行 10-15 分鐘即可抵達。" } },
            { time: "17:00 - 17:30", title: "前往東京車站", icon: "fa-train", content: { description: "準備前往晚餐地點，欣賞東京車站的夜景。", transport: "從東京鐵塔步行至 JR「浜松町」站，搭乘 <strong>JR京濱東北線</strong> 或 <strong>JR山手線</strong> (2 站，約 5 分鐘) 抵達「東京」站。" } },
            { time: "17:30 - 20:00", title: "KITTE丸之內・晚餐與車站夜景", icon: "fa-shopping-bag", content: { description: "在 <strong>KITTE</strong> 商場的 B1、5F、6F 餐廳享用晚餐。餐後務必至 6 樓「屋頂花園」，免費拍攝<strong>東京車站</strong>紅磚站房的經典夜景。🌃", transport: "東京車站「丸之內南口」出站即達。" } },
            { time: "20:00 - 22:30", title: "夜間自由探索 (三選一)", icon: "fa-moon", content: {
                description: "晚餐後的自由活動時間，可以根據您的喜好選擇一個地方繼續探索。✨",
                subsections: [
                    { title: "【選擇 1：秋葉原】(電器 / 玩具 / 動漫) 🎮", description: "目標是「<strong>Yodobashi Camera (ヨドバシAkiba)</strong>」(營業至 22:00)。<br><strong>交通：</strong>從東京車站搭乘 <strong>JR京濱東北線</strong> 或 <strong>JR山手線</strong> (2 站，約 4 分鐘) 抵達「秋葉原」站。<br><strong>返回田端：</strong>從「秋葉原」站搭乘 <strong>JR山手線</strong> (外回) 直達「田端」站 (約 10-12 分鐘)。" },
                    { title: "【選擇 2：銀座】(藥妝 / 零食 / 雜貨) 🛍️", description: "目標是「<strong>唐吉訶德 (Don Quijote) 銀座本館</strong>」(24 小時營業)。<br><strong>交通：</strong>從東京車站步行 15-20 分鐘，或搭地鐵丸之內線 1 站到「銀座」。<br><strong>返回田端：</strong>從銀座步行至 JR「有樂町」站，搭乘 <strong>JR山手線</strong> (內回) 直達「田端」站 (約 20 分鐘)。" },
                    { title: "【選擇 3：新宿】(感受氛圍 / 綜合) 🌃", description: "目標是新宿東口、<strong>歌舞伎町</strong>周邊、遊戲中心、<strong>唐吉訶德</strong> (24 小時)。<br><strong>交通：</strong>從東京車站搭乘 <strong>JR中央線快速</strong> (約 15 分鐘) 抵達「新宿」站。<br><strong>返回田端：</strong>從「新宿」站搭乘 <strong>JR山手線</strong> (外回) 直達「田端」站 (約 20-22 分鐘)。" }
                ]
            }}
        ]
    },
    day7: {
        navInfo: { date: '4/2', day: '(週四)' },
        title: "富士絕景・山中湖與忍野八海",
        themeImage: "images/kawaguchiko-fuji-theme.avif",
        highlights: [
            { icon: "fa-leaf", text: "大石公園" },
            { icon: "fa-water", text: "忍野八海" },
            { icon: "fa-mountain", text: "山中湖" }
        ],
        items: [
            { time: "07:00 - 07:30", title: "晨間準備・享用早餐", icon: "fa-coffee", content: { description: "☀️ 為了準時出發，今天得早點起床！迅速享用早餐，為富士山之旅做好準備。" } },
            { time: "07:30 - 09:30", title: "啟程出發・奔向富士山", icon: "fa-bus-alt", content: { description: "包車司機準時接送，我們從田端出發，沿高速公路直奔富士山區 🚗，準備迎接一整天的絕景！", transport: "由<strong>包車司機</strong>從田端接送，經由<strong>首都高速道路</strong>接上<strong>中央自動車道</strong>，一路開往河口湖。" } },
            { time: "09:30 - 10:15", title: "大石公園・湖畔花街道", icon: "fa-leaf", content: { description: "抵達<strong>大石公園</strong>，這裡是河口湖畔的絕佳觀景點 🏞️。沿著「花街道」散步，將富士山與湖景一次捕捉，並可逛逛一旁的自然生活館。", transport: "司機將載我們沿<strong>河口湖大橋</strong>至北岸的<strong>大石公園</strong>，此處設有停車場。" } },
            { time: "10:30 - 13:30", title: "音樂與森林博物館・童話庭園午餐", icon: "fa-music", content: { description: "走進宛如歐洲童話的<strong>音樂與森林博物館</strong> 🏰，欣賞世界級的自動音樂盒演奏。我們將在此悠閒漫步，並在園區的景觀餐廳享用午餐 🍽️。<br><strong>門票：</strong> 成人約 1,800 日圓 (依平假日浮動)。", transport: "從大石公園出發，由司機沿<strong>縣道21號（河口湖北岸道路）</strong>駕駛約 5 分鐘即可抵達。" } },
            { time: "13:45 - 14:45", title: "車站周邊・經典打卡點巡禮", icon: "fa-camera-retro", content: { 
                description: "來到河口湖車站周邊，這裡是拍攝經典照片與品嚐特色點心的好地方。",
                subsections: [
                    { title: "📸 羅森便利商店", description: "朝聖社群媒體上最火紅的打卡點，在<strong>羅森便利商店</strong>前可以拍下以富士山為背景的完美街景照。" },
                    { title: "🍞 富士山吐司 (Fujisan Shokupan)", description: "接著去排隊購買超可愛的藍白雙色「<strong>富士山吐司</strong>」，無論是自己享用或當伴手禮都很棒！" }
                ],
                transport: "由司機載我們返回河口湖車站周邊區域，車程約 10-15 分鐘。"
            } },
            { time: "15:15 - 16:30", title: "忍野八海・探訪名水湧泉", icon: "fa-water", content: { description: "探訪由富士山雪水融化後形成的八個清澈湧泉池 💧。在<strong>忍野八海</strong>欣賞水面倒影與傳統茅草屋構成的日式鄉村風情，還能嚐嚐這裡的名水豆腐和草餅。", transport: "從河口湖車站區域出發，行經<strong>國道138號</strong>，由司機駕駛約 15-20 分鐘即可抵達。" } },
            { time: "17:00 - 17:30", title: "平野之濱・靜賞逆富士", icon: "fa-image", content: { description: "來到山中湖畔的<strong>平野之濱</strong>，這裡是欣賞「逆富士」的著名景點。在寧靜的湖畔散步 🦢，享受夕陽餘暉灑落富士山的片刻浪漫。", transport: "離開忍野八海後，由司機繼續沿<strong>國道138號</strong>載我們前往山中湖，車程約 15 分鐘。" } },
            { time: "17:45 - 18:30", title: "山中湖全景台・日落最終章", icon: "fa-mountain", content: { description: "本日的完美終點！從遼闊的<strong>山中湖全景台</strong>俯瞰山中湖與雄偉的富士山 🤩，靜靜欣賞從傍晚到日落的壯麗景色。", transport: "由司機沿<strong>國道413號（山中湖畔道路）</strong>載我們開上山，路況較窄，約 15 分鐘即可抵達觀景台。" } },
            { time: "18:30後", title: "啟程返回東京", icon: "fa-bus-alt", content: { description: "帶著滿滿的美景與回憶，我們搭上包車，從山中湖交流道上高速公路，返回東京市區 🌃。", transport: "從山中湖IC上<strong>中央自動車道</strong>，由司機載我們返回東京市區。" } }
        ]
    },
    day8: {
        navInfo: { date: '4/3', day: '(週五)' },
        title: "文化或購物擇一",
        choices: [
            {
                title: "秋葉原・文化與次文化交錯",
                themeImage: "images/akihabara-theme.webp",
                highlights: [
                    { icon: "fa-torii-gate", text: "神田明神" },
                    { icon: "fa-robot", text: "動漫模型" },
                    { icon: "fa-gamepad", text: "電玩中心" }
                ],
                items: [
                    { time: "08:00 - 09:00", title: "晨間準備・享用早餐", icon: "fa-coffee", content: { description: "☀️ 美好的一天從早餐開始，為今天的秋葉原探索儲備能量！" } },
                    { time: "09:00 - 09:30", title: "出發・前往秋葉原", icon: "fa-train", content: { description: "搭上電車，向著充滿活力的電氣街前進！", transport: "從「田端」站搭乘 <strong>JR山手線</strong> (內回) 或 <strong>JR京濱東北線</strong> 前往「秋葉原」站 (車程約 10 分鐘)。" } },
                    { time: "09:30 - 10:30", title: "神田明神・動漫聖地巡禮", icon: "fa-torii-gate", content: { description: "參訪守護秋葉原的宏偉神社<strong>神田明神</strong>，這裡也是《Love Live!》等動漫的聖地。您可以在此尋找獨特的「IT 御守」。⛩️", transport: "從秋葉原站電氣街口步行約 10 分鐘。" } },
                    { time: "10:30 - 12:00", title: "電氣街核心・無線電會館探險", icon: "fa-building", content: { description: "走入秋葉原的中心，回到車站前的地標<strong>秋葉原無線電會館</strong>，在這棟「動漫高塔」中快速瀏覽琳瑯滿目的模型、公仔和卡牌。🤖", transport: "從神田明神步行返回電氣街區域約 10 分鐘。" } },
                    { time: "12:00 - 13:00", title: "午餐・AKIBA_ICHI美食街", icon: "fa-utensils", content: { description: "在車站旁的「<strong>秋葉原 UDX</strong>」大樓 2-3 樓的「AKIBA_ICHI」餐廳街用餐，這裡選擇多樣且環境舒適。🍱", transport: "從無線電會館步行約 3-5 分鐘。" } },
                    { time: "13:00 - 15:00", title: "午後漫步・從萬世橋到職人街", icon: "fa-bridge-water", content: { description: "下午來點不一樣的。先到舊萬世橋車站改建的<strong>mAAch ecute</strong>，在神田川畔享受片刻悠閒。接著探訪鐵軌下的<strong>2k540職人街</strong>，欣賞日本手作工藝品。🎨 (2k540週三公休)", transport: "此區域建議全程步行探索。" } },
                    { time: "15:00 - 17:00", title: "自由時間・動漫與電器挖寶", icon: "fa-gem", content: { description: "💎 這是您的主要購物時段，您可以依興趣選擇：<div class='mt-2'><strong>電器：</strong> 逛「<strong>友都八喜 (Yodobashi-Akiba)</strong>」。</div><div class='mt-1'><strong>動漫二手：</strong> 逛「<strong>Mandarake Complex</strong>」(整棟黑色的二手專賣店) 或「<strong>Super Potato</strong>」(傳奇復古遊戲店)。</div>", transport: "步行即可在各店家間移動。" } },
                    { time: "17:00 - 18:00", title: "娛樂時間・GiGO電玩中心", icon: "fa-gamepad", content: { description: "體驗日本的大型電玩中心 🎮，在 <strong>GiGO</strong> 玩玩夾娃娃機或最新的音樂遊戲，感受秋葉原的另一種活力。", transport: "步行即可抵達。" } },
                    { time: "18:00 - 19:30", title: "晚餐・秋葉原美食探索", icon: "fa-drumstick-bite", content: { description: "可在秋葉原周邊尋找美食，例如知名的拉麵或丼飯 (如「<strong>Roast Beef 大野</strong>」)。🥩", transport: "步行即可抵達。" } },
                    { time: "19:30 - 21:30", title: "夜景採買・感受不夜城魅力", icon: "fa-moon", content: { description: "晚餐後，在霓虹閃爍的<strong>中央通</strong>漫步，感受賽博龐克般的未來都市感。之後可前往 24 小時營業的<strong>唐吉訶德</strong>完成最後的採買任務。✨", transport: "步行即可抵達。" } },
                    { time: "21:30後", title: "滿載而歸・告別秋葉原", icon: "fa-train", content: { description: "結束充實的一天，準備返回住處。", transport: "從「秋葉原」站搭乘 <strong>JR京濱東北線</strong> 或 <strong>JR山手線</strong> 返回「田端」站。" } }
                ]
            },
            {
                title: "池袋・動漫聖地與都市夜遊",
                themeImage: "images/ikebukuro-theme.webp",
                highlights: [
                    { icon: "fa-fish", text: "太陽城水族館" },
                    { icon: "fa-heart", text: "Animate" },
                    { icon: "fa-utensils", text: "無敵家拉麵" }
                ],
                items: [
                    { time: "08:00 - 09:00", title: "晨間準備・享用早餐", icon: "fa-coffee", content: { description: "☀️ 起床梳洗，享用早餐，為池袋的動漫與都市探險日做好準備！" } },
                    { time: "09:00 - 09:30", title: "出發・前往池袋", icon: "fa-train", content: { description: "搭上電車，向著今天的目的地前進！", transport: "從「田端」站搭乘 <strong>JR山手線</strong> (外回) 🚆 前往「池袋」站 (車程約 10-12 分鐘)。" } },
                    { time: "09:30 - 12:00", title: "太陽城水族館・天空的企鵝", icon: "fa-fish", content: { description: "參觀位於<strong>太陽城</strong>頂樓的都市型水族館 🏙️，欣賞可愛的「天空的企鵝」在頭頂上的空中水槽游泳 🐧。", transport: "抵達池袋站後，由「東口」出站，沿著Green大通步行約 11 分鐘至「太陽城」。" } },
                    { time: "12:00 - 13:00", title: "午餐・太陽城美食探索", icon: "fa-utensils", content: { description: "在<strong>太陽城</strong>內的「ALPA 購物中心」餐廳街，或 Sunshine 60 大樓的景觀餐廳享用午餐 🍱。 (例如 3F 的「<strong>和幸豬排</strong>」)" } },
                    { time: "13:00 - 16:00", title: "Animate總店・乙女路的動漫巡禮", icon: "fa-heart", content: { description: "沉浸在動漫、漫畫與周邊商品的世界 📚，探索<strong>Animate 池袋總店</strong>和女性向的動漫二手店，這裡是粉絲們的天堂！💖", transport: "從太陽城步行至 Animate 池袋總店約 10 分鐘。" } },
                    { time: "16:00 - 18:00", title: "陽光60瞭望台・黃昏與夜景", icon: "fa-building", content: { description: "返回<strong>太陽城</strong>，登上 60 樓的「<strong>陽光60瞭望台 (TENBOU-PARK)</strong>」🌳，欣賞東京從黃昏到夜景的壯麗變化 🌇。<br><strong>[注意]</strong>：瞭望台通常開放至 20:00，建議提早前往。" } },
                    { time: "18:00 - 19:30", title: "晚餐・拉麵激戰區", icon: "fa-utensils", content: { description: "前往池袋東口的拉麵激戰區享用晚餐，例如大名鼎鼎的「<strong>無敵家拉麵</strong>」或「<strong>一蘭拉麵</strong>」🍜。" } },
                    { time: "19:30 - 21:30", title: "池袋夜生活・自由探索", icon: "fa-moon", content: {
                        description: "晚餐後的自由活動時間 🥳，可以根據您的喜好選擇一個地方繼續探索 ✨。",
                        subsections: [
                            { title: "【選擇 1：動漫娛樂】 🎮", description: "前往 <strong>GiGO 池袋</strong> (大型電玩中心，營業至 23:00) 玩夾娃娃機和最新遊戲。" },
                            { title: "【選擇 2：聲光藝術】 💡", description: "步行至 <strong>池袋西口公園</strong>，欣賞「GLOBAL RING」的夜間聲光秀。" },
                            { title: "【選擇 3：觀賞電影】 🎬", description: "參觀豪華的 <strong>Grand Cinema Sunshine</strong> (營業至 23:00)。" },
                            { title: "【選擇 4：購物血拼】 🛍️", description: "在車站附近的「<strong>唐吉訶德</strong>」、「<strong>Bic Camera</strong>」或「<strong>Parco 百貨</strong>」進行最後採買。" }
                        ]
                    }},
                    { time: "21:30後", title: "滿載而歸", icon: "fa-train", content: { description: "結束充實的一天，準備返回住處。", transport: "從「池袋」站搭乘 <strong>JR山手線</strong> (內回) 返回「田端」站。" } }
                ]
            }
        ]
    },
    day9: {
        navInfo: { date: '4/4', day: '(週六)' },
        title: "最終採購・滿載而歸",
        themeImage: "images/shopping-theme.webp",
        highlights: [
            { icon: "fa-gifts", text: "伴手禮採購" },
            { icon: "fa-utensils", text: "最後的午餐" },
            { icon: "fa-plane-departure", text: "前往機場" }
        ],
        items: [
            { time: "上午", title: "最終補貨・伴手禮採購", icon: "fa-gifts", content: { description: "享用早餐後，這是您查漏補缺的最後機會。可以去前一天沒逛夠的店家，或是前往大型連鎖雜貨店「<strong>驚安的殿堂・唐吉訶德</strong>」一次買齊藥妝、零食和各種有趣的伴手禮。🛍️ 🎁" } },
            { time: "13:00後", title: "告別的午餐・前往機場", icon: "fa-plane-departure", content: { description: "在市區享用在日本的最後一餐 🍱，之後返回住處整理行李，準備前往機場，結束愉快的旅程。", transport: "從市區搭乘 <strong>Skyliner</strong> 或 <strong>N'EX 成田特快</strong> 🚆 前往成田機場。" } }
        ]
    }
};