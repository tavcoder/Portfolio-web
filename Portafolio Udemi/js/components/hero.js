// ========================================
// hero.js - ACTUALIZADO
// ========================================
import { loadData, t } from '../i18n.js';

export async function renderHero() {
    try {
        const hero = await loadData('hero');
        if (!hero) throw new Error('No hero data');

        const buttonsHTML = hero.buttons.map((btn, index) => `
            <a href="${btn.href}" target="_blank" class="animate-on-scroll animate-zoom-in${index > 0 ? ' animate-delay-300' : ''}">
                <button class="${btn.class}">${btn.text}</button>
            </a>
        `).join('');

        const titleWithSpan = hero.title.replace('Web Developer', '<span class="web-developer">Web Developer</span>');
        return `
            <section class="content__hero">
                <h1 class="page__title animate-on-scroll animate-fade-right">${titleWithSpan}</h1>
                <p class="page__text animate-on-scroll animate-fade-left">${hero.text}</p>
                <div class="page__btn">
                    ${buttonsHTML}
                </div>
            </section>
        `;
    } catch (error) {
        console.error('Error loading hero:', error);
        return `<section class="content__hero">${t('errorLoadingHero')}</section>`;
    }
}