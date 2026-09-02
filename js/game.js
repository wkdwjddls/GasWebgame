const scoreEl = document.getElementById("score");
const roomStage = document.getElementById("room-stage");
const roomView = document.getElementById("room-view");
const roomBg = document.getElementById("room-bg");
const roomObjectsEl = document.getElementById("room-objects");
const roomNameEl = document.getElementById("room-name");
const roomArrowLeft = document.getElementById("room-arrow-left");
const roomArrowRight = document.getElementById("room-arrow-right");
const playerIconEl = document.getElementById("player-icon");
const introLineOverlay = document.getElementById("intro-line-overlay");
const introLineText = document.getElementById("intro-line-text");
const messageBubble = document.getElementById("message-bubble");
const messageTextEl = document.getElementById("message-text");
const clueAlertOverlay = document.getElementById("clue-alert-overlay");
const clueAlertDetail = document.getElementById("clue-alert-detail");
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
const pipeEventOverlay = document.getElementById("pipe-event-overlay");
const pipeEventClose = document.getElementById("pipe-event-close");
const pipeRowEl = document.getElementById("pipe-row");
const pipeSupplyRowEl = document.getElementById("pipe-supply-row");
const pipeProgressText = document.getElementById("pipe-progress-text");

const timerBarWrap = document.getElementById("timer-bar-wrap");
const timerBarFill = document.getElementById("timer-bar-fill");
const timerText = document.getElementById("timer-text");
const countdownOverlay = document.getElementById("countdown-overlay");
const countdownNumber = document.getElementById("countdown-number");
const endScreen = document.getElementById("end-screen");
const finalScoreEl = document.getElementById("final-score");
const detectiveTitleEl = document.getElementById("detective-title");
const endTitleEl = document.getElementById("end-title");
const endMessageEl = document.getElementById("end-message");
const culpritCard = document.getElementById("culprit-card");
const culpritIconEl = document.getElementById("culprit-icon");
const culpritNameEl = document.getElementById("culprit-name");
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
const QUIZ_BONUS = 300;
const WINDOW_TAP_TARGET = 10; // 창문을 여는 데 필요한 터치 횟수
const VALVE_GRID_SIZE = 9; // 3x3
const VALVE_OPEN_COUNT = 3; // 열려있는 밸브 개수
const ALARM_ROUNDS = 5; // 울리는 경보기를 찾아야 하는 횟수
const ALARM_COUNTS = [1, 1, 2, 3, 4]; // 라운드별 전체 경보기 개수 (항상 1개만 울림, 나머지는 함정)
const EXTINGUISHER_PIN_PULL_DISTANCE = 44; // 안전핀이 뽑힌 것으로 인정되는 드래그 거리(px)
const EXTINGUISHER_HOLD_DURATION_MS = 1400; // 분사가 완료되는 데 필요한 누르고 있는 시간(ms)
const PIPE_CRACK_COUNT = 2; // 균열이 있는 배관 개수

const SUSPECTS = [
  {
    id: "cook",
    name: "김태훈",
    role: "요리사",
    icon: "🧑‍🍳",
    image: "assets/images/sus_1.png",
    alibi: "가스레인지로 요리를 했어요",
    tip: "조리 중에는 절대 자리를 비우지 마세요!",
  },
  {
    id: "repair",
    name: "최동수",
    role: "설비 기사",
    icon: "🔧",
    image: "assets/images/sus_2.png",
    alibi: "가스호스를 교체하고 있었어요",
    tip: "호스에서 가스가 새지 않는지 꼭 확인하세요!",
  },
  {
    id: "landlord",
    name: "한미영",
    role: "집주인",
    icon: "🧑‍🎓",
    image: "assets/images/sus_3.png",
    alibi: "전기난로를 옮기고 있었어요",
    tip: "가스용기 근처에 전열기구를 두어서는 안돼요!",
  },
];

