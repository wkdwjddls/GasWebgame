const scoreEl = document.getElementById("score");
const roomStage = document.getElementById("room-stage");
const roomView = document.getElementById("room-view");
const roomBg = document.getElementById("room-bg");
const roomObjectsEl = document.getElementById("room-objects");
const roomNameEl = document.getElementById("room-name");
const roomArrowLeft = document.getElementById("room-arrow-left");
const roomArrowRight = document.getElementById("room-arrow-right");
const messageBubble = document.getElementById("message-bubble");
const messageTextEl = document.getElementById("message-text");
const notebookBtn = document.getElementById("notebook-btn");
const notebookBadge = document.getElementById("notebook-badge");
const notebookOverlay = document.getElementById("notebook-overlay");
const notebookCloseBtn = document.getElementById("notebook-close-btn");
const notebookEntriesEl = document.getElementById("notebook-entries");
const windowEventOverlay = document.getElementById("window-event-overlay");
const windowEventClose = document.getElementById("window-event-close");
const windowTapTarget = document.getElementById("window-tap-target");
const windowTapCountEl = document.getElementById("window-tap-count");
const windowProgressFill = document.getElementById("window-progress-fill");
const windowPaneEl = document.getElementById("window-pane");
const windowOpenClipRectEl = document.getElementById("window-open-clip-rect");
const valveEventOverlay = document.getElementById("valve-event-overlay");
const valveEventClose = document.getElementById("valve-event-close");
const valveGridEl = document.getElementById("valve-grid");
const valveProgressText = document.getElementById("valve-progress-text");
const spotdiffEventOverlay = document.getElementById("spotdiff-event-overlay");
const spotdiffEventClose = document.getElementById("spotdiff-event-close");
const spotdiffRoomLngEl = document.getElementById("spotdiff-room-lng");
const spotdiffRoomLpgEl = document.getElementById("spotdiff-room-lpg");
const spotdiffFeedbackEl = document.getElementById("spotdiff-feedback");
const spotdiffProgressText = document.getElementById("spotdiff-progress-text");
const alarmEventOverlay = document.getElementById("alarm-event-overlay");
const alarmEventClose = document.getElementById("alarm-event-close");
const alarmPlayfieldEl = document.getElementById("alarm-playfield");
const alarmProgressText = document.getElementById("alarm-progress-text");
const extinguisherEventOverlay = document.getElementById("extinguisher-event-overlay");
const extinguisherEventClose = document.getElementById("extinguisher-event-close");
const extinguisherInstructionEl = document.getElementById("extinguisher-instruction");
const extinguisherSvgEl = document.getElementById("extinguisher-svg");
const extinguisherPinEl = document.getElementById("extinguisher-pin");
const extinguisherFireEl = document.getElementById("extinguisher-fire");
const extinguisherPressHitEl = document.getElementById("extinguisher-press-hit");
const extinguisherBodyGroupEl = document.getElementById("extinguisher-body-group");
const extinguisherPressHintEl = document.getElementById("extinguisher-press-hint");
const extinguisherHoldTrack = document.getElementById("extinguisher-hold-track");
const extinguisherHoldFill = document.getElementById("extinguisher-hold-fill");

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
const quizFeedbackTextEl = document.getElementById("quiz-feedback-text");

const TIME_LIMIT = 180; // 3분
const COUNTDOWN_SECONDS = 3;
const LOW_TIME_THRESHOLD = 30;
const TIME_BONUS_PER_SECOND = 1; // 남은 시간 1초당 점수
const QUIZ_BONUS = 100;
const WINDOW_TAP_TARGET = 10; // 창문을 여는 데 필요한 터치 횟수
const VALVE_GRID_SIZE = 9; // 3x3
const VALVE_OPEN_COUNT = 3; // 열려있는 밸브 개수
const ALARM_ROUNDS = 5; // 울리는 경보기를 찾아야 하는 횟수
const ALARM_COUNTS = [1, 1, 2, 3, 4]; // 라운드별 전체 경보기 개수 (항상 1개만 울림, 나머지는 함정)
const EXTINGUISHER_PIN_PULL_DISTANCE = 44; // 안전핀이 뽑힌 것으로 인정되는 드래그 거리(px)
const EXTINGUISHER_HOLD_DURATION_MS = 1400; // 분사가 완료되는 데 필요한 누르고 있는 시간(ms)

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
      { id: "valve", name: "가스 밸브", x: 40, y: 55, type: "valve", points: 200, message: "사용하지 않을 때는 가스 밸브를 꼭 잠가두세요." },
      { id: "window", name: "창문", x: 82, y: 28, type: "window", message: "요리할 때는 창문을 열어 환기해주세요." },
    ],
  },
  {
    id: "living-room",
    name: "거실",
    objects: [
      { id: "detector", name: "가스 경보기", x: 22, y: 22, type: "alarm", points: 100, message: "가스 경보기는 주기적으로 점검해야 해요." },
      { id: "extinguisher", name: "소화기", x: 45, y: 82, type: "extinguisher", points: 100, message: "소화기는 안전핀을 뽑고 손잡이를 꾹 눌러야 분사돼요. 잘 보이는 곳에 두고 사용법을 미리 익혀두세요." },
      { id: "door-out", name: "출입구", x: 50, y: 50, type: "door", targetRoomId: "outside" },
    ],
  },
  {
    id: "boiler-room",
    name: "보일러실",
    objects: [
      { id: "hose", name: "가스 호스", x: 62, y: 78, points: 100, message: "낡거나 금이 간 가스 호스는 즉시 새 것으로 교체하세요." },
      { id: "vent", name: "환기구", x: 75, y: 35, points: 100, message: "환기구를 막지 않아야 가스가 안전하게 배출돼요." },
      { id: "pipe", name: "배관 연결부", x: 25, y: 72, points: 100, message: "배관 연결부에 비눗물을 발라 가스 누출 여부를 점검하세요." },
    ],
  },
  {
    id: "bedroom",
    name: "침실",
    objects: [
      { id: "book", name: "책", x: 50, y: 50, type: "quiz", message: "책에서 배운 가스 안전 상식을 다시 떠올려보세요." },
      { id: "tv", name: "TV", x: 25, y: 25, type: "quiz", message: "TV에서 본 가스 안전 상식을 다시 떠올려보세요." },
      { id: "outlet", name: "멀티탭", x: 75, y: 75, points: 100, message: "문어발식 콘센트 사용은 화재 위험이 있으니 피해주세요." },
    ],
  },
  {
    id: "outside",
    name: "바깥",
    doorOnly: true, // 화살표/스와이프로는 드나들 수 없고 출입구 오브젝트로만 이동 가능
    objects: [
      { id: "cylinder", name: "가스용기", x: 22, y: 28, type: "spot-diff", points: 100, message: "LNG는 공기보다 가벼워 천장 쪽에, LPG는 공기보다 무거워 바닥 쪽에 머물러요. 그래서 감지기 위치도 서로 달라요!" },
      { id: "door-in", name: "출입구", x: 50, y: 50, type: "door", targetRoomId: "living-room" },
    ],
  },
];

