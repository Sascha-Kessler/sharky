class Healthbar extends MovableObject {
  height = 50;
  width = 170;
  y = 0;
  x = 0;
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
    this.setResponsivePosition();
  }

  setResponsivePosition() {
    const isMobile = isTouchDevice();

    if (isMobile) {
      this.x = 10;

      this.y = 10;

      this.width = 130;

      this.height = 38;
    } else {
      this.x = 0;

      this.y = 0;

      this.width = 170;

      this.height = 50;
    }
  }

  healthbarUpdate(health) {
    let index = Math.max(0, Math.min(5, health / 20));
    this.img = this.imageCache[this.IMAGES_HEALTHBAR[index]];
  }
}
