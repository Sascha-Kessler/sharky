class JellyFishAnimation {
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
    this.jellyFish.frameCounter++;

    if (this.jellyFish.frameCounter < this.jellyFish.swimFrameDelay) {
      return;
    }

    this.jellyFish.frameCounter = 0;

    const imageIndex =
      this.jellyFish.currentImage % this.jellyFish.imagesSwimming.length;

    const path = this.jellyFish.imagesSwimming[imageIndex];

    this.jellyFish.img = this.jellyFish.imageCache[path];

    this.jellyFish.currentImage++;
  }
}
