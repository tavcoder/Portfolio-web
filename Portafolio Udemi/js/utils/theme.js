/**
 * Button element for toggling the theme.
 * @type {HTMLElement}
 */
const toggleButton = document.getElementById('toggleTheme');

/**
 * Stylesheet link element for the theme.
 * @type {HTMLLinkElement}
 */
const stylesheet = document.getElementById('theme-stylesheet');

// Listen for click event on the button to switch between light.css and dark.css
toggleButton.addEventListener('click', () => {
  if (stylesheet.getAttribute('href') === 'assets/css/light.css') {
    stylesheet.setAttribute('href', 'assets/css/dark.css');
  } else {
    stylesheet.setAttribute('href', 'assets/css/light.css');
  }
});
