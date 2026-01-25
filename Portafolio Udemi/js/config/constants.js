/**
 * constants.js - Application Configuration
 * 
 * Centralized configuration and constants for the entire application.
 * 
 * @module config/constants
 */

export const APP_CONFIG = {
    // Application metadata
    name: 'Tania Arteaga Portfolio',
    version: '1.0.0',
    author: 'Tania Arteaga',

    // Feature flags
    enableAnimations: true,
    enableDebugMode: false, // Cambiar a true para debugging

    // i18n configuration
    defaultLanguage: 'es',
    supportedLanguages: ['es', 'en'],

    // Router configuration
    defaultRoute: '',

    // Animation configuration
    animationThreshold: 0.1,
    animationRootMargin: '0px 0px -50px 0px',
};

/**
 * DOM selectors used throughout the application
 */
export const SELECTORS = {
    contentContainer: '#content__page',
    menuButtons: '.tertiaryBtn',
    languageDot: '.dot.btn',
    languageWrapper: '.wrapper',
    animatedElements: '.animate-on-scroll',
};

/**
 * Route configuration
 */
export const ROUTES = {
    HOME: '',
    HERO: 'hero',
    SKILLS: 'skills',
    PROJECTS: 'projects',
    STUDIES: 'studies',
    PROJECT_DETAIL: 'project/',
};

/**
 * Event names used for custom events
 */
export const EVENTS = {
    LANGUAGE_CHANGED: 'languageChanged',
    ROUTE_CHANGED: 'routeChanged',
};

/**
 * Local storage keys
 */
export const STORAGE_KEYS = {
    LANGUAGE: 'language',
    THEME: 'theme',
};