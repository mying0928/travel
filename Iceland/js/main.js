
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// --- 天氣地點資料表（Open-Meteo，全球通用，免金鑰） ---
// 每次開頁都會即時向 Open-Meteo 抓最新資料，最多可看到未來 16 天；
// 因為 2027/9 出發還很遠，現在打開會顯示「尚未公布」，等日期進入 16 天內會自動出現。
const WEATHER_LOCATIONS = [
    { id: 'reykjavik', name: '雷克雅維克', icon: 'fa-city', lat: 64.1466, lon: -21.9426 },
    { id: 'vik', name: 'Vík', icon: 'fa-umbrella-beach', lat: 63.4188, lon: -19.0060 },
    { id: 'hofn', name: 'Höfn', icon: 'fa-water', lat: 64.2539, lon: -15.2082 },
    { id: 'egilsstadir', name: 'Egilsstaðir', icon: 'fa-mountain', lat: 65.2669, lon: -14.3948 },
    { id: 'myvatn', name: '米湖 Mývatn', icon: 'fa-star', lat: 65.6413, lon: -16.9152 },
    { id: 'akureyri', name: 'Akureyri', icon: 'fa-city', lat: 65.6835, lon: -18.0878 }
];

const WMO_CODE_MAP = {
    0: ['fa-sun', '晴朗'], 1: ['fa-cloud-sun', '大致晴朗'], 2: ['fa-cloud-sun', '局部多雲'], 3: ['fa-cloud', '陰天'],
    45: ['fa-smog', '起霧'], 48: ['fa-smog', '霧淞'],
    51: ['fa-cloud-rain', '毛毛雨'], 53: ['fa-cloud-rain', '毛毛雨'], 55: ['fa-cloud-rain', '密集毛毛雨'],
    56: ['fa-cloud-rain', '凍毛毛雨'], 57: ['fa-cloud-rain', '密集凍毛毛雨'],
    61: ['fa-cloud-rain', '小雨'], 63: ['fa-cloud-rain', '中雨'], 65: ['fa-cloud-showers-heavy', '大雨'],
    66: ['fa-cloud-rain', '凍雨'], 67: ['fa-cloud-rain', '強凍雨'],
    71: ['fa-snowflake', '小雪'], 73: ['fa-snowflake', '中雪'], 75: ['fa-snowflake', '大雪'], 77: ['fa-snowflake', '雪粒'],
    80: ['fa-cloud-showers-heavy', '陣雨'], 81: ['fa-cloud-showers-heavy', '陣雨'], 82: ['fa-cloud-showers-heavy', '強陣雨'],
    85: ['fa-snowflake', '陣雪'], 86: ['fa-snowflake', '強陣雪'],
    95: ['fa-bolt', '雷雨'], 96: ['fa-bolt', '雷雨挾冰雹'], 99: ['fa-bolt', '強雷雨挾冰雹']
};

