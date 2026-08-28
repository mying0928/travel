
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// --- JMA (日本氣象廳) 天氣預報：地點資料表 ---
// 每個代表城市對應「氣象廳 週間預報(7天)」與「短期預報(3天)」的地域代碼。
// 氣象廳只公布未來 7 天的資料，出發前會逐日往後延伸；
// 這裡每次開頁都會即時抓取最新 JSON，等日期進入 7 天內就會自動顯示，點地名可展開看整週。
const WEATHER_LOCATIONS = [
    { id: 'aomori', name: '青森市', icon: 'fa-city', prefCode: '020000', weeklyArea: '020010', shortArea: '020010', tempCity: '31312' },
    { id: 'hirosaki', name: '弘前市', icon: 'fa-apple-alt', prefCode: '020000', weeklyArea: '020010', shortArea: '020010', tempCity: '31461' },
    { id: 'hakkoda', name: '八甲田山（估計）', icon: 'fa-mountain', prefCode: '020000', weeklyArea: '020010', shortArea: '020010', tempCity: '31312', tempOffset: -8, note: '氣象廳無八甲田山頂測站，氣溫以青森市區資料估算（約低 8-10°C），僅供參考。' },
    { id: 'towada-hachinohe', name: '十和田・八戶', icon: 'fa-water', prefCode: '020000', weeklyArea: '020200', shortArea: '020030', tempCity: '31602' },
    { id: 'morioka-ichinoseki', name: '盛岡・一関', icon: 'fa-torii-gate', prefCode: '030000', weeklyArea: '030010', shortArea: '030010', tempCity: '33431' },
    { id: 'sendai', name: '仙台市', icon: 'fa-city', prefCode: '040000', weeklyArea: '040010', shortArea: '040010', tempCity: '34392' }
];

const JMA_CODE_MAP = {
    '100': ['fa-sun', '晴'], '101': ['fa-cloud-sun', '晴時多雲'], '102': ['fa-cloud-sun-rain', '晴短暫雨'],
    '103': ['fa-cloud-sun-rain', '晴短暫雨'], '104': ['fa-cloud-sun', '晴短暫雪'], '105': ['fa-cloud-sun', '晴短暫雪'],
    '106': ['fa-cloud-sun-rain', '晴短暫雨雪'], '107': ['fa-cloud-sun-rain', '晴短暫雨雪'], '108': ['fa-bolt', '晴短暫雷雨'],
    '110': ['fa-cloud-sun', '晴後多雲'], '111': ['fa-cloud', '晴後陰'], '112': ['fa-cloud-sun-rain', '晴後短暫雨'],
    '113': ['fa-cloud-sun-rain', '晴後短暫雨'], '114': ['fa-cloud-rain', '晴後雨'], '115': ['fa-cloud-sun', '晴後短暫雪'],
    '117': ['fa-snowflake', '晴後大雪'], '119': ['fa-bolt', '晴後雷雨'], '120': ['fa-cloud-sun-rain', '晴晨雨後晴'],
    '121': ['fa-cloud-sun-rain', '晴晨雨後晴'], '122': ['fa-cloud-sun-rain', '晴傍晚有雨'], '123': ['fa-bolt', '晴山區雷雨'],
    '125': ['fa-bolt', '晴午後雷雨'], '126': ['fa-cloud-sun-rain', '晴午後有雨'], '128': ['fa-cloud-sun-rain', '晴晚間有雨'],
    '130': ['fa-smog', '晴有霧'], '131': ['fa-smog', '晴有霧'], '132': ['fa-cloud-sun', '晴局部多雲'],
    '140': ['fa-bolt', '晴局部雷雨'], '160': ['fa-cloud-sun', '晴局部有雪'], '170': ['fa-cloud-sun-rain', '晴局部雨雪'],
    '181': ['fa-cloud-sun', '晴局部下雪雨'],
    '200': ['fa-cloud', '多雲'], '201': ['fa-cloud-sun', '多雲時晴'], '202': ['fa-cloud-rain', '多雲短暫雨'],
    '203': ['fa-cloud-rain', '多雲短暫雨'], '204': ['fa-cloud', '多雲短暫雪'], '205': ['fa-cloud', '多雲短暫雪'],
    '206': ['fa-cloud-rain', '多雲短暫雨雪'], '208': ['fa-bolt', '多雲短暫雷雨'], '209': ['fa-smog', '有霧'],
    '210': ['fa-cloud-sun', '多雲後晴'], '211': ['fa-cloud-sun', '多雲後晴'], '212': ['fa-cloud-rain', '多雲後短暫雨'],
    '213': ['fa-cloud-rain', '多雲後短暫雨'], '214': ['fa-cloud-rain', '多雲後雨'], '215': ['fa-cloud', '多雲後短暫雪'],
    '216': ['fa-snowflake', '多雲後雪'], '218': ['fa-snowflake', '多雲後大雪'], '219': ['fa-bolt', '多雲後雷雨'],
    '220': ['fa-cloud-rain', '多雲晨雨後陰'], '221': ['fa-cloud', '多雲晨雪後陰'], '222': ['fa-cloud-rain', '多雲傍晚有雨'],
    '223': ['fa-cloud-rain', '多雲有陣雨'], '224': ['fa-cloud', '多雲傍晚有雪'], '225': ['fa-cloud-rain', '多雲晚間有雨'],
    '226': ['fa-cloud', '多雲晚間有雪'], '228': ['fa-cloud', '多雲晚間有雪'], '229': ['fa-cloud', '多雲局部有雪'],
    '230': ['fa-cloud-rain', '多雲局部有雨'], '231': ['fa-smog', '多雲海上有霧'], '240': ['fa-bolt', '多雲局部雷雨'],
    '250': ['fa-snowflake', '多雲局部大雪'], '260': ['fa-cloud', '多雲局部雨雪'], '270': ['fa-cloud', '多雲局部雨雪'],
    '281': ['fa-cloud', '多雲局部雨雪'],
    '300': ['fa-cloud-rain', '雨'], '301': ['fa-cloud-sun-rain', '雨時晴'], '302': ['fa-cloud-rain', '雨時停'],
    '303': ['fa-cloud-rain', '雨後雪'], '304': ['fa-cloud-rain', '雨或雪'], '306': ['fa-cloud-showers-heavy', '大雨'],
    '308': ['fa-wind', '暴風雨'], '309': ['fa-cloud-rain', '雨後雪'], '311': ['fa-cloud-sun-rain', '雨後晴'],
    '313': ['fa-cloud-rain', '雨後陰'], '314': ['fa-cloud-rain', '雨後雪'], '315': ['fa-cloud-rain', '雨後雪'],
    '316': ['fa-cloud-sun', '雨或雪後晴'], '317': ['fa-cloud', '雨或雪後陰'], '320': ['fa-cloud-rain', '雪轉雨'],
    '321': ['fa-cloud-rain', '雪轉雨'], '322': ['fa-cloud-rain', '雨局部有雪'], '323': ['fa-cloud-sun-rain', '雨傍晚放晴'],
    '324': ['fa-cloud-sun-rain', '雨夜間放晴'], '325': ['fa-cloud-rain', '雨夜間下雪'], '326': ['fa-cloud-rain', '雨傍晚下雪'],
    '327': ['fa-cloud-rain', '雨晚間下雪'], '328': ['fa-cloud-showers-heavy', '雨局部強陣雨'], '329': ['fa-cloud-rain', '雨局部有雪'],
    '340': ['fa-snowflake', '雪或雨'], '350': ['fa-bolt', '雷雨'], '361': ['fa-cloud-sun', '雪或雨後放晴'],
    '371': ['fa-cloud', '雪或雨後陰'],
    '400': ['fa-snowflake', '雪'], '401': ['fa-cloud-sun', '雪時晴'], '402': ['fa-snowflake', '雪時停'],
    '403': ['fa-cloud-rain', '雪後雨'], '405': ['fa-snowflake', '大雪'], '406': ['fa-wind', '暴風雪'],
    '407': ['fa-wind', '大暴風雪'], '409': ['fa-cloud-rain', '雪後雨'], '411': ['fa-cloud-sun', '雪後晴'],
    '413': ['fa-cloud', '雪後陰'], '414': ['fa-cloud-rain', '雪後雨'], '420': ['fa-cloud-rain', '雨轉雪'],
    '421': ['fa-cloud-rain', '雨轉雪'], '422': ['fa-cloud-rain', '雪傍晚下雨'], '423': ['fa-snowflake', '雪局部強陣雪'],
    '425': ['fa-cloud-rain', '雪局部下雨'], '426': ['fa-cloud-sun', '雪傍晚放晴'], '427': ['fa-cloud-sun', '雪晚間放晴'],
    '430': ['fa-cloud-rain', '雪轉雨'], '450': ['fa-snowflake', '大雪']
};

