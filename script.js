// SS14 Wiki - JavaScript

document.addEventListener('DOMContentLoaded', function() {
    console.log('SS14 Wiki loaded');
    
    // Initialize search
    initSearch();
    
    // Initialize calculator
    initCalculator();
    
    // Initialize scroll to top
    initScrollTop();
    
    // Initialize card clicks
    initCardClicks();
});

// ===== SEARCH =====
function initSearch() {
    const searchInput = document.querySelector('.search-input');
    if (!searchInput) return;
    
    // Create dropdown
    const dropdown = document.createElement('div');
    dropdown.className = 'search-dropdown';
    dropdown.style.cssText = 'position:absolute;top:100%;left:0;right:0;background:#161d2b;border:1px solid #2a3444;border-radius:12px;margin-top:8px;max-height:300px;overflow-y:auto;display:none;z-index:100;';
    searchInput.parentElement.style.position = 'relative';
    searchInput.parentElement.appendChild(dropdown);
    
    // Search data
    const searchData = [
        { title: 'Зелёный код', url: 'codes.html#green', desc: 'Базовый уровень безопасности' },
        { title: 'Синий код', url: 'codes.html#blue', desc: 'Уровень средней угрозы' },
        { title: 'Янтарный код', url: 'codes.html#amber', desc: 'Повышенный уровень угрозы' },
        { title: 'Красный код', url: 'codes.html#red', desc: 'Максимальная угроза' },
        { title: 'Гамма код', url: 'codes.html#gamma', desc: 'Особый режим максимальной мобилизации' },
        { title: 'Фиолетовый код', url: 'codes.html#violet', desc: 'Биологическая/химическая угроза' },
        { title: 'Жёлтый код', url: 'codes.html#yellow', desc: 'Повреждения станции' },
        { title: 'Глава Службы Безопасности', url: 'security.html#hos', desc: 'Должностные обязанности ГСБ' },
        { title: 'Смотритель', url: 'security.html#warden', desc: 'Обязанности и права Смотрителя' },
        { title: 'Офицер СБ', url: 'security.html#officer', desc: 'Должностные обязанности офицера' },
        { title: 'Кадет СБ', url: 'security.html#cadet', desc: 'Обязанности кадета' },
        { title: 'Бригмедик', url: 'security.html#brigmedic', desc: 'Медик брига' },
        { title: 'Детектив', url: 'security.html#detective', desc: 'Детектив службы безопасности' },
        { title: '1XX статьи', url: 'law.html#xx0', desc: 'Нанесение ущерба' },
        { title: '2XX статьи', url: 'law.html#xx1', desc: 'Антисоциальное поведение' },
        { title: '3XX статьи', url: 'law.html#xx2', desc: 'Нанесение увечий' },
        { title: '4XX статьи', url: 'law.html#xx3', desc: 'Мятеж и саботаж' },
        { title: '5XX статьи', url: 'law.html#xx4', desc: 'Критические преступления' },
        { title: 'Контрабанда', url: 'law.html#xx4', desc: 'XX4 статьи' },
        { title: 'Враги корпорации', url: 'law.html#enemies', desc: 'Классификация угроз' },
        { title: 'Калькулятор приговора', url: 'law.html#calculator', desc: 'Расчёт срока заключения' },
    ];
    
    // Search input handler
    searchInput.addEventListener('input', function(e) {
        const query = e.target.value.toLowerCase().trim();
        
        if (query.length < 2) {
            dropdown.style.display = 'none';
            return;
        }
        
        const results = searchData.filter(function(item) {
            return item.title.toLowerCase().includes(query) || item.desc.toLowerCase().includes(query);
        });
        
        if (results.length === 0) {
            dropdown.innerHTML = '<div style="padding:1rem;text-align:center;color:#8892a0;">Ничего не найдено</div>';
        } else {
            dropdown.innerHTML = results.map(function(item) {
                return '<a href="' + item.url + '" style="display:block;padding:0.8rem 1rem;text-decoration:none;color:#e8edf5;border-bottom:1px solid #2a3444;">' +
                    '<div style="font-weight:600;margin-bottom:0.25rem;">' + item.title + '</div>' +
                    '<div style="font-size:0.85rem;color:#8892a0;">' + item.desc + '</div></a>';
            }).join('');
        }
        
        dropdown.style.display = 'block';
    });
    
    // Close on outside click
    document.addEventListener('click', function(e) {
        if (!searchInput.parentElement.contains(e.target)) {
            dropdown.style.display = 'none';
        }
    });
    
    // Close on Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            dropdown.style.display = 'none';
            searchInput.blur();
        }
    });
    
    // Ctrl+K to focus search
    document.addEventListener('keydown', function(e) {
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            searchInput.focus();
        }
    });
}

// ===== CALCULATOR =====
function initCalculator() {
    const form = document.querySelector('.calculator-form');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        calculateSentence();
    });
}

