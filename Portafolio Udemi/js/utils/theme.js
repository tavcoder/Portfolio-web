const toggle = document.querySelector('.toggle-input');
const container = document.querySelector('.toggle-container');

// estado inicial (opcional)
if (document.documentElement.dataset.theme === 'dark') {
  toggle.classList.add('is-active');
  container.classList.add('is-active');
}

toggle.addEventListener('click', () => {
  const isDark = document.documentElement.dataset.theme === 'dark';

  document.documentElement.dataset.theme = isDark ? 'light' : 'dark';

  toggle.classList.toggle('is-active', !isDark);
  container.classList.toggle('is-active', !isDark);
});
