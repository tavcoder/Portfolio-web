/**
 * Renders the HTML for a single project item.
 * @param {Object} project - The project object containing details.
 * @param {number} index - The index of the project in the list.
 * @param {Array} techData - Array of technology objects from tech.json.
 * @returns {string} The HTML string for the project item.
 */
export function renderProjectItem(project, index, techData) {
  const animationClass = index === 0 ? 'animate-fade-left' : index === 2 ? 'animate-fade-right' : '';

  // Create a map for quick lookup
  const techMap = new Map(techData.map(t => [t.name, t.icon]));

  return `
    <div class="projects__card ${animationClass}">
        <div class="card__item">
          <img class="card__img" src="${project.frontImage}" alt="${project.title} front image">
          <div class="projects__skill">
          ${project.technologies.map(tech => {
            const icon = techMap.get(tech);
            if (icon) {
              return `<div class="skill__item"><span class="iconify" data-icon="${icon}"></span></div>`;
            } else {
              return `<div class="skill__item"><p>${tech}</p></div>`;
            }
           }).join('')}
        </div>

        <div class="card__details">
          <h4 class="card__title">${project.title}</h4>
          <p class="card__text">${project.description}</p>
        </div>
        <div class="card__buttons">  
         <a href="${project.demo}" target="_blank" class="btn">Demo</a>
         <a href="${project.github}" target="_blank" class="btn">Código</a>
         <a href="#/project/${project.id}" class="btn" data-id="${project.id}"> + </a>
         </div>
    </div>
     </div>
  `;
}