const ROOMS = [
  {
    id: "kitchen",
    name: "주방",
    bg: "assets/images/bg_주방.png",
    bgW: 912,
    bgH: 1168,
    objects: [
      { id: "stove", name: "가스레인지", imgX: 83.5, imgY: 63.4, imgW: 33, imgH: 10, type: "clue", suspectId: "cook", dangerMessage: "가스레인지를 끄지 않아 위험하다!", points: 0, message: "가스레인지 사용 후 반드시 밸브를 잠가주세요!" },
      { id: "valve", name: "가스 밸브", imgX: 66.9, imgY: 25.3, imgW: 11, imgH: 11, type: "valve", points: 200, message: "사용하지 않을 때는 가스 밸브를 꼭 잠가두세요" },
      { id: "window", name: "창문", imgX: 32.4, imgY: 31.3, imgW: 49, imgH: 52, type: "window", points: 200, message: "요리할 때는 창문을 열어 환기해주세요" },
      { id: "hose", name: "가스호스", imgX: 69, imgY: 44.7, imgW: 22, imgH: 27, type: "clue", suspectId: "repair", dangerMessage: "가스호스가 파손되어 위험하다!", points: 0, message: "가스호스가 낡으면 바로 교체하세요" },
    ],
  },
  {
    id: "living-room",
    name: "거실",
    bg: "assets/images/bg_거실.png",
    bgW: 912,
    bgH: 1168,
    objects: [
      { id: "detector", name: "가스 경보기", imgX: 54.4, imgY: 35.7, imgW: 10, imgH: 8, type: "alarm", points: 200, message: "가스 경보기는 주기적으로 점검해야 해요" },
      { id: "extinguisher", name: "소화기", imgX: 55.4, imgY: 82.3, imgW: 13, imgH: 22, type: "extinguisher", points: 200, message: "소화기 사용법을 미리 익혀두세요" },
      { id: "door-out", name: "출입구", imgX: 69.4, imgY: 51.2, imgW: 13, imgH: 30, type: "door", targetRoomId: "outside" },
    ],
  },
  {
    id: "bedroom",
    name: "침실",
    bg: "assets/images/bg_침실.png",
    bgW: 912,
    bgH: 1168,
    objects: [
      { id: "tv", name: "TV", imgX: 59.9, imgY: 31.3, imgW: 21, imgH: 11, type: "quiz", message: "TV에서 본 가스 안전 상식을 다시 떠올려보세요" },
      { id: "book", name: "책", imgX: 78.2, imgY: 70.6, imgW: 25, imgH: 14, type: "quiz", message: "책에서 본 가스 안전 상식을 다시 떠올려보세요" },
      { id: "outlet", name: "멀티탭", imgX: 20.1, imgY: 80.3, imgW: 17, imgH: 11, points: 100, message: "문어발식 콘센트 사용은 위험해요" },
    ],
  },
  {
    id: "outside",
    name: "바깥",
    doorOnly: true, // 화살표/스와이프로는 드나들 수 없고 화살표 버튼(거실로 돌아가기)으로만 나갈 수 있음
    bg: "assets/images/bg_바깥.png",
    bgW: 912,
    bgH: 1168,
    objects: [
      { id: "cylinder", name: "가스용기", imgX: 48.5, imgY: 76.4, imgW: 21, imgH: 24, points: 100, message: "LNG와 LPG는 다른 가스에요" },
      { id: "heater", name: "전기난로", imgX: 31, imgY: 77.5, imgW: 10, imgH: 10, type: "clue", suspectId: "landlord", dangerMessage: "전기난로가 가스용기와 너무 가까워 위험하다!", points: 0, message: "전기난로는 가스시설과 멀리 두세요" },
      { id: "pipe", name: "가스 배관", imgX: 58.7, imgY: 51, imgW: 44, imgH: 6, type: "pipe", points: 200, message: "낡거나 금이 간 가스 배관은 즉시 교체하세요" },
      { id: "meter", name: "가스계량기", imgX: 67.2, imgY: 60.1, imgW: 11, imgH: 9, points: 100, message: "가스계량기는 주기적으로 점검하세요" },
    ],
  },
];

const STARTING_ROOM_INDEX = ROOMS.findIndex((room) => room.id === "living-room");

const QUIZZES = [
  {
    question: "가스레인지 사용 후 불만 끄면 가스밸브는 확인하지 않아도 된다.",
    options: [
      { text: "O", correct: false },
      { text: "X", correct: true },
    ],
    explanation: "불을 끈 후에도 중간 밸브를 반드시 잠가야 해요. 밸브를 확인하지 않으면 가스가 계속 새어 나올 수 있어요!",
  },
  {
    question: "가스레인지 주변에는 휴지나 종이 같은 인화성 물질을 가까이 두지 않는 것이 좋다.",
    options: [
      { text: "O", correct: true },
      { text: "X", correct: false },
    ],
    explanation: "인화성 물질이 가까이 있으면 작은 불씨에도 쉽게 옮겨붙어 화재로 이어질 수 있어요.",
  },
  {
    question: "가스레인지 위에 냄비를 올려둔 채 자리를 비워도 잠깐이라면 괜찮다.",
    options: [
      { text: "O", correct: false },
      { text: "X", correct: true },
    ],
    explanation: "아주 잠깐이라도 자리를 비우면 냄비가 끓어 넘치거나 과열되어 화재로 이어질 수 있어요.",
  },
  {
    question: "가스 안전사고는 대부분 가스 냄새가 강하게 날 때만 발생한다.",
    options: [
      { text: "O", correct: false },
      { text: "X", correct: true },
    ],
    explanation: "냄새를 느끼지 못해도 미세한 누출이나 부주의로 사고가 발생할 수 있어 평소 점검이 중요해요.",
  },
  {
    question: "가스 냄새가 나더라도 창문을 열기 위해 전등 스위치를 먼저 켜도 된다.",
    options: [
      { text: "O", correct: false },
      { text: "X", correct: true },
    ],
    explanation: "전기 스위치를 조작하면 불꽃이 튀어 폭발할 위험이 있어요. 스위치 조작 전에 창문부터 열어 환기하세요!",
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

let clueAlertHideTimer = null;

function showClueAlert(detailText) {
  clueAlertDetail.textContent = detailText;
  clueAlertOverlay.classList.add("visible");
  clearTimeout(clueAlertHideTimer);
  clueAlertHideTimer = setTimeout(() => {
    clueAlertOverlay.classList.remove("visible");
  }, 2600);
}

function hideClueAlert() {
  clearTimeout(clueAlertHideTimer);
  clueAlertOverlay.classList.remove("visible");
}

clueAlertOverlay.addEventListener("click", hideClueAlert);

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
  playSound("notebook", 0.4);
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

// 용의자별 담당 오브젝트 - 범인의 담당 오브젝트를 누르면 "범인의 흔적" 경고가, 아니면 안전 문구가 뜸
function openClueEvent(room, obj) {
  if (state.phase !== "playing") return;

  const isCulprit = obj.suspectId === state.culpritId;
  // 범인의 흔적일 땐 경고음만 나오도록, 버튼 공통 클릭음과 점수 획득음은 억제
  if (isCulprit) window.suppressClickSound = true;

  const key = `${room.id}:${obj.id}`;
  state.interactedObjects.add(key);
  addScore(obj.points, { silent: isCulprit });
  state.notebookEntries.push({ roomName: room.name, objectName: obj.name, message: obj.message });
  updateNotebookBadge();
  renderRoom();

  if (isCulprit) {
    playSound("warning", 0.5);
    showClueAlert(obj.dangerMessage);
    setTimeout(() => flyToNotebook(clueAlertOverlay), 300);
  } else {
    showMessage(obj.message);
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
  openLensOverlay(windowEventOverlay, obj);
}

function handleWindowTap() {
  if (windowEventTaps >= WINDOW_TAP_TARGET) return;

  windowEventTaps++;
  windowTapProgress[`${windowEventRoom.id}:${windowEventObj.id}`] = windowEventTaps;

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
  addScore(obj.points);
  state.notebookEntries.push({ roomName: room.name, objectName: obj.name, message: obj.message });
  updateNotebookBadge();
  renderRoom();

  setTimeout(() => {
    closeLensOverlay(windowEventOverlay);
    showMessage(obj.message);
    setTimeout(() => flyToNotebook(messageBubble), 300);
  }, 500);
}

windowTapTarget.addEventListener("click", handleWindowTap);
windowEventClose.addEventListener("click", () => {
  closeLensOverlay(windowEventOverlay);
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
  openLensOverlay(valveEventOverlay, obj);
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
    closeLensOverlay(valveEventOverlay);
    showMessage(obj.message);
    setTimeout(() => flyToNotebook(messageBubble), 300);
  }, 500);
}

valveEventClose.addEventListener("click", () => {
  closeLensOverlay(valveEventOverlay);
});

// 220x380 뷰박스 기준 좌표. 천장 0~70 / 벽 70~320 / 바닥 320~380
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
  openLensOverlay(alarmEventOverlay, obj);
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
    closeLensOverlay(alarmEventOverlay);
    showMessage(obj.message);
    setTimeout(() => flyToNotebook(messageBubble), 300);
  }, 500);
}

