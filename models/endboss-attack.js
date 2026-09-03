/**
 * Controls all attack behavior for the Endboss including:
 * - Attack initiation and phase management
 * - Forward movement toward player
 * - Attack animation display
 * - Return movement to starting position
 * @class
 */
class EndbossAttack {
  /**
   * Creates a new attack controller for an Endboss
   * @param {Endboss} endboss - The Endboss instance to control attacks for
   */
  constructor(endboss) {
    this.endboss = endboss;
  }

  /**
   * Initiates a new attack sequence
   * Sets up initial attack parameters and transitions to forward phase
   * @returns {void}
   */
  startAttack() {
    this.endboss.isAttacking = true;
    this.endboss.attackPhase = "forward";

    this.endboss.attackStartX = this.endboss.x;
    this.endboss.attackTargetX = this.endboss.x - this.endboss.attackDistance;

    this.endboss.currentImageAttack = 0;
  }

  /**
   * Updates the attack movement based on current attack phase
   * Routes to appropriate phase handler:
   * - "forward": Movement toward player
   * - "animate": Animation display
   * - "backward": Return to starting position
   * @returns {void}
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
   * Handles the forward movement phase of the attack
   * Moves the endboss toward the player's position at attack speed
   * @returns {void}
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
   * Updates the attack animation frames during the animation phase
   * @returns {void}
   */
  updateAttackAnimation() {
    if (!this.shouldUpdateAttackFrame()) return;

    this.updateAttackFrame();

    this.checkAttackAnimationEnd();
  }

  /**
   * Determines if the attack animation frame should be updated
   * @returns {boolean} True if frame should be updated, false otherwise
   */
  shouldUpdateAttackFrame() {
    return this.endboss.animation.shouldUpdateFrame(
      this.endboss.attackAnimationDelay,
    );
  }

  /**
   * Updates to the next frame in the attack animation sequence
   * @returns {void}
   */
  updateAttackFrame() {
    const i =
      this.endboss.currentImageAttack % this.endboss.IMAGES_ATTACKING.length;
    this.endboss.animation.setImageFromArray(this.endboss.IMAGES_ATTACKING, i);
    this.endboss.currentImageAttack++;
  }

  /**
   * Checks if the attack animation has completed and transitions to backward phase if so
   * @returns {boolean} True if animation finished and phase changed, false otherwise
   */
  checkAttackAnimationEnd() {
    if (this.isAttackAnimationFinished()) {
      this.resetAttackAnimation();
      this.endboss.attackPhase = "backward";
      return true;
    }
    return false;
  }

  /**
   * Determines if the attack animation has reached its final frame
   * @returns {boolean} True if animation is finished, false otherwise
   */
  isAttackAnimationFinished() {
    return (
      this.endboss.attackPhase === "animate" &&
      this.endboss.currentImageAttack >= this.endboss.IMAGES_ATTACKING.length
    );
  }

  /**
   * Resets the attack animation index to prepare for next sequence
   * @returns {void}
   */
  resetAttackAnimation() {
    this.endboss.currentImageAttack = 0;
  }

  /**
   * Handles the backward movement phase after the attack animation completes
   * Moves the endboss back to its starting position
   * @returns {void}
   */
  handleAttackBackward() {
    this.endboss.x += this.endboss.attackSpeedX;

    if (this.endboss.x >= this.endboss.attackStartX) {
      this.finishAttack();
    }
  }

  /**
   * Completes the attack sequence and resets attack state
   * Returns the endboss to its original position and clears attack flags
   * @returns {void}
   */
  finishAttack() {
    this.endboss.x = this.endboss.attackStartX;
    this.endboss.isAttacking = false;
    this.endboss.attackPhase = "none";
    this.endboss.currentImageAttack = 0;
    this.endboss.frameCounter = 0;
  }
}