function calculateSentence() {
    // Get base article
    var articleSelect = document.getElementById('article-level');
    var baseLevel = articleSelect ? parseInt(articleSelect.value) : 100;
    
    // Calculate base time
    var baseTime = 5;
    if (baseLevel >= 500) baseTime = 0;
    else if (baseLevel >= 400) baseTime = 45;
    else if (baseLevel >= 300) baseTime = 22;
    else if (baseLevel >= 200) baseTime = 7;
    
    // Get modifiers
    var modifiers = [];
    
    // Positive
    if (document.getElementById('mod-p1') && document.getElementById('mod-p1').checked) {
        modifiers.push({ name: 'П-1: Сотрудничество', value: '-50%', type: 'positive' });
    }
    if (document.getElementById('mod-p2') && document.getElementById('mod-p2').checked) {
        modifiers.push({ name: 'П-2: Отсутствие умысла', value: '-1 уровень', type: 'positive' });
    }
    
    // Negative
    if (document.getElementById('mod-o1') && document.getElementById('mod-o1').checked) {
        modifiers.push({ name: 'О-1: Рецидив', value: '+10 мин', type: 'negative' });
    }
    if (document.getElementById('mod-o2') && document.getElementById('mod-o2').checked) {
        modifiers.push({ name: 'О-2: Должностное', value: '+15 мин', type: 'negative' });
    }
    if (document.getElementById('mod-o3') && document.getElementById('mod-o3').checked) {
        modifiers.push({ name: 'О-3: Против должностных', value: '+50%', type: 'negative' });
    }
    if (document.getElementById('mod-o4') && document.getElementById('mod-o4').checked) {
        modifiers.push({ name: 'О-4: Помеха расследованию', value: '+50%', type: 'negative' });
    }
    if (document.getElementById('mod-o5') && document.getElementById('mod-o5').checked) {
        modifiers.push({ name: 'О-5: Сопротивление аресту', value: '+50%', type: 'negative' });
    }
    if (document.getElementById('mod-o6') && document.getElementById('mod-o6').checked) {
        modifiers.push({ name: 'О-6: Критический рецидив', value: '+100%', type: 'negative' });
    }
    if (document.getElementById('mod-o7') && document.getElementById('mod-o7').checked) {
        modifiers.push({ name: 'О-7: Пособничество', value: '+90%', type: 'negative' });
    }
    
    // Calculate final time
    var finalTime = baseTime;
    
    modifiers.forEach(function(mod) {
        if (mod.value.indexOf('%') !== -1) {
            var percent = parseInt(mod.value) / 100;
            if (mod.type === 'negative') {
                finalTime *= (1 + percent);
            } else {
                finalTime *= (1 - percent);
            }
        } else if (mod.value.indexOf('мин') !== -1) {
            var mins = parseInt(mod.value);
            finalTime += mod.type === 'negative' ? mins : -mins;
        }
    });
    
    finalTime = Math.max(0, Math.round(finalTime));
    
    // Update display
    var resultBox = document.querySelector('.result-box');
    if (!resultBox) return;
    
    var timeText = '';
    if (baseLevel >= 500) {
        timeText = finalTime > 0 ? finalTime + ' мин' : 'Пермабриг/Казнь';
    } else if (finalTime > 60) {
        timeText = 'Пермабриг (60+ мин)';
    } else {
        timeText = finalTime + ' мин';
    }
    
    var levelText = '';
    if (baseLevel >= 500) levelText = '5XX — Критические';
    else if (baseLevel >= 400) levelText = '4XX — Тяжкие';
    else if (baseLevel >= 300) levelText = '3XX — Серьёзные';
    else if (baseLevel >= 200) levelText = '2XX — Средние';
    else levelText = '1XX — Мелкие';
    
    resultBox.querySelector('.result-time').textContent = timeText;
    resultBox.querySelector('.result-articles').textContent = levelText;
    
    var modList = resultBox.querySelector('.modifier-list-content');
    if (modifiers.length === 0) {
        modList.innerHTML = '<div style="color:#8892a0;">Без модификаторов</div>';
    } else {
        modList.innerHTML = modifiers.map(function(m) {
            return '<div class="modifier-item">' +
                '<span>' + m.name + '</span>' +
                '<span class="modifier-' + m.type + '">' + m.value + '</span></div>';
        }).join('');
    }
    
    // Show result
    resultBox.classList.add('show');
    resultBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    // Show toast
    showToast('Расчёт выполнен!');
}

// ===== SCROLL TO TOP =====
function initScrollTop() {
    // Create button
    var btn = document.createElement('button');
    btn.className = 'scroll-top-btn';
    btn.innerHTML = '↑';
    btn.style.cssText = 'position:fixed;bottom:20px;right:20px;width:50px;height:50px;border-radius:50%;' +
        'background:#161d2b;border:1px solid #2a3444;color:#00ff88;font-size:24px;cursor:pointer;' +
        'opacity:0;visibility:hidden;transition:all 0.3s;z-index:999;';
    document.body.appendChild(btn);
    
    // Show/hide on scroll
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            btn.style.opacity = '1';
            btn.style.visibility = 'visible';
        } else {
            btn.style.opacity = '0';
            btn.style.visibility = 'hidden';
        }
    });
    
    // Click to scroll
    btn.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ===== CARD CLICKS =====
function initCardClicks() {
    // Ensure all cards with onclick work
    var cards = document.querySelectorAll('.card');
    cards.forEach(function(card) {
        if (card.onclick) {
            card.style.cursor = 'pointer';
        }
    });
}

// ===== TOAST =====
function showToast(message) {
    // Remove existing
    var existing = document.querySelector('.toast');
    if (existing) existing.remove();
    
    // Create new
    var toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    toast.style.cssText = 'position:fixed;bottom:80px;left:50%;transform:translateX(-50%);' +
        'padding:1rem 2rem;background:#161d2b;border:1px solid #00ff88;border-radius:12px;' +
        'color:#e8edf5;z-index:1001;animation:fadeInUp 0.3s ease;';
    document.body.appendChild(toast);
    
    // Remove after 3s
    setTimeout(function() {
        toast.style.opacity = '0';
        toast.style.transition = 'opacity 0.3s';
        setTimeout(function() { toast.remove(); }, 300);
    }, 3000);
}

// Add animation keyframes
var style = document.createElement('style');
style.textContent = '@keyframes fadeInUp { from { opacity:0;transform:translate(-50%,20px); } to { opacity:1;transform:translate(-50%,0); } }';
document.head.appendChild(style);