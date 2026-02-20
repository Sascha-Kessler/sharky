class Healthbar extends MovableObject {
  height = 60;
  width = 180;
  y = 0;
  x = 80;
  IMAGES_HEALTHBAR = [
    "../img/4. Marcadores/green/Life/0_  copia3.png",
    "../img/4. Marcadores/green/Life/20_ copia4.png",
    "../img/4. Marcadores/green/Life/40_  copia3.png",
    "../img/4. Marcadores/green/Life/60_  copia3.png",
    "../img/4. Marcadores/green/Life/80_  copia3.png",
    "../img/4. Marcadores/green/Life/100_ copia2.png",
  ];
  currentImage = 0;

  constructor() {
    super();
    this.loadImages(this.IMAGES_HEALTHBAR);
    this.img = this.imageCache[this.IMAGES_HEALTHBAR[5]];
  }

  healthbarUpdate(health) {
    let index = Math.max(0, Math.min(5, health / 20));
    this.img = this.imageCache[this.IMAGES_HEALTHBAR[index]];
  }
}
