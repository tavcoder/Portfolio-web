export function renderProjects() {
    return `
        <div class="projects__container">

            <div class="projects__item" data-aos="fade-left" data-aos-duration="1000">
                <div class="item__inner">
                    <div class="item__front">
                        <h4 class="item__title">Obi tienda online</h4>
                        <img src="assets/img/imgPlaceholder.jpg" alt="imagen proyecto">
                        <div class="projects__skill">
                            <div class="skill__item"><i class="fab fa-php"></i></div>
                            <div class="skill__item"><i class="fa fa-database"></i></div>
                            <div class="skill__item"><p>POO</p></div>
                            <div class="skill__item"><p>MVC</p></div>
                        </div>
                    </div>
                    <div class="item__back">
                        <p class="item__text">Aplicación web para gestionar y personalizar tu experiencia de compra en una
                            tienda online. Explora los productos más populares, tus artículos favoritos, el historial de tus
                            compras recientes y detalles específicos de cada producto. Crea y guarda nuevas listas de deseos
                            recomendadas basadas en tus intereses y compras anteriores.</p>
                    </div>
                </div>
            </div>

            <div class="projects__item">
                <div class="item__inner">
                    <div class="item__front">
                        <h4 class="item__title">Cuidarnos, red social</h4>
                        <img src="assets/img/imgPlaceholder.jpg" alt="imagen proyecto" class="item__img">
                        <div class="projects__skill">
                            <div class="skill__item"><i class="fab fa-laravel"></i></div>
                            <div class="skill__item"><i class="fa fa-database"></i></div>
                            <div class="skill__item">
                                <p>POO</p>
                            </div>
                            <div class="skill__item">
                                <p>MVC</p>
                            </div>
                        </div>
                    </div>
                    <div class="item__back">
                        <p class="item__text">Aplicación web para conectarse y apoyarse entre cuidadores de personas
                            dependientes. Comparte experiencias, consejos y recursos útiles para el cuidado diario. Visualiza
                            las historias y consejos más populares, las publicaciones más interactivas y las interacciones
                            recientes entre los miembros. Crea y guarda grupos de apoyo personalizados basados en tus intereses
                            y necesidades, y accede a recursos especializados adaptados para el cuidado de personas
                            dependientes. Conéctate con otros cuidadores, comparte información valiosa y encuentra apoyo
                            emocional en una red dedicada a mejorar la calidad de vida de quienes cuidan.</p>
                    </div>
                </div>
            </div>
            <div class="projects__item" data-aos="fade-right" data-aos-duration="1000">
                <div class="item__inner">
                    <div class="item__front">
                        <h4 class="item__title">Calendario de trabajo automático</h4>
                        <img src="assets/img/imgPlaceholder.jpg" alt="imagen proyecto">
                        <div class="projects__skill">
                            <div class="skill__item"><i class="fab fa-bootstrap"></i></div>
                            <div class="skill__item"><i class="fab fa-php"></i></div>
                            <div class="skill__item"> <i class="fab fa-css3-alt"></i></div>
                            <div class="skill__item"><i class="fab fa-html5"></i></div>
                        </div>
                    </div>
                    <div class="item__back">
                        <p class="item__text">Visualiza tu calendario de turnos, asignaciones de trabajo y horarios más
                            recientes. Consulta los detalles de cada turno, como la duración, el empleado asignado y cualquier
                            nota adicional. Crea y guarda nuevos turnos automáticamente basados en tus configuraciones previas,
                            optimizando las asignaciones de acuerdo a la disponibilidad de los empleados. Adapta y personaliza
                            tu calendario según las necesidades de tu equipo, y más.</p>
                    </div>
                </div>
            </div>
        </div>
    `;
}