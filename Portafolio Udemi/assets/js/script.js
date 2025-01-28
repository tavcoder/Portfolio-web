
// Función para cargar archivos HTML y añadirlos a un elemento
function loadHTML(file, elementId) {
    fetch(file)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Could not load ${file}: ${response.statusText}`);
            }
            return response.text();
        })
        .then(data => {
            document.getElementById(elementId).innerHTML = data;
        })
        .catch(error => console.error('Error loading HTML:', error));
}

// Selecciona todos los enlaces con la clase "menu__link"
const menuLinks = document.querySelectorAll('.menu__link');

// Itera sobre los enlaces y añade un evento de clic a cada uno
menuLinks.forEach(link => {
    link.addEventListener('click', () => {
        // Obtén el archivo HTML a cargar
        const file = link.getAttribute('data-file');

        // Llama a la función loadHTML y carga el archivo en "content_page"
        if (file) {
            loadHTML(file, 'content__page');
        }
    });
});



// Función del switch de las tecnologías
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


// Seleccionar todos los botones del menú
const buttons = document.querySelectorAll('.menu__link');

buttons.forEach(button => {
    button.addEventListener('click', function () {
        // Remover la clase 'active' de todos los botones
        buttons.forEach(btn => btn.classList.remove('active'));
        // Agregar la clase 'active' al botón clicado
        this.classList.add('active');
    });
});

AOS.init({
    duration: 1200,  // Duración de la animación
    delay: 200,      // Retraso en milisegundos
});

