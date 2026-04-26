class InputManager {
  constructor(keyboard) {
    this.keyboard = keyboard;

    window.addEventListener("keydown", (e) => this.handleKey(e, true));
    window.addEventListener("keyup", (e) => this.handleKey(e, false));
  }

  handleKey(event, isPressed) {
    switch (event.code) {
      case "ArrowLeft":
        this.keyboard.LEFT = isPressed;
        break;

      case "ArrowRight":
        this.keyboard.RIGHT = isPressed;
        break;

      case "ArrowUp":
        this.keyboard.UP = isPressed;
        break;

      case "ArrowDown":
        this.keyboard.DOWN = isPressed;
        break;

      case "Space":
        this.keyboard.ATTACK = isPressed;
        break;

      case "KeyB":
        this.keyboard.POISON = isPressed;
        break;
    }
  }
}
