class CharacterAttack {
  constructor(character) {
    this.character = character;
  }

  resetAttackState() {
    const char = this.character;

    char.currentImageNormalAttack = 0;
    char.attackAnimationCounter = 0;
    char.attackBubbleThrown = false;
  }

  finSlapAttack() {
    const char = this.character;

    if (
      char.dead ||
      char.isHurt ||
      char.isAttacking ||
      char.isAttackingPoison ||
      char.isFinSlapAttacking
    )
      return;

    char.isFinSlapAttacking = true;
    char.finSlapHitDone = false;
    this.resetAttackState();
  }

  normalAttack() {
    const char = this.character;

    if (
      char.dead ||
      char.isHurt ||
      char.isAttacking ||
      char.isAttackingPoison ||
      char.isFinSlapAttacking
    )
      return;

    char.isAttacking = true;
    this.resetAttackState();
  }

  poisonAttack() {
    const char = this.character;

    if (char.poisonBottles === 0) return;

    if (
      char.dead ||
      char.isHurt ||
      char.isAttacking ||
      char.isAttackingPoison ||
      char.isFinSlapAttacking
    )
      return;

    char.isAttackingPoison = true;
    this.resetAttackState();
  }

  updateFinSlapAttack() {
    const char = this.character;

    this.updateAttackFrame(char.IMAGES_ATTACK_FIN_SLAP);

    if (char.currentImageNormalAttack >= char.IMAGES_ATTACK_FIN_SLAP.length) {
      char.isFinSlapAttacking = false;
      char.currentImageNormalAttack = 0;
      char.world.applyFinSlapDamage();
    }
  }

  updateNormalAttack() {
    const char = this.character;

    this.updateAttackFrame(char.IMAGES_ATTACK_NORMAL_BUBBLE, "normal");

    if (
      char.currentImageNormalAttack >= char.IMAGES_ATTACK_NORMAL_BUBBLE.length
    ) {
      char.isAttacking = false;
      char.currentImageNormalAttack = 0;
    }
  }

  updatePoisonAttack() {
    const char = this.character;

    this.updateAttackFrame(char.IMAGES_ATTACK_POISON_BUBBLE, "poison");

    if (
      char.currentImageNormalAttack >= char.IMAGES_ATTACK_POISON_BUBBLE.length
    ) {
      char.isAttackingPoison = false;
      char.currentImageNormalAttack = 0;
    }
  }

  updateAttackFrame(images, type) {
    const char = this.character;

    char.attackAnimationCounter++;

    if (char.attackAnimationCounter < char.attackAnimationDelay) return;

    char.attackAnimationCounter = 0;

    const path = images[char.currentImageNormalAttack];
    char.img = char.imageCache[path];

    this.tryThrowBubble(images, type);

    char.currentImageNormalAttack++;
  }

  tryThrowBubble(images, type) {
    const char = this.character;

    if (!type) return;

    const isLastFrame = char.currentImageNormalAttack === images.length - 1;

    if (!char.attackBubbleThrown && isLastFrame) {
      char.world.throwObject(type);
      char.attackBubbleThrown = true;

      if (type === "poison") {
        char.poisonBottles--;
        char.world.poisonbar.updatePoison(char.poisonBottles);
      }
    }
  }
}
