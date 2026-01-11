// ========================================
// skills.js - ACTUALIZADO
// ========================================
import { loadData, t } from '../i18n.js';

export async function renderSkills() {
  try {
    const skills = await loadData('skills');
    const techData = await loadData('tech');

    if (!skills || !techData) throw new Error('Missing data');

    const programmingHTML = skills.programmingTools.items
      .map((tool, i) => `
        <div class="skills__textContent__skills animate-on-scroll animate-fade-in animate-delay-${800 + i * 200}">
          <div class="skills__textContent__iconCircle"><i class="fas fa-check check"></i></div>
          <p>${tool}</p>
        </div>`
      )
      .join('');

    const designHTML = skills.designTools.items
      .map((tool, i) => `
        <div class="skills__textContent__skills animate-on-scroll animate-fade-in animate-delay-${800 + i * 200}">
          <div class="skills__textContent__iconCircle"><i class="fas fa-check check"></i></div>
          <p>${tool}</p>
        </div>`
      )
      .join('');

    const frontendTechs = techData.filter(t => t.category === 'frontend' || t.category === 'both');
    const backendTechs = techData.filter(t => t.category === 'backend' || t.category === 'both');

    const frontendHTML = frontendTechs
      .map((tech, i) => `
        <div class="skills__container__tech animate-on-scroll animate-zoom-in animate-delay-${200 + i * 200}">
          <span class="iconify" data-icon="${tech.icon}"></span>
          <p class="skills__container__tech__name">${tech.name}</p>
        </div>`
      )
      .join('');

    const backendHTML = backendTechs
      .map((tech) => `
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
            <input type="checkbox" class="switch__input" id="toggle-tech">
            <span class="skills__slider">
              <p class="skills__label" id="label-text">${t('frontend')}</p>
            </span>
          </label>
        </div>
      </div>
    `;
  } catch (error) {
    console.error('Error loading skills data:', error);
    return `<div class="content__skills">${t('errorLoadingSkills')}</div>`;
  }
}
