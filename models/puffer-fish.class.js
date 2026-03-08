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

  // =========================
  // Constructor
  // =========================
  constructor() {
    super();
    this.loadImage(this.IMAGES_SWIMMING[0]);
    this.loadImages(this.IMAGES_SWIMMING);

    this.x = 800 + Math.random() * 400;
    this.y = Math.random() * (GAME_HEIGHT - this.height);
  }

  // =========================
  // World Reference
  // =========================
  setWorld(world) {
    this.world = world;
    this.character = world.character;

    // Example: spawn relative to character
    this.x = this.character.x + 600;
  }

  // =========================
  // Main Update Flow
  // =========================
  update() {
    this.move();
    this.updateSwimAnimation();
  }

  // =========================
  // Movement
  // =========================
  move() {
    this.x += this.speedX;

    if (this.x + this.width < 0) {
      this.x = this.world.canvas.width + 200 + Math.random() * 600;
    }
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
