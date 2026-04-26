Character.prototype.normalAttack = function () {
  if (this.dead) return;
  if (this.isHurt) return;
  if (this.isAttacking) return;
  if (this.isAttackingPoison) return;

  this.isAttacking = true;
  this.currentImageNormalAttack = 0;
  this.attackAnimationCounter = 0;
  this.attackBubbleThrown = false;
};

Character.prototype.poisonAttack = function () {
  if (this.poisonBottles === 0) return;

  if (this.dead) return;
  if (this.isHurt) return;
  if (this.isAttacking) return;
  if (this.isAttackingPoison) return;

  this.isAttackingPoison = true;
  this.currentImageNormalAttack = 0;
  this.attackAnimationCounter = 0;
  this.attackBubbleThrown = false;
};

Character.prototype.updateNormalAttackAnimation = function () {
  this.attackAnimationCounter++;

  if (this.attackAnimationCounter >= this.attackAnimationDelay) {
    this.attackAnimationCounter = 0;

    const path =
      this.IMAGES_ATTACK_NORMAL_BUBBLE[this.currentImageNormalAttack];
    this.img = this.imageCache[path];

    if (
      !this.attackBubbleThrown &&
      this.currentImageNormalAttack ===
        this.IMAGES_ATTACK_NORMAL_BUBBLE.length - 1
    ) {
      this.world.throwObject("normal");
      this.attackBubbleThrown = true;
    }

    this.currentImageNormalAttack++;

    if (
      this.currentImageNormalAttack >= this.IMAGES_ATTACK_NORMAL_BUBBLE.length
    ) {
      this.isAttacking = false;
      this.currentImageNormalAttack = 0;
    }
  }
};

Character.prototype.updatePoisonAttackAnimation = function () {
  this.attackAnimationCounter++;

  if (this.attackAnimationCounter >= this.attackAnimationDelay) {
    this.attackAnimationCounter = 0;

    const path =
      this.IMAGES_ATTACK_POISON_BUBBLE[this.currentImageNormalAttack];
    this.img = this.imageCache[path];

    if (
      !this.attackBubbleThrown &&
      this.currentImageNormalAttack ===
        this.IMAGES_ATTACK_POISON_BUBBLE.length - 1
    ) {
      this.world.throwObject("poison");
      this.attackBubbleThrown = true;

      this.poisonBottles--;
      this.world.poisonbar.poisonbarUpdate(this.poisonBottles);
    }

    this.currentImageNormalAttack++;

    if (
      this.currentImageNormalAttack >= this.IMAGES_ATTACK_POISON_BUBBLE.length
    ) {
      this.isAttackingPoison = false;
      this.currentImageNormalAttack = 0;
    }
  }
};
