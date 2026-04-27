/**
 * Represents a collectible poison bottle
 */
class PoisonBottle extends MovableObject {
  IMAGES_POISON_BOTTLE = "../img/4. Marcadores/Posiขn/Dark - Left.png";

  height = 60;
  width = 60;

  /**
   * Creates a poison bottle at a given position
   * @param {number} x
   * @param {number} y
   */
  constructor(x, y) {
    super();
    this.loadImage(this.IMAGES_POISON_BOTTLE);

    this.x = x;
    this.y = y;
  }
}
