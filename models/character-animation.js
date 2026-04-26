Character.prototype.updateAnimation = function () {
  if (this.dead) {
    this.updateDeadAnimation();
    return;
  }

  if (this.isHurt) {
    this.updateHurtAnimation();
    return;
  }

  if (this.isAttacking) {
    this.updateNormalAttackAnimation();
    return;
  }

  if (this.isAttackingPoison) {
    this.updatePoisonAttackAnimation();
    return;
  }

  if (this.speedX === 0 && this.speedY === 0) {
    this.updateIdleAnimation();
    return;
  }

  this.updateSwimAnimation();
};

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

Character.prototype.updateSwimAnimation = function () {
  if (this.dead || this.isHurt) return;
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
    }
  }
};

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
