// ==================== LOADING SCREEN ====================
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loader').classList.add('hidden');
    }, 1200);
});

// ==================== TYPING EFFECT ====================
const texts = [
    'Web Developer | AI Enthusiast | Problem Solver',
    'Building intelligent solutions with code',
    '190+ LeetCode problems solved 🎯',
    'Passionate about NLP & Machine Learning 🤖',
    'Creating beautiful web experiences ✨'
];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typedTextElement = document.getElementById('typed-text');
const typingSpeed = 100;
const deletingSpeed = 50;
const pauseTime = 2000;

function typeText() {
    const currentText = texts[textIndex];
    
    if (isDeleting) {
        typedTextElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typedTextElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }

    let speed = isDeleting ? deletingSpeed : typingSpeed;

    if (!isDeleting && charIndex === currentText.length) {
        speed = pauseTime;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        speed = 500;
    }

    setTimeout(typeText, speed);
}

// Start typing effect after page load
window.addEventListener('load', () => {
    setTimeout(typeText, 1500);
});

// ==================== SMOOTH SCROLL ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start' 
            });
            
            // Update active nav link
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            this.classList.add('active');
            
            // Close mobile menu if open
            const navLinks = document.getElementById('navLinks');
            const mobileMenuBtn = document.getElementById('mobileMenuBtn');
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
            }
        }
    });
});

// ==================== SCROLL PROGRESS BAR ====================
window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    document.getElementById('progress-bar').style.width = scrolled + '%';
});

// ==================== NAVBAR SCROLL EFFECT ====================
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ==================== MOBILE MENU ====================
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target) && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
    }
});

// ==================== SCROLL TO TOP BUTTON ====================
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 500) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

function scrollToTop() {
    window.scrollTo({ 
        top: 0, 
        behavior: 'smooth' 
    });
}

scrollTopBtn.addEventListener('click', scrollToTop);

// ==================== INTERSECTION OBSERVER FOR SECTIONS ====================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('.section, .about-card, .project-card').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'all 0.6s ease';
    sectionObserver.observe(section);
});

// ==================== COUNTER ANIMATION ====================
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + '+';
        }
    };

    updateCounter();
}

// Trigger counter animation when visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.querySelectorAll('[data-target]').forEach(counter => {
                animateCounter(counter);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

// Observe hero stats and other counters
document.querySelectorAll('.hero-stats, .stat-item').forEach(stat => {
    statsObserver.observe(stat);
});

// ==================== SKILL PROGRESS BARS ====================
const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBars = entry.target.querySelectorAll('.skill-progress');
            progressBars.forEach(bar => {
                const progress = bar.getAttribute('data-progress');
                setTimeout(() => {
                    bar.style.width = progress + '%';
                }, 200);
            });
            skillsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

// Observe skills section
document.querySelectorAll('.skill-category').forEach(category => {
    skillsObserver.observe(category);
});

// ==================== ACTIVE NAVIGATION ====================
const sections = document.querySelectorAll('.section, .hero');
const navItems = document.querySelectorAll('.nav-link');

const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navItems.forEach(item => {
                item.classList.remove('active');
                if (item.getAttribute('href') === `#${id}`) {
                    item.classList.add('active');
                }
            });
        }
    });
}, { threshold: 0.3 });

sections.forEach(section => {
    navObserver.observe(section);
});

// ==================== PARALLAX EFFECT ====================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.4}px)`;
    }
    
    // Parallax for floating orbs
    const orbs = document.querySelectorAll('.gradient-orb');
    orbs.forEach((orb, index) => {
        const speed = (index + 1) * 0.1;
        orb.style.transform = `translate(${scrolled * speed}px, ${scrolled * speed}px)`;
    });
});

// ==================== CUSTOM CURSOR ====================
const cursorDot = document.getElementById('cursorDot');
const cursorOutline = document.getElementById('cursorOutline');

// Only show custom cursor on desktop
if (window.innerWidth > 768) {
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX;
        const y = e.clientY;
        
        cursorDot.style.left = x + 'px';
        cursorDot.style.top = y + 'px';
        
        cursorOutline.style.left = x + 'px';
        cursorOutline.style.top = y + 'px';
    });

    // Cursor effects on hover
    const hoverElements = document.querySelectorAll('a, button, .project-card, .skill-card, .about-card');
    
    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursorDot.style.transform = 'scale(1.5)';
            cursorOutline.style.transform = 'scale(1.5)';
        });
        
        element.addEventListener('mouseleave', () => {
            cursorDot.style.transform = 'scale(1)';
            cursorOutline.style.transform = 'scale(1)';
        });
    });
}

