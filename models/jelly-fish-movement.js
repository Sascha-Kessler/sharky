/**
 * Controls all movement behavior for jellyfish enemies including:
 * - Gentle floating/swimming motion
 * - Activation-based movement patterns
 * - Boundary clamping to stay within game world
 * - Movement toward/away from player when active
 * @class
 */
class JellyFishMovement {
  constructor(jellyFish) {
    /**
     * Creates a new movement controller for a jellyfish
     * @param {JellyFish} jellyFish - The jellyfish instance to control movement for
     */
    this.jellyFish = jellyFish;
  }

  /**
   * Moves the jellyfish vertically
   */
  move() {
    this.jellyFish.y += this.jellyFish.speedY;
  }

  /**
   * Keeps the jellyfish within world boundaries
   */
  clampToWorld() {
    if (this.jellyFish.x < 150) {
      this.jellyFish.x = 150;
    }

    if (this.jellyFish.x > this.jellyFish.world.level.level_end_x) {
      this.jellyFish.x = this.jellyFish.world.level.level_end_x;
    }

    this.handleVerticalBounds();
  }

  /**
   * Handles vertical boundary collision and reverses direction
   */
  handleVerticalBounds() {
    this.updateVerticalLimits();
    this.handleTopBoundary();
    this.handleBottomBoundary();
  }

  /**
   * Calculates and stores the vertical movement limits
   */
  updateVerticalLimits() {
    this.topLimit = -this.jellyFish.offset.top;
    this.bottomLimit =
      this.jellyFish.world.height -
      this.jellyFish.height +
      this.jellyFish.offset.bottom;
  }

  /**
   * Handles collision with the top boundary
   */
  handleTopBoundary() {
    if (this.jellyFish.y < this.topLimit) {
      this.jellyFish.y = this.topLimit;
      this.jellyFish.speedY *= -1;
    }
  }

  /**
   * Handles collision with the bottom boundary
   */
  handleBottomBoundary() {
    if (this.jellyFish.y > this.bottomLimit) {
      this.jellyFish.y = this.bottomLimit;
      this.jellyFish.speedY *= -1;
    }
  }
}
