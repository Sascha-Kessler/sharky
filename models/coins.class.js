class Coin extends MovableObject {
  // =========================
  // Animation Image Sets
  // =========================
  IMAGES_COIN = [
    "../img/4. Marcadores/1. Coins/1.png",
    "../img/4. Marcadores/1. Coins/2.png",
    "../img/4. Marcadores/1. Coins/3.png",
    "../img/4. Marcadores/1. Coins/4.png",
  ];

  // =========================
  // Size
  // =========================
  height = 40;
  width = 40;

  // =========================
  // Animation
  // =========================
  currentImage = 0;
  frameCounter = 0;
  coinFrameDelay = 12;

  // =========================
  // Constructor
  // =========================
  constructor() {
    super();
    this.loadImage(this.IMAGES_COIN[0]);
    this.loadImages(this.IMAGES_COIN);

    this.x = 800 + Math.random() * 400;
    this.y = Math.random() * (GAME_HEIGHT - this.height);
  }

  // =========================
  // Main Update Flow
  // =========================
  update() {
    this.updateCoinAnimation();
  }

  // =========================
  // Coin Animation
  // =========================
  updateCoinAnimation() {
    this.frameCounter++;

    if (this.frameCounter >= this.coinFrameDelay) {
      this.frameCounter = 0;

      let i = this.currentImage % this.IMAGES_COIN.length;
      let path = this.IMAGES_COIN[i];
      this.img = this.imageCache[path];
      this.currentImage++;
    }
  }
}
