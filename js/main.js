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
