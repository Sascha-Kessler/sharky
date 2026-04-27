/**
 * Represents the final boss enemy and controls its state flow
 */
class Endboss extends MovableObject {
  IMAGES_FLOATING = ENDBOSS_IMAGES.FLOATING;
  IMAGES_SPAWNING = ENDBOSS_IMAGES.SPAWNING;
  IMAGES_ATTACKING = ENDBOSS_IMAGES.ATTACKING;
  IMAGES_HURT = ENDBOSS_IMAGES.HURT;
  IMAGES_DEAD = ENDBOSS_IMAGES.DEAD;

  x = 2500;
  y = 100;
  height = 300;
  width = 300;

  health = 100;
  speedY = 2;

  attackSpeedX = 8;
  attackDistance = 200;
  attackStartX = 0;
  attackTargetX = 0;
  attackCooldown = 5000;

  offset = {
    top: 100,
    left: 0,
    right: 0,
    bottom: 45,
  };

  currentImage = 0;
  frameCounter = 0;
  floatingFrameDelay = 12;

  hadFirstContact = false;
  isSpawning = false;
  spawnAnimationFinished = false;
  spawningIndex = 0;
  spawnFrameDelay = 5;

  currentImageDead = 0;
  deadAnimationCounter = 0;
  deadAnimationDelay = 8;
  deadAnimationFinished = false;

  isHurt = false;
  currentImageHurt = 0;
  hurtAnimationCounter = 0;
  hurtAnimationDelay = 6;

  isAttacking = false;
  attackPhase = "none";
  currentImageAttack = 0;
  attackAnimationCounter = 0;
  attackAnimationDelay = 6;

  /**
   * Creates a new endboss and loads all animation images
   */
  constructor() {
    super();
    this.loadImage(this.IMAGES_SPAWNING[0]);
    this.loadImages(this.IMAGES_FLOATING);
    this.loadImages(this.IMAGES_SPAWNING);
    this.loadImages(this.IMAGES_ATTACKING);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.lastAttack = Date.now();
  }

  /**
   * Connects the endboss to the world and character
   * @param {World} world
   */
  setWorld(world) {
    this.world = world;
    this.character = world.character;
  }

  /**
   * Updates the endboss state each frame
   */
  update() {
    if (this.dead) return this.updateDeadAnimation();
    if (this.isHurt) return this.updateHurtAnimation();

    this.checkFirstContact();

    if (this.isSpawning) return this.updateSpawningAnimation();
    if (this.isAttacking) return this.updateAttackMovement();

    this.handleAttackCooldown();
    this.updateFloatingAnimation();
    this.clampToWorld();
    this.autoMove();
  }

  /**
   * Starts an attack when the cooldown has passed
   */
  handleAttackCooldown() {
    if (Date.now() - this.lastAttack > this.attackCooldown) {
      this.startAttack();
      this.lastAttack = Date.now();
    }
  }

  /**
   * Marks the endboss as dead and resets death animation
   */
  die() {
    if (this.dead) return;

    this.dead = true;
    this.currentImageDead = 0;
    this.deadAnimationCounter = 0;
    this.deadAnimationFinished = false;
  }

  /**
   * Updates hurt animation while the endboss is damaged
   */
  updateHurtAnimation() {
    this.hurtAnimationCounter++;

    if (this.hurtAnimationCounter >= this.hurtAnimationDelay) {
      this.hurtAnimationCounter = 0;

      const path = this.IMAGES_HURT[this.currentImageHurt];
      this.img = this.imageCache[path];
      this.currentImageHurt++;

      if (this.currentImageHurt >= this.IMAGES_HURT.length) {
        this.isHurt = false;
        this.currentImageHurt = 0;
      }
    }
  }

  /**
   * Applies damage to the endboss
   * @param {number} damage
   */
  hit(damage) {
    if (this.dead) return;

    this.health -= damage;

    if (this.health <= 0) return this.kill();

    this.startHurtAnimation();
  }

  /**
   * Sets health to zero and triggers death
   */
  kill() {
    this.health = 0;
    this.die();
  }

  /**
   * Starts the hurt animation
   */
  startHurtAnimation() {
    if (this.isHurt) return;

    this.isHurt = true;
    this.currentImageHurt = 0;
    this.hurtAnimationCounter = 0;
  }
}
