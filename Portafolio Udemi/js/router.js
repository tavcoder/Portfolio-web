import { renderHero } from './components/hero.js';
import { renderSkills } from './components/skills.js';
import { renderStudies } from './components/studies.js';
import { renderProjects } from './components/projects.js';

const routes = {
    '': renderHero,
    'hero': renderHero,
    'skills': renderSkills,
    'projects': renderProjects,
    'studies': renderStudies
};

export async function navigateTo(route) {
    const renderFunction = routes[route];
    if (renderFunction) {
        const content = document.getElementById('content__page');
        content.innerHTML = await renderFunction();
        // Observe animations for new content
        observeAnimations();
        // Update active menu
        updateActiveMenu(route);
        // If skills, set up toggle
        if (route === 'skills') {
            setTimeout(() => {
                const toggleCheckbox = document.getElementById('toggle-tech');
                if (toggleCheckbox) {
                    toggleCheckbox.addEventListener('change', toggleTechnologies);
                }
            }, 0);
        }
    } else {
        await navigateTo('');
    }
    // Update URL hash
    window.location.hash = route;
}

function updateActiveMenu(route) {
    const buttons = document.querySelectorAll('.menu__link');
    buttons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-route') === route) {
            btn.classList.add('active');
        }
    });
    // Also set hero as default active if no route
    if (!route) {
        const heroLink = document.querySelector('.menu__link[data-route=""]') || buttons[0];
        heroLink.classList.add('active');
    }
}

function toggleTechnologies() {
    const frontend = document.getElementById('frontend');
    const backend = document.getElementById('backend');
    const labelText = document.getElementById('label-text');
    const checkbox = document.getElementById('toggle-tech');

    if (checkbox.checked) {
        frontend.classList.add('hidden');
        backend.classList.remove('hidden');
        labelText.textContent = 'Backend';
    } else {
        frontend.classList.remove('hidden');
        backend.classList.add('hidden');
        labelText.textContent = 'Frontend';
    }
}

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

function observeAnimations() {
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  animatedElements.forEach(el => observer.observe(el));
}