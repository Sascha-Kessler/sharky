class PufferFish extends MovableObject {
  // =========================
  // Animation Image Sets
  // =========================
  IMAGES_SWIMMING = PUFFERFISH_IMAGES.SWIMMING;

  // =========================
  // Size
  // =========================
  height = 60;
  width = 60;

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
  constructor(x, y) {
    super();
    this.loadImage(this.IMAGES_SWIMMING[0]);
    this.loadImages(this.IMAGES_SWIMMING);

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

  checkActivation() {
    if (this.character.x + this.activationRange >= this.x) {
      this.isActive = true;
    }
  }

  // =========================
  // Movement
  // =========================
  move() {
    this.x += this.speedX;
  }

  // =========================
  // Swim Animation
  // =========================
  updateSwimAnimation() {
    this.frameCounter++;

    if (this.frameCounter >= this.swimFrameDelay) {
      this.frameCounter = 0;

      let i = this.currentImage % this.IMAGES_SWIMMING.length;
      let path = this.IMAGES_SWIMMING[i];
      this.img = this.imageCache[path];
      this.currentImage++;
    }
  }
}
