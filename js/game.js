const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");
const scoreEl = document.getElementById("score");

const timerBarWrap = document.getElementById("timer-bar-wrap");
const timerBarFill = document.getElementById("timer-bar-fill");
const timerText = document.getElementById("timer-text");
const testControls = document.getElementById("test-controls");
const countdownOverlay = document.getElementById("countdown-overlay");
const countdownNumber = document.getElementById("countdown-number");
const endScreen = document.getElementById("end-screen");
const finalScoreEl = document.getElementById("final-score");

const TIME_LIMIT = 180; // 3분
const COUNTDOWN_SECONDS = 3;
const LOW_TIME_THRESHOLD = 30;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

const state = {
  started: false,
  phase: "idle", // idle | countdown | playing | ended
  score: 0,
  countdown: COUNTDOWN_SECONDS,
  timeRemaining: TIME_LIMIT,
  player: {
    x: 100,
    y: 100,
    size: 32,
    speed: 240,
  },
};

function formatTime(seconds) {
  const total = Math.max(0, Math.ceil(seconds));
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function updateTimerDisplay() {
  const pct = Math.max(0, Math.min(1, state.timeRemaining / TIME_LIMIT)) * 100;
  timerBarFill.style.width = `${pct}%`;
  timerText.textContent = formatTime(state.timeRemaining);
  timerBarWrap.classList.toggle("warning", state.timeRemaining <= LOW_TIME_THRESHOLD);
}

function startGame() {
  state.started = true;
  state.phase = "countdown";
  state.countdown = COUNTDOWN_SECONDS;
  state.timeRemaining = TIME_LIMIT;
  state.score = 0;

  endScreen.classList.add("hidden");
  testControls.classList.remove("hidden");
  timerBarWrap.classList.remove("hidden");
  countdownOverlay.classList.remove("hidden");
  countdownNumber.textContent = COUNTDOWN_SECONDS;
  updateTimerDisplay();
}

function addScore(amount) {
  if (state.phase !== "playing") return;
  state.score += amount;
}

function endGame() {
  if (state.phase === "ended") return;

  state.phase = "ended";
  state.started = false;

  countdownOverlay.classList.add("hidden");
  testControls.classList.add("hidden");
  timerBarWrap.classList.add("hidden");
  finalScoreEl.textContent = state.score;
  endScreen.classList.remove("hidden");
}

function update(dt) {
  if (!state.started) return;

  if (state.phase === "countdown") {
    state.countdown -= dt;
    if (state.countdown <= 0) {
      state.phase = "playing";
      countdownOverlay.classList.add("hidden");
    } else {
      countdownNumber.textContent = Math.ceil(state.countdown);
    }
    return;
  }

  if (state.phase !== "playing") return;

  state.timeRemaining -= dt;
  if (state.timeRemaining <= 0) {
    state.timeRemaining = 0;
    updateTimerDisplay();
    endGame();
    return;
  }
  updateTimerDisplay();

  const p = state.player;
  p.x += Input.direction.x * p.speed * dt;
  p.y += Input.direction.y * p.speed * dt;

  p.x = Math.max(0, Math.min(canvas.width - p.size, p.x));
  p.y = Math.max(0, Math.min(canvas.height - p.size, p.y));
}

function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const p = state.player;
  ctx.fillStyle = "#4cc9f0";
  ctx.fillRect(p.x, p.y, p.size, p.size);

  scoreEl.textContent = `점수: ${state.score}`;
}
