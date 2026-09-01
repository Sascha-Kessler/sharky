class CharacterMovement {
  constructor(character) {
    this.character = character;
  }

  /**
   * Handles all movement and attack input
   */
  handleMovementInput() {
    this.handleHorizontalInput();
    this.handleVerticalInput();
    this.handleAttackInput();
  }

  /**
   * Handles horizontal movement input (left/right)
   */
  handleHorizontalInput() {
    const char = this.character;

    if (char.keyboard.RIGHT) {
      char.speedX = 5;
      char.otherDirection = false;
    } else if (char.keyboard.LEFT) {
      char.speedX = -5;
      char.otherDirection = true;
    } else {
      char.speedX = 0;
    }
  }

  /**
   * Handles vertical movement input (up/down)
   */
  handleVerticalInput() {
    const char = this.character;

    if (char.keyboard.UP) {
      char.speedY = -5;
    } else if (char.keyboard.DOWN) {
      char.speedY = 5;
    } else {
      char.speedY = 0;
    }
  }

  /**
   * Handles attack input (normal, poison and fin slap attacks)
   */
  handleAttackInput() {
    const char = this.character;
    if (char.isUnableToAct()) return;

    if (char.keyboard.ATTACK) {
      char.attack.normalAttack();
    }

    if (char.keyboard.POISON) {
      char.attack.poisonAttack();
    }

    if (char.keyboard.FIN_SLAP) {
      char.attack.finSlapAttack();
    }
  }

  /**
   * Applies movement to the character position and updates camera
   */
  applyMovement() {
    const char = this.character;

    char.x += char.speedX;
    char.y += char.speedY;
    char.world.camera_x = -char.x + 100;
  }

  /**
   * Restricts the character within world boundaries
   */
  clampToWorld() {
    const char = this.character;

    if (char.x < 150) {
      char.x = 150;
    }

    if (char.x > char.world.level.level_end_x) {
      char.x = char.world.level.level_end_x;
    }

    if (char.y < -char.offset.top) {
      char.y = -char.offset.top;
    }

    if (char.y + char.height - char.offset.bottom > char.world.height) {
      char.y = char.world.height - char.height + char.offset.bottom;
    }
  }
}
