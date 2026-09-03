/**
 * Handles all animation-related functionality for the Endboss including:
 * - Spawning animation
 * - Floating animation
 * - Hurt animation
 * - Death animation
 * - Frame timing and image updates
 * @class
 */
class EndbossAnimation {
  /**
   * Creates a new animation controller for an Endboss
   * @param {Endboss} endboss - The Endboss instance to control animations for
   */
  constructor(endboss) {
    this.endboss = endboss;
  }

  /**
   * Determines if the animation frame should be updated based on frame delay
   * @param {number} delay - The number of frames to wait before updating
   * @returns {boolean} True if the frame should be updated, false otherwise
   */
  shouldUpdateFrame(delay) {
    this.endboss.frameCounter++;

    if (this.endboss.frameCounter < delay) return false;

    this.endboss.frameCounter = 0;
    return true;
  }

  /**
   * Sets the endboss's current image from an array of image paths
   * @param {string[]} images - Array of image paths for the animation
   * @param {number} index - Index of the image to set
   * @returns {void}
   */
  setImageFromArray(images, index) {
    const path = images[index];
    this.endboss.img = this.endboss.imageCache[path];
  }

  /**
   * Updates the spawning animation sequence until completion
   * @returns {void}
   */
  updateSpawningAnimation() {
    if (this.isSpawnAnimationFinished()) return;

    if (!this.updateSpawnFrame()) return;

    this.checkIfSpawnEnds();
  }

  /**
   * Checks if the spawning animation has already finished
   * @returns {boolean} True if spawning is finished, false otherwise
   */
  isSpawnAnimationFinished() {
    if (this.endboss.spawnAnimationFinished) {
      this.endboss.isSpawning = false;
      return true;
    }
    return false;
  }

  /**
   * Updates a single frame of the spawning animation
   * @returns {boolean} True if frame was updated, false otherwise
   */
  updateSpawnFrame() {
    if (!this.shouldUpdateFrame(this.endboss.spawnFrameDelay)) return false;

    this.setImageFromArray(
      this.endboss.IMAGES_SPAWNING,
      this.endboss.spawningIndex,
    );
    this.endboss.spawningIndex++;
    return true;
  }

  /**
   * Checks if the spawning animation has reached its final frame
   * @returns {boolean} True if spawning has ended, false otherwise
   */
  checkIfSpawnEnds() {
    if (this.endboss.spawningIndex >= this.endboss.IMAGES_SPAWNING.length) {
      this.finishSpawning();
      return true;
    }
    return false;
  }

  /**
   * Completes the spawning animation and resets related state
   * @returns {void}
   */
  finishSpawning() {
    this.endboss.spawningIndex = this.endboss.IMAGES_SPAWNING.length - 1;

    this.endboss.spawnAnimationFinished = true;
    this.endboss.isSpawning = false;
    this.endboss.currentImage = 0;
    this.endboss.frameCounter = 0;
  }

  /**
   * Updates the floating animation loop
   * @returns {void}
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
   * Updates the death animation sequence until completion
   * @returns {void}
   */
  updateDeadAnimation() {
    if (this.isDeadAnimationFinished()) return;

    if (!this.updateDeadFrame()) return;

    this.checkDeadAnimationEnd();
  }

  /**
   * Checks if the death animation has already finished
   * @returns {boolean} True if death animation is finished, false otherwise
   */
  isDeadAnimationFinished() {
    if (this.endboss.deadAnimationFinished) {
      this.setImageFromArray(
        this.endboss.IMAGES_DEAD,
        this.endboss.IMAGES_DEAD.length - 1,
      );
      return true;
    }
    return false;
  }

  /**
   * Updates a single frame of the death animation
   * @returns {boolean} True if frame was updated, false otherwise
   */
  updateDeadFrame() {
    if (!this.shouldUpdateFrame(this.endboss.deadAnimationDelay)) {
      return false;
    }

    this.setImageFromArray(
      this.endboss.IMAGES_DEAD,
      this.endboss.currentImageDead,
    );
    this.endboss.currentImageDead++;
    return true;
  }

  /**
   * Checks if the death animation has reached its final frame
   * @returns {boolean} True if death animation has ended, false otherwise
   */
  checkDeadAnimationEnd() {
    if (this.endboss.currentImageDead >= this.endboss.IMAGES_DEAD.length) {
      this.endboss.currentImageDead = this.endboss.IMAGES_DEAD.length - 1;
      this.endboss.deadAnimationFinished = true;
      return true;
    }
    return false;
  }

  /**
   * Updates the hurt animation while the endboss is damaged
   * @returns {void}
   */
  updateHurtAnimation() {
    if (!this.updateHurtCounter()) return;

    this.updateHurtFrame();

    this.checkHurtAnimationEnd();
  }

  /**
   * Updates the hurt animation counter and checks if it's time to update frame
   * @returns {boolean} True if it's time to update the frame, false otherwise
   */
  updateHurtCounter() {
    this.endboss.hurtAnimationCounter++;

    if (this.endboss.hurtAnimationCounter < this.endboss.hurtAnimationDelay) {
      return false;
    }

    this.endboss.hurtAnimationCounter = 0;
    return true;
  }

  /**
   * Updates the current frame of the hurt animation
   * @returns {void}
   */
  updateHurtFrame() {
    this.setImageFromArray(
      this.endboss.IMAGES_HURT,
      this.endboss.currentImageHurt,
    );
    this.endboss.currentImageHurt++;
  }

  /**
   * Checks if the hurt animation has reached its final frame
   * @returns {boolean} True if hurt animation has ended, false otherwise
   */
  checkHurtAnimationEnd() {
    if (this.endboss.currentImageHurt >= this.endboss.IMAGES_HURT.length) {
      this.endboss.isHurt = false;
      this.endboss.currentImageHurt = 0;
      return true;
    }
    return false;
  }
}
