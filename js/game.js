const scoreEl = document.getElementById("score");
const roomStage = document.getElementById("room-stage");
const roomView = document.getElementById("room-view");
const roomBg = document.getElementById("room-bg");
const roomObjectsEl = document.getElementById("room-objects");
const roomNameEl = document.getElementById("room-name");
const roomIndicatorEl = document.getElementById("room-indicator");
const roomArrowLeft = document.getElementById("room-arrow-left");
const roomArrowRight = document.getElementById("room-arrow-right");
const messageBubble = document.getElementById("message-bubble");
const messageTextEl = document.getElementById("message-text");

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
const timeBonusRow = document.getElementById("time-bonus-row");
const timeBonusClockEl = document.getElementById("time-bonus-clock");
const suspectIntroOverlay = document.getElementById("suspect-intro-overlay");
const suspectIntroList = document.getElementById("suspect-intro-list");
const accusationOverlay = document.getElementById("accusation-overlay");
const accusationList = document.getElementById("accusation-list");
const quizOverlay = document.getElementById("quiz-overlay");
const quizQuestionEl = document.getElementById("quiz-question");
const quizChoiceLeft = document.getElementById("quiz-choice-left");
const quizChoiceRight = document.getElementById("quiz-choice-right");
const quizChoiceLeftText = document.getElementById("quiz-choice-left-text");
const quizChoiceRightText = document.getElementById("quiz-choice-right-text");
const quizFeedbackEl = document.getElementById("quiz-feedback");

const TIME_LIMIT = 180; // 3분
const COUNTDOWN_SECONDS = 3;
const LOW_TIME_THRESHOLD = 30;
const TIME_BONUS_PER_SECOND = 1; // 남은 시간 1초당 점수
const QUIZ_BONUS = 100;

