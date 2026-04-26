Endboss.prototype.clampToWorld = function () {
  if (this.y < -this.offset.top) {
    this.y = -this.offset.top;
  }

  if (this.y + this.height - this.offset.bottom > this.world.height) {
    this.y = this.world.height - this.height + this.offset.bottom;
  }
};

Endboss.prototype.autoMove = function () {
  if (
    this.y <= -this.offset.top ||
    this.y + this.height - this.offset.bottom >= this.world.height
  ) {
    this.speedY *= -1;
  }

  this.y += this.speedY;
};

Endboss.prototype.checkFirstContact = function () {
  if (!this.world) return;

  if (this.character.x > 1885 && !this.hadFirstContact) {
    this.hadFirstContact = true;
    this.isSpawning = true;
    this.spawnAnimationFinished = false;
    this.spawningIndex = 0;
    this.frameCounter = 0;
  }
};