alarmEventClose.addEventListener("click", () => {
  closeLensOverlay(alarmEventOverlay);
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

  openLensOverlay(extinguisherEventOverlay, obj);
}

function pullExtinguisherPin() {
  playSound("success", 0.4);
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
  playSound("spray", 0.5);
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
    closeLensOverlay(extinguisherEventOverlay);
    showMessage(obj.message);
    setTimeout(() => flyToNotebook(messageBubble), 300);
  }, 700);
}

extinguisherEventClose.addEventListener("click", () => {
  cancelExtinguisherHold();
  closeLensOverlay(extinguisherEventOverlay);
});

// 배관 5개가 Z자로 꺾인 경로를 이루도록 고정된 모양/회전/그리드 위치를 정의
// (straight: 일자 배관, bent: 꺾이는 배관 - 서로 다른 모양이라 교체 시 같은 종류의 새 배관이 필요함)
const PIPE_SHAPE_MAP = [
  { type: "straight", rotate: 0, col: 1, row: 1 },
  { type: "bent", rotate: 0, col: 2, row: 1 },
  { type: "straight", rotate: 90, col: 2, row: 2 },
  { type: "bent", rotate: 180, col: 2, row: 3 },
  { type: "straight", rotate: 0, col: 3, row: 3 },
];

let pipeRoom = null;
let pipeObj = null;
let pipeFixedCount = 0;
let pipeDrag = null; // { supplyEl, pointerId, startX, startY }

function buildPipeCrackSvg() {
  return `
    <svg class="pipe-crack-svg" viewBox="0 0 30 34" aria-hidden="true">
      <path d="M15 1 L9 15 L18 18 L7 33 L12 17 L4 15 L15 1 Z" class="pipe-crack-shape"></path>
    </svg>
  `;
}

function openPipeEvent(room, obj) {
  if (state.phase !== "playing") return;

  pipeRoom = room;
  pipeObj = obj;
  pipeFixedCount = 0;
  pipeDrag = null;

  const indices = Array.from({ length: PIPE_SHAPE_MAP.length }, (_, i) => i);
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }
  const crackedSet = new Set(indices.slice(0, PIPE_CRACK_COUNT));

  pipeRowEl.innerHTML = "";
  PIPE_SHAPE_MAP.forEach((spec, i) => {
    const segment = document.createElement("div");
    segment.className = `pipe-segment ${spec.type}`;
    segment.dataset.index = i;
    segment.dataset.pieceType = spec.type;
    segment.style.gridColumn = spec.col;
    segment.style.gridRow = spec.row;
    segment.style.setProperty("--pipe-rotate", `${spec.rotate}deg`);

    const body = document.createElement("div");
    body.className = "pipe-segment-body";
    segment.appendChild(body);

    if (crackedSet.has(i)) {
      segment.classList.add("cracked");
      segment.insertAdjacentHTML("beforeend", buildPipeCrackSvg());
    }

    pipeRowEl.appendChild(segment);
  });

  pipeSupplyRowEl.innerHTML = "";
  crackedSet.forEach((i) => {
    const spec = PIPE_SHAPE_MAP[i];
    const supply = document.createElement("div");
    supply.className = `pipe-supply ${spec.type}`;
    supply.dataset.pieceType = spec.type;
    const body = document.createElement("div");
    body.className = "pipe-supply-body";
    supply.appendChild(body);
    pipeSupplyRowEl.appendChild(supply);
    bindPipeSupplyDrag(supply);
  });

  pipeProgressText.textContent = `0 / ${PIPE_CRACK_COUNT}`;

  openLensOverlay(pipeEventOverlay, obj);
}

