/* LIVE CLOCK */
const clock = document.getElementById("liveClock");
if (clock) {
  setInterval(() => {
    clock.textContent = new Date().toLocaleTimeString();
  }, 1000);
}

/* HERO CONTEXT */
const ctx = document.getElementById("heroContext");
if (ctx) {
  const h = new Date().getHours();
  ctx.textContent =
    h < 14 ? "DAY SHIFT OPERATIONS" :
    h < 22 ? "AFTERNOON SHIFT OPERATIONS" :
    "NIGHT SHIFT OPERATIONS";
}

/* TV MODE */
const toggle = document.getElementById("tvToggle");
if (toggle) {
  const enabled = localStorage.getItem("tv") === "true";
  document.body.classList.toggle("tv-mode", enabled);

  toggle.onclick = () => {
    const active = document.body.classList.toggle("tv-mode");
    localStorage.setItem("tv", active);
  };
}
