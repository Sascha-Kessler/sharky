/**
 * Handles all movement-related functionality for the character including:
 * - Input processing for movement and attacks
 * - Position updates
 * - World boundary clamping
 * - Camera synchronization
 * @class
 */
class CharacterMovement {
  /**
   * Creates a new movement controller for a character
   * @param {Character} character - The character instance to control
   */
  constructor(character) {
    this.character = character;
  }

  /**
   * Processes all input for movement and attacks
   * Calls the individual input handlers in sequence
   * @returns {void}
   */
  handleMovementInput() {
    this.handleHorizontalInput();
    this.handleVerticalInput();
    this.handleAttackInput();
  }

  /**
   * Processes horizontal movement input (left/right arrows)
   * Sets the character's speedX and otherDirection based on input
   * @returns {void}
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
   * Processes vertical movement input (up/down arrows)
   * Sets the character's speedY based on input
   * @returns {void}
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
   * Processes attack input (normal, poison, fin slap)
   * Only processes attacks if the character is able to act
   * @returns {void}
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
   * Applies the current movement to the character's position
   * and updates the camera position accordingly
   * @returns {void}
   */
  applyMovement() {
    const char = this.character;

    char.x += char.speedX;
    char.y += char.speedY;
    char.world.camera_x = -char.x + 100;
  }

  /**
   * Ensures the character stays within the world boundaries
   * Calls all clamping methods to restrict movement
   * @returns {void}
   */
  clampToWorld() {
    this.clampXMin();
    this.clampXMax();
    this.clampYMin();
    this.clampYMax();
  }

  /**
   * Prevents the character from moving beyond the left boundary
   * @returns {void}
   */
  clampXMin() {
    if (this.character.x < 150) {
      this.character.x = 150;
    }
  }

  /**
   * Prevents the character from moving beyond the right boundary
   * @returns {void}
   */
  clampXMax() {
    if (this.character.x > this.character.world.level.level_end_x) {
      this.character.x = this.character.world.level.level_end_x;
    }
  }

  /**
   * Prevents the character from moving above the top boundary
   * @returns {void}
   */
  clampYMin() {
    if (this.character.y < -this.character.offset.top) {
      this.character.y = -this.character.offset.top;
    }
  }

  /**
   * Prevents the character from moving below the bottom boundary
   * @returns {void}
   */
  clampYMax() {
    if (
      this.character.y + this.character.height - this.character.offset.bottom >
      this.character.world.height
    ) {
      this.character.y =
        this.character.world.height -
        this.character.height +
        this.character.offset.bottom;
    }
  }
}
