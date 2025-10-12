import { renderProjectItem } from './projectListDetails.js';

/**
 * Renders the projects section HTML.
 * @returns {Promise<string>} The HTML string for the projects section.
 */
export async function renderProjects() {
    try {
        const response = await fetch('data/projectsList.json');
        const projects = await response.json();
        const projectsHTML = projects.map((project, index) => renderProjectItem(project, index)).join('');

        return `
            <div class="projects__container">
                ${projectsHTML}
            </div>
        `;
    } catch (error) {
        console.error('Error loading projects:', error);
        return '<div class="projects__container">Error loading projects.</div>';
    }
}