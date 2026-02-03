# ✅ CHECKLIST DE IMPLEMENTACIÓN

## 🎨 VISUAL DESIGN

### Contraste de Colores
- [x] Todos los textos tienen contraste ≥7:1 (AAA)
- [x] Botones principales: 7.2:1 ✅
- [x] Texto secundario: 7.51:1 ✅
- [x] Texto primario: 15.3:1 ✅
- [x] Probado en modo claro y oscuro
- [ ] Verificar con herramienta (WebAIM Contrast Checker)

### Tipografía
- [x] Fuente legible (Inter/System fonts)
- [x] Tamaño base: 18px (óptimo lectura)
- [x] Line height: 1.5 (WCAG recomendado)
- [x] Max-width en párrafos: 65ch
- [x] Jerarquía clara (h1 → h4)
- [ ] Prueba de legibilidad a 1 metro de distancia

### Espaciado
- [x] Sistema de tokens consistente (8px base)
- [x] Espaciado generoso entre secciones
- [x] Márgenes consistentes
- [x] Padding suficiente en elementos interactivos
- [x] Touch targets: 44px+ móvil, 44px+ desktop

### Paleta de Colores
- [x] Paleta reducida (violeta + teal + grises)
- [x] Gradientes sutiles (no abrumadores)
- [x] Colores cohesivos
- [x] Sin colores conflictivos
- [x] Identidad visual clara

## ♿ ACCESIBILIDAD

### Estructura Semántica
- [ ] `<header>` para cabecera del sitio
- [ ] `<nav>` para menú de navegación
- [ ] `<main>` para contenido principal
- [ ] `<aside>` para sidebar
- [ ] `<article>` para tarjetas de proyecto
- [ ] `<footer>` para pie de página
- [ ] Headings en orden (h1 → h2 → h3, SIN saltos)
- [ ] Solo un `<h1>` por página

### ARIA y Labels
- [ ] `<html lang="es">` o lang="en"
- [ ] Todos los inputs tienen `<label>` asociado
- [ ] Toggles tienen labels visibles
- [ ] `aria-label` en iconos sin texto
- [ ] `aria-current="page"` en link activo
- [ ] `aria-hidden="true"` en decorativos
- [ ] `role="navigation"` en nav (opcional si usas `<nav>`)

### Navegación por Teclado
- [x] `:focus-visible` en TODOS los elementos interactivos
- [x] Focus ultra visible (outline 3px+)
- [ ] Skip link implementado (`<a href="#main">Skip to main</a>`)
- [ ] Tab order lógico (sin position: absolute raro)
- [ ] Escape cierra modals/dropdowns
- [ ] Enter/Space activan botones
- [ ] Flechas navegan en carruseles

### Screen Readers
- [ ] Probado con NVDA (Windows) o VoiceOver (Mac)
- [ ] Landmarks ARIA claros
- [ ] Alt text en TODAS las imágenes
- [ ] Texto descriptivo en links (no "click aquí")
- [ ] Estados anunciados (loading, error, success)

### Estados Visuales
- [x] `:hover` - cambio de color/transform
- [x] `:focus-visible` - outline claro
- [x] `:active` - feedback visual
- [ ] `:disabled` - opacidad + cursor no permitido
- [ ] Estados de loading (spinner/skeleton)
- [ ] Estados de error (border rojo + mensaje)

## 📱 RESPONSIVE

### Breakpoints
- [ ] Mobile: 320px - 768px
- [ ] Tablet: 768px - 1024px
- [ ] Desktop: 1024px+
- [ ] Grid layout adapta (1 col móvil, 2 col desktop)
- [ ] Sidebar sticky en desktop, static en móvil

### Touch Targets
- [x] Botones: 48px+ altura en móvil
- [x] Links del menú: 48px+ altura
- [x] Toggles: 32px+ (fácil de tocar)
- [x] Espacio entre elementos clickeables: 8px+

### Imágenes
- [ ] Responsive con `max-width: 100%`
- [ ] `object-fit: cover` en avatares
- [ ] Lazy loading: `loading="lazy"`
- [ ] WebP con fallback a JPG

