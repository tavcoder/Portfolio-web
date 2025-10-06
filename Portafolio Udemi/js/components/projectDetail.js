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
        <div class="item__container">
            <div class="item__card">
                <div class="item__front">
                    <img class="item__img" src="${project.frontImage}" alt="${project.title} front image">
                </div>
                <div class="item__back">
                    <img class="item__img" src="${project.backImage}" alt="${project.title} back image">
                </div>
            </div>
            <div class="item__details">
                <h4 class="item__title">${project.title}</h4>
                <p class="item__text">${project.description}</p>
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
            return `<div class="skill__item"><p>${tech}</p></div>`;
        }).join('')}
                </div>
            </div>
        </div>
    </div>
  `;
}
