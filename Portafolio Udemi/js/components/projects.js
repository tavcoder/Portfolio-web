import { renderProjectItem } from './projectDetail.js';

const projects = [
    {
        id: "SuperM",
        title: "SuperM",
        description: "Aplicación de e-commerce desarrollada con React 19 y Vite. Incluye autenticación con Supabase y carrito persistente con Context API + localStorage.",
         github: "https://github.com/tavcoder/SuperM",
            demo: "https://super-m-orcin.vercel.app/",
            frontImage: "assets/img/imgPlaceholder.jpg",
            backImage: "assets/img/imgPlaceholder.jpg",
            technologies: ["React", "Vite", "Supabase"]
    },
    {
        id: "SuperM",
        title: "SuperM",
        description: "Aplicación de e-commerce desarrollada con React 19 y Vite. Incluye autenticación con Supabase y carrito persistente con Context API + localStorage.",
         github: "https://github.com/tavcoder/SuperM",
            demo: "https://super-m-orcin.vercel.app/",
            frontImage: "assets/img/imgPlaceholder.jpg",
            backImage: "assets/img/imgPlaceholder.jpg",
            technologies: ["React", "Vite", "Supabase"]
    },
     {
        id: "SuperM",
        title: "SuperM",
        description: "Aplicación de e-commerce desarrollada con React 19 y Vite. Incluye autenticación con Supabase y carrito persistente con Context API + localStorage.",
         github: "https://github.com/tavcoder/SuperM",
            demo: "https://super-m-orcin.vercel.app/",
            frontImage: "assets/img/imgPlaceholder.jpg",
            backImage: "assets/img/imgPlaceholder.jpg",
            technologies: ["React", "Vite", "Supabase"]
    },
];

export async function renderProjects() {
    const projectsHTML = projects.map((project, index) => renderProjectItem(project, index)).join('');

    return `
        <div class="projects__container">
            ${projectsHTML}
        </div>
    `;
}