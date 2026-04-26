Character.prototype.handleMovementInput = function () {
  if (this.keyboard.RIGHT) {
    this.speedX = 5;
    this.otherDirection = false;
  } else if (this.keyboard.LEFT) {
    this.speedX = -5;
    this.otherDirection = true;
  } else {
    this.speedX = 0;
  }

  if (this.keyboard.UP) {
    this.speedY = -5;
  } else if (this.keyboard.DOWN) {
    this.speedY = 5;
  } else {
    this.speedY = 0;
  }

  if (this.keyboard.ATTACK) {
    this.normalAttack();
  }

  if (this.keyboard.POISON) {
    this.poisonAttack();
  }
};

Character.prototype.applyMovement = function () {
  this.x += this.speedX;
  this.y += this.speedY;
  this.world.camera_x = -this.x + 100;
};

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
