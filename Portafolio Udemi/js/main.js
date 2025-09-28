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

    // Initialize AOS
    AOS.init({
        duration: 1200,
        delay: 200,
    });
}

// Start the app
initApp();