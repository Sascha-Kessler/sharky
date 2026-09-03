/**
 * Controls all animation behavior for jellyfish enemies including:
 * - Activation when player enters range
 * - Swimming animation cycles
 * - Frame timing and image updates
 * @class
 */
class JellyFishAnimation {
  /**
   * Creates a new animation controller for a jellyfish
   * @param {JellyFish} jellyFish - The jellyfish instance to control animations for
   */
  constructor(jellyFish) {
    this.jellyFish = jellyFish;
  }

  /**
   * Activates the jellyfish when the character is within range
   */
  checkActivation() {
    if (!this.jellyFish.character) return;

    if (
      this.jellyFish.character.x + this.jellyFish.activationRange >=
      this.jellyFish.x
    ) {
      this.jellyFish.isActive = true;
    }
  }

  /**
   * Updates the swimming animation frames
   */
  updateSwimAnimation() {
    if (!this.shouldUpdateSwimFrame()) return;

    this.updateSwimFrame();
  }

  /**
   * Checks if the swim frame should be updated based on delay
   * @returns {boolean} True if frame should be updated
   */
  shouldUpdateSwimFrame() {
    this.jellyFish.frameCounter++;

    if (this.jellyFish.frameCounter < this.jellyFish.swimFrameDelay) {
      return false;
    }

    this.jellyFish.frameCounter = 0;
    return true;
  }

  /**
   * Updates the current swim image from the image cache
   */
  updateSwimFrame() {
    const imageIndex =
      this.jellyFish.currentImage % this.jellyFish.imagesSwimming.length;

    const path = this.jellyFish.imagesSwimming[imageIndex];
    this.jellyFish.img = this.jellyFish.imageCache[path];

    this.jellyFish.currentImage++;
  }
}
