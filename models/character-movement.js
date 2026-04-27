/**
 * Handles all movement and attack input
 */
Character.prototype.handleMovementInput = function () {
  this.handleHorizontalInput();
  this.handleVerticalInput();
  this.handleAttackInput();
};

/**
 * Handles horizontal movement input (left/right)
 */
Character.prototype.handleHorizontalInput = function () {
  if (this.keyboard.RIGHT) {
    this.speedX = 5;
    this.otherDirection = false;
  } else if (this.keyboard.LEFT) {
    this.speedX = -5;
    this.otherDirection = true;
  } else {
    this.speedX = 0;
  }
};

/**
 * Handles vertical movement input (up/down)
 */
Character.prototype.handleVerticalInput = function () {
  if (this.keyboard.UP) {
    this.speedY = -5;
  } else if (this.keyboard.DOWN) {
    this.speedY = 5;
  } else {
    this.speedY = 0;
  }
};

/**
 * Handles attack input (normal and poison attacks)
 */
Character.prototype.handleAttackInput = function () {
  if (this.keyboard.ATTACK) {
    this.normalAttack();
  }

  if (this.keyboard.POISON) {
    this.poisonAttack();
  }
};

/**
 * Applies movement to the character position and updates camera
 */
Character.prototype.applyMovement = function () {
  this.x += this.speedX;
  this.y += this.speedY;
  this.world.camera_x = -this.x + 100;
};

/**
 * Restricts the character within world boundaries
 */
Character.prototype.clampToWorld = function () {
  if (this.x < 150) {
    this.x = 150;
  }

  if (this.x > this.world.level.level_end_x) {
    this.x = this.world.level.level_end_x;
  }

  if (this.y < -this.offset.top) {
    this.y = -this.offset.top;
  }

  if (this.y + this.height - this.offset.bottom > this.world.height) {
    this.y = this.world.height - this.height + this.offset.bottom;
  }
};
