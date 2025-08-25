/**
 * Main Application Module
 * Initializes and coordinates all portfolio modules
 */

import Navigation from './navigation.js';
import ContactForm from './contact.js';
import Animations from './animations.js';
import Utils from './utils.js';
import GitHubStats from './github-stats.js';

class Portfolio {
    constructor() {
        this.modules = {};
        this.init();
    }

    init() {
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initializeModules());
        } else {
            this.initializeModules();
        }
    }

    initializeModules() {
        try {
            // Initialize core modules
            this.modules.navigation = new Navigation();
            this.modules.contactForm = new ContactForm();
            this.modules.animations = new Animations();

            // Attempt early technologies count (will retry until skills present)
            this.updateTechnologiesCount();

            // Initialize GitHub stats module AFTER animations are ready
            this.modules.animations.onReady(() => {
                this.modules.gitHubStats = new GitHubStats();
                this.modules.gitHubStats.init();
                    
                // Update technologies count after animations are ready (only if not already computed)
                const techEl = document.getElementById('technologies-count');
                if (!techEl || !techEl.dataset.computed) {
                    this.updateTechnologiesCount();
                }
            });

            // Setup global event listeners
            this.setupGlobalEvents();

            // Initialize performance optimizations
            this.setupPerformanceOptimizations();

            console.log('Portfolio initialized successfully');
        } catch (error) {
            console.error('Error initializing portfolio:', error);
        }
    }

    setupGlobalEvents() {
        // Handle window resize
        window.addEventListener('resize', Utils.throttle(() => {
            this.handleResize();
        }, 250));

        // Handle visibility change (for performance)
        document.addEventListener('visibilitychange', () => {
            this.handleVisibilityChange();
        });

        // Make toggleDescription available globally for onclick handlers
        window.toggleDescription = (button) => {
            const description = button.closest('.project-description');
            const preview = description.querySelector('.description-preview');
            const full = description.querySelector('.description-full');
            
            if (full.style.display === 'none') {
                // Show full description
                preview.style.display = 'none';
                full.style.display = 'block';
                button.textContent = 'See less';
            } else {
                // Show preview
                preview.style.display = 'block';
                full.style.display = 'none';
                button.textContent = 'See more';
            }
        };
    }

    setupPerformanceOptimizations() {
        // Lazy load images if IntersectionObserver is supported
        if ('IntersectionObserver' in window) {
            this.setupLazyLoading();
        }

        // Preload critical images
        const criticalImages = [
            'rom-cohen-profile.jpg'
        ];
        Utils.preloadImages(criticalImages);
    }

    setupLazyLoading() {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    handleResize() {
        // Handle responsive adjustments if needed
        const isMobile = Utils.isMobileDevice();
        document.body.classList.toggle('mobile', isMobile);
    }

    handleVisibilityChange() {
        if (document.hidden) {
            // Page is hidden, pause non-essential animations
            document.body.classList.add('page-hidden');
        } else {
            // Page is visible, resume animations
            document.body.classList.remove('page-hidden');
        }
    }

    // Public methods for external interaction
    scrollToSection(sectionId) {
        const target = document.getElementById(sectionId);
        if (target) {
            Utils.smoothScrollTo(target);
        }
    }

    showNotification(message, type = 'info') {
        // Create a simple notification system
        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('notification--show');
        }, 100);

        setTimeout(() => {
            notification.classList.remove('notification--show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    /**
     * Toggle project description between preview and full text
     * @param {HTMLElement} button - The button that was clicked
     */
    toggleDescription(button) {
        const description = button.closest('.project-description');
        const preview = description.querySelector('.description-preview');
        const full = description.querySelector('.description-full');
        
        if (full.style.display === 'none') {
            // Show full description
            preview.style.display = 'none';
            full.style.display = 'block';
            button.textContent = 'See less';
        } else {
            // Show preview
            preview.style.display = 'block';
            full.style.display = 'none';
            button.textContent = 'See more';
        }
    }

    /**
     * Count and update the technologies & skills stat from the skills section.
     * Counts ALL unique skill items across every category (robust to DOM order changes).
     * Retries a few times if the skills section not yet in DOM.
     */
    updateTechnologiesCount(retry = 0) {
        try {
            const technologiesCountElement = document.getElementById('technologies-count');
            if (!technologiesCountElement) return; // No element present

            const skillItems = document.querySelectorAll('.skills .skill-item');
            if (!skillItems.length) {
                // Skills not yet rendered; retry up to 10 times with small delay
                if (retry < 10) {
                    setTimeout(() => this.updateTechnologiesCount(retry + 1), 150);
                }
                return;
            }

            const unique = new Set();
            skillItems.forEach(item => {
                const txt = item.textContent.trim().toLowerCase();
                if (txt) unique.add(txt);
            });

            const total = unique.size;
            if (total > 0) {
                technologiesCountElement.textContent = `${total}+`;
                technologiesCountElement.dataset.computed = 'true';
            }
        } catch (error) {
            console.error('Error updating technologies count:', error);
        }
    }

    // Destroy method for cleanup
    destroy() {
        // Remove event listeners and clean up modules
        Object.values(this.modules).forEach(module => {
            if (module.destroy && typeof module.destroy === 'function') {
                module.destroy();
            }
        });
    }
}

// Initialize the portfolio when the script loads
const portfolio = new Portfolio();

// Make it globally accessible for debugging/external access
window.Portfolio = portfolio;

/**
 * Copy email to clipboard functionality
 */
window.copyEmail = async function() {
    const email = 'rom.cohen10@gmail.com';
    const emailElement = document.querySelector('.email-copy');
    const tooltip = emailElement.querySelector('.copy-tooltip');
    
    try {
        // Try modern clipboard API first
        if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(email);
        } else {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = email;
            textArea.style.position = 'fixed';
            textArea.style.left = '-999999px';
            textArea.style.top = '-999999px';
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            document.execCommand('copy');
            textArea.remove();
        }
        
        // Show success feedback
        emailElement.classList.add('copy-success');
        tooltip.textContent = 'Copied!';
        
        // Reset after 2 seconds
        setTimeout(() => {
            emailElement.classList.remove('copy-success');
            tooltip.textContent = 'Copy to clipboard';
        }, 2000);
        
    } catch (err) {
        console.error('Failed to copy email:', err);
        // Show error feedback
        tooltip.textContent = 'Copy failed';
        setTimeout(() => {
            tooltip.textContent = 'Copy to clipboard';
        }, 2000);
    }
};

export default Portfolio;
