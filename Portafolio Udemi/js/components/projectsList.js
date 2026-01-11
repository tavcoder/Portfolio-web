// ========================================
// projectsList.js - ACTUALIZADO
// ========================================
import { loadData, t } from '../i18n.js';
import { renderProjectItem } from './projectListDetails.js';

export async function renderProjects() {
    try {
        const projects = await loadData('projectsList');
        const techData = await loadData('tech');

        if (!projects || !techData) throw new Error('Missing data');

        const projectsHTML = projects.map((project, index) =>
            renderProjectItem(project, index, techData)
        ).join('');

        return `
            <div class="content__projects">
                ${projectsHTML}
            </div>
        `;
    } catch (error) {
        console.error('Error loading projects:', error);
        return `<div class="content__projects">${t('errorLoadingProjects')}</div>`;
    }
}
