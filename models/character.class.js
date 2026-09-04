/**
 * Main player character controlling movement, animations and state
 */
class Character extends MovableObject {
  IMAGES_SWIMMING = SHARKIE_IMAGES.SWIMMING;
  IMAGES_IDLE = SHARKIE_IMAGES.IDLE;
  IMAGES_LONG_IDLE = SHARKIE_IMAGES.LONG_IDLE;
  IMAGES_HURT = SHARKIE_IMAGES.HURT;
  IMAGES_DEAD = SHARKIE_IMAGES.DEAD;
  IMAGES_ATTACK_FIN_SLAP = SHARKIE_IMAGES.ATTACK_FIN_SLAP;
  IMAGES_ATTACK_NORMAL_BUBBLE = SHARKIE_IMAGES.ATTACK_NORMAL_BUBBLE;
  IMAGES_ATTACK_POISON_BUBBLE = SHARKIE_IMAGES.ATTACK_POISON_BUBBLE;
  IMAGES_ATTACK_WITHOUT_BUBBLE = SHARKIE_IMAGES.ATTACK_WITHOUT_BUBBLE;

  x = 120;
  y = 200;
  height = 220;
  width = 220;

  offset = {
    top: 120,
    left: 45,
    right: 50,
    bottom: 55,
  };

  currentImageIdle = 0;
  currentImage = 0;
  currentImageDead = 0;
  currentImageHurt = 0;
  currentImageNormalAttack = 0;

  speedX = 0;
  speedY = 0;

  lastHit = 0;
  invincibleTime = 1500;
  health = 100;
  coins = 0;
  poisonBottles = 0;

  dead = false;
  isHurt = false;
  isAttacking = false;
  isAttackingPoison = false;
  isFinSlapAttacking = false;

  idleAnimationCounter = 0;
  idleAnimationDelay = 12;

  frameCounter = 0;
  swimFrameDelay = 10;

  deadAnimationCounter = 0;
  deadAnimationDelay = 10;
  deadAnimationFinished = false;

  hurtAnimationCounter = 0;
  hurtAnimationDelay = 6;
  hurtAnimationFinished = false;

  attackAnimationCounter = 0;
  attackAnimationDelay = 6;
  attackBubbleThrown = false;

  /**
   * Creates a new Character instance with initial position and state
   * @param {Keyboard} keyboard - Input handler for processing player controls
   * @param {World} world - Reference to the game world containing level and enemies
   */
  constructor(keyboard, world) {
    super();
    this.world = world;
    this.keyboard = keyboard;
    this.movement = new CharacterMovement(this);
    this.attack = new CharacterAttack(this);
    this.animation = new CharacterAnimation(this);

    this.loadImage("../img/1.Sharkie/3.Swim/1.png");
    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_SWIMMING);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_ATTACK_FIN_SLAP);
    this.loadImages(this.IMAGES_ATTACK_NORMAL_BUBBLE);
    this.loadImages(this.IMAGES_ATTACK_POISON_BUBBLE);
    this.loadImages(this.IMAGES_ATTACK_WITHOUT_BUBBLE);
  }

  /**
   * Updates character state each frame including movement, attacks, and animations
   * Only processes updates if character is alive and boss is not dead
   * @returns {void}
   */
  update() {
    const boss = this.world.enemies.find((e) => e instanceof Endboss);

    if (!this.dead && !boss?.dead) {
      this.movement.handleMovementInput();
      this.movement.applyMovement();
      this.movement.clampToWorld();
    }

    this.animation.updateAnimation();
  }

  /**
   * Checks if the character is still in the invincibility period after taking damage
   * @returns {boolean} True if invincibility period is active, false otherwise
   */
  isHurtCooldownActive() {
    const now = Date.now();
    return now - this.lastHit < this.invincibleTime;
  }

  /**
   * Transitions the character to the dead state
   * Resets movement and prepares death animation
   * @returns {void}
   */
  die() {
    if (this.dead) return;

    this.dead = true;
    this.speedX = 0;
    this.speedY = 0;
    this.currentImageDead = 0;
    this.deadAnimationCounter = 0;
    this.deadAnimationFinished = false;
  }

  /**
   * Transitions the character to the hurt state
   * Starts the hurt animation sequence
   * @returns {void}
   */
  hurt() {
    if (this.dead) return;
    if (this.isHurt) return;

    this.isHurt = true;
    this.currentImageHurt = 0;
    this.hurtAnimationCounter = 0;
  }

  /**
   * Determines if the character is currently unable to act due to:
   * - Being dead
   * - Being hurt
   * - Performing an attack
   * @returns {boolean} True if character cannot act, false otherwise
   */
  isUnableToAct() {
    return (
      this.dead ||
      this.isHurt ||
      this.isAttacking ||
      this.isAttackingPoison ||
      this.isFinSlapAttacking
    );
  }
}
