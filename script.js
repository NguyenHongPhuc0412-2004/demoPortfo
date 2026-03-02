// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }

    // Close menu when link is clicked
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            navLinks.classList.remove('active');
        });
    });

    // ========== SCROLL PROGRESS BAR ==========
    const scrollProgressBar = document.querySelector('.scroll-progress');
    const backToTopBtn = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        // Update progress bar
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        scrollProgressBar.style.width = scrollPercent + '%';

        // Show/hide back to top button
        if (scrollTop > 500) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    // Back to top button click handler
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Form submission handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const formData = new FormData(this);
            const inputs = this.querySelectorAll('input, textarea');
            
            // Validate form
            let isValid = true;
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = '#ff6b35';
                } else {
                    input.style.borderColor = '';
                }
            });

            if (isValid) {
                // Show success message
                const submitBtn = this.querySelector('.btn-primary');
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Message Sent! ✓';
                submitBtn.style.opacity = '0.7';
                
                // Reset form after 2 seconds
                setTimeout(() => {
                    this.reset();
                    submitBtn.textContent = originalText;
                    submitBtn.style.opacity = '1';
                }, 2000);
            }
        });
    }

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ========== ENHANCED SCROLL ANIMATIONS ==========
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add staggered delay for multiple elements
                setTimeout(() => {
                    entry.target.classList.add('scroll-visible');
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                
                // Optional: Stop observing after element is visible
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Elements to observe for scroll animations
    const elementsToObserve = document.querySelectorAll(
        '.section-title, ' +
        '.project-card, ' +
        '.skill-category, ' +
        '.info-item, ' +
        '.gallery-img, ' +
        '.contact-item, ' +
        '.about-text, ' +
        '.language-item, ' +
        '.cert-item'
    );

    elementsToObserve.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(el);
    });

    // Active navigation link highlighting
    const sections = document.querySelectorAll('section[id]');
    const navLinks_active = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks_active.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
                link.style.color = 'var(--primary-color)';
            } else {
                link.style.color = 'white';
            }
        });
    });

    // ========== ADVANCED PARALLAX EFFECT ==========
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const circles = hero.querySelectorAll('.circle');
            const heroContent = hero.querySelector('.hero-content');
            const tuxContainer = hero.querySelector('.tux-container');
            
            // Parallax for circles
            circles.forEach((circle, index) => {
                const speed = 0.5 + (index * 0.1);
                circle.style.transform = `translateY(${scrolled * speed}px)`;
            });

            // Fade out hero content as user scrolls
            if (scrolled < hero.clientHeight) {
                const opacity = 1 - (scrolled / (hero.clientHeight * 0.5));
                if (heroContent) {
                    heroContent.style.opacity = Math.max(opacity, 0);
                    heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
                }
                if (tuxContainer) {
                    tuxContainer.style.opacity = Math.max(opacity, 0.3);
                }
            }
        });
    }

    // ========== SCROLL-TRIGGERED ANIMATIONS FOR SECTIONS ==========
    const sections_animated = document.querySelectorAll('section');
    
    sections_animated.forEach((section) => {
        const observerSection = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('section-visible');
                }
            });
        }, {
            threshold: 0.05
        });

        observerSection.observe(section);
    });

    // Add animation class styling via inline
    document.addEventListener('DOMContentLoaded', function() {
        const style = document.createElement('style');
        style.innerHTML = `
            section.section-visible {
                animation: sectionSlide 0.8s ease-out;
            }
            
            @keyframes sectionSlide {
                from {
                    opacity: 0.95;
                    transform: translateY(0);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `;
        document.head.appendChild(style);
    });

    // Add animation to skill items on hover
    const skillItems = document.querySelectorAll('.skill-category li');
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(5px)';
        });
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });

    // Counter animation for stats (if needed in future)
    function animateValue(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            element.textContent = Math.floor(progress * (end - start) + start);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    // Page load animation
    window.addEventListener('load', function() {
        document.body.style.opacity = '1';
    });

    // Prevent form submission for demo
    const emailInputs = document.querySelectorAll('input[type="email"]');
    emailInputs.forEach(input => {
        input.addEventListener('invalid', (e) => {
            e.preventDefault();
            input.setCustomValidity('Please enter a valid email address');
        });
        input.addEventListener('input', (e) => {
            input.setCustomValidity('');
        });
    });
});

// Utility function for tracking link clicks
function trackClick(linkName) {
    console.log('Link clicked: ' + linkName);
}
