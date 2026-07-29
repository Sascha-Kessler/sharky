class EndbossAnimation {
  constructor(endboss) {
    this.endboss = endboss;
  }

  /**
   * Checks if the next animation frame should be updated
   * @param {number} delay - Frame delay for the animation
   * @returns {boolean}
   */
  shouldUpdateFrame(delay) {
    this.endboss.frameCounter++;

    if (this.endboss.frameCounter < delay) return false;

    this.endboss.frameCounter = 0;
    return true;
  }

  /**
   * Sets the current image from an image array
   * @param {string[]} images - Animation image paths
   * @param {number} index - Image index
   */
  setImageFromArray(images, index) {
    const path = images[index];
    this.endboss.img = this.endboss.imageCache[path];
  }

  /**
   * Updates the spawning animation
   */
  updateSpawningAnimation() {
    if (this.endboss.spawnAnimationFinished) {
      this.endboss.isSpawning = false;
      return;
    }

    if (!this.shouldUpdateFrame(this.endboss.spawnFrameDelay)) return;

    this.setImageFromArray(
      this.endboss.IMAGES_SPAWNING,
      this.endboss.spawningIndex,
    );

    this.endboss.spawningIndex++;

    if (this.endboss.spawningIndex >= this.endboss.IMAGES_SPAWNING.length) {
      this.finishSpawning();
    }
  }

  /**
   * Finishes the spawning animation and resets state
   */
  finishSpawning() {
    this.endboss.spawningIndex = this.endboss.IMAGES_SPAWNING.length - 1;

    this.endboss.spawnAnimationFinished = true;
    this.endboss.isSpawning = false;
    this.endboss.currentImage = 0;
    this.endboss.frameCounter = 0;
  }

  /**
   * Updates the floating animation
   */
  updateFloatingAnimation() {
    if (!this.shouldUpdateFrame(this.endboss.floatingFrameDelay)) {
      return;
    }

    const imageIndex =
      this.endboss.currentImage % this.endboss.IMAGES_FLOATING.length;

    this.setImageFromArray(this.endboss.IMAGES_FLOATING, imageIndex);

    this.endboss.currentImage++;
  }

  /**
   * Updates the death animation until it finishes
   */
  updateDeadAnimation() {
    if (this.endboss.deadAnimationFinished) {
      this.setImageFromArray(
        this.endboss.IMAGES_DEAD,
        this.endboss.IMAGES_DEAD.length - 1,
      );

      return;
    }

    if (!this.shouldUpdateFrame(this.endboss.deadAnimationDelay)) {
      return;
    }

    this.setImageFromArray(
      this.endboss.IMAGES_DEAD,
      this.endboss.currentImageDead,
    );

    this.endboss.currentImageDead++;

    if (this.endboss.currentImageDead >= this.endboss.IMAGES_DEAD.length) {
      this.endboss.currentImageDead = this.endboss.IMAGES_DEAD.length - 1;

      this.endboss.deadAnimationFinished = true;
    }
  }

  /**
   * Updates hurt animation while the endboss is damaged
   */
  updateHurtAnimation() {
    this.endboss.hurtAnimationCounter++;

    if (this.endboss.hurtAnimationCounter < this.endboss.hurtAnimationDelay) {
      return;
    }

    this.endboss.hurtAnimationCounter = 0;

    this.setImageFromArray(
      this.endboss.IMAGES_HURT,
      this.endboss.currentImageHurt,
    );

    this.endboss.currentImageHurt++;

    if (this.endboss.currentImageHurt >= this.endboss.IMAGES_HURT.length) {
      this.endboss.isHurt = false;
      this.endboss.currentImageHurt = 0;
    }
  }
}
