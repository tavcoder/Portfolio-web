/**
 * Dot element for toggling the theme.
 * @type {HTMLElement}
 */
const toggleDot = document.querySelector('.dot');

/**
 * Stylesheet link element for the theme.
 * @type {HTMLLinkElement}
 */
const stylesheet = document.getElementById('theme-stylesheet');

// Initialize body class based on current theme
if (stylesheet.getAttribute('href') === 'assets/css/dark.css') {
  document.body.classList.add('dark');
}

// Listen for click event on the dot to switch between light.css and dark.css
toggleDot.addEventListener('click', () => {
  if (stylesheet.getAttribute('href') === 'assets/css/light.css') {
    stylesheet.setAttribute('href', 'assets/css/dark.css');
    document.body.classList.add('dark');
  } else {
    stylesheet.setAttribute('href', 'assets/css/light.css');
    document.body.classList.remove('dark');
  }
});
