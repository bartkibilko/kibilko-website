// ==========================================
// SMOOTH SCROLL & NAVIGATION
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');

            // Animate hamburger icon
            const spans = this.querySelectorAll('span');
            if (navLinks.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translateY(8px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translateY(-8px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }

    // Close mobile menu on link click
    const navLinkItems = document.querySelectorAll('.nav-links a');
    navLinkItems.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                navLinks.classList.remove('active');
                const spans = mobileMenuToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    });

    // Navbar scroll effect
    const nav = document.querySelector('.nav');

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // Active navigation link on scroll
    const sections = document.querySelectorAll('section[id]');

    function updateActiveLink() {
        const scrollY = window.pageYOffset;

        navLinkItems.forEach(link => link.classList.remove('active-link'));

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-links a[href="#${sectionId}"]:not(.btn-nav-cta)`);

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                if (navLink) {
                    navLink.classList.add('active-link');
                }
            }
        });
    }

    window.addEventListener('scroll', updateActiveLink);
    updateActiveLink();
});

// ==========================================
// CONTACT FORM HANDLING - Web3Forms Integration
// ==========================================

const contactForm = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');

if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        const formData = new FormData(contactForm);

        const originalBtnText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
            <span style="display: inline-flex; align-items: center; gap: 0.5rem;">
                <svg class="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="animation: spin 1s linear infinite;">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" stroke-opacity="0.25"></circle>
                    <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" opacity="0.75"></path>
                </svg>
                Wysyłanie...
            </span>
        `;

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            });

            const result = await response.json();

            if (result.success) {
                showNotification('Wiadomosc wyslana! Odpowiem w ciagu 24h.', 'success');
                contactForm.reset();
            } else {
                throw new Error('Server error');
            }
        } catch (error) {
            showNotification('Cos poszlo nie tak. Sprobuj ponownie lub skontaktuj sie przez LinkedIn.', 'error', 'https://www.linkedin.com/in/bartkibilko/');
            console.error('Form submission error:', error);
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
        }
    });
}

// ==========================================
// SCROLL REVEAL ANIMATIONS (STAGGERED)
// ==========================================

function revealOnScroll() {
    const revealGroups = [
        { selector: '.service-card', parent: '.services-grid' },
        { selector: '.client-card', parent: '.clients-grid' },
        { selector: '.tech-item', parent: '.tech-grid' },
        { selector: '.stack-category', parent: '.stack-categories' },
        { selector: '.stat', parent: '.hero-stats' }
    ];

    revealGroups.forEach(group => {
        const elements = document.querySelectorAll(group.selector);
        elements.forEach((element, index) => {
            const windowHeight = window.innerHeight;
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 100;

            if (elementTop < windowHeight - elementVisible) {
                const delay = index * 80;
                setTimeout(() => {
                    element.classList.add('revealed');
                }, delay);
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll(
        '.service-card, .client-card, .tech-item, .stack-category, .stat'
    );
    animatedElements.forEach(element => {
        element.classList.add('scroll-reveal');
    });

    revealOnScroll();
});

window.addEventListener('scroll', revealOnScroll);

// ==========================================
// COUNTER ANIMATION FOR STATS
// ==========================================

function animateCounters() {
    const statNumbers = document.querySelectorAll('.stat-number');

    statNumbers.forEach(stat => {
        if (stat.dataset.animated) return;

        const rect = stat.getBoundingClientRect();
        if (rect.top > window.innerHeight || rect.bottom < 0) return;

        const text = stat.textContent.trim();

        if (text === '14 000+') {
            stat.dataset.animated = 'true';
            animateCoffee(stat, 0, 14000, 2000);
        }
    });
}

function animateCoffee(element, start, end, duration) {
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(start + (end - start) * eased);

        element.textContent = current.toLocaleString('pl-PL') + '+';

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}

function animateNumber(element, start, end, duration, suffix) {
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(start + (end - start) * eased);

        element.textContent = current + suffix;

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}

window.addEventListener('scroll', animateCounters);
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(animateCounters, 500);
});

// ==========================================
// BACK TO TOP BUTTON
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    const backToTop = document.createElement('button');
    backToTop.innerHTML = `<svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"></path></svg>`;
    backToTop.className = 'back-to-top';
    backToTop.setAttribute('aria-label', 'Back to top');
    document.body.appendChild(backToTop);

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 400) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

// ==========================================
// PERFORMANCE: LAZY LOADING IMAGES
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
});

// ==========================================
// UTILITY: COPY TO CLIPBOARD
// ==========================================

function copyToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => {
            showNotification('Email skopiowany do schowka!');
        }).catch(err => {
            console.error('Copy error:', err);
        });
    }
}

function showNotification(message, type = 'success', linkUrl = null) {
    const notification = document.createElement('div');

    if (linkUrl) {
        const textNode = document.createTextNode(message.replace('LinkedIn', ''));
        notification.appendChild(textNode);
        const link = document.createElement('a');
        link.href = linkUrl;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.textContent = 'LinkedIn';
        link.style.cssText = 'color: inherit; text-decoration: underline; font-weight: 700;';
        notification.appendChild(link);
    } else {
        notification.textContent = message;
    }

    const bgColor = type === 'success' ? 'rgba(74, 222, 128, 0.15)' : 'rgba(248, 113, 113, 0.15)';
    const borderColor = type === 'success' ? 'rgba(74, 222, 128, 0.3)' : 'rgba(248, 113, 113, 0.3)';
    const textColor = type === 'success' ? '#4ade80' : '#f87171';

    notification.style.cssText = `
        position: fixed;
        top: 2rem;
        right: 2rem;
        background: ${bgColor};
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        color: ${textColor};
        padding: 1rem 1.5rem;
        border-radius: 10px;
        border: 1px solid ${borderColor};
        box-shadow: 0 10px 40px -10px rgba(0,0,0,0.5);
        z-index: 9999;
        animation: slideIn 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.875rem;
        font-weight: 500;
        max-width: 90%;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards';
        setTimeout(() => {
            if (notification.parentNode) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

// ==========================================
// CSS ANIMATIONS (injected)
// ==========================================

const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }

    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }

    .scroll-reveal {
        opacity: 0;
        transform: translateY(24px);
        transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1),
                    transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .scroll-reveal.revealed {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);

// ==========================================
// CONSOLE MESSAGE
// ==========================================

console.log('%cBK_', 'font-size: 24px; font-weight: bold; color: #d4a843; font-family: monospace;');
console.log('%cSzukasz programisty? Wypelnij formularz kontaktowy lub LinkedIn!', 'font-size: 13px; color: #8a8680; font-family: monospace;');
console.log('%c> HTML + CSS + JavaScript', 'font-size: 11px; color: #5a5650; font-family: monospace;');
