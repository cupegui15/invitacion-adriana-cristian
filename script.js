const invitationLinks = {
  church: "https://www.google.com/maps/place/Parroquia+San+Jer%C3%B3nimo/@4.6725373,-74.1086949,1552m/data=!3m2!1e3!4b1!4m6!3m5!1s0x8e3f9b73feca08e7:0x3be5cf016d1e72b!8m2!3d4.672532!4d-74.10612!16s%2Fg%2F1td062wv?entry=tts&g_ep=EgoyMDI2MTAyOC4wIOC7DCoASAFQAw%3D%3D&skid=f8cc1d36-599b-4944-93ce-41c2c6ffa800",
  reception: "https://www.google.com/maps/place/Sal%C3%B3n+de+eventos+victoriano+by+SH+PRODUCCIONES/@4.6701615,-74.1063012,17z/data=!3m1!4b1!4m6!3m5!1s0x8e3f9b00096c4091:0x4cd75214e3ead34b!8m2!3d4.6701615!4d-74.1063012!16s%2Fg%2F11z49lcnx8?entry=tts&g_ep=EgoyMDI2MTAyOC4wIOC7DCoASAFQAw%3D%3D&skid=40c0dc1a-72ab-403c-bc85-853bbbd408ff",
  rsvp: "https://forms.cloud.microsoft/pages/responsepage.aspx?id=DQSIkWdsW0yxEjajBLZtrQAAAAAAAAAAAAZ__jDqlGVUQkVLMjNNSTVRS1FaU1U5SVVSQlNSV0FLNi4u&route=shorturl",
};

document.querySelectorAll("[data-link]").forEach((placeholder) => {
  const url = invitationLinks[placeholder.dataset.link];
  if (!url) return;

  placeholder.href = url;
  placeholder.target = "_blank";
  placeholder.rel = "noopener noreferrer";
  placeholder.setAttribute("aria-label", `${placeholder.textContent.trim()} (abre en una pestaña nueva)`);
});

const song = document.querySelector("#wedding-song");
const musicButton = document.querySelector("#music-toggle");
const musicIcon = document.querySelector("#music-icon");
const musicStatus = document.querySelector("#music-status");
const progress = document.querySelector("#song-progress");
const elapsedLabel = document.querySelector("#song-elapsed");
const durationLabel = document.querySelector("#song-duration");
const startAt = 54.0;

function formatTime(seconds) {
  if (!Number.isFinite(seconds)) return "0:00";
  const minutes = Math.floor(seconds / 60);
  const remainder = Math.floor(seconds % 60).toString().padStart(2, "0");
  return `${minutes}:${remainder}`;
}

function seekToStart() {
  if (song.ended || Math.abs(song.currentTime - startAt) > 0.05) {
    return new Promise((resolve) => {
      song.addEventListener("seeked", resolve, { once: true });
      song.currentTime = startAt;
    });
  }
  return Promise.resolve();
}

function updatePlayer() {
  const isPlaying = !song.paused && !song.ended;
  musicButton.setAttribute("aria-pressed", String(isPlaying));
  musicButton.setAttribute("aria-label", isPlaying ? "Pausar canción" : "Reproducir canción");
  musicIcon.textContent = isPlaying ? "Ⅱ" : "▶";
  if (Number.isFinite(song.duration) && song.duration > 0) {
    progress.style.width = `${(song.currentTime / song.duration) * 100}%`;
    elapsedLabel.textContent = formatTime(song.currentTime);
    durationLabel.textContent = formatTime(song.duration);
  }
}

async function prepareSong() {
  musicStatus.textContent = "Preparando canción desde 0:54";
  try {
    await seekToStart();
    updatePlayer();
    await song.play();
    musicStatus.textContent = "Escuchando nuestra canción";
  } catch {
    musicStatus.textContent = "Toca para escuchar desde 0:54";
  }
  updatePlayer();
}

if (song.readyState >= HTMLMediaElement.HAVE_METADATA) {
  prepareSong();
} else {
  song.addEventListener("loadedmetadata", prepareSong, { once: true });
}

song.addEventListener("play", () => {
  musicStatus.textContent = "Escuchando nuestra canción";
  updatePlayer();
});
song.addEventListener("pause", updatePlayer);
song.addEventListener("timeupdate", updatePlayer);
song.addEventListener("durationchange", updatePlayer);
song.addEventListener("ended", () => {
  musicStatus.textContent = "La canción terminó · toca para volver a escuchar";
  updatePlayer();
});

musicButton.addEventListener("click", () => {
  if (!song.paused) {
    song.pause();
    return;
  }

  if (song.readyState < HTMLMediaElement.HAVE_METADATA) {
    musicStatus.textContent = "Cargando canción… toca de nuevo en un momento";
    return;
  }

  if (song.ended || song.currentTime < startAt) song.currentTime = startAt;
  song.play().catch(() => {
    musicStatus.textContent = "No fue posible reproducir la canción en este navegador.";
  });
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
