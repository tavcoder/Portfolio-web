import { getCurrentLanguage } from './router.js';

/**
 * Cache para almacenar los datos cargados
 * @type {Object}
 */
const dataCache = {
    es: {},
    en: {}
};

/**
 * Carga un archivo JSON según el idioma actual
 * @param {string} fileName - Nombre del archivo según tu estructura actual
 * @returns {Promise<Object>}
 */
export async function loadData(fileName) {
    const lang = getCurrentLanguage();
    const cacheKey = fileName;

    // Si ya está en caché, devolverlo
    if (dataCache[lang][cacheKey]) {
        return dataCache[lang][cacheKey];
    }

    try {
        let filePath;

        // Archivos que ya tienen el formato name_lang.json (skills y studies)
        if (fileName === 'skills' || fileName === 'studies') {
            filePath = `./data/${fileName}_${lang}.json`;
        }
        // Archivos que no necesitan traducción (tech.json)
        else if (fileName === 'tech') {
            filePath = `./data/tech.json`;
        }
        // Archivos que necesitan formato nuevo: name_lang.json
        else {
            filePath = `./data/${fileName}_${lang}.json`;
        }

        const response = await fetch(filePath);
        if (!response.ok) {
            throw new Error(`Failed to load ${filePath}`);
        }
        const data = await response.json();

        // Guardar en caché
        dataCache[lang][cacheKey] = data;
        return data;
    } catch (error) {
        console.error(`Error loading data for ${fileName}:`, error);

        // Fallback al idioma español si falla
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
 * Limpia el caché de datos (útil al cambiar de idioma)
 */
export function clearCache() {
    dataCache.es = {};
    dataCache.en = {};
}

/**
 * Traducciones estáticas de la UI (textos que no vienen de JSON)
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
        errorLoadingProjects: 'Error loading projects.',
        errorLoadingHero: 'Error loading hero.',
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
 * Obtiene una traducción de UI
 * @param {string} key - Clave de traducción
 * @returns {string}
 */
export function t(key) {
    const lang = getCurrentLanguage();
    return uiTranslations[lang][key] || key;
}