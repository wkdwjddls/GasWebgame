let lastTime = 0;

function loop(timestamp) {
  const dt = (timestamp - lastTime) / 1000;
  lastTime = timestamp;

  update(Math.min(dt, 0.1));
  render();

  requestAnimationFrame(loop);
}

document.getElementById("start-btn").addEventListener("click", () => {
  document.getElementById("start-screen").classList.add("hidden");

  startGame();

  lastTime = performance.now();
  requestAnimationFrame(loop);
});

document.getElementById("add-score-btn").addEventListener("click", () => {
  addScore(10);
});

document.getElementById("end-game-btn").addEventListener("click", () => {
  endGame();
});

document.getElementById("restart-btn").addEventListener("click", () => {
  document.getElementById("end-screen").classList.add("hidden");
  document.getElementById("start-screen").classList.remove("hidden");
});
