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
        items: [{
            time: "07:00 - 09:00",
            title: "抵達・輕裝上陣",
            icon: "fa-plane-arrival",
            content: {
                description: "🛬 抵達東京成田機場後，搭乘最快速的 <b>Skyliner 🚆</b> 直達日暮里，感受風馳電掣！<br>⭐ <b>達人秘訣：</b> 建議先將大件行李寄放於車站置物櫃 (Coin Locker)，它們通常在車站的顯眼位置或跟隨指示牌都能找到，讓您解放雙手，輕鬆開始第一天的旅程！"
            }
        }, {
            time: "09:00 - 11:00",
            title: "駒込・名園的勝運祈願",
            icon: "fa-place-of-worship",
            content: {
                description: "走訪江戶時代的代表性「大名庭園」，在櫻花盛開之際，為接下來的旅程祈求好運。🌸",
                transport: "從 <strong>JR日暮里站</strong> 搭乘山手線至 <strong>駒込站</strong> (約 5 分鐘)。",
                subsections: [{
                    title: "⛩️ 妙義神社",
                    description: "首先來到寧靜的<b>妙義神社</b>，這裡以「勝運」聞名，為您的旅程祈求一個完美的開端，戰勝所有挑戰！"
                }, {
                    title: "🌸 六義園",
                    description: "漫步至迴遊式山泉水庭園<b>六義園</b>，欣賞園內最著名的巨大「垂枝櫻」，其花朵如粉色瀑布般盛開。🌸<br>⭐<b>賞花重點</b>：除了主角垂枝櫻，您還可以尋找鮮黃色的<b>山吹</b>🌼、純白如雪的<b>雪柳</b>，以及一些晚開的<b>山茶花</b>🌺。"
                }]
            }
        }, {
            time: "11:00 - 14:00",
            title: "谷根千・老街的慢活時光",
            icon: "fa-person-walking",
            content: {
                description: "鑽進由「谷中、根津、千駄木」組成的「谷根千」地區，感受東京難得的懷舊風情與貓咪出沒的悠閒步調。🚶‍♀️🐈",
                transport: "從 <strong>JR駒込站</strong> 搭乘山手線至 <strong>日暮里站</strong>，由南口出站。",
                subsections: [{
                    title: "🌳 谷中靈園",
                    description: "穿越幽靜的<b>櫻花大道</b>，這裡少了觀光客的喧囂，更能欣賞古樹與光影交織的靜謐風景。"
                }, {
                    title: "🌇 夕陽階梯 & 谷中銀座",
                    description: "在經典的<b>夕陽階梯</b>打卡拍照，並於<b>谷中銀座商店街</b>享用午餐。<br>⭐ <b>達人秘訣：</b> 必吃的美食包括「肉のすずき」的<b>元氣炸肉餅</b>與「やなかしっぽや」的<b>貓尾巴造型甜甜圈</b>，是體驗下町滋味的絕佳選擇！🍩"
                }]
            }
        }, {
            time: "14:00 - 17:30",
            title: "根津與上野・鳥居與櫻花祭典",
            icon: "fa-torii-gate",
            content: {
                description: "體驗一場傳統與現代的視覺饗宴，從靜謐的朱紅鳥居長廊，瞬間轉場至人聲鼎沸的櫻花祭典。🎉",
                transport: "從根津神社搭乘計程車至上野公園約 5-10 分鐘 (車資約 1000 日圓)。",
                subsections: [{
                    title: "⛩️ 根津神社",
                    description: "散步至<b>根津神社</b>，欣賞其境內「乙女稻荷神社」彷彿京都伏見稻荷大社縮影般的千本鳥居。⛩️<br>⭐<b>賞花重點</b>：神社內會有櫻花點綴，而聞名遐邇的杜鵑花海則需等到四月。此刻您或能看到含苞或初開的<b>杜鵑花</b>，為古老神社增添一抹春色。"
                }, {
                    title: "🌸 上野恩賜公園",
                    description: "投入「上野櫻花祭」的熱鬧懷抱！感受被粉紅燈籠海包圍的幸福感，欣賞櫻花樹下的人潮與歡樂景象。<br>⭐ <b>達人秘訣：</b> 傍晚時分，燈籠亮起後的「夜櫻」景觀更具魅力，氛圍截然不同，千萬別錯過！"
                }]
            }
        }, {
            time: "17:30 - 21:30",
            title: "上野・不夜城的晚餐與購物",
            icon: "fa-shopping-bag",
            content: {
                description: "夜幕低垂，走進充滿活力的<b>阿美橫丁</b>！在混雜著藥妝、零食、海產的喧鬧叫賣聲中，感受最道地的下町生活感，並在此享用晚餐、完成購物任務！",
                transport: "上野公園周邊景點皆可步行抵達。",
                subsections: [{
                    title: "🍣 晚餐時間",
                    description: "阿美橫丁充滿了各種美食選擇，從便宜大碗的<b>海鮮丼</b>、熱鬧的<b>露天居酒屋</b>，到立食燒肉、迴轉壽司，應有盡有。"
                }, {
                    title: "🛍️ 購物行程",
                    description: "餐後前往 24 小時營業的「驚安殿堂」<b>唐吉訶德</b>，這裡商品五花八門，是您一站式補齊所有藥妝、零食和伴手禮的最終站。"
                }]
            }
        }, {
            time: "21:30 - 22:00",
            title: "滿載而歸",
            icon: "fa-hotel",
            content: {
                description: "🌙 結束充實的一天，返回 <strong>JR 日暮里站</strong> 取回行李，準備前往飯店辦理入住手續，好好休息。"
            }
        }]
    },
    day2: {
        navInfo: { date: '3/28', day: '(週六)' },
        title: "上野漫步・古韻與新空的交響",
        themeImage: "images/ueno-park-theme.webp",
        highlights: [
            { icon: "fa-tree", text: "上野公園" },
            { icon: "fa-building-columns", text: "美術館巡禮" },
            { icon: "fa-tower-observation", text: "晴空塔" }
        ],
        items: [{
            time: "08:00 - 09:00",
            title: "晨間準備・享用早餐",
            icon: "fa-coffee",
            content: {
                description: "☀️ 享用豐盛早餐，為充滿文化與活力的一天做好準備！"
            }
        }, {
            time: "09:00 - 09:30",
            title: "出發・前往上野公園",
            icon: "fa-train",
            content: {
                description: "從田端出發，搭上電車，迎接公園的綠意與文化氣息。",
                transport: "從 <strong>JR田端站</strong> 搭乘山手線或京濱東北線至 <strong>上野站</strong> (約 5-7 分鐘)。"
            }
        }, {
            time: "09:30 - 13:30",
            title: "上野恩賜公園・深度探索",
            icon: "fa-paw",
            content: {
                description: "您有充裕的4小時，可以好好探索這個巨大的城市綠洲。🌸",
                transport: "上野車站出站即達，此區域內各景點間建議步行探索。",
                subsections: [{
                    title: "🐼 上野動物園",
                    description: "與可愛的動物們相見歡！<br>⭐ <b>達人秘訣：</b> 人氣明星<b>熊貓</b>的場館總是大排長龍，建議一開園就先去探望牠們，以避開人潮。(建議停留 2.5-3小時)"
                }, {
                    title: "🌳 公園散策",
                    description: "悠閒參觀金碧輝煌的<b>上野東照宮</b>，並在<b>櫻花大道</b>與<b>不忍池</b>畔享受春日風光。🦢<br>⭐<b>賞花重點</b>：東照宮的「春之牡丹祭」約在四月上旬開始，您或許有幸能見到初開的華麗<b>牡丹</b>🌺！"
                }]
            }
        }, {
            time: "13:30 - 15:30",
            title: "阿美橫町・午餐與尋寶",
            icon: "fa-utensils",
            content: {
                description: "再次走進上野最熱鬧的露天市集！在這裡可以找到便宜的藥妝、零食，還有知名的<b>二木菓子</b>。午餐推薦品嚐物美價廉的<b>海鮮丼飯</b> 🍣，感受充滿叫賣聲的下町活力。🛍️",
                transport: "從上野公園步行即可抵達。"
            }
        }, {
            time: "15:30 - 16:30",
            title: "轉場・前往晴空塔",
            icon: "fa-subway",
            content: {
                description: "從上野的古典氛圍，轉換場景至現代化的東京新地標。🏙️",
                transport: "從 <strong>上野站</strong> 搭乘東京Metro銀座線至 <strong>淺草站</strong>，再轉乘東武晴空塔線至 <strong>東京晴空塔站</strong> (總耗時約 20-25 分鐘)。"
            }
        }, {
            time: "16:30 - 19:30",
            title: "晴空塔・高空展望與都會漫遊",
            icon: "fa-tower-observation",
            content: {
                description: "登上東京地標，將壯麗的城市景色盡收眼底。<br>⭐ <b>達人秘訣：</b> 這個黃金時段能同時欣賞日落與華燈初上的美景，強烈建議事前於網路購票，可節省大量排隊時間。✨",
                transport: "晴空塔站出站即達，此區域內建議步行探索。",
                subsections: [{
                    title: "🐧 墨田水族館",
                    description: "位於晴空塔5-6樓的都市型水族館，以開放式的室內水槽聞名，可以近距離觀賞可愛的<b>企鵝</b>和<b>海狗</b>。<br>票價：成人（18歲以上）¥2,500",
                    links: [{
                        icon: "fas fa-info-circle",
                        text: "官方資訊",
                        url: "https://www.sumida-aquarium.com/cn_han/index.html"
                    }]
                }, {
                    title: "🛍️ 晴空街道 (Tokyo Solamachi)",
                    description: "享受購物樂趣！這裡有超過300家店鋪，從動漫迷必逛的「<b>寶可夢中心</b> 👾」、「<b>吉卜力共和國</b> 🌳」，到伴手禮首選「<b>東京芭娜娜</b> 🍌」限定口味，應有盡有。"
                }]
            }
        }, {
            time: "19:30後",
            title: "晚餐・晴空下的燒肉饗宴",
            icon: "fa-drumstick-bite",
            content: {
                description: "在<b>晴空街道</b>商場30樓的<b>叙々苑</b>享用一頓犒賞自己的高級燒肉，同時從30樓高空俯瞰東京的璀璨夜景，為完美的一天畫上句點。🌃<br>⭐ <b>達人秘訣：</b> 此餐廳非常熱門，強烈建議您**提前預約**，以確保能有座位。",
                transport: "位於晴空街道商場內，步行即可抵達。",
                links: [{
                    icon: "fas fa-globe",
                    text: "官方網站",
                    url: "https://www.jojoen.co.jp/shop/jojoen/soramachi/"
                }, {
                    icon: "fas fa-calendar-check",
                    text: "預約連結 (Tabelog)",
                    url: "https://tabelog.com/tokyo/A1312/A131203/13141275/?cid=google_yoyaku"
                }, {
                    icon: "fas fa-map-marker-alt",
                    text: "Google Map",
                    url: "https://maps.app.goo.gl/etcYuHWXHyzZph69A"
                }]
            }
        }, {
            time: "21:00 - 22:30",
            title: "晚餐後的悠閒時光 (二選一)",
            icon: "fa-wand-magic-sparkles",
            content: {
                description: "✨ 晚餐後，您可以根據體力與喜好，決定今晚的最終站。",
                subsections: [{
                    title: "🛍️ 輕鬆逛街：晴空街道",
                    description: "直接在晴空塔底下的「<b>晴空街道 (Tokyo Solamachi)</b>」散步，部分商店營業至 21:00 後，是最省力的選擇。"
                }, {
                    title: "🏮 夜遊淺草：靜謐的淺草寺",
                    description: "感受夜晚點燈後、遊客稀少的「<b>淺草寺</b>」，氛圍靜謐而莊嚴。<br><b>交通：</b>從「押上站」搭乘 <strong>都營淺草線</strong> 🚇 (1 站) 抵達「淺草站」。"
                }]
            }
        }]
    },
    day3: {
        navInfo: { date: '3/29', day: '(週日)' },
        title: "台場漫遊・航向淺草和服體驗",
        themeImage: "images/tsukiji-odaiba-theme.webp",
        highlights: [
            { icon: "fa-robot", text: "台場未來感" },
            { icon: "fa-water", text: "隅田川遊船" },
            { icon: "fa-person-praying", text: "淺草和服體驗" }
        ],
        items: [{
            time: "08:00 - 09:00",
            title: "晨間準備・享用早餐",
            icon: "fa-mug-saucer",
            content: {
                description: "☀️ 美好的一天從早餐開始！在住處悠閒地享用早餐 🥐，為今天的台場與淺草之旅做好準備。"
            }
        }, {
            time: "09:00 - 10:00",
            title: "出發・前往未來港灣台場",
            icon: "fa-train-tram",
            content: {
                description: "🌉 搭上電車，經由彩虹大橋或地下隧道，向著充滿現代感的人工島前進！<br>⭐ <b>達人秘訣：</b> 轉乘百合海鷗號時，推薦您站在第一節車廂的最前方，享受無人駕駛電車帶來的「司機第一視角」絕佳視野！🏝️",
                transport: "從 <strong>JR田端站</strong> 搭乘山手線至「新橋站」，<br>再轉乘無人駕駛的 <strong>百合海鷗號 (Yurikamome) 🚝</strong> 至「台場海濱公園站」或「台場站」，享受窗外的海灣景色。"
            }
        }, {
            time: "10:00 - 13:00",
            title: "台場巡禮・鋼彈與女神的競演",
            icon: "fa-robot",
            content: {
                description: "抵達台場後，你有充足的時間可以探索經典地標，並在商場內享用午餐。🏙️",
                transport: "此區域景點間距離較近，建議步行探索。",
                subsections: [{
                    title: "🗽 富士電視台 & 自由女神像",
                    description: "與小一號的<b>自由女神像</b>及背後的<b>彩虹大橋</b>合影 📸，是台場的經典打卡照。之後還可參觀造型獨特的<b>富士電視台</b>，登上球體展望室。"
                }, {
                    title: "🤖 DiverCity 廣場 & 獨角獸鋼彈",
                    description: "朝聖實物大的<b>獨角獸鋼彈</b>，感受其無與倫比的震撼力！<br>⭐ <b>達人秘訣：</b> 鋼彈在白天與夜晚都有定時的燈光秀與變身表演，建議事先查好時間表，別錯過精彩演出！"
                }]
            }
        }, {
            time: "13:00 - 13:30",
            title: "漫步碼頭・準備搭乘水上巴士",
            icon: "fa-ship",
            content: {
                description: "悠閒散步至 <b>お台場海浜公園</b> 碼頭 🚶‍♀️，準備搭乘水上巴士，從不同的視角欣賞東京。",
                transport: "從 <strong>DiverCity 廣場</strong> 步行約 10-15 分鐘即可抵達台場海濱公園碼頭。"
            }
        }, {
            time: "13:30 - 14:30",
            title: "隅田川遊船・航向淺草",
            icon: "fa-water",
            content: {
                description: "從台場碼頭搭乘水上巴士，沿著隅田川航向淺草，從水上欣賞東京的城市天際線與12座造型各異的橋樑風光。🌉<br>⭐ <b>達人秘訣：</b> 推薦搭乘由漫畫家松本零士設計、充滿未來感的<b>HIMIKO</b>或<b>HOTALUNA</b>號，彷彿乘坐宇宙船一般！",
                links: [{
                    icon: "fas fa-ticket-alt",
                    text: "KKday 預訂頁面",
                    url: "https://www.kkday.com/zh-tw/product/28490"
                }],
                special: {
                    summary: "水上巴士參考班次 (請以官網為準)",
                    content: "此處時間為行程規劃參考，實際請務必依據官網公告的船班時間為準。<ul class='list-disc list-inside mt-2 pl-4 bg-gray-50 p-2 rounded'><li>快速 A1 班次：10:30出航~11:30抵達淺草</li><li>快速 A2 班次：14:15出航~15:15抵達淺草</li><li>快速 A3 班次：17:10出航~18:10抵達淺草</li></ul>"
                }
            }
        }, {
            time: "14:30 - 17:00",
            title: "淺草寺與仲見世商店街散策",
            icon: "fa-torii-gate",
            content: {
                description: "抵達淺草後，首先探索最核心的區域。🏮 參拜香火鼎盛的<b>淺草寺</b>、在掛著巨大燈籠的<b>雷門</b>前拍照留念 📸，並逛逛熱鬧的<b>仲見世商店街</b>。<br>⭐ <b>達人秘訣：</b> 記得到對面的「淺草文化觀光中心」8樓的免費展望台，可以俯瞰整個寺廟與商店街的壯觀景象！",
                transport: "從淺草碼頭步行即可抵達。"
            }
        }, {
            time: "17:00 - 19:00",
            title: "轉往藏前・探索東京的布魯克林",
            icon: "fa-mug-hot",
            content: {
                description: "從傳統的淺草，散步到充滿文創與職人精神的「<b>藏前 (Kuramae)</b>」。這裡有許多由舊倉庫改建的特色咖啡店、巧克力專賣店與生活雜貨店，充滿悠閒的時髦氛圍。☕️✨",
                subsections: [{
                    title: "💡 知名店家參考",
                    description: "可以探訪文具控聖地「<b>カキモリ (Kakimori)</b>」、或是來自舊金山的巧克力名店「<b>Dandelion Chocolate</b>」。"
                }],
                transport: "從淺草雷門步行約 10-15 分鐘即可抵達藏前區域。"
            }
        }, {
            time: "19:00 - 20:30",
            title: "晚餐・淺草美食探索",
            icon: "fa-utensils",
            content: {
                description: "淺草是東京的美食寶庫，尤其以傳統料理聞名。晚餐可在周邊尋找感興趣的餐廳。",
                subsections: [{
                    title: "🍽️ 晚餐類型推薦",
                    description: "  - <b>天婦羅 (Tempura)</b>：淺草是天婦羅的激戰區，有許多百年老店。<br>  - <b>鰻魚飯 (Unagi)</b>：可以品嚐到使用傳統醬汁燒烤的美味鰻魚。<br>  - <b>壽喜燒 (Sukiyaki)</b>：若預算充足，可考慮如「淺草今半」等知名高級老店。<br>  - <b>居酒屋 (Izakaya)</b>：前往熱鬧的「<b>ホッピー通り (Hoppy Dori)</b>」，感受大眾酒場的活力與在地氛圍。"
                }],
                transport: "淺草站周邊餐廳林立，步行即可抵達。"
            }
        }, {
            time: "20:30 - 22:30",
            title: "夜訪秋葉原・動漫與電器聖地",
            icon: "fa-gamepad",
            content: {
                description: "晚餐後，若體力還充足，可以快速前往世界聞名的動漫與電器聖地——秋葉原，感受其夜晚的獨特魅力。🎮🌃",
                subsections: [{
                    title: "💡 夜間活動建議",
                    description: "  - <b>大型電玩中心</b>：如 GiGO 等，體驗最新的夾娃娃機與音樂遊戲 (通常營業至 23:00)。<br>  - <b>唐吉訶德 (Don Quijote)</b>：24小時營業，適合進行最終的藥妝、零食採購。"
                }],
                transport: "從「淺草站 (TX)」搭乘 <strong>筑波快線 (Tsukuba Express)</strong> 🚆 僅需 5 分鐘即可直達「秋葉原站」。"
            }
        }]
    },
    day4: {
        navInfo: { date: '3/30', day: '(週一)' },
        title: "箱根周遊・火山與湖光山色",
        themeImage: "images/hakone-theme.webp",
        highlights: [
            { icon: "fa-mountain-sun", text: "大涌谷" },
            { icon: "fa-sailboat", text: "蘆之湖海賊船" },
            { icon: "fa-torii-gate", text: "箱根神社" }
        ],
        items: [{
            time: "06:00 - 09:30",
            title: "清晨啟程・奔向箱根",
            icon: "fa-ticket",
            content: {
                description: "🌄 為了充分享受箱根的一天，我們需要早點出發！",
                subsections: [{
                    title: "06:30 前往新宿",
                    description: "從 <strong>JR田端站</strong> 搭山手線至 <strong>新宿站</strong> (車程約 20 分鐘)。"
                }, {
                    title: "07:00-07:30 啟程前往箱根",
                    description: "在新宿站的小田急旅遊服務中心購買「<b>箱根周遊券</b>」，這是暢遊箱根必備的超值票券！之後搭乘以下任一車種前往「<b>箱根湯本站</b>」。",
                    links: [{
                        icon: "fas fa-info-circle",
                        text: "箱根周遊券",
                        url: "https://www.hakonenavi.jp/international/tw/discount_passes/free_pass"
                    }, {
                        icon: "fas fa-train",
                        text: "浪漫特快 🚆",
                        url: "https://www.odakyu.jp/tc/romancecar/"
                    }, {
                        icon: "fas fa-train",
                        text: "小田急電鐵",
                        url: "https://www.odakyu.jp/tc/transport/"
                    }]
                }]
            }
        }, {
            time: "09:30 - 12:00",
            title: "大涌谷・地獄谷的呼吸",
            icon: "fa-smog",
            content: {
                description: "♨️ 搭乘經典的箱根交通工具，一路攀升至白煙繚繞的火山峽谷<b>大涌谷</b> 🌋。在這裡可以近距離感受火山地熱的震撼，並遠眺富士山 🗻。<br>⭐ <b>達人秘訣：</b> 務必品嚐此地限定、據說能延年益壽的「<b>黑玉子</b>」溫泉蛋 ⚫。另外，出發前請上官網確認是否因火山氣體濃度過高而關閉。",
                transport: "1. 搭乘 <strong>箱根登山電車</strong> 至「強羅站」。<br>2. 轉乘 <strong>箱根登山纜車</strong> 至「早雲山站」。<br>3. 換乘 <strong>箱根空中纜車</strong> 🚠 前往「大涌谷站」。"
            }
        }, {
            time: "12:00 - 13:30",
            title: "箱根海賊船・蘆之湖巡航",
            icon: "fa-sailboat",
            content: {
                description: "🏴‍☠️ 登上華麗復古的<b>海賊船</b> 🚢，在蘆之湖上航行，欣賞湖光山色與遠方的富士山景。巡航時間約 20-30 分鐘。<br>⭐ <b>達人秘訣：</b> 天氣好時，建議待在甲板上，可以無遮蔽地欣賞風景，並拍下海賊船與水中鳥居的經典合影。",
                transport: "從「大涌谷站」繼續搭乘 <strong>箱根空中纜車</strong> 🚠 至「桃源台站」，在此處的「桃源台港」碼頭搭乘海賊船。"
            }
        }, {
            time: "13:30 - 15:30",
            title: "元箱根港・湖畔午餐與鳥居",
            icon: "fa-utensils",
            content: {
                description: "抵達「元箱根港」後，您可以在湖畔的餐廳享用午餐 🍽️。餐後，前往湖邊的<b>箱根神社</b>，參拜著名的水中「<b>平和的鳥居</b>」。⛩️<br>⭐ <b>達人秘訣：</b> 在鳥居前拍照通常需要排隊，請預留充足時間。若想參拜神社本殿，需再往上步行約20分鐘。",
                transport: "海賊船將會抵達「元箱根港」。此區域景點建議步行探索。"
            }
        }, {
            time: "15:30 - 17:00",
            title: "箱根湯本・溫泉街散策",
            icon: "fa-store",
            content: {
                description: "回到箱根的門戶「<b>箱根湯本</b>」，在熱鬧的溫泉商店街上選購特色伴手禮、品嚐剛出爐的<b>溫泉饅頭</b> 🍡，為箱根之旅畫下句點。🎁",
                transport: "從「元箱根港」搭乘 <strong>箱根登山巴士 (H或K路線)</strong> 🚌 返回「箱根湯本站」。"
            }
        }, {
            time: "17:00 - 19:00",
            title: "告別箱根・返回新宿",
            icon: "fa-train-subway",
            content: {
                description: "從 <strong>箱根湯本站</strong> 搭乘 <strong>小田急浪漫特快</strong> 🚆 返回東京市區，準備享用晚餐。",
                transport: "搭乘小田急電鐵約 90 分鐘，抵達 <strong>新宿站</strong>。"
            }
        }, {
            time: "19:00後",
            title: "晚餐・新宿美食探索",
            icon: "fa-utensils",
            content: {
                description: "抵達新宿時正好是用餐時間，強烈建議在新宿享用晚餐，選擇眾多且交通方便。餐後再搭乘 JR 山手線返回田端。",
                subsections: [{
                    title: "🍽️ 推薦用餐地點",
                    description: "  - <b>思出橫丁 (Omoide Yokocho)</b>：充滿懷舊氣氛的居酒屋小巷，體驗道地的串燒與熱鬧氣氛。<br>  - <b>百貨公司高樓層</b>：如伊勢丹、高島屋等，頂樓美食街餐廳選擇多樣，環境舒適。<br>  - <b>拉麵/沾麵</b>：新宿是拉麵激戰區，可以輕鬆找到各式知名拉麵店。"
                }],
                transport: "新宿站周邊皆可步行抵達。餐後從 <strong>JR新宿站</strong> 搭乘 <strong>山手線</strong> (外回) 約 25 分鐘可直達 <strong>田端站</strong>。"
            }
        }]
    },
    day5: {
        navInfo: { date: '3/31', day: '(週二)' },
        title: "都會巡禮・阿佐谷、澀谷與新宿",
        themeImage: "images/shibuya-shinjuku-theme.webp",
        highlights: [
            { icon: "fa-hands-praying", text: "阿佐谷神明宮" },
            { icon: "fa-users-viewfinder", text: "澀谷十字路口" },
            { icon: "fa-moon", text: "新宿夜生活" }
        ],
        items: [{
            time: "08:00 - 09:00",
            title: "晨間準備・享用早餐",
            icon: "fa-mug-hot",
            content: {
                description: "☀️ 美好的一天從早餐開始！在出發前悠閒地享用早餐，為今天的都會時尚之旅儲備滿滿的能量。"
            }
        }, {
            time: "09:00 - 10:30",
            title: "阿佐谷神明宮・結緣參拜",
            icon: "fa-hands-praying",
            content: {
                description: "前往以獨特的刺繡蕾絲手鍊御守「<b>神結</b>」聞名的<b>阿佐谷神明宮</b>，為這趟旅程祈求美好的緣分。⛩️<br>⭐ <b>達人秘訣：</b>「神結」會依季節月份推出限定款式，極具收藏價值，是送禮自用兩相宜的特色紀念品。",
                transport: "從 <strong>JR田端站</strong> 搭乘山手線至新宿，轉乘中央・總武線至 <strong>阿佐ヶ谷站</strong> (總耗時約 30-35 分鐘)。"
            }
        }, {
            time: "10:30 - 13:00",
            title: "澀谷十字路口・潮流中心初探",
            icon: "fa-users-viewfinder",
            content: {
                description: "來到世界最知名的十字路口！別忘了先跟忠犬八公像合影 🐕。當綠燈亮起，見證上百人同時穿越的壯觀「Scramble」景象 🚦。<br>⭐ <b>達人秘訣：</b> 前往對面的星巴克2樓，從窗邊俯瞰，是拍攝與欣賞人潮的最佳視角！📸 之後可以在周邊百貨或巷弄中尋找美食，享用午餐。🍜",
                transport: "從 <strong>阿佐ヶ谷站</strong> 搭乘中央・總武線至新宿，轉乘山手線至 <strong>澀谷站</strong> (總耗時約 25-30 分鐘)。"
            }
        }, {
            time: "13:00 - 15:30",
            title: "午後靜謐・明治神宮或新宿御苑",
            icon: "fa-tree-city",
            content: {
                description: "從澀谷的喧囂中短暫抽離，在「神聖靜謐」與「精緻庭園」中二選一，享受寧靜的午後。🏙️",
                transport: "從 <strong>澀谷站</strong> 搭乘JR山手線至 <strong>原宿站</strong> (明治神宮) 或 <strong>新宿站</strong> (新宿御苑)。",
                subsections: [{
                    title: "方案一：明治神宮 🌳",
                    description: "參拜紀念明治天皇與昭憲皇太后的莊嚴神宮，漫步於由10萬棵捐贈樹木形成的都市森林中，感受神聖的寧靜。",
                    links: [{
                        icon: "fas fa-info-circle",
                        text: "官網資訊",
                        url: "https://www.meijijingu.or.jp/en/visit/"
                    }]
                }, {
                    title: "方案二：新宿御苑 🌸",
                    description: "探訪融合日式、法式、英式風格的皇家庭園，是您此行的賞櫻「必訪」亮點！<br>⭐<b>賞花重點</b>：園內超過65種櫻花🌸確保了超長花期，您還能欣賞到優雅的<b>木蘭</b>、各色<b>山茶花</b>🌺等，宛如一座春季花卉博物館。<br><b>入場費：</b> 一般 500日圓",
                    links: [{
                        icon: "fas fa-info-circle",
                        text: "官網資訊",
                        url: "https://www.env.go.jp/garden/shinjukugyoen/2_guide/guide.html"
                    }]
                }]
            }
        }, {
            time: "15:30 - 17:30",
            title: "新宿東口・3D貓咪與花園神社",
            icon: "fa-cat",
            content: {
                description: "探訪新宿東口的熱鬧街區！抬頭尋找「<b>Cross Shinjuku Vision</b>」上栩栩如生的巨大3D花貓 🐈，再步行至隱身於鬧區中的<b>花園神社</b>，感受未來科技與傳統信仰的奇妙融合。⛩️",
                transport: "此區域景點間距離很近，建議步行探索。"
            }
        }, {
            time: "17:30 - 19:00",
            title: "晚餐・極厚牛舌饗宴",
            icon: "fa-utensils",
            content: {
                description: "晚餐時間！從東口步行至西新宿，途中快速穿梭充滿昭和風情的<b>思出橫丁</b>，感受下班後居酒屋的熱鬧氣氛，接著前往<b>新宿焼肉 牛たんの檸檬 総本店</b>品嚐美味的牛舌定食！😋<br>⭐ <b>達人秘訣：</b> 定食套餐有用餐時間60分鐘限制，但CP值極高，是快速補充能量的好選擇。",
                transport: "步行前往餐廳。",
                links: [{
                    icon: "fas fa-calendar-check",
                    text: "預約連結 (Google Map)",
                    url: "https://maps.app.goo.gl/qPrSRGfzxqEkiCyj8"
                }]
            }
        }, {
            time: "19:00後",
            title: "夜晚自由探索 (二選一)",
            icon: "fa-wand-magic-sparkles",
            content: {
                description: "晚餐後，您可以依照當天的心情與體力，選擇體驗新宿的道地夜生活，或是前往澀谷欣賞璀璨的百萬夜景。",
                subsections: [{
                    title: "【方案一：新宿不夜城探險】🏮",
                    description: "深入體驗新宿越夜越美麗的魅力，在車站周邊步行探索即可：<br>  - <b>思出橫丁</b>：深入探索狹窄巷弄中的串燒店與居酒屋，感受濃厚的懷舊氛圍。<br>  - <b>歌舞伎町</b>：欣賞夜晚更加閃亮的3D貓咪、尋找藏在飯店上方的哥吉拉頭像，感受亞洲最知名的不夜城活力。<br>  - <b>黃金街</b>：鑽進由數百家微型酒吧組成的獨特區域，體驗保留了戰後樣貌的在地夜生活。<br><b><i class='fas fa-train'></i> 返回：</b>從 <strong>JR新宿站</strong> 搭乘山手線返回田端站 (約 25 分鐘)。"
                }, {
                    title: "【方案二：澀谷SKY高空夜景】🌃",
                    description: "登上近年東京最熱門的觀景台「<b>SHIBUYA SKY</b>」，從229公尺高的露天平台360度欣賞東京夜景。您提到的電梯也是一大亮點！<br><b>⭐ 達人秘訣：</b> 強烈建議**提前在官網預約門票** (最晚入場約 21:20)。<br><b><i class='fas fa-train'></i> 交通與返回：</b>從 <strong>JR新宿站</strong> 搭乘山手線 🚆 (約 7 分鐘) 抵達 <strong>澀谷站</strong>。結束後從澀谷站搭乘山手線返回田端站 (約 30 分鐘)。"
                }]
            }
        }]
    },
    day6: {
        navInfo: { date: '4/1', day: '(週三)' },
        title: "經典巡禮・皇居與東京鐵塔",
        themeImage: "images/tokyo-tower-azabudai-theme.avif",
        highlights: [
            { icon: "fa-landmark", text: "皇居" },
            { icon: "fa-tower-broadcast", text: "東京鐵塔" },
            { icon: "fa-cart-shopping", text: "KITTE 商場" }
        ],
        items: [{
            time: "08:00 - 09:00",
            title: "晨間準備・享用早餐",
            icon: "fa-mug-hot",
            content: {
                description: "☀️ 美好的一天從早餐開始！在住處悠閒地享用早餐 🥐，為今天的經典巡禮做好準備。"
            }
        }, {
            time: "09:00 - 09:30",
            title: "出發・前往皇居區域",
            icon: "fa-train",
            content: {
                description: "準備好探索東京的心臟地帶！",
                transport: "從「田端」站搭乘 <strong>JR京濱東北線</strong> 或 <strong>JR山手線</strong> 🚆 前往「東京」站 (車程約 15-20 分鐘)。"
            }
        }, {
            time: "09:30 - 11:30",
            title: "皇居東御苑・探訪江戶城跡",
            icon: "fa-landmark",
            content: {
                description: "免費參觀<b>皇居東御苑</b>，這裡是江戶幕府的權力核心—江戶城的舊址。您可以登上<b>天守台遺跡</b> 🏯，感受歷史的厚重。<br>⭐<b>賞花重點</b>：這裡宛如一座植物寶庫💐，除了多種櫻花外，您還可以尋找觀賞用的<b>花桃</b>🍑、初開的各色<b>杜鵑花</b>與鮮黃的<b>山吹</b>🌼等，驚喜不斷。<br><b>[注意]</b>：每週一、週五固定休園 (若遇假日則順延)。",
                transport: "從東京車站「丸之內中央口」步行約 10-15 分鐘至「大手門」入口。"
            }
        }, {
            time: "11:30 - 12:30",
            title: "千鳥淵公園・護城河畔散策",
            icon: "fa-leaf",
            content: {
                description: "沿著舊江戶城的護城河悠閒散步，這裡是東京最著名的賞櫻名所之一 🌸。<br>⭐ <b>達人秘訣：</b> 櫻花季時，可以考慮租一艘小船在護城河上划行，享受被櫻花隧道包圍的極致浪漫。",
                transport: "從皇居東御苑「北桔橋門」離開，沿護城河往北散步約 15-20 分鐘至「千鳥淵綠道」。"
            }
        }, {
            time: "12:30 - 14:00",
            title: "午餐 & 前往增上寺",
            icon: "fa-utensils",
            content: {
                description: "在「九段下」站附近享用午餐 🍜，補充體力後繼續下午的行程。",
                transport: "從「九段下」站搭乘 <strong>都營三田線</strong> 🚇 (往「日吉」或「白金高輪」方向) 至「御成門」站 (車程約 15 分鐘)。"
            }
        }, {
            time: "14:00 - 14:30",
            title: "增上寺・鐵塔與古寺的合影",
            icon: "fa-camera",
            content: {
                description: "參拜德川家的靈廟<b>增上寺</b>，並從寺廟廣場拍攝以古老寺廟為前景、現代<b>東京鐵塔</b>為背景的經典照片。📸 這是捕捉「傳統與現代東京」的完美地點。",
                transport: "「御成門」站 B6 出口即達。"
            }
        }, {
            time: "14:30 - 17:00",
            title: "東京鐵塔・登上經典地標",
            icon: "fa-tower-broadcast",
            content: {
                description: "登上東京的昭和時代象徵 🗼 <b>東京鐵塔</b>，感受它獨特的紅色魅力。建議登上觀景台，欣賞白天、日落至傍晚的景色。",
                transport: "從增上寺步行 10-15 分鐘即可抵達。"
            }
        }, {
            time: "17:00 - 17:30",
            title: "前往東京車站",
            icon: "fa-train-subway",
            content: {
                description: "準備前往晚餐地點，並欣賞東京車站被譽為藝術品的夜景。",
                transport: "從東京鐵塔步行至 JR「浜松町」站，搭乘 <strong>JR京濱東北線</strong> 或 <strong>JR山手線</strong> (2 站，約 5 分鐘) 抵達「東京」站。"
            }
        }, {
            time: "17:30 - 20:00",
            title: "KITTE丸之內・晚餐與車站夜景",
            icon: "fa-cart-shopping",
            content: {
                description: "在由舊郵局改建的 <b>KITTE</b> 商場享用晚餐，這裡的 B1、5F、6F 聚集了多家知名餐廳。 <br>⭐ <b>達人秘訣：</b> 餐後務必至 6 樓的「<b>屋頂花園</b>」，這裡是免費拍攝<b>東京車站</b>紅磚站房經典夜景的最佳地點！🌃",
                transport: "東京車站「丸之內南口」出站即達。"
            }
        }, {
            time: "20:00 - 22:30",
            title: "夜間自由探索 (三選一)",
            icon: "fa-wand-magic-sparkles",
            content: {
                description: "晚餐後的自由活動時間，可以根據您的喜好選擇一個地方繼續探索。✨",
                subsections: [{
                    title: "【選擇 1：秋葉原】(電器 / 玩具 / 動漫) 🎮",
                    description: "目標是「<b>Yodobashi Camera (ヨドバシAkiba)</b>」(營業至 22:00)。<br><b>交通：</b>從東京車站搭乘 <strong>JR京濱東北線</strong> 或 <strong>JR山手線</strong> (2 站，約 4 分鐘) 抵達「秋葉原」站。<br><b>返回田端：</b>從「秋葉原」站搭乘 <strong>JR山手線</strong> (外回) 直達「田端」站 (約 10-12 分鐘)。"
                }, {
                    title: "【選擇 2：銀座】(藥妝 / 零食 / 雜貨) 🛍️",
                    description: "目標是「<b>唐吉訶德 (Don Quijote) 銀座本館</b>」(24 小時營業)。<br><b>交通：</b>從東京車站步行 15-20 分鐘，或搭地鐵丸之內線 1 站到「銀座」。<br><b>返回田端：</b>從銀座步行至 JR「有樂町」站，搭乘 <strong>JR山手線</strong> (內回) 直達「田端」站 (約 20 分鐘)。"
                }, {
                    title: "【選擇 3：新宿】(感受氛圍 / 綜合) 🌃",
                    description: "目標是新宿東口、<b>歌舞伎町</b>周邊、遊戲中心、<b>唐吉訶德</b> (24 小時)。<br><b>交通：</b>從東京車站搭乘 <strong>JR中央線快速</strong> (約 15 分鐘) 抵達「新宿」站。<br><b>返回田端：</b>從「新宿」站搭乘 <strong>JR山手線</strong> (外回) 直達「田端」站 (約 20-22 分鐘)。"
                }]
            }
        }]
    },
    day7: {
        navInfo: { date: '4/2', day: '(週四)' },
        title: "富士絕景・山中湖與忍野八海",
        themeImage: "images/kawaguchiko-fuji-theme.avif",
        highlights: [
            { icon: "fa-seedling", text: "大石公園" },
            { icon: "fa-water", text: "忍野八海" },
            { icon: "fa-mountain-sun", text: "山中湖" }
        ],
        items: [{
            time: "07:00 - 07:30",
            title: "晨間準備・享用早餐",
            icon: "fa-mug-hot",
            content: {
                description: "☀️ 為了準時出發，今天得早點起床！迅速享用早餐，為一整天的富士山絕景之旅做好準備。"
            }
        }, {
            time: "07:30 - 09:30",
            title: "啟程出發・奔向富士山",
            icon: "fa-car",
            content: {
                description: "包車司機準時接送，我們從田端出發，沿高速公路直奔富士山區 🚗，享受專屬行程的舒適與彈性，準備迎接一整天的絕景！",
                transport: "由<strong>包車司機</strong>從田端接送，經由<strong>首都高速道路</strong>接上<strong>中央自動車道</strong>，一路開往河口湖。"
            }
        }, {
            time: "09:30 - 10:15",
            title: "大石公園・湖畔花街道",
            icon: "fa-seedling",
            content: {
                description: "抵達<b>大石公園</b>，這裡是河口湖畔的絕佳觀景點 🏞️。<br>⭐<b>賞花重點</b>：在壯麗的富士山背景下，您可以欣賞到沿路的<b>水仙</b>🌼、<b>三色堇</b>等春季花卉。此時河口湖的櫻花🌸多為初開，景色格外清新。",
                transport: "司機將載我們沿<strong>河口湖大橋</strong>至北岸的<strong>大石公園</strong>，此處設有停車場。"
            }
        }, {
            time: "10:30 - 13:30",
            title: "音樂與森林博物館・童話庭園午餐",
            icon: "fa-music",
            content: {
                description: "走進宛如歐洲童話的<b>音樂與森林博物館</b> 🏰，欣賞世界級的自動管風琴與音樂盒演奏。<br>⭐<b>賞花重點</b>：精心栽培的歐式庭園中，色彩斑斕的<b>鬱金香</b>🌷與<b>風信子</b>正值花季，與異國建築構成完美畫面。我們將在此悠閒漫步，並在景觀餐廳享用午餐 🍽️。<br><b>門票：</b> 成人約 1,800 日圓 (依平假日浮動)。",
                transport: "從大石公園出發，由司機沿<strong>縣道21號（河口湖北岸道路）</strong>駕駛約 5 分鐘即可抵達。"
            }
        }, {
            time: "13:45 - 14:45",
            title: "車站周邊・經典打卡點巡禮",
            icon: "fa-camera-retro",
            content: {
                description: "來到河口湖車站周邊，這裡是拍攝經典照片與品嚐特色點心的好地方。",
                subsections: [{
                    title: "📸 羅森便利商店",
                    description: "朝聖社群媒體上最火紅的打卡點，在<b>羅森便利商店</b>前可以拍下以富士山為背景的完美街景照。<br>⭐ <b>達人秘訣：</b> 拍照時請務必注意來往車輛，並尊重當地居民，不要造成交通困擾。"
                }, {
                    title: "🍞 富士山吐司 (Fujisan Shokupan)",
                    description: "接著去排隊購買超可愛的藍白雙色「<b>富士山吐司</b>」，無論是自己享用或當伴手禮都很棒！"
                }],
                transport: "由司機載我們返回河口湖車站周邊區域，車程約 10-15 分鐘。"
            }
        }, {
            time: "15:15 - 16:30",
            title: "忍野八海・探訪名水湧泉",
            icon: "fa-water",
            content: {
                description: "探訪由富士山雪水融化、過濾後形成的八個清澈湧泉池 💧。<br>⭐<b>賞花重點</b>：沿著池塘與新名庄川的櫻花樹🌸此時可能正值初開，有機會拍到櫻花、富士山與茅草屋的經典合影，景色如畫。",
                transport: "從河口湖車站區域出發，行經<strong>國道138號</strong>，由司機駕駛約 15-20 分鐘即可抵達。"
            }
        }, {
            time: "17:00 - 17:30",
            title: "平野之濱・靜賞逆富士",
            icon: "fa-image",
            content: {
                description: "來到山中湖畔的<b>平野之濱</b>，這裡是欣賞「逆富士」的著名景點。在寧靜的湖畔散步 🦢，享受夕陽餘暉灑落富士山的片刻浪漫。",
                transport: "離開忍野八海後，由司機繼續沿<strong>國道138號</strong>載我們前往山中湖，車程約 15 分鐘。"
            }
        }, {
            time: "17:45 - 18:30",
            title: "山中湖全景台・日落最終章",
            icon: "fa-mountain-sun",
            content: {
                description: "本日的完美終點！從遼闊的<b>山中湖全景台</b>俯瞰山中湖與雄偉的富士山 🤩，靜靜欣賞從傍晚到日落的壯麗景色，這是攝影愛好者的夢幻地點。",
                transport: "由司機沿<strong>國道413號（山中湖畔道路）</strong>載我們開上山，路況較窄，約 15 分鐘即可抵達觀景台。"
            }
        }, {
            time: "18:30 - 20:30",
            title: "啟程前往六本木",
            icon: "fa-car-side",
            content: {
                description: "在山中湖全景台欣賞完壯麗的富士山日落後，我們將搭乘包車返回東京，並直接前往**六本木**地區。預計於 20:30 左右抵達。",
                transport: "從山中湖IC上<strong>中央自動車道</strong>，由司機載我們前往六本木，車程約 1.5 - 2 小時。"
            }
        }, {
            time: "20:30 - 22:00",
            title: "六本木晚餐與夜間散策",
            icon: "fa-utensils",
            content: {
                description: "抵達六本木後，在前往劇場前，您可以快速享用晚餐並感受此地的繁華夜景。推薦逛逛<b>六本木之丘 (Roppongi Hills)</b>，看看著名的大蜘蛛藝術裝置 🕷️。",
                subsections: [{
                    title: "🍽️ 晚餐快速推薦",
                    description: "因時間有限，建議選擇出餐較快的餐廳：<br>  - <b>拉麵 (Ramen)</b>：如「AFURI」的柚子鹽拉麵或「一風堂」的豚骨拉麵，都是快速美味的選擇。<br>  - <b>六本木之丘/東京中城內餐廳</b>：商場內有各式餐廳，從簡餐到正式料理都有，方便安排時間。"
                }],
                transport: "六本木地區景點密集，步行即可探索。"
            }
        }, {
            time: "22:10後",
            title: "ROKUSAN ANGEL 劇場表演",
            icon: "fa-masks-theater",
            content: {
                description: "前往「<b>ROKUSAN ANGEL</b>」，準備欣賞精彩的劇場表演，體驗六本木獨特的夜生活文化。💃✨",
                transport: "從用餐地點步行至劇場。"
            }
        }]
    },
    day8: {
        navInfo: { date: '4/3', day: '(週五)' },
        title: "文化或購物擇一",
        choices: [{
            title: "秋葉原・文化與次文化交錯",
            themeImage: "images/akihabara-theme.webp",
            highlights: [
                { icon: "fa-torii-gate", text: "神田明神" },
                { icon: "fa-robot", text: "動漫模型" },
                { icon: "fa-gamepad", text: "電玩中心" }
            ],
            items: [
                { time: "08:00 - 09:00", title: "晨間準備・享用早餐", icon: "fa-coffee", content: { description: "☀️ 美好的一天從早餐開始，為今天的秋葉原亞文化探索儲備能量！" } },
                { time: "09:00 - 09:30", title: "出發・前往秋葉原", icon: "fa-train", content: { description: "搭上電車，向著世界聞名的電氣街與動漫聖地前進！", transport: "從「田端」站搭乘 <strong>JR山手線</strong> (內回) 或 <strong>JR京濱東北線</strong> 前往「秋葉原」站 (車程約 10 分鐘)。" } },
                { time: "09:30 - 10:30", title: "神田明神・動漫聖地巡禮", icon: "fa-torii-gate", content: { description: "參訪守護秋葉原的宏偉神社<b>神田明神</b>，這裡也是《Love Live!》等動漫的聖地。<br>⭐ <b>達人秘訣：</b> 您可以在此尋找獨步全球的「<b>IT 御守</b>」，保佑您的電子設備順利運作。", transport: "從秋葉原站電氣街口步行約 10 分鐘。" } },
                { time: "10:30 - 12:00", title: "電氣街核心・無線電會館探險", icon: "fa-building", content: { description: "走入秋葉原的中心，回到車站前的地標<b>秋葉原無線電會館</b>，在這棟被稱為「動漫高塔」的建築中，快速瀏覽琳瑯滿目的最新模型、公仔和卡牌。🤖", transport: "從神田明神步行返回電氣街區域約 10 分鐘。" } },
                { time: "12:00 - 13:00", title: "午餐・AKIBA_ICHI美食街", icon: "fa-utensils", content: { description: "在車站旁的「<b>秋葉原 UDX</b>」大樓 2-3 樓的「AKIBA_ICHI」餐廳街用餐，這裡選擇多樣且環境舒適，能暫時遠離街上的人潮。🍱", transport: "從無線電會館步行約 3-5 分鐘。" } },
                { time: "13:00 - 15:00", title: "午後漫步・從萬世橋到職人街", icon: "fa-bridge-water", content: { description: "下午來點不一樣的。先到舊萬世橋車站改建的<b>mAAch ecute</b>，在神田川畔享受片刻悠閒。接著探訪鐵軌下的<b>2k540職人街</b>，欣賞日本設計師們的手作工藝品。🎨 (2k540週三公休)", transport: "此區域建議全程步行探索。" } },
                { time: "15:00 - 17:00", title: "自由時間・動漫與電器挖寶", icon: "fa-gem", content: { description: "💎 這是您的主要購物時段，您可以依興趣選擇：<div class='mt-2'><b>電器：</b> 逛龍頭「<b>友都八喜 (Yodobashi-Akiba)</b>」。</div><div class='mt-1'><b>動漫二手：</b> 逛整棟黑色的「<b>Mandarake Complex</b>」或傳奇復古遊戲店「<b>Super Potato</b>」，體驗挖寶的樂趣。</div>", transport: "步行即可在各店家間移動。" } },
                { time: "17:00 - 18:00", title: "娛樂時間・GiGO電玩中心", icon: "fa-gamepad", content: { description: "體驗日本的大型電玩中心 🎮，在 <b>GiGO</b> 玩玩最新款的夾娃娃機或音樂遊戲，感受秋葉原的另一種活力。", transport: "步行即可抵達。" } },
                { time: "18:00 - 19:30", title: "晚餐・秋葉原美食探索", icon: "fa-drumstick-bite", content: { description: "可在秋葉原周邊尋找美食，例如知名的拉麵或一位難求的「<b>Roast Beef 大野</b>」牛肉丼飯。🥩", transport: "步行即可抵達。" } },
                { time: "19:30 - 21:30", title: "夜景採買・感受不夜城魅力", icon: "fa-moon", content: { description: "晚餐後，在霓虹閃爍的<b>中央通</b>漫步，感受賽博龐克般的未來都市感。之後可前往 24 小時營業的<b>唐吉訶德</b>完成最後的採買任務。✨", transport: "步行即可抵達。" } },
                { time: "21:30後", title: "滿載而歸・告別秋葉原", icon: "fa-train", content: { description: "結束充實的一天，準備返回住處。", transport: "從「秋葉原」站搭乘 <strong>JR京濱東北線</strong> 或 <strong>JR山手線</strong> 返回「田端」站。" } }
            ]
        }, {
            title: "池袋・動漫聖地與都市夜遊",
            themeImage: "images/ikebukuro-theme.webp",
            highlights: [
                { icon: "fa-fish", text: "太陽城水族館" },
                { icon: "fa-heart", text: "Animate" },
                { icon: "fa-utensils", text: "無敵家拉麵" }
            ],
            items: [
                { time: "08:00 - 09:00", title: "晨間準備・享用早餐", icon: "fa-coffee", content: { description: "☀️ 起床梳洗，享用早餐，為池袋的動漫與都市探險日做好準備！" } },
                { time: "09:00 - 09:30", title: "出發・前往池袋", icon: "fa-train", content: { description: "搭上山手線，向著今天的目的地前進！", transport: "從「田端」站搭乘 <strong>JR山手線</strong> (外回) 🚆 前往「池袋」站 (車程約 10-12 分鐘)。" } },
                { time: "09:30 - 12:00", title: "太陽城水族館・天空的企鵝", icon: "fa-fish", content: { description: "參觀位於<b>太陽城</b>頂樓的都市型水族館 🏙️，欣賞可愛的「<b>天空的企鵝</b>」在頭頂上的透明水槽中游泳 🐧，彷彿在城市上空飛翔。", transport: "抵達池袋站後，由「東口」出站，沿著Green大通步行約 11 分鐘至「太陽城」。" } },
                { time: "12:00 - 13:00", title: "午餐・太陽城美食探索", icon: "fa-utensils", content: { description: "在<b>太陽城</b>內的「ALPA 購物中心」餐廳街，或 Sunshine 60 大樓的景觀餐廳享用午餐 🍱。 (例如 3F 的「<b>和幸豬排</b>」)" } },
                { time: "13:00 - 16:00", title: "Animate總店・乙女路的動漫巡禮", icon: "fa-heart", content: { description: "沉浸在動漫、漫畫與周邊商品的世界 📚，探索2023年新開幕、全球最大的<b>Animate 池袋總店</b>，這裡是粉絲們的天堂！💖<br>⭐ <b>達人秘訣：</b> 總店後方的「乙女路」是女性向動漫商品與執事咖啡廳的集中地。", transport: "從太陽城步行至 Animate 池袋總店約 10 分鐘。" } },
                { time: "16:00 - 18:00", title: "陽光60瞭望台・黃昏與夜景", icon: "fa-building-columns", content: { description: "返回<b>太陽城</b>，登上 60 樓的「<b>陽光60瞭望台 (TENBOU-PARK)</b>」🌳，這裡設計成一座空中的公園，讓您能以最舒適的姿勢，欣賞東京從黃昏到夜景的壯麗變化 🌇。<br><b>[注意]</b>：瞭望台通常開放至 20:00，建議提早前往。" } },
                { time: "18:00 - 19:30", title: "晚餐・拉麵激戰區", icon: "fa-bowl-food", content: { description: "前往池袋東口的拉麵激戰區享用晚餐。<br>⭐ <b>達人秘訣：</b> 大名鼎鼎的「<b>無敵家拉麵</b>」總是大排長龍，建議避開用餐尖峰。若不想排隊，附近的「<b>一蘭拉麵</b>」也是好選擇。🍜" } },
                { time: "19:30 - 21:30", title: "池袋夜生活・自由探索", icon: "fa-moon", content: {
                    description: "晚餐後的自由活動時間 🥳，可以根據您的喜好選擇一個地方繼續探索 ✨。",
                    subsections: [{
                        title: "【選擇 1：動漫娛樂】 🎮",
                        description: "前往 <strong>GiGO 池袋</strong> (大型電玩中心，營業至 23:00) 玩夾娃娃機和最新遊戲。"
                    }, {
                        title: "【選擇 2：聲光藝術】 💡",
                        description: "步行至 <strong>池袋西口公園</strong>，欣賞「GLOBAL RING」的夜間聲光秀。"
                    }, {
                        title: "【選擇 3：觀賞電影】 🎬",
                        description: "參觀豪華的 <strong>Grand Cinema Sunshine</strong> (營業至 23:00)。"
                    }, {
                        title: "【選擇 4：購物血拼】 🛍️",
                        description: "在車站附近的「<b>唐吉訶德</b>」、「<b>Bic Camera</b>」或「<b>Parco 百貨</b>」進行最後採買。"
                    }]
                }},
                { time: "21:30後", title: "滿載而歸", icon: "fa-bed", content: { description: "結束充實的一天，準備返回住處。", transport: "從「池袋」站搭乘 <strong>JR山手線</strong> (內回) 返回「田端」站。" } }
            ]
        }]
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
        items: [{
            time: "上午",
            title: "最終補貨・伴手禮採購",
            icon: "fa-gifts",
            content: {
                description: "享用早餐後，這是您查漏補缺的最後機會。可以去前一天沒逛夠的店家，或是前往大型連鎖雜貨店「<b>驚安的殿堂・唐吉訶德</b>」一次買齊藥妝、零食和各種有趣的伴手禮。🛍️ 🎁"
            }
        }, {
            time: "13:00後",
            title: "告別的午餐・前往機場",
            icon: "fa-plane-departure",
            content: {
                description: "在市區享用在日本的最後一餐 🍱，之後返回住處整理行李，準備前往機場。<br>⭐ <b>達人秘訣：</b> 如果伴手禮沒買夠，機場免稅店是您的最後機會！諸如「東京芭娜娜」、「Royce巧克力」等熱門商品都買得到，且無需再辦理退稅。",
                transport: "從市區搭乘 <strong>Skyliner</strong> 或 <strong>N'EX 成田特快</strong> 🚆 前往成田機場，為愉快的旅程劃上完美句點。"
            }
        }]
    }
};