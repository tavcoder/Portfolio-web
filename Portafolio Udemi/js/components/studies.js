/**
 * Renders the studies section by fetching the JSON file based on the selected language.
 * @param {string} language - The current language code (e.g., "es" or "en").
 * @returns {Promise<string>} The HTML string for the studies section.
 */
export async function renderStudies(language = "es") {
    try {
        const response = await fetch(`data/studies_${language}.json`);
        if (!response.ok) throw new Error(`Error al cargar studies_${language}.json`);
        const studies = await response.json();

        const listItems = studies.map(({ date, stack, title, institution, description, delay }) => `
            <li class="studies__item animate-on-scroll animate-zoom-in${delay ? ` animate-delay-${delay}` : ""}">
              <div class="timeline__point"> 
            <p class="studies__date">${date}</p>
                <div class="studies__icon">
                    ${stack}
                </div>
                 </div>
                <div class="studies__content-block">
                    <h3 class="studies__title">${title} 
                        <span class="studies__institution">${institution}</span>
                    </h3>
                    <p class="studies__description">${description}</p>
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
                <p class="error">No se pudo cargar la información de estudios.</p>
            </section>
        `;
    }
}
