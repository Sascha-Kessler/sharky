/**
 * Controls all animation behavior for pufferfish enemies including:
 * - Swimming animation cycles
 * - Frame timing and image updates
 * - Animation state management
 * @class
 */ class PufferFishAnimation {
  constructor(pufferFish) {
    this.pufferFish = pufferFish;
  }

  /**
   * Checks if the next animation frame should be updated
   * @param {number} delay
   * @returns {boolean}
   */
  shouldUpdateFrame(delay) {
    this.pufferFish.frameCounter++;

    if (this.pufferFish.frameCounter < delay) return false;

    this.pufferFish.frameCounter = 0;
    return true;
  }

  /**
   * Updates the swimming animation of the puffer fish
   */
  updateSwimAnimation() {
    if (!this.shouldUpdateFrame(this.pufferFish.swimFrameDelay)) return;

    const imageIndex =
      this.pufferFish.currentImage % this.pufferFish.imagesSwimming.length;

    const path = this.pufferFish.imagesSwimming[imageIndex];

    this.pufferFish.img = this.pufferFish.imageCache[path];

    this.pufferFish.currentImage++;
  }
}
