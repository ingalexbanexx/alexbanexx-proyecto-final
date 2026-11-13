# Alexbanexx | Proyecto final de desarrollo web

Portafolio de servicios informáticos y desarrollo web en Jujuy. Incluye Inicio, Sobre mí, Servicios, Proyectos y Contacto.

**Sitio en producción:** pendiente de despliegue en Netlify. Una vez publicado, reemplazá esta línea por el enlace público.

## Ejecutar en local

Requiere Node.js 22 o posterior y npm.

```powershell
npm.cmd ci
npm.cmd run build
npx.cmd --yes serve .
```

Abrí la dirección local que muestra el servidor. Para editar estilos con recompilación automática, ejecutá `npm.cmd run sass:watch` en otra terminal. Para generar el paquete de publicación, ejecutá `npm.cmd run build:site`. Netlify usa esa misma compilación y publica `dist/`.

El formulario de Contacto prepara un borrador en el cliente de correo del visitante. El visitante revisa el borrador y decide si lo envía.

## Código y procedencia

La implementación reutiliza las cinco páginas, las ocho imágenes y la arquitectura Sass del [repositorio base](https://github.com/ingalexbanexx/Mod9-SEO_Dominio_Servidores_Corregido/tree/1ab59da8e8f39103bbb511f6be100d2fc58ca904), de Marcelo Alejandro Banega. El historial se conserva en la copia independiente. El archivo `GUIA-PROYECTO-FINAL.md` documenta el proceso y la lista de entrega.

## Estructura

- `index.html` y `pages/` contienen las cinco páginas.
- `assets/` contiene las imágenes y el JavaScript compartido.
- `scss/` contiene los partials y el punto de entrada `main.scss`.
- `styles/` contiene el CSS compilado y su mapa para desarrollo.
- `scripts/publicar.mjs` prepara la salida pública con los archivos del sitio.