const STARTING_ROOM_INDEX = ROOMS.findIndex((room) => room.id === "living-room");

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
  {
    question: "가스레인지 사용 중 잠깐 자리를 비워야 한다면?",
    options: [
      { text: "불을 켠 채로 잠깐 비운다", correct: false },
      { text: "반드시 불을 끄고 자리를 비운다", correct: true },
    ],
    explanation: "아주 잠깐이라도 불을 켠 채 자리를 비우면 위험해요. 자리를 비울 땐 반드시 불을 먼저 꺼주세요.",
  },
  {
    question: "가스 배관 근처에 물건을 보관할 때 주의할 점은?",
    options: [
      { text: "물건을 배관에 밀착시켜 쌓아둔다", correct: false },
      { text: "배관과 거리를 두고 눌리지 않게 보관한다", correct: true },
    ],
    explanation: "배관 주변에 물건을 쌓아두면 배관이 눌리거나 손상되어 가스가 샐 수 있어요. 배관과는 충분히 거리를 두고 보관하세요.",
  },
];

const state = {
  started: false,
  phase: "idle", // idle | countdown | playing | accusation | ended
  score: 0,
  countdown: COUNTDOWN_SECONDS,
  timeRemaining: TIME_LIMIT,
  culpritId: null,
  correctGuess: null,
  roomIndex: STARTING_ROOM_INDEX,
  interactedObjects: new Set(),
  notebookEntries: [],
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

function updateNotebookBadge() {
  const count = state.notebookEntries.length;
  notebookBadge.textContent = count;
  notebookBadge.classList.toggle("hidden", count === 0);
}

function renderNotebookEntries() {
  notebookEntriesEl.innerHTML = "";

  if (state.notebookEntries.length === 0) {
    const empty = document.createElement("p");
    empty.className = "notebook-empty";
    empty.textContent = "아직 발견한 단서가 없어요. 방을 조사해 단서를 모아보세요!";
    notebookEntriesEl.appendChild(empty);
    return;
  }

  state.notebookEntries.forEach((entry) => {
    const item = document.createElement("div");
    item.className = "notebook-entry";
    item.innerHTML = `
      <span class="notebook-entry-location">${entry.roomName} · ${entry.objectName}</span>
      <p class="notebook-entry-text">${entry.message}</p>
    `;
    notebookEntriesEl.appendChild(item);
  });
}

function openNotebook() {
  renderNotebookEntries();
  notebookOverlay.classList.add("visible");
}

function closeNotebook() {
  notebookOverlay.classList.remove("visible");
}

notebookBtn.addEventListener("click", openNotebook);
notebookCloseBtn.addEventListener("click", closeNotebook);
notebookOverlay.addEventListener("click", (e) => {
  if (e.target === notebookOverlay) closeNotebook();
});

function flyToNotebook(originEl) {
  const originRect = originEl.getBoundingClientRect();
  const targetRect = notebookBtn.getBoundingClientRect();
  const size = 28;

  const chip = document.createElement("div");
  chip.className = "clue-fly-chip";
  chip.textContent = "🗒️";
  chip.style.left = `${originRect.left + originRect.width / 2 - size / 2}px`;
  chip.style.top = `${originRect.top + originRect.height / 2 - size / 2}px`;
  document.body.appendChild(chip);

  const dx = targetRect.left + targetRect.width / 2 - (originRect.left + originRect.width / 2);
  const dy = targetRect.top + targetRect.height / 2 - (originRect.top + originRect.height / 2);

  requestAnimationFrame(() => {
    chip.style.transform = `translate(${dx}px, ${dy}px) scale(0.25)`;
    chip.style.opacity = "0.15";
  });

  setTimeout(() => {
    chip.remove();
    notebookBtn.classList.add("pulse");
    setTimeout(() => notebookBtn.classList.remove("pulse"), 350);
  }, 650);
}

function interactObject(room, obj) {
  if (state.phase !== "playing") return;

  showMessage(obj.message);

  const key = `${room.id}:${obj.id}`;
  if (!state.interactedObjects.has(key)) {
    state.interactedObjects.add(key);
    addScore(obj.points);
    state.notebookEntries.push({ roomName: room.name, objectName: obj.name, message: obj.message });
    updateNotebookBadge();
    renderRoom();
    setTimeout(() => flyToNotebook(messageBubble), 300);
  }
}

const WINDOW_FRAME_INSET = 10; // window frame rect's x/y offset in the SVG viewBox
const WINDOW_FRAME_SIZE = 80; // window frame rect's full width in the SVG viewBox

let windowEventRoom = null;
let windowEventObj = null;
let windowEventTaps = 0;
let windowTapProgress = {}; // 오브젝트 키별 진행 상황 (닫았다 다시 열어도 유지)

function updateWindowPane() {
  const progress = Math.min(1, windowEventTaps / WINDOW_TAP_TARGET);
  const closedWidth = WINDOW_FRAME_SIZE * (1 - progress);
  windowPaneEl.setAttribute("width", closedWidth.toFixed(2));

  // the "open" layer is only ever drawn in the region the closed pane has vacated
  const openX = WINDOW_FRAME_INSET + closedWidth;
  const openWidth = WINDOW_FRAME_SIZE - closedWidth;
  windowOpenClipRectEl.setAttribute("x", openX.toFixed(2));
  windowOpenClipRectEl.setAttribute("width", openWidth.toFixed(2));
}

function openWindowEvent(room, obj) {
  if (state.phase !== "playing") return;

  windowEventRoom = room;
  windowEventObj = obj;
  const key = `${room.id}:${obj.id}`;
  windowEventTaps = windowTapProgress[key] || 0;

  windowTapCountEl.textContent = `${windowEventTaps} / ${WINDOW_TAP_TARGET}`;
  windowProgressFill.style.width = `${(windowEventTaps / WINDOW_TAP_TARGET) * 100}%`;
  updateWindowPane();
  windowEventOverlay.classList.add("visible");
}

function handleWindowTap() {
  if (windowEventTaps >= WINDOW_TAP_TARGET) return;

  windowEventTaps++;
  windowTapProgress[`${windowEventRoom.id}:${windowEventObj.id}`] = windowEventTaps;
  addScore(1);

  windowTapCountEl.textContent = `${windowEventTaps} / ${WINDOW_TAP_TARGET}`;
  windowProgressFill.style.width = `${(windowEventTaps / WINDOW_TAP_TARGET) * 100}%`;
  updateWindowPane();

  windowTapTarget.classList.remove("tap-bounce");
  void windowTapTarget.offsetWidth; // restart the bounce animation on every tap
  windowTapTarget.classList.add("tap-bounce");

  if (windowEventTaps >= WINDOW_TAP_TARGET) {
    completeWindowEvent();
  }
}

function completeWindowEvent() {
  const room = windowEventRoom;
  const obj = windowEventObj;
  const key = `${room.id}:${obj.id}`;

  delete windowTapProgress[key];
  state.interactedObjects.add(key);
  state.notebookEntries.push({ roomName: room.name, objectName: obj.name, message: obj.message });
  updateNotebookBadge();
  renderRoom();

  setTimeout(() => {
    windowEventOverlay.classList.remove("visible");
    showMessage(obj.message);
    setTimeout(() => flyToNotebook(messageBubble), 300);
  }, 500);
}

windowTapTarget.addEventListener("click", handleWindowTap);
windowEventClose.addEventListener("click", () => {
  windowEventOverlay.classList.remove("visible");
});

let valveEventRoom = null;
let valveEventObj = null;
let valveOpenRemaining = 0;

function openValveEvent(room, obj) {
  if (state.phase !== "playing") return;

  valveEventRoom = room;
  valveEventObj = obj;
  valveOpenRemaining = VALVE_OPEN_COUNT;

  const indices = Array.from({ length: VALVE_GRID_SIZE }, (_, i) => i);
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }
  const openSet = new Set(indices.slice(0, VALVE_OPEN_COUNT));

  valveGridEl.innerHTML = "";
  for (let i = 0; i < VALVE_GRID_SIZE; i++) {
    const isOpen = openSet.has(i);
    const cell = document.createElement("button");
    cell.type = "button";
    cell.className = `valve-cell ${isOpen ? "open" : "closed"}`;
    cell.innerHTML = `
      <svg class="valve-svg" viewBox="0 0 64 64" aria-hidden="true">
        <line x1="32" y1="2" x2="32" y2="20" class="valve-pipe-line"></line>
        <line x1="32" y1="44" x2="32" y2="62" class="valve-pipe-line"></line>
        <circle cx="32" cy="32" r="12" class="valve-body-circle"></circle>
        <line x1="17" y1="32" x2="47" y2="32" class="valve-handle-line"></line>
      </svg>
      <span class="valve-label">${isOpen ? "열림" : "잠김"}</span>
    `;
    cell.addEventListener("click", () => handleValveTap(cell));
    valveGridEl.appendChild(cell);
  }

  valveProgressText.textContent = `열린 밸브 ${valveOpenRemaining}개`;
  valveEventOverlay.classList.add("visible");
}

