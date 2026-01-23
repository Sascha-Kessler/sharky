class World {
  backgroundObjects = [
    new BackgroundObject('../img/3. Background/Light/1.png')
  ];
  character = new Character();
  enemies = [
    new PufferFish(this.character),
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

    this.addObjectToMap(this.backgroundObjects);
    this.addToMap(this.character);
    this.addObjectToMap(this.enemies);
  }


  addObjectToMap(objects) {
    objects.forEach(obj => {
      this.addToMap(obj);
    });
  }


  addToMap(mo) {
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