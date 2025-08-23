/**
 * Animations Module
 * Handles scroll animations, typing effects, and visual enhancements
 */

class Animations {
    constructor() {
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        this.animationsReady = false;
        this.onReadyCallbacks = [];
        
        this.init();
    }

    init() {
        this.setupScrollAnimations();
        this.setupCounterAnimations();
        this.setupTypingAnimation();
        this.setupParallaxEffect();
        this.setupLoadingAnimation();
    }

    // Method to register callbacks for when animations are ready
    onReady(callback) {
        if (this.animationsReady) {
            callback();
        } else {
            this.onReadyCallbacks.push(callback);
        }
    }

    // Call this when animations are fully initialized
    markAsReady() {
        this.animationsReady = true;
        this.onReadyCallbacks.forEach(callback => callback());
        this.onReadyCallbacks = [];
    }

    setupScrollAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, this.observerOptions);

        // Observe elements for animation
        document.querySelectorAll('.project-card, .skill-category, .timeline-item').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }

    setupCounterAnimations() {
        const statsSection = document.querySelector('.about-stats');
        if (!statsSection) return;

        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounters();
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        statsObserver.observe(statsSection);
    }

    animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        
        counters.forEach(counter => {
            // Skip the GitHub projects counter - it's managed by github-stats.js
            if (counter.id === 'projects-count') {
                return;
            }
            
            const target = parseInt(counter.textContent);
            const increment = target / 200;
            let current = 0;
            
            const updateCounter = () => {
                if (current < target) {
                    current += increment;
                    counter.textContent = Math.ceil(current) + '+';
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target + '+';
                }
            };
            
            updateCounter();
        });
    }

    setupTypingAnimation() {
        window.addEventListener('load', () => {
            const heroSubtitle = document.querySelector('.hero-subtitle');
            if (!heroSubtitle) return;

            const originalText = heroSubtitle.textContent;
            
            setTimeout(() => {
                this.typeWriter(heroSubtitle, originalText, 100);
            }, 1000);
        });
    }

    typeWriter(element, text, speed = 50) {
        let i = 0;
        element.innerHTML = '';
        
        const type = () => {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        };
        
        type();
    }

    setupParallaxEffect() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallax = document.querySelector('.hero');
            
            if (parallax) {
                const speed = scrolled * 0.5;
                parallax.style.transform = `translateY(${speed}px)`;
            }
        });
    }

    setupLoadingAnimation() {
        window.addEventListener('load', () => {
            document.body.classList.add('loaded');
            
            // Mark animations as ready after a short delay to ensure everything is settled
            setTimeout(() => {
                this.markAsReady();
            }, 1500); // Wait for typing animation and other effects to complete
        });
    }
}

export default Animations;
