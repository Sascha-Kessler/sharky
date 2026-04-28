/**
 * Manages all player input (keyboard, mouse, and touch)
 */
class InputManager {
  /**
   * @param {Keyboard} keyboard - Shared keyboard state object
   */
  constructor(keyboard) {
    this.keyboard = keyboard;

    /**
     * Maps keyboard keys to internal actions
     * @type {Object<string, string>}
     */
    this.keyMap = {
      ArrowLeft: "LEFT",
      ArrowRight: "RIGHT",
      ArrowUp: "UP",
      ArrowDown: "DOWN",
      Space: "ATTACK",
      KeyB: "POISON",
      KeyV: "FIN_SLAP",
    };

    window.addEventListener("keydown", (e) => this.handleKey(e, true));
    window.addEventListener("keyup", (e) => this.handleKey(e, false));

    this.initTouchControls();

    window.addEventListener("pointerup", () => this.resetTouchKeys());
    window.addEventListener("pointercancel", () => this.resetTouchKeys());
    window.addEventListener("blur", () => this.resetTouchKeys());
  }

  /**
   * Handles keyboard input and updates state
   * @param {KeyboardEvent} event
   * @param {boolean} isPressed
   */
  handleKey(event, isPressed) {
    const key = this.keyMap[event.code];
    if (key) {
      this.keyboard[key] = isPressed;
    }
  }

  /**
   * Initializes touch and mouse controls for mobile buttons
   */
  initTouchControls() {
    const buttons = document.querySelectorAll(".touch-btn");

    buttons.forEach((btn) => {
      const key = btn.dataset.key;
      if (!key) return;

      btn.addEventListener(
        "touchstart",

        (e) => {
          if (e.cancelable) {
            e.preventDefault();
          }

          this.keyboard[key] = true;
        },

        { passive: false },
      );

      btn.addEventListener("touchend", () => {
        this.keyboard[key] = false;
      });

      btn.addEventListener("touchcancel", () => {
        this.keyboard[key] = false;
      });

      btn.addEventListener("mousedown", () => {
        this.keyboard[key] = true;
      });

      btn.addEventListener("mouseup", () => {
        this.keyboard[key] = false;
      });

      btn.addEventListener("mouseleave", () => {
        this.keyboard[key] = false;
      });
    });

    window.addEventListener("touchend", () => this.resetTouchKeys());
    window.addEventListener("mouseup", () => this.resetTouchKeys());
    window.addEventListener("blur", () => this.resetTouchKeys());
  }

  /**
   * Resets all input states to prevent stuck keys
   */
  resetTouchKeys() {
    this.keyboard.LEFT = false;
    this.keyboard.RIGHT = false;
    this.keyboard.UP = false;
    this.keyboard.DOWN = false;
    this.keyboard.ATTACK = false;
    this.keyboard.POISON = false;
    this.keyboard.FINSLAP = false;
  }
}
