const Input = {
  keys: new Set(),

  isDown(key) {
    return this.keys.has(key.toLowerCase());
  },
};

window.addEventListener("keydown", (e) => Input.keys.add(e.key.toLowerCase()));
window.addEventListener("keyup", (e) => Input.keys.delete(e.key.toLowerCase()));