const SUSPECTS = [
  {
    id: "cook",
    name: "용의자 A",
    role: "요리사",
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

const ROOMS = [
  {
    id: "kitchen",
    name: "주방",
    objects: [
      { id: "stove", name: "가스레인지", x: 35, y: 72, points: 100, message: "가스레인지 사용 후에는 반드시 밸브를 잠가주세요!" },
      { id: "hose", name: "가스 호스", x: 62, y: 78, points: 100, message: "낡거나 금이 간 가스 호스는 즉시 새 것으로 교체하세요." },
      { id: "window", name: "환기창", x: 82, y: 28, points: 100, message: "요리할 때는 창문을 열어 환기해주세요." },
    ],
  },
  {
    id: "living-room",
    name: "거실",
    objects: [
      { id: "detector", name: "가스 경보기", x: 22, y: 22, points: 100, message: "가스 경보기는 주기적으로 점검해야 해요." },
      { id: "outlet", name: "멀티탭", x: 72, y: 68, points: 100, message: "문어발식 콘센트 사용은 화재 위험이 있으니 피해주세요." },
      { id: "extinguisher", name: "소화기", x: 45, y: 82, points: 100, message: "소화기는 잘 보이는 곳에 두고 사용법을 미리 익혀두세요." },
    ],
  },
  {
    id: "boiler-room",
    name: "보일러실",
    objects: [
      { id: "valve", name: "가스 밸브", x: 40, y: 55, points: 100, message: "사용하지 않을 때는 가스 밸브를 꼭 잠가두세요." },
      { id: "vent", name: "환기구", x: 75, y: 35, points: 100, message: "환기구를 막지 않아야 가스가 안전하게 배출돼요." },
      { id: "pipe", name: "배관 연결부", x: 25, y: 72, points: 100, message: "배관 연결부에 비눗물을 발라 가스 누출 여부를 점검하세요." },
    ],
  },
];

const QUIZZES = [
  {
    question: "가스 냄새가 날 때 가장 먼저 해야 할 행동은?",
    options: [
      { text: "창문을 열어 환기한다", correct: true },
      { text: "전등 스위치를 켠다", correct: false },
    ],
    explanation: "가스가 누출되면 즉시 창문을 열어 환기하고 밸브를 잠가야 해요. 전기 스위치 조작은 불꽃을 일으켜 위험해요!",
  },
  {
    question: "가스레인지 사용 후 반드시 해야 할 일은?",
    options: [
      { text: "중간 밸브를 잠근다", correct: true },
      { text: "그대로 외출한다", correct: false },
    ],
    explanation: "사용 후 밸브를 잠그지 않으면 가스가 계속 새어 나올 수 있어요. 사용 후엔 꼭 밸브를 잠가주세요!",
  },
  {
    question: "가스가 새는지 확인할 때 좋은 방법은?",
    options: [
      { text: "비눗물을 발라 확인한다", correct: true },
      { text: "라이터 불로 확인한다", correct: false },
    ],
    explanation: "라이터 같은 불씨로 확인하면 폭발할 수 있어 매우 위험해요. 반드시 비눗물 거품으로 누출 여부를 확인하세요!",
  },
];

const state = {
  started: false,
  phase: "idle", // idle | countdown | playing | quiz | accusation | ended
  score: 0,
  countdown: COUNTDOWN_SECONDS,
  timeRemaining: TIME_LIMIT,
  culpritId: null,
  correctGuess: null,
  roomIndex: 0,
  interactedObjects: new Set(),
  currentQuiz: null,
};

let messageHideTimer = null;

function showMessage(text) {
  messageTextEl.textContent = text;
  messageBubble.classList.add("visible");
  clearTimeout(messageHideTimer);
  messageHideTimer = setTimeout(() => {
    messageBubble.classList.remove("visible");
  }, 3200);
}

function hideMessage() {
  clearTimeout(messageHideTimer);
  messageBubble.classList.remove("visible");
}

function interactObject(room, obj) {
  if (state.phase !== "playing") return;

  showMessage(obj.message);

  const key = `${room.id}:${obj.id}`;
  if (!state.interactedObjects.has(key)) {
    state.interactedObjects.add(key);
    addScore(obj.points);
    renderRoom();
  }
}

function renderRoom() {
  const room = ROOMS[state.roomIndex];

  roomBg.setAttribute("data-label", room.name);
  roomNameEl.textContent = room.name;
  roomIndicatorEl.textContent = `${state.roomIndex + 1} / ${ROOMS.length}`;
  roomArrowLeft.classList.toggle("disabled", state.roomIndex === 0);
  roomArrowRight.classList.toggle("disabled", state.roomIndex === ROOMS.length - 1);

  roomObjectsEl.innerHTML = "";
  room.objects.forEach((obj) => {
    const key = `${room.id}:${obj.id}`;
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "room-object";
    if (state.interactedObjects.has(key)) btn.classList.add("checked");
    btn.style.left = `${obj.x}%`;
    btn.style.top = `${obj.y}%`;
    btn.innerHTML = `<span class="room-object-placeholder">${obj.name}</span>`;
    btn.addEventListener("click", () => interactObject(room, obj));
    roomObjectsEl.appendChild(btn);
  });
}

function goToRoom(delta) {
  const next = state.roomIndex + delta;
  if (next < 0 || next >= ROOMS.length) return;

  hideMessage();
  roomView.classList.add("fade");
  setTimeout(() => {
    state.roomIndex = next;
    renderRoom();
    roomView.classList.remove("fade");
  }, 160);
}

roomArrowLeft.addEventListener("click", () => goToRoom(-1));
roomArrowRight.addEventListener("click", () => goToRoom(1));

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

function renderSuspectCard(suspect, clickable, index) {
  const el = document.createElement(clickable ? "button" : "div");
  if (clickable) el.type = "button";
  el.className = "suspect-card";
  el.style.animationDelay = `${index * 0.25}s`;
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
  SUSPECTS.forEach((suspect, index) => {
    suspectIntroList.appendChild(renderSuspectCard(suspect, false, index));
  });
  suspectIntroOverlay.classList.remove("hidden");
}

function enterQuizPhase() {
  if (state.phase !== "playing") return;
  state.phase = "quiz";

  testControls.classList.add("hidden");
  timerBarWrap.classList.add("hidden");
  roomStage.classList.add("hidden");
  hideMessage();

  const quiz = QUIZZES[Math.floor(Math.random() * QUIZZES.length)];
  state.currentQuiz = quiz;

  quizQuestionEl.textContent = quiz.question;
  quizChoiceLeftText.textContent = quiz.options[0].text;
  quizChoiceRightText.textContent = quiz.options[1].text;
  quizChoiceLeft.classList.remove("correct", "wrong", "disabled");
  quizChoiceRight.classList.remove("correct", "wrong", "disabled");
  quizFeedbackEl.classList.remove("visible");
  quizFeedbackEl.textContent = "";

  quizOverlay.classList.remove("hidden");
}

function resolveQuiz(choiceIndex) {
  if (state.phase !== "quiz" || !state.currentQuiz) return;

  const quiz = state.currentQuiz;
  const chosen = quiz.options[choiceIndex];
  const choiceButtons = [quizChoiceLeft, quizChoiceRight];

  choiceButtons.forEach((btn) => btn.classList.add("disabled"));
  quiz.options.forEach((opt, i) => {
    if (opt.correct) choiceButtons[i].classList.add("correct");
    else if (i === choiceIndex) choiceButtons[i].classList.add("wrong");
  });

  if (chosen.correct) {
    state.score += QUIZ_BONUS;
    scoreEl.textContent = `점수: ${state.score}`;
    quizFeedbackEl.textContent = `정답입니다! +${QUIZ_BONUS}점  ${quiz.explanation}`;
  } else {
    quizFeedbackEl.textContent = `아쉽지만 오답이에요.  ${quiz.explanation}`;
  }
  quizFeedbackEl.classList.add("visible");

  setTimeout(() => {
    quizOverlay.classList.add("hidden");
    enterAccusationPhase();
  }, 2200);
}

quizChoiceLeft.addEventListener("click", () => resolveQuiz(0));
quizChoiceRight.addEventListener("click", () => resolveQuiz(1));

function enterAccusationPhase() {
  if (state.phase !== "quiz") return;
  state.phase = "accusation";

  accusationList.innerHTML = "";
  SUSPECTS.forEach((suspect, index) => {
    accusationList.appendChild(renderSuspectCard(suspect, true, index));
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
  state.roomIndex = 0;
  state.interactedObjects = new Set();

  endScreen.classList.add("hidden");
  timeBonusRow.classList.add("hidden");
  accusationOverlay.classList.add("hidden");
  quizOverlay.classList.add("hidden");
  roomStage.classList.add("hidden");
  hideMessage();
  testControls.classList.remove("hidden");
  timerBarWrap.classList.remove("hidden");
  countdownOverlay.classList.remove("hidden");
  countdownNumber.textContent = COUNTDOWN_SECONDS;
  updateTimerDisplay();
  renderRoom();
  scoreEl.textContent = `점수: ${state.score}`;
}

function addScore(amount) {
  if (state.phase !== "playing") return;
  state.score += amount;
  scoreEl.textContent = `점수: ${state.score}`;
}

function animateScoreCountUp(target, duration = 1200, onComplete) {
  const startTime = performance.now();

  function tick(now) {
    const progress = Math.min(1, (now - startTime) / duration);
    const eased = 1 - Math.pow(1 - progress, 3);
    finalScoreEl.textContent = Math.round(target * eased);
    if (progress < 1) {
      requestAnimationFrame(tick);
    } else if (onComplete) {
      onComplete();
    }
  }
  requestAnimationFrame(tick);
}

function animateTimeBonus(timeRemainingStart, bonus, baseScore, duration = 1600) {
  const startTime = performance.now();

  function tick(now) {
    const progress = Math.min(1, (now - startTime) / duration);
    const remaining = timeRemainingStart * (1 - progress);
    timeBonusClockEl.textContent = formatTime(remaining);
    finalScoreEl.textContent = baseScore + Math.round(bonus * progress);
    if (progress < 1) {
      requestAnimationFrame(tick);
    } else {
      timeBonusClockEl.textContent = formatTime(0);
      finalScoreEl.textContent = baseScore + bonus;
    }
  }
  requestAnimationFrame(tick);
}

function endGame() {
  if (state.phase === "ended") return;

  state.phase = "ended";
  state.started = false;

  const baseScore = state.score;
  const timeRemainingSnapshot = state.timeRemaining;
  const timeBonus = Math.round(timeRemainingSnapshot) * TIME_BONUS_PER_SECOND;
  state.score = baseScore + timeBonus;

  countdownOverlay.classList.add("hidden");
  testControls.classList.add("hidden");
  timerBarWrap.classList.add("hidden");
  accusationOverlay.classList.add("hidden");
  quizOverlay.classList.add("hidden");
  roomStage.classList.add("hidden");
  hideMessage();

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

  if (timeBonus > 0) {
    timeBonusClockEl.textContent = formatTime(timeRemainingSnapshot);
    timeBonusRow.classList.remove("hidden");
    animateScoreCountUp(baseScore, 900, () => {
      animateTimeBonus(timeRemainingSnapshot, timeBonus, baseScore);
    });
  } else {
    timeBonusRow.classList.add("hidden");
    animateScoreCountUp(baseScore);
  }
}

function update(dt) {
  if (!state.started) return;

  if (state.phase === "countdown") {
    state.countdown -= dt;
    if (state.countdown <= 0) {
      state.phase = "playing";
      countdownOverlay.classList.add("hidden");
      roomStage.classList.remove("hidden");
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
    enterQuizPhase();
    return;
  }
  updateTimerDisplay();
}
