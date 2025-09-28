import { renderProjectItem } from './projectDetail.js';

export async function renderProjects() {
    try {
        const response = await fetch('data/projects.json');
        const projects = await response.json();

        const projectsHTML = projects.map((project, index) => renderProjectItem(project, index)).join('');

        return `
            <div class="projects__container">
                ${projectsHTML}
            </div>
        `;
    } catch (error) {
        console.error('Error loading projects:', error);
        return `<div class="projects__container"><p>Error loading projects.</p></div>`;
    }
}