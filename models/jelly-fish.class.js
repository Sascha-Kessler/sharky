class JellyFish extends MovableObject {
  // =========================
  // Animation Image Sets
  // =========================
  IMAGES_SWIMMING_GREEN = JELLYFISH_IMAGES.GREEN_SWIMMING;
  IMAGES_SWIMMING_PINK = JELLYFISH_IMAGES.PINK_SWIMMING;

  // =========================
  // Size
  // =========================
  height = 60;
  width = 60;
  health = 1;
  offset = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  };

  // =========================
  // Animation
  // =========================
  currentImage = 0;
  frameCounter = 0;
  swimFrameDelay = 12;

  // =========================
  // Movement
  // =========================
  speedY = -0.15 - Math.random() * 1.25;
  activationRange = 600;
  isActive = false;

  // =========================
  // Constructor
  // =========================
  constructor(x, y, color) {
    super();
    if (color === "pink") {
      this.imagesSwimming = this.IMAGES_SWIMMING_PINK;
    } else {
      this.imagesSwimming = this.IMAGES_SWIMMING_GREEN;
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
    this.clampToWorld();
  }
}
