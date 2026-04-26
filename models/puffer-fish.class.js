class PufferFish extends MovableObject {
  // =========================
  // Animation Image Sets
  // =========================
  IMAGES_SWIMMING_GREEN = PUFFERFISH_IMAGES.GREEN_SWIMMING;
  IMAGES_SWIMMING_ORANGE = PUFFERFISH_IMAGES.ORANGE_SWIMMING;
  IMAGES_SWIMMING_RED = PUFFERFISH_IMAGES.RED_SWIMMING;

  // =========================
  // Size
  // =========================
  height = 60;
  width = 60;
  health = 1;

  // =========================
  // Animation
  // =========================
  currentImage = 0;
  frameCounter = 0;
  swimFrameDelay = 12;

  // =========================
  // Movement
  // =========================
  speedX = -0.15 - Math.random() * 1.25;
  activationRange = 600;
  isActive = false;

  // =========================
  // Constructor
  // =========================
  constructor(x, y, color) {
    super();
    if (color === "green") {
      this.imagesSwimming = this.IMAGES_SWIMMING_GREEN;
    } else if (color === "orange") {
      this.imagesSwimming = this.IMAGES_SWIMMING_ORANGE;
    } else {
      this.imagesSwimming = this.IMAGES_SWIMMING_RED;
    }
    this.loadImage(this.imagesSwimming[0]);
    this.loadImages(this.imagesSwimming);

    this.x = x;
    this.y = y;
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
    if (!this.world) return;

    this.checkActivation();

    if (!this.isActive) return;

    this.move();
    this.updateSwimAnimation();
  }
}
