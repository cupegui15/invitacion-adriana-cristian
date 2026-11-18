(() => {
  const sealButton = document.querySelector("#open-invitation");
  const status = document.querySelector("#opening-status");
  const invitationPath = "./invitacion.html";
  let hasNavigated = false;

  function openInvitation() {
    if (hasNavigated) return;
    hasNavigated = true;
    window.location.replace(invitationPath);
  }

  sealButton.addEventListener("click", () => {
    if (sealButton.disabled) return;

    sealButton.disabled = true;
    sealButton.classList.add("is-opening");
    sealButton.setAttribute("aria-label", "La luz recorre el sello dos veces; abriendo la invitación");
    status.textContent = "El sello se ilumina con dos vueltas de luz. Abriendo la invitación.";

    const sweep = sealButton.querySelector(".seal-light");
    sweep.addEventListener("animationend", (event) => {
      if (event.animationName === "clockwise-sweep") openInvitation();
    }, { once: true });

    // Fallback in case a browser does not dispatch animationend.
    window.setTimeout(openInvitation, 3500);
  });
})();
