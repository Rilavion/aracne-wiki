// ===== SS14 Wiki JavaScript =====

document.addEventListener('DOMContentLoaded', function() {
    initBackgroundEffects();
    initHeaderScroll();
    initSearch();
    initCardHover();
    initScrollToTop();
    initCalculator();
    initSmoothAnchors();
    initCopyToClipboard();
});

// ===== BACKGROUND EFFECTS =====
function initBackgroundEffects() {
    const bg = document.querySelector('.advanced-bg') || createBackground();
    
    function createBackground() {
        const container = document.createElement('div');
        container.className = 'advanced-bg';
        
        // Grid
        const grid = document.createElement('div');
        grid.className = 'bg-grid';
        container.appendChild(grid);
        
        // Glowing orbs
        const glow1 = document.createElement('div');
        glow1.className = 'bg-glow-1';
        container.appendChild(glow1);
        
        const glow2 = document.createElement('div');
        glow2.className = 'bg-glow-2';
        container.appendChild(glow2);
        
        const glow3 = document.createElement('div');
        glow3.className = 'bg-glow-3';
        container.appendChild(glow3);
        
        // Particles
        const particles = document.createElement('div');
        particles.className = 'bg-particles';
        for (let i = 0; i < 10; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = `${Math.random() * 100}%`;
            particles.appendChild(particle);
        }
        container.appendChild(particles);
        
        document.body.insertBefore(container, document.body.firstChild);
        return container;
    }
}

// ===== HEADER SCROLL EFFECT =====
function initHeaderScroll() {
    const header = document.querySelector('.site-header');
    if (!header) return;
    
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
}

// ===== SEARCH FUNCTIONALITY =====
function initSearch() {
    const searchInput = document.querySelector('.search-input');
    if (!searchInput) return;
    
    // Create search results dropdown
    const dropdown = document.createElement('div');
    dropdown.className = 'search-dropdown';
    dropdown.style.cssText = `
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: var(--bg-card);
        border: 1px solid var(--border-color);
        border-radius: 12px;
        margin-top: 0.5rem;
        max-height: 400px;
        overflow-y: auto;
        display: none;
        z-index: 100;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
    `;
    
    const searchContainer = searchInput.parentElement;
    searchContainer.style.position = 'relative';
    searchContainer.appendChild(dropdown);
    
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
        { title: 'Убийство', url: 'law.html#xx2', desc: 'Статья 502' },
        { title: 'Враги корпорации', url: 'law.html#enemies', desc: 'Классификация угроз' },
        { title: 'Модификаторы', url: 'law.html#modifiers', desc: 'Оправдательные и отягощающие' },
        { title: 'Пермабриг', url: 'security.html#warden', desc: 'Пожизненное заключение' },
    ];
    
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        
        if (query.length < 2) {
            dropdown.style.display = 'none';
            return;
        }
        
        const results = searchData.filter(item => 
            item.title.toLowerCase().includes(query) || 
            item.desc.toLowerCase().includes(query)
        );
        
        if (results.length === 0) {
            dropdown.innerHTML = '<div style="padding: 1.5rem; text-align: center; color: var(--text-muted);">Ничего не найдено</div>';
        } else {
            dropdown.innerHTML = results.map(item => `
                <a href="${item.url}" class="search-result" style="
                    display: block;
                    padding: 1rem 1.25rem;
                    text-decoration: none;
                    color: var(--text-primary);
                    border-bottom: 1px solid var(--border-color);
                    transition: all 0.2s ease;
                ">
                    <div style="font-weight: 600; margin-bottom: 0.25rem;">${item.title}</div>
                    <div style="font-size: 0.85rem; color: var(--text-muted);">${item.desc}</div>
                </a>
            `).join('');
            
            // Add hover effect to results
            dropdown.querySelectorAll('.search-result').forEach(result => {
                result.addEventListener('mouseenter', () => {
                    result.style.background = 'var(--bg-card-hover)';
                });
                result.addEventListener('mouseleave', () => {
                    result.style.background = 'transparent';
                });
            });
        }
        
        dropdown.style.display = 'block';
    });
    
    // Close dropdown on click outside
    document.addEventListener('click', (e) => {
        if (!searchContainer.contains(e.target)) {
            dropdown.style.display = 'none';
        }
    });
    
    // Close on escape
    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            dropdown.style.display = 'none';
            searchInput.blur();
        }
    });
}

// ===== CARD HOVER EFFECTS =====
function initCardHover() {
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });
}

