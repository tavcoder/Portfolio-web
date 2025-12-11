/**
 * Renders the skills section based on selected language.
 * @param {string} language - Language code ('es' or 'en').
 * @returns {Promise<string>} The HTML string for the skills section.
 */
export async function renderSkills(language = 'es') {
  try {
    const response = await fetch(`data/skills_${language}.json`);
    if (!response.ok) throw new Error(`Error al cargar skills_${language}.json`);
    const skills = await response.json();

    const techResponse = await fetch('data/tech.json');
    const techData = await techResponse.json();

    const programmingHTML = skills.programmingTools.items
      .map(
        (tool, i) => `
        <div class="skills__textContent__skills animate-on-scroll animate-fade-in animate-delay-${800 + i * 200}">
          <div class="skills__textContent__iconCircle"><i class="fas fa-check check"></i></div>
          <p>${tool}</p>
        </div>`
      )
      .join('');

    const designHTML = skills.designTools.items
      .map(
        (tool, i) => `
        <div class="skills__textContent__skills animate-on-scroll animate-fade-in animate-delay-${800 + i * 200}">
          <div class="skills__textContent__iconCircle"><i class="fas fa-check check"></i></div>
          <p>${tool}</p>
        </div>`
      )
      .join('');

    const techMap = new Map(techData.map(t => [t.name, t.icon]));

    const frontendTechs = techData.filter(t => t.category === 'frontend' || t.category === 'both');
    const backendTechs = techData.filter(t => t.category === 'backend' || t.category === 'both');

    const frontendHTML = frontendTechs
      .map(
        (tech, i) => `
        <div class="skills__container__tech animate-on-scroll animate-zoom-in animate-delay-${200 + i * 200}">
          <span class="iconify" data-icon="${tech.icon}"></span>
          <p class="skills__container__tech__name">${tech.name}</p>
        </div>`
      )
      .join('');

    const backendHTML = backendTechs
      .map(
        (tech) => `
        <div class="skills__container__tech">
          <span class="iconify" data-icon="${tech.icon}"></span>
          <p class="skills__container__tech__name">${tech.name}</p>
        </div>`
      )
      .join('');

    return `
      <div class="content__skills">
        <div class="skills__textContent animate-on-scroll animate-fade-right">
          <h2 class="skills__textContent__title">${skills.title}</h2>
          <p class="skills__textContent__text animate-on-scroll animate-fade-in animate-delay-300">${skills.intro}</p>

          <h3 class="skills__textContent__subtitle">${skills.programmingTools.title}</h3>
          <div class="skills__textContent__container">${programmingHTML}</div>

          <h3 class="skills__textContent__subtitle">${skills.designTools.title}</h3>
          <div class="skills__textContent__container">${designHTML}</div>
        </div>

        <div class="skills__container animate-on-scroll animate-fade-left">
          <h3 class="skills__container__title">${skills.tech.title}</h3>

          <div id="frontend" class="skills__container__group">${frontendHTML}</div>
          <div id="backend" class="skills__container__group hidden">${backendHTML}</div>

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
    console.error('Error loading skills data:', error);
    return `<div class="content__skills">Error cargando los datos de habilidades.</div>`;
  }
}
