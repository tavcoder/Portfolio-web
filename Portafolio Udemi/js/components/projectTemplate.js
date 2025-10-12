
export function renderProjectTemplate() {
    return `
        <section id="project-detail">
  <h1 id="project-title"></h1>
  <p id="project-description"></p>

  <div id="stack"></div>

  <h2>Funcionalidades</h2>
  <ul id="features"></ul>

  <h2>Screenshots</h2>
  <div id="gallery"></div>

  <div class="links">
    <a id="demo-link" target="_blank">Ver Demo</a>
    <a id="code-link" target="_blank">Ver Código</a>
  </div>
</section>

    `;
}