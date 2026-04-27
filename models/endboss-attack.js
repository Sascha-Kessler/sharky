/**
 * Starts the attack sequence
 */
Endboss.prototype.startAttack = function () {
  this.isAttacking = true;
  this.attackPhase = "forward";

  this.attackStartX = this.x;
  this.attackTargetX = this.x - this.attackDistance;

  this.currentImageAttack = 0;
  this.attackAnimationCounter = 0;
};

/**
 * Updates attack movement based on current phase
 */
Endboss.prototype.updateAttackMovement = function () {
  if (this.attackPhase === "forward") return this.handleAttackForward();
  if (this.attackPhase === "animate") return this.updateAttackAnimation();
  if (this.attackPhase === "backward") return this.handleAttackBackward();
};

/**
 * Handles forward attack movement
 */
Endboss.prototype.handleAttackForward = function () {
  this.x -= this.attackSpeedX;
  this.setImageFromArray(this.IMAGES_ATTACKING, 0);

  if (this.x <= this.attackTargetX) {
    this.x = this.attackTargetX;
    this.attackPhase = "animate";
  }
};

/**
 * Updates attack animation frames
 */
Endboss.prototype.updateAttackAnimation = function () {
  if (!this.shouldUpdateFrame(this.attackAnimationDelay)) return;

  const i = this.currentImageAttack % this.IMAGES_ATTACKING.length;
  this.setImageFromArray(this.IMAGES_ATTACKING, i);

  this.currentImageAttack++;

  if (this.isAttackAnimationFinished()) {
    this.resetAttackAnimation();
    this.attackPhase = "backward";
  }
};

/**
 * Checks if attack animation reached the end
 */
Endboss.prototype.isAttackAnimationFinished = function () {
  return (
    this.attackPhase === "animate" &&
    this.currentImageAttack >= this.IMAGES_ATTACKING.length
  );
};

/**
 * Resets attack animation index
 */
Endboss.prototype.resetAttackAnimation = function () {
  this.currentImageAttack = 0;
};

/**
 * Handles backward movement after attack
 */
Endboss.prototype.handleAttackBackward = function () {
  this.x += this.attackSpeedX;

  if (this.x >= this.attackStartX) {
    this.finishAttack();
  }
};

/**
 * Resets attack state after finishing
 */
Endboss.prototype.finishAttack = function () {
  this.x = this.attackStartX;
  this.isAttacking = false;
  this.attackPhase = "none";
  this.currentImageAttack = 0;
  this.frameCounter = 0;
};
