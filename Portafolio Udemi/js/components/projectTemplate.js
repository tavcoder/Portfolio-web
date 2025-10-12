/**
 * Renders a single project detail page.
 * @param {string} projectId - The ID of the project to render.
 * @returns {Promise<string>} The HTML string for the project detail page.
 */
export async function renderProjectTemplate(projectId) {
  try {
    const response = await fetch('data/projectTemplate.json');
    const projects = await response.json();
    const project = projects.find(p => p.id === projectId);

    if (!project) {
      return `
        <div class="project__not-found">
          <h2>😢 Proyecto no encontrado</h2>
          <a href="#/projects" class="back__link">← Volver a proyectos</a>
        </div>`;
    }

    // Renderiza las imágenes en un carrusel simple (puedes mejorarlo después)
    const imagesHTML = project.images
      .map(img => `<img src="${img}" alt="${project.name}" class="project__img">`)
      .join('');

    return `
      <div class="project__page animate-fade-in">
        <a href="#/projects" class="back__link">← Volver</a>

        <div class="project__header">
          <div class="header__text">
            <h2 class="project__title">${project.name}</h2>
            <p class="project__description">${project.description}</p>
            <div class="project__links">
              <a href="${project.demo}" target="_blank" class="btn btn--demo">🔗 Demo</a>
              <a href="${project.code}" target="_blank" class="btn btn--code">💻 Código</a>
            </div>
          </div>
        </div>
          <div class="project__gallery">
            ${imagesHTML}
          </div>

        <div class="project__stack">
          <h3>Stack Tecnológico</h3>
          <ul>
            ${project.stack.map(tech => `<li>${tech}</li>`).join('')}
          </ul>
        </div>

        <div class="project__features">
          <h3>Características</h3>
          <ul>
            ${project.features.map(f => `<li>${f}</li>`).join('')}
          </ul>
        </div>

      </div>
    `;
  } catch (error) {
    console.error('Error loading project:', error);
    return `<div class="project__page">Error cargando los datos del proyecto.</div>`;
  }
}
