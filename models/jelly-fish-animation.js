JellyFish.prototype.checkActivation = function () {
  if (this.character.x + this.activationRange >= this.x) {
    this.isActive = true;
  }
};

// =========================
// Swim Animation
// =========================
JellyFish.prototype.updateSwimAnimation = function () {
  this.frameCounter++;

  if (this.frameCounter >= this.swimFrameDelay) {
    this.frameCounter = 0;

    let i = this.currentImage % this.imagesSwimming.length;
    let path = this.imagesSwimming[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }
};
