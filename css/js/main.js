/* ==========================================================
   LIVE CLOCK
========================================================== */
const clock = document.getElementById('liveClock');
setInterval(() => {
  clock.textContent = new Date().toLocaleTimeString();
}, 1000);


/* ==========================================================
   DATE & SHIFT
========================================================== */
const dateEl = document.getElementById('currentDate');
if (dateEl) {
  dateEl.textContent = new Date().toLocaleDateString();
}


/* ==========================================================
   HERO CONTEXT (TIME-AWARE)
========================================================== */
const heroContext = document.getElementById('heroContext');
if (heroContext) {
  const h = new Date().getHours();
  heroContext.textContent =
    h < 14 ? 'DAY SHIFT OPERATIONS' :
    h < 22 ? 'AFTERNOON SHIFT OPERATIONS' :
    'NIGHT SHIFT OPERATIONS';
}


/* ==========================================================
   TV MODE TOGGLE (PERSISTENT)
========================================================== */
const tvToggle = document.getElementById('tvToggle');
const savedTV = localStorage.getItem('tvMode') === 'true';

document.body.classList.toggle('tv-mode', savedTV);

tvToggle.addEventListener('click', () => {
  const enabled = document.body.classList.toggle('tv-mode');
  localStorage.set
