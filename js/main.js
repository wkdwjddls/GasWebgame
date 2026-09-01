let lastTime = 0;

function loop(timestamp) {
  const dt = (timestamp - lastTime) / 1000;
  lastTime = timestamp;

  update(Math.min(dt, 0.1));

  requestAnimationFrame(loop);
}

const cutsceneOverlay = document.getElementById("incident-cutscene");
const cutsceneLines = Array.from(document.querySelectorAll(".cutscene-line"));
let cutsceneRevealIndex = 0;

const today = new Date();
document.getElementById("cutscene-date").textContent = `${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일`;

function revealNextCutsceneLine() {
  if (cutsceneRevealIndex < cutsceneLines.length) {
    cutsceneLines[cutsceneRevealIndex].classList.add("revealed");
    cutsceneRevealIndex++;
  }
}

cutsceneOverlay.addEventListener("click", () => {
  if (cutsceneRevealIndex < cutsceneLines.length) {
    revealNextCutsceneLine();
    return;
  }
  cutsceneOverlay.classList.add("hidden");
  stopWarningLoop();
  assignCulprit();
  startGame();
});

document.getElementById("start-btn").addEventListener("click", () => {
  document.getElementById("start-screen").classList.add("hidden");

  cutsceneRevealIndex = 0;
  cutsceneLines.forEach((line) => line.classList.remove("revealed"));
  cutsceneOverlay.classList.remove("hidden");
  playWarningLoop();
  revealNextCutsceneLine();

  lastTime = performance.now();
  requestAnimationFrame(loop);
});

document.getElementById("end-game-btn").addEventListener("click", () => {
  enterAccusationPhase();
});

document.getElementById("restart-btn").addEventListener("click", () => {
  document.getElementById("end-screen").classList.add("hidden");
  document.getElementById("start-screen").classList.remove("hidden");
});
