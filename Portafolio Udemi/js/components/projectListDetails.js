/**
 * Renders the HTML for a single project item, including project image, technologies, details, and action buttons.
 * The project is displayed with an animation if it is the first or third in the list.
 *
 * @param {Object} project - The project object containing details such as title, description, front image, and associated technologies.
 * @param {number} index - The index of the project in the list (used for applying animation classes).
 * @param {Array} techData - Array of technology objects sourced from the `tech.json` file. Each object contains a `name` and an `icon`.
 * @returns {string} The HTML string representing the project card, which includes the image, technologies, details, and buttons.
 */
export function renderProjectItem(project, index, techData) {
  // Determine the animation class based on the project index
  const animationClass = index === 0 ? 'animate-fade-left' : index === 2 ? 'animate-fade-right' : '';

  // Create a map for quick lookup of technology icons by name
  const techMap = new Map(techData.map(t => [t.name, t.icon]));

  return `
    <div class="projects__card ${animationClass}">
        <div class="card__item">
           <!-- Card image container with dynamic aspect ratio class -->
           <div class="card__img-wrapper card__img-wrapper--${project.imageRatio}">
              <img
                class="card__img"
                src="${project.frontImage}"
                alt="${project.title} front image"
              >
           </div>
          
          <!-- tech icons or text for each technology in the project -->
          <div class="card__tech">
            ${project.technologies.map(tech => {
    const icon = techMap.get(tech); // Lookup the icon for the technology in the map
    if (icon) {
      // If an icon is found, display the icon with the appropriate class
      return `<div class="tech__item"><span class="iconify" data-icon="${icon}"></span></div>`;
    } else {
      // If no icon is found, display the technology name as text
      return `<div class="tech__item"><p>${tech}</p></div>`;
    }
  }).join('')} <!-- Join the resulting array of tech items into a single string -->
          </div>

          <!-- Project details including title and description -->
          <div class="card__details">
            <h4 class="card__title">${project.title}</h4>
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