// ===== SCROLL TO TOP =====
function initScrollToTop() {
    // Create button if not exists
    let scrollBtn = document.querySelector('.scroll-top');
    
    if (!scrollBtn) {
        scrollBtn = document.createElement('button');
        scrollBtn.className = 'scroll-top';
        scrollBtn.innerHTML = `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M18 15l-6-6-6 6"/>
            </svg>
        `;
        scrollBtn.style.cssText = `
            position: fixed;
            bottom: 2rem;
            right: calc(2rem + 70px);
            width: 48px;
            height: 48px;
            border-radius: 50%;
            background: var(--bg-card);
            border: 1px solid var(--border-color);
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 998;
        `;
        document.body.appendChild(scrollBtn);
    }
    
    // Show/hide button
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500) {
            scrollBtn.classList.add('visible');
        } else {
            scrollBtn.classList.remove('visible');
        }
    });
    
    // Scroll to top on click
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ===== CALCULATOR FUNCTIONALITY =====
function initCalculator() {
    const calcForm = document.querySelector('.calculator-form');
    if (!calcForm) return;
    
    const resultBox = document.querySelector('.result-box');
    if (!resultBox) return;
    
    calcForm.addEventListener('submit', (e) => {
        e.preventDefault();
        calculateSentence();
    });
}

function calculateSentence() {
    // Get base article level
    const articleSelect = document.getElementById('article-level');
    const baseLevel = articleSelect ? parseInt(articleSelect.value) || 100 : 100;
    
    // Get base time in minutes
    let baseTime = 5; // Default for 1XX
    if (baseLevel >= 500) baseTime = 0; // 5XX uses special punishment
    else if (baseLevel >= 400) baseTime = 45;
    else if (baseLevel >= 300) baseTime = 22;
    else if (baseLevel >= 200) baseTime = 7;
    else if (baseLevel >= 100) baseTime = 5;
    
    // Get modifiers
    let totalModifier = 0;
    let modifierList = [];
    
    // Positive modifiers (reductions)
    if (document.getElementById('mod-p1')?.checked) {
        totalModifier -= 0.5;
        modifierList.push({ name: 'П-1: Сотрудничество', value: '-50%', type: 'positive' });
    }
    if (document.getElementById('mod-p2')?.checked) {
        modifierList.push({ name: 'П-2: Отсутствие умысла', value: '-1 уровень', type: 'positive' });
        baseTime = baseTime * 0.7; // Reduce severity
    }
    
    // Negative modifiers (additions)
    if (document.getElementById('mod-o1')?.checked) {
        totalModifier += 10;
        modifierList.push({ name: 'О-1: Рецидив', value: '+10 мин', type: 'negative' });
    }
    if (document.getElementById('mod-o2')?.checked) {
        totalModifier += 15;
        modifierList.push({ name: 'О-2: Должностное преступление', value: '+15 мин', type: 'negative' });
    }
    if (document.getElementById('mod-o3')?.checked) {
        totalModifier += 0.5;
        modifierList.push({ name: 'О-3: Против должностных лиц', value: '+50%', type: 'negative' });
    }
    if (document.getElementById('mod-o4')?.checked) {
        totalModifier += 0.5;
        modifierList.push({ name: 'О-4: Помеха расследованию', value: '+50%', type: 'negative' });
    }
    if (document.getElementById('mod-o5')?.checked) {
        totalModifier += 0.5;
        modifierList.push({ name: 'О-5: Сопротивление аресту', value: '+50%', type: 'negative' });
    }
    if (document.getElementById('mod-o6')?.checked) {
        totalModifier += 1;
        modifierList.push({ name: 'О-6: Критический рецидив', value: '+100%', type: 'negative' });
    }
    if (document.getElementById('mod-o7')?.checked) {
        modifierList.push({ name: 'О-7: Пособничество', value: '+90% срока', type: 'negative' });
        totalModifier += 0.9;
    }
    
    // Calculate final time
    let finalTime = baseTime;
    
    // Apply percentage modifiers
    const percentageMods = modifierList.filter(m => m.value.includes('%'));
    percentageMods.forEach(mod => {
        const percent = parseInt(mod.value) / 100;
        if (mod.type === 'negative') {
            finalTime *= (1 + percent);
        } else {
            finalTime *= (1 - percent);
        }
    });
    
    // Apply flat modifiers
    const flatMods = modifierList.filter(m => m.value.includes('мин'));
    flatMods.forEach(mod => {
        const mins = parseInt(mod.value);
        finalTime += mod.type === 'negative' ? mins : -mins;
    });
    
    // Ensure minimum 0
    finalTime = Math.max(0, Math.round(finalTime));
    
    // Update result display
    const resultTime = resultBox.querySelector('.result-time');
    const resultArticles = resultBox.querySelector('.result-articles');
    const modifierListEl = resultBox.querySelector('.modifier-list-content');
    
    if (resultTime) {
        let timeText = '';
        if (baseLevel >= 500) {
            timeText = finalTime > 0 ? `${finalTime} мин` : 'Пермабриг/Казнь';
        } else if (finalTime > 60) {
            timeText = 'Пермабриг (60+ мин)';
        } else {
            timeText = `${finalTime} мин`;
        }
        resultTime.textContent = timeText;
    }
    
    if (resultArticles) {
        let levelName = '';
        if (baseLevel >= 500) levelName = '5XX (Критические преступления)';
        else if (baseLevel >= 400) levelName = '4XX (Тяжкие преступления)';
        else if (baseLevel >= 300) levelName = '3XX (Серьёзные преступления)';
        else if (baseLevel >= 200) levelName = '2XX (Средние преступления)';
        else levelName = '1XX (Мелкие нарушения)';
        resultArticles.textContent = levelName;
    }
    
    if (modifierListEl) {
        if (modifierList.length === 0) {
            modifierListEl.innerHTML = '<div style="color: var(--text-muted);">Без модификаторов</div>';
        } else {
            modifierListEl.innerHTML = modifierList.map(m => `
                <div class="modifier-item">
                    <span>${m.name}</span>
                    <span class="modifier-${m.type}">${m.value}</span>
                </div>
            `).join('');
        }
    }
    
    // Show result with animation
    resultBox.classList.add('show');
    resultBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    // Show toast
    showToast('Расчёт выполнен!');
}

