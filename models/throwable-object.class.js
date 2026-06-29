/**
 * Represents a throwable object (normal or poison bubble)
 */
class ThrowableObject extends MovableObject {
  speedX = 0;
  isThrown = false;

  /**
   * Creates a throwable object at a given position
   * @param {number} x
   * @param {number} y
   * @param {boolean} otherDirection
   * @param {"normal"|"poison"} [type="normal"]
   */
  constructor(x, y, otherDirection, type = "normal") {
    super();
    this.x = x + 50;
    this.y = y + 25;
    this.height = 50;
    this.width = 50;
    this.otherDirection = otherDirection;
    this.type = type;
    this.spawnTime = 0;
    this.lifetime = 1000;

    const isPoison = type === "poison";

    this.damage = isPoison ? 20 : 10;

    const imagePath = isPoison
      ? "../img/1.Sharkie/4.Attack/Bubble trap/Poisoned Bubble (for whale).png"
      : "../img/1.Sharkie/4.Attack/Bubble trap/Bubble.png";

    this.loadImage(imagePath);
  }

  /**
   * Updates the position while the object is active
   */
  update() {
    if (!this.isThrown) return;
    this.x += this.speedX;
  }

  /**
   * Starts the throw movement
   */
  throw() {
    this.speedX = this.otherDirection ? -2 : 2;
    this.isThrown = true;
    this.spawnTime = Date.now();
  }

  /**
   * Checks if the object has exceeded its lifetime
   * @returns {boolean}
   */
  isExpired() {
    return Date.now() - this.spawnTime > this.lifetime;
  }
}