function handleValveTap(cell) {
  const isOpen = cell.classList.contains("open");

  if (isOpen) {
    cell.classList.remove("open");
    cell.classList.add("closed");
    cell.querySelector(".valve-label").textContent = "잠김";
    valveOpenRemaining--;
  } else {
    cell.classList.remove("closed");
    cell.classList.add("open");
    cell.querySelector(".valve-label").textContent = "열림";
    valveOpenRemaining++;
  }

  cell.classList.remove("pop");
  void cell.offsetWidth; // restart the pop animation on every tap
  cell.classList.add("pop");

  valveProgressText.textContent = `열린 밸브 ${valveOpenRemaining}개`;

  if (valveOpenRemaining <= 0) {
    completeValveEvent();
  }
}

function completeValveEvent() {
  const room = valveEventRoom;
  const obj = valveEventObj;
  const key = `${room.id}:${obj.id}`;

  state.interactedObjects.add(key);
  addScore(obj.points);
  state.notebookEntries.push({ roomName: room.name, objectName: obj.name, message: obj.message });
  updateNotebookBadge();
  renderRoom();

  setTimeout(() => {
    valveEventOverlay.classList.remove("visible");
    showMessage(obj.message);
    setTimeout(() => flyToNotebook(messageBubble), 300);
  }, 500);
}

