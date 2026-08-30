let lastTime = 0;

function loop(timestamp) {
  const dt = (timestamp - lastTime) / 1000;
  lastTime = timestamp;

  update(Math.min(dt, 0.1));

  requestAnimationFrame(loop);
}

const cutsceneOverlay = document.getElementById("incident-cutscene");
const cutsceneLines = Array.from(document.querySelectorAll(".cutscene-line"));
const cutsceneHint = document.getElementById("cutscene-hint");
let cutsceneRevealIndex = 0;

function revealNextCutsceneLine() {
  if (cutsceneRevealIndex < cutsceneLines.length) {
    cutsceneLines[cutsceneRevealIndex].classList.add("revealed");
    cutsceneRevealIndex++;
  }
  if (cutsceneRevealIndex >= cutsceneLines.length) {
    cutsceneHint.classList.add("revealed");
  }
}

cutsceneOverlay.addEventListener("click", () => {
  if (cutsceneRevealIndex < cutsceneLines.length) {
    revealNextCutsceneLine();
    return;
  }
  cutsceneOverlay.classList.add("hidden");
  showSuspectIntro();
});

document.getElementById("start-btn").addEventListener("click", () => {
  document.getElementById("start-screen").classList.add("hidden");

  cutsceneRevealIndex = 0;
  cutsceneLines.forEach((line) => line.classList.remove("revealed"));
  cutsceneHint.classList.remove("revealed");
  cutsceneOverlay.classList.remove("hidden");
  revealNextCutsceneLine();

  lastTime = performance.now();
  requestAnimationFrame(loop);
});

document.getElementById("intro-start-btn").addEventListener("click", () => {
  document.getElementById("suspect-intro-overlay").classList.add("hidden");
  startGame();
});

document.getElementById("add-score-btn").addEventListener("click", () => {
  addScore(10);
});

document.getElementById("end-game-btn").addEventListener("click", () => {
  enterAccusationPhase();
});

document.getElementById("restart-btn").addEventListener("click", () => {
  document.getElementById("end-screen").classList.add("hidden");
  document.getElementById("start-screen").classList.remove("hidden");
});
