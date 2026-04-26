PufferFish.prototype.checkActivation = function () {
  if (this.character.x + this.activationRange >= this.x) {
    this.isActive = true;
  }
};

PufferFish.prototype.move = function () {
  this.x += this.speedX;
};
