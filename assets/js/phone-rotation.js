// Phone number rotation — picks once per session (consistent across pages), 50/50 split
(function () {
    var numbers = ['201069933221', '201149458885'];
    var key = 'g_phone_rotation';
    var chosen = sessionStorage.getItem(key);
    if (!chosen) {
        chosen = numbers[Math.floor(Math.random() * numbers.length)];
        sessionStorage.setItem(key, chosen);
    }
    var display = '+' + chosen.replace(/(\d{2})(\d{3})(\d{3})(\d{4})/, '$1 $2 $3 $4');

    // Detect mobile: either touch device or narrow viewport
    var isMobile = ('ontouchstart' in window) || (window.innerWidth <= 768);

    document.addEventListener('DOMContentLoaded', function () {
        // Update all tel: links
        document.querySelectorAll('a[href^="tel:"]').forEach(function (el) {
            el.href = 'tel:+' + chosen;
        });

        // Update all WhatsApp links
        document.querySelectorAll('a[href*="wa.me/"]').forEach(function (el) {
            el.href = 'https://wa.me/' + chosen;
        });

        // Smart "Call Now" nav button:
        // On mobile → direct tel: call; on desktop → go to contact page
        document.querySelectorAll('a.button.primary[href*="Call Now"], nav a.button.primary').forEach(function (el) {
            if (el.textContent.trim() === 'Call Now') {
                if (isMobile) {
                    el.href = 'tel:+' + chosen;
                } else {
                    el.href = 'contact.html';
                }
            }
        });

        // Update any visible phone display text (elements with class contact-display-phone)
        document.querySelectorAll('.contact-display-phone').forEach(function (el) {
            el.textContent = display;
        });
    });
})();
