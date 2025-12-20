const dot = document.querySelector('.dot');
const wrapper = document.querySelector('.wrapper');
const stylesheet = document.getElementById('theme-stylesheet');

// estado inicial
if (stylesheet.getAttribute('href') === 'assets/css/dark.css') {
  document.body.classList.add('dark');
  dot.classList.add('is-active');
  wrapper.classList.add('is-active');
}

dot.addEventListener('click', () => {
  const isLight = stylesheet.getAttribute('href') === 'assets/css/light.css';

  stylesheet.setAttribute(
    'href',
    isLight ? 'assets/css/dark.css' : 'assets/css/light.css'
  );

  document.body.classList.toggle('dark', isLight);
  dot.classList.toggle('is-active', isLight);
  wrapper.classList.toggle('is-active', isLight);
});
