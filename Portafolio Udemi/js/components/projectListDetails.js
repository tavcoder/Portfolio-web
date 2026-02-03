/**
 * Renders the HTML for a single project item, including project image, technologies, details, and action buttons.
 * The project is displayed with an animation if it is the first or third in the list.
 *
 * @param {Object} project - The project object containing details such as title, description, front image, and associated technologies.
 * @param {number} index - The index of the project in the list (used for applying animation classes).
 * @returns {string} The HTML string representing the project card, which includes the image, technologies, details, and buttons.
 */
export function renderProjectItem(project, index) {
  // Determine the animation class based on the project index
  const animationClass = index === 0 ? 'animate-fade-left' : index === 2 ? 'animate-fade-right' : '';

  return `
    <div class="projects__card ${animationClass}">
        <div class="card__item">
        <h3 class="card__title">${project.title}</h3>
           <!-- Card image container with dynamic aspect ratio class -->
           <div class="card__img-wrapper card__img-wrapper--${project.imageRatio}">
              <img
                class="card__img"
                src="https://placehold.co/960x600/e6d9ff/7B3FF2?text=${project.title} screenshot"
                alt="${project.title} image"
              >
           </div>
          
          <!-- text for each technology in the project -->
          <div class="card__tech">
           ${project.technologies.map(tech =>
    `<div class="tech-tag"><p>${tech}</p></div>`
  ).join('')}
          <!-- Join the resulting array of tech items into a single string -->
          </div>

          <!-- Project details including title and description -->
          <div class="card__details">
            <p class="card__text">${project.description}</p>
          </div>
          
          <!-- Action buttons for demo, code repository, and project details -->
          <div class="card__buttons">  
            <a href="${project.demo}" target="_blank" class="btn">Demo</a>
            <a href="${project.github}" target="_blank" class="btn">Código</a>
            <a href="#/project/${project.id}" class="btn" data-id="${project.id}"> + </a>
          </div>
        </div>
    </div>
  `;
}