valveEventClose.addEventListener("click", () => {
  valveEventOverlay.classList.remove("visible");
});

// 220x380 뷰박스 기준 좌표. 천장 0~70 / 벽 70~320 / 바닥 320~380
const SPOT_DIFF_ITEMS = [
  {
    id: "label",
    isLabel: true,
    x: 110,
    y: 40,
    explanation: "이름부터 달라요! LNG(액화천연가스)와 LPG(액화석유가스)는 서로 다른 가스예요.",
  },
  {
    id: "cloud",
    icon: "💨",
    x: 52,
    lngY: 52,
    lpgY: 300,
    explanation: "LNG는 공기보다 가벼워 위로 떠오르고, LPG는 공기보다 무거워 아래로 가라앉아요.",
  },
  {
    id: "detector",
    icon: "🔔",
    x: 176,
    lngY: 48,
    lpgY: 302,
    explanation: "그래서 가스 경보기 위치도 달라요. LNG는 천장 쪽, LPG는 바닥 쪽에 설치해야 해요.",
  },
];

let spotDiffRoom = null;
let spotDiffObj = null;
let spotDiffFound = new Set();

function renderSpotDiffHotspot(item, side) {
  const y = item.isLabel ? item.y : side === "lng" ? item.lngY : item.lpgY;

  if (item.isLabel) {
    const text = side === "lng" ? "LNG" : "LPG";
    return `
      <g class="spotdiff-hotspot" data-item-id="${item.id}" transform="translate(${item.x}, ${y})">
        <circle r="34" class="sd-hit"></circle>
        <circle r="36" class="sd-found-ring"></circle>
        <rect x="-28" y="-16" width="56" height="32" rx="16" class="sd-chip"></rect>
        <text text-anchor="middle" dy="6" class="sd-chip-text">${text}</text>
        <circle class="sd-check-bg" cx="26" cy="-20" r="9"></circle>
        <text class="sd-check-text" x="26" y="-16" text-anchor="middle">✓</text>
      </g>`;
  }

  return `
    <g class="spotdiff-hotspot" data-item-id="${item.id}" transform="translate(${item.x}, ${y})">
      <circle r="28" class="sd-hit"></circle>
      <circle r="28" class="sd-found-ring"></circle>
      <text text-anchor="middle" dy="8" class="sd-emoji">${item.icon}</text>
      <circle class="sd-check-bg" cx="20" cy="-18" r="9"></circle>
      <text class="sd-check-text" x="20" y="-14" text-anchor="middle">✓</text>
    </g>`;
}

function renderSpotDiffPanel(panelEl, side) {
  panelEl.innerHTML = `
    <svg viewBox="0 0 220 380" class="spotdiff-scene-svg" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      <rect x="0" y="0" width="220" height="380" rx="16" class="sd-card-bg"></rect>
      <rect x="0" y="0" width="220" height="70" class="sd-ceiling"></rect>
      <rect x="0" y="70" width="220" height="250" class="sd-wall"></rect>
      <rect x="0" y="320" width="220" height="60" class="sd-floor"></rect>
      <line x1="0" y1="341" x2="220" y2="341" class="sd-floor-line"></line>
      <line x1="0" y1="361" x2="220" y2="361" class="sd-floor-line"></line>
      <rect x="148" y="108" width="48" height="70" rx="4" class="sd-window-frame"></rect>
      <rect x="153" y="113" width="38" height="60" class="sd-window-glass"></rect>
      <line x1="172" y1="113" x2="172" y2="173" class="sd-window-cross"></line>
      <line x1="153" y1="143" x2="191" y2="143" class="sd-window-cross"></line>
      <line x1="110" y1="228" x2="110" y2="300" class="sd-pipe"></line>
      <rect x="82" y="300" width="56" height="24" rx="4" class="sd-stove-body"></rect>
      <text x="110" y="297" text-anchor="middle" class="sd-emoji sd-emoji-flame">🔥</text>
      ${SPOT_DIFF_ITEMS.map((item) => renderSpotDiffHotspot(item, side)).join("")}
    </svg>`;
}

function handleSpotDiffPanelClick(event) {
  const hotspot = event.target.closest(".spotdiff-hotspot");
  if (!hotspot) return;
  handleSpotDiffTap(hotspot.dataset.itemId);
}

spotdiffRoomLngEl.addEventListener("click", handleSpotDiffPanelClick);
spotdiffRoomLpgEl.addEventListener("click", handleSpotDiffPanelClick);

function openSpotDiffEvent(room, obj) {
  if (state.phase !== "playing") return;

  spotDiffRoom = room;
  spotDiffObj = obj;
  spotDiffFound = new Set();

  spotdiffFeedbackEl.textContent = "";
  spotdiffFeedbackEl.classList.remove("visible");
  spotdiffProgressText.textContent = `0 / ${SPOT_DIFF_ITEMS.length}`;

  renderSpotDiffPanel(spotdiffRoomLngEl, "lng");
  renderSpotDiffPanel(spotdiffRoomLpgEl, "lpg");

  spotdiffEventOverlay.classList.add("visible");
}

