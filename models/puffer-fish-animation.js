PufferFish.prototype.updateSwimAnimation = function () {
  this.frameCounter++;

  if (this.frameCounter >= this.swimFrameDelay) {
    this.frameCounter = 0;

    const i = this.currentImage % this.imagesSwimming.length;
    const path = this.imagesSwimming[i];

    this.img = this.imageCache[path];
    this.currentImage++;
  }
};
