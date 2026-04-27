/**
 * Represents a collectible coin with animation
 */
class Coin extends MovableObject {
  IMAGES_COIN = [
    "../img/4. Marcadores/1. Coins/1.png",
    "../img/4. Marcadores/1. Coins/2.png",
    "../img/4. Marcadores/1. Coins/3.png",
    "../img/4. Marcadores/1. Coins/4.png",
  ];

  height = 40;
  width = 40;

  currentImage = 0;
  frameCounter = 0;
  coinFrameDelay = 12;

  /**
   * Creates a new coin at a random position
   */
  constructor() {
    super();
    this.loadImage(this.IMAGES_COIN[0]);
    this.loadImages(this.IMAGES_COIN);

    this.x = 800 + Math.random() * 400;
    this.y = Math.random() * (GAME_HEIGHT - this.height);
  }

  /**
   * Updates the coin each frame
   */
  update() {
    this.updateCoinAnimation();
  }

  /**
   * Updates the coin animation
   */
  updateCoinAnimation() {
    this.frameCounter++;

    if (this.frameCounter >= this.coinFrameDelay) {
      this.frameCounter = 0;

      const i = this.currentImage % this.IMAGES_COIN.length;
      const path = this.IMAGES_COIN[i];
      this.img = this.imageCache[path];
      this.currentImage++;
    }
  }
}
