// ========================================
// skills.js - ACTUALIZADO
// ========================================
import { loadData, t } from '../core/i18n.js';

export async function renderSkills() {
  try {
    const skills = await loadData('skills');

    if (!skills) throw new Error('Missing data');

    const toolsHTML = skills.tools.items
      .map((tool) => `
          <span class="pill pill--secondary">${tool}</span>
        `)
      .join('');
  
    const allTechHTML = skills.tech.items
      .map((tech) => `
      <span class="pill pill--primary">${tech.name}</span>
    `)
      .join('');

    return `
      <div class="content__skills">
        <div class="skills__content animate-on-scroll animate-fade-right">
          <h2 class="skills__title">${skills.title}</h2>
          <p class="skills__text animate-on-scroll animate-fade-in animate-delay-300">${skills.intro}</p>
          <div class="skills__list">${allTechHTML}${toolsHTML}</div>
        </div>
      </div>
    `;
  } catch (error) {
    console.error('Error loading skills data:', error);
    return `<div class="content__skills">${t('errorLoadingSkills')}</div>`;
  }
}