function getWmoIconAndLabel(code) {
    return WMO_CODE_MAP[code] || ['fa-cloud-sun', '天氣多變'];
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

document.addEventListener('DOMContentLoaded', function () {
    const dailySectionsContainer = document.getElementById('daily-sections-container');
    let currentActiveSectionId = null;
    let draggedButton = null;

    generateNavButtons();
    setupAnimations();
    setupInteractiveForeground();
    setupCountdown();
    setupWeatherLocations();
    generateDailySections();
    setupLazyBackgroundImages();
    setupTabSwitching();
    setupDragAndDrop();
    setupScrollToTop();
    setupNavArrows();

    // --- SETUP FUNCTIONS ---

    function generateNavButtons() {
        const navContainer = document.getElementById('nav-container');
        if (!navContainer) return;

        const todayStr = formatIsoDate(new Date());
        let buttonsHtml = '';
        buttonsHtml += `<button data-target="overview" class="nav-btn bg-emerald-500 text-white py-2 px-4 rounded-full shadow-sm text-center leading-tight flex-shrink-0 whitespace-nowrap">旅程總覽</button>`;

        for (const dayId in itineraryData) {
            const dayData = itineraryData[dayId];
            if (dayData.navInfo) {
                const dateParts = dayData.navInfo.date.split('-')[0].split('/');
                const dayDateStr = dateParts.length === 2 ? `2027-${String(dateParts[0]).padStart(2, '0')}-${String(dateParts[1]).padStart(2, '0')}` : '';
                const isToday = dayDateStr && dayDateStr === todayStr;
                const todayBadge = isToday
                    ? `<span class="absolute -top-1.5 -right-1.5 bg-rose-500 text-white text-[9px] leading-none px-1.5 py-0.5 rounded-full shadow">今天</span>`
                    : '';
                buttonsHtml += `
                    <button data-target="${dayId}" class="nav-btn relative ${isToday ? 'ring-2 ring-rose-400 ring-offset-2' : ''} bg-emerald-50 text-emerald-800 py-2 px-4 rounded-full shadow-sm text-center leading-tight flex-shrink-0 whitespace-nowrap">
                        ${todayBadge}
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
        if (!navContainer || !arrowLeft || !arrowRight) return;

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
            arrowRight.classList.toggle('disabled', scrollLeft + clientWidth >= scrollWidth - 1);
        }

        arrowLeft.addEventListener('click', () => {
            gsap.to(navContainer, { duration: 0.5, scrollTo: { x: 0 }, ease: 'power3.inOut' });
        });
        arrowRight.addEventListener('click', () => {
            gsap.to(navContainer, { duration: 0.5, scrollTo: { x: navContainer.scrollWidth }, ease: 'power3.inOut' });
        });
        navContainer.addEventListener('scroll', () => requestAnimationFrame(updateArrows));
        window.addEventListener('resize', updateArrows);
        setTimeout(updateArrows, 100);
    }

    // --- 天氣預報（Open-Meteo，最多 16 天） ---
    function buildDailyForecast(location, apiData) {
        if (!apiData || !apiData.daily || !apiData.daily.time) return [];
        const d = apiData.daily;
        const todayStr = formatIsoDate(new Date());
        return d.time.map((date, idx) => {
            const isPast = date < todayStr;
            const code = d.weathercode ? d.weathercode[idx] : null;
            const hasData = code !== null && code !== undefined;
            const [iconClass, label] = hasData ? getWmoIconAndLabel(code) : [null, null];
            const tempMax = (d.temperature_2m_max && d.temperature_2m_max[idx] != null) ? Math.round(d.temperature_2m_max[idx]) : '';
            const tempMin = (d.temperature_2m_min && d.temperature_2m_min[idx] != null) ? Math.round(d.temperature_2m_min[idx]) : '';
            const pop = (d.precipitation_probability_max && d.precipitation_probability_max[idx] != null) ? d.precipitation_probability_max[idx] : '';
            return { date, label, iconClass, tempMax: tempMax === '' ? '' : String(tempMax), tempMin: tempMin === '' ? '' : String(tempMin), pop: pop === '' ? '' : String(pop), available: hasData, isPast };
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
            return `
            <div class="weather-day-box rounded-xl border border-emerald-100 bg-emerald-50/50 p-1.5 sm:p-3 text-center">
                <div class="text-[10px] sm:text-xs font-bold text-slate-600">${formatWeatherDateLabel(d.date)}</div>
                <i class="fas ${d.iconClass} text-lg sm:text-2xl text-emerald-500 my-1.5 sm:my-2"></i>
                <div class="text-[9px] sm:text-[11px] text-slate-500 leading-tight mb-1 sm:mb-1.5 min-h-[2.2em] flex items-center justify-center">${d.label}</div>
                <div class="text-xs sm:text-sm font-bold">
                    ${d.tempMax !== '' ? `<span class="text-rose-500">${d.tempMax}°</span>` : ''}${d.tempMin !== '' ? `<span class="text-sky-500"> / ${d.tempMin}°</span>` : ''}
                </div>
                ${d.pop !== '' ? `<div class="text-[9px] sm:text-[11px] text-sky-500 mt-1"><i class="fas fa-tint mr-0.5"></i>${d.pop}%</div>` : ''}
            </div>`;
        }).join('');

        return `
        <div class="weather-loc-card border border-slate-100 rounded-xl overflow-hidden">
            <button type="button" class="weather-loc-toggle w-full flex items-center justify-between gap-2 sm:gap-3 p-3 sm:p-4 bg-slate-50 hover:bg-slate-100 transition-colors text-left">
                <span class="flex items-center gap-2 sm:gap-3 min-w-0">
                    <i class="fas ${location.icon} text-emerald-500 w-5 text-center shrink-0"></i>
                    <span class="font-bold text-slate-700 text-sm sm:text-base truncate">${location.name}</span>
                </span>
                <span class="flex items-center gap-2 sm:gap-3 shrink-0">
                    <span class="hidden sm:inline text-xs text-slate-400">${summary}</span>
                    <i class="fas fa-chevron-down text-slate-400 transition-transform weather-loc-chevron text-xs"></i>
                </span>
            </button>
            <div class="weather-loc-body hidden px-3 sm:px-4 pb-3 sm:pb-4 pt-3">
                <div class="grid grid-cols-2 sm:grid-cols-7 gap-1.5 sm:gap-3">${boxes}</div>
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

        const fetches = WEATHER_LOCATIONS.map(loc =>
            fetch(`https://api.open-meteo.com/v1/forecast?latitude=${loc.lat}&longitude=${loc.lon}&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=Atlantic%2FReykjavik&forecast_days=16`)
                .then(r => { if (!r.ok) throw new Error('Open-Meteo fetch failed'); return r.json(); })
                .then(data => ({ id: loc.id, data }))
                .catch(() => ({ id: loc.id, data: null }))
        );

        Promise.all(fetches).then(results => {
            const byId = {};
            results.forEach(r => { byId[r.id] = r.data; });

            container.innerHTML = WEATHER_LOCATIONS.map(loc => {
                const days = buildDailyForecast(loc, byId[loc.id]);
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

    // --- 出發倒數計時（含跳動效果） ---
    function setupCountdown() {
        const targetDate = new Date('2027-09-01T23:50:00').getTime();
        const countdownElement = document.getElementById('countdown');
        if (!countdownElement) return;

        const digitEls = {
            days: document.getElementById('days'),
            hours: document.getElementById('hours'),
            minutes: document.getElementById('minutes'),
            seconds: document.getElementById('seconds')
        };
        const prevValues = { days: null, hours: null, minutes: null, seconds: null };

        function pulse(el) {
            el.classList.remove('countdown-tick');
            void el.offsetWidth;
            el.classList.add('countdown-tick');
        }

        const interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = targetDate - now;

            if (distance < 0) {
                clearInterval(interval);
                countdownElement.innerHTML = "<div class='col-span-4 text-2xl font-bold text-emerald-600'>旅程已開始！</div>";
                return;
            }

            const nextValues = {
                days: Math.floor(distance / (1000 * 60 * 60 * 24)).toString().padStart(2, '0'),
                hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, '0'),
                minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0'),
                seconds: Math.floor((distance % (1000 * 60)) / 1000).toString().padStart(2, '0')
            };

            Object.keys(nextValues).forEach(key => {
                if (nextValues[key] !== prevValues[key]) {
                    digitEls[key].innerText = nextValues[key];
                    pulse(digitEls[key]);
                    prevValues[key] = nextValues[key];
                }
            });
        }, 1000);
    }

    // --- HELPER TO BUILD HTML FROM STRUCTURED CONTENT ---
    function buildContentHtml(item) {
        const content = item.content;
        let html = '';
        if (!content) return html;

        if (content.description) html += `<p>${content.description}</p>`;
        if (content.transport) html += `<p class='mt-3 text-sm'><strong>備註：</strong> ${content.transport}</p>`;

        if (content.subsections && content.subsections.length > 0) {
            html += '<div class="mt-4 space-y-4">';
            content.subsections.forEach(sub => {
                html += `<div><h4 class='font-semibold text-slate-800'>${sub.title}</h4>`;
                if (sub.description) html += `<p class='text-sm text-slate-600 mt-1'>${sub.description}</p>`;
                html += '</div>';
            });
            html += '</div>';
        }

        if (item.danger) {
            html += `<div class="mt-4 flex items-start gap-2 bg-red-50 border border-red-200 text-red-700 rounded-lg p-3 text-sm"><i class="fas fa-triangle-exclamation mt-0.5"></i><span>${item.danger}</span></div>`;
        }
        if (item.warning) {
            html += `<div class="mt-4 flex items-start gap-2 bg-amber-50 border border-amber-200 text-amber-700 rounded-lg p-3 text-sm"><i class="fas fa-circle-exclamation mt-0.5"></i><span>${item.warning}</span></div>`;
        }
        if (item.tip) {
            html += `<div class="mt-4 flex items-start gap-2 bg-sky-50 border border-sky-200 text-sky-700 rounded-lg p-3 text-sm"><i class="fas fa-lightbulb mt-0.5"></i><span>${item.tip}</span></div>`;
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
                            card.classList.add('bg-loaded');
                            card.style.backgroundImage = `linear-gradient(rgba(15,23,42,0.45), rgba(15,23,42,0.55)), url('${imageUrl}')`;
                        }
                        lazyBackgroundObserver.unobserve(card);
                    }
                });
            }, { rootMargin: '0px 0px 100px 0px', threshold: 0.01 });
            lazyBackgrounds.forEach(function(card) { lazyBackgroundObserver.observe(card); });
        } else {
            lazyBackgrounds.forEach(function(card) {
                let imageUrl = card.dataset.bgSrc;
                if (imageUrl) {
                    card.classList.add('bg-loaded');
                    card.style.backgroundImage = `linear-gradient(rgba(15,23,42,0.45), rgba(15,23,42,0.55)), url('${imageUrl}')`;
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
                                    <h3 class="text-base sm:text-lg font-bold text-emerald-700">${item.time} | ${item.title}</h3>
                                </div>
                                <div class="p-4 bg-gray-50 border-t border-gray-100 text-slate-600">${buildContentHtml(item)}</div>
                            </div>
                        </div>
                    `).join('');

            return `
                        <div class="daily-theme-card cursor-pointer relative rounded-2xl shadow-xl overflow-hidden p-8 md:p-12 text-white flex flex-col justify-center items-center text-center min-h-[300px] mb-12" data-bg-src="${planData.themeImage}" style="background-image: linear-gradient(rgba(15,23,42,0.45), rgba(15,23,42,0.55));">
                            <h2 class="text-3xl sm:text-4xl font-black mb-2" style="text-shadow: 2px 2px 8px rgba(0,0,0,0.7);">${planData.title}</h2>
                            ${highlightsHtml}
                            <button class="view-timeline-btn mt-6 bg-emerald-600 text-white py-2 px-6 rounded-full shadow-lg hover:bg-emerald-700 transition-transform hover:scale-105 flex items-center justify-center">查看詳細行程 <i class="fas fa-chevron-down ml-2"></i></button>
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
            const singleCardHtml = createCardHtml(dayData);
            allSectionsHtml += `<section id="${dayId}" class="content-section" style="display: none; opacity: 0;">${singleCardHtml}</section>`;
        }
        dailySectionsContainer.innerHTML = allSectionsHtml;

        document.querySelectorAll('.daily-theme-card').forEach(card => {
            card.addEventListener('click', (e) => {
                const button = card.querySelector('.view-timeline-btn');
                const timeline = card.nextElementSibling;
                if (!timeline || !timeline.classList.contains('timeline-container')) return;

                const isOpening = timeline.classList.contains('hidden');

                document.querySelectorAll('.timeline-container:not(.hidden)').forEach(openTimeline => {
                    if (openTimeline !== timeline) {
                        openTimeline.classList.add('hidden');
                        const openButton = openTimeline.previousElementSibling.querySelector('.view-timeline-btn');
                        if (openButton) openButton.innerHTML = '查看詳細行程 <i class="fas fa-chevron-down ml-2"></i>';
                    }
                });

                if (isOpening) {
                    timeline.classList.remove('hidden');
                    button.innerHTML = '隱藏詳細行程 <i class="fas fa-chevron-up ml-2"></i>';
                    setTimeout(() => {
                        ScrollTrigger.refresh();
                        gsap.from(timeline.querySelectorAll('.timeline-item'), {
                            opacity: 0, x: -50, stagger: 0.15, duration: 0.8, ease: "power3.out"
                        });
                        gsap.to(timeline.querySelector('.timeline-line-progress'), {
                            scrollTrigger: { trigger: timeline, start: "top center", end: "bottom bottom", scrub: true },
                            height: "100%"
                        });
                        gsap.to(window, { duration: 0.8, ease: 'power3.inOut', scrollTo: { y: timeline, offsetY: 100 } });
                    }, 10);
                } else {
                    gsap.to(window, {
                        duration: 0.5, ease: 'power3.inOut', scrollTo: { y: card, offsetY: 100 },
                        onComplete: () => {
                            gsap.to(timeline, {
                                duration: 0.4, opacity: 0, ease: 'power2.in',
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
        let isAnimating = false;
        const navContainer = document.getElementById('nav-container');
        const navButtons = document.querySelectorAll('.nav-btn');

        navButtons.forEach(button => {
            button.addEventListener('click', () => {
                const targetId = button.dataset.target;
                if (!isAnimating && targetId !== currentActiveSectionId) {
                    isAnimating = true;
                    switchTab(targetId, true, () => { isAnimating = false });

                    const containerWidth = navContainer.offsetWidth;
                    const buttonWidth = button.offsetWidth;
                    const buttonLeft = button.offsetLeft;
                    gsap.to(navContainer, {
                        duration: 0.5,
                        scrollTo: { x: buttonLeft - (containerWidth / 2) + (buttonWidth / 2), autoKill: false },
                        ease: "power3.inOut"
                    });
                }
            });
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
                onCompleteCallback();
            }
        });

        if (oldSection) {
            tl.to(oldSection, { duration: 0.3, opacity: 0, ease: 'power2.in', onComplete: () => { oldSection.style.display = 'none' } });
        }

        tl.add(() => {
            navButtons.forEach(btn => {
                const isTarget = btn.dataset.target === targetId;
                btn.classList.toggle('bg-emerald-500', isTarget);
                btn.classList.toggle('text-white', isTarget);
                btn.classList.toggle('bg-emerald-50', !isTarget);
                btn.classList.toggle('text-emerald-800', !isTarget);
                if (isTarget) btn.setAttribute('aria-current', 'page'); else btn.removeAttribute('aria-current');
            });
        });

        tl.add(() => {
            newSection.style.display = 'block';
            gsap.fromTo(newSection, { opacity: 0 }, { duration: 0.4, opacity: 1, ease: 'power2.out' });
            if (shouldScroll) {
                gsap.to(window, { duration: 0.6, ease: 'power3.inOut', scrollTo: { y: document.querySelector('nav'), offsetY: 20 } });
            }
        });
    }

    function setupScrollToTop() {
        const scrollBtn = document.getElementById('scrollToTopBtn');
        if (!scrollBtn) return;
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                scrollBtn.classList.remove('opacity-0', 'invisible', 'translate-y-2');
            } else {
                scrollBtn.classList.add('opacity-0', 'invisible', 'translate-y-2');
            }
        });
        scrollBtn.addEventListener('click', () => {
            gsap.to(window, { duration: 0.8, scrollTo: 0, ease: 'power3.inOut' });
        });
    }

    function setupDragAndDrop() {
        const dayButtons = document.querySelectorAll('.nav-btn:not([data-target="overview"])');
        dayButtons.forEach(btn => {
            btn.setAttribute('draggable', 'true');
            btn.addEventListener('dragstart', (e) => {
                draggedButton = btn;
                btn.classList.add('dragging');
                e.dataTransfer.effectAllowed = 'move';
            });
            btn.addEventListener('dragend', () => {
                btn.classList.remove('dragging');
                draggedButton = null;
            });
            btn.addEventListener('dragover', (e) => {
                e.preventDefault();
                if (draggedButton && draggedButton !== btn) btn.classList.add('drag-over');
            });
            btn.addEventListener('dragleave', () => btn.classList.remove('drag-over'));
            btn.addEventListener('drop', (e) => {
                e.preventDefault();
                btn.classList.remove('drag-over');
                if (draggedButton && draggedButton !== btn) {
                    const navContainer = document.getElementById('nav-container');
                    const buttons = Array.from(navContainer.children);
                    const draggedIndex = buttons.indexOf(draggedButton);
                    const targetIndex = buttons.indexOf(btn);
                    if (draggedIndex < targetIndex) {
                        btn.after(draggedButton);
                    } else {
                        btn.before(draggedButton);
                    }
                }
            });
        });
    }

    function setupAnimations() {
        const heroTitle = document.getElementById('hero-title');
        if (!heroTitle) return;
        const text = heroTitle.innerText;
        heroTitle.innerHTML = '';
        text.split('').forEach(char => {
            const span = document.createElement('span');
            span.className = 'char';
            span.innerText = char === ' ' ? ' ' : char;
            heroTitle.appendChild(span);
        });

        gsap.from(heroTitle.querySelectorAll('.char'), {
            duration: 1.2, y: 100, autoAlpha: 0, stagger: 0.05, ease: "back.out(1.7)"
        });
        gsap.from("#hero-subtitle", { duration: 1, y: 30, opacity: 0, ease: "power3.out", delay: 1 });

        gsap.utils.toArray('.card-hover').forEach(card => {
            gsap.from(card, {
                scrollTrigger: { trigger: card, start: "top 90%", toggleActions: "play none none none" },
                opacity: 0, y: 50, duration: 0.8, ease: "power3.out"
            });
        });
    }

    // --- 極光夜空粒子效果 ---
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

        const auroraColors = [
            'rgba(52, 211, 153,',
            'rgba(45, 212, 191,',
            'rgba(129, 140, 248,',
            'rgba(255, 255, 255,'
        ];

        class Particle {
            constructor() { this.reset(true); }
            reset(initial) {
                this.x = Math.random() * canvas.width;
                this.y = initial ? Math.random() * canvas.height : -10;
                this.size = Math.random() * 3 + 1.5;
                this.speedY = Math.random() * 0.6 + 0.3;
                this.speedX = Math.random() * 0.4 - 0.2;
                this.opacity = Math.random() * 0.5 + 0.3;
                this.color = auroraColors[Math.floor(Math.random() * auroraColors.length)];
                this.twinkle = Math.random() * Math.PI * 2;
            }
            update() {
                this.y += this.speedY;
                this.x += this.speedX + Math.sin(this.y / 60) * 0.15;
                this.twinkle += 0.05;
                if (this.y > canvas.height + 10) this.reset(false);
            }
            draw() {
                const flicker = (Math.sin(this.twinkle) + 1) / 2;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = `${this.color} ${this.opacity * (0.5 + flicker * 0.5)})`;
                ctx.fill();
            }
        }

        function initParticles() {
            particles = [];
            for (let i = 0; i < 90; i++) particles.push(new Particle());
        }

        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => { p.update(); p.draw(); });
            requestAnimationFrame(animateParticles);
        }
        initParticles();
        animateParticles();
    }
});