function handleSpotDiffTap(itemId) {
  if (spotDiffFound.has(itemId)) return;

  spotDiffFound.add(itemId);
  document.querySelectorAll(`.spotdiff-hotspot[data-item-id="${itemId}"]`).forEach((el) => {
    el.classList.add("found");
  });

  const item = SPOT_DIFF_ITEMS.find((i) => i.id === itemId);
  spotdiffFeedbackEl.innerHTML = `<strong>찾았어요!</strong><br>${item.explanation}`;
  spotdiffFeedbackEl.classList.remove("visible");
  void spotdiffFeedbackEl.offsetWidth; // restart the grow-in animation on every find
  spotdiffFeedbackEl.classList.add("visible");
  spotdiffProgressText.textContent = `${spotDiffFound.size} / ${SPOT_DIFF_ITEMS.length}`;

  if (spotDiffFound.size >= SPOT_DIFF_ITEMS.length) {
    completeSpotDiffEvent();
  }
}

function completeSpotDiffEvent() {
  const room = spotDiffRoom;
  const obj = spotDiffObj;
  const key = `${room.id}:${obj.id}`;

  state.interactedObjects.add(key);
  addScore(obj.points);
  state.notebookEntries.push({ roomName: room.name, objectName: obj.name, message: obj.message });
  updateNotebookBadge();
  renderRoom();

  setTimeout(() => {
    spotdiffEventOverlay.classList.remove("visible");
    showMessage(obj.message);
    setTimeout(() => flyToNotebook(messageBubble), 300);
  }, 1200);
}

spotdiffEventClose.addEventListener("click", () => {
  spotdiffEventOverlay.classList.remove("visible");
});

let alarmRoom = null;
let alarmObj = null;
let alarmHits = 0;

function alarmDistance(a, b) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

function randomAlarmPosition(avoidList = []) {
  let pos;
  let attempts = 0;
  do {
    pos = { x: 15 + Math.random() * 70, y: 18 + Math.random() * 64 };
    attempts++;
  } while (avoidList.some((p) => alarmDistance(pos, p) < 24) && attempts < 30);
  return pos;
}

function buildAlarmDeviceSvg() {
  return `
    <svg class="alarm-svg" viewBox="0 0 64 64" aria-hidden="true">
      <rect x="8" y="6" width="48" height="52" rx="10" class="alarm-body"></rect>
      <rect x="16" y="16" width="32" height="4" rx="2" class="alarm-grille"></rect>
      <rect x="16" y="24" width="32" height="4" rx="2" class="alarm-grille"></rect>
      <rect x="16" y="32" width="32" height="4" rx="2" class="alarm-grille"></rect>
      <circle cx="32" cy="46" r="5" class="alarm-led"></circle>
    </svg>
  `;
}

function spawnAlarmRound() {
  alarmPlayfieldEl.innerHTML = "";

  const roundNumber = alarmHits + 1;
  const totalCount = ALARM_COUNTS[Math.min(roundNumber, ALARM_COUNTS.length) - 1];
  const trapCount = totalCount - 1;
  const takenPositions = [];

  const ringingPos = randomAlarmPosition(takenPositions);
  takenPositions.push(ringingPos);

  const ringingBtn = document.createElement("button");
  ringingBtn.type = "button";
  ringingBtn.className = "alarm-target ringing";
  ringingBtn.style.left = `${ringingPos.x}%`;
  ringingBtn.style.top = `${ringingPos.y}%`;
  ringingBtn.innerHTML = buildAlarmDeviceSvg();
  ringingBtn.addEventListener("click", handleAlarmHit);
  alarmPlayfieldEl.appendChild(ringingBtn);

  for (let i = 0; i < trapCount; i++) {
    const trapPos = randomAlarmPosition(takenPositions);
    takenPositions.push(trapPos);

    const trapBtn = document.createElement("button");
    trapBtn.type = "button";
    trapBtn.className = "alarm-target trap";
    trapBtn.style.left = `${trapPos.x}%`;
    trapBtn.style.top = `${trapPos.y}%`;
    trapBtn.innerHTML = buildAlarmDeviceSvg();
    trapBtn.addEventListener("click", handleAlarmTrapHit);
    alarmPlayfieldEl.appendChild(trapBtn);
  }

  alarmProgressText.textContent = `${alarmHits} / ${ALARM_ROUNDS}`;
}

function openAlarmEvent(room, obj) {
  if (state.phase !== "playing") return;

  alarmRoom = room;
  alarmObj = obj;
  alarmHits = 0;

  spawnAlarmRound();
  alarmEventOverlay.classList.add("visible");
}

function handleAlarmHit() {
  alarmHits++;

  if (alarmHits >= ALARM_ROUNDS) {
    alarmPlayfieldEl.innerHTML = "";
    alarmProgressText.textContent = `${alarmHits} / ${ALARM_ROUNDS}`;
    completeAlarmEvent();
    return;
  }

  spawnAlarmRound();
}

function handleAlarmTrapHit() {
  // 함정을 누르면 진짜 경보기가 놀라서 자리를 옮김 - 진행도는 그대로
  spawnAlarmRound();
}

function completeAlarmEvent() {
  const room = alarmRoom;
  const obj = alarmObj;
  const key = `${room.id}:${obj.id}`;

  state.interactedObjects.add(key);
  addScore(obj.points);
  state.notebookEntries.push({ roomName: room.name, objectName: obj.name, message: obj.message });
  updateNotebookBadge();
  renderRoom();

  setTimeout(() => {
    alarmEventOverlay.classList.remove("visible");
    showMessage(obj.message);
    setTimeout(() => flyToNotebook(messageBubble), 300);
  }, 500);
}

alarmEventClose.addEventListener("click", () => {
  alarmEventOverlay.classList.remove("visible");
});

