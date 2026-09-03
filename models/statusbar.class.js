/**
 * Base class for all status bars (health, coins, poison).
 * Handles image loading, percentage logic and responsive positioning.
 */
class Statusbar extends DrawableObjects {
  /** @type {number} Current percentage value (0–100) */
  percentage = 100;

  /**
   * Creates a new status bar
   * @param {string[]} images - Array of image paths representing different fill states
   * @param {number} x - Initial x position on canvas
   * @param {number} y - Initial y position on canvas
   * @param {number} [startPercentage=100] - Initial percentage value
   * @param {number} [width=170] - Width of the status bar
   * @param {number} [height=50] - Height of the status bar
   */
  constructor(images, x, y, startPercentage = 100, width = 170, height = 50) {
    super();

    this.images = images;
    this.x = x;
    this.y = y;

    this.baseX = x;
    this.baseY = y;

    this.width = width;
    this.height = height;

    this.loadImages(this.images);
    this.setPercentage(startPercentage);
  }

  /**
   * Updates the displayed percentage and sets the corresponding image
   * @param {number} value - New percentage value (0–100)
   */
  setPercentage(value) {
    this.percentage = Math.max(0, Math.min(100, value));

    const index = Math.floor(this.percentage / 20);
    const safeIndex = Math.min(index, this.images.length - 1);

    this.img = this.imageCache[this.images[safeIndex]];
  }

  /**
   * Updates the bar with a new value
   * @param {number} value - Value to update the bar with
   */
  updateBar(value) {
    this.setPercentage(value);
  }

  /**
   * Adjusts the position of the bar based on current canvas scaling
   */
  setResponsivePosition() {
    const canvas = document.getElementById("canvas");

    const scaleX = canvas.clientWidth / canvas.width;
    const scaleY = canvas.clientHeight / canvas.height;

    this.x = this.baseX * scaleX;
    this.y = this.baseY * scaleY;
  }
}
