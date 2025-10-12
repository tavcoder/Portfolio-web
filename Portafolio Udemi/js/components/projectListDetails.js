/**
 * Renders the HTML for a single project item.
 * @param {Object} project - The project object containing details.
 * @param {number} index - The index of the project in the list.
 * @returns {string} The HTML string for the project item.
 */
export function renderProjectItem(project, index) {
  const animationClass = index === 0 ? 'animate-fade-left' : index === 2 ? 'animate-fade-right' : '';

  return `
    <div class="projects__item ${animationClass}">
      <a href="#/project/${project.id}" class="item__container" data-id="${project.id}">
        <div class="item__card">
          <img class="item__img" src="${project.frontImage}" alt="${project.title} front image">
        </div>

        <div class="projects__skill">
          ${project.technologies.map(tech => {
            if (tech === 'PHP') return '<div class="skill__item"><i class="fab fa-php"></i></div>';
            if (tech === 'Database') return '<div class="skill__item"><i class="fa fa-database"></i></div>';
            if (tech === 'POO') return '<div class="skill__item"><p>POO</p></div>';
            if (tech === 'MVC') return '<div class="skill__item"><p>MVC</p></div>';
            if (tech === 'Laravel') return '<div class="skill__item"><i class="fab fa-laravel"></i></div>';
            if (tech === 'Bootstrap') return '<div class="skill__item"><i class="fab fa-bootstrap"></i></div>';
            if (tech === 'CSS') return '<div class="skill__item"><i class="fab fa-css3-alt"></i></div>';
            if (tech === 'HTML') return '<div class="skill__item"><i class="fab fa-html5"></i></div>';
            if (tech === 'React') return '<div class="skill__item"><i class="fab fa-react"></i></div>';
            if (tech === 'Vite') return '<div class="skill__item"><img src="assets/logo/vite.svg" alt="Vite" class="skill__logo"></div>';
            if (tech === 'MongoDb') return '<div class="skill__item"><i class="fas fa-leaf"></i></div>';
            if (tech === 'Node') return '<div class="skill__item"><i class="fab fa-node-js"></i></div>';
            if (tech === 'Express') return '<div class="skill__item"><p>Express</p></div>';
            if (tech === 'Supabase') return '<div class="skill__item"><img src="assets/logo/supabase.svg" alt="Supabase" class="skill__logo"></div>';
            if (tech === 'SASS') return '<div class="skill__item"><i class="fab fa-sass"></i></div>';
            if (tech === 'JAVA SCRIPT') return '<div class="skill__item"><i class="fab fa-js-square"></i></div>';
            return `<div class="skill__item"><p>${tech}</p></div>`;
          }).join('')}
        </div>

        <div class="item__details">
          <h4 class="item__title">${project.title}</h4>
          <p class="item__text">${project.description}</p>
        </div>
      </a>
    </div>
  `;
}
