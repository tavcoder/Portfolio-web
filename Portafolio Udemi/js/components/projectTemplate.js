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

    const imagesHTML = project.images
      .map(img => `<img src="${img}" alt="${project.name}" class="project__img">`)
      .join('');

    const stackHTML = project.stack
      .map(tech => `<li>${tech}</li>`)
      .join('');

    const gifsHTML = project.features
      .map(f => `
      <video 
        class="feature__gif" 
        src="${f.demo_gif}" 
        autoplay 
        loop 
        muted 
        playsinline>
      </video>
  `)
      .join('');
    const titlesHTML = project.features
      .map((f, i) => `
      <h4 class="feature__title" data-index="${i}">${f.title}</h4>
  `)
      .join('');


    const featuresHTML = `
  <div class="features__gifs">
    ${gifsHTML}
  </div>
  <div class="features__titles">
    ${titlesHTML}
  </div>
`;


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
              <a href="${project.demo}" target="_blank" class="btn primaryBtn">🔗 Demo</a>
              <a href="${project.code}" target="_blank" class="btn secondaryBtn">💻 Código</a>
            </div>
          </div>
        </div>

        <div class="project__content">

           <div class="project__features">
              <h3>Características</h3>
              <div class="features__grid">
                ${featuresHTML}
              </div>
            </div>

          <div class="project__learning">
          <h3>Aprendizajes y mejoras</h3>
            <div class="learning__grid">
              <p><strong>Retos:</strong> ${project.retos}</p>
              <p><strong>Aprendizajes:</strong> ${project.aprendizajes}</p>
              <p><strong>Futuras funcionalidades:</strong> ${project.futuras_funcionalidades}</p>
            </div>
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
  const gifs = document.querySelectorAll('.features__gifs .feature__gif');
  const titles = document.querySelectorAll('.features__titles .feature__title');
  if (!gifs.length || gifs.length !== titles.length) return;

  let activeIndex = 0;
  gifs[activeIndex].classList.add('active');
  titles[activeIndex].classList.add('active');

  titles.forEach((title, i) => {
    title.addEventListener('click', () => {
      gifs[activeIndex].classList.remove('active');
      titles[activeIndex].classList.remove('active');

      gifs[i].classList.add('active');
      titles[i].classList.add('active');

      activeIndex = i;
    });
  });
}

