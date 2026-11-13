# Proyecto final paso a paso | Alexbanexx

Construí un portafolio estático de cinco páginas para presentar los servicios informáticos de Alexbanexx en Jujuy. El ejercicio empieza en una carpeta nueva y aprovecha el material del módulo anterior. Cada etapa deja un cambio que podés revisar en Git y una prueba para saber si quedó bien.

## 1. Prepará una copia independiente

Instalá Git y Node.js 22 o posterior. Abrí PowerShell en la carpeta donde guardás tus proyectos. Si ya tenés la copia terminada, usá el historial para recorrer las etapas y pasá al paso 6 para publicarla.

```powershell
git clone --origin base https://github.com/ingalexbanexx/Mod9-SEO_Dominio_Servidores_Corregido.git alexbanexx-proyecto-final
Set-Location alexbanexx-proyecto-final
git switch main
git reset --keep 1ab59da8e8f39103bbb511f6be100d2fc58ca904
git remote remove base
git remote -v
git ls-files
npm.cmd ci
```

Ejecutá el `reset --keep` únicamente en esa copia recién creada. Fija la versión que usa esta guía. La salida de `git remote -v` queda vacía después de retirar el remoto. El historial de la copia conserva los archivos y commits originales. Las ramas y los commits nuevos se crean dentro de esta carpeta.

**Inventario inicial.** Encontrarás los cinco HTML, ocho imágenes en `images/`, los partials y `main.scss` en `scss/`, el CSS y su mapa en `styles/`, los dos archivos de npm y `readme.md`. Los cinco HTML se adaptan, las ocho imágenes se trasladan, los partials se conservan, el CSS y el mapa se regeneran, el manifiesto de npm recibe scripts nuevos y el README documenta esta entrega. Conservá el lockfile para que `npm ci` reproduzca la instalación.

## 2. Construí el HTML común y personalizá cada página

```powershell
git switch -c feature/html-seo
New-Item -ItemType Directory assets
Move-Item -LiteralPath images -Destination assets/images
```

