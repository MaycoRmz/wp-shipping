/* CLOCK */
const clock = document.getElementById("liveClock");
if (clock) {
  setInterval(() => {
    clock.textContent = new Date().toLocaleTimeString();
  }, 1000);
}

/* TV MODE */
const tv = document.getElementById("tvToggle");
if (tv) {
  const saved = localStorage.getItem("tv") === "true";
  document.body.classList.toggle("tv-mode", saved);

  tv.onclick = () => {
    const enabled = document.body.classList.toggle("tv-mode");
    localStorage.setItem("tv", enabled);
  };
}
