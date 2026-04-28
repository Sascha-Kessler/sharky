/**
 * Controls which animation should be played based on the current state
 */
Character.prototype.updateAnimation = function () {
  if (this.dead) return this.updateDeadAnimation();
  if (this.isHurt) return this.updateHurtAnimation();
  if (this.isAttacking) return this.updateNormalAttack();
  if (this.isAttackingPoison) return this.updatePoisonAttack();
  if (this.isFinSlapAttacking) return this.updateFinSlapAttack();

  if (this.speedX === 0 && this.speedY === 0) {
    return this.updateIdleAnimation();
  }

  this.updateSwimAnimation();
};

/**
 * Updates idle animation when character is not moving
 */
Character.prototype.updateIdleAnimation = function () {
  this.idleAnimationCounter++;

  if (this.idleAnimationCounter >= this.idleAnimationDelay) {
    this.idleAnimationCounter = 0;

    const i = this.currentImageIdle % this.IMAGES_IDLE.length;
    const path = this.IMAGES_IDLE[i];
    this.img = this.imageCache[path];
    this.currentImageIdle++;
  }
};

/**
 * Updates swimming animation while character is moving
 */
Character.prototype.updateSwimAnimation = function () {
  if (this.speedX === 0 && this.speedY === 0) return;

  this.frameCounter++;

  if (this.frameCounter >= this.swimFrameDelay) {
    this.frameCounter = 0;

    const i = this.currentImage % this.IMAGES_SWIMMING.length;
    const path = this.IMAGES_SWIMMING[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }
};

/**
 * Updates hurt animation when character is damaged
 */
Character.prototype.updateHurtAnimation = function () {
  this.hurtAnimationCounter++;

  if (this.hurtAnimationCounter >= this.hurtAnimationDelay) {
    this.hurtAnimationCounter = 0;

    const path = this.IMAGES_HURT[this.currentImageHurt];
    this.img = this.imageCache[path];

    this.currentImageHurt++;

    if (this.currentImageHurt >= this.IMAGES_HURT.length) {
      this.isHurt = false;
      this.currentImageHurt = 0;
      this.currentImageIdle = 0;
      const path = this.IMAGES_IDLE[0];

      this.img = this.imageCache[path];
    }
  }
};

/**
 * Updates death animation until it finishes
 */
Character.prototype.updateDeadAnimation = function () {
  if (this.deadAnimationFinished) return;

  this.deadAnimationCounter++;

  if (this.deadAnimationCounter >= this.deadAnimationDelay) {
    this.deadAnimationCounter = 0;

    const path = this.IMAGES_DEAD[this.currentImageDead];
    this.img = this.imageCache[path];

    this.currentImageDead++;

    if (this.currentImageDead >= this.IMAGES_DEAD.length) {
      this.currentImageDead = this.IMAGES_DEAD.length - 1;
      this.deadAnimationFinished = true;
    }
  }
};
