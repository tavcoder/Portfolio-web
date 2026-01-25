/**
 * router.js - Application Router
 * 
 * Handles all routing logic and navigation.
 * 
 * @module core/router
 */

import { renderHero } from '../components/hero.js';
import { renderSkills } from '../components/skills.js';
import { renderStudies } from '../components/studies.js';
import { renderProjects } from '../components/projectsList.js';
import { renderProjectTemplate, initFeatureSelector } from '../components/projectTemplate.js';
import { getCurrentLanguage } from './i18n.js';
import { observeAnimations } from './animations.js';
import { APP_CONFIG, ROUTES, SELECTORS, EVENTS } from '../config/constants.js';

/**
 * Route configuration
 */
const routeMap = {
    [ROUTES.HOME]: renderHero,
    [ROUTES.HERO]: renderHero,
    [ROUTES.SKILLS]: renderSkills,
    [ROUTES.PROJECTS]: renderProjects,
    [ROUTES.STUDIES]: renderStudies,
};

/**
 * Normalizes a route
 * @param {string} route
 * @returns {string}
 */
function normalizeRoute(route) {
    if (!route) return '';
    return route.replace(/^\/+|\/+$/g, '');
}

/**
 * Gets the content container
 * @returns {HTMLElement|null}
 */
function getContentContainer() {
    const content = document.querySelector(SELECTORS.contentContainer);
    if (!content) {
        console.error('❌ Content container not found');
    }
    return content;
}

/**
 * Navigates to the specified route
 * @param {string} rawRoute
 * @public
 */
export async function navigateTo(rawRoute) {
    const route = normalizeRoute(rawRoute);
    const content = getContentContainer();

    if (!content) return;

    if (APP_CONFIG.enableDebugMode) {
        console.log(`🧭 Navigating to: ${route || 'home'}`);
    }

    // Handle project routes
    if (route.startsWith(ROUTES.PROJECT_DETAIL)) {
        await handleProjectRoute(route, content);
        return;
    }

    // Handle static routes
    await handleStaticRoute(route, content);
}

/**
 * Handles navigation to project detail pages
 * @param {string} route
 * @param {HTMLElement} content
 */
async function handleProjectRoute(route, content) {
    const projectId = route.split('/')[1];

    try {
        content.innerHTML = await renderProjectTemplate(projectId);
        initFeatureSelector();
        window.location.hash = `#/${route}`;
        observeAnimations();

        window.dispatchEvent(new CustomEvent(EVENTS.ROUTE_CHANGED, {
            detail: { route, type: 'project', id: projectId }
        }));

    } catch (error) {
        console.error(`❌ Error loading project ${projectId}:`, error);
        await navigateTo(ROUTES.HOME);
    }
}

/**
 * Handles navigation to static routes
 * @param {string} route
 * @param {HTMLElement} content
 */
async function handleStaticRoute(route, content) {
    const renderFunction = routeMap[route];

    if (!renderFunction) {
        console.warn(`⚠️ Route not found: ${route}`);
        await navigateTo(ROUTES.HOME);
        return;
    }

    try {
        content.innerHTML = await renderFunction();
        observeAnimations();
        updateActiveMenu(route);

        // Special handling for skills page
        if (route === ROUTES.SKILLS) {
            setTimeout(() => setupSkillsToggle(), 0);
        }

        window.location.hash = route ? `#/${route}` : '#/';

        window.dispatchEvent(new CustomEvent(EVENTS.ROUTE_CHANGED, {
            detail: { route, type: 'static' }
        }));

    } catch (error) {
        console.error(`❌ Error rendering route ${route}:`, error);
        await navigateTo(ROUTES.HOME);
    }
}

/**
 * Sets up the toggle for skills page
 */
function setupSkillsToggle() {
    const toggleCheckbox = document.getElementById('toggle-tech');
    if (toggleCheckbox) {
        toggleCheckbox.addEventListener('change', toggleTechnologies);
    }
}

/**
 * Updates the active menu item
 * @param {string} route
 */
function updateActiveMenu(route) {
    const buttons = document.querySelectorAll(SELECTORS.menuButtons);

    buttons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-route') === route) {
            btn.classList.add('active');
        }
    });

    if (!route) {
        const heroLink = document.querySelector(`${SELECTORS.menuButtons}[data-route=""]`) || buttons[0];
        if (heroLink) {
            heroLink.classList.add('active');
        }
    }
}

/**
 * Toggles between frontend and backend technologies
 */
function toggleTechnologies() {
    const frontend = document.getElementById('frontend');
    const backend = document.getElementById('backend');
    const labelText = document.getElementById('label-text');
    const checkbox = document.getElementById('toggle-tech');

    if (!checkbox) return;

    const currentLang = getCurrentLanguage();

    if (checkbox.checked) {
        frontend?.classList.add('hidden');
        backend?.classList.remove('hidden');
        if (labelText) {
            labelText.textContent = currentLang === 'es' ? 'Backend' : 'Backend';
        }
    } else {
        frontend?.classList.remove('hidden');
        backend?.classList.add('hidden');
        if (labelText) {
            labelText.textContent = currentLang === 'es' ? 'Frontend' : 'Frontend';
        }
    }
}

/**
 * Handles hash change events
 */
function handleHashChange() {
    const hash = window.location.hash.replace(/^#\/?/, '');
    navigateTo(hash);
}

/**
 * Handles language change events
 */
function handleLanguageChange() {
    const currentHash = window.location.hash.replace(/^#\/?/, '');
    navigateTo(currentHash || '');
}

/**
 * Sets up menu navigation
 */
function setupMenuNavigation() {
    const menuLinks = document.querySelectorAll(SELECTORS.menuButtons);

    menuLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const route = link.getAttribute('data-route');
            navigateTo(route);
        });
    });

    if (APP_CONFIG.enableDebugMode) {
        console.log(`🔗 Menu navigation setup (${menuLinks.length} links)`);
    }
}

/**
 * Initializes the router system
 * @public
 */
export function initRouter() {
    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener(EVENTS.LANGUAGE_CHANGED, handleLanguageChange);

    setupMenuNavigation();

    const initialRoute = window.location.hash.replace(/^#\/?/, '') || APP_CONFIG.defaultRoute;
    navigateTo(initialRoute);

    console.log('✅ Router initialized');
}