// ==================== PROJECT CARD TILT EFFECT ====================
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// ==================== SKILL CARD HOVER EFFECT ====================
document.querySelectorAll('.skill-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.background = 'rgba(255, 255, 255, 0.1)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.background = 'rgba(255, 255, 255, 0.05)';
    });
});

// ==================== LAZY LOADING FOR IMAGES ====================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ==================== KEYBOARD SHORTCUTS ====================
document.addEventListener('keydown', (e) => {
    // Press 'T' to scroll to top
    if (e.key === 't' || e.key === 'T') {
        scrollToTop();
    }
    
    // Press 'H' to go to home
    if (e.key === 'h' || e.key === 'H') {
        document.querySelector('#home').scrollIntoView({ behavior: 'smooth' });
    }
    
    // Press 'C' to go to contact
    if (e.key === 'c' || e.key === 'C') {
        document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
    }
});

// ==================== EASTER EGG: KONAMI CODE ====================
let konamiCode = [];
const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);

    if (konamiCode.join(',') === konamiPattern.join(',')) {
        activateEasterEgg();
    }
});

function activateEasterEgg() {
    // Create confetti effect
    const colors = ['#667eea', '#764ba2', '#f093fb', '#4facfe', '#00f2fe'];
    
    for (let i = 0; i < 100; i++) {
        createConfetti(colors[Math.floor(Math.random() * colors.length)]);
    }
    
    // Show message
    const message = document.createElement('div');
    message.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 30px 50px;
        border-radius: 20px;
        font-size: 24px;
        font-weight: bold;
        z-index: 10001;
        animation: bounceIn 0.5s ease;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
    `;
    message.textContent = '🎉 Konami Code Activated! 🎉';
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.style.animation = 'bounceOut 0.5s ease';
        setTimeout(() => message.remove(), 500);
    }, 3000);
}

function createConfetti(color) {
    const confetti = document.createElement('div');
    confetti.style.cssText = `
        position: fixed;
        width: 10px;
        height: 10px;
        background: ${color};
        top: -10px;
        left: ${Math.random() * 100}vw;
        opacity: 1;
        z-index: 10000;
        border-radius: 2px;
    `;
    document.body.appendChild(confetti);
    
    const fall = () => {
        const top = parseFloat(confetti.style.top);
        const left = parseFloat(confetti.style.left);
        
        if (top < window.innerHeight) {
            confetti.style.top = (top + 5) + 'px';
            confetti.style.left = (left + (Math.random() - 0.5) * 2) + 'px';
            confetti.style.transform = `rotate(${top * 2}deg)`;
            requestAnimationFrame(fall);
        } else {
            confetti.remove();
        }
    };
    
    fall();
}

// Add bounce animations
const style = document.createElement('style');
style.textContent = `
    @keyframes bounceIn {
        0% { transform: translate(-50%, -50%) scale(0); }
        50% { transform: translate(-50%, -50%) scale(1.1); }
        100% { transform: translate(-50%, -50%) scale(1); }
    }
    @keyframes bounceOut {
        0% { transform: translate(-50%, -50%) scale(1); }
        100% { transform: translate(-50%, -50%) scale(0); }
    }
`;
document.head.appendChild(style);

// ==================== PERFORMANCE OPTIMIZATION ====================
// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ==================== FORM VALIDATION (if needed) ====================
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// ==================== THEME TOGGLE (Optional Enhancement) ====================
// Uncomment if you want to add dark mode toggle
/*
const themeToggle = document.createElement('button');
themeToggle.innerHTML = '🌙';
themeToggle.style.cssText = `
    position: fixed;
    bottom: 120px;
    right: 40px;
    width: 56px;
    height: 56px;
    background: var(--gradient-primary);
    color: white;
    border: none;
    border-radius: 50%;
    font-size: 24px;
    cursor: pointer;
    z-index: 999;
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
    transition: var(--transition);
`;

document.body.appendChild(themeToggle);

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    themeToggle.innerHTML = document.body.classList.contains('dark-theme') ? '☀️' : '🌙';
});
*/

// ==================== CONSOLE MESSAGE ====================
console.log('%c👋 Hello Developer!', 'font-size: 20px; font-weight: bold; color: #667eea;');
console.log('%cInterested in the code? Check out my GitHub!', 'font-size: 14px; color: #764ba2;');
console.log('%c🎮 Try the Konami Code: ↑↑↓↓←→←→BA', 'font-size: 12px; color: #f093fb;');

// ==================== INITIALIZE ====================
console.log('Portfolio initialized successfully! ✨');