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
            if (src) {
                // encode spaces and special characters for GitHub Pages URLs
                try {
                    src = encodeURI(src.trim());
                } catch (err) {
                    console.warn('Failed to encode poster src', src, err);
                }
                // quick check: log the final URL for troubleshooting on GitHub
                console.info('Opening poster:', src);
                openLightbox(src, el.getAttribute('aria-label') || 'Poster full view');
            }
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

// =====================
// AI Chatbot Widget
// =====================

document.addEventListener('DOMContentLoaded', () => {
    const chatbotToggle = document.getElementById('chatbot-toggle');
    const chatbotWidget = document.getElementById('chatbot');
    const chatInput = document.querySelector('.chatbot-input');
    const chatSend = document.querySelector('.chatbot-send');
    const chatMessages = document.querySelector('.chatbot-messages');
    const chatMinimize = document.querySelector('.chatbot-minimize');

    let isOpen = false;

    // Toggle chatbot open/close
    chatbotToggle.addEventListener('click', () => {
        isOpen = !isOpen;
        chatbotWidget.classList.toggle('open', isOpen);
        chatbotToggle.classList.toggle('open', isOpen);
        if (isOpen) {
            chatInput.focus();
            // Show welcome message on first open
            if (chatMessages.children.length === 0) {
                addMessage('Hello! 👋 I\'m here to help you learn more about Rohini\'s portfolio and design work. Ask me anything!', 'assistant');
            }
        }
    });

    // Minimize button
    chatMinimize.addEventListener('click', () => {
        isOpen = false;
        chatbotWidget.classList.remove('open');
        chatbotToggle.classList.remove('open');
    });

    // Add message to chat
    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${sender}`;
        const bubble = document.createElement('div');
        bubble.className = 'chat-bubble';
        bubble.textContent = text;
        messageDiv.appendChild(bubble);
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Show typing indicator
    function showTyping() {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'chat-message assistant';
        messageDiv.id = 'typing-indicator';
        messageDiv.innerHTML = '<div class="chat-bubble"><div class="chat-loading"><span></span><span></span><span></span></div></div>';
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Remove typing indicator
    function removeTyping() {
        const indicator = document.getElementById('typing-indicator');
        if (indicator) indicator.remove();
    }

    // Get AI response (using a simple approach with built-in knowledge)
    async function getAIResponse(userMessage) {
        const msg = userMessage.toLowerCase();

        // Context about Rohini's portfolio
        const portfolioContext = {
            skills: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Figma', 'UI/UX Design', 'Canva', 'Wix'],
            projects: ['Dog Walker Responsive Front-End Web App', 'Travel Fun', 'Portfolio Website'],
            roles: ['Front-end Developer', 'UI/UX Researcher', 'Graphic Designer', 'B.Tech Student'],
            experience: ['PwC Women Leadership Development Program', 'Driveblaze', 'Google Gemini Student Community'],
            designs: ['Posters', 'Magazines', 'UI/UX designs']
        };

        // Simple keyword matching for common questions
        if (msg.includes('skills') || msg.includes('what can')) {
            return `Rohini specializes in: ${portfolioContext.skills.join(', ')}. She loves combining design with development to create amazing user experiences! 🎨✨`;
        }
        if (msg.includes('project') || msg.includes('work')) {
            return `Rohini has worked on several projects including: ${portfolioContext.projects.join(', ')}. Check out the "MY WORKS" section to see her latest creations! 🚀`;
        }
        if (msg.includes('experience') || msg.includes('background')) {
            return `Rohini is a third-year B.Tech student with diverse experience including PwC WLDP, Driveblaze, and Google Gemini Community roles. She's a passionate designer and developer! 👩‍💻`;
        }
        if (msg.includes('design') || msg.includes('poster') || msg.includes('magazine')) {
            return `Rohini creates beautiful designs across posters, magazines, and UI/UX. Her work combines creativity with technical precision. Visit the posters section to see her amazing designs! 🎨`;
        }
        if (msg.includes('frontend') || msg.includes('frontend') || msg.includes('react') || msg.includes('javascript')) {
            return `Yes! Rohini is proficient in HTML5, CSS3, JavaScript and React. She builds responsive, user-centric web applications that are both beautiful and functional! 💻`;
        }
        if (msg.includes('ux') || msg.includes('ui') || msg.includes('research')) {
            return `Rohini is passionate about UI/UX Research and Design! She believes great design mirrors discipline: structured, intentional, and continuously refined. Human-centered design is her focus! 🎯`;
        }
        if (msg.includes('contact') || msg.includes('email') || msg.includes('reach')) {
            return `You can find more about connecting with Rohini through the portfolio page. Check the footer for social links or scroll to the About section! 📧`;
        }
        if (msg.includes('portfolio') || msg.includes('website')) {
            return `Welcome to Rohini's portfolio! Here you can explore her design work, projects, skills, and background. Feel free to browse the sections and click on any poster to view it in fullscreen! 🌟`;
        }
        if (msg.includes('hi') || msg.includes('hello') || msg.includes('hey')) {
            return `Hey there! 👋 I'm Rohini's AI assistant. I'm here to help you navigate the portfolio and answer questions about her work, skills, and projects. What would you like to know? 😊`;
        }

        // Default response for general questions
        return `That's an interesting question! While I'm specifically trained on Rohini's portfolio, I can tell you she's a talented UI/UX researcher, front-end developer, and graphic designer. Feel free to explore the website to learn more, or ask me specifically about her skills, projects, or experience! 🤖✨`;
    }

    // Send message
    async function sendMessage() {
        const userMessage = chatInput.value.trim();
        if (!userMessage) return;

        // Add user message
        addMessage(userMessage, 'user');
        chatInput.value = '';

        // Show typing indicator
        showTyping();

        // Simulate slight delay for natural feel
        setTimeout(async () => {
            removeTyping();
            const response = await getAIResponse(userMessage);
            addMessage(response, 'assistant');
        }, 600);
    }

    // Send button click
    chatSend.addEventListener('click', sendMessage);

    // Enter key to send
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });
});
