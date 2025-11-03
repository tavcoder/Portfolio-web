import { renderHero } from './components/hero.js';
import { renderSkills } from './components/skills.js';
import { renderStudies } from './components/studies.js';
import { renderProjects } from './components/projectsList.js';
import { renderProjectTemplate, initFeatureSelector } from './components/projectTemplate.js';


/**
 * Map of routes to their corresponding render functions.
 * @type {Object<string, Function>}
 */
const routes = {
    '': renderHero,
    'hero': renderHero,
    'skills': renderSkills,
    'projects': renderProjects,
    'studies': renderStudies
};

/**
 * Normaliza una ruta: quita slashes iniciales y finales.
 * @param {string} route
 * @returns {string}
 */
function normalizeRoute(route) {
    if (!route) return '';
    return route.replace(/^\/+|\/+$/g, ''); // elimina "/" al inicio y final
}

/**
 * Navigates to the specified route, renders the content, and updates the UI.
 * @param {string} rawRoute - The route to navigate to (may include leading slash).
 */
export async function navigateTo(rawRoute) {
    const route = normalizeRoute(rawRoute); // e.g. "project/superm" or "projects"

    // Detectar si la ruta es un proyecto individual: "project/<id>"
    if (route.startsWith('project/')) {
        const projectId = route.split('/')[1];
        const content = document.getElementById('content__page');
        content.innerHTML = await renderProjectTemplate(projectId);
        initFeatureSelector();
        // Actualiza el hash en formato "#/project/superm"
        window.location.hash = `#/${route}`;
        // observar animaciones si las hay
        observeAnimations();
        return;
    }

    // rutas normales
    const renderFunction = routes[route];
    if (renderFunction) {
        const content = document.getElementById('content__page');
        content.innerHTML = await renderFunction();
        observeAnimations();
        updateActiveMenu(route);

        if (route === 'skills') {
            setTimeout(() => {
                const toggleCheckbox = document.getElementById('toggle-tech');
                if (toggleCheckbox) {
                    toggleCheckbox.addEventListener('change', toggleTechnologies);
                }
            }, 0);
        }
    } else {
        // si no existe la ruta, ir a la principal
        await navigateTo('');
        return;
    }

    // Actualiza el hash de forma consistente "#/route" (si route == '' -> "#/")
    window.location.hash = route ? `#/${route}` : '#/';
}

/**
 * Updates the active menu link based on the current route.
 * @param {string} route - The current route.
 */
function updateActiveMenu(route) {
    const buttons = document.querySelectorAll('.tertiaryBtn');
    buttons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-route') === route) {
            btn.classList.add('active');
        }
    });
    if (!route) {
        const heroLink = document.querySelector('.tertiaryBtn[data-route=""]') || buttons[0];
        if (heroLink) heroLink.classList.add('active');
    }
}

/**
 * Toggles the display between frontend and backend technologies in the skills section.
 */
function toggleTechnologies() {
    const frontend = document.getElementById('frontend');
    const backend = document.getElementById('backend');
    const labelText = document.getElementById('label-text');
    const checkbox = document.getElementById('toggle-tech');

    if (!checkbox) return;

    if (checkbox.checked) {
        frontend?.classList.add('hidden');
        backend?.classList.remove('hidden');
        labelText && (labelText.textContent = 'Backend');
    } else {
        frontend?.classList.remove('hidden');
        backend?.classList.add('hidden');
        labelText && (labelText.textContent = 'Frontend');
    }
}

/**
 * Options for the Intersection Observer used for animations.
 * @type {Object}
 */
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

/**
 * Observes elements with the 'animate-on-scroll' class for animations.
 */
function observeAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => observer.observe(el));
}

/**
 * Detect hash changes and navigate automatically.
 * Normalizamos el hash para que sea compatible con navigateTo.
 */
window.addEventListener('hashchange', () => {
    // Remueve "#/" o "#" y pasa el resto (ej: "#/project/superm" -> "project/superm")
    const raw = window.location.hash.replace(/^#\/?/, '');
    navigateTo(raw);
});

/**
 * Load initial route on page load.
 */
window.addEventListener('DOMContentLoaded', () => {
    const initialRaw = window.location.hash.replace(/^#\/?/, '');
    navigateTo(initialRaw || '');
});
