export function renderProjectItem(project, index) {
    const animationClass = index === 0 ? 'animate-fade-left' : index === 2 ? 'animate-fade-right' : '';
    return `
    <div class="projects__item ${animationClass}">
        <div class="item__container">
            <div class="item__details">
                <h4 class="item__title">${project.title}</h4>
                <p class="item__text">${project.description}</p>
                <div class="projects__skill">
                   ${project.technologies.map(tech => {
                     if (tech === 'React') return '<div class="skill__item"><i class="fab fa-react"></i></div>';
                     if (tech === 'Supabase') return '<div class="skill__item"><img src="assets/icons/supabase.svg" alt="Supabase"></div>';
                     if (tech === 'Node') return '<div class="skill__item"><i class="fab fa-node-js"></i></div>';
                     if (tech === 'Express') return '<div class="skill__item"><span>Express</span></div>';
                     if (tech === 'JavaScript') return '<div class="skill__item"><i class="fab fa-js"></i></div>';
                     if (tech === 'Vite') return '<div class="skill__item"><img src="assets/icons/vite.svg" alt="Vite"></div>';
                     return `<div class="skill__item"><p>${tech}</p></div>`;
                   }).join('')}
                </div>
            </div>
            <div class="item__card">
                <div class="item__front">
                    <img class="item__img" src="${project.frontImage}" alt="${project.title} front image">
                </div>
                <div class="item__back">
                    <img class="item__img" src="${project.backImage}" alt="${project.title} back image">
                </div>
            </div>
        </div>
    </div>
  `;
}
