/**
 * Controls all movement behavior for pufferfish enemies including:
 * - Gentle floating/swimming motion when idle
 * - Active pursuit movement when player is detected
 * - Boundary clamping to stay within game world
 * - Direction management for sprite flipping
 * @class
 */
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
