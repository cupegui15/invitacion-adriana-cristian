# Invitación de boda · Adriana & Cristian

Invitación web estática, adaptable a computadores y celulares, preparada para publicarse gratis con GitHub Pages. No necesita instalar dependencias ni compilarse. La portada del sitio replica el sobre del PDF: al tocar el sello, una luz completa un giro horario y abre la invitación.

## Verla en tu computador

Abre `index.html` en un navegador. Al tocar el sello, se abre `invitacion.html`, que contiene la invitación principal. Para desarrollar con una vista local, puedes usar la extensión Live Server de Visual Studio Code.

## Publicarla con GitHub Pages

1. Crea un repositorio en GitHub y sube el contenido de esta carpeta.
2. En el repositorio, abre **Settings → Pages**.
3. En **Build and deployment**, elige **Deploy from a branch**, selecciona `main` y la carpeta `/ (root)`, y guarda.
4. GitHub publicará la invitación y mostrará su enlace público en esa misma sección. El repositorio debe ser público para que cualquier persona pueda acceder con el plan gratuito.

## Enlaces de la invitación

Las direcciones de Google Maps para la iglesia y la recepción, y el formulario de confirmación, están configurados en `script.js`. Para cambiarlos, edita `church`, `reception` o `rsvp` dentro de `invitationLinks`.

## Música

La canción está en `assets/audio/por-toda-la-vida.mp3`. El reproductor busca el segundo 54 antes de reproducir. La página intenta iniciar la canción al abrirse, aunque los navegadores pueden bloquear la reproducción automática con sonido; en ese caso, se inicia con el botón central del reproductor. La barra permite cambiar de posición y los controles saltan diez segundos o repiten la canción.

## Animación y colores

Los pétalos verde claro se generan en `script.js` y respetan la preferencia del navegador para reducir movimiento. Los tres tonos reservados (blanco, esmeralda y dorado) se muestran en la sección de vestuario.

## Portada web

La portada de entrada usa `assets/images/portada-sobre.jpg`, una reproducción visual del sobre del PDF. El sello interactivo está hecho con HTML, CSS y JavaScript en `index.html`, `portada.css` y `portada.js`. El destino del sello es `invitacion.html`.

## Estructura

```text
.
├── index.html
├── invitacion.html
├── portada.css
├── portada.js
├── styles.css
├── script.js
├── assets/
│   ├── audio/
│   └── images/
│       └── portada-sobre.jpg
└── README.md
```