let extinguisherRoom = null;
let extinguisherObj = null;
let extinguisherPinPulled = false;
let extinguisherPinDrag = null; // { pointerId, startX, startY }
let extinguisherHoldRaf = null;
let extinguisherHoldStart = 0;
let extinguisherCompleted = false;

function getExtinguisherSvgScale() {
  const rect = extinguisherSvgEl.getBoundingClientRect();
  return { x: 200 / rect.width, y: 300 / rect.height };
}

function openExtinguisherEvent(room, obj) {
  if (state.phase !== "playing") return;

  extinguisherRoom = room;
  extinguisherObj = obj;
  extinguisherPinPulled = false;
  extinguisherCompleted = false;
  extinguisherPinDrag = null;

  extinguisherInstructionEl.textContent = "안전핀 고리를 당겨서 뽑아주세요!";
  extinguisherPinEl.classList.remove("pulled", "shake", "dragging");
  extinguisherPinEl.style.transform = "";
  extinguisherFireEl.style.transform = "";
  extinguisherFireEl.style.opacity = "1";
  extinguisherBodyGroupEl.classList.remove("pressing");
  extinguisherPressHintEl.classList.add("hidden");
  extinguisherHoldTrack.classList.add("hidden");
  extinguisherHoldFill.style.width = "0%";

  extinguisherEventOverlay.classList.add("visible");
}

function pullExtinguisherPin() {
  extinguisherPinPulled = true;
  extinguisherPinEl.style.transform = "";
  extinguisherPinEl.classList.add("pulled");

  extinguisherInstructionEl.textContent = "소화기를 꾹 눌러서 불을 꺼주세요!";
  extinguisherPressHintEl.classList.remove("hidden");
  extinguisherHoldTrack.classList.remove("hidden");
}

extinguisherPinEl.addEventListener("pointerdown", (e) => {
  if (extinguisherPinPulled) return;
  e.preventDefault();
  extinguisherPinEl.setPointerCapture(e.pointerId);
  extinguisherPinEl.classList.add("dragging");
  extinguisherPinDrag = { pointerId: e.pointerId, startX: e.clientX, startY: e.clientY };
});

extinguisherPinEl.addEventListener("pointermove", (e) => {
  if (!extinguisherPinDrag || e.pointerId !== extinguisherPinDrag.pointerId) return;
  const dx = e.clientX - extinguisherPinDrag.startX;
  const dy = e.clientY - extinguisherPinDrag.startY;
  const scale = getExtinguisherSvgScale();
  extinguisherPinEl.style.transform = `translate(${dx * scale.x}px, ${dy * scale.y}px)`;
});

function endExtinguisherPinDrag(e) {
  if (!extinguisherPinDrag || e.pointerId !== extinguisherPinDrag.pointerId) return;

  const dx = e.clientX - extinguisherPinDrag.startX;
  const dy = e.clientY - extinguisherPinDrag.startY;
  const distance = Math.hypot(dx, dy);
  extinguisherPinEl.classList.remove("dragging");
  extinguisherPinDrag = null;

  if (distance >= EXTINGUISHER_PIN_PULL_DISTANCE) {
    pullExtinguisherPin();
  } else {
    extinguisherPinEl.style.transform = "";
    extinguisherPinEl.classList.remove("shake");
    void extinguisherPinEl.offsetWidth; // restart the shake animation on every failed pull
    extinguisherPinEl.classList.add("shake");
  }
}

extinguisherPinEl.addEventListener("pointerup", endExtinguisherPinDrag);
extinguisherPinEl.addEventListener("pointercancel", endExtinguisherPinDrag);

function stepExtinguisherHold(timestamp) {
  const elapsed = timestamp - extinguisherHoldStart;
  const progress = Math.min(1, elapsed / EXTINGUISHER_HOLD_DURATION_MS);

  extinguisherHoldFill.style.width = `${progress * 100}%`;
  extinguisherFireEl.style.transform = `scale(${1 - progress * 0.9})`;
  extinguisherFireEl.style.opacity = `${1 - progress}`;

  if (progress >= 1) {
    extinguisherHoldRaf = null;
    completeExtinguisherEvent();
    return;
  }
  extinguisherHoldRaf = requestAnimationFrame(stepExtinguisherHold);
}

function cancelExtinguisherHold() {
  if (extinguisherCompleted) return;

  if (extinguisherHoldRaf) {
    cancelAnimationFrame(extinguisherHoldRaf);
    extinguisherHoldRaf = null;
  }
  extinguisherBodyGroupEl.classList.remove("pressing");
  extinguisherHoldFill.style.width = "0%";
  extinguisherFireEl.style.transform = "";
  extinguisherFireEl.style.opacity = "1";
}

extinguisherPressHitEl.addEventListener("pointerdown", (e) => {
  if (!extinguisherPinPulled || extinguisherCompleted) return;
  extinguisherPressHitEl.setPointerCapture(e.pointerId);
  extinguisherBodyGroupEl.classList.add("pressing");
  extinguisherPressHintEl.classList.add("hidden");
  extinguisherHoldStart = performance.now();
  extinguisherHoldRaf = requestAnimationFrame(stepExtinguisherHold);
});

extinguisherPressHitEl.addEventListener("pointerup", cancelExtinguisherHold);
extinguisherPressHitEl.addEventListener("pointercancel", cancelExtinguisherHold);
extinguisherPressHitEl.addEventListener("pointerleave", cancelExtinguisherHold);

