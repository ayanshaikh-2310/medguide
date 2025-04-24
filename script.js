
// Mobile Navigation Toggle
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');

burger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    burger.classList.toggle('active');
});

// Close menu when clicking a link (mobile)
const navLinksItems = document.querySelectorAll('.nav-links a');
navLinksItems.forEach(item => {
    item.addEventListener('click', () => {
        navLinks.classList.remove('active');
        burger.classList.remove('active');
    });
});

// Scroll animations
const sections = document.querySelectorAll('section');

// Function to check if element is in viewport
function checkVisibility() {
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const sectionBottom = section.getBoundingClientRect().bottom;
        const windowHeight = window.innerHeight;

        // If the section is at least partially in view
        if (sectionTop < windowHeight * 0.75 && sectionBottom > 0) {
            section.classList.add('visible');
        }
    });
}

// Initial check on page load
window.addEventListener('load', () => {
    // Add visible class to hero immediately
    document.getElementById('hero').classList.add('visible');
    // Check other sections
    setTimeout(checkVisibility, 300);
});

// Check visibility on scroll
window.addEventListener('scroll', checkVisibility);

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        if (this.getAttribute('href') !== '#') {
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // Account for fixed header
                    behavior: 'smooth'
                });
            }
        }
    });
});
