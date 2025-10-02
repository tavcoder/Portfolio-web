import { navigateTo } from './router.js';

// Initialize the app
function initApp() {
    // Set up menu links
    const menuLinks = document.querySelectorAll('.menu__link');
    menuLinks.forEach(link => {
        link.addEventListener('click', async (e) => {
            e.preventDefault();
            const route = link.getAttribute('data-route');
            await navigateTo(route);
        });
    });

    // Handle initial load and hash changes
    async function handleRoute() {
        const hash = window.location.hash.substring(1) || '';
        await navigateTo(hash);
    }

    window.addEventListener('hashchange', handleRoute);
    handleRoute(); // Initial load
}

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate');
      observer.unobserve(entry.target); // Stop observing once animated
    }
  });
}, observerOptions);

// Function to observe elements
function observeAnimations() {
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  animatedElements.forEach(el => observer.observe(el));
}

// Start the app
initApp();

// Observe animations after DOM is ready
document.addEventListener('DOMContentLoaded', observeAnimations);