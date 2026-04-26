Endboss.prototype.startAttack = function () {
  this.isAttacking = true;
  this.attackPhase = "forward";

  this.attackStartX = this.x;
  this.attackTargetX = this.x - this.attackDistance;

  this.currentImageAttack = 0;
  this.attackAnimationCounter = 0;
};

Endboss.prototype.updateAttackAnimation = function () {
  this.attackAnimationCounter++;

  if (this.attackAnimationCounter >= this.attackAnimationDelay) {
    this.attackAnimationCounter = 0;

    const i = this.currentImageAttack % this.IMAGES_ATTACKING.length;
    const path = this.IMAGES_ATTACKING[i];

    this.img = this.imageCache[path];
    this.currentImageAttack++;

    if (
      this.attackPhase === "animate" &&
      this.currentImageAttack >= this.IMAGES_ATTACKING.length
    ) {
      this.currentImageAttack = 0;
      this.attackPhase = "backward";
    }
  }
};

Endboss.prototype.updateAttackMovement = function () {
  if (this.attackPhase === "forward") {
    this.x -= this.attackSpeedX;

    const path = this.IMAGES_ATTACKING[0];
    this.img = this.imageCache[path];

    if (this.x <= this.attackTargetX) {
      this.x = this.attackTargetX;
      this.attackPhase = "animate";
    }
  } else if (this.attackPhase === "animate") {
    this.updateAttackAnimation();
  } else if (this.attackPhase === "backward") {
    this.x += this.attackSpeedX;

    if (this.x >= this.attackStartX) {
      this.x = this.attackStartX;
      this.isAttacking = false;
      this.attackPhase = "none";
      this.currentImageAttack = 0;
      this.frameCounter = 0;
    }
  }
};
