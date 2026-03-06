// Main JavaScript functionality
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
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

    // Add fade-in animation to elements when they come into view
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.feature-card, .program-card, .trial-card');
    animateElements.forEach(el => observer.observe(el));

    // Form validation for contact forms
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            if (validateForm(this)) {
                // Here you would normally submit the form
                alert('Thank you for your message! I will get back to you soon.');
                this.reset();
            }
        });
    });

    // Dynamic year in footer
    const currentYear = new Date().getFullYear();
    const yearElement = document.querySelector('.current-year');
    if (yearElement) {
        yearElement.textContent = currentYear;
    }

    // Navbar background change on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(248, 249, 255, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.background = 'linear-gradient(135deg, var(--light-pastel) 0%, var(--medium-pastel) 100%)';
        }
    });
});

// Form validation function
function validateForm(form) {
    let isValid = true;
    const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
    
    inputs.forEach(input => {
        const errorElement = input.parentElement.querySelector('.error-message');
        
        // Remove previous error styling
        input.classList.remove('is-invalid');
        if (errorElement) {
            errorElement.remove();
        }
        
        // Validate required fields
        if (!input.value.trim()) {
            showError(input, 'This field is required');
            isValid = false;
        }
        
        // Validate email format
        if (input.type === 'email' && input.value.trim()) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(input.value.trim())) {
                showError(input, 'Please enter a valid email address');
                isValid = false;
            }
        }
        
        // Validate phone number
        if (input.type === 'tel' && input.value.trim()) {
            const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
            if (!phoneRegex.test(input.value.trim())) {
                showError(input, 'Please enter a valid phone number');
                isValid = false;
            }
        }
    });
    
    return isValid;
}

function showError(input, message) {
    input.classList.add('is-invalid');
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message text-danger small mt-1';
    errorDiv.textContent = message;
    input.parentElement.appendChild(errorDiv);
}

// Program selection functionality
function selectProgram(programName, price) {
    // Store selected program in localStorage
    localStorage.setItem('selectedProgram', JSON.stringify({
        name: programName,
        price: price,
        date: new Date().toISOString()
    }));
    
    // Redirect to contact page with program pre-selected
    window.location.href = `contact.html?program=${encodeURIComponent(programName)}&price=${price}`;
}

// Get selected program from URL parameters
function getSelectedProgram() {
    const urlParams = new URLSearchParams(window.location.search);
    const programName = urlParams.get('program');
    const price = urlParams.get('price');
    
    if (programName && price) {
        return { name: programName, price: price };
    }
    
    // Check localStorage as fallback
    const stored = localStorage.getItem('selectedProgram');
    if (stored) {
        return JSON.parse(stored);
    }
    
    return null;
}

// Auto-fill form with selected program
function autoFillProgram() {
    const selectedProgram = getSelectedProgram();
    if (selectedProgram) {
        const programInput = document.querySelector('input[name="program"]');
        if (programInput) {
            programInput.value = selectedProgram.name;
        }
    }
}

// Call autoFillProgram when contact page loads
if (window.location.pathname.includes('contact.html')) {
    document.addEventListener('DOMContentLoaded', autoFillProgram);
}

// Smooth scroll for internal links
document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scrolling to all links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// Mobile menu toggle
function toggleMobileMenu() {
    const navbarCollapse = document.querySelector('.navbar-collapse');
    navbarCollapse.classList.toggle('show');
}

// Close mobile menu when clicking outside
document.addEventListener('click', function(e) {
    const navbar = document.querySelector('.navbar');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    if (!navbar.contains(e.target) && navbarCollapse.classList.contains('show')) {
        navbarCollapse.classList.remove('show');
    }
});