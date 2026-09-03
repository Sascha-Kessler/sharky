/**
 * Controls all movement behavior for the Endboss including:
 * - Basic floating movement patterns
 * - Position clamping within game boundaries
 * - Movement toward/away from player
 * - Special movement states and transitions
 * @class
 */
class EndbossMovement {
  /**
   * Creates a new movement controller for an Endboss
   * @param {Endboss} endboss - The Endboss instance to control movement for
   */
  constructor(endboss) {
    this.endboss = endboss;
  }

  /**
   * Clamps the endboss position to stay within world boundaries
   */
  clampToWorld() {
    this.clampTopBoundary();
    this.clampBottomBoundary();
  }

  /**
   * Clamps the endboss to the top boundary
   */
  clampTopBoundary() {
    if (this.endboss.y < -this.endboss.offset.top) {
      this.endboss.y = -this.endboss.offset.top;
    }
  }

  /**
   * Clamps the endboss to the bottom boundary
   */
  clampBottomBoundary() {
    if (
      this.endboss.y + this.endboss.height - this.endboss.offset.bottom >
      this.endboss.world.height
    ) {
      this.endboss.y =
        this.endboss.world.height -
        this.endboss.height +
        this.endboss.offset.bottom;
    }
  }

  /**
   * Moves the endboss automatically and reverses direction at bounds
   */
  autoMove() {
    if (
      this.endboss.y <= -this.endboss.offset.top ||
      this.endboss.y + this.endboss.height - this.endboss.offset.bottom >=
        this.endboss.world.height
    ) {
      this.endboss.speedY *= -1;
    }

    this.endboss.y += this.endboss.speedY;
  }

  /**
   * Checks if the player reached the trigger point for the first encounter
   */
  checkFirstContact() {
    if (!this.endboss.world || !this.endboss.character) return;

    if (this.endboss.character.x > 1885 && !this.endboss.hadFirstContact) {
      this.startFirstContact();
    }
  }

  /**
   * Initializes the first contact state and starts spawning
   */
  startFirstContact() {
    this.endboss.hadFirstContact = true;
    this.endboss.isSpawning = true;
    this.endboss.spawnAnimationFinished = false;
    this.endboss.spawningIndex = 0;
    this.endboss.frameCounter = 0;
  }
}
