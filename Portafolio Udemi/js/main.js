import { navigateTo } from './router.js';

// Initialize the app
function initApp() {
    // Set up menu links
    const menuLinks = document.querySelectorAll('.menu__link');
    menuLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const route = link.getAttribute('data-route');
            navigateTo(route);
        });
    });

    // Handle initial load and hash changes
    function handleRoute() {
        const hash = window.location.hash.substring(1) || '';
        navigateTo(hash);
    }

    window.addEventListener('hashchange', handleRoute);
    handleRoute(); // Initial load

    // Initialize AOS
    AOS.init({
        duration: 1200,
        delay: 200,
    });
}

// Start the app
initApp();