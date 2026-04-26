// =========================
// Movement
// =========================
JellyFish.prototype.move = function () {
  this.y += this.speedY;
};

JellyFish.prototype.clampToWorld = function () {
  if (this.x < 150) {
    this.x = 150;
  }

  if (this.x > this.world.level.level_end_x) {
    this.x = this.world.level.level_end_x;
  }

  if (this.y < -this.offset.top) {
    this.y = -this.offset.top;
    this.speedY *= -1;
  }

  if (this.y + this.height - this.offset.bottom > this.world.height) {
    this.y = this.world.height - this.height + this.offset.bottom;
    this.speedY *= -1;
  }
};
