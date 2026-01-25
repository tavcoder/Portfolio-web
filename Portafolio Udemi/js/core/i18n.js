/**
 * i18n.js - Internationalization System
 * 
 * Handles all internationalization logic including:
 * - Language switching
 * - Translation loading and caching
 * - Language toggle UI
 * 
 * @module core/i18n
 */

import { APP_CONFIG, STORAGE_KEYS, EVENTS, SELECTORS } from '../config/constants.js';

/**
 * Current application language
 * @type {string}
 */
let currentLanguage = localStorage.getItem(STORAGE_KEYS.LANGUAGE) || APP_CONFIG.defaultLanguage;

/**
 * Translation cache
 * @type {Object.<string, Object>}
 */
const dataCache = {
    es: {},
    en: {}
};

/**
 * UI translations (static texts)
 */
const uiTranslations = {
    es: {
        backToProjects: 'Volver a proyectos',
        projectNotFound: 'Proyecto no encontrado',
        back: 'Volver',
        demo: 'Demo',
        code: 'Código',
        technologicalStack: 'Stack Tecnológico',
        projectFeatures: 'Características del proyecto',
        challenges: 'Retos',
        learnings: 'Aprendizajes',
        futureFunctionalities: 'Futuras funcionalidades',
        errorLoadingProject: 'Error cargando los datos del proyecto.',
        errorLoadingProjects: 'Error cargando proyectos.',
        errorLoadingHero: 'Error cargando hero.',
        errorLoadingSkills: 'Error cargando los datos de habilidades.',
        errorLoadingStudies: 'No se pudo cargar la información de estudios.',
        frontend: 'Frontend',
        backend: 'Backend'
    },
    en: {
        backToProjects: 'Back to projects',
        projectNotFound: 'Project not found',
        back: 'Back',
        demo: 'Demo',
        code: 'Code',
        technologicalStack: 'Tech Stack',
        projectFeatures: 'Project Features',
        challenges: 'Challenges',
        learnings: 'Learnings',
        futureFunctionalities: 'Future Features',
        errorLoadingProject: 'Error loading project data.',
        errorLoadingProjects: 'Error loading projects.',
        errorLoadingHero: 'Error loading hero.',
        errorLoadingSkills: 'Error loading skills data.',
        errorLoadingStudies: 'Could not load studies information.',
        frontend: 'Frontend',
        backend: 'Backend'
    }
};

/**
 * Gets the current language
 * @returns {string}
 * @public
 */
export function getCurrentLanguage() {
    return currentLanguage;
}

/**
 * Sets the application language
 * @param {string} lang
 * @public
 */
export function setLanguage(lang) {
    if (!APP_CONFIG.supportedLanguages.includes(lang)) {
        console.warn(`⚠️ Unsupported language: ${lang}`);
        return;
    }

    currentLanguage = lang;
    localStorage.setItem(STORAGE_KEYS.LANGUAGE, lang);
    document.documentElement.lang = lang;

    updateLanguageUI();

    // Dispatch event for router
    window.dispatchEvent(new CustomEvent(EVENTS.LANGUAGE_CHANGED, {
        detail: { lang }
    }));

    if (APP_CONFIG.enableDebugMode) {
        console.log(`🌍 Language changed to: ${lang}`);
    }
}

/**
 * Toggles between available languages
 * @private
 */
function toggleLanguage() {
    const newLang = currentLanguage === 'es' ? 'en' : 'es';
    setLanguage(newLang);
}

/**
 * Updates the language toggle UI
 * Uses CSS classes and offset-path for smooth animation
 * @private
 */
