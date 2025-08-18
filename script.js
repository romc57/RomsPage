/**
 * Legacy script.js file for backwards compatibility
 * This file contains the original functionality without ES6 modules
 * for older browsers that don't support module loading
 */

// Initialize the legacy portfolio when the DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLegacyPortfolio);
} else {
    initLegacyPortfolio();
}

/**
 * Legacy portfolio initialization for older browsers
 * Contains all functionality without ES6 modules
 */
function initLegacyPortfolio() {
    console.log('Initializing legacy portfolio for older browsers...');
    // ===== NAVIGATION MODULE =====
    initNavigation();
    
    function initNavigation() {
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('nav-menu');

        if (hamburger && navMenu) {
            // Mobile Navigation Toggle
            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('active');
                navMenu.classList.toggle('active');
            });

            // Close mobile menu when clicking on a link
            document.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', () => {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                });
            });

            // Keyboard navigation support
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                }
            });
        }

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const offsetTop = target.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Setup scroll-based navigation behavior
        setupScrollNavigation();
    }

    function setupScrollNavigation() {
        // Debounced scroll handler for performance
        let scrollTimer = null;
        
        window.addEventListener('scroll', () => {
            if (scrollTimer) {
                clearTimeout(scrollTimer);
            }
            
            scrollTimer = setTimeout(() => {
                handleScrollEffects();
            }, 10);
        });
    }

    function handleScrollEffects() {
        // Navbar background on scroll
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (window.scrollY > 100) {
                navbar.style.background = 'rgba(10, 10, 10, 0.98)';
                navbar.style.boxShadow = '0 2px 20px rgba(220, 38, 38, 0.3)';
            } else {
                navbar.style.background = 'rgba(10, 10, 10, 0.95)';
                navbar.style.boxShadow = 'none';
            }
        }

        // Active navigation link highlighting
        updateActiveNavLink();
    }

    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    // ===== CONTACT FORM MODULE =====
    initContactForm();
    
    function initContactForm() {
        const contactForm = document.querySelector('.contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const formData = new FormData(this);
                const name = formData.get('name');
                const email = formData.get('email');
                const subject = formData.get('subject');
                const message = formData.get('message');
                
                // Basic validation
                if (!name || !email || !subject || !message) {
                    showFormMessage('Please fill in all fields.', 'error');
                    return;
                }
                
                if (!isValidEmail(email)) {
                    showFormMessage('Please enter a valid email address.', 'error');
                    return;
                }
                
                // Success message
                showFormMessage('Thank you for your message! I\'ll get back to you soon.', 'success');
                this.reset();
            });
        }
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function showFormMessage(message, type) {
        // Simple alert for legacy browsers (can be enhanced with better UI)
        alert(message);
    }

    // ===== ANIMATIONS MODULE =====
    initAnimations();
    
    function initAnimations() {
        // Initialize all animation features
        initScrollAnimations();
        initCounterAnimations();
        initTypingAnimation();
        initLoadingAnimation();
        initParallaxEffect();
    }

    function initScrollAnimations() {
        // Check for IntersectionObserver support
        if ('IntersectionObserver' in window) {
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }
                });
            }, observerOptions);

            // Observe elements for animation
            document.querySelectorAll('.project-card, .skill-category, .timeline-item').forEach(el => {
                el.style.opacity = '0';
                el.style.transform = 'translateY(30px)';
                el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                observer.observe(el);
            });
        } else {
            // Fallback for browsers without IntersectionObserver
            document.querySelectorAll('.project-card, .skill-category, .timeline-item').forEach(el => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            });
        }
    }

    function initCounterAnimations() {
        const statsSection = document.querySelector('.about-stats');
        if (statsSection) {
            if ('IntersectionObserver' in window) {
                const statsObserver = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            animateCounters();
                            statsObserver.unobserve(entry.target);
                        }
                    });
                }, { threshold: 0.5 });
                
                statsObserver.observe(statsSection);
            } else {
                // Fallback - animate on load
                animateCounters();
            }
        }
    }

    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        counters.forEach(counter => {
            const target = parseInt(counter.textContent) || 0;
            const increment = target / 200;
            let current = 0;
            
            const updateCounter = () => {
                if (current < target) {
                    current += increment;
                    counter.textContent = Math.ceil(current) + '+';
                    if (window.requestAnimationFrame) {
                        requestAnimationFrame(updateCounter);
                    } else {
                        setTimeout(updateCounter, 16); // Fallback for older browsers
                    }
                } else {
                    counter.textContent = target + '+';
                }
            };
            
            updateCounter();
        });
    }

    function initTypingAnimation() {
        window.addEventListener('load', () => {
            const heroSubtitle = document.querySelector('.hero-subtitle');
            if (heroSubtitle) {
                const originalText = heroSubtitle.textContent;
                setTimeout(() => {
                    typeWriter(heroSubtitle, originalText, 100);
                }, 1000);
            }
        });
    }

    function typeWriter(element, text, speed = 50) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }

    function initLoadingAnimation() {
        window.addEventListener('load', () => {
            document.body.classList.add('loaded');
        });
    }

    function initParallaxEffect() {
        // Simple parallax effect for hero section
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallax = document.querySelector('.hero');
            
            if (parallax) {
                const speed = scrolled * 0.5;
                parallax.style.transform = `translateY(${speed}px)`;
            }
        });
    }

    // ===== UTILITY FUNCTIONS =====
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

    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    // ===== GLOBAL ERROR HANDLING =====
    window.addEventListener('error', (e) => {
        console.error('Portfolio Error:', e.error);
    });

    console.log('✅ Legacy portfolio initialized successfully for older browsers');
}
