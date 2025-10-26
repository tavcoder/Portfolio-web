/**
 * Renders the skills section HTML.
 * @returns {Promise<string>} The HTML string for the skills section.
 */
export async function renderSkills() {
    try {
        const response = await fetch('data/skills.json');
        const skills = await response.json();

        const programmingToolsHTML = skills.programmingTools.map((tool, index) => `
            <div class="skills__textContent__skills animate-on-scroll animate-fade-in animate-delay-${800 + index * 200}">
                <div class="skills__textContent__iconCircle"><i class="${tool.icon}"></i></div>
                <p>${tool.text}</p>
            </div>
        `).join('');

        const designToolsHTML = skills.designTools.map((tool, index) => `
            <div class="skills__textContent__skills animate-on-scroll animate-fade-in animate-delay-${800 + index * 200}">
                <div class="skills__textContent__iconCircle"><i class="${tool.icon}"></i></div>
                <p>${tool.text}</p>
            </div>
        `).join('');

        const frontendHTML = skills.frontend.map((tech, index) => `
            <div class="skills__container__tech animate-on-scroll animate-zoom-in animate-delay-${200 + index * 200}">
                <i class="${tech.icon}"></i>
                <p class="skills__container__tech__name">${tech.name}</p>
            </div>
        `).join('');

        const backendHTML = skills.backend.map((tech) => `
            <div class="skills__container__tech">
                <i class="${tech.icon}"></i>
                <p class="skills__container__tech__name">${tech.name}</p>
            </div>
        `).join('');

        return `
            <div class="content__page content__skills">

                <div class="skills__textContent animate-on-scroll animate-fade-right">
                    <h2 class="skills__textContent__title">${skills.textContent.title}</h2>
                    <p class="skills__textContent__text animate-on-scroll animate-fade-in animate-delay-300">${skills.textContent.text}</p>

                    <h3 class="skills__textContent__subtitle">${skills.textContent.programmingToolsTitle}</h3>
                    <div class="skills__textContent__container">
                        ${programmingToolsHTML}
                    </div>

                    <h3 class="skills__textContent__subtitle">${skills.textContent.designToolsTitle}</h3>
                    <div class="skills__textContent__container">
                        ${designToolsHTML}
                    </div>

                </div>

                <div class="skills__container animate-on-scroll animate-fade-left">
                    <h3 class="skills__container__title">${skills.technologiesTitle}</h3>
                    <!-- Tecnologías Frontend -->
                    <div id="frontend" class="skills__container__group">
                        ${frontendHTML}
                    </div>

                    <!-- Tecnologías Backend -->
                    <div id="backend" class="skills__container__group hidden">
                        ${backendHTML}
                    </div>

                    <!-- Switch para alternar entre frontend y backend -->
                    <label class="skills__switch">
                        <input type="checkbox" class="switch__input" id="toggle-tech" onclick="toggleTechnologies()">
                        <span class="skills__slider">
                            <p class="skills__label" id="label-text">Frontend</p>
                        </span>
                    </label>

                </div>
            </div>
        `;
    } catch (error) {
        console.error('Error loading skills:', error);
        return '<div class="content__page content__skills">Error loading skills.</div>';
    }
}