function getPipeSegmentAt(x, y) {
  const el = document.elementFromPoint(x, y);
  return el ? el.closest(".pipe-segment") : null;
}

function updatePipeDropHighlight(x, y, supplyEl) {
  pipeRowEl.querySelectorAll(".pipe-segment.drop-target-hover").forEach((p) => p.classList.remove("drop-target-hover"));
  const segment = getPipeSegmentAt(x, y);
  const isValidTarget =
    segment &&
    segment.classList.contains("cracked") &&
    !segment.classList.contains("fixed") &&
    segment.dataset.pieceType === supplyEl.dataset.pieceType;

  if (isValidTarget) {
    segment.classList.add("drop-target-hover");
    // 교체될 배관의 회전값에 맞춰 드래그 중인 새 배관도 자연스럽게 회전
    supplyEl.style.setProperty("--pipe-rotate", segment.style.getPropertyValue("--pipe-rotate") || "0deg");
  } else {
    supplyEl.style.setProperty("--pipe-rotate", "0deg");
  }
}

function bindPipeSupplyDrag(supplyEl) {
  supplyEl.addEventListener("pointerdown", (e) => {
    if (supplyEl.classList.contains("used") || pipeDrag) return;
    e.preventDefault();
    supplyEl.setPointerCapture(e.pointerId);
    supplyEl.style.transition = "none";
    supplyEl.classList.add("dragging");
    supplyEl.style.setProperty("--pipe-rotate", "0deg");
    pipeDrag = { supplyEl, pointerId: e.pointerId, startX: e.clientX, startY: e.clientY };
  });

  supplyEl.addEventListener("pointermove", (e) => {
    if (!pipeDrag || pipeDrag.supplyEl !== supplyEl || e.pointerId !== pipeDrag.pointerId) return;
    const dx = e.clientX - pipeDrag.startX;
    const dy = e.clientY - pipeDrag.startY;
    supplyEl.style.transform = `translate(${dx}px, ${dy}px)`;
    updatePipeDropHighlight(e.clientX, e.clientY, supplyEl);
  });

  function endPipeDrag(e) {
    if (!pipeDrag || pipeDrag.supplyEl !== supplyEl || e.pointerId !== pipeDrag.pointerId) return;
    pipeDrag = null;
    // dragging 클래스(및 pointer-events:none)를 떼기 전에 먼저 판정해야 드래그 중인 배관 자신이
    // elementFromPoint를 가리지 않음
    const segment = getPipeSegmentAt(e.clientX, e.clientY);
    supplyEl.classList.remove("dragging");
    pipeRowEl.querySelectorAll(".pipe-segment.drop-target-hover").forEach((p) => p.classList.remove("drop-target-hover"));

    const isMatch =
      segment &&
      segment.classList.contains("cracked") &&
      !segment.classList.contains("fixed") &&
      segment.dataset.pieceType === supplyEl.dataset.pieceType;

    if (isMatch) {
      playSound("success", 0.4);
      segment.classList.remove("cracked");
      segment.classList.add("fixed");
      const crackIcon = segment.querySelector(".pipe-crack-svg");
      if (crackIcon) crackIcon.remove();
      supplyEl.classList.add("used");
      supplyEl.style.transform = "";

      pipeFixedCount++;
      pipeProgressText.textContent = `${pipeFixedCount} / ${PIPE_CRACK_COUNT}`;
      if (pipeFixedCount >= PIPE_CRACK_COUNT) {
        completePipeEvent();
      }
    } else {
      supplyEl.style.transition = "transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)";
      supplyEl.style.transform = "";
      supplyEl.style.setProperty("--pipe-rotate", "0deg");
    }
  }

  supplyEl.addEventListener("pointerup", endPipeDrag);
  supplyEl.addEventListener("pointercancel", endPipeDrag);
}

function completePipeEvent() {
  const room = pipeRoom;
  const obj = pipeObj;
  const key = `${room.id}:${obj.id}`;

  state.interactedObjects.add(key);
  addScore(obj.points);
  state.notebookEntries.push({ roomName: room.name, objectName: obj.name, message: obj.message });
  updateNotebookBadge();
  renderRoom();

  setTimeout(() => {
    closeLensOverlay(pipeEventOverlay);
    showMessage(obj.message);
    setTimeout(() => flyToNotebook(messageBubble), 300);
  }, 700);
}

pipeEventClose.addEventListener("click", () => {
  closeLensOverlay(pipeEventOverlay);
});