function updateLanguageUI() {
    const dot = document.querySelector(SELECTORS.languageDot);
    const wrapper = document.querySelector(SELECTORS.languageWrapper);

    if (!dot) return;

    // Obtener los textos SVG
    const svgTexts = document.querySelectorAll(`${SELECTORS.languageWrapper} svg text`);
    let textEN = null;
    let textES = null;

    svgTexts.forEach(text => {
        const content = text.textContent.trim();
        if (content === 'EN') textEN = text;
        if (content === 'ES') textES = text;
    });

    if (currentLanguage === 'es') {
        // Mover dot a posición ES (offset-distance: 100%)
        dot.classList.add('is-active');
        if (wrapper) wrapper.classList.add('is-active');

        // Feedback visual: destacar ES, atenuar EN
        if (textES) {
            textES.style.opacity = '1';
            textES.style.fontWeight = 'bold';
        }
        if (textEN) {
            textEN.style.opacity = '0.4';
            textEN.style.fontWeight = 'normal';
        }
    } else {
        // Mover dot a posición EN (offset-distance: 0%)
        dot.classList.remove('is-active');
        if (wrapper) wrapper.classList.remove('is-active');

        // Feedback visual: destacar EN, atenuar ES
        if (textEN) {
            textEN.style.opacity = '1';
            textEN.style.fontWeight = 'bold';
        }
        if (textES) {
            textES.style.opacity = '0.4';
            textES.style.fontWeight = 'normal';
        }
    }
}
/**
 * Sets up the language toggle button
 * @private
 */
function setupLanguageToggle() {
    const dot = document.querySelector(SELECTORS.languageDot);
    const wrapper = document.querySelector(SELECTORS.languageWrapper);

    if (!dot || !wrapper) {
        console.warn('⚠️ Language toggle button not found');
        return;
    }

    updateLanguageUI();

    dot.addEventListener('click', toggleLanguage);
    wrapper.addEventListener('click', (e) => {
        if (e.target !== dot) {
            toggleLanguage();
        }
    });

    if (APP_CONFIG.enableDebugMode) {
        console.log('🔘 Language toggle setup complete');
    }
}

/**
 * Loads data from JSON files (adapted to your current structure)
 * @param {string} fileName
 * @returns {Promise<Object|null>}
 * @public
 */
export async function loadData(fileName) {
    const lang = currentLanguage;
    const cacheKey = fileName;

    // Check cache first
    if (dataCache[lang][cacheKey]) {
        if (APP_CONFIG.enableDebugMode) {
            console.log(`📦 Loading ${fileName} from cache`);
        }
        return dataCache[lang][cacheKey];
    }

    try {
        let filePath;

        // Files with format: name_lang.json (skills, studies)
        if (fileName === 'skills' || fileName === 'studies') {
            filePath = `./data/${fileName}_${lang}.json`;
        }
        // Files without translation (tech.json)
        else if (fileName === 'tech') {
            filePath = `./data/tech.json`;
        }
        // Other files with format: name_lang.json
        else {
            filePath = `./data/${fileName}_${lang}.json`;
        }

        if (APP_CONFIG.enableDebugMode) {
            console.log(`🌐 Fetching ${filePath}`);
        }

        const response = await fetch(filePath);
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: Failed to load ${filePath}`);
        }

        const data = await response.json();

        // Save to cache
        dataCache[lang][cacheKey] = data;
        return data;

    } catch (error) {
        console.error(`❌ Error loading ${fileName}:`, error);

        // Fallback to Spanish if English fails
        if (lang !== 'es') {
            try {
                let fallbackPath;
                if (fileName === 'skills' || fileName === 'studies') {
                    fallbackPath = `./data/${fileName}_es.json`;
                } else if (fileName === 'tech') {
                    fallbackPath = `./data/tech.json`;
                } else {
                    fallbackPath = `./data/${fileName}_es.json`;
                }

                const fallbackResponse = await fetch(fallbackPath);
                const fallbackData = await fallbackResponse.json();
                return fallbackData;
            } catch (fallbackError) {
                console.error('Fallback also failed:', fallbackError);
                return null;
            }
        }
        return null;
    }
}

/**
 * Gets a UI translation
 * @param {string} key
 * @returns {string}
 * @public
 */
export function t(key) {
    return uiTranslations[currentLanguage][key] || key;
}

/**
 * Clears the translation cache
 * @public
 */
export function clearCache() {
    dataCache.es = {};
    dataCache.en = {};
    if (APP_CONFIG.enableDebugMode) {
        console.log('🗑️ Translation cache cleared');
    }
}

/**
 * Initializes the internationalization system
 * @param {string} defaultLang
 * @public
 */
export function initLanguageSystem(defaultLang = APP_CONFIG.defaultLanguage) {
    if (!localStorage.getItem(STORAGE_KEYS.LANGUAGE)) {
        setLanguage(defaultLang);
    } else {
        updateLanguageUI();
    }

    setupLanguageToggle();

    console.log(`✅ i18n system initialized (language: ${currentLanguage})`);
}