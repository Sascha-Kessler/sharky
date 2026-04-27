/**
 * Main player character controlling movement, animations and state
 */
class Character extends MovableObject {
  IMAGES_SWIMMING = SHARKIE_IMAGES.SWIMMING;
  IMAGES_IDLE = SHARKIE_IMAGES.IDLE;
  IMAGES_HURT = SHARKIE_IMAGES.HURT;
  IMAGES_DEAD = SHARKIE_IMAGES.DEAD;
  IMAGES_ATTACK_NORMAL_BUBBLE = SHARKIE_IMAGES.ATTACK_NORMAL_BUBBLE;
  IMAGES_ATTACK_POISON_BUBBLE = SHARKIE_IMAGES.ATTACK_POISON_BUBBLE;
  IMAGES_ATTACK_WITHOUT_BUBBLE = SHARKIE_IMAGES.ATTACK_WITHOUT_BUBBLE;

  x = 120;
  y = 200;
  height = 220;
  width = 220;

  offset = {
    top: 100,
    left: 35,
    right: 40,
    bottom: 45,
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
   * Creates a new Character instance
   * @param {Keyboard} keyboard - Input handler
   * @param {World} world - Game world reference
   */
  constructor(keyboard, world) {
    super();
    this.world = world;
    this.keyboard = keyboard;

    this.loadImage("../img/1.Sharkie/3.Swim/1.png");
    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_SWIMMING);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_ATTACK_NORMAL_BUBBLE);
    this.loadImages(this.IMAGES_ATTACK_POISON_BUBBLE);
    this.loadImages(this.IMAGES_ATTACK_WITHOUT_BUBBLE);
  }

  /**
   * Updates character logic each frame (movement + animation)
   */
  update() {
    const boss = this.world.enemies.find((e) => e instanceof Endboss);

    if (!this.dead && !boss?.dead) {
      this.handleMovementInput();
      this.applyMovement();
      this.clampToWorld();
    }

    this.updateAnimation();
  }

  /**
   * Checks if the character is still in the hurt cooldown phase
   * @returns {boolean}
   */
  isHurtCooldownActive() {
    const now = Date.now();
    return now - this.lastHit < this.invincibleTime;
  }

  /**
   * Triggers the death state and resets animation values
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
   * Triggers the hurt state and starts hurt animation
   */
  hurt() {
    if (this.dead) return;
    if (this.isHurt) return;

    this.isHurt = true;
    this.currentImageHurt = 0;
    this.hurtAnimationCounter = 0;
  }
}
