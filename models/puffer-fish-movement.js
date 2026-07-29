class PufferFishMovement {
  constructor(pufferFish) {
    this.pufferFish = pufferFish;
  }
  /**
   * Activates the puffer fish when the character is within range
   */
  checkActivation() {
    if (!this.pufferFish.character) return;

    if (
      this.pufferFish.character.x + this.pufferFish.activationRange >=
      this.pufferFish.x
    ) {
      this.pufferFish.isActive = true;
    }
  }

  /**
   * Moves the puffer fish horizontally
   */
  move() {
    this.pufferFish.x += this.pufferFish.speedX;
  }
}
