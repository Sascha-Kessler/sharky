/**
 * Represents a background object in the game world
 * @class
 * @extends MovableObject
 */
class BackgroundObject extends MovableObject {
  /**
   * Creates a new background object
   * @param {string} imagePath - Path to the image resource for this background
   * @param {number} x - The x-coordinate position of the background object
   */
  constructor(imagePath, x) {
    super();
    this.loadImage(imagePath);
    this.x = x;
    this.y = 0;
    this.height = GAME_HEIGHT;
    this.width = GAME_WIDTH;
  }
}
