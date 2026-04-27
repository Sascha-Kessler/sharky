/**
 * Handles keyboard input and updates the keyboard state
 */
class InputManager {
  /**
   * Creates a new input manager
   * @param {Keyboard} keyboard
   */
  constructor(keyboard) {
    this.keyboard = keyboard;

    this.keyMap = {
      ArrowLeft: "LEFT",
      ArrowRight: "RIGHT",
      ArrowUp: "UP",
      ArrowDown: "DOWN",
      Space: "ATTACK",
      KeyB: "POISON",
    };

    window.addEventListener("keydown", (e) => this.handleKey(e, true));
    window.addEventListener("keyup", (e) => this.handleKey(e, false));
  }

  /**
   * Updates keyboard state based on key events
   * @param {KeyboardEvent} event
   * @param {boolean} isPressed
   */
  handleKey(event, isPressed) {
    const key = this.keyMap[event.code];

    if (key) {
      this.keyboard[key] = isPressed;
    }
  }
}
