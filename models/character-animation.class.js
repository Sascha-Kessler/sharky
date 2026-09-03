/**
 * Manages all animation states and transitions for the character
 * @class
 */
class CharacterAnimation {
  /**
   * Creates a new animation controller for a character
   * @param {Character} character - The character instance to animate
   */
  constructor(character) {
    this.character = character;
  }

  /**
   * Determines and updates the appropriate animation based on character state
   * Priority order: death > hurt > attack > movement
   * @returns {void}
   */
  updateAnimation() {
    const char = this.character;

    if (char.dead) return this.updateDeadAnimation();
    if (char.isHurt) return this.updateHurtAnimation();
    if (this.updateAttackAnimation(char)) return;

    this.updateMovementAnimation(char);
  }

  /**
   * Handles attack animations based on current attack state
   * @param {Character} char - The character instance
   * @returns {boolean} True if an attack animation is playing, false otherwise
   */
  updateAttackAnimation(char) {
    const attackAnimations = [
      [char.isAttacking, "updateNormalAttack"],
      [char.isAttackingPoison, "updatePoisonAttack"],
      [char.isFinSlapAttacking, "updateFinSlapAttack"],
    ];
    const activeAttack = attackAnimations.find(([isActive]) => isActive);

    if (!activeAttack) return false;
    char.attack[activeAttack[1]]();

    return true;
  }

  /**
   * Updates animation based on movement state
   * @param {Character} char - The character instance
   */
  updateMovementAnimation(char) {
    const isIdle = char.speedX === 0 && char.speedY === 0;

    isIdle ? this.updateIdleAnimation() : this.updateSwimAnimation();
  }

  /**
   * Updates idle animation when character is stationary
   * @returns {void}
   */
  updateIdleAnimation() {
    const char = this.character;

    char.idleAnimationCounter++;

    if (char.idleAnimationCounter >= char.idleAnimationDelay) {
      char.idleAnimationCounter = 0;
      const i = char.currentImageIdle % char.IMAGES_IDLE.length;
      const path = char.IMAGES_IDLE[i];
      char.img = char.imageCache[path];
      char.currentImageIdle++;
    }
  }

  /**
   * Updates swimming animation when character is moving
   * @returns {void}
   */
  updateSwimAnimation() {
    const char = this.character;

    if (char.speedX === 0 && char.speedY === 0) return;

    char.frameCounter++;

    if (char.frameCounter >= char.swimFrameDelay) {
      char.frameCounter = 0;

      this.updateSwimFrame(char);
    }
  }

  /**
   * Updates a single frame of the swimming animation
   * @param {Character} char - The character instance
   * @returns {void}
   */
  updateSwimFrame(char) {
    if (char.frameCounter < char.swimFrameDelay) return;

    char.frameCounter = 0;
    const i = char.currentImage % char.IMAGES_SWIMMING.length;
    const path = char.IMAGES_SWIMMING[i];
    char.img = char.imageCache[path];
    char.currentImage++;
  }

  /**
   * Updates hurt animation when character takes damage
   * @returns {void}
   */
  updateHurtAnimation() {
    const char = this.character;
    char.hurtAnimationCounter++;
    if (char.hurtAnimationCounter < char.hurtAnimationDelay) return;
    char.hurtAnimationCounter = 0;
    const path = char.IMAGES_HURT[char.currentImageHurt];
    char.img = char.imageCache[path];
    char.currentImageHurt++;
    if (char.currentImageHurt >= char.IMAGES_HURT.length) {
      this.finishHurtAnimation(char);
    }
  }

  /**
   * Resets character state after hurt animation completes
   * @param {Character} char - The character instance
   * @returns {void}
   */
  finishHurtAnimation(char) {
    char.isHurt = false;
    char.currentImageHurt = 0;
    char.currentImageIdle = 0;
    const path = char.IMAGES_IDLE[0];
    char.img = char.imageCache[path];
  }

  /**
   * Updates death animation sequence until completion
   * @returns {void}
   */
  updateDeadAnimation() {
    const char = this.character;
    if (char.deadAnimationFinished) return;
    char.deadAnimationCounter++;
    if (char.deadAnimationCounter < char.deadAnimationDelay) return;
    char.deadAnimationCounter = 0;
    this.updateDeadFrame(char);
  }

  /**
   * Updates a single frame of the death animation
   * @param {Character} char - The character instance
   * @returns {void}
   */
  updateDeadFrame(char) {
    const path = char.IMAGES_DEAD[char.currentImageDead];
    char.img = char.imageCache[path];
    char.currentImageDead++;
    if (char.currentImageDead >= char.IMAGES_DEAD.length) {
      this.finishDeadAnimation(char);
    }
  }

  /**
   * Finalizes the death animation and sets character state
   * @param {Character} char - The character instance
   * @returns {void}
   */
  finishDeadAnimation(char) {
    char.currentImageDead = char.IMAGES_DEAD.length - 1;
    char.deadAnimationFinished = true;
  }
}
