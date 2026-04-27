/**
 * Checks if the next animation frame should be updated
 * @param {number} delay
 * @returns {boolean}
 */
PufferFish.prototype.shouldUpdateFrame = function (delay) {
  this.frameCounter++;

  if (this.frameCounter < delay) return false;

  this.frameCounter = 0;
  return true;
};

/**
 * Updates the swimming animation of the puffer fish
 */
PufferFish.prototype.updateSwimAnimation = function () {
  if (!this.shouldUpdateFrame(this.swimFrameDelay)) return;

  const i = this.currentImage % this.imagesSwimming.length;
  const path = this.imagesSwimming[i];

  this.img = this.imageCache[path];
  this.currentImage++;
};