function completeExtinguisherEvent() {
  extinguisherCompleted = true;
  extinguisherBodyGroupEl.classList.remove("pressing");
  extinguisherInstructionEl.textContent = "불을 완전히 껐어요!";

  const room = extinguisherRoom;
  const obj = extinguisherObj;
  const key = `${room.id}:${obj.id}`;

  state.interactedObjects.add(key);
  addScore(obj.points);
  state.notebookEntries.push({ roomName: room.name, objectName: obj.name, message: obj.message });
  updateNotebookBadge();
  renderRoom();

  setTimeout(() => {
    extinguisherEventOverlay.classList.remove("visible");
    showMessage(obj.message);
    setTimeout(() => flyToNotebook(messageBubble), 300);
  }, 700);
}

extinguisherEventClose.addEventListener("click", () => {
  cancelExtinguisherHold();
  extinguisherEventOverlay.classList.remove("visible");
});

const OBJECT_EVENT_HANDLERS = {
  window: openWindowEvent,
  valve: openValveEvent,
  "spot-diff": openSpotDiffEvent,
  quiz: openBookQuizEvent,
  alarm: openAlarmEvent,
  extinguisher: openExtinguisherEvent,
};

function handleObjectClick(room, obj) {
  if (obj.type === "door") {
    goToRoomById(obj.targetRoomId);
    return;
  }

  const key = `${room.id}:${obj.id}`;
  const eventHandler = OBJECT_EVENT_HANDLERS[obj.type];
  if (eventHandler && !state.interactedObjects.has(key)) {
    eventHandler(room, obj);
    return;
  }
  interactObject(room, obj);
}

function renderRoom() {
  const room = ROOMS[state.roomIndex];

  roomBg.setAttribute("data-label", room.name);
  roomNameEl.textContent = room.name;

  const prevRoom = ROOMS[state.roomIndex - 1];
  const nextRoom = ROOMS[state.roomIndex + 1];
  roomArrowLeft.classList.toggle("disabled", Boolean(room.doorOnly || state.roomIndex === 0 || (prevRoom && prevRoom.doorOnly)));
  roomArrowRight.classList.toggle("disabled", Boolean(room.doorOnly || state.roomIndex === ROOMS.length - 1 || (nextRoom && nextRoom.doorOnly)));

  roomObjectsEl.innerHTML = "";
  room.objects.forEach((obj) => {
    const key = `${room.id}:${obj.id}`;
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "room-object";
    if (obj.type === "door") btn.classList.add("door");
    if (state.interactedObjects.has(key)) btn.classList.add("checked");
    btn.style.left = `${obj.x}%`;
    btn.style.top = `${obj.y}%`;
    const icon = obj.type === "door" ? "🚪 " : "";
    btn.innerHTML = `<span class="room-object-placeholder">${icon}${obj.name}</span>`;
    btn.addEventListener("click", () => handleObjectClick(room, obj));
    roomObjectsEl.appendChild(btn);
  });
}

let roomTransitionLock = false;

function slideToRoomIndex(nextIndex, direction) {
  if (roomTransitionLock) return;
  if (nextIndex < 0 || nextIndex >= ROOMS.length || nextIndex === state.roomIndex) return;

  roomTransitionLock = true;
  hideMessage();

  const exitX = direction > 0 ? "-100%" : "100%";
  const entryX = direction > 0 ? "100%" : "-100%";

  roomView.style.transform = `translateX(${exitX})`;

  setTimeout(() => {
    state.roomIndex = nextIndex;
    renderRoom();

    roomView.classList.add("no-transition");
    roomView.style.transform = `translateX(${entryX})`;
    void roomView.offsetWidth; // force reflow so the jump isn't animated
    roomView.classList.remove("no-transition");
    roomView.style.transform = "translateX(0)";

    setTimeout(() => {
      roomTransitionLock = false;
    }, 250);
  }, 250);
}

function fadeToRoomIndex(nextIndex) {
  if (roomTransitionLock) return;
  if (nextIndex < 0 || nextIndex >= ROOMS.length || nextIndex === state.roomIndex) return;

  roomTransitionLock = true;
  hideMessage();

  roomView.classList.add("door-fade-out");

  setTimeout(() => {
    state.roomIndex = nextIndex;
    renderRoom();

    roomView.classList.remove("door-fade-out");
    roomView.classList.add("door-fade-in");

    setTimeout(() => {
      roomView.classList.remove("door-fade-in");
      roomTransitionLock = false;
    }, 300);
  }, 300);
}

function goToRoom(delta) {
  const currentRoom = ROOMS[state.roomIndex];
  if (currentRoom.doorOnly) return; // 바깥은 화살표/스와이프로 나갈 수 없음

  const nextIndex = state.roomIndex + delta;
  const nextRoom = ROOMS[nextIndex];
  if (nextRoom && nextRoom.doorOnly) return; // 바깥은 화살표/스와이프로 들어갈 수 없음

  slideToRoomIndex(nextIndex, delta);
}

