/**
 * Resets the attack animation state
 */
Character.prototype.resetAttackState = function () {
  this.currentImageNormalAttack = 0;
  this.attackAnimationCounter = 0;
  this.attackBubbleThrown = false;
};

/**
 * Starts a fin slap attack
 */
Character.prototype.finSlapAttack = function () {
  if (
    this.dead ||
    this.isHurt ||
    this.isAttacking ||
    this.isAttackingPoison ||
    this.isFinSlapAttacking
  )
    return;

  this.isFinSlapAttacking = true;
  this.resetAttackState();
};

/**
 * Starts a normal bubble attack
 */
Character.prototype.normalAttack = function () {
  if (
    this.dead ||
    this.isHurt ||
    this.isAttacking ||
    this.isAttackingPoison ||
    this.isFinSlapAttacking
  )
    return;

  this.isAttacking = true;
  this.resetAttackState();
};

/**
 * Starts a poison bubble attack if poison bottles are available
 */
Character.prototype.poisonAttack = function () {
  if (this.poisonBottles === 0) return;

  if (
    this.dead ||
    this.isHurt ||
    this.isAttacking ||
    this.isAttackingPoison ||
    this.isFinSlapAttacking
  )
    return;

  this.isAttackingPoison = true;
  this.resetAttackState();
};

/**
 * Updates the fin slap attack animation
 */
Character.prototype.updateFinSlapAttack = function () {
  this.updateAttackFrame(this.IMAGES_ATTACK_FIN_SLAP);

  if (this.currentImageNormalAttack >= this.IMAGES_ATTACK_FIN_SLAP.length) {
    this.isFinSlapAttacking = false;
    this.currentImageNormalAttack = 0;
  }
};

/**
 * Updates the normal bubble attack animation
 */
Character.prototype.updateNormalAttack = function () {
  this.updateAttackFrame(this.IMAGES_ATTACK_NORMAL_BUBBLE, "normal");

  if (
    this.currentImageNormalAttack >= this.IMAGES_ATTACK_NORMAL_BUBBLE.length
  ) {
    this.isAttacking = false;
    this.currentImageNormalAttack = 0;
  }
};

/**
 * Updates the poison bubble attack animation
 */
Character.prototype.updatePoisonAttack = function () {
  this.updateAttackFrame(this.IMAGES_ATTACK_POISON_BUBBLE, "poison");

  if (
    this.currentImageNormalAttack >= this.IMAGES_ATTACK_POISON_BUBBLE.length
  ) {
    this.isAttackingPoison = false;
    this.currentImageNormalAttack = 0;
  }
};

/**
 * Updates the current attack frame and triggers a bubble throw if needed
 * @param {string[]} images - Attack animation image paths
 * @param {string} type - Attack type used for throwable bubbles
 */
Character.prototype.updateAttackFrame = function (images, type) {
  this.attackAnimationCounter++;

  if (this.attackAnimationCounter < this.attackAnimationDelay) return;

  this.attackAnimationCounter = 0;

  const path = images[this.currentImageNormalAttack];
  this.img = this.imageCache[path];

  this.tryThrowBubble(images, type);

  this.currentImageNormalAttack++;
};

/**
 * Throws a bubble at the correct animation frame if an attack type is given
 * @param {string[]} images - Attack animation image paths
 * @param {string} type - Attack type used for throwable bubbles
 */
Character.prototype.tryThrowBubble = function (images, type) {
  if (!type) return;
  const isLastFrame = this.currentImageNormalAttack === images.length - 1;

  if (!this.attackBubbleThrown && isLastFrame) {
    this.world.throwObject(type);
    this.attackBubbleThrown = true;

    if (type === "poison") {
      this.poisonBottles--;
      this.world.poisonbar.updatePoison(this.poisonBottles);
    }
  }
};
