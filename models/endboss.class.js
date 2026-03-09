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

    this.updateFloatingAnimation();
  }

  // =========================
  // First Contact Check
  // =========================
  checkFirstContact() {
    if (!this.world) return;

    if (this.character.x > 1885 && !this.hadFirstContact) {
      this.hadFirstContact = true;
      this.isSpawning = true;
      this.spawnAnimationFinished = false;
      this.spawningIndex = 0;
      this.frameCounter = 0;
    }
  }

  // =========================
  // Spawning Animation
  // =========================
  updateSpawningAnimation() {
    if (this.spawnAnimationFinished) {
      this.isSpawning = false;
      return;
    }

    this.frameCounter++;

    if (this.frameCounter >= this.spawnFrameDelay) {
      this.frameCounter = 0;

      const path = this.IMAGES_SPAWNING[this.spawningIndex];
      this.img = this.imageCache[path];
      this.spawningIndex++;

      if (this.spawningIndex >= this.IMAGES_SPAWNING.length) {
        this.spawningIndex = this.IMAGES_SPAWNING.length - 1;
        this.spawnAnimationFinished = true;
        this.isSpawning = false;
        this.currentImage = 0;
        this.frameCounter = 0;
      }
    }
  }

  // =========================
  // Floating Animation
  // =========================
  updateFloatingAnimation() {
    this.frameCounter++;

    if (this.frameCounter >= this.floatingFrameDelay) {
      this.frameCounter = 0;

      const i = this.currentImage % this.IMAGES_FLOATING.length;
      const path = this.IMAGES_FLOATING[i];
      this.img = this.imageCache[path];
      this.currentImage++;
    }
  }

  updateDeadAnimation() {
    if (this.deadAnimationFinished) {
      const lastPath = this.IMAGES_DEAD[this.IMAGES_DEAD.length - 1];
      this.img = this.imageCache[lastPath];
      return;
    }

    this.deadAnimationCounter++;

    if (this.deadAnimationCounter >= this.deadAnimationDelay) {
      this.deadAnimationCounter = 0;

      const path = this.IMAGES_DEAD[this.currentImageDead];
      this.img = this.imageCache[path];
      this.currentImageDead++;

      if (this.currentImageDead >= this.IMAGES_DEAD.length) {
        this.currentImageDead = this.IMAGES_DEAD.length - 1;
        this.deadAnimationFinished = true;
      }
    }
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
