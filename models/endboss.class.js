class Endboss extends MovableObject {
  // =========================
  // Animation Image Sets
  // =========================
  IMAGES_FLOATING = ENDBOSS_IMAGES.FLOATING;
  IMAGES_SPAWNING = ENDBOSS_IMAGES.SPAWNING;
  IMAGES_ATTACKING = ENDBOSS_IMAGES.ATTACKING;
  IMAGES_HURT = ENDBOSS_IMAGES.HURT;
  IMAGES_DEAD = ENDBOSS_IMAGES.DEAD;

  // =========================
  // Position and Size
  // =========================

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

  offset = {
    top: 100,
    left: 0,
    right: 0,
    bottom: 45,
  };

  attackCooldown = 5000; // ms

  // =========================
  // Animation
  // =========================
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
  attackPhase = "none"; // "forward", "animate", "backward"
  currentImageAttack = 0;
  attackAnimationCounter = 0;
  attackAnimationDelay = 6;

  // =========================
  // Constructor
  // =========================
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

  // =========================
  // World Reference
  // =========================
  setWorld(world) {
    this.world = world;
    this.character = world.character;
  }

  // =========================
  // Main Update Flow
  // =========================
  update() {
    if (this.dead) {
      this.updateDeadAnimation();
      return;
    }

    if (this.isHurt) {
      this.updateHurtAnimation();
      return;
    }

    this.checkFirstContact();

    if (this.isSpawning) {
      this.updateSpawningAnimation();
      return;
    }

    if (this.isAttacking) {
      this.updateAttackMovement();
      return;
    }

    if (Date.now() - this.lastAttack > this.attackCooldown) {
      this.startAttack();
      this.lastAttack = Date.now();
    }

    this.updateFloatingAnimation();
    this.clampToWorld();
    this.autoMove();
  }

  die() {
    if (this.dead) return;

    this.dead = true;
    this.currentImageDead = 0;
    this.deadAnimationCounter = 0;
    this.deadAnimationFinished = false;
  }

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

  hit(damage) {
    if (this.dead) return;

    this.health -= damage;

    if (this.health <= 0) {
      this.health = 0;
      this.die();
      return;
    }

    if (!this.isHurt) {
      this.isHurt = true;
      this.currentImageHurt = 0;
      this.hurtAnimationCounter = 0;
    }
  }
}
