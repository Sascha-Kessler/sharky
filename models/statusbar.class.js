/**
 * Base class for all status bars (health, coins, poison)
 */
class Statusbar extends DrawableObjects {
  percentage = 100;

  /**
   * Creates a new status bar
   * @param {string[]} images
   * @param {number} x
   * @param {number} y
   * @param {number} [width=170]
   * @param {number} [height=50]
   */
  constructor(images, x, y, width = 170, height = 50) {
    super();

    this.images = images;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.loadImages(this.images);
    this.setPercentage(this.percentage);
  }

  /**
   * Sets the current percentage and updates the displayed image
   * @param {number} value
   */
  setPercentage(value) {
    this.percentage = Math.max(0, Math.min(100, value));

    const index = Math.floor(this.percentage / 20);
    const safeIndex = Math.min(index, this.images.length - 1);

    this.img = this.imageCache[this.images[safeIndex]];
  }

  /**
   * Adjusts the position based on screen size
   */
  setResponsivePosition() {
    if (window.innerWidth < 720) {
      this.x = 10;
    } else {
      this.x = 20;
    }
  }
}
