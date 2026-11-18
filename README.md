# Invitación de boda · Adriana & Cristian

Invitación web estática, en una sola columna centrada como la referencia y adaptable a computadores y celulares, preparada para publicarse gratis con GitHub Pages. No necesita instalar dependencias ni compilarse.

## Verla en tu computador

Abre `index.html` en un navegador. Para desarrollar con una vista local, puedes usar la extensión Live Server de Visual Studio Code.

## Publicarla con GitHub Pages

1. Crea un repositorio en GitHub y sube el contenido de esta carpeta.
2. En el repositorio, abre **Settings → Pages**.
3. En **Build and deployment**, elige **Deploy from a branch**, selecciona `main` y la carpeta `/ (root)`, y guarda.
4. GitHub publicará la invitación y mostrará su enlace público en esa misma sección. El repositorio debe ser público para que cualquier persona pueda acceder con el plan gratuito.

## Enlaces de la invitación

Las direcciones de Google Maps para la iglesia y la recepción, y el formulario de confirmación, están configurados en `script.js`. Para cambiarlos, edita `church`, `reception` o `rsvp` dentro de `invitationLinks`.

## Música

La canción está en `assets/audio/por-toda-la-vida.mp3`. La página intenta iniciar la reproducción desde el segundo 54 al abrirse. Los navegadores suelen bloquear la reproducción automática con sonido; en ese caso, el botón **Escuchar nuestra canción** permite iniciarla con un toque.

## Estructura

```text
.
├── index.html
├── styles.css
├── script.js
├── assets/
│   ├── audio/
│   └── images/
└── README.md
```
