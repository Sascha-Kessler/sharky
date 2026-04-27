/**
 * Keeps the endboss within vertical world boundaries
 */
Endboss.prototype.clampToWorld = function () {
  if (this.y < -this.offset.top) {
    this.y = -this.offset.top;
  }

  if (this.y + this.height - this.offset.bottom > this.world.height) {
    this.y = this.world.height - this.height + this.offset.bottom;
  }
};

/**
 * Moves the endboss automatically and reverses direction at bounds
 */
Endboss.prototype.autoMove = function () {
  if (
    this.y <= -this.offset.top ||
    this.y + this.height - this.offset.bottom >= this.world.height
  ) {
    this.speedY *= -1;
  }

  this.y += this.speedY;
};

/**
 * Checks if the player reached the trigger point for the first encounter
 */
Endboss.prototype.checkFirstContact = function () {
  if (!this.world) return;

  if (this.character.x > 1885 && !this.hadFirstContact) {
    this.startFirstContact();
  }
};

/**
 * Initializes the first contact state and starts spawning
 */
Endboss.prototype.startFirstContact = function () {
  this.hadFirstContact = true;
  this.isSpawning = true;
  this.spawnAnimationFinished = false;
  this.spawningIndex = 0;
  this.frameCounter = 0;
};
