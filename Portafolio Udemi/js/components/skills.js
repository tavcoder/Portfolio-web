/**
 * Renders the skills section HTML.
 * @returns {string} The HTML string for the skills section.
 */
export function renderSkills() {
    return `
        <div class="content__skills">

            <div class="skills__textContent animate-on-scroll animate-fade-right">
                <h2 class="skills__textContent__title">Este es mi kit</h2>
                <p class="skills__textContent__text animate-on-scroll animate-fade-in animate-delay-300"> Siempre me he
                    sentido en la encrucijada entre el diseño y la programación, lo que me ha permitido combinar lo mejor de
                    ambos mundos: mi base técnica y mi pasión por crear experiencias de usuario.

                    Me encanta aprender cosas nuevas, ya sea explorando nuevas tecnologías o perfeccionando las
                    prácticas en mi campo.</p>

                <h3 class="skills__textContent__subtitle">Herramientas de programación</h3>
                <div class="skills__textContent__container" >
                    <div class="skills__textContent__skills animate-on-scroll animate-fade-in animate-delay-800">
                        <div class="skills__textContent__iconCircle"><i class="fas fa-check"></i></div>
                        <p> Git+Github</p>
                    </div>
                    <div class="skills__textContent__skills animate-on-scroll animate-fade-in animate-delay-1000">
                        <div class="skills__textContent__iconCircle"><i class="fas fa-check"></i></div>
                        <p> PostMan</p>
                    </div>
                    <div class="skills__textContent__skills animate-on-scroll animate-fade-in animate-delay-1200">
                        <div class="skills__textContent__iconCircle"><i class="fas fa-check"></i></div>
                        <p> Wampp</p>
                    </div>
                    <div class="skills__textContent__skills animate-on-scroll animate-fade-in animate-delay-1400">
                        <div class="skills__textContent__iconCircle"><i class="fas fa-check"></i></div>
                        <p> MongoDB</p>
                    </div>
                </div>

                <h3 class="skills__textContent__subtitle">Herramientas de diseño</h3>
                <div class="skills__textContent__container">
                    <div class="skills__textContent__skills animate-on-scroll animate-fade-in animate-delay-800">
                        <div class="skills__textContent__iconCircle"><i class="fas fa-check"></i></div>
                        <p> Adobe XD</p>
                    </div>
                    <div class="skills__textContent__skills animate-on-scroll animate-fade-in animate-delay-1000">
                        <div class="skills__textContent__iconCircle"><i class="fas fa-check"></i></div>
                        <p> Wireframing</p>
                    </div>
                    <div class="skills__textContent__skills animate-on-scroll animate-fade-in animate-delay-1200">
                        <div class="skills__textContent__iconCircle"><i class="fas fa-check"></i></div>
                        <p> Prototyping</p>
                    </div>
                </div>


            </div>

            <div class="skills__container animate-on-scroll animate-fade-left">
                <h3 class="skills__container__title">Lenguajes y Frameworks</h3>
                <!-- Tecnologías Frontend -->
                <div id="frontend" class="skills__container__group" >
                    <div class="skills__container__tech animate-on-scroll animate-zoom-in animate-delay-200">
                        <i class="fab fa-html5"></i>
                        <p class="skills__container__tech__name">HTML</p>
                    </div>
                    <div class="skills__container__tech animate-on-scroll animate-zoom-in animate-delay-400">
                        <i class="fab fa-css3-alt"></i>
                        <p class="skills__container__tech__name">CSS</p>
                    </div>
                    <div class="skills__container__tech animate-on-scroll animate-zoom-in animate-delay-600">
                        <i class="fab fa-sass"></i>
                        <p class="skills__container__tech__name">SASS</p>
                    </div>
                    <div class="skills__container__tech animate-on-scroll animate-zoom-in animate-delay-800">
                        <i class="fab fa-bootstrap"></i>
                        <p class="skills__container__tech__name">Bootstrap</p>
                    </div>
                    <div class="skills__container__tech animate-on-scroll animate-zoom-in animate-delay-1000">
                        <i class="fas fa-laptop-code"></i>
                        <p class="skills__container__tech__name">JQuery UI</p>
                    </div>
                </div>

                <!-- Tecnologías Backend -->
                <div id="backend" class="skills__container__group hidden">
                    <div class="skills__container__tech">
                        <i class="fab fa-js"></i>
                        <p class="skills__container__tech__name">JavaScript</p>
                    </div>
                    <div class="skills__container__tech">
                        <i class="fab fa-php"></i>
                        <p class="skills__container__tech__name">PHP</p>
                    </div>
                    <div class="skills__container__tech">
                        <i class="fas fa-database"></i>
                        <p class="skills__container__tech__name">SQLite</p>
                    </div>
                    <div class="skills__container__tech">
                        <i class="fas fa-database"></i>
                        <p class="skills__container__tech__name">MySQL</p>
                    </div>
                    <div class="skills__container__tech">
                        <i class="fab fa-laravel"></i>
                        <p class="skills__container__tech__name">Laravel</p>
                    </div>
                </div>

                <!-- Switch para alternar entre frontend y backend -->
                <label class="skills__switch">
                    <input type="checkbox" class="switch__input" id="toggle-tech" onclick="toggleTechnologies()">
                    <span class="skills__slider">
                        <p class="skills__label" id="label-text">Frontend</p>
                    </span>
                </label>

            </div>
        </div>
    `;
}