## 🚀 PERFORMANCE

### CSS
- [x] Tokens en variables CSS
- [x] Sin CSS duplicado
- [x] Sin `!important` innecesarios
- [ ] Critical CSS inline (opcional)
- [ ] CSS minificado en producción

### Animaciones
- [x] `@media (prefers-reduced-motion: reduce)` implementado
- [x] Transiciones < 400ms
- [x] Solo animar `transform` y `opacity` (performante)
- [ ] Sin animaciones automáticas (solo hover/focus)

## 🧪 TESTING

### Browsers
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

### Devices
- [ ] iPhone (Safari iOS)
- [ ] Android (Chrome)
- [ ] iPad
- [ ] Desktop 1920x1080
- [ ] Desktop 1366x768

### Herramientas
- [ ] Lighthouse (Score 90+ accesibilidad)
- [ ] axe DevTools (0 errores)
- [ ] WAVE (0 errores)
- [ ] WebAIM Contrast Checker
- [ ] Screen reader (NVDA/VoiceOver)

## 📝 HTML NECESARIO

### Skip Link
```html
<a href="#main-content" class="skip-link">
  Skip to main content
</a>
```

### Main con ID
```html
<main id="main-content">
  <!-- Contenido -->
</main>
```

### Nav con ARIA
```html
<nav aria-label="Main navigation">
  <a href="#home" aria-current="page" class="menu__option active">
    Home
  </a>
  <a href="#about" class="menu__option">About</a>
</nav>
```

### Toggle con Label
```html
<div class="toggle-container">
  <label for="theme-toggle" class="sr-only">
    Toggle dark mode
  </label>
  <input 
    type="checkbox" 
    id="theme-toggle" 
    class="toggle-input"
    aria-label="Toggle dark mode"
  />
  <span class="toggle-label"></span>
</div>
```

### Imágenes con Alt
```html
<img 
  src="avatar.jpg" 
  alt="Portrait of [Your Name]" 
  class="user-info__image"
  loading="lazy"
/>
```

## 🎯 QUICK WINS INMEDIATOS

1. **CONTRASTE** (5 min)
   ```css
   --color-text-button: #2c4a63; /* Era #7e97b8 */
   ```

2. **FOCUS VISIBLE** (2 min)
   ```css
   *:focus-visible {
     outline: 3px solid var(--color-primary);
     outline-offset: 3px;
   }
   ```

3. **GRID LAYOUT** (1 min)
   ```css
   .layout {
     grid-template-columns: 280px 1fr; /* Era 15% 90% */
   }
   ```

4. **TOGGLE POSICIÓN** (5 min)
   - Quitar position: absolute con top/left raros
   - Mover a `.aside__buttons` con flexbox

5. **FONT SIZE** (1 min)
   ```css
   body {
     font-size: 1.125rem; /* Era 1.5rem = demasiado */
   }
   ```

## 📊 MÉTRICAS OBJETIVO

- **Lighthouse Accessibility**: 95+
- **WCAG Level**: AAA (7:1 contraste)
- **Keyboard Navigation**: 100%
- **Screen Reader**: Totalmente navegable
- **Performance**: 90+
- **Mobile Usability**: Sin errores

## 🔗 RECURSOS

- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [WAVE Tool](https://wave.webaim.org/)
- [axe DevTools](https://www.deque.com/axe/devtools/)
- [WCAG 2.1 Checklist](https://www.a11yproject.com/checklist/)
- [MDN Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)

---

## ✅ VERIFICACIÓN FINAL

Antes de considerar el proyecto "terminado":

1. [ ] Todos los elementos de esta checklist completados
2. [ ] Lighthouse > 90 en accesibilidad
3. [ ] 0 errores en axe DevTools
4. [ ] Navegable completamente por teclado
5. [ ] Probado con screen reader
6. [ ] Funciona en mobile (touch targets correctos)
7. [ ] Contraste verificado en todos los textos
8. [ ] HTML semántico validado
9. [ ] Sin console errors

**FECHA DE REVISIÓN**: _______________
**SCORE FINAL**: ___/100
