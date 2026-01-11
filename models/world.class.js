class World {
  background = new Background();
  character = new Character();
  enemies = [
    new PufferFish(this.character),
    new PufferFish(this.character)
  ];
  ctx;


  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
  }


  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.drawBackground(this.background);
    this.drawObject(this.character);

    this.enemies.forEach(enemy => {
      this.drawObject(enemy);
    });
  }


drawBackground() {
  const bg = this.background;
  if (!bg.img || !bg.img.complete) return;

  this.ctx.drawImage(bg.img, 0, 0, this.canvas.width, this.canvas.height);
}


  drawObject(mo) {
    if (!mo.img || !mo.img.complete) return;

    this.ctx.drawImage(
      mo.img,
      mo.x,
      mo.y,
      mo.width,
      mo.height
    );
  }
}