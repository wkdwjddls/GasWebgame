(function setupRoomSwipe() {
  const stage = document.getElementById("room-stage");
  const DRAG_THRESHOLD = 60;
  const MOVE_DEADZONE = 10;

  let pointerId = null;
  let startX = 0;
  let moved = false;

  function onPointerDown(e) {
    if (pointerId !== null) return;
    pointerId = e.pointerId;
    startX = e.clientX;
    moved = false;
  }

  function onPointerMove(e) {
    if (e.pointerId !== pointerId) return;
    if (Math.abs(e.clientX - startX) > MOVE_DEADZONE) {
      moved = true;
    }
  }

  function onPointerUp(e) {
    if (e.pointerId !== pointerId) return;
    const dx = e.clientX - startX;
    pointerId = null;

    if (Math.abs(dx) >= DRAG_THRESHOLD && typeof goToRoom === "function") {
      goToRoom(dx > 0 ? -1 : 1);
    }
  }

  function onPointerCancel(e) {
    if (e.pointerId !== pointerId) return;
    pointerId = null;
  }

  function suppressClickAfterDrag(e) {
    if (moved && e.target.closest(".room-object")) {
      e.stopPropagation();
      e.preventDefault();
    }
  }

  stage.addEventListener("pointerdown", onPointerDown);
  stage.addEventListener("pointermove", onPointerMove);
  stage.addEventListener("pointerup", onPointerUp);
  stage.addEventListener("pointercancel", onPointerCancel);
  stage.addEventListener("click", suppressClickAfterDrag, true);
})();
