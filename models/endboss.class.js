class Endboss extends MovableObject {
  // =========================
  // Animation Image Sets
  // =========================
  IMAGES_FLOATING = ENDBOSS_IMAGES.FLOATING;

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
  floatingFrameDelay = 18;

  // =========================
  // Constructor
  // =========================
  constructor() {
    super();
    this.loadImage(this.IMAGES_FLOATING[0]);
    this.loadImages(this.IMAGES_FLOATING);
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
    this.updateFloatingAnimation();
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