// --- MUSIC PLAYER ---
function setupMusicPlayer() {
    const music = document.getElementById('background-music');
    const toggleMusicBtn = document.getElementById('toggleMusicBtn');
    const icon = toggleMusicBtn.querySelector('i');
    const loopStartTime = 59;
    const loopEndTime = 82; // 1 minute 22 seconds

    music.volume = 0.5;

    toggleMusicBtn.addEventListener('click', () => {
        if (music.paused) {
            // If starting from a paused state outside the loop, jump to the start
            if (music.currentTime < loopStartTime || music.currentTime > loopEndTime) {
                music.currentTime = loopStartTime;
            }
            music.play().catch(error => {
                console.error('Music play failed:', error);
            });
        } else {
            music.pause();
        }
    });

    music.addEventListener('timeupdate', () => {
        if (music.currentTime >= loopEndTime) {
            music.currentTime = loopStartTime;
        }
    });

    // Update icon if music ends or is paused by other means
    music.onpause = () => {
        icon.className = 'fas fa-play text-xl';
        toggleMusicBtn.title = '播放音樂';
    };

    music.onplay = () => {
        icon.className = 'fas fa-pause text-xl';
        toggleMusicBtn.title = '暫停音樂';
    };

    // Set initial icon and time
    music.currentTime = loopStartTime;
    icon.className = 'fas fa-play text-xl';
    toggleMusicBtn.title = '播放音樂';
}


