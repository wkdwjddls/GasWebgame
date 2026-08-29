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
const endTitleEl = document.getElementById("end-title");
const endMessageEl = document.getElementById("end-message");
const suspectIntroOverlay = document.getElementById("suspect-intro-overlay");
const suspectIntroList = document.getElementById("suspect-intro-list");
const accusationOverlay = document.getElementById("accusation-overlay");
const accusationList = document.getElementById("accusation-list");

const TIME_LIMIT = 180; // 3분
const COUNTDOWN_SECONDS = 3;
const LOW_TIME_THRESHOLD = 30;

const SUSPECTS = [
  {
    id: "cook",
    name: "용의자 A",
    role: "가스레인지로 요리를 하고 있었어요",
    icon: "🧑‍🍳",
    alibi: "튀김 요리 중이라 자리를 비운 적 없다고 주장합니다.",
    tip: "조리 중에는 절대 자리를 비우지 마세요. 불씨 곁은 항상 지켜봐야 해요.",
  },
  {
    id: "repair",
    name: "용의자 B",
    role: "설비 기사",
    icon: "🔧",
    alibi: "가스 냄새가 나서 전등을 켰어요",
    tip: "가스가 누출된 상황에서는 전기 스위치를 조작하면 안돼요",
  },
  {
    id: "student",
    name: "용의자 C",
    role: "자취생",
    icon: "🧑‍🎓",
    alibi: "사고직전 주방을 떠났다",
    tip: "가스를 사용할 때는 항상 창문을 열어 환기해주세요.",
  },
];

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
  culpritId: null,
  correctGuess: null,
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

function renderSuspectCard(suspect, clickable) {
  const el = document.createElement(clickable ? "button" : "div");
  if (clickable) el.type = "button";
  el.className = "suspect-card";
  el.innerHTML = `
    <span class="suspect-icon">${suspect.icon}</span>
    <span class="suspect-name">${suspect.name}</span>
    <span class="suspect-role">${suspect.role}</span>
    <span class="suspect-alibi">${suspect.alibi}</span>
  `;
  if (clickable) {
    el.addEventListener("click", () => resolveAccusation(suspect.id));
  }
  return el;
}

function showSuspectIntro() {
  state.culpritId = SUSPECTS[Math.floor(Math.random() * SUSPECTS.length)].id;
  state.correctGuess = null;

  suspectIntroList.innerHTML = "";
  SUSPECTS.forEach((suspect) => {
    suspectIntroList.appendChild(renderSuspectCard(suspect, false));
  });
  suspectIntroOverlay.classList.remove("hidden");
}

function enterAccusationPhase() {
  if (state.phase !== "playing") return;
  state.phase = "accusation";

  testControls.classList.add("hidden");
  timerBarWrap.classList.add("hidden");

  accusationList.innerHTML = "";
  SUSPECTS.forEach((suspect) => {
    accusationList.appendChild(renderSuspectCard(suspect, true));
  });
  accusationOverlay.classList.remove("hidden");
}

function resolveAccusation(suspectId) {
  if (state.phase !== "accusation") return;

  state.correctGuess = suspectId === state.culpritId;
  if (state.correctGuess) {
    state.score += 50;
  }

  accusationOverlay.classList.add("hidden");
  endGame();
}

function startGame() {
  state.started = true;
  state.phase = "countdown";
  state.countdown = COUNTDOWN_SECONDS;
  state.timeRemaining = TIME_LIMIT;
  state.score = 0;

  endScreen.classList.add("hidden");
  accusationOverlay.classList.add("hidden");
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

function animateScoreCountUp(target, duration = 1200) {
  const startTime = performance.now();

  function tick(now) {
    const progress = Math.min(1, (now - startTime) / duration);
    const eased = 1 - Math.pow(1 - progress, 3);
    finalScoreEl.textContent = Math.round(target * eased);
    if (progress < 1) {
      requestAnimationFrame(tick);
    }
  }
  requestAnimationFrame(tick);
}

function endGame() {
  if (state.phase === "ended") return;

  state.phase = "ended";
  state.started = false;

  countdownOverlay.classList.add("hidden");
  testControls.classList.add("hidden");
  timerBarWrap.classList.add("hidden");
  accusationOverlay.classList.add("hidden");

  const culprit = SUSPECTS.find((s) => s.id === state.culpritId);
  if (state.correctGuess === true) {
    endTitleEl.textContent = "사건 해결! 🎉";
    endMessageEl.textContent = `범인은 바로 ${culprit.name}(${culprit.role})였습니다! ${culprit.tip}`;
  } else if (state.correctGuess === false) {
    endTitleEl.textContent = "추리 실패...";
    endMessageEl.textContent = `아쉽지만 진범은 ${culprit.name}(${culprit.role})였습니다. ${culprit.tip}`;
  } else {
    endTitleEl.textContent = "안전 점검 완료!";
    endMessageEl.textContent = "가스 냄새가 나면 불씨를 멀리하고 즉시 밸브부터 잠그세요.";
  }

  finalScoreEl.textContent = 0;
  endScreen.classList.remove("hidden");
  animateScoreCountUp(state.score);
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
    enterAccusationPhase();
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
