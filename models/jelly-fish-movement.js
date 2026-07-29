class JellyFishMovement {
  constructor(jellyFish) {
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
    const topLimit = -this.jellyFish.offset.top;
    const bottomLimit =
      this.jellyFish.world.height -
      this.jellyFish.height +
      this.jellyFish.offset.bottom;

    if (this.jellyFish.y < topLimit) {
      this.jellyFish.y = topLimit;
      this.jellyFish.speedY *= -1;
    }

    if (this.jellyFish.y > bottomLimit) {
      this.jellyFish.y = bottomLimit;
      this.jellyFish.speedY *= -1;
    }
  }
}
