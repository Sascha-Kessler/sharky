class CharacterAnimation {
  constructor(character) {
    this.character = character;
  }

  /**
   * Controls which animation should be played based on the current state
   */
  updateAnimation() {
    const char = this.character;

    if (char.dead) return this.updateDeadAnimation();
    if (char.isHurt) return this.updateHurtAnimation();
    if (this.updateAttackAnimation(char)) return;

    this.updateMovementAnimation(char);
  }

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

  updateMovementAnimation(char) {
    const isIdle = char.speedX === 0 && char.speedY === 0;

    isIdle ? this.updateIdleAnimation() : this.updateSwimAnimation();
  }

  /**
   * Updates idle animation when character is not moving
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
   * Updates swimming animation while character is moving
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

  updateSwimFrame(char) {
    if (char.frameCounter < char.swimFrameDelay) return;

    char.frameCounter = 0;
    const i = char.currentImage % char.IMAGES_SWIMMING.length;
    const path = char.IMAGES_SWIMMING[i];
    char.img = char.imageCache[path];
    char.currentImage++;
  }

  /**
   * Updates hurt animation when character is damaged
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

  finishHurtAnimation(char) {
    char.isHurt = false;
    char.currentImageHurt = 0;
    char.currentImageIdle = 0;
    const path = char.IMAGES_IDLE[0];
    char.img = char.imageCache[path];
  }

  /**
   * Updates death animation until it finishes
   */
  updateDeadAnimation() {
    const char = this.character;
    if (char.deadAnimationFinished) return;
    char.deadAnimationCounter++;
    if (char.deadAnimationCounter < char.deadAnimationDelay) return;
    char.deadAnimationCounter = 0;
    this.updateDeadFrame(char);
  }

  updateDeadFrame(char) {
    const path = char.IMAGES_DEAD[char.currentImageDead];
    char.img = char.imageCache[path];
    char.currentImageDead++;
    if (char.currentImageDead >= char.IMAGES_DEAD.length) {
      this.finishDeadAnimation(char);
    }
  }
}
