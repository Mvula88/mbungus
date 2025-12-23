// ===== Mobile Navigation Toggle =====
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const hamburger = document.querySelector('.hamburger');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        // Animate hamburger
        hamburger.classList.toggle('active');
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
}

// ===== Header Scroll Effect =====
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// ===== Smooth Scroll for Anchor Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 100;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== Lightbox Functionality =====
function openLightbox(imageSrc) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');

    if (lightbox && lightboxImg) {
        lightboxImg.src = imageSrc;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Close lightbox with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeLightbox();
    }
});

// ===== Form Handling with EmailJS =====
// Note: Replace with actual EmailJS credentials or Formspree endpoint

// Contact Form
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        const submitBtn = this.querySelector('button[type="submit"]');
        const messageDiv = document.getElementById('contact-message');

        // Add loading state
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';

        // Collect form data
        const formData = new FormData(this);

        try {
            // Using Formspree (replace YOUR_FORM_ID with actual ID)
            const response = await fetch(this.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                messageDiv.className = 'form-message success';
                messageDiv.textContent = 'Thank you! Your message has been sent successfully. We will get back to you soon.';
                this.reset();
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            messageDiv.className = 'form-message error';
            messageDiv.textContent = 'Sorry, there was an error sending your message. Please try again or contact us directly.';
        }

        // Reset button
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message';

        // Scroll to message
        messageDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
}

// Quote Form
const quoteForm = document.getElementById('quote-form');
if (quoteForm) {
    quoteForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        const submitBtn = this.querySelector('button[type="submit"]');
        const messageDiv = document.getElementById('quote-message');

        // Add loading state
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Submitting...';

        // Collect form data
        const formData = new FormData(this);

        try {
            // Using Formspree (replace YOUR_FORM_ID with actual ID)
            const response = await fetch(this.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                messageDiv.className = 'form-message success';
                messageDiv.textContent = 'Thank you! Your quote request has been submitted. We will review your request and contact you with an estimate within 24 hours.';
                this.reset();
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            messageDiv.className = 'form-message error';
            messageDiv.textContent = 'Sorry, there was an error submitting your request. Please try again or contact us directly at +264 81 397 0000.';
        }

        // Reset button
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
        submitBtn.textContent = 'Submit Quote Request';

        // Scroll to message
        messageDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
}

// ===== Intersection Observer for Animations =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.service-card, .testimonial-card, .value-card, .stat-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Add animation class styles
const style = document.createElement('style');
style.textContent = `
    .animate {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }

    .hamburger.active {
        background: transparent;
    }

    .hamburger.active::before {
        transform: rotate(45deg);
        top: 0;
    }

    .hamburger.active::after {
        transform: rotate(-45deg);
        top: 0;
    }
`;
document.head.appendChild(style);

// ===== Set Minimum Date for Date Picker =====
const dateInput = document.getElementById('preferred-date');
if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
}

// ===== Phone Number Formatting =====
const phoneInputs = document.querySelectorAll('input[type="tel"]');
phoneInputs.forEach(input => {
    input.addEventListener('input', function(e) {
        // Allow only numbers, spaces, plus, and hyphens
        this.value = this.value.replace(/[^\d\s+\-]/g, '');
    });
});

// ===== Scroll to Hash on Page Load =====
if (window.location.hash) {
    setTimeout(() => {
        const target = document.querySelector(window.location.hash);
        if (target) {
            const headerOffset = 100;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    }, 100);
}

// ===== Active Navigation Link Highlighting =====
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
        link.classList.add('active');
    } else if (!href.includes('#')) {
        link.classList.remove('active');
    }
});

// ===== Lazy Loading Images =====
if ('loading' in HTMLImageElement.prototype) {
    // Native lazy loading supported
    document.querySelectorAll('img[data-src]').forEach(img => {
        img.src = img.dataset.src;
    });
} else {
    // Fallback for older browsers
    const lazyImages = document.querySelectorAll('img[data-src]');
    const lazyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                lazyObserver.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => lazyObserver.observe(img));
}

// ===== Scroll to Top Button =====
const scrollTopBtn = document.getElementById('scroll-top');

if (scrollTopBtn) {
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });

    // Scroll to top when clicked
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===== Console Message =====
console.log('%cMbungus Investments CC', 'color: #FFD700; font-size: 24px; font-weight: bold;');
console.log('%cYou Bring It, We Fix It!', 'color: #333; font-size: 14px;');
console.log('%cWebsite developed with care', 'color: #666; font-size: 12px;');