const OBJECT_EVENT_HANDLERS = {
  window: openWindowEvent,
  valve: openValveEvent,
  quiz: openBookQuizEvent,
  alarm: openAlarmEvent,
  extinguisher: openExtinguisherEvent,
  pipe: openPipeEvent,
  clue: openClueEvent,
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

function movePlayerIcon(xPercent, yPercent) {
  playerIconEl.classList.remove("zoom-out");
  playerIconEl.style.left = `${xPercent}%`;
  playerIconEl.style.top = `${yPercent}%`;
  playerIconEl.classList.remove("hop");
  void playerIconEl.offsetWidth; // restart the hop animation on every move
  playerIconEl.classList.add("hop");
}

function hopPlayerIcon() {
  playerIconEl.classList.remove("hop");
  void playerIconEl.offsetWidth; // restart the hop animation on every landing
  playerIconEl.classList.add("hop");
}

function resetPlayerIconPosition(instant) {
  if (instant) playerIconEl.classList.add("no-anim");
  playerIconEl.classList.remove("zoom-out", "hop");
  playerIconEl.style.left = "50%";
  playerIconEl.style.top = "86%";
  if (instant) {
    void playerIconEl.offsetWidth; // force the jump to apply before re-enabling the transition
    playerIconEl.classList.remove("no-anim");
  }
}

// 돋보기(플레이어 아이콘)가 오브젝트 위치에서 확대되며 이벤트 화면이 그 안에서 열리는 것처럼 연출
function openLensOverlay(overlayEl, obj) {
  playSound("open", 0.5);
  playerIconEl.style.left = `${obj.x}%`;
  playerIconEl.style.top = `${obj.y}%`;
  playerIconEl.classList.remove("hop", "zoom-out");
  void playerIconEl.offsetWidth; // restart the zoom-out animation on every open
  playerIconEl.classList.add("zoom-out");

  overlayEl.style.transformOrigin = `${obj.x}% ${obj.y}%`;
  overlayEl.classList.add("visible");
}

function closeLensOverlay(overlayEl) {
  overlayEl.classList.remove("visible");
  playerIconEl.classList.remove("zoom-out");
}

// 배경 사진 속 오브젝트의 실제 위치(imgX/imgY, 이미지 원본 기준 %)를,
// background-size:contain으로 화면에 표시된 사진의 레터박스를 감안해 현재 화면 비율에 맞는 % 좌표로 변환
function mapImageRectToContainer(room, obj, containerW, containerH) {
  const scale = Math.min(containerW / room.bgW, containerH / room.bgH);
  const dispW = room.bgW * scale;
  const dispH = room.bgH * scale;
  const offsetX = (containerW - dispW) / 2;
  const offsetY = (containerH - dispH) / 2;

  return {
    x: ((offsetX + (obj.imgX / 100) * dispW) / containerW) * 100,
    y: ((offsetY + (obj.imgY / 100) * dispH) / containerH) * 100,
    w: ((obj.imgW / 100) * dispW / containerW) * 100,
    h: ((obj.imgH / 100) * dispH / containerH) * 100,
  };
}

function renderRoom() {
  const room = ROOMS[state.roomIndex];

  roomBg.setAttribute("data-label", room.name);
  roomBg.classList.toggle("has-photo", Boolean(room.bg));
  roomBg.style.backgroundImage = room.bg ? `url("${room.bg}")` : "";
  roomNameEl.textContent = room.name;

  const prevRoom = ROOMS[state.roomIndex - 1];
  const nextRoom = ROOMS[state.roomIndex + 1];
  if (room.id === "outside") {
    roomArrowLeft.classList.remove("disabled");
    roomArrowLeft.setAttribute("aria-label", "거실로 돌아가기");
  } else {
    roomArrowLeft.classList.toggle("disabled", Boolean(room.doorOnly || state.roomIndex === 0 || (prevRoom && prevRoom.doorOnly)));
    roomArrowLeft.setAttribute("aria-label", "이전 방으로 이동");
  }
  roomArrowRight.classList.toggle("disabled", Boolean(room.doorOnly || state.roomIndex === ROOMS.length - 1 || (nextRoom && nextRoom.doorOnly)));

  roomObjectsEl.innerHTML = "";
  const containerRect = room.bg ? roomObjectsEl.getBoundingClientRect() : null;
  room.objects.forEach((obj) => {
    const key = `${room.id}:${obj.id}`;
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "room-object";
    if (obj.type === "door") btn.classList.add("door");
    if (state.interactedObjects.has(key)) btn.classList.add("checked");

    if (room.bg && obj.imgX !== undefined && containerRect.width && containerRect.height) {
      const rect = mapImageRectToContainer(room, obj, containerRect.width, containerRect.height);
      btn.style.left = `${rect.x}%`;
      btn.style.top = `${rect.y}%`;
      btn.style.width = `${rect.w}%`;
      btn.style.height = `${rect.h}%`;
    } else {
      btn.style.left = `${obj.x}%`;
      btn.style.top = `${obj.y}%`;
      if (obj.hitW && obj.hitH) {
        btn.style.width = `${obj.hitW}%`;
        btn.style.height = `${obj.hitH}%`;
      }
    }

    btn.innerHTML = `<span class="room-object-placeholder">${obj.name}</span>`;
    btn.addEventListener("click", () => handleObjectClick(room, obj));
    roomObjectsEl.appendChild(btn);
  });
}

let resizeRenderTimer = null;
window.addEventListener("resize", () => {
  clearTimeout(resizeRenderTimer);
  resizeRenderTimer = setTimeout(() => {
    if (ROOMS[state.roomIndex]) renderRoom();
  }, 150);
});

let roomTransitionLock = false;

function slideToRoomIndex(nextIndex, direction) {
  if (roomTransitionLock) return;
  if (nextIndex < 0 || nextIndex >= ROOMS.length || nextIndex === state.roomIndex) return;

  roomTransitionLock = true;
  playSound("walk", 0.35);
  hideMessage();

  const exitX = direction > 0 ? "-100%" : "100%";
  const entryX = direction > 0 ? "100%" : "-100%";
  const leanClass = direction > 0 ? "run-left" : "run-right";

  roomView.style.transform = `translateX(${exitX})`;
  playerIconEl.classList.remove("hop", "run-left", "run-right");
  void playerIconEl.offsetWidth; // restart the lean animation on every transition
  playerIconEl.classList.add(leanClass);

  setTimeout(() => {
    state.roomIndex = nextIndex;
    renderRoom();
    resetPlayerIconPosition(true);

    roomView.classList.add("no-transition");
    roomView.style.transform = `translateX(${entryX})`;
    void roomView.offsetWidth; // force reflow so the jump isn't animated
    roomView.classList.remove("no-transition");
    roomView.style.transform = "translateX(0)";

    playerIconEl.classList.remove("run-left", "run-right");
    void playerIconEl.offsetWidth; // restart the lean animation for the entry leg too
    playerIconEl.classList.add(leanClass);

    setTimeout(() => {
      playerIconEl.classList.remove("run-left", "run-right");
      roomTransitionLock = false;
      hopPlayerIcon();
    }, 250);
  }, 250);
}

function fadeToRoomIndex(nextIndex) {
  if (roomTransitionLock) return;
  if (nextIndex < 0 || nextIndex >= ROOMS.length || nextIndex === state.roomIndex) return;

  roomTransitionLock = true;
  playSound("walk", 0.35);
  hideMessage();

  roomView.classList.add("door-fade-out");

  setTimeout(() => {
    state.roomIndex = nextIndex;
    renderRoom();
    resetPlayerIconPosition(true);

    roomView.classList.remove("door-fade-out");
    roomView.classList.add("door-fade-in");

    setTimeout(() => {
      roomView.classList.remove("door-fade-in");
      roomTransitionLock = false;
      hopPlayerIcon();
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

roomArrowLeft.addEventListener("click", () => {
  if (ROOMS[state.roomIndex].id === "outside") {
    goToRoomById("living-room");
    return;
  }
  goToRoom(-1);
});
roomArrowRight.addEventListener("click", () => goToRoom(1));

// 방 안 어디를 터치하든 돋보기(플레이어 아이콘)가 그 위치로 이동
roomView.addEventListener("click", (e) => {
  if (roomTransitionLock) return;
  // 오브젝트 클릭은 버튼 탭 효과음이 이미 따로 재생되므로, 빈 자리를 눌렀을 때만 효과음을 추가로 재생
  if (!e.target.closest(".room-object")) playSound("click", 0.25);
  const rect = roomView.getBoundingClientRect();
  const xPercent = ((e.clientX - rect.left) / rect.width) * 100;
  const yPercent = ((e.clientY - rect.top) / rect.height) * 100;
  movePlayerIcon(xPercent, yPercent);
});

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
    <span class="suspect-icon-wrap"><img class="suspect-icon" src="${suspect.image}" alt="${suspect.name}"></span>
    <div class="suspect-info">
      <div class="suspect-name-row">
        <span class="suspect-name">${suspect.name}</span>
        <span class="suspect-role">${suspect.role}</span>
      </div>
      <span class="suspect-alibi">${suspect.alibi}</span>
    </div>
  `;
  if (clickable) {
    el.addEventListener("click", () => resolveAccusation(suspect.id, el));
  }
  return el;
}

function assignCulprit() {
  state.culpritId = SUSPECTS[Math.floor(Math.random() * SUSPECTS.length)].id;
  state.correctGuess = null;
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

  openLensOverlay(quizOverlay, obj);
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
    closeLensOverlay(quizOverlay);
    showMessage(quiz.explanation);
  }, 2000);
}

quizChoiceLeft.addEventListener("click", () => resolveBookQuiz(0));
quizChoiceRight.addEventListener("click", () => resolveBookQuiz(1));

// 남은 시간을 점수로 환산: 상단 타이머 바가 0으로 줄어드는 동안 HUD 점수가 그만큼 실시간으로 올라감
// (범인 선택 화면이 뜨기 전, 게임이 끝난 직후에 재생됨)
function playTimeBonusConversion(onComplete) {
  const startTime = state.timeRemaining;
  const bonus = Math.round(startTime) * TIME_BONUS_PER_SECOND;

  if (bonus <= 0) {
    state.timeRemaining = 0;
    updateTimerDisplay();
    onComplete();
    return;
  }

  const baseScore = state.score;
  const duration = 1600;
  const startAt = performance.now();

  function tick(now) {
    const progress = Math.min(1, (now - startAt) / duration);
    state.timeRemaining = startTime * (1 - progress);
    updateTimerDisplay();
    scoreEl.textContent = `${baseScore + Math.round(bonus * progress)}`;

    if (progress < 1) {
      requestAnimationFrame(tick);
    } else {
      state.timeRemaining = 0;
      updateTimerDisplay();
      state.score = baseScore + bonus;
      scoreEl.textContent = `${state.score}`;
      onComplete();
    }
  }
  requestAnimationFrame(tick);
}

function enterAccusationPhase() {
  if (state.phase !== "playing") return;
  state.phase = "accusation";

  notebookBtn.classList.add("hidden");
  closeNotebook();
  windowEventOverlay.classList.remove("visible");
  valveEventOverlay.classList.remove("visible");
  alarmEventOverlay.classList.remove("visible");
  pipeEventOverlay.classList.remove("visible");
  quizOverlay.classList.remove("visible");
  hideClueAlert();
  playerIconEl.classList.remove("zoom-out");
  hideMessage();

  playTimeBonusConversion(() => {
    timerBarWrap.classList.add("hidden");

    playIntroLine(ACCUSATION_INTRO_LINE, {
      unblurAfter: false,
      onComplete: () => {
        roomStage.classList.add("hidden");
        roomStage.classList.remove("intro-blur");

        accusationList.innerHTML = "";
        SUSPECTS.forEach((suspect, index) => {
          accusationList.appendChild(renderSuspectCard(suspect, true, index));
        });
        accusationOverlay.classList.remove("hidden");
        accusationResolving = false;
      },
    });
  });
}

let accusationResolving = false;

function resolveAccusation(suspectId, cardEl) {
  if (state.phase !== "accusation" || accusationResolving) return;
  accusationResolving = true;

  state.correctGuess = suspectId === state.culpritId;
  if (state.correctGuess) {
    state.score += 1000;
  }

  accusationOverlay.classList.add("choosing");
  Array.from(accusationList.children).forEach((card) => {
    if (card !== cardEl) card.classList.add("suspect-card-fade");
  });

  if (cardEl) {
    const firstRect = cardEl.getBoundingClientRect();
    cardEl.classList.add("chosen");
    const lastRect = cardEl.getBoundingClientRect();

    const scaleX = firstRect.width / lastRect.width;
    const scaleY = firstRect.height / lastRect.height;
    const translateX = firstRect.left + firstRect.width / 2 - (lastRect.left + lastRect.width / 2);
    const translateY = firstRect.top + firstRect.height / 2 - (lastRect.top + lastRect.height / 2);

    cardEl.style.transition = "none";
    cardEl.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scaleX}, ${scaleY})`;
    void cardEl.offsetWidth; // apply the inverted transform before enabling the transition
    cardEl.style.transition = "";
    cardEl.classList.add("chosen-animate");
    cardEl.style.transform = "";
  }

  setTimeout(() => {
    accusationOverlay.classList.add("hidden");
    accusationOverlay.classList.remove("choosing");
    endGame();
  }, 950);
}

const INTRO_LINE = "그럼 추리를 시작하지";
const ACCUSATION_INTRO_LINE = "이제 범인을 맞춰볼까?";
let introLineTimer = null;

// 화면을 흐리게 만들고 문구를 한 글자씩 타이핑한 뒤, unblurAfter가 true면 블러를 풀어 방을 다시 선명하게 보여주고
// false면 블러가 켜진 채로 onComplete를 실행해(다음 화면 전환 등) 이어지도록 함
function playIntroLine(text, { unblurAfter = true, onComplete } = {}) {
  clearTimeout(introLineTimer);
  introLineText.textContent = "";

  // 흐려지는 과정 없이 처음부터 이미 흐린 상태로 시작하고, 끝날 때만 부드럽게 풀리도록 함
  roomStage.classList.add("no-transition");
  roomStage.classList.add("intro-blur");
  void roomStage.offsetWidth; // 위 블러가 트랜지션 없이 즉시 적용되도록 강제 리플로우
  roomStage.classList.remove("no-transition");

  introLineOverlay.classList.add("visible");
  playSound("type", 0.4);

  let i = 0;
  function typeNext() {
    if (i < text.length) {
      introLineText.textContent += text[i];
      i++;
      introLineTimer = setTimeout(typeNext, 140);
    } else {
      introLineTimer = setTimeout(() => {
        introLineOverlay.classList.remove("visible");
        if (unblurAfter) roomStage.classList.remove("intro-blur");
        if (onComplete) onComplete();
      }, 700);
    }
  }
  typeNext();
}

function playInvestigationIntro() {
  playIntroLine(INTRO_LINE, {
    onComplete: () => {
      state.phase = "playing";
    },
  });
}

function startGame() {
  state.started = true;
  playBackgroundMusic();
  // 추리 시작 인트로 문구가 사라질 때까지는 "intro" 단계로 두어 타이머가 흐르지 않도록 함 (playInvestigationIntro 완료 시 "playing"으로 전환)
  // TODO: 카운트다운 임시 비활성화. 복구하려면 "countdown"으로 되돌리고 countdownOverlay를 보여주면 됨
  state.phase = "intro";
  state.countdown = COUNTDOWN_SECONDS;
  state.timeRemaining = TIME_LIMIT;
  state.score = 0;
  state.roomIndex = STARTING_ROOM_INDEX;
  state.interactedObjects = new Set();
  state.notebookEntries = [];
  windowTapProgress = {};
  usedQuizIndices = new Set();

  endScreen.classList.add("hidden");
  accusationOverlay.classList.add("hidden");
  quizOverlay.classList.remove("visible");
  closeNotebook();
  windowEventOverlay.classList.remove("visible");
  valveEventOverlay.classList.remove("visible");
  alarmEventOverlay.classList.remove("visible");
  pipeEventOverlay.classList.remove("visible");
  playerIconEl.classList.remove("zoom-out");
  updateNotebookBadge();
  hideMessage();
  hideClueAlert();
  timerBarWrap.classList.remove("hidden");
  countdownOverlay.classList.add("hidden");
  roomStage.classList.remove("hidden");
  notebookBtn.classList.remove("hidden");
  updateTimerDisplay();
  renderRoom();
  resetPlayerIconPosition(true);
  hudScoreDisplayed = 0;
  scoreEl.textContent = `${state.score}`;
  playInvestigationIntro();
}

let hudScoreDisplayed = 0;
let hudScoreAnimId = null;

function animateHudScore(target, duration = 2400) {
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
    scoreEl.textContent = `${hudScoreDisplayed}`;

    if (progress < 1) {
      hudScoreAnimId = requestAnimationFrame(tick);
    } else {
      hudScoreDisplayed = target;
      scoreEl.textContent = `${target}`;
      hudScoreAnimId = null;
    }
  }
  hudScoreAnimId = requestAnimationFrame(tick);
}

function addScore(amount, { silent = false } = {}) {
  if (state.phase !== "playing") return;
  state.score += amount;
  setTimeout(() => {
    if (!silent) playSound("success", 0.4);
    animateHudScore(state.score);
  }, 500);
}

const DETECTIVE_TITLES = [
  { minScore: 3000, title: "전설의 탐정", color: "#ff6b6b" },
  { minScore: 2500, title: "완벽한 탐정", color: "#ffb703" },
  { minScore: 2000, title: "엄청난 탐정", color: "#c792ea" },
  { minScore: 1500, title: "훌륭한 탐정", color: "#7be09c" },
  { minScore: 1000, title: "멋진 탐정", color: "#7ee8fa" },
  { minScore: 0, title: "평범한 탐정", color: "#9aa5c9" },
];

function getDetectiveTier(score) {
  const clamped = Math.max(0, score);
  return DETECTIVE_TITLES.find((tier) => clamped >= tier.minScore);
}

function updateDetectiveTitle(score) {
  const tier = getDetectiveTier(score);
  if (detectiveTitleEl.textContent === tier.title) return;

  detectiveTitleEl.textContent = tier.title;
  detectiveTitleEl.style.color = tier.color;
  detectiveTitleEl.classList.remove("levelup");
  void detectiveTitleEl.offsetWidth; // restart the level-up pulse even if it's already mid-play
  detectiveTitleEl.classList.add("levelup");
  playSound("success", 0.5);
}

function animateScoreCountUp(target, duration = 3000, onComplete) {
  const startTime = performance.now();

  function tick(now) {
    const progress = Math.min(1, (now - startTime) / duration);
    const eased = 1 - Math.pow(1 - progress, 3);
    const displayed = Math.round(target * eased);
    finalScoreEl.textContent = displayed;
    updateDetectiveTitle(displayed);
    if (progress < 1) {
      requestAnimationFrame(tick);
    } else if (onComplete) {
      onComplete();
    }
  }
  requestAnimationFrame(tick);
}

function endGame() {
  if (state.phase === "ended") return;

  state.phase = "ended";
  state.started = false;

  playSound("success", 0.5);

  countdownOverlay.classList.add("hidden");
  timerBarWrap.classList.add("hidden");
  accusationOverlay.classList.add("hidden");
  quizOverlay.classList.remove("visible");
  roomStage.classList.add("hidden");
  notebookBtn.classList.add("hidden");
  closeNotebook();
  windowEventOverlay.classList.remove("visible");
  valveEventOverlay.classList.remove("visible");
  alarmEventOverlay.classList.remove("visible");
  pipeEventOverlay.classList.remove("visible");
  playerIconEl.classList.remove("zoom-out");
  hideMessage();
  hideClueAlert();
  clearTimeout(introLineTimer);
  roomStage.classList.remove("intro-blur");
  introLineOverlay.classList.remove("visible");

  const culprit = SUSPECTS.find((s) => s.id === state.culpritId);
  endScreen.classList.remove("result-success", "result-fail", "result-neutral");

  if (state.correctGuess === true) {
    endScreen.classList.add("result-success");
    endTitleEl.textContent = "사건 해결!";
    culpritIconEl.src = culprit.image;
    culpritIconEl.alt = culprit.name;
    culpritNameEl.textContent = `${culprit.name} (${culprit.role})`;
    culpritCard.classList.remove("hidden");
    endMessageEl.textContent = culprit.tip;
  } else if (state.correctGuess === false) {
    endScreen.classList.add("result-fail");
    endTitleEl.textContent = "추리 실패...";
    culpritIconEl.src = culprit.image;
    culpritIconEl.alt = culprit.name;
    culpritNameEl.textContent = `${culprit.name} (${culprit.role})`;
    culpritCard.classList.remove("hidden");
    endMessageEl.textContent = culprit.tip;
  } else {
    endScreen.classList.add("result-neutral");
    endTitleEl.textContent = "안전 점검 완료!";
    culpritCard.classList.add("hidden");
    endMessageEl.textContent = "가스 냄새가 나면 불씨를 멀리하고 즉시 밸브부터 잠그세요.";
  }

  finalScoreEl.textContent = 0;
  const initialTier = getDetectiveTier(0);
  detectiveTitleEl.textContent = initialTier.title;
  detectiveTitleEl.style.color = initialTier.color;
  detectiveTitleEl.classList.remove("levelup");
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
