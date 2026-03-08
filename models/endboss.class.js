class Endboss extends MovableObject {
  // =========================
  // Animation Image Sets
  // =========================
  IMAGES_FLOATING = ENDBOSS_IMAGES.FLOATING;
  IMAGES_SPAWNING = ENDBOSS_IMAGES.SPAWNING;

  // =========================
  // Position and Size
  // =========================
  x = 2500;
  y = 100;
  height = 300;
  width = 300;

  // =========================
  // Animation
  // =========================
  currentImage = 0;
  frameCounter = 0;
  floatingFrameDelay = 12;
  hadFirstContact = false;
  spawningIndex = 0;
  isSpawning = false;
  spawnAnimationFinished = false;
  spawningIndex = 0;
  spawnFrameDelay = 5;

  // =========================
  // Constructor
  // =========================
  constructor() {
    super();
    this.loadImage(this.IMAGES_SPAWNING[0]);
    this.loadImages(this.IMAGES_FLOATING);
    this.loadImages(this.IMAGES_SPAWNING);
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
}
