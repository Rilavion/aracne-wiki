// SS14 Quick Ref - Minimal Script

document.addEventListener('DOMContentLoaded', function() {
    // Color toggle
    var toggle = document.getElementById('colorToggle');
    if (toggle) {
        // Check localStorage
        var colorsOn = localStorage.getItem('colorsOn');
        if (colorsOn === 'false') {
            toggle.checked = false;
            document.body.classList.remove('colors-on');
        } else {
            document.body.classList.add('colors-on');
        }
        
        toggle.addEventListener('change', function() {
            if (this.checked) {
                document.body.classList.add('colors-on');
                localStorage.setItem('colorsOn', 'true');
            } else {
                document.body.classList.remove('colors-on');
                localStorage.setItem('colorsOn', 'false');
            }
        });
    }
    
    // Smooth scroll for nav
    document.querySelectorAll('.nav-item').forEach(function(link) {
        link.addEventListener('click', function(e) {
            var href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                var target = document.querySelector(href);
                if (target) {
                    var offset = target.offsetTop - 20;
                    window.scrollTo({ top: offset, behavior: 'smooth' });
                }
            }
        });
    });
});

// Calculator function
function calculate() {
    var article = parseInt(document.getElementById('calcArticle').value);
    var baseTime = 5;
    
    if (article >= 500) baseTime = 0;
    else if (article >= 400) baseTime = 45;
    else if (article >= 300) baseTime = 22;
    else if (article >= 200) baseTime = 7;
    
    var modifiers = [];
    
    if (document.getElementById('m1').checked) {
        modifiers.push('-50% (П-1)');
        baseTime *= 0.5;
    }
    if (document.getElementById('m2').checked) {
        modifiers.push('+10 мин (О-1)');
        baseTime += 10;
    }
    if (document.getElementById('m3').checked) {
        modifiers.push('+50% (О-3)');
        baseTime *= 1.5;
    }
    if (document.getElementById('m4').checked) {
        modifiers.push('+50% (О-5)');
        baseTime *= 1.5;
    }
    if (document.getElementById('m5').checked) {
        modifiers.push('+100% (О-6)');
        baseTime *= 2;
    }
    
    baseTime = Math.max(0, Math.round(baseTime));
    
    var result = document.getElementById('calcResult');
    
    if (article >= 500) {
        result.innerHTML = baseTime > 0 ? 
            '<div style="color:#d29922;font-size:1.1rem;">' + baseTime + ' мин или Пермабриг</div>' :
            '<div style="color:#f85149;font-size:1.1rem;">Пермабриг / Импланты / Казнь</div>';
    } else if (baseTime > 60) {
        result.innerHTML = '<div style="color:#f85149;font-size:1.1rem;">Пермабриг (60+ мин)</div>';
    } else {
        result.innerHTML = '<div style="color:#3fb950;font-size:1.5rem;">' + baseTime + ' мин</div>';
    }
    
    if (modifiers.length > 0) {
        result.innerHTML += '<div style="margin-top:0.5rem;font-size:0.85rem;color:#8b949e;">' + modifiers.join(', ') + '</div>';
    }
    
    result.classList.add('show');
}