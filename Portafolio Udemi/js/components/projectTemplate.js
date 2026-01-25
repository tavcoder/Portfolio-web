// ========================================
// projectTemplate.js - ACTUALIZADO
// ========================================
import { loadData, t } from '../core/i18n.js';

export async function renderProjectTemplate(projectId) {
  try {
    const projects = await loadData('projectTemplate');
    const techData = await loadData('tech');

    if (!projects || !techData) throw new Error('Missing data');

    const project = projects.find(p => p.id === projectId);
    const techMap = new Map(techData.map(t => [t.name, t.icon]));

    if (!project) {
      return `
        <div class="project__not-found">
          <h2>${t('projectNotFound')}</h2>
          <a href="#/projects" class="back__link">← ${t('backToProjects')}</a>
        </div>`;
    }

    const imagesHTML = project.images
      .map(img => `<img src="${img}" alt="${project.name}" class="project__img">`)
      .join('');

    const stackHTML = project.stack
      .map(tech => {
        const icon = techMap.get(tech);
        if (icon) {
          return `
        <li class="tech__item">
          <span class="iconify" data-icon="${icon}"></span>
          <p class="tech__name">${tech}</p>
        </li>
      `;
        } else {
          return `
        <div class="tech__item">
          <p>${tech}</p>
        </div>
      `;
        }
      })
      .join('');

    const featuresHTML = project.features
      .map((f, i) => `
        <div class="feature__item ${i === 0 ? 'active' : ''}">
          <span class="feature__title">${f.title}</span>
          <video
            class="feature__gif"
            src="${f.demo_gif}"
            autoplay
            loop
            muted
            playsinline
            loading="lazy"
            ${i === 0 ? '' : 'data-lazy'}
          ></video>
        </div>
      `)
      .join('');

    return `
      <div class="project__page animate-fade-in">
        <div class="project__links">
        <a href="#/projects" class="btn links__btn">
          <span class="iconify btn__icon" data-icon="mdi:arrow-left"></span>
          <span class="btn__text">${t('back')}</span>
        </a>

        <a href="${project.demo}" target="_blank" class="btn links__btn">
          <span class="iconify btn__icon" data-icon="mdi:open-in-new"></span>
          <span class="btn__text">${t('demo')}</span>
        </a>

        <a href="${project.code}" target="_blank" class="btn links__btn">
          <span class="iconify btn__icon" data-icon="mdi:github"></span>
          <span class="btn__text">${t('code')}</span>
        </a>
        </div>

        <div class="project__header">
          <div class="header__gallery">
            ${imagesHTML}
          </div>
          <div class="header__text">
            <h2 class="project__title">${project.name}</h2>
            <p class="project__description">${project.description}</p>
            <h3>${t('technologicalStack')}</h3>
            <ul class="project__tech">${stackHTML}</ul>
          </div>
        </div>

        <div class="project__content">
          <div class="project__features">
            <h3>${t('projectFeatures')}</h3>
            <div class="features__list">
              ${featuresHTML}
            </div>
          </div>
          <div class="project__learning">
            <p><strong>${t('challenges')}:</strong> ${project.retos}</p>
            <p><strong>${t('learnings')}:</strong> ${project.aprendizajes}</p>
          </div>
          <p><strong>${t('futureFunctionalities')}:</strong> ${project.futuras_funcionalidades}</p>
        </div>
      </div>
    `;
  } catch (error) {
    console.error('Error loading project:', error);
    return `<div class="project__page">${t('errorLoadingProject')}</div>`;
  }
}

export function initFeatureSelector() {
  const radios = document.querySelectorAll('.state');
  const videos = document.querySelectorAll('.feature__gif');

  if (!radios.length) return;

  radios.forEach(radio => {
    radio.addEventListener('change', () => {
      const index = radio.value;
      videos.forEach((v, i) => {
        v.classList.toggle('active', i == index);
      });
    });
  });

  const checked = document.querySelector('.state:checked');
  if (checked) {
    videos[checked.value].classList.add('active');
  }
}