/**
 * Checks if the next animation frame should be updated
 * @param {number} delay - Frame delay for the animation
 * @returns {boolean}
 */
Endboss.prototype.shouldUpdateFrame = function (delay) {
  this.frameCounter++;

  if (this.frameCounter < delay) return false;

  this.frameCounter = 0;
  return true;
};

/**
 * Sets the current image from an image array
 * @param {string[]} images - Animation image paths
 * @param {number} index - Image index
 */
Endboss.prototype.setImageFromArray = function (images, index) {
  const path = images[index];
  this.img = this.imageCache[path];
};

/**
 * Updates the spawning animation
 */
Endboss.prototype.updateSpawningAnimation = function () {
  if (this.spawnAnimationFinished) {
    this.isSpawning = false;
    return;
  }

  if (!this.shouldUpdateFrame(this.spawnFrameDelay)) return;

  this.setImageFromArray(this.IMAGES_SPAWNING, this.spawningIndex);
  this.spawningIndex++;

  if (this.spawningIndex >= this.IMAGES_SPAWNING.length) {
    this.finishSpawning();
  }
};

/**
 * Finishes the spawning animation and resets state
 */
Endboss.prototype.finishSpawning = function () {
  this.spawningIndex = this.IMAGES_SPAWNING.length - 1;
  this.spawnAnimationFinished = true;
  this.isSpawning = false;
  this.currentImage = 0;
  this.frameCounter = 0;
};

/**
 * Updates the floating animation
 */
Endboss.prototype.updateFloatingAnimation = function () {
  if (!this.shouldUpdateFrame(this.floatingFrameDelay)) return;

  const i = this.currentImage % this.IMAGES_FLOATING.length;

  this.setImageFromArray(this.IMAGES_FLOATING, i);
  this.currentImage++;
};

/**
 * Updates the death animation until it finishes
 */
Endboss.prototype.updateDeadAnimation = function () {
  if (this.deadAnimationFinished) {
    this.setImageFromArray(this.IMAGES_DEAD, this.IMAGES_DEAD.length - 1);
    return;
  }

  if (!this.shouldUpdateFrame(this.deadAnimationDelay)) return;

  this.setImageFromArray(this.IMAGES_DEAD, this.currentImageDead);
  this.currentImageDead++;

  if (this.currentImageDead >= this.IMAGES_DEAD.length) {
    this.currentImageDead = this.IMAGES_DEAD.length - 1;
    this.deadAnimationFinished = true;
  }
};
