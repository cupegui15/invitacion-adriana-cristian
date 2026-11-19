(() => {
  const sealButton = document.querySelector("#open-invitation");
  const status = document.querySelector("#opening-status");
  const cover = document.querySelector("#portada");
  const invitationPath = "./invitacion.html";
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let hasNavigated = false;

  function openInvitation() {
    if (hasNavigated) return;
    hasNavigated = true;
    window.location.replace(invitationPath);
  }

  sealButton.addEventListener("click", () => {
    if (sealButton.disabled) return;

    sealButton.disabled = true;
    cover.classList.add("is-opening");
    sealButton.classList.add("is-opening");
    sealButton.setAttribute("aria-label", "Abriendo la invitación");
    status.textContent = "Abriendo la invitación.";

    // Keep navigation reliable while the seal shines before opening.
    window.setTimeout(openInvitation, reducedMotion.matches ? 120 : 900);
  });
})();
