// ========================================
// studies.js - ACTUALIZADO
// ========================================
import { loadData, t } from '../core/i18n.js';

export async function renderStudies() {
    try {
        const studies = await loadData('studies');
        if (!studies) throw new Error('No studies data');

        const listItems = studies.map(({ date, stack, title, institution, description, delay }) => `
            <li class="studies__item animate-on-scroll animate-zoom-in${delay ? ` animate-delay-${delay}` : ""}">
              <div class="timeline__point"> 
            <p class="studies__date">${date}</p>
                <div class="studies__icon">
                    ${stack}
                </div>
                <div class="studies__content-block">
                    <h3 class="studies__title">${title} 
                        <span class="studies__institution">${institution}</span>
                    </h3>
                    <p class="studies__description">${description}</p>
                    </div>
                 </div>
            </li>
        `).join("");

        return `
            <section class="content__studies">
                <ul class="studies__list">
                    ${listItems}
                </ul>
            </section>
        `;
    } catch (error) {
        console.error(error);
        return `
            <section class="content__studies">
                <p class="error">${t('errorLoadingStudies')}</p>
            </section>
        `;
    }
}