1. En `index.html`, armá un `header` con la navbar de Bootstrap, un `main id="contenido"` con el contenido y un `footer` con la marca y el enlace de GitHub. Separá temas en `section` con encabezados y usá `article` para tarjetas que se entiendan por sí solas. Usá dos espacios por nivel y un `h1` por documento.
2. En los cinco HTML, enlazá Bootstrap CSS antes de `styles.css` y cargá `bootstrap.bundle.min.js` antes de cerrar el cuerpo. Usá `navbar-expand-xl`. El botón lleva `data-bs-toggle="collapse"`, `data-bs-target="#navbarAlexbanexx"` y `aria-controls="navbarAlexbanexx"`. El contenedor colapsable lleva `id="navbarAlexbanexx"`. Marcá con `aria-current="page"` únicamente el enlace de la página actual.
3. Copiá el encabezado y el pie a las páginas internas y ajustá sus rutas. Desde Inicio, el logo se lee en `assets/images/logo.png`, el CSS en `styles/styles.css` y Servicios en `pages/servicios.html`. Desde Servicios, el logo y el CSS se leen con `../assets/images/logo.png` y `../styles/styles.css`. Inicio es `../index.html` y Contacto es `contacto.html`.
4. Mantené `lang="es"`, UTF-8 y `meta viewport`. En cada `head`, escribí un `title`, una `meta description` y una `meta keywords` propios. Usá términos acordes a cada contenido y a su relación con Jujuy. Google ignora `meta keywords` para posicionamiento. La agregamos porque forma parte de la rúbrica. [Documentación de Google Search Central](https://developers.google.com/search/docs/crawling-indexing/special-tags)
5. Conservá las imágenes con sus `alt` descriptivos. Revisá también los logos del pie. Usá `figure` y `figcaption` cuando la imagen tenga un pie visible. Agregá al inicio del cuerpo un enlace a `#contenido` para saltar el menú con el teclado.

**Contenido de cada archivo**

- `index.html` presenta el estudio, los servicios principales y enlaces hacia Proyectos y Contacto. Usa `banner-inicio.jpg`.
- `pages/sobre-mi.html` explica el perfil de Marcelo Banega y sus principios de accesibilidad. Usa `perfil.jpg`.
- `pages/servicios.html` muestra desarrollo frontend, infraestructura y auditoría SEO en artículos independientes. Usa `servicios.jpg`.
- `pages/proyectos.html` muestra el carrusel, las tarjetas de proyectos y un modal de Bootstrap. Usa `proyectos.jpg` y reutiliza otras fotos de la galería.
- `pages/contacto.html` presenta los canales directos y un formulario con etiquetas vinculadas. Usa `contacto.jpg`.

La marca usa `logo.png`. Los fondos `header-circuit.jpg` y `footer-circuit.jpg` son decorativos y se cargan desde SCSS.

```powershell
git add -A -- index.html pages images assets
git commit -m "Adapta cinco páginas con navegación, metadatos y recursos locales"
git switch main
git merge --no-ff feature/html-seo -m "Integra HTML, navegación y SEO"
```

## 3. Ordená Sass y trabajá el responsive

```powershell
git switch -c feature/scss-responsive
```

1. Conservá `utilities/` para variables y mixins, `base/` para reglas globales, `components/` para piezas reutilizables y `layout/` para composición. Dejá en `main.scss` solo sentencias `@use`. Dale un alias al partial `base/animations` para que Sass lo distinga de `components/animations`.
2. Abrí `_variables.scss` para ver la paleta, las fuentes y los breakpoints. En `layout/_nav.scss`, el selector `.nav-link` contiene `&:hover` y `&.nav-link-active`, ejemplos de nesting. En `layout/_header.scss`, el mixin `flex-align(0.75rem)` recibe la separación de la marca. En `components/_animations.scss`, `.anim-btn` hereda `%boton-base` con `@extend` y usa `transicion(..., 0.25s)`.
3. Actualizá las dos rutas de fondos a `../assets/images/`. El navegador resuelve esas rutas desde `styles/styles.css` una vez compilado.
4. Conservá la grilla de una columna como punto de partida. En `layout/_hero.scss` y `layout/_projects.scss`, usá `respond-up('md')` para reorganizar secciones a partir de tablet y `respond-up('lg')` para ampliar la composición en escritorio. En `_responsive-cierre.scss`, compactá la marca a menos de 576 px y permití que los hijos de las grillas encojan con `min-inline-size: 0`. Dejá que el texto se ajuste a su contenedor.
5. En `package.json`, definí `build` como `sass scss/main.scss styles/styles.css --style=expanded` y `sass:watch` como `sass --watch scss/main.scss styles/styles.css`. Agregá `node_modules/` y `dist/` a `.gitignore`. Versioná el CSS compilado y su mapa.

```powershell
npm.cmd run build
npx.cmd --yes serve .
```

Abrí la dirección que indica el servidor. En DevTools, reducí el ancho a 320 px y comprobá que puedas leer la marca y abrir la navbar. Ensanchá a 768 y 1440 px y observá cómo se redistribuyen las tarjetas.

```powershell
git add .gitignore package.json scss styles
git commit -m "Compila Sass en styles y ajusta la experiencia responsiva"
git switch main
git merge --no-ff feature/scss-responsive -m "Integra Sass y diseño responsivo"
```

## 4. Agregá animaciones e interacciones

```powershell
git switch -c feature/interacciones-publicacion
```

1. Aplicá `anim-btn` a los botones principales. La transición nativa cambia el fondo, el texto y la posición al pasar el puntero o enfocar con teclado.
2. Cargá AOS 2.3.1 y agregá `data-aos="fade-up"` a las tarjetas. Desde `assets/js/site.js`, inicializá AOS una sola vez por página. Usá `prefers-reduced-motion` en JS y SCSS y asegurá contenido visible si la biblioteca falla o si se solicita reducir el movimiento. Conservá los títulos principales visibles desde la carga.
3. Revisá el carrusel y el modal de Proyectos. Dejá que la galería avance por decisión del visitante. Probá los controles y cerrá el modal con Escape.
4. En Contacto, vinculá cada etiqueta a su campo, agregá validación HTML y usá JavaScript para preparar un borrador de correo. Informá al visitante de esta acción antes del botón. El sitio sigue siendo estático.
5. Incorporá `scripts/publicar.mjs` para preparar `dist/` con los cinco HTML, `assets/` y el CSS. Agregá `build:site` con `npm run build && node scripts/publicar.mjs`. En `netlify.toml`, configurá el comando `npm run build:site` y el directorio de publicación `dist`. Dejá la URL pendiente en `readme.md` hasta que Netlify asigne una real.

```powershell
npm.cmd run build:site
git add index.html pages assets/js scripts netlify.toml package.json readme.md GUIA-PROYECTO-FINAL.md
git commit -m "Completa interacciones y prepara la publicación en Netlify"
git switch main
git merge --no-ff feature/interacciones-publicacion -m "Integra la versión del proyecto final"
git log --oneline --graph -12
```

## 5. Probá la entrega en local

Serví el contenido exacto que vas a subir con `npx.cmd --yes serve dist`. Abrí las cinco páginas a 320, 390, 768, 1024 y 1440 px.

- Abrí y cerrá el menú móvil en cada página y seguí los cinco enlaces. Revisá el indicador de página actual.
- Comprobá que logo, imágenes, fondos y CSS carguen. Revisá errores 404 en la pestaña Red de DevTools.
- Para detectar scroll horizontal, ejecutá `document.documentElement.scrollWidth === document.documentElement.clientWidth` en la consola. También revisá visualmente que los textos y botones tengan espacio suficiente.
- Navegá con Tab. Probá el salto al contenido, los controles del carrusel, el modal y el foco visible.
- Desplazate hasta una tarjeta con AOS, verificá la transición de un botón y repetí con movimiento reducido. En Contacto, probá la validación sin enviar mensajes.
- Compará títulos, descripciones y keywords, y comprobá los atributos `alt`. Podés revisar el HTML con el [validador Nu](https://validator.w3.org/nu/).

## 6. Publicá el nuevo proyecto

### GitHub público

Si seguís la guía desde una copia nueva, creá en GitHub un repositorio **público** vacío llamado `alexbanexx-proyecto-final`. Agregá su URL como `origin`. Si trabajás con la copia entregada o su clon, usá el repositorio público existente.

```powershell
git remote -v
git push -u origin main
```

Si falta `origin`, ejecutá primero `git remote add origin URL_DEL_REPOSITORIO_NUEVO` con la URL real del repositorio nuevo. Verificá que corresponda al nombre nuevo antes de subir. Abrí el repositorio en incógnito y revisá que se vean los archivos y al menos dos commits descriptivos.

### Netlify

1. Iniciá sesión en Netlify. Elegí **Add new project → Import an existing project**, seleccioná GitHub y autorizá el acceso al repositorio nuevo.
2. Elegí `main` como rama de producción. Usá el directorio base del repositorio, `npm run build:site` como comando y `dist` como directorio publicado. El archivo `netlify.toml` ya declara estos valores.
3. Lanzá el deploy. Cuando figure como publicado, abrí la URL pública `netlify.app` asignada. También podés ejecutar `npm.cmd run build:site` y cargar la carpeta `dist` en Netlify Drop con tu sesión iniciada. [Documentación oficial de despliegues de Netlify](https://docs.netlify.com/deploy/create-deploys/)
4. Repetí la prueba de navegación en incógnito con la URL pública. Abrí directamente `/pages/contacto.html` y `/pages/proyectos.html` para confirmar que funcionan al entrar por un enlace profundo. En la pestaña Red, revisá el CSS, los scripts y todas las imágenes, incluidas las de fondo.
5. Reemplazá la línea pendiente en `readme.md` por la URL pública real. Si Netlify está conectado a GitHub, el push puede disparar otro deploy. Verificá su estado y probá la misma URL.

```powershell
git add readme.md
git commit -m "Documenta la URL pública de Netlify"
git push origin main
```

## 7. Marcá el checklist y entregá

- [ ] Cinco HTML semánticos, con jerarquía e indentación legibles.
- [ ] Cinco títulos, cinco descripciones y cinco listas de keywords diferentes.
- [ ] Todas las imágenes tienen `alt`.
- [ ] Navbar de Bootstrap estilizada desde SCSS y funcional en los cinco HTML.
- [ ] Mobile, tablet y desktop sin scroll horizontal ni elementos comprimidos.
- [ ] Variables, nesting, mixins con parámetros, extend y partials en `scss/`. CSS en `styles/`.
- [ ] `scss/main.scss` contiene únicamente `@use`.
- [ ] Transición nativa y animación AOS verificadas.
- [ ] Sitio público en Netlify con imágenes y CSS cargados. URL publicada en el README.
- [ ] Repositorio GitHub público con al menos dos commits descriptivos.

Enviá el enlace público del **repositorio nuevo**. Desde su README se debe poder abrir el sitio publicado.
