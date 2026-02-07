// =====================
// Mobile Menu Toggle
// =====================

const hamburger = document.querySelector('.hamburger');
const navbar = document.querySelector('.navbar');

hamburger.addEventListener('click', () => {
    navbar.classList.toggle('active');
});

// Close menu when a link is clicked
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navbar.classList.remove('active');
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.header')) {
        navbar.classList.remove('active');
    }
});

// Smooth scroll for internal links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href.startsWith('#')) {
            e.preventDefault();
            const targetSection = document.querySelector(href);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

// Add scroll effect to work cards
const workCards = document.querySelectorAll('.work-card');
workCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Posters card navigation
const postersCard = document.querySelector('.posters-card');
if (postersCard) {
    postersCard.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    postersCard.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
}

// Add animation to poster items on myworks page
document.addEventListener('DOMContentLoaded', function() {
    const posterItems = document.querySelectorAll('.poster-item');
    posterItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
    });

    const designItems = document.querySelectorAll('.design-item');
    designItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
    });
});

// Lightbox for posters: open full-size image on click
document.addEventListener('DOMContentLoaded', () => {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.querySelector('.lightbox-img');
    const closeBtn = document.querySelector('.lightbox-close');

    function openLightbox(src, alt) {
        if (!lightbox || !lightboxImg) return;
        lightboxImg.src = src;
        lightboxImg.alt = alt || 'Poster full view';
        lightbox.classList.add('open');
        lightbox.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        if (!lightbox) return;
        lightbox.classList.remove('open');
        lightbox.setAttribute('aria-hidden', 'true');
        lightboxImg.src = '';
        document.body.style.overflow = '';
    }

    // Click posters
    const posterImages = document.querySelectorAll('.poster-image');
    posterImages.forEach(el => {
        el.addEventListener('click', (e) => {
            // prefer explicit data-src attribute
            let src = el.getAttribute('data-src');
            if (!src) {
                // fallback: extract url(...) from inline/background-image
                const bg = getComputedStyle(el).backgroundImage;
                const match = bg && bg.match(/url\(["']?(.*?)["']?\)/);
                if (match) src = match[1];
            }
            if (src) openLightbox(src, el.getAttribute('aria-label') || 'Poster full view');
        });
    });

    // Close handlers
    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });
    }

    // ESC to close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox && lightbox.classList.contains('open')) {
            closeLightbox();
        }
    });
});
