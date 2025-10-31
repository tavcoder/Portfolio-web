/**
 * Renders the hero section HTML.
 * @returns {Promise<string>} The HTML string for the hero section.
 */
export async function renderHero() {
    try {
        const response = await fetch('data/hero.json');
        const hero = await response.json();

        const buttonsHTML = hero.buttons.map((btn, index) => `
            <a href="${btn.href}" target="_blank" class="animate-on-scroll animate-zoom-in${index > 0 ? ' animate-delay-300' : ''}">
                <button class="${btn.class}">${btn.text}</button>
            </a>
        `).join('');

        return `
            <section class="content__hero">
                <h1 class="page__title animate-on-scroll animate-fade-right">${hero.title}</h1>
                <p class="page__text animate-on-scroll animate-fade-left">${hero.text}</p>
                <div class="page__btn">
                    ${buttonsHTML}
                </div>
            </section>
        `;
    } catch (error) {
        console.error('Error loading hero:', error);
        return '<section class="content__hero">Error loading hero.</section>';
    }
}