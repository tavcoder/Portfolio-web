// ========================================
// projectsList.js - ACTUALIZADO
// ========================================
import { loadData, t } from '../core/i18n.js';
import { renderProjectItem } from './projectListDetails.js';

export async function renderProjects() {
    try {
        const projects = await loadData('projectsList');

        if (!projects) throw new Error('Missing data');

        const projectsHTML = projects.items.map((project, index) =>
            renderProjectItem(project, index)
        ).join('');

        return `
            <div class="content__projects">
                <h2 class="projects__title">${projects.title}</h2>
                <div class="projects__list">${projectsHTML}</div>
            </div>
        `;
    } catch (error) {
        console.error('Error loading projects:', error);
        return `<div class="content__projects">${t('errorLoadingProjects')}</div>`;
    }
}
