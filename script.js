// Add the final links here when they are ready.
const invitationLinks = {
  church: "https://www.google.com/maps/place/Parroquia+San+Jer%C3%B3nimo/@4.6725373,-74.1086949,1552m/data=!3m2!1e3!4b1!4m6!3m5!1s0x8e3f9b73feca08e7:0x3be5cf016d1e72b!8m2!3d4.672532!4d-74.10612!16s%2Fg%2F1td062wv?entry=tts&g_ep=EgoyMDI2MTAyOC4wIOC7DCoASAFQAw%3D%3D&skid=f8cc1d36-599b-4944-93ce-41c2c6ffa800",
  reception: "https://www.google.com/maps/place/Sal%C3%B3n+de+eventos+victoriano+by+SH+PRODUCCIONES/@4.6701615,-74.1063012,17z/data=!3m1!4b1!4m6!3m5!1s0x8e3f9b00096c4091:0x4cd75214e3ead34b!8m2!3d4.6701615!4d-74.1063012!16s%2Fg%2F11z49lcnx8?entry=tts&g_ep=EgoyMDI2MTAyOC4wIOC7DCoASAFQAw%3D%3D&skid=40c0dc1a-72ab-403c-bc85-853bbbd408ff",
  rsvp: "https://forms.cloud.microsoft/pages/responsepage.aspx?id=DQSIkWdsW0yxEjajBLZtrQAAAAAAAAAAAAZ__jDqlGVUQkVLMjNNSTVRS1FaU1U5SVVSQlNSV0FLNi4u&route=shorturl",
};

document.querySelectorAll("[data-link]").forEach((placeholder) => {
  const url = invitationLinks[placeholder.dataset.link];
  if (!url) return;

  const link = document.createElement("a");
  link.className = placeholder.className;
  link.href = url;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.setAttribute("aria-label", placeholder.getAttribute("aria-label").replace(", enlace próximamente", ""));
  link.innerHTML = placeholder.innerHTML.replace("<span>Próximamente</span>", "<span>↗</span>");
  placeholder.replaceWith(link);
});

const song = document.querySelector("#wedding-song");
const musicButton = document.querySelector("#music-toggle");
const musicLabel = document.querySelector("#music-label");
const musicStatus = document.querySelector("#music-status");
const startAt = 54;

function seekToStart() {
  if (song.currentTime < startAt || song.ended) song.currentTime = startAt;
}

function updateMusicButton(isPlaying) {
  musicButton.setAttribute("aria-pressed", String(isPlaying));
  musicLabel.textContent = isPlaying ? "Pausar canción" : "Escuchar nuestra canción";
  musicStatus.textContent = isPlaying
    ? "Por toda la vida · reproduciendo"
    : "Por toda la vida · desde 0:54";
}

function prepareSong() {
  seekToStart();
  song.play().then(() => updateMusicButton(true)).catch(() => {
    musicStatus.textContent = "Toca para escuchar desde 0:54";
  });
}

if (song.readyState >= HTMLMediaElement.HAVE_METADATA) {
  prepareSong();
} else {
  song.addEventListener("loadedmetadata", prepareSong, { once: true });
}

song.addEventListener("play", () => updateMusicButton(true));
song.addEventListener("pause", () => updateMusicButton(false));
song.addEventListener("ended", () => {
  musicStatus.textContent = "La canción terminó · toca para volver a escuchar";
  musicLabel.textContent = "Escuchar otra vez";
});

musicButton.addEventListener("click", async () => {
  if (!song.paused) {
    song.pause();
    return;
  }

  if (song.readyState >= HTMLMediaElement.HAVE_METADATA) seekToStart();
  try {
    await song.play();
  } catch {
    musicStatus.textContent = "No fue posible reproducir la canción en este navegador.";
  }
});

const countdownTarget = Date.UTC(2027, 1, 27, 20, 30, 0);
const countdownFields = {
  days: document.querySelector("#days"),
  hours: document.querySelector("#hours"),
  minutes: document.querySelector("#minutes"),
  seconds: document.querySelector("#seconds"),
};

function updateCountdown() {
  const remaining = Math.max(0, countdownTarget - Date.now());
  const secondsTotal = Math.floor(remaining / 1000);
  const values = {
    days: Math.floor(secondsTotal / 86400),
    hours: Math.floor((secondsTotal % 86400) / 3600),
    minutes: Math.floor((secondsTotal % 3600) / 60),
    seconds: secondsTotal % 60,
  };

  Object.entries(values).forEach(([unit, value]) => {
    countdownFields[unit].textContent = String(value).padStart(2, "0");
  });
}

updateCountdown();
window.setInterval(updateCountdown, 1000);