document.addEventListener('DOMContentLoaded', function () {
    const dailySectionsContainer = document.getElementById('daily-sections-container');
    let currentActiveSectionId = null;
    let draggedButton = null;

    // --- ✨ 日本行程資料 is now loaded from data.js ---
    
    // --- INITIALIZATION ---
    generateNavButtons(); // DYNAMICALLY CREATE NAV BUTTONS
    setupAnimations();
    setupInteractiveForeground();
    setupCountdown();
        setupWeatherWidget('aomori-weather-info', 'Aomori', false);
    setupWeatherWidget('sendai-weather-info', 'Sendai', false);
    setupWeatherWidget('hakkoda-weather-info', 'Aomori', true);
    setupWeatherLocations();
    generateDailySections();
    setupLazyBackgroundImages(); // Call the new lazy loading function
    setupTabSwitching();
    setupDragAndDrop();
    setupScrollToTop();
    setupToolkitCardHover();
    setupMusicPlayer();
    setupNavArrows();
    setupThreeJSSakuraBackground();

    // --- SETUP FUNCTIONS ---

    function generateNavButtons() {
        const navContainer = document.getElementById('nav-container');
        if (!navContainer) return;

        let buttonsHtml = '';

        // Add the Overview button first, and ensure it's active by default
        buttonsHtml += `<button data-target="overview" class="nav-btn bg-orange-500 text-white py-2 px-4 rounded-full shadow-sm text-center leading-tight flex-shrink-0 whitespace-nowrap">旅程總覽</button>`;

        // Loop through itinerary data to create a button for each day
        for (const dayId in itineraryData) {
            const dayData = itineraryData[dayId];
            if (dayData.navInfo) {
                buttonsHtml += `
                    <button data-target="${dayId}" class="nav-btn bg-orange-100 text-orange-800 py-2 px-4 rounded-full shadow-sm text-center leading-tight flex-shrink-0 whitespace-nowrap">
                        ${dayData.navInfo.date}<br><span class="text-xs font-medium">${dayData.navInfo.day}</span>
                    </button>
                `;
            }
        }

        navContainer.innerHTML = buttonsHtml;
    }

    function setupNavArrows() {
        const navContainer = document.getElementById('nav-container');
        const arrowLeft = document.getElementById('nav-arrow-left');
        const arrowRight = document.getElementById('nav-arrow-right');

        function updateArrows() {
            const hasOverflow = navContainer.scrollWidth > navContainer.clientWidth;
            if (!hasOverflow) {
                arrowLeft.classList.remove('visible');
                arrowRight.classList.remove('visible');
                return;
            }

            arrowLeft.classList.add('visible');
            arrowRight.classList.add('visible');

            const scrollLeft = navContainer.scrollLeft;
            const scrollWidth = navContainer.scrollWidth;
            const clientWidth = navContainer.clientWidth;

            arrowLeft.classList.toggle('disabled', scrollLeft <= 0);
            arrowRight.classList.toggle('disabled', scrollLeft + clientWidth >= scrollWidth - 1); // -1 for precision issues
        }

        arrowLeft.addEventListener('click', () => {
            gsap.to(navContainer, { duration: 0.5, scrollTo: { x: 0 }, ease: 'power3.inOut' });
        });

        arrowRight.addEventListener('click', () => {
            gsap.to(navContainer, { duration: 0.5, scrollTo: { x: navContainer.scrollWidth }, ease: 'power3.inOut' });
        });

        navContainer.addEventListener('scroll', () => requestAnimationFrame(updateArrows));
        window.addEventListener('resize', updateArrows);
        
        // Initial check
        setTimeout(updateArrows, 100); // Timeout to allow layout to settle
    }

    function getFontAwesomeIcon(owmIconCode) {
        const mapping = {
            "01d": "fa-sun", "01n": "fa-moon",
            "02d": "fa-cloud-sun", "02n": "fa-cloud-moon",
            "03d": "fa-cloud", "03n": "fa-cloud",
            "04d": "fa-cloud", "04n": "fa-cloud",
            "09d": "fa-cloud-showers-heavy", "09n": "fa-cloud-showers-heavy",
            "10d": "fa-cloud-sun-rain", "10n": "fa-cloud-moon-rain",
            "11d": "fa-bolt", "11n": "fa-bolt",
            "13d": "fa-snowflake", "13n": "fa-snowflake",
            "50d": "fa-smog", "50n": "fa-smog"
        };
        return mapping[owmIconCode] || "fa-cloud";
    }

    function setupWeatherWidget(elementId, city, isHakkoda = false) { // Add isHakkoda param
        const weatherInfo = document.getElementById(elementId);
        if (!weatherInfo) return;

        const apiKey = '649511f2bb0e2d800703857f225002c8';
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=zh_tw`;

        // Show loading state, customize for Hakkoda
        let loadingIconClass = "fas fa-spinner fa-spin text-6xl text-blue-300";
        if (isHakkoda) {
            loadingIconClass = "fas fa-mountain text-5xl text-blue-300"; // Changed for smaller Hakkoda card
        }
        
        weatherInfo.innerHTML = `
            <i class="${loadingIconClass}"></i>
            <div>
                <div class="text-4xl font-bold text-slate-700">--°C</div>
                <div class="text-slate-500">讀取中...</div>
            </div>`;
        if (isHakkoda) { // Customize loading state for Hakkoda
            weatherInfo.querySelector('div').innerHTML = `
                <div class="text-3xl font-bold text-slate-700">約 --°C</div>
                <div class="text-xs text-slate-500">讀取中...</div>`;
        }


        fetch(url)
            .then(r => {
                if (!r.ok) throw new Error('Network response was not ok');
                return r.json();
            })
            .then(d => {
                let temp = d.main.temp;
                let description = d.weather[0].description;
                const iconCode = d.weather[0].icon;
                let faIcon = getFontAwesomeIcon(iconCode);
                
                let tempPrefix = "";
                let descSuffix = "";

                if (isHakkoda) {
                    temp = temp - 8; // Subtract 8 degrees for Hakkoda estimate
                    faIcon = "fa-snowflake"; // Or "fa-mountain-sun" if no snow
                    tempPrefix = "約 ";
                    descSuffix = "<div class='text-xs text-slate-500 mt-1'>山頂預估 / 比市區低8-10°C</div>";
                }

                // Adjust icon size for Hakkoda
                let iconSizeClass = isHakkoda ? "text-4xl" : "text-6xl"; // Changed icon size for smaller Hakkoda card
                
                weatherInfo.innerHTML = `
                    <i class="fas ${faIcon} ${iconSizeClass} text-blue-300"></i>
                    <div>
                        <div class="text-4xl font-bold text-slate-700">${tempPrefix}${Math.round(temp)}°C</div>
                        <div class="text-slate-500">${description}</div>
                        ${descSuffix}
                    </div>`;
                if (isHakkoda) { // Customize display for smaller Hakkoda card
                    weatherInfo.querySelector('div').innerHTML = `
                        <div id="hakkoda-weather-temp" class="text-3xl font-bold text-slate-700">${tempPrefix}${Math.round(temp)}°C</div>
                        <div class="text-xs text-slate-500">${description}</div>
                        ${descSuffix}`;
                    weatherInfo.querySelector('i').className = `fas ${faIcon} text-4xl text-blue-300`; // Icon size for Hakkoda
                }
            })
            .catch(() => {
                const retryButtonId = `retry-${elementId}`;
                let errorMessage = `<p class="text-slate-500 mb-2">${city}天氣讀取失敗</p>`;
                if (isHakkoda) {
                    errorMessage = `<p class="text-slate-500 text-xs mb-1">八甲田預估天氣讀取失敗</p>`;
                }

                weatherInfo.innerHTML = `
                    <div class="text-center w-full">
                        ${errorMessage}
                        <button id="${retryButtonId}" class="bg-orange-500 text-white py-1 px-4 rounded-full hover:bg-orange-600 transition-colors text-sm">重試</button>
                    </div>`;
                
                const retryButton = document.getElementById(retryButtonId);
                if (retryButton) {
                    retryButton.addEventListener('click', () => {
                        setupWeatherWidget(elementId, city, isHakkoda);
                    }, { once: true });
                }
            });
    }

    function getJmaIconAndLabel(code) {
        if (JMA_CODE_MAP[code]) return JMA_CODE_MAP[code];
        const first = String(code).charAt(0);
        if (first === '1') return ['fa-sun', '晴'];
        if (first === '2') return ['fa-cloud', '多雲'];
        if (first === '3') return ['fa-cloud-rain', '雨'];
        if (first === '4') return ['fa-snowflake', '雪'];
        return ['fa-cloud-sun', '天氣多變'];
    }

    function formatIsoDate(dateObj) {
        const y = dateObj.getFullYear();
        const m = String(dateObj.getMonth() + 1).padStart(2, '0');
        const d = String(dateObj.getDate()).padStart(2, '0');
        return `${y}-${m}-${d}`;
    }

    function formatWeatherDateLabel(dateStr) {
        const [y, m, d] = dateStr.split('-').map(Number);
        const dt = new Date(y, m - 1, d);
        const week = ['日', '一', '二', '三', '四', '五', '六'][dt.getDay()];
        return `${m}/${d} (${week})`;
    }

    // 把單一地點的 JMA 原始資料整理成 7 天的 [{date, label, iconClass, tempMax, tempMin, pop, reliability}] 陣列
    function buildWeeklyForecast(location, blocks) {
        if (!blocks || !blocks[1]) return [];

        const weeklyBlock = blocks[1];
        const weeklySeries = (weeklyBlock.timeSeries || []).find(ts => ts.areas.some(a => a.weatherCodes));
        const tempSeries = (weeklyBlock.timeSeries || []).find(ts => ts.areas.some(a => a.tempsMax));
        if (!weeklySeries) return [];

        const areaWeather = weeklySeries.areas.find(a => a.area.code === location.weeklyArea);
        if (!areaWeather) return [];
        const areaTemp = tempSeries ? tempSeries.areas.find(a => a.area.code === location.tempCity) : null;

        // 短期預報 (block 0) 有較貼近實況的文字描述，日期重疊時優先使用；
        // 週間預報的第一天（明天）氣溫/降雨機率經常是空的，改從短期預報回填。
        const shortTextByDate = {};
        const shortTempByDate = {};
        const shortPopByDate = {};
        const shortDates = new Set(); // 短期預報（今日・明日・明後日）實際涵蓋到的日期
        const shortBlock = blocks[0];
        if (shortBlock) {
            const reportDate = (shortBlock.reportDatetime || '').slice(0, 10);

            const codeSeries = (shortBlock.timeSeries || []).find(ts => ts.areas.some(a => a.weatherCodes));
            if (codeSeries) {
                const areaData = codeSeries.areas.find(a => a.area.code === location.shortArea);
                if (areaData && areaData.weathers) {
                    codeSeries.timeDefines.forEach((t, i) => {
                        const d = t.slice(0, 10);
                        if (areaData.weathers[i]) {
                            shortTextByDate[d] = areaData.weathers[i].replace(/\s+/g, '');
                            shortDates.add(d);
                        }
                    });
                }
            }

            // temps 陣列固定只涵蓋「今天／明天」，00 時=當天最低、09 時=當天最高
            const tempSeriesShort = (shortBlock.timeSeries || []).find(ts => ts.areas.some(a => a.temps));
            if (tempSeriesShort) {
                const areaT = tempSeriesShort.areas.find(a => a.area.code === location.tempCity);
                if (areaT && areaT.temps) {
                    tempSeriesShort.timeDefines.forEach((t, i) => {
                        const date = t.slice(0, 10);
                        const val = areaT.temps[i];
                        if (date === reportDate || !val) return;
                        if (!shortTempByDate[date]) shortTempByDate[date] = {};
                        if (t.slice(11, 13) === '00') shortTempByDate[date].min = val;
                        else shortTempByDate[date].max = val;
                    });
                }
            }

            // pops 是每 6 小時一筆，同一天取最大值當作當天代表降雨機率
            const popSeriesShort = (shortBlock.timeSeries || []).find(ts => ts.areas.some(a => a.pops) && ts !== codeSeries);
            if (popSeriesShort) {
                const areaP = popSeriesShort.areas.find(a => a.area.code === location.shortArea);
                if (areaP && areaP.pops) {
                    popSeriesShort.timeDefines.forEach((t, i) => {
                        const date = t.slice(0, 10);
                        const val = areaP.pops[i];
                        if (date === reportDate || val === '' || val == null) return;
                        const num = Number(val);
                        if (shortPopByDate[date] === undefined || num > shortPopByDate[date]) shortPopByDate[date] = num;
                    });
                }
            }
        }

        const todayStr = formatIsoDate(new Date());

        return weeklySeries.timeDefines.map((t, idx) => {
            const date = t.slice(0, 10);
            const isPast = date < todayStr;
            const source = shortDates.has(date) ? 'short' : 'weekly';
            const code = areaWeather.weatherCodes[idx];
            const hasCode = code && code !== '';
            const [iconClass, codeLabel] = hasCode ? getJmaIconAndLabel(code) : [null, null];
            const label = shortTextByDate[date] || codeLabel;

            let pop = areaWeather.pops ? (areaWeather.pops[idx] || '') : '';
            if (pop === '' && shortPopByDate[date] !== undefined) pop = String(shortPopByDate[date]);

            let reliability = areaWeather.reliabilities ? (areaWeather.reliabilities[idx] || '') : '';

            let tempMax = '', tempMin = '';
            if (areaTemp) {
                tempMax = areaTemp.tempsMax[idx] || '';
                tempMin = areaTemp.tempsMin[idx] || '';
            }
            if ((tempMax === '' || tempMin === '') && shortTempByDate[date]) {
                if (tempMax === '' && shortTempByDate[date].max) tempMax = shortTempByDate[date].max;
                if (tempMin === '' && shortTempByDate[date].min) tempMin = shortTempByDate[date].min;
            }
            if (location.tempOffset) {
                if (tempMax !== '') tempMax = String(Math.round(Number(tempMax) + location.tempOffset));
                if (tempMin !== '') tempMin = String(Math.round(Number(tempMin) + location.tempOffset));
            }

            return { date, label, iconClass, tempMax, tempMin, pop, reliability, available: hasCode, isPast, source };
        });
    }

    function renderWeatherLocationCard(location, days) {
        const firstAvailable = days.find(d => d.available && !d.isPast);
        const summary = firstAvailable
            ? `${firstAvailable.label}　${firstAvailable.tempMax !== '' ? firstAvailable.tempMax + '°/' + firstAvailable.tempMin + '°' : ''}`
            : '預報尚未公布';

        const boxes = days.map(d => {
            if (d.isPast) {
                return `
                <div class="weather-day-box rounded-xl border border-slate-100 bg-slate-100 p-1.5 sm:p-3 text-center opacity-50">
                    <div class="text-[10px] sm:text-xs font-bold text-slate-400">${formatWeatherDateLabel(d.date)}</div>
                    <i class="fas fa-clock text-base sm:text-xl text-slate-300 my-1.5 sm:my-2"></i>
                    <div class="text-[9px] sm:text-[10px] text-slate-400 leading-tight">已過</div>
                </div>`;
            }
            if (!d.available) {
                return `
                <div class="weather-day-box rounded-xl border border-slate-100 bg-slate-50 p-1.5 sm:p-3 text-center">
                    <div class="text-[10px] sm:text-xs font-bold text-slate-400">${formatWeatherDateLabel(d.date)}</div>
                    <i class="fas fa-hourglass-half text-base sm:text-xl text-slate-300 my-1.5 sm:my-2"></i>
                    <div class="text-[9px] sm:text-[10px] text-slate-300 leading-tight">尚未公布</div>
                </div>`;
            }
            const reliabilityBadge = d.reliability ? `<div class="text-[9px] sm:text-[10px] text-slate-300 mt-1">可信度 ${d.reliability}</div>` : '';
            const sourceBadge = d.source === 'short'
                ? `<span class="absolute top-1 right-1 text-[8px] sm:text-[9px] leading-none px-1 py-0.5 rounded bg-emerald-100 text-emerald-600">短期</span>`
                : `<span class="absolute top-1 right-1 text-[8px] sm:text-[9px] leading-none px-1 py-0.5 rounded bg-amber-100 text-amber-600">週間</span>`;
            return `
            <div class="weather-day-box relative rounded-xl border border-blue-100 bg-blue-50/50 p-1.5 sm:p-3 text-center">
                ${sourceBadge}
                <div class="text-[10px] sm:text-xs font-bold text-slate-600">${formatWeatherDateLabel(d.date)}</div>
                <i class="fas ${d.iconClass} text-lg sm:text-2xl text-blue-400 my-1.5 sm:my-2"></i>
                <div class="text-[9px] sm:text-[11px] text-slate-500 leading-tight mb-1 sm:mb-1.5 min-h-[2.2em] flex items-center justify-center">${d.label}</div>
                <div class="text-xs sm:text-sm font-bold whitespace-nowrap">
                    ${d.tempMax !== '' ? `<span class="text-red-500">${d.tempMax}°</span>` : ''}${d.tempMin !== '' ? `<span class="text-blue-500"> / ${d.tempMin}°</span>` : ''}
                </div>
                ${d.pop !== '' ? `<div class="text-[9px] sm:text-[11px] text-sky-500 mt-1"><i class="fas fa-tint mr-0.5"></i>${d.pop}%</div>` : ''}
                ${reliabilityBadge}
            </div>`;
        }).join('');

        return `
        <div class="weather-loc-card border border-slate-100 rounded-xl overflow-hidden">
            <button type="button" class="weather-loc-toggle w-full flex items-center justify-between gap-3 p-3 sm:p-4 bg-slate-50 hover:bg-slate-100 transition-colors text-left">
                <span class="flex items-center gap-2 sm:gap-3">
                    <i class="fas ${location.icon} text-blue-500 w-5 text-center"></i>
                    <span class="font-bold text-slate-700 text-sm sm:text-base">${location.name}</span>
                </span>
                <span class="flex items-center gap-2 sm:gap-3">
                    <span class="text-xs text-slate-400">${summary}</span>
                    <i class="fas fa-chevron-down text-slate-400 transition-transform weather-loc-chevron text-xs"></i>
                </span>
            </button>
            <div class="weather-loc-body hidden px-3 sm:px-4 pb-3 sm:pb-4 pt-3">
                ${location.note ? `<p class="text-[11px] text-slate-400 mb-2">${location.note}</p>` : ''}
                <div class="grid grid-cols-7 gap-1.5 sm:gap-3">${boxes}</div>
            </div>
        </div>`;
    }

    function setupWeatherLocations() {
        const container = document.getElementById('weather-locations');
        if (!container) return;

        container.innerHTML = WEATHER_LOCATIONS.map(loc => `
            <div class="border border-slate-100 rounded-xl p-4 flex items-center gap-3">
                <i class="fas fa-spinner fa-spin text-slate-300"></i>
                <span class="text-sm text-slate-500">${loc.name} 讀取中...</span>
            </div>`).join('');

        const prefCodes = [...new Set(WEATHER_LOCATIONS.map(l => l.prefCode))];
        const fetches = prefCodes.map(code =>
            fetch(`https://www.jma.go.jp/bosai/forecast/data/forecast/${code}.json`)
                .then(r => { if (!r.ok) throw new Error('JMA fetch failed'); return r.json(); })
                .then(data => ({ code, data }))
                .catch(() => ({ code, data: null }))
        );

        Promise.all(fetches).then(results => {
            const byPref = {};
            results.forEach(r => { byPref[r.code] = r.data; });

            container.innerHTML = WEATHER_LOCATIONS.map(loc => {
                const days = buildWeeklyForecast(loc, byPref[loc.prefCode]);
                return renderWeatherLocationCard(loc, days);
            }).join('');

            container.querySelectorAll('.weather-loc-toggle').forEach(btn => {
                btn.addEventListener('click', () => {
                    const body = btn.nextElementSibling;
                    const chevron = btn.querySelector('.weather-loc-chevron');
                    body.classList.toggle('hidden');
                    chevron.classList.toggle('rotate-180');
                });
            });
        });
    }

    function setupAnimations() {
        const heroTitle = document.getElementById('hero-title');
        const text = heroTitle.innerText;
        heroTitle.innerHTML = '';
        text.split('').forEach(char => {
            const span = document.createElement('span');
            span.className = 'char';
            span.innerText = char === ' ' ? '\u00A0' : char;
            heroTitle.appendChild(span);
        });

        gsap.from(heroTitle.querySelectorAll('.char'), {
            duration: 1.2,
            y: 100,
            autoAlpha: 0,
            stagger: 0.05,
            ease: "back.out(1.7)"
        });

        gsap.from("#hero-subtitle", {
            duration: 1,
            y: 30,
            opacity: 0,
            ease: "power3.out",
            delay: 1
        });
        
        gsap.utils.toArray('.card-hover, .tool-card').forEach(card => {
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: "top 90%",
                    toggleActions: "play none none none"
                },
                opacity: 0,
                y: 50,
                duration: 0.8,
                ease: "power3.out"
            })
        });
    }

    function setupInteractiveForeground() {
        const canvas = document.getElementById('interactive-foreground');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let particles = [];

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = document.querySelector('.hero-header').offsetHeight;
        }
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Autumn color palette for the leaves (red, orange, yellow, brown-orange)
        const autumnColors = [
            'rgba(217, 83, 79,',  // Red
            'rgba(240, 173, 78,', // Orange
            'rgba(255, 204, 0,',  // Yellow
            'rgba(188, 70, 1,',   // Brownish Orange
        ];

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 10 + 8; // Slightly larger leaves
                this.speedY = Math.random() * 0.8 + 0.4;
                this.speedX = Math.random() * 0.5 - 0.25;
                this.opacity = Math.random() * 0.6 + 0.4;
                this.angle = Math.random() * Math.PI * 2;
                this.spin = (Math.random() > 0.5 ? 0.01 : -0.01) * 0.7; // Slower spin
                this.color = autumnColors[Math.floor(Math.random() * autumnColors.length)];
            }
            update() {
                this.y += this.speedY;
                this.x += this.speedX;
                this.angle += this.spin;
                // Add a gentle horizontal sway
                this.x += Math.sin(this.y / 50) * 0.2;

                if (this.y > canvas.height + this.size) {
                    this.y = -this.size;
                    this.x = Math.random() * canvas.width;
                }
            }
            draw() {
                ctx.save();
                ctx.translate(this.x, this.y);
                ctx.rotate(this.angle);
                ctx.font = `${this.size}px Arial`;
                ctx.fillStyle = `${this.color} ${this.opacity})`;
                ctx.fillText('🍁', 0, 0); // Changed to maple leaf emoji
                ctx.restore();
            }
        }

        function initParticles() {
            particles = []; // Clear existing particles
            for (let i = 0; i < 40; i++) { // Slightly more particles
                particles.push(new Particle());
            }
        }

        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            requestAnimationFrame(animateParticles);
        }
        initParticles();
        animateParticles();
    }

    function setupCountdown() {
        const targetDate = new Date('2026-09-08T00:00:00').getTime();
        const countdownElement = document.getElementById('countdown');
        if (!countdownElement) return;

        const interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = targetDate - now;

            if (distance < 0) {
                clearInterval(interval);
                countdownElement.innerHTML = "<div class='col-span-4 text-2xl font-bold text-pink-600'>旅程已開始！</div>";
                return;
            }
            
            document.getElementById('days').innerText = Math.floor(distance / (1000 * 60 * 60 * 24)).toString().padStart(2, '0');
            document.getElementById('hours').innerText = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, '0');
            document.getElementById('minutes').innerText = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
            document.getElementById('seconds').innerText = Math.floor((distance % (1000 * 60)) / 1000).toString().padStart(2, '0');
        }, 1000);
    }
    
    // --- HELPER TO BUILD HTML FROM STRUCTURED CONTENT ---
    function buildContentHtml(content) {
        if (!content) return '';
        let html = '';

        if (content.description) {
            html += `<p>${content.description}</p>`;
        }

        if (content.transport) {
            html += `<p class='mt-3 text-sm'><strong>交通方式：</strong> ${content.transport}</p>`;
        }

        if (content.subsections && content.subsections.length > 0) {
            html += '<div class="mt-4 space-y-4">';
            content.subsections.forEach(sub => {
                html += `<div><h4 class='font-semibold text-slate-800'>${sub.title}</h4>`;
                if (sub.description) {
                    html += `<p class='text-sm text-slate-600 mt-1'>${sub.description}</p>`;
                }
                if (sub.links && sub.links.length > 0) {
                    html += '<ul class="list-disc list-inside mt-2 text-sm space-y-1">';
                    sub.links.forEach(link => {
                        html += `<li><a href='${link.url}' target='_blank' class='text-blue-500 hover:underline'>${link.text}</a></li>`;
                    });
                    html += '</ul>';
                }
                html += '</div>';
            });
            html += '</div>';
        }

        if (content.links && content.links.length > 0) {
            html += '<div class="mt-4 pt-4 border-t border-gray-200"><h4 class="font-semibold text-slate-800">相關連結</h4><ul class="list-disc list-inside mt-2 text-sm space-y-1">';
            content.links.forEach(link => {
                html += `<li class='flex items-start'><i class='${link.icon || "fas fa-link"} mt-1 mr-3 text-sky-500'></i><a href='${link.url}' target='_blank' class='text-blue-500 hover:underline'>${link.text}</a></li>`;
            });
            html += '</ul></div>';
        }
        
        if (content.special) {
            html += `<details class='mt-2 text-sm'><summary class='font-semibold'>${content.special.summary}</summary>${content.special.content}</details>`;
        }

        return html;
    }

    // --- LAZY LOADING FOR BACKGROUND IMAGES ---
    function setupLazyBackgroundImages() {
        const lazyBackgrounds = document.querySelectorAll('.daily-theme-card');

        if ('IntersectionObserver' in window) {
            let lazyBackgroundObserver = new IntersectionObserver(function(entries, observer) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        let card = entry.target;
                        let imageUrl = card.dataset.bgSrc;
                        if (imageUrl) {
                            // Add a class to indicate loading is complete (optional, for styling)
                            card.classList.add('bg-loaded');
                            card.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('${imageUrl}')`;
                        }
                        lazyBackgroundObserver.unobserve(card);
                    }
                });
            }, {
                rootMargin: '0px 0px 100px 0px', // Load image when it's 100px from viewport
                threshold: 0.01 // Trigger once just a small part is visible
            });

            lazyBackgrounds.forEach(function(card) {
                lazyBackgroundObserver.observe(card);
            });
        } else {
            // Fallback for browsers that don't support Intersection Observer
            lazyBackgrounds.forEach(function(card) {
                let imageUrl = card.dataset.bgSrc;
                if (imageUrl) {
                    card.classList.add('bg-loaded'); // Add class even for fallback
                    card.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('${imageUrl}')`;
                }
            });
        }
    }


        function generateDailySections() {
            let allSectionsHtml = '';
            const createCardHtml = (planData) => {
                const highlightsHtml = planData.highlights ? `
                            <div class="mt-4 flex flex-wrap justify-center items-center gap-x-6 gap-y-2 text-sm text-white/90" style="text-shadow: 1px 1px 4px rgba(0,0,0,0.5);">
                                ${planData.highlights.map(h => `
                                    <span class="flex items-center"><i class="fas ${h.icon} mr-2"></i>${h.text}</span>
                                `).join('')}
                            </div>
                        ` : '';
    
                const timelineHtml = planData.items.map(item => `
                            <div class="timeline-item relative mb-8">
                                <div class="icon"><i class="fas ${item.icon}"></i></div>
                                <div class="ml-10 sm:ml-8 bg-white rounded-lg shadow-md overflow-hidden card-hover">
                                    <div class="p-4">
                                        <h3 class="text-base sm:text-lg font-bold text-orange-700">${item.time} | ${item.title}</h3>
                                    </div>
                                    <div class="p-4 bg-gray-50 border-t border-gray-100 text-slate-600">${buildContentHtml(item.content)}</div>
                                </div>
                            </div>
                        `).join('');
    
                return `
                            <div class="daily-theme-card relative rounded-2xl shadow-xl overflow-hidden p-8 md:p-12 text-white flex flex-col justify-center items-center text-center min-h-[300px] mb-12" data-bg-src="${planData.themeImage}" style="background-image: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5));">
                                <h2 class="text-3xl sm:text-4xl font-black mb-2" style="text-shadow: 2px 2px 8px rgba(0,0,0,0.7);">${planData.title}</h2>
                                ${highlightsHtml}
                                <button class="view-timeline-btn mt-6 bg-orange-600 text-white py-2 px-6 rounded-full shadow-lg hover:bg-orange-700 transition-transform hover:scale-105 flex items-center justify-center">查看詳細行程 <i class="fas fa-chevron-down ml-2"></i></button>
                            </div>
                            <div class="timeline-container hidden relative pl-10 sm:pl-12">
                                <div class="timeline-line"></div>
                                <div class="timeline-line-progress"></div>
                                ${timelineHtml}
                            </div>
                        `;
            };
    
            for (const dayId in itineraryData) {
                const dayData = itineraryData[dayId];
                if (dayData.choices && Array.isArray(dayData.choices)) {
                    let multipleCardsHtml = '<div class="grid grid-cols-1 gap-12">';
                    multipleCardsHtml += dayData.choices.map(planData => {
                        return createCardHtml(planData).replace(' mb-12', '');
                    }).join('');
                    multipleCardsHtml += '</div>';
                    allSectionsHtml += `<section id="${dayId}" class="content-section" style="display: none; opacity: 0;">${multipleCardsHtml}</section>`;
                } else {
                    const singleCardHtml = createCardHtml(dayData);
                    allSectionsHtml += `<section id="${dayId}" class="content-section" style="display: none; opacity: 0;">${singleCardHtml}</section>`;
                }
            }
            dailySectionsContainer.innerHTML = allSectionsHtml;
    
            document.querySelectorAll('.view-timeline-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const button = e.currentTarget;
                    const timeline = button.closest('.daily-theme-card').nextElementSibling;
                    if (!timeline || !timeline.classList.contains('timeline-container')) return;
    
                    const isOpening = timeline.classList.contains('hidden');
    
                    document.querySelectorAll('.timeline-container:not(.hidden)').forEach(openTimeline => {
                        if (openTimeline !== timeline) {
                            openTimeline.classList.add('hidden');
                            const openButton = openTimeline.previousElementSibling.querySelector('.view-timeline-btn');
                            if (openButton) {
                                openButton.innerHTML = '查看詳細行程 <i class="fas fa-chevron-down ml-2"></i>';
                            }
                        }
                    });
    
                    if (isOpening) {
                        timeline.classList.remove('hidden');
                        button.innerHTML = '隱藏詳細行程 <i class="fas fa-chevron-up ml-2"></i>';
                        setTimeout(() => {
                            ScrollTrigger.refresh();
                            gsap.from(timeline.querySelectorAll('.timeline-item'), {
                                opacity: 0,
                                x: -50,
                                stagger: 0.2,
                                duration: 0.8,
                                ease: "power3.out"
                            });
                            gsap.to(timeline.querySelector('.timeline-line-progress'), {
                                scrollTrigger: {
                                    trigger: timeline,
                                    start: "top center",
                                    end: "bottom bottom",
                                    scrub: true
                                },
                                height: "100%"
                            });
                            gsap.to(window, {
                                duration: 0.8,
                                ease: 'power3.inOut',
                                scrollTo: {
                                    y: timeline,
                                    offsetY: 100
                                }
                            });
                        }, 10);
                    } else {
                        gsap.to(window, {
                            duration: 0.5,
                            ease: 'power3.inOut',
                            scrollTo: {
                                y: button.closest('.daily-theme-card'),
                                offsetY: 100
                            },
                            onComplete: () => {
                                gsap.to(timeline, {
                                    duration: 0.4,
                                    opacity: 0,
                                    ease: 'power2.in',
                                    onComplete: () => {
                                        timeline.classList.add('hidden');
                                        timeline.style.opacity = 1;
                                        button.innerHTML = '查看詳細行程 <i class="fas fa-chevron-down ml-2"></i>';
                                    }
                                });
                            }
                        });
                    }
                });
            });
        }
    function setupTabSwitching() {
        let isAnimating=false;
        const navContainer = document.getElementById('nav-container');
        const navButtons = document.querySelectorAll('.nav-btn');

        navButtons.forEach(button=>{
            button.addEventListener('click',()=>{
                const targetId=button.dataset.target;
                if(!isAnimating&&targetId!==currentActiveSectionId){
                    isAnimating=true;
                    switchTab(targetId,true,()=>{isAnimating=false});

                    // Scroll the container to center the button
                    const containerWidth = navContainer.offsetWidth;
                    const buttonWidth = button.offsetWidth;
                    const buttonLeft = button.offsetLeft;

                    gsap.to(navContainer, {
                        duration: 0.5,
                        scrollTo: { 
                            x: buttonLeft - (containerWidth / 2) + (buttonWidth / 2),
                            autoKill: false // Prevent user scroll from interrupting the animation
                        },
                        ease: "power3.inOut"
                    });
                }
            })
        });
    }

    function switchTab(targetId, shouldScroll = true, onCompleteCallback = () => {}) {
         const oldSection = currentActiveSectionId ? document.getElementById(currentActiveSectionId) : null;
         const newSection = document.getElementById(targetId);
         const navButtons = document.querySelectorAll('.nav-btn');
         if (!newSection) return;
         const tl = gsap.timeline({
             onComplete: () => {
                 currentActiveSectionId = targetId;
                 ScrollTrigger.refresh();
                 onCompleteCallback()
             }
         });
         if (oldSection) {
             tl.to(oldSection, {
                 duration: 0.3,
                 opacity: 0,
                 ease: 'power2.in',
                 onComplete: () => {
                     oldSection.style.display = 'none'
                 }
             });
         }
         tl.add(() => {
             navButtons.forEach(btn => {
                 const isTarget = btn.dataset.target === targetId;
                 btn.classList.toggle('bg-orange-500', isTarget);
                 btn.classList.toggle('text-white', isTarget);
                 btn.classList.toggle('bg-orange-100', !isTarget);
                 btn.classList.toggle('text-orange-800', !isTarget);
                 if (isTarget) {
                    btn.setAttribute('aria-current', 'page');
                 } else {
                    btn.removeAttribute('aria-current');
                 }
             })
         });
         tl.set(newSection, {
             display: 'block',
             opacity: 0
         }).to(newSection, {
             duration: 0.4,
             opacity: 1,
             ease: 'power2.out'
         });
         if (shouldScroll) {
             tl.to(window, {
                 duration: 0.8,
                 ease: 'power2.inOut',
                 scrollTo: {
                     y: newSection,
                     offsetY: document.querySelector('nav').offsetHeight + 32
                 }
             }, "-=0.2")
         }
    }

    function setupScrollToTop() {
        const btn = document.getElementById('scrollToTopBtn');
        if (btn) {
            window.addEventListener('scroll', () => {
                const isVisible = window.scrollY > 300;
                btn.classList.toggle('opacity-0', !isVisible);
                btn.classList.toggle('invisible', !isVisible)
            });
            btn.addEventListener('click', () => window.scrollTo({
                top: 0,
                behavior: 'smooth'
            }))
        }
    }

    function setupToolkitCardHover() {
        document.querySelectorAll('.tool-card').forEach(card => {
            card.addEventListener('mousemove', e => {
                const rect = card.getBoundingClientRect();
                card.style.setProperty('--x', `${e.clientX - rect.left}px`);
                card.style.setProperty('--y', `${e.clientY - rect.top}px`)
            })
        });
    }

    function setupDragAndDrop() {
        const dayButtons = document.querySelectorAll('.nav-btn:not([data-target="overview"])');
        dayButtons.forEach(button => {
            button.setAttribute('draggable', 'true');
            button.addEventListener('dragstart', (e) => {
                draggedButton = button;
                e.dataTransfer.setData('text/plain', button.dataset.target);
                e.dataTransfer.effectAllowed = 'move';
                const clone = button.cloneNode(true);
                clone.id = 'drag-ghost';
                clone.style.position = 'absolute';
                clone.style.top = '-9999px';
                clone.style.left = '-9999px';
                const style = window.getComputedStyle(button);
                clone.style.width = style.getPropertyValue('width');
                clone.style.height = style.getPropertyValue('height');
                document.body.appendChild(clone);
                e.dataTransfer.setDragImage(clone, clone.offsetWidth / 2, clone.offsetHeight / 2);
                setTimeout(() => button.classList.add('dragging'), 0);
            });
            button.addEventListener('dragend', (e) => {
                if (draggedButton) { draggedButton.classList.remove('dragging'); }
                draggedButton = null;
                const ghost = document.getElementById('drag-ghost');
                if (ghost) { ghost.parentNode.removeChild(ghost); }
            });
            button.addEventListener('dragover', (e) => { e.preventDefault(); const targetButton = e.currentTarget; if (targetButton !== draggedButton) { targetButton.classList.add('drag-over'); } });
            button.addEventListener('dragleave', (e) => { e.currentTarget.classList.remove('drag-over'); });
            button.addEventListener('drop', (e) => {
                e.preventDefault();
                const targetButton = e.currentTarget;
                targetButton.classList.remove('drag-over');
                const sourceButton = draggedButton;
                if (!sourceButton || sourceButton === targetButton) { return; }
                const sourceDayId = sourceButton.dataset.target;
                const targetDayId = targetButton.dataset.target;
                const sourceRect = sourceButton.getBoundingClientRect();
                const targetRect = targetButton.getBoundingClientRect();
                const xDiff = sourceRect.left - targetRect.left;
                const tl = gsap.timeline({
                    onComplete: () => {
                        gsap.set([sourceButton, targetButton], { clearProps: "transform,zIndex" });
                        const tempData = itineraryData[sourceDayId];
                        itineraryData[sourceDayId] = itineraryData[targetDayId];
                        itineraryData[targetDayId] = tempData;
                        generateDailySections();
                        switchTab(currentActiveSectionId, false);
                    }
                });
                gsap.set(sourceButton, { zIndex: 100 });
                tl.to(sourceButton, { x: -xDiff, duration: 0.4, ease: 'power2.inOut' }, 0).to(targetButton, { x: xDiff, duration: 0.4, ease: 'power2.inOut' }, 0);
            });
        });
    }

    window.addEventListener('load', () => {
        document.querySelector('.preloader')?.classList.add('hidden');
        document.body.classList.add('loaded');
        switchTab('overview', false);
    });
});

