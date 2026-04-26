Endboss.prototype.updateSpawningAnimation = function () {
  if (this.spawnAnimationFinished) {
    this.isSpawning = false;
    return;
  }

  this.frameCounter++;

  if (this.frameCounter >= this.spawnFrameDelay) {
    this.frameCounter = 0;

    const path = this.IMAGES_SPAWNING[this.spawningIndex];
    this.img = this.imageCache[path];
    this.spawningIndex++;

    if (this.spawningIndex >= this.IMAGES_SPAWNING.length) {
      this.spawningIndex = this.IMAGES_SPAWNING.length - 1;
      this.spawnAnimationFinished = true;
      this.isSpawning = false;
      this.currentImage = 0;
      this.frameCounter = 0;
    }
  }
};

Endboss.prototype.updateFloatingAnimation = function () {
  this.frameCounter++;

  if (this.frameCounter >= this.floatingFrameDelay) {
    this.frameCounter = 0;

    const i = this.currentImage % this.IMAGES_FLOATING.length;
    const path = this.IMAGES_FLOATING[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }
};

Endboss.prototype.updateDeadAnimation = function () {
  if (this.deadAnimationFinished) {
    const lastPath = this.IMAGES_DEAD[this.IMAGES_DEAD.length - 1];
    this.img = this.imageCache[lastPath];
    return;
  }

  this.deadAnimationCounter++;

  if (this.deadAnimationCounter >= this.deadAnimationDelay) {
    this.deadAnimationCounter = 0;

    const path = this.IMAGES_DEAD[this.currentImageDead];
    this.img = this.imageCache[path];
    this.currentImageDead++;

    if (this.currentImageDead >= this.IMAGES_DEAD.length) {
      this.currentImageDead = this.IMAGES_DEAD.length - 1;
      this.deadAnimationFinished = true;
    }
  }
};
