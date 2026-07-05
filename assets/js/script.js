// ========================================
// SERVICE DATA OBJECT
// ========================================
const servicesData = [
    {
        id: 1,
        icon: 'fa-bolt',
        title: 'LT & HT Electrical Works',
        description: 'Complete low and high tension electrical installations for industrial and commercial facilities.',
        features: [
            'Low Tension (LT) electrical installations up to 1kV',
            'High Tension (HT) electrical installations above 1kV',
            'Cable laying and termination',
            'Busbar installation and maintenance',
            'Electrical load calculations and planning',
            'Safety compliance and testing'
        ]
    },
    {
        id: 2,
        icon: 'fa-boxes-stacked',
        title: 'Electrical Supply',
        description: 'Authorized dealer of premium electrical cables, panels, wires, switches, and sockets.',
        features: [
            'Wide range of electrical cables (Havells, Polycab, KEI)',
            'LT & HT panels and switchgear',
            'Premium wires and switches',
            'Modular switches and sockets',
            'Genuine products with warranty',
            'Competitive pricing and bulk discounts'
        ]
    },
    {
        id: 3,
        icon: 'fa-industry',
        title: 'LT Panel Manufacturing',
        description: 'Custom manufacturing of LT panels designed to meet specific industrial requirements.',
        features: [
            'Custom LT panel design and engineering',
            'Manufacturing as per client specifications',
            'Quality components from ABB, Schneider, L&T',
            'Testing and certification',
            'AMC and maintenance support',
            'Fast delivery and installation'
        ]
    },
    {
        id: 4,
        icon: 'fa-screwdriver-wrench',
        title: 'Panel Installation & Commissioning',
        description: 'Professional installation and commissioning services for all types of electrical panels.',
        features: [
            'On-site panel installation',
            'System integration and testing',
            'Load balancing and optimization',
            'Documentation and handover',
            'Training for operation staff',
            'Post-installation support'
        ]
    },
    {
        id: 6,
        icon: 'fa-microchip',
        title: 'Automation Works',
        description: 'Industrial automation solutions including PLC programming and SCADA systems.',
        features: [
            'PLC programming and installation',
            'SCADA system implementation',
            'HMI panel design and setup',
            'Sensor and actuator integration',
            'Process automation consulting',
            'System upgrades and retrofitting'
        ]
    },
    {
        id: 9,
        icon: 'fa-lightbulb',
        title: 'Street Light Poles',
        description: 'Supply and installation of street light poles for residential and commercial areas.',
        features: [
            'MS and GI street light poles',
            'LED street light fixtures',
            'Solar street light systems',
            'Foundation and installation',
            'Height options from 6M to 12M',
            'Powder coating for durability'
        ]
    }
];

// ========================================
// GLOBAL VARIABLES
// ========================================
let currentSlide = 0;
let currentTestimonial = 0;
let heroAutoplay;
let testimonialAutoplay;

// ========================================
// TOP BAR + HEADER SCROLL BEHAVIOUR
// ========================================
const topbar = document.getElementById('topbar');
const header = document.getElementById('header');
let lastScrollY = window.scrollY;

function handleHeaderScroll() {
    const y = window.scrollY;

    // Collapse the credential top bar once the user starts scrolling down,
    // and give the header a more compact "scrolled" state.
    if (y > 80) {
        topbar.classList.add('collapsed');
        header.classList.add('topbar-hidden', 'is-scrolled');
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
    } else {
        topbar.classList.remove('collapsed');
        header.classList.remove('topbar-hidden', 'is-scrolled');
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }

    lastScrollY = y;
}

window.addEventListener('scroll', handleHeaderScroll, { passive: true });

// ========================================
// MOBILE MENU TOGGLE
// ========================================
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Highlight the active nav link based on scroll position
const sectionsForNav = ['home', 'services', 'projects', 'about', 'contact']
    .map(id => document.getElementById(id))
    .filter(Boolean);