// ✨ NEW/MODIFIED: 3D Sakura Background Script
function setupThreeJSSakuraBackground() {
    const canvas = document.getElementById('sakura-background-canvas');
    if (!canvas) return;

    const scene = new THREE.Scene();
    scene.background = null; // Transparent background

    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 0, 8);

    const renderer = new THREE.WebGLRenderer({ 
        canvas: canvas,
        antialias: true, 
        alpha: true // Enable transparency
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffe6eb, 0.7);
    scene.add(ambientLight);
    const sunLight = new THREE.DirectionalLight(0xffd1dc, 1.5);
    sunLight.position.set(5, 10, 7);
    scene.add(sunLight);
    const rimLight = new THREE.SpotLight(0xff69b4, 2.5);
    rimLight.position.set(-5, 8, -5);
    rimLight.lookAt(0, 0, 0);
    scene.add(rimLight);
    const bounceLight = new THREE.PointLight(0xffc2d1, 1, 20);
    bounceLight.position.set(0, -5, 2);
    scene.add(bounceLight);

    function createRealPetalGeometry() {
        const shape = new THREE.Shape();
        shape.moveTo(0, 0); 
        shape.bezierCurveTo(0.3, 0.1, 0.5, 0.6, 0.4, 1.0);
        shape.lineTo(0.1, 0.88);
        shape.lineTo(-0.1, 0.88);
        shape.bezierCurveTo(-0.4, 1.0, -0.5, 0.6, 0, 0);
        const geometry = new THREE.ShapeGeometry(shape, 10);
        const posAttribute = geometry.attributes.position;
        const vertexCount = posAttribute.count;
        const colors = [];
        const centerColor = new THREE.Color(0xff5e8e); 
        const edgeColor = new THREE.Color(0xffcdda);   
        for (let i = 0; i < vertexCount; i++) {
            const x = posAttribute.getX(i);
            const y = posAttribute.getY(i);
            const z = posAttribute.getZ(i);
            const newZ = z + (x * x * 0.8) + (Math.sin(y * 2.0) * 0.15);
            posAttribute.setZ(i, newZ);
            const alpha = Math.max(0, Math.min(1, y / 1.05));
            const mixFactor = alpha * alpha; 
            const mixedColor = centerColor.clone().lerp(edgeColor, mixFactor);
            colors.push(mixedColor.r, mixedColor.g, mixedColor.b);
        }
        geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
        geometry.computeVertexNormals();
        geometry.translate(0, -0.1, 0);
        return geometry;
    }

    const petalGeometry = createRealPetalGeometry();

    const petalMaterial = new THREE.MeshPhysicalMaterial({
        vertexColors: true,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.98,
        roughness: 0.35,
        metalness: 0.0,
        clearcoat: 0.3,
        clearcoatRoughness: 0.2,
        transmission: 0.15,
        thickness: 0.2,
        emissive: 0x330011, 
        emissiveIntensity: 0.2
    });

    // --- ✨ Re-added: Main Flower ---
    const sakuraGroup = new THREE.Group();
    for (let i = 0; i < 5; i++) {
        const petal = new THREE.Mesh(petalGeometry, petalMaterial);
        petal.castShadow = true;
        petal.receiveShadow = true;
        const angle = (i / 5) * Math.PI * 2;
        const wrapper = new THREE.Group();
        wrapper.rotation.z = angle;
        petal.position.set(0, 0.25, 0); 
        petal.rotation.x = 0.35; 
        wrapper.add(petal);
        sakuraGroup.add(wrapper);
    }

    function createStamens() {
        const stamenGroup = new THREE.Group();
        const filamentMat = new THREE.LineBasicMaterial({ color: 0xff6b88 }); 
        const antherGeom = new THREE.SphereGeometry(0.035, 8, 8);
        const antherMat = new THREE.MeshStandardMaterial({ color: 0xffd000, roughness: 0.5 });
        for(let i=0; i<18; i++) {
            const height = 0.25 + Math.random() * 0.15;
            const angle = Math.random() * Math.PI * 2;
            const radius = 0.08 + Math.random() * 0.06;
            const points = [];
            points.push(new THREE.Vector3(radius * Math.cos(angle) * 0.5, radius * Math.sin(angle) * 0.5, 0.05));
            points.push(new THREE.Vector3((radius + 0.1) * Math.cos(angle), (radius + 0.1) * Math.sin(angle), height));
            const lineGeom = new THREE.BufferGeometry().setFromPoints(points);
            const filament = new THREE.Line(lineGeom, filamentMat);
            stamenGroup.add(filament);
            const anther = new THREE.Mesh(antherGeom, antherMat);
            anther.position.set((radius + 0.1) * Math.cos(angle), (radius + 0.1) * Math.sin(angle), height);
            stamenGroup.add(anther);
        }
        stamenGroup.position.z = 0.05;
        return stamenGroup;
    }
    const stamens = createStamens();
    sakuraGroup.add(stamens);
    sakuraGroup.rotation.x = 0.5;
    sakuraGroup.scale.set(0, 0, 0);
    scene.add(sakuraGroup);


    // --- Sakura Rain ---
    const PARTICLE_COUNT = 350;
    const instancedPetals = new THREE.InstancedMesh(petalGeometry, petalMaterial, PARTICLE_COUNT);
    
    const dummy = new THREE.Object3D();
    const particlesData = [];
    const rangeX = 30;
    const rangeY = 25;
    const rangeZ = 15;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
        const x = (Math.random() - 0.5) * rangeX;
        const y = (Math.random() - 0.5) * rangeY;
        const z = (Math.random() - 0.5) * rangeZ;

        dummy.position.set(x, y, z);
        dummy.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
        const scale = 0.4 + Math.random() * 0.5;
        dummy.scale.set(scale, scale, scale);
        dummy.updateMatrix();
        instancedPetals.setMatrixAt(i, dummy.matrix);

        particlesData.push({
            position: new THREE.Vector3(x, y, z),
            rotation: new THREE.Euler(Math.random(), Math.random(), Math.random()),
            tumbleSpeed: { x: Math.random() * 0.03 + 0.01, y: Math.random() * 0.03 + 0.01, z: Math.random() * 0.01 },
            fallSpeed: 0.015 + Math.random() * 0.025,
            swayAmplitude: 0.02 + Math.random() * 0.03,
            swayFrequency: 0.8 + Math.random() * 1.5,
            timeOffset: Math.random() * 100
        });
    }
    instancedPetals.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    scene.add(instancedPetals);

    // --- Interaction & Animation ---
    let mouseX = 0, mouseY = 0;
    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    });

    // ✨ Re-added: GSAP animation for the main flower on load
    const tl = gsap.timeline({ delay: 1 }); // Delay to let page load
    tl.to(sakuraGroup.scale, { x: 1.8, y: 1.8, z: 1.8, duration: 2.2, ease: "elastic.out(1, 0.75)" })
      .to(sakuraGroup.rotation, { y: -0.4, duration: 2.5, ease: "power2.out" }, "<");

    const clock = new THREE.Clock();

    function animate() {
        requestAnimationFrame(animate);
        const time = clock.getElapsedTime();

        // ✨ Re-added: Main flower dynamics
        sakuraGroup.rotation.z += 0.0008; 
        const targetRotateY = mouseX * 0.25;
        const targetRotateX = mouseY * 0.15;
        sakuraGroup.rotation.y += (targetRotateY - sakuraGroup.rotation.y - 0.4) * 0.04;
        sakuraGroup.rotation.x += (targetRotateX - sakuraGroup.rotation.x + 0.5) * 0.04;

        // Sakura Rain Dynamics
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            const data = particlesData[i];
            data.position.y -= data.fallSpeed;
            
            const noise = Math.sin(data.timeOffset + time) * 0.01;
            const wind = Math.sin(time * 0.4 + data.position.y * 0.08) * 0.015 + (mouseX * 0.04) + noise;
            
            data.position.x += wind + Math.sin(time * data.swayFrequency + data.timeOffset) * data.swayAmplitude;
            data.position.z += Math.cos(time * 0.2 + data.timeOffset) * 0.005;

            data.rotation.x += data.tumbleSpeed.x;
            data.rotation.y += data.tumbleSpeed.y;
            data.rotation.z += data.tumbleSpeed.z;

            if (data.position.y < -12) {
                data.position.y = 15;
                data.position.x = (Math.random() - 0.5) * rangeX;
                data.position.z = (Math.random() - 0.5) * rangeZ; 
            }
            if (data.position.x > 18) data.position.x = -18;
            if (data.position.x < -18) data.position.x = 18;

            dummy.position.copy(data.position);
            dummy.rotation.copy(data.rotation);
            dummy.updateMatrix();
            instancedPetals.setMatrixAt(i, dummy.matrix);
        }
        instancedPetals.instanceMatrix.needsUpdate = true;
        renderer.render(scene, camera);
    }

    animate();

    function handleResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);

        // ✨ Re-added: Responsive positioning for the main flower
        if (window.innerWidth < 768) {
            sakuraGroup.position.set(0, 1.5, 0);
            // Use the current animated scale, or reset if needed
            const currentScale = sakuraGroup.scale.x;
            if (currentScale > 0) { // Only adjust if already animated
                gsap.to(sakuraGroup.scale, { x: 1.3, y: 1.3, z: 1.3, duration: 0.5 });
            }
        } else {
            sakuraGroup.position.set(2.5, 0, 0);
            const currentScale = sakuraGroup.scale.x;
            if (currentScale > 0) {
                gsap.to(sakuraGroup.scale, { x: 1.8, y: 1.8, z: 1.8, duration: 0.5 });
            }
        }
    }

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial call
}
