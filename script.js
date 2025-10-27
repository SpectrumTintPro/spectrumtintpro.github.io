/* ========================================
   DANTE WEST DRONE PHOTOGRAPHY - JAVASCRIPT
   Interactive functionality and animations
   ======================================== */

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeScrollAnimations();
    initializePortfolioFilters();
    initializeContactForm();
    initializeCloudAnimations();
    initializeSmoothScrolling();
    initializeStatsCounter();
    initializePhotoCascade();
});

/* ========================================
   NAVIGATION FUNCTIONALITY
   ======================================== */
function initializeNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Animate hamburger bars
        const bars = hamburger.querySelectorAll('.bar');
        bars.forEach((bar, index) => {
            if (hamburger.classList.contains('active')) {
                if (index === 0) bar.style.transform = 'rotate(-45deg) translate(-5px, 6px)';
                if (index === 1) bar.style.opacity = '0';
                if (index === 2) bar.style.transform = 'rotate(45deg) translate(-5px, -6px)';
            } else {
                bar.style.transform = 'none';
                bar.style.opacity = '1';
            }
        });
    });

    // Close mobile menu when clicking on nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            
            // Reset hamburger animation
            const bars = hamburger.querySelectorAll('.bar');
            bars.forEach(bar => {
                bar.style.transform = 'none';
                bar.style.opacity = '1';
            });
        });
    });

    // Add scroll effect to navigation
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        const navLinks = document.querySelectorAll('.nav-link');
        const bars = document.querySelectorAll('.bar');
        
        if (window.scrollY > 100) {
            // Scrolled state - keep original dark background with better visibility
            navbar.style.background = 'rgba(44, 62, 80, 0.98)';
            navbar.style.boxShadow = '0 4px 30px rgba(52, 152, 219, 0.4)';
            navbar.style.borderBottom = '2px solid rgba(52, 152, 219, 0.5)';
            
            // Ensure nav links remain visible
            navLinks.forEach(link => {
                if (!link.classList.contains('active')) {
                    link.style.color = 'rgba(255, 255, 255, 0.9)';
                }
            });
            
            // Ensure hamburger bars remain visible
            bars.forEach(bar => {
                bar.style.background = 'rgba(255, 255, 255, 0.9)';
            });
        } else {
            // Default state - original styling
            navbar.style.background = 'rgba(44, 62, 80, 0.95)';
            navbar.style.boxShadow = '0 4px 30px rgba(52, 152, 219, 0.2)';
            navbar.style.borderBottom = '2px solid rgba(52, 152, 219, 0.3)';
            
            // Reset nav links to default
            navLinks.forEach(link => {
                if (!link.classList.contains('active')) {
                    link.style.color = 'rgba(255, 255, 255, 0.9)';
                }
            });
            
            // Reset hamburger bars to default
            bars.forEach(bar => {
                bar.style.background = 'rgba(255, 255, 255, 0.9)';
            });
        }
    });
}

/* ========================================
   SMOOTH SCROLLING
   ======================================== */
function initializeSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* ========================================
   SCROLL ANIMATIONS
   ======================================== */
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                
                // Special handling for stats animation
                if (entry.target.classList.contains('stat-item')) {
                    animateNumber(entry.target);
                }
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const elementsToAnimate = document.querySelectorAll(
        '.service-card, .portfolio-item, .contact-item, .cert-item, .stat-item, .about-text'
    );
    
    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });
}

/* ========================================
   STATS COUNTER ANIMATION
   ======================================== */
function initializeStatsCounter() {
    // This will be triggered by the scroll animation observer
}

function animateNumber(element) {
    const numberElement = element.querySelector('h3');
    if (!numberElement) return;
    
    const finalNumber = numberElement.textContent.replace(/[^\d]/g, '');
    if (!finalNumber) return;
    
    const isStarRating = numberElement.textContent.includes('★');
    const increment = Math.ceil(finalNumber / 50);
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= finalNumber) {
            current = finalNumber;
            clearInterval(timer);
        }
        
        if (isStarRating) {
            numberElement.textContent = current + '★';
        } else {
            numberElement.textContent = current + '+';
        }
    }, 40);
}

/* ========================================
   PORTFOLIO FILTERS
   ======================================== */
function initializePortfolioFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');

            const filterValue = this.getAttribute('data-filter');

            portfolioItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');
                
                if (filterValue === 'all' || itemCategory === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

/* ========================================
   CONTACT FORM HANDLING
   ======================================== */
function initializeContactForm() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const formObject = {};
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            
            // Show loading state
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            
            // Simulate form submission (replace with actual backend logic)
            setTimeout(() => {
                // Show success message
                showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
                
                // Reset form
                this.reset();
                
                // Reset button
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                
                console.log('Form submission:', formObject);
            }, 2000);
        });
        
        // Form validation
        const inputs = contactForm.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', validateField);
            input.addEventListener('input', clearErrors);
        });
    }
}

function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    
    // Remove existing error styling
    field.classList.remove('error');
    
    // Validation rules
    if (field.hasAttribute('required') && !value) {
        showFieldError(field, 'This field is required');
        return false;
    }
    
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            showFieldError(field, 'Please enter a valid email address');
            return false;
        }
    }
    
    if (field.type === 'tel' && value) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        if (!phoneRegex.test(value.replace(/[\s\-\(\)]/g, ''))) {
            showFieldError(field, 'Please enter a valid phone number');
            return false;
        }
    }
    
    return true;
}

function showFieldError(field, message) {
    field.classList.add('error');
    field.style.borderColor = '#e74c3c';
    
    // Remove error styling after 3 seconds
    setTimeout(() => {
        field.classList.remove('error');
        field.style.borderColor = '';
    }, 3000);
}

function clearErrors(e) {
    const field = e.target;
    field.classList.remove('error');
    field.style.borderColor = '';
}

/* ========================================
   CLOUD ANIMATIONS
   ======================================== */
function initializeCloudAnimations() {
    const clouds = document.querySelectorAll('.cloud');
    
    // Add random animation delays and speeds
    clouds.forEach((cloud, index) => {
        const randomDelay = Math.random() * 20;
        const randomDuration = 15 + Math.random() * 10;
        
        cloud.style.animationDelay = `-${randomDelay}s`;
        cloud.style.animationDuration = `${randomDuration}s`;
        
        // Random vertical position
        const randomTop = 10 + Math.random() * 70;
        cloud.style.top = `${randomTop}%`;
    });
    
    // Create additional floating clouds periodically
    setInterval(createFloatingCloud, 10000);
}

function createFloatingCloud() {
    const cloudContainer = document.querySelector('.cloud-animation');
    if (!cloudContainer) return;
    
    const cloud = document.createElement('div');
    cloud.className = 'cloud';
    cloud.textContent = '☁️';
    cloud.style.top = `${Math.random() * 80}%`;
    cloud.style.left = '-100px';
    cloud.style.fontSize = `${2 + Math.random() * 2}rem`;
    cloud.style.opacity = `${0.2 + Math.random() * 0.3}`;
    cloud.style.animation = `float-cloud ${15 + Math.random() * 10}s linear`;
    
    cloudContainer.appendChild(cloud);
    
    // Remove cloud after animation
    setTimeout(() => {
        if (cloud.parentNode) {
            cloud.parentNode.removeChild(cloud);
        }
    }, 25000);
}

/* ========================================
   NOTIFICATION SYSTEM
   ======================================== */
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${getNotificationIcon(type)}"></i>
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Style the notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '1rem 1.5rem',
        borderRadius: '10px',
        background: getNotificationColor(type),
        color: 'white',
        zIndex: '9999',
        minWidth: '300px',
        maxWidth: '500px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease',
        backdropFilter: 'blur(10px)'
    });
    
    // Add to document
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    const closeButton = notification.querySelector('.notification-close');
    closeButton.addEventListener('click', () => closeNotification(notification));
    
    // Auto close after 5 seconds
    setTimeout(() => closeNotification(notification), 5000);
}

function getNotificationIcon(type) {
    const icons = {
        success: 'fa-check-circle',
        error: 'fa-exclamation-circle',
        warning: 'fa-exclamation-triangle',
        info: 'fa-info-circle'
    };
    return icons[type] || icons.info;
}

