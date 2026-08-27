const Input = {
  direction: { x: 0, y: 0 },
};

(function setupTouchDrag() {
  const surface = document.getElementById("game-container");
  const maxRadius = 40;

  let activeTouchId = null;
  let originX = 0;
  let originY = 0;

  function findTouch(touchList) {
    for (const touch of touchList) {
      if (touch.identifier === activeTouchId) return touch;
    }
    return null;
  }

  function handleStart(e) {
    if (activeTouchId !== null) return;
    const touch = e.changedTouches[0];
    activeTouchId = touch.identifier;
    originX = touch.clientX;
    originY = touch.clientY;
  }

  function handleMove(e) {
    const touch = findTouch(e.changedTouches);
    if (!touch) return;
    e.preventDefault();

    let dx = touch.clientX - originX;
    let dy = touch.clientY - originY;
    const dist = Math.hypot(dx, dy);
    if (dist > maxRadius) {
      dx = (dx / dist) * maxRadius;
      dy = (dy / dist) * maxRadius;
    }
    Input.direction.x = dx / maxRadius;
    Input.direction.y = dy / maxRadius;
  }

  function handleEnd(e) {
    const touch = findTouch(e.changedTouches);
    if (!touch) return;
    activeTouchId = null;
    Input.direction.x = 0;
    Input.direction.y = 0;
  }

  surface.addEventListener("touchstart", handleStart, { passive: true });
  surface.addEventListener("touchmove", handleMove, { passive: false });
  surface.addEventListener("touchend", handleEnd, { passive: true });
  surface.addEventListener("touchcancel", handleEnd, { passive: true });
})();
