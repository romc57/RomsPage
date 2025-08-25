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
            const isFast = counter.dataset.speed === 'fast';
            const steps = isFast ? 80 : 200; // fewer steps = faster
            const increment = target / steps;
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
            const desktopSpan = document.querySelector('.subtitle-desktop');
            const mobileContainer = document.querySelector('.subtitle-mobile');
            if (!desktopSpan || !mobileContainer) return;

            const mobileLines = Array.from(mobileContainer.querySelectorAll('.subtitle-line'));
            const mobileOriginalHtml = mobileLines.map(line => line.textContent.trim());

            const getActiveType = () => window.matchMedia('(min-width: 1025px)').matches ? 'desktop' : 'mobile';

            // Store originals
            if (!desktopSpan.dataset.originalHtml) {
                desktopSpan.dataset.originalHtml = desktopSpan.textContent.trim();
            }

            // Clear for typing
            desktopSpan.textContent = '';
            mobileLines.forEach(line => line.textContent = '');

            const typeDesktop = () => {
                if (desktopSpan.dataset.typed === 'true') { desktopSpan.style.visibility = 'visible'; return; }
                const text = desktopSpan.dataset.originalHtml;
                let i = 0;
                desktopSpan.style.visibility = 'visible';
                const step = () => {
                    if (i >= text.length) { desktopSpan.dataset.typed = 'true'; return; }
                    desktopSpan.textContent += text[i++];
                    setTimeout(step, 55);
                };
                step();
            };

            const typeMobile = () => {
                if (mobileContainer.dataset.typed === 'true') { mobileContainer.style.visibility = 'visible'; return; }
                mobileContainer.style.visibility = 'visible';
                let lineIndex = 0;
                const typeLine = () => {
                    if (lineIndex >= mobileLines.length) { mobileContainer.dataset.typed = 'true'; return; }
                    const lineEl = mobileLines[lineIndex];
                    const fullText = mobileOriginalHtml[lineIndex];
                    let charIndex = 0;
                    const typeChar = () => {
                        if (charIndex >= fullText.length) { lineIndex++; setTimeout(typeLine, 150); return; }
                        lineEl.textContent += fullText[charIndex++];
                        setTimeout(typeChar, 55);
                    };
                    typeChar();
                };
                typeLine();
            };

            const runInitial = () => {
                const active = getActiveType();
                if (active === 'desktop') {
                    mobileContainer.style.visibility = 'hidden';
                    typeDesktop();
                } else {
                    desktopSpan.style.visibility = 'hidden';
                    typeMobile();
                }
            };

            runInitial();

            let lastDesktop = window.matchMedia('(min-width: 1025px)').matches;
            window.addEventListener('resize', () => {
                const isDesktop = window.matchMedia('(min-width: 1025px)').matches;
                if (isDesktop !== lastDesktop) {
                    lastDesktop = isDesktop;
                    if (isDesktop) {
                        mobileContainer.style.visibility = 'hidden';
                        typeDesktop();
                    } else {
                        desktopSpan.style.visibility = 'hidden';
                        typeMobile();
                    }
                }
            });
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
