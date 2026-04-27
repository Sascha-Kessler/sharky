/**
 * Activates the jellyfish when the character is within range
 */
JellyFish.prototype.checkActivation = function () {
  if (this.character.x + this.activationRange >= this.x) {
    this.isActive = true;
  }
};

/**
 * Updates the swimming animation frames
 */
JellyFish.prototype.updateSwimAnimation = function () {
  this.frameCounter++;

  if (this.frameCounter < this.swimFrameDelay) return;

  this.frameCounter = 0;

  const i = this.currentImage % this.imagesSwimming.length;
  const path = this.imagesSwimming[i];

  this.img = this.imageCache[path];
  this.currentImage++;
};
