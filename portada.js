(() => {
  const sealButton = document.querySelector("#open-invitation");
  const status = document.querySelector("#opening-status");
  const cover = document.querySelector("#portada");
  const photoCard = cover.querySelector(".cover-photo-card");
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

    photoCard.addEventListener("animationend", (event) => {
      if (event.animationName === "card-lift") openInvitation();
    }, { once: true });

    // Keep navigation reliable while the seal shines before opening.
    window.setTimeout(openInvitation, reducedMotion.matches ? 120 : 900);
  });
})();
