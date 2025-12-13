/**
 * Renders the HTML for a project template based on the projectId.
 * @param {string} projectId - The unique ID of the project to render.
 * @returns {string} The HTML content for the project template page.
 */
export async function renderProjectTemplate(projectId) {
  try {
    // Fetch project data (projectTemplate.json)
    const response = await fetch('data/projectTemplate.json');
    const projects = await response.json();
    const project = projects.find(p => p.id === projectId);

    // Fetch technology icons data (tech.json)
    const techResponse = await fetch('data/tech.json');
    const techData = await techResponse.json();

    // Create a map for quick lookup of technology icons by name
    const techMap = new Map(techData.map(t => [t.name, t.icon]));

    // If the project is not found, return a "not found" message
    if (!project) {
      return `
        <div class="project__not-found">
          <h2>Proyecto no encontrado</h2>
          <a href="#/projects" class="back__link">← Volver a proyectos</a>
        </div>`;
    }

    // Render project images
    const imagesHTML = project.images
      .map(img => `<img src="${img}" alt="${project.name}" class="project__img">`)
      .join('');

    // Render stack technologies with their icons and names
    const stackHTML = project.stack
      .map(tech => {
        const icon = techMap.get(tech); // Lookup the icon for the technology in the map
        if (icon) {
          // If an icon is found, display the icon with the name
          return `
        <li class="tech__item">
          <span class="iconify" data-icon="${icon}"></span>
          <p class="tech__name">${tech}</p> <!-- Add the technology name -->
        </li>
      `;
        } else {
          // If no icon is found, display the technology name as text only
          return `
        <div class="tech__item">
          <p>${tech}</p> <!-- Just show the tech name if no icon -->
        </div>
      `;
        }
      })
      .join('');


    // === Features with GIF/Video ===
    const featuresHTML = project.features
      .map((f, i) => `
        <div class="feature__item ${i === 0 ? 'active' : ''}">
          <span class="feature__title">${f.title}</span>
          <!-- GIF/VIDEO asociado directamente -->
          <video
            class="feature__gif"
            src="${f.demo_gif}"
            autoplay
            loop
            muted
            playsinline
            loading="lazy"
            ${i === 0 ? '' : 'data-lazy'} <!-- opcional: lazy load los que no son el primero -->
          ></video>
        </div>
      `)
      .join('');

    // Return the full HTML for the project page
    return `
      <div class="project__page animate-fade-in">
        <div class="project__links">
              <a href="#/projects" class="btn back__link">← Volver</a>
              <a href="${project.demo}" target="_blank" class="btn primaryBtn">Demo</a>
              <a href="${project.code}" target="_blank" class="btn secondaryBtn">Código</a>
        </div>

        <div class="project__header">
          <div class="header__gallery">
            ${imagesHTML}
          </div>
          <div class="header__text">
            <h2 class="project__title">${project.name}</h2>
            <p class="project__description">${project.description}</p>
            <h3>Stack Tecnológico</h3>
            <ul class="project__tech">${stackHTML}</ul>
            
          </div>
        </div>

        <div class="project__content">
          <div class="project__features">
            <h3>Características del proyecto</h3>
            <div class="features__list">
              ${featuresHTML}
            </div>
          </div>
          <div class="project__learning">
            <p><strong>Retos:</strong> ${project.retos}</p>
            <p><strong>Aprendizajes:</strong> ${project.aprendizajes}</p>
          </div>
          <p><strong>Futuras funcionalidades:</strong> ${project.futuras_funcionalidades}</p>
        </div>
      </div>
    `;
  } catch (error) {
    console.error('Error loading project:', error);
    return `<div class="project__page">Error cargando los datos del proyecto.</div>`;
  }
}

/**
 * Initializes the feature selector to toggle between GIFs/videos in the project features.
 */
export function initFeatureSelector() {
  const radios = document.querySelectorAll('.state');
  const videos = document.querySelectorAll('.feature__gif');

  if (!radios.length) return;

  // Listen for changes in any radio button to switch between features
  radios.forEach(radio => {
    radio.addEventListener('change', () => {
      const index = radio.value;
      videos.forEach((v, i) => {
        v.classList.toggle('active', i == index);
      });
    });
  });

  // Initially activate the first feature
  const checked = document.querySelector('.state:checked');
  if (checked) {
    videos[checked.value].classList.add('active');
  }
}
