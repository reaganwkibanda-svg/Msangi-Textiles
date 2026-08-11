/* =========================
   MADAM RITA - MAIN JAVASCRIPT
========================= */

document.addEventListener('DOMContentLoaded', () => {
    setupMobileMenu();
    setupGalleryLightbox();
    setupBackToTop();
    setupLanguageToggle();
    setupThemeToggle();
    setupScrollReveal();
});

/**
 * Setup mobile hamburger menu toggle functionality.
 */
function setupMobileMenu() {
    const toggleButton = document.getElementById('mobileMenuToggle');
    const mainNav = document.getElementById('mainNav');
    const navLinks = document.querySelectorAll('.nav-link');

    if (!toggleButton || !mainNav) return;

    toggleButton.addEventListener('click', () => {
        const isOpen = mainNav.classList.toggle('open');
        toggleButton.setAttribute('aria-expanded', isOpen);
    });

    // Close mobile menu when a navigation link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mainNav.classList.remove('open');
            toggleButton.setAttribute('aria-expanded', 'false');
        });
    });
}

/**
 * Setup image gallery lightbox popup functionality.
 */
function setupGalleryLightbox() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightboxModal = document.getElementById('lightboxModal');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxClose = document.getElementById('lightboxClose');

    if (!lightboxModal || !lightboxImg || !lightboxClose) return;

    galleryItems.forEach(item => {
        const img = item.querySelector('img');
        if (!img) return;

        item.addEventListener('click', () => {
            lightboxImg.src = img.src;
            lightboxImg.alt = img.alt;
            lightboxModal.classList.add('active');
            lightboxModal.setAttribute('aria-hidden', 'false');
        });
    });

    // Close Lightbox when close button is clicked
    lightboxClose.addEventListener('click', closeLightbox);

    // Close Lightbox when clicking outside the image
    lightboxModal.addEventListener('click', (e) => {
        if (e.target === lightboxModal) {
            closeLightbox();
        }
    });

    // Close Lightbox with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightboxModal.classList.contains('active')) {
            closeLightbox();
        }
    });

    function closeLightbox() {
        lightboxModal.classList.remove('active');
        lightboxModal.setAttribute('aria-hidden', 'true');
        lightboxImg.src = '';
    }
}

/**
 * Setup back-to-top button smooth scroll action.
 */
function setupBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');

    if (!backToTopBtn) return;

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/**
 * Setup Bilingual English and Kiswahili Language Toggle System.
 */
function setupLanguageToggle() {
    const langToggleBtn = document.getElementById('langToggleBtn');
    const currentLangIndicator = document.getElementById('currentLangIndicator');

    if (!langToggleBtn || !currentLangIndicator) return;

    let currentLang = localStorage.getItem('preferredLang') || 'en';
    applyLanguage(currentLang);

    langToggleBtn.addEventListener('click', () => {
        currentLang = currentLang === 'en' ? 'sw' : 'en';
        localStorage.setItem('preferredLang', currentLang);
        applyLanguage(currentLang);
    });

    function applyLanguage(lang) {
        currentLangIndicator.textContent = lang === 'en' ? 'SW' : 'EN';
        document.documentElement.setAttribute('lang', lang);

        const translatables = document.querySelectorAll('[data-en][data-sw]');
        translatables.forEach(el => {
            const translation = el.getAttribute(`data-${lang}`);
            if (translation !== null) {
                el.innerHTML = translation;
            }
        });
    }
}

/**
 * Setup Dark & Light Mode Theme Toggle System.
 */
function setupThemeToggle() {
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    if (!themeToggleBtn) return;

    let currentTheme = localStorage.getItem('preferredTheme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);

    themeToggleBtn.addEventListener('click', () => {
        currentTheme = currentTheme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', currentTheme);
        localStorage.setItem('preferredTheme', currentTheme);
    });
}

/**
 * Setup Scroll Reveal Animation using Intersection Observer.
 */
function setupScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal');
    if (!revealElements.length) return;

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.12
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });
}