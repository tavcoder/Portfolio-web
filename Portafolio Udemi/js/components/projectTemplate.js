export async function renderProjectTemplate(projectId) {
  try {
    const response = await fetch('data/projectTemplate.json');
    const projects = await response.json();
    const project = projects.find(p => p.id === projectId);

    if (!project) {
      return `
        <div class="project__not-found">
          <h2>Proyecto no encontrado</h2>
          <a href="#/projects" class="back__link">← Volver a proyectos</a>
        </div>`;
    }

    const imagesHTML = project.images
      .map(img => `<img src="${img}" alt="${project.name}" class="project__img">`)
      .join('');

    const stackHTML = project.stack
      .map(tech => `<li>${tech}</li>`)
      .join('');

    // === GIFS SUPERPUESTOS ===
    const gifsHTML = project.features
      .map((f, i) => `
        <video 
          class="feature__gif ${i === 0 ? 'active' : ''}" 
          src="${f.demo_gif}" 
          autoplay 
          loop 
          muted 
          playsinline
          loading="lazy">
        </video>
      `)
      .join('');

    // === RADIO BUTTONS ESTILIZADOS ===
    const radioButtonsHTML = project.features
      .map((f, i) => `
        <div class="wrapper">
          <input 
            value="${i}" 
            id="feature-${projectId}-${i}" 
            name="feature-${projectId}" 
            type="radio" 
            class="state" 
            ${i === 0 ? 'checked' : ''}
          />
          <label for="feature-${projectId}-${i}" class="label">
            <div class="indicator"></div>
            <span class="text">${f.title}</span>
          </label>
        </div>
      `)
      .join('');

    return `
      <div class="project__page animate-fade-in">
        <a href="#/projects" class="back__link">← Volver</a>

        <div class="project__header">
          <div class="header__gallery">
            ${imagesHTML}
          </div>
          <div class="header__text">
            <h2 class="project__title">${project.name}</h2>
            <p class="project__description">${project.description}</p>
            <div class="project__stack">
              <h3>Stack Tecnológico</h3>
              <ul>${stackHTML}</ul>
            </div>
            <div class="project__links">
              <a href="${project.demo}" target="_blank" class="btn primaryBtn">Demo</a>
              <a href="${project.code}" target="_blank" class="btn secondaryBtn">Código</a>
            </div>
          </div>
        </div>

        <div class="project__content">
          <div class="project__features">
          <div class="features__showcase">
          <!-- VISOR DE GIFS -->
          <div class="features__gifs">
          ${gifsHTML}
          </div>
          
          <!-- RADIO BUTTONS -->
          <div class="radiogroup">
          <h3>Características</h3>
                ${radioButtonsHTML}
              </div>
            </div>
          </div>

          <h3>Aprendizajes y mejoras</h3>
          <div class="project__learning">
            <p><strong>Retos:</strong> ${project.retos}</p>
            <p><strong>Aprendizajes:</strong> ${project.aprendizajes}</p>
            <p><strong>Futuras funcionalidades:</strong> ${project.futuras_funcionalidades}</p>
          </div>
        </div>
      </div>
    `;
  } catch (error) {
    console.error('Error loading project:', error);
    return `<div class="project__page">Error cargando los datos del proyecto.</div>`;
  }
}

export function initFeatureSelector() {
  const radios = document.querySelectorAll('.state');
  const videos = document.querySelectorAll('.feature__gif');

  if (!radios.length) return;

  // Escuchar cambios en cualquier radio
  radios.forEach(radio => {
    radio.addEventListener('change', () => {
      const index = radio.value;
      videos.forEach((v, i) => {
        v.classList.toggle('active', i == index);
      });
    });
  });

  // Inicial: activar el primero
  const checked = document.querySelector('.state:checked');
  if (checked) {
    videos[checked.value].classList.add('active');
  }
}