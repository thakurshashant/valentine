const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const message = document.getElementById("message");
const music = document.getElementById("bgMusic");

const home = document.getElementById("home");
const yesScreen = document.getElementById("yesScreen");
const typeText = document.getElementById("typeText");
const confetti = document.getElementById("confetti");
const heartsContainer = document.getElementById("hearts");

console.log('script.js loaded');

/* ================= LANDING PAGE: CONTINUOUS HEART FLOW ================= */

function startLandingHearts() {
  const imgs = ["heart1.png", "heart2.png", "heart3.png"];

  // Create initial batch of hearts
  for (let i = 0; i < 15; i++) {
    setTimeout(() => {
      const heart = document.createElement("img");
      heart.src = `assets/${imgs[Math.floor(Math.random() * imgs.length)]}`;
      heart.className = "heart";
      heart.style.left = Math.random() * 100 + "vw";
      heart.style.setProperty("--size", 20 + Math.random() * 40 + "px");
      heart.style.setProperty("--speed", 6 + Math.random() * 6 + "s");
      heartsContainer.appendChild(heart);
      setTimeout(() => heart.remove(), 12000);
    }, i * 150);
  }

  // Continuously generate new hearts every 400ms
  setInterval(() => {
    const heart = document.createElement("img");
    heart.src = `assets/${imgs[Math.floor(Math.random() * imgs.length)]}`;
    heart.className = "heart";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.setProperty("--size", 20 + Math.random() * 40 + "px");
    heart.style.setProperty("--speed", 6 + Math.random() * 6 + "s");
    heartsContainer.appendChild(heart);
    setTimeout(() => heart.remove(), 12000);
  }, 400);
}

// Start hearts on landing page immediately
startLandingHearts();

/* ================= NO BUTTON ESCAPE ================= */

function moveNoButton() {
  const x = Math.random() * (window.innerWidth - noBtn.offsetWidth - 20);
  const y = Math.random() * (window.innerHeight - noBtn.offsetHeight - 20);

  noBtn.style.position = "absolute";
  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;
}

noBtn?.addEventListener("mouseenter", moveNoButton);

noBtn?.addEventListener("touchstart", (e) => {
  e.preventDefault();
  moveNoButton();
});

document.addEventListener("touchmove", (e) => {
  const t = e.touches[0];
  const r = noBtn.getBoundingClientRect();
  const buffer = 40;

  if (
    t.clientX > r.left - buffer &&
    t.clientX < r.right + buffer &&
    t.clientY > r.top - buffer &&
    t.clientY < r.bottom + buffer
  ) {
    moveNoButton();
  }
});

noBtn?.addEventListener("click", () => {
  if (message) message.textContent = "You wish 😏 Choose again";
});

/* ================= YES BUTTON (FIXED) ================= */

yesBtn?.addEventListener("click", () => {
  console.log('yes button clicked');
  // 🎵 PLAY MUSIC IMMEDIATELY (NO DELAY)
  try {
    music.currentTime = 0;
    music.play().catch(() => {});
  } catch (e) {
    console.warn('music play failed', e);
  }

  // ❌ REMOVE LANDING PAGE
  if (home && home.remove) home.remove();

  // ✅ SHOW YES SCREEN
  if (yesScreen) yesScreen.classList.remove("hidden");

  // 💥 CELEBRATION
  startHearts();        // hearts now flow
  massiveConfetti();   // big explosion
  startTyping();       // message typing
});

/* ================= CONTINUOUS HEART FLOW ================= */

let heartsStarted = false;

function startHearts() {
  if (heartsStarted) return;
  heartsStarted = true;

  const imgs = ["heart1.png", "heart2.png", "heart3.png"];

  setInterval(() => {
    const heart = document.createElement("img");
    heart.src = `assets/${imgs[Math.floor(Math.random() * imgs.length)]}`;
    heart.className = "heart";

    heart.style.left = Math.random() * 100 + "vw";
    heart.style.setProperty("--size", 20 + Math.random() * 40 + "px");
    heart.style.setProperty("--speed", 6 + Math.random() * 6 + "s");

    heartsContainer.appendChild(heart);
    setTimeout(() => heart.remove(), 12000);
  }, 250);
}

/* ================= HUGE CONFETTI ================= */

function massiveConfetti() {
  for (let wave = 0; wave < 3; wave++) {
    setTimeout(() => {
      for (let i = 0; i < 45; i++) {
        const h = document.createElement("img");
        h.src = "assets/heart1.png";
        h.className = "confetti-heart";
        h.style.left = Math.random() * 100 + "vw";
        h.style.top = Math.random() * 100 + "vh";
        confetti.appendChild(h);
        setTimeout(() => h.remove(), 2600);
      }
    }, wave * 300);
  }
}

/* ================= TYPEWRITER ================= */

const text =
  "I love you so much my baby 💕\n\n" +
  "These are my actions for your love 💖";

let idx = 0;

function startTyping() {
  typeText.textContent = "";
  idx = 0;

  const interval = setInterval(() => {
    typeText.textContent += text[idx++];
    if (idx >= text.length) clearInterval(interval);
  }, 55);
}
