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