function goToRoomById(targetId) {
  const targetIndex = ROOMS.findIndex((r) => r.id === targetId);
  if (targetIndex === -1) return;
  fadeToRoomIndex(targetIndex);
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

let bookQuizRoom = null;
let bookQuizObj = null;
let bookQuizCurrent = null;
let usedQuizIndices = new Set();

function pickQuiz() {
  const remaining = QUIZZES.map((_, i) => i).filter((i) => !usedQuizIndices.has(i));
  const pool = remaining.length > 0 ? remaining : QUIZZES.map((_, i) => i);
  const index = pool[Math.floor(Math.random() * pool.length)];

  usedQuizIndices.add(index);
  if (usedQuizIndices.size >= QUIZZES.length) usedQuizIndices.clear();

  return QUIZZES[index];
}

function openBookQuizEvent(room, obj) {
  if (state.phase !== "playing") return;

  bookQuizRoom = room;
  bookQuizObj = obj;
  bookQuizCurrent = pickQuiz();

  quizQuestionEl.textContent = bookQuizCurrent.question;
  quizChoiceLeftText.textContent = bookQuizCurrent.options[0].text;
  quizChoiceRightText.textContent = bookQuizCurrent.options[1].text;
  quizChoiceLeft.classList.remove("correct", "wrong", "disabled");
  quizChoiceRight.classList.remove("correct", "wrong", "disabled");
  quizFeedbackEl.classList.remove("visible", "correct", "wrong");
  quizFeedbackTextEl.textContent = "";

  quizOverlay.classList.remove("hidden");
}

function resolveBookQuiz(choiceIndex) {
  if (!bookQuizCurrent) return;

  const quiz = bookQuizCurrent;
  const chosen = quiz.options[choiceIndex];
  const choiceButtons = [quizChoiceLeft, quizChoiceRight];

  choiceButtons.forEach((btn) => btn.classList.add("disabled"));
  quiz.options.forEach((opt, i) => {
    if (opt.correct) choiceButtons[i].classList.add("correct");
    else if (i === choiceIndex) choiceButtons[i].classList.add("wrong");
  });

  if (chosen.correct) {
    addScore(QUIZ_BONUS);
    quizFeedbackTextEl.innerHTML = `<strong class="quiz-feedback-verdict">정답입니다!</strong><br>${quiz.explanation}`;
    quizFeedbackEl.classList.add("correct");
  } else {
    quizFeedbackTextEl.innerHTML = `<strong class="quiz-feedback-verdict">아쉽지만 오답이에요.</strong><br>${quiz.explanation}`;
    quizFeedbackEl.classList.add("wrong");
  }
  quizFeedbackEl.classList.add("visible");

  const room = bookQuizRoom;
  const obj = bookQuizObj;
  const key = `${room.id}:${obj.id}`;

  state.interactedObjects.add(key);
  renderRoom();

  setTimeout(() => {
    quizOverlay.classList.add("hidden");
    showMessage(quiz.explanation);
  }, 2000);
}

quizChoiceLeft.addEventListener("click", () => resolveBookQuiz(0));
quizChoiceRight.addEventListener("click", () => resolveBookQuiz(1));

function enterAccusationPhase() {
  if (state.phase !== "playing") return;
  state.phase = "accusation";

  testControls.classList.add("hidden");
  timerBarWrap.classList.add("hidden");
  roomStage.classList.add("hidden");
  notebookBtn.classList.add("hidden");
  closeNotebook();
  windowEventOverlay.classList.remove("visible");
  valveEventOverlay.classList.remove("visible");
  spotdiffEventOverlay.classList.remove("visible");
  alarmEventOverlay.classList.remove("visible");
  quizOverlay.classList.add("hidden");
  hideMessage();

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
  state.phase = "playing"; // TODO: 카운트다운 임시 비활성화. 복구하려면 "countdown"으로 되돌리고 countdownOverlay를 보여주면 됨
  state.countdown = COUNTDOWN_SECONDS;
  state.timeRemaining = TIME_LIMIT;
  state.score = 0;
  state.roomIndex = STARTING_ROOM_INDEX;
  state.interactedObjects = new Set();
  state.notebookEntries = [];
  windowTapProgress = {};
  usedQuizIndices = new Set();

  endScreen.classList.add("hidden");
  timeBonusRow.classList.add("hidden");
  accusationOverlay.classList.add("hidden");
  quizOverlay.classList.add("hidden");
  closeNotebook();
  windowEventOverlay.classList.remove("visible");
  valveEventOverlay.classList.remove("visible");
  spotdiffEventOverlay.classList.remove("visible");
  alarmEventOverlay.classList.remove("visible");
  updateNotebookBadge();
  hideMessage();
  testControls.classList.remove("hidden");
  timerBarWrap.classList.remove("hidden");
  countdownOverlay.classList.add("hidden");
  roomStage.classList.remove("hidden");
  notebookBtn.classList.remove("hidden");
  updateTimerDisplay();
  renderRoom();
  hudScoreDisplayed = 0;
  scoreEl.textContent = `점수: ${state.score}`;
}

let hudScoreDisplayed = 0;
let hudScoreAnimId = null;

function animateHudScore(target, duration = 1600) {
  if (hudScoreAnimId) cancelAnimationFrame(hudScoreAnimId);

  const start = hudScoreDisplayed;
  const startTime = performance.now();

  scoreEl.classList.remove("bump");
  void scoreEl.offsetWidth; // restart the bump animation even if it's already mid-play
  scoreEl.classList.add("bump");

  function tick(now) {
    const progress = Math.min(1, (now - startTime) / duration);
    const eased = 1 - Math.pow(1 - progress, 3);
    hudScoreDisplayed = Math.round(start + (target - start) * eased);
    scoreEl.textContent = `점수: ${hudScoreDisplayed}`;

    if (progress < 1) {
      hudScoreAnimId = requestAnimationFrame(tick);
    } else {
      hudScoreDisplayed = target;
      scoreEl.textContent = `점수: ${target}`;
      hudScoreAnimId = null;
    }
  }
  hudScoreAnimId = requestAnimationFrame(tick);
}

function addScore(amount) {
  if (state.phase !== "playing") return;
  state.score += amount;
  animateHudScore(state.score);
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
  notebookBtn.classList.add("hidden");
  closeNotebook();
  windowEventOverlay.classList.remove("visible");
  valveEventOverlay.classList.remove("visible");
  spotdiffEventOverlay.classList.remove("visible");
  alarmEventOverlay.classList.remove("visible");
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
      notebookBtn.classList.remove("hidden");
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
}