function showToast(message) {
    // Remove existing toast
    const existingToast = document.querySelector('.toast');
    if (existingToast) existingToast.remove();
    
    // Create new toast
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    // Show toast
    setTimeout(() => toast.classList.add('show'), 10);
    
    // Hide after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 400);
    }, 3000);
}

// ===== SMOOTH ANCHORS =====
function initSmoothAnchors() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 100;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== COPY TO CLIPBOARD =====
function initCopyToClipboard() {
    // Add copy buttons to code blocks
    const articles = document.querySelectorAll('.article');
    
    articles.forEach(article => {
        const code = article.querySelector('.article-code');
        if (!code) return;
        
        const copyBtn = document.createElement('button');
        copyBtn.className = 'copy-btn';
        copyBtn.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
        `;
        copyBtn.style.cssText = `
            position: absolute;
            top: 1rem;
            right: 1rem;
            padding: 0.5rem;
            background: var(--bg-secondary);
            border: 1px solid var(--border-color);
            border-radius: 8px;
            cursor: pointer;
            color: var(--text-muted);
            transition: all 0.2s ease;
        `;
        
        copyBtn.addEventListener('mouseenter', () => {
            copyBtn.style.color = 'var(--accent-green)';
            copyBtn.style.borderColor = 'var(--accent-green)';
        });
        
        copyBtn.addEventListener('mouseleave', () => {
            copyBtn.style.color = 'var(--text-muted)';
            copyBtn.style.borderColor = 'var(--border-color)';
        });
        
        copyBtn.addEventListener('click', () => {
            const codeText = code.textContent;
            navigator.clipboard.writeText(codeText).then(() => {
                showToast(`Скопировано: ${codeText}`);
            });
        });
        
        article.style.position = 'relative';
        article.appendChild(copyBtn);
    });
}

// ===== KEYBOARD SHORTCUTS =====
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + K for search focus
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const searchInput = document.querySelector('.search-input');
        if (searchInput) {
            searchInput.focus();
        }
    }
    
    // Escape to close dropdowns
    if (e.key === 'Escape') {
        const dropdown = document.querySelector('.search-dropdown');
        if (dropdown) {
            dropdown.style.display = 'none';
        }
    }
});

// ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe elements for scroll animations
document.querySelectorAll('.code-section, .content-block, .role-section, .article').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ===== TABLE ROW HOVER SOUND (OPTIONAL) =====
// Uncomment if you want audio feedback
/*
document.querySelectorAll('tbody tr').forEach(row => {
    row.addEventListener('mouseenter', () => {
        // Optional: play subtle sound
    });
});
*/

// ===== EXPORT FUNCTIONS FOR EXTERNAL USE =====
window.SS14Wiki = {
    showToast,
    calculateSentence,
    scrollToTop: () => window.scrollTo({ top: 0, behavior: 'smooth' })
};