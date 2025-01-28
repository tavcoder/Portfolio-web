export function renderHero() {
    return `
        <section class="content__page" id="content__page">
            <h1 class="page__title" data-aos="fade-right">¡Hola! <span class="title__name"> Yo soy Tania -
                </span><span>Web Developer</span></h1>
            <p class="page__text" data-aos="fade-left">
                Paso mis días (y a veces mis noches) transformando ideas en experiencias interactivas.
                Mi meta es fusionar simplicidad y funcionalidad para ofrecer soluciones visualmente atractivas y
                fáciles de usar.

                Cuando no estoy frente a la pantalla, probablemente me encuentres leyendo (no tiene que ser
                precisamente un buen libro),
                o descubriendo nuevos rincones de Barcelona.</p>

            <div class="page__btn">
                <a href="mailto:tarteagadesign@gmail.com?subject=Consulta%20sobre%20tu%20portafolio" target="_blank"
                    data-aos="zoom-in" data-aos-duration="200">
                    <button class="btn__email">Hablemos</button> </a>
                <a href="assets/cv-tania-arteaga.pdf" target="_blank" data-aos="zoom-in" data-aos-duration="200"
                    data-aos-delay="300">
                    <button class="btn__cv">Ver mi CV</button>
                </a>


            </div>
        </section>
    `;
}