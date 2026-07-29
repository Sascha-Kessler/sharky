class EndbossAttack {
  constructor(endboss) {
    this.endboss = endboss;
  }

  startAttack() {
    this.endboss.isAttacking = true;
    this.endboss.attackPhase = "forward";

    this.endboss.attackStartX = this.endboss.x;
    this.endboss.attackTargetX = this.endboss.x - this.endboss.attackDistance;

    this.endboss.currentImageAttack = 0;
  }

  /**
   * Updates attack movement based on current phase
   */
  updateAttackMovement() {
    if (this.endboss.attackPhase === "forward")
      return this.handleAttackForward();
    if (this.endboss.attackPhase === "animate")
      return this.updateAttackAnimation();
    if (this.endboss.attackPhase === "backward")
      return this.handleAttackBackward();
  }

  /**
   * Handles forward attack movement
   */
  handleAttackForward() {
    this.endboss.x -= this.endboss.attackSpeedX;
    this.endboss.animation.setImageFromArray(this.endboss.IMAGES_ATTACKING, 0);

    if (this.endboss.x <= this.endboss.attackTargetX) {
      this.endboss.x = this.endboss.attackTargetX;
      this.endboss.attackPhase = "animate";
    }
  }

  /**
   * Updates attack animation frames
   */
  updateAttackAnimation() {
    if (
      !this.endboss.animation.shouldUpdateFrame(
        this.endboss.attackAnimationDelay,
      )
    )
      return;

    const i =
      this.endboss.currentImageAttack % this.endboss.IMAGES_ATTACKING.length;
    this.endboss.animation.setImageFromArray(this.endboss.IMAGES_ATTACKING, i);

    this.endboss.currentImageAttack++;

    if (this.isAttackAnimationFinished()) {
      this.resetAttackAnimation();
      this.endboss.attackPhase = "backward";
    }
  }

  /**
   * Checks if attack animation reached the end
   */
  isAttackAnimationFinished() {
    return (
      this.endboss.attackPhase === "animate" &&
      this.endboss.currentImageAttack >= this.endboss.IMAGES_ATTACKING.length
    );
  }

  /**
   * Resets attack animation index
   */
  resetAttackAnimation() {
    this.endboss.currentImageAttack = 0;
  }

  /**
   * Handles backward movement after attack
   */
  handleAttackBackward() {
    this.endboss.x += this.endboss.attackSpeedX;

    if (this.endboss.x >= this.endboss.attackStartX) {
      this.finishAttack();
    }
  }

  /**
   * Resets attack state after finishing
   */
  finishAttack() {
    this.endboss.x = this.endboss.attackStartX;
    this.endboss.isAttacking = false;
    this.endboss.attackPhase = "none";
    this.endboss.currentImageAttack = 0;
    this.endboss.frameCounter = 0;
  }
}
