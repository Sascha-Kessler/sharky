/**
 * Base class for all movable game objects that extends DrawableObjects
 * Provides core functionality for:
 * - Movement and positioning
 * - Collision detection and hitboxes
 * - Health management and damage handling
 * - Debug visualization
 * @class
 * @extends DrawableObjects
 */

class MovableObject extends DrawableObjects {
  speed = 0.15;
  speedX = 0;
  speedY = 0;
  otherDirection = false;

  /**
   * Draws the hitbox frame for debugging purposes
   * @param {CanvasRenderingContext2D} ctx
   */
  drawFrame(ctx) {
    if (
      this instanceof Character ||
      this instanceof PufferFish ||
      this instanceof JellyFish ||
      this instanceof Endboss ||
      this instanceof Coin
    ) {
      const left = this.offset?.left || 0;
      const top = this.offset?.top || 0;
      const right = this.offset?.right || 0;
      const bottom = this.offset?.bottom || 0;

      ctx.beginPath();
      ctx.lineWidth = "2";
      ctx.strokeStyle = "red";

      ctx.rect(
        this.x + left,
        this.y + top,
        this.width - left - right,
        this.height - top - bottom,
      );

      ctx.stroke();
    }
  }

  /**
   * Checks collision between this object and another object
   * @param {MovableObject} obj
   * @returns {boolean}
   */
  isColliding(obj) {
    const a = this.getHitbox();
    const b = obj.getHitbox();

    return (
      a.right > b.left &&
      a.left < b.right &&
      a.bottom > b.top &&
      a.top < b.bottom
    );
  }

  /**
   * Returns the hitbox boundaries of the object
   * @returns {{left: number, right: number, top: number, bottom: number}}
   */
  getHitbox() {
    const left = this.x + (this.offset?.left || 0);
    const right = this.x + this.width - (this.offset?.right || 0);
    const top = this.y + (this.offset?.top || 0);
    const bottom = this.y + this.height - (this.offset?.bottom || 0);

    return { left, right, top, bottom };
  }

  /**
   * Applies damage to the object
   * @param {number} damage
   */
  hit(damage) {
    this.health -= damage;

    if (this.health <= 0) {
      this.die();
    }
  }

  /**
   * Marks the object as dead
   */
  die() {
    this.dead = true;
  }
}
