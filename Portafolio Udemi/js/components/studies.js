/**
 * Renders the studies section HTML.
 * @returns {Promise<string>} The HTML string for the studies section.
 */
export async function renderStudies() {
    try {
        const response = await fetch('data/studies.json');
        const studies = await response.json();

        const studiesHTML = studies.map((study, index) => `
            <li class="studies__item animate-on-scroll animate-zoom-in animate-delay-${1000 - index * 200}">
                <p class="studies__date">${study.date}</p>
                <div class="studies__content">
                    <h3 class="studies__title">${study.title} <span class="studies__institution">${study.institution}</span></h3>
                    <p class="studies__description">${study.description}</p>
                </div>
            </li>
        `).join('');

        return `
            <section class="content__page content__studies">
                <ul class="studies__list">
                    ${studiesHTML}
                </ul>
            </section>
        `;
    } catch (error) {
        console.error('Error loading studies:', error);
        return '<section class="content__page content__studies">Error loading studies.</section>';
    }
}