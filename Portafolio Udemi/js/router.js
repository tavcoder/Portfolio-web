import { renderHero } from './components/hero.js';
import { renderSkills } from './components/skills.js';
import { renderStudies } from './components/studies.js';
import { renderProjects } from './components/projectsList.js';
import { renderProjectTemplate, initFeatureSelector } from './components/projectTemplate.js';

/**
 * Estado global del idioma actual
 * @type {string}
 */
let currentLanguage = localStorage.getItem('language') || 'es';

/**
 * Obtiene el idioma actual
 * @returns {string}
 */
export function getCurrentLanguage() {
    return currentLanguage;
}

/**
 * Cambia el idioma de la aplicación
 * @param {string} lang - Código del idioma ('es' o 'en')
 */
export function setLanguage(lang) {
    if (lang !== 'es' && lang !== 'en') return;
    currentLanguage = lang;
    localStorage.setItem('language', lang);

    // Actualizar el atributo lang del HTML
    document.documentElement.lang = lang;

    // Re-renderizar la vista actual
    const currentHash = window.location.hash.replace(/^#\/?/, '');
    navigateTo(currentHash || '');

    // Actualizar el selector de idioma si existe
    updateLanguageSelector();
}

/**
 * Actualiza el estado visual del selector de idioma
 */
function updateLanguageSelector() {
    const languageButtons = document.querySelectorAll('[data-language]');
    languageButtons.forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-language') === currentLanguage);
    });
}

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
    return route.replace(/^\/+|\/+$/g, '');
}

/**
 * Navigates to the specified route, renders the content, and updates the UI.
 * @param {string} rawRoute - The route to navigate to (may include leading slash).
 */
export async function navigateTo(rawRoute) {
    const route = normalizeRoute(rawRoute);

    // Detectar si la ruta es un proyecto individual: "project/<id>"
    if (route.startsWith('project/')) {
        const projectId = route.split('/')[1];
        const content = document.getElementById('content__page');
        content.innerHTML = await renderProjectTemplate(projectId);
        initFeatureSelector();
        window.location.hash = `#/${route}`;
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
        updateLanguageSelector();

        if (route === 'skills') {
            setTimeout(() => {
                const toggleCheckbox = document.getElementById('toggle-tech');
                if (toggleCheckbox) {
                    toggleCheckbox.addEventListener('change', toggleTechnologies);
                }
            }, 0);
        }
    } else {
        await navigateTo('');
        return;
    }

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
        labelText && (labelText.textContent = currentLanguage === 'es' ? 'Backend' : 'Backend');
    } else {
        frontend?.classList.remove('hidden');
        backend?.classList.add('hidden');
        labelText && (labelText.textContent = currentLanguage === 'es' ? 'Frontend' : 'Frontend');
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
 */
window.addEventListener('hashchange', () => {
    const raw = window.location.hash.replace(/^#\/?/, '');
    navigateTo(raw);
});

/**
 * Load initial route on page load and set up language selector.
 */
window.addEventListener('DOMContentLoaded', () => {
    // Establecer el idioma en el HTML
    document.documentElement.lang = currentLanguage;

    // Configurar eventos de los botones de idioma
    const languageButtons = document.querySelectorAll('[data-language]');
    languageButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const lang = e.currentTarget.getAttribute('data-language');
            setLanguage(lang);
        });
    });

    // Navegar a la ruta inicial
    const initialRaw = window.location.hash.replace(/^#\/?/, '');
    navigateTo(initialRaw || '');
});