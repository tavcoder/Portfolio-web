// Selecciona el botón y el enlace de la hoja de estilo
const toggleButton = document.getElementById('toggleTheme');
const stylesheet = document.getElementById('theme-stylesheet');

// Escucha el evento 'click' en el botón para cambiar entre ligth.css y dark.css
toggleButton.addEventListener('click', () => {
  if (stylesheet.getAttribute('href') === 'assets/css/light.css') {
    stylesheet.setAttribute('href', 'assets/css/dark.css');
  } else {
    stylesheet.setAttribute('href', 'assets/css/light.css');
  }
});
