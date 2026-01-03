const toggle = document.querySelector('.toggle-input');
const container = document.querySelector('.toggle-container');
const stylesheet = document.getElementById('theme-stylesheet');

// estado inicial
if (stylesheet.getAttribute('href') === 'assets/css/dark.css') {
  document.body.classList.add('dark');
  toggle.classList.add('is-active');
  container.classList.add('is-active');
}

toggle.addEventListener('click', () => {
  const isLight = stylesheet.getAttribute('href') === 'assets/css/light.css';

  stylesheet.setAttribute(
    'href',
    isLight ? 'assets/css/dark.css' : 'assets/css/light.css'
  );

  document.body.classList.toggle('dark', isLight);
  toggle.classList.toggle('is-active', isLight);
  container.classList.toggle('is-active', isLight);
});
