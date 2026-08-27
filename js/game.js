const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");
const scoreEl = document.getElementById("score");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

const state = {
  started: false,
  score: 0,
  player: {
    x: 100,
    y: 100,
    size: 32,
    speed: 240,
  },
};

function startGame() {
  state.started = true;
}

function update(dt) {
  if (!state.started) return;

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

  scoreEl.textContent = `Score: ${state.score}`;
}
