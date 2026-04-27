/**
 * Activates the puffer fish when the character is within range
 */
PufferFish.prototype.checkActivation = function () {
  if (this.character.x + this.activationRange >= this.x) {
    this.isActive = true;
  }
};

/**
 * Moves the puffer fish horizontally
 */
PufferFish.prototype.move = function () {
  this.x += this.speedX;
};
