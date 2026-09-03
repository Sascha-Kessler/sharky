/**
 * Manages all attack-related functionality for the character including:
 * - Attack state management
 * - Animation updates
 * - Bubble throwing mechanics
 * @class
 */
class CharacterAttack {
  /**
   * Creates a new attack controller for a character
   * @param {Character} character - The character instance to control attacks for
   */
  constructor(character) {
    this.character = character;
  }

  /**
   * Resets all attack-related state variables to their default values
   * @returns {void}
   */
  resetAttackState() {
    const char = this.character;

    char.currentImageNormalAttack = 0;
    char.attackAnimationCounter = 0;
    char.attackBubbleThrown = false;
  }

  /**
   * Initiates the fin slap attack animation and state
   * @returns {void}
   */
  finSlapAttack() {
    const char = this.character;

    if (char.isUnableToAct()) return;

    char.isFinSlapAttacking = true;
    char.finSlapHitDone = false;

    this.resetAttackState();
  }

  /**
   * Initiates the normal bubble attack animation and state
   * @returns {void}
   */
  normalAttack() {
    const char = this.character;

    if (char.isUnableToAct()) return;

    char.isAttacking = true;
    this.resetAttackState();
  }

  /**
   * Initiates the poison bubble attack if the character has poison bottles available
   * @returns {void}
   */
  poisonAttack() {
    const char = this.character;

    if (char.poisonBottles === 0) return;

    if (char.isUnableToAct()) return;

    char.isAttackingPoison = true;
    this.resetAttackState();
  }

  /**
   * Updates the fin slap attack animation and handles attack completion
   * @returns {void}
   */
  updateFinSlapAttack() {
    const char = this.character;

    this.updateAttackFrame(char.IMAGES_ATTACK_FIN_SLAP);

    if (char.currentImageNormalAttack >= char.IMAGES_ATTACK_FIN_SLAP.length) {
      char.isFinSlapAttacking = false;
      char.currentImageNormalAttack = 0;
      char.world.applyFinSlapDamage();
    }
  }

  /**
   * Updates the normal bubble attack animation and handles attack completion
   * @returns {void}
   */
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

  /**
   * Updates the poison bubble attack animation and handles attack completion
   * @returns {void}
   */
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

  /**
   * Updates a single frame of the attack animation and handles bubble throwing
   * @param {string[]} images - Array of image paths for the current attack animation
   * @param {string} [type] - Optional bubble type ("normal", "poison")
   * @returns {void}
   */
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

  /**
   * Attempts to throw a bubble on the last frame of an attack animation
   * @param {string[]} images - Array of image paths for the current attack animation
   * @param {string} [type] - Optional bubble type ("normal", "poison")
   * @returns {void}
   */
  tryThrowBubble(images, type) {
    const char = this.character;

    if (!type) return;

    const isLastFrame = char.currentImageNormalAttack === images.length - 1;

    if (!char.attackBubbleThrown && isLastFrame) {
      char.world.throwObject(type);
      char.attackBubbleThrown = true;
      this.handleBubbleTypeEffects(type, char);
    }
  }

  /**
   * Handles effects specific to different bubble types
   * @param {string} type - The bubble type ("poison")
   * @param {Character} char - The character instance
   * @returns {void}
   */
  handleBubbleTypeEffects(type, char) {
    if (type === "poison") {
      char.poisonBottles--;
      char.world.poisonbar.updatePoison(char.poisonBottles);
    }
  }
}