function updateActiveNavLink() {
    const scrollPos = window.scrollY + (header.offsetHeight || 0) + 40;
    let currentId = sectionsForNav[0] ? sectionsForNav[0].id : null;

    sectionsForNav.forEach(section => {
        if (scrollPos >= section.offsetTop) {
            currentId = section.id;
        }
    });

    navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${currentId}`);
    });
}

window.addEventListener('scroll', updateActiveNavLink, { passive: true });

// ========================================
// SMOOTH SCROLLING
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = document.getElementById('header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ========================================
// HERO SLIDER
// ========================================
const heroSlides = document.querySelectorAll('.hero-slide');
const heroIndicators = document.querySelectorAll('.indicator');
const heroPrev = document.getElementById('hero-prev');
const heroNext = document.getElementById('hero-next');

function showHeroSlide(index) {
    // Remove active class from all slides and indicators
    heroSlides.forEach(slide => slide.classList.remove('active'));
    heroIndicators.forEach(indicator => indicator.classList.remove('active'));

    // Add active class to current slide and indicator
    heroSlides[index].classList.add('active');
    heroIndicators[index].classList.add('active');
}

function nextHeroSlide() {
    currentSlide = (currentSlide + 1) % heroSlides.length;
    showHeroSlide(currentSlide);
}

function prevHeroSlide() {
    currentSlide = (currentSlide - 1 + heroSlides.length) % heroSlides.length;
    showHeroSlide(currentSlide);
}

// Event listeners for hero controls
heroNext.addEventListener('click', () => {
    nextHeroSlide();
    resetHeroAutoplay();
});

heroPrev.addEventListener('click', () => {
    prevHeroSlide();
    resetHeroAutoplay();
});

// Indicator click events
heroIndicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
        currentSlide = index;
        showHeroSlide(currentSlide);
        resetHeroAutoplay();
    });
});

// Autoplay functionality
function startHeroAutoplay() {
    heroAutoplay = setInterval(nextHeroSlide, 5000);
}

function resetHeroAutoplay() {
    clearInterval(heroAutoplay);
    startHeroAutoplay();
}

// Start autoplay on page load
startHeroAutoplay();

// ========================================
// RENDER SERVICES DYNAMICALLY
// ========================================
function renderServices() {
    const servicesGrid = document.getElementById('services-grid');

    servicesData.forEach(service => {
        const serviceCard = document.createElement('div');
        serviceCard.className = 'service-card reveal';
        serviceCard.dataset.serviceId = service.id;

        serviceCard.innerHTML = `
            <div class="service-icon">
                <i class="fas ${service.icon}"></i>
            </div>
            <h3 class="service-title">${service.title}</h3>
            <p class="service-description">${service.description}</p>
            <span class="service-more">View details <i class="fas fa-arrow-right"></i></span>
        `;

        // Add click event to open modal
        serviceCard.addEventListener('click', () => openServiceModal(service.id));

        servicesGrid.appendChild(serviceCard);
    });

    observeRevealElements(servicesGrid.querySelectorAll('.reveal'));
}

// ========================================
// SERVICE MODAL FUNCTIONALITY
// ========================================
const serviceModal = document.getElementById('service-modal');
const modalOverlay = document.getElementById('modal-overlay');
const modalClose = document.getElementById('modal-close');

function openServiceModal(serviceId) {
    const service = servicesData.find(s => s.id === serviceId);

    if (service) {
        // Update modal content
        const modalIcon = serviceModal.querySelector('.modal-icon i');
        const modalTitle = serviceModal.querySelector('.modal-title');
        const modalDescription = serviceModal.querySelector('.modal-description');
        const modalList = serviceModal.querySelector('.modal-list');

        modalIcon.className = `fas ${service.icon}`;
        modalTitle.textContent = service.title;
        modalDescription.textContent = service.description;

        // Clear and populate features list
        modalList.innerHTML = '';
        service.features.forEach(feature => {
            const li = document.createElement('li');
            li.textContent = feature;
            modalList.appendChild(li);
        });

        // Show modal
        serviceModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeServiceModal() {
    serviceModal.classList.remove('active');
    document.body.style.overflow = '';
}

// Event listeners for modal
modalClose.addEventListener('click', closeServiceModal);
modalOverlay.addEventListener('click', closeServiceModal);

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && serviceModal.classList.contains('active')) {
        closeServiceModal();
    }
});

// Handle modal contact button
document.getElementById('modal-contact').addEventListener('click', closeServiceModal);

// ========================================
// TESTIMONIALS SLIDER
// ========================================
const testimonialsTrack = document.getElementById('testimonials-track');
const testimonialPrev = document.getElementById('testimonial-prev');
const testimonialNext = document.getElementById('testimonial-next');
const testimonialCards = document.querySelectorAll('.testimonial-card');

function showTestimonial(index) {
    const offset = -index * 100;
    testimonialsTrack.style.transform = `translateX(${offset}%)`;
}

function nextTestimonial() {
    currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
    showTestimonial(currentTestimonial);
}

function prevTestimonial() {
    currentTestimonial = (currentTestimonial - 1 + testimonialCards.length) % testimonialCards.length;
    showTestimonial(currentTestimonial);
}

function startTestimonialAutoplay() {
    testimonialAutoplay = setInterval(nextTestimonial, 7000);
}

function resetTestimonialAutoplay() {
    clearInterval(testimonialAutoplay);
    startTestimonialAutoplay();
}

testimonialNext.addEventListener('click', () => {
    nextTestimonial();
    resetTestimonialAutoplay();
});

testimonialPrev.addEventListener('click', () => {
    prevTestimonial();
    resetTestimonialAutoplay();
});

// Auto-rotate testimonials
startTestimonialAutoplay();

// ========================================
// ANIMATED STAT COUNTERS
// ========================================
function animateCounter(el) {
    const target = parseInt(el.dataset.count, 10) || 0;
    const duration = 1400;
    const start = performance.now();

    function tick(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(eased * target);

        if (progress < 1) {
            requestAnimationFrame(tick);
        } else {
            el.textContent = target;
        }
    }

    requestAnimationFrame(tick);
}

function initStatCounters() {
    const statEls = document.querySelectorAll('.stat-count');
    if (!statEls.length) return;

    const statObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statEls.forEach(el => statObserver.observe(el));
}

// ========================================
// CONTACT FORM HANDLING
// ========================================
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        service: document.getElementById('service').value,
        message: document.getElementById('message').value
    };

    // In a real application, you would send this data to a server
    console.log('Form submitted:', formData);

    // Show success message (simple alert for now)
    alert('Thank you for your inquiry! We will contact you shortly.');

    // Reset form
    contactForm.reset();
});

// ========================================
// SCROLL TO TOP BUTTON
// ========================================
const scrollToTopBtn = document.getElementById('scroll-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        scrollToTopBtn.classList.add('visible');
    } else {
        scrollToTopBtn.classList.remove('visible');
    }
}, { passive: true });

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ========================================
// INTERSECTION OBSERVER FOR SCROLL REVEALS
// ========================================
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

function observeRevealElements(elements) {
    elements.forEach(el => revealObserver.observe(el));
}

// ========================================
// INITIALIZE ON PAGE LOAD
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    // Render services dynamically
    renderServices();

    // Show first hero slide
    showHeroSlide(0);

    // Show first testimonial
    showTestimonial(0);

    // Kick off scroll-based UI states
    handleHeaderScroll();
    updateActiveNavLink();

    // Animated stat counters
    initStatCounters();

    // Mark static elements for scroll-reveal animation
    const staticRevealTargets = document.querySelectorAll(
        '.project-card, .about-feature, .brand-category, .testimonial-card, .contact-item, .contact-form-wrapper, .about-image, .about-text > *'
    );
    staticRevealTargets.forEach(el => el.classList.add('reveal'));
    observeRevealElements(staticRevealTargets);
});