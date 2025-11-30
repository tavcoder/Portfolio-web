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
      .map(tech => `
    <li class="stack__item">
      <span class="stack__icon">${tech.icon}</span>
      <span class="stack__name">${tech.name}</span>
    </li>
  `)
      .join('');

    // === FEATURES CON GIF + LABEL ASOCIADO ===
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
            <h3>Stack Tecnológico</h3>
              <ul class="project__stack">${stackHTML}</ul>
            <div class="project__links">
              <a href="${project.demo}" target="_blank" class="btn primaryBtn">Demo</a>
              <a href="${project.code}" target="_blank" class="btn secondaryBtn">Código</a>
            </div>
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