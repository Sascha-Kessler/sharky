/**
 * Moves the jellyfish vertically
 */
JellyFish.prototype.move = function () {
  this.y += this.speedY;
};

/**
 * Keeps the jellyfish within world boundaries
 */
JellyFish.prototype.clampToWorld = function () {
  if (this.x < 150) {
    this.x = 150;
  }

  if (this.x > this.world.level.level_end_x) {
    this.x = this.world.level.level_end_x;
  }

  this.handleVerticalBounds();
};

/**
 * Handles vertical boundary collision and reverses direction
 */
JellyFish.prototype.handleVerticalBounds = function () {
  const topLimit = -this.offset.top;
  const bottomLimit = this.world.height - this.height + this.offset.bottom;

  if (this.y < topLimit) {
    this.y = topLimit;
    this.speedY *= -1;
  }

  if (this.y > bottomLimit) {
    this.y = bottomLimit;
    this.speedY *= -1;
  }
};
