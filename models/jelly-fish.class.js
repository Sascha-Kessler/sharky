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

  checkActivation() {
    if (this.character.x + this.activationRange >= this.x) {
      this.isActive = true;
    }
  }
  clampToWorld() {
    if (this.x < 150) {
      this.x = 150;
    }

    if (this.x > this.world.level.level_end_x) {
      this.x = this.world.level.level_end_x;
    }

    if (this.y < -this.offset.top) {
      this.y = -this.offset.top;
      this.speedY *= -1;
    }

    if (this.y + this.height - this.offset.bottom > this.world.height) {
      this.y = this.world.height - this.height + this.offset.bottom;
      this.speedY *= -1;
    }
  }
  // =========================
  // Movement
  // =========================
  move() {
    this.y += this.speedY;
  }

  // =========================
  // Swim Animation
  // =========================
  updateSwimAnimation() {
    this.frameCounter++;

    if (this.frameCounter >= this.swimFrameDelay) {
      this.frameCounter = 0;

      let i = this.currentImage % this.imagesSwimming.length;
      let path = this.imagesSwimming[i];
      this.img = this.imageCache[path];
      this.currentImage++;
    }
  }
}
