/**
 * Renders the hero section HTML.
 * @returns {string} The HTML string for the hero section.
 */
export function renderHero() {
    return `
        <section class="content__page" id="content__page">
            <h1 class="page__title animate-on-scroll animate-fade-right">¡Hola! <span class="page__title__name"> Yo soy Tania -
                </span><span>Web Developer</span></h1>
            <p class="page__text animate-on-scroll animate-fade-left">
                Paso mis días (y a veces mis noches) transformando ideas en experiencias interactivas.
                Mi meta es fusionar simplicidad y funcionalidad para ofrecer soluciones visualmente atractivas y
                fáciles de usar.

                Cuando no estoy frente a la pantalla, probablemente me encuentres leyendo (no tiene que ser
                precisamente un buen libro),
                o descubriendo nuevos rincones de Barcelona.</p>

            <div class="page__btn">
                <a href="mailto:tarteagadesign@gmail.com?subject=Consulta%20sobre%20tu%20portafolio" target="_blank"
                    class="animate-on-scroll animate-zoom-in">
                    <button class="btn secondaryBtn">Hablemos</button> </a>
                <a href="assets/cv-tania-arteaga.pdf" target="_blank" class="animate-on-scroll animate-zoom-in animate-delay-300">
                    <button class="btn primaryBtn">Ver mi CV</button>
                </a>


            </div>
        </section>
    `;
}