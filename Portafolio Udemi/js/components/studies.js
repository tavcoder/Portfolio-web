
import { loadData, t } from '../core/i18n.js';

/**
 * Renderiza badge de status
 */
function renderStatusBadge(status) {
    if (!status || status !== 'En curso') return '';

    return `
        <span class="studies__badge studies__badge--active" aria-label="${t('currentlyStudying')}">
            ${t('inProgress')}
        </span>
    `;
}

/**
 * Renderiza pills de skills
 */
function renderSkills(skills) {
    if (!skills || skills.length === 0) return '';

    const skillItems = skills.map(skill => `
        <span class="studies__skill">${skill}</span>
    `).join('');

    return `
        <div class="studies__skills" aria-label="${t('skillsAcquired')}">
            ${skillItems}
        </div>
    `;
}

/**
 * Renderiza highlight (proyecto destacado)
 */
function renderHighlight(highlight) {
    if (!highlight) return '';

    return `
        <div class="studies__highlight">
            <svg 
                class="studies__highlight-icon" 
                width="16" 
                height="16" 
                viewBox="0 0 16 16"
                aria-hidden="true"
            >
                <path fill="currentColor" d="M8 0l2.5 5 5.5.5-4 4 1 5.5L8 12l-5 3 1-5.5-4-4 5.5-.5z"/>
            </svg>
            <p class="studies__highlight-text">${highlight}</p>
        </div>
    `;
}

/**
 * Renderiza link a certificado
 */
function renderCertificateLink(link, title) {
    if (!link) return '';

    return `
        <a 
            href="${link}" 
            class="studies__link"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="${t('viewCertificate')} - ${title}"
        >
            ${t('viewCertificate')}
            <svg 
                class="studies__link-icon" 
                width="16" 
                height="16"
                viewBox="0 0 16 16"
                aria-hidden="true"
            >
                <path fill="currentColor" d="M14 2H9.5L8 0.5 6.5 2H2v2h12V2zm0 3H2v9a2 2 0 002 2h8a2 2 0 002-2V5z"/>
            </svg>
        </a>
    `;
}

/**
 * Renderiza un item de estudio
 */
function renderStudyItem(study) {
    const {
        date,
        title,
        institution,
        type,
        status,
        skills,
        description,
        highlight,
        link,
        delay
    } = study;

    return `
        <article 
            class="studies__card"
            role="listitem"
            data-aos="fade-up"
            data-aos-delay="${delay || 0}"
        >
            <header class="studies__header">
                <time class="studies__date" datetime="${date}">
                    ${date}
                </time>
                ${type ? `<span class="studies__type">${type}</span>` : ''}
                ${renderStatusBadge(status)}
            </header>
            
            <div class="studies__main">
                <h3 class="studies__title">${title}</h3>
                <p class="studies__institution">${institution}</p>
            </div>
            
            ${renderSkills(skills)}
            
            <p class="studies__description">${description}</p>
            
            ${renderHighlight(highlight)}
            
            ${renderCertificateLink(link, title)}
        </article>
    `;
}

/**
 * Renderiza la sección completa
 */
export async function renderStudies() {
    try {
        const studies = await loadData('studies');

        if (!studies || studies.length === 0) {
            throw new Error('No studies data available');
        }

        const studyCards = studies.map(renderStudyItem).join('');

        return `
            <section class="studies" aria-labelledby="studies-heading">
                <h2 id="studies-heading" class="studies__heading">
                    ${t('educationAndCertifications')}
                </h2>
                
                <div class="studies__timeline" role="list" tabindex="0">
                    ${studyCards}
                </div>
            </section>
        `;
    } catch (error) {
        console.error('Error loading studies:', error);
        return `
            <section class="studies">
                <div class="error-message" role="alert">
                    <p>${t('errorLoadingStudies')}</p>
                </div>
            </section>
        `;
    }
}

/**
 * Inicializa scroll con teclado
 */
export function initStudiesTimeline() {
    const timeline = document.querySelector('.studies__timeline');

    if (!timeline) return;

    timeline.addEventListener('keydown', (e) => {
        const scrollAmount = 300;

        if (e.key === 'ArrowRight') {
            e.preventDefault();
            timeline.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        } else if (e.key === 'ArrowLeft') {
            e.preventDefault();
            timeline.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        }
    });
}