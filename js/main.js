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

// ===== Form Handling - Send to WhatsApp =====
const whatsappNumber = '264813970000'; // Mbungus WhatsApp number

// Contact Form - Send to WhatsApp
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form values
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value || 'General Inquiry';
        const message = document.getElementById('message').value;

        // Format WhatsApp message
        const whatsappMessage = `*New Website Inquiry*

*Name:* ${name}
*Phone:* ${phone}
*Email:* ${email}
*Subject:* ${subject}

*Message:*
${message}`;

        // Encode and open WhatsApp
        const encodedMessage = encodeURIComponent(whatsappMessage);
        window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank');

        // Show success message
        const messageDiv = document.getElementById('contact-message');
        messageDiv.className = 'form-message success';
        messageDiv.textContent = 'WhatsApp opened! Please tap Send to complete your inquiry.';

        // Reset form
        this.reset();
    });
}

// Quote Form - Send to WhatsApp
const quoteForm = document.getElementById('quote-form');
if (quoteForm) {
    quoteForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form values
        const name = document.getElementById('quote-name').value;
        const phone = document.getElementById('quote-phone').value;
        const email = document.getElementById('quote-email').value;
        const vehicleType = document.getElementById('vehicle-type').value;
        const vehicleMake = document.getElementById('vehicle-make').value || 'Not specified';
        const serviceType = document.getElementById('service-type').value;
        const details = document.getElementById('quote-details').value;
        const preferredDate = document.getElementById('preferred-date').value || 'Flexible';
        const urgency = document.getElementById('urgency').value;

        // Format WhatsApp message
        const whatsappMessage = `*Quote Request from Website*

*Customer Details:*
• Name: ${name}
• Phone: ${phone}
• Email: ${email}

*Vehicle Information:*
• Type: ${vehicleType}
• Make/Model: ${vehicleMake}

*Service Required:*
• Service: ${serviceType}
• Urgency: ${urgency}
• Preferred Date: ${preferredDate}

*Description:*
${details}`;

        // Encode and open WhatsApp
        const encodedMessage = encodeURIComponent(whatsappMessage);
        window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank');

        // Show success message
        const messageDiv = document.getElementById('quote-message');
        messageDiv.className = 'form-message success';
        messageDiv.textContent = 'WhatsApp opened! Please tap Send to submit your quote request.';

        // Reset form
        this.reset();
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