function getNotificationColor(type) {
    const colors = {
        success: 'linear-gradient(45deg, #27ae60, #2ecc71)',
        error: 'linear-gradient(45deg, #e74c3c, #c0392b)',
        warning: 'linear-gradient(45deg, #f39c12, #e67e22)',
        info: 'linear-gradient(45deg, #3498db, #2980b9)'
    };
    return colors[type] || colors.info;
}

function closeNotification(notification) {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

/* ========================================
   UTILITY FUNCTIONS
   ======================================== */

// Debounce function for performance optimization
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

// Throttle function for scroll events
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

// Add CSS for notification content
const notificationStyles = `
    .notification-content {
        display: flex;
        align-items: center;
        gap: 1rem;
    }
    
    .notification-content i {
        font-size: 1.2rem;
        flex-shrink: 0;
    }
    
    .notification-content span {
        flex: 1;
        font-weight: 500;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transition: background-color 0.2s ease;
        flex-shrink: 0;
    }
    
    .notification-close:hover {
        background-color: rgba(255, 255, 255, 0.2);
    }
    
    .service-card.error input,
    .service-card.error select,
    .service-card.error textarea {
        border-color: #e74c3c !important;
        box-shadow: 0 0 0 3px rgba(231, 76, 60, 0.1);
    }
`;

// Inject notification styles
const styleSheet = document.createElement('style');
styleSheet.textContent = notificationStyles;
document.head.appendChild(styleSheet);

/* ========================================
   PHOTO CASCADE FUNCTIONALITY
   ======================================== */
function initializePhotoCascade() {
    const cascadePhotos = document.querySelectorAll('.cascade-photo');
    
    // Function to replace placeholder with actual photo
    window.replaceCascadePhoto = function(photoIndex, imageSrc, title = '') {
        const photoElement = document.querySelector(`[data-photo="${photoIndex}"]`);
        if (photoElement && imageSrc) {
            const placeholder = photoElement.querySelector('.photo-placeholder');
            if (placeholder) {
                // Create image element
                const img = document.createElement('img');
                img.src = imageSrc;
                img.alt = title || `Drone Photo ${photoIndex}`;
                img.style.cssText = `
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    border-radius: 13px;
                `;
                
                // Replace placeholder with image
                photoElement.innerHTML = '';
                photoElement.appendChild(img);
                
                // Add title overlay if provided
                if (title) {
                    const titleOverlay = document.createElement('div');
                    titleOverlay.textContent = title;
                    titleOverlay.style.cssText = `
                        position: absolute;
                        bottom: 0;
                        left: 0;
                        right: 0;
                        background: linear-gradient(transparent, rgba(0,0,0,0.7));
                        color: white;
                        padding: 1rem 0.5rem 0.5rem;
                        font-size: 0.9rem;
                        font-weight: 500;
                        text-align: center;
                        border-radius: 0 0 13px 13px;
                    `;
                    photoElement.appendChild(titleOverlay);
                }
            }
        }
    };
    
    // Add intersection observer for performance
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                } else {
                    entry.target.classList.remove('in-view');
                }
            });
        }, { threshold: 0.1 });
        
        cascadePhotos.forEach(photo => observer.observe(photo));
    }
    
    // Log instructions for adding photos
    console.log(`
🖼️ Photo Cascade Ready!
To add photos, use: replaceCascadePhoto(photoIndex, imageSrc, title)

Example:
replaceCascadePhoto(1, 'path/to/wedding-photo.jpg', 'Wedding Shot');
replaceCascadePhoto(2, 'path/to/real-estate.jpg', 'Property View');

Available slots: 1, 2, 3, 4, 5
    `);
}

/* ========================================
   PERFORMANCE OPTIMIZATIONS
   ======================================== */

// Optimize scroll events
const optimizedScrollHandler = throttle(() => {
    // Handle scroll-based animations here if needed
}, 100);

window.addEventListener('scroll', optimizedScrollHandler);

// Preload critical images
function preloadImages() {
    const criticalImages = [
        // Add any critical image URLs here
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Initialize preloading
preloadImages();

// Console message for developers
console.log(`
🚁 Spectrum Drone Services Website
💻 Developed with modern web technologies
🌈 Featuring cloud themes and rainbow palettes
✨ Interactive and responsive design

Owner/Pilot: Dante West
Contact: djwisamazing123@gmail.com
Phone: (303) 895-7849
FAA Certified: #5007308
`);
