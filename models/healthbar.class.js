class Healthbar extends MovableObject {
  x = 80;
  y = 0;
  height = 60;
  width = 180;
  IMAGES_HEALTHBAR = [
    "../img/4. Marcadores/green/Life/0_ copia3.png",
    "../img/4. Marcadores/green/Life/20_ copia4.png",
    "../img/4. Marcadores/green/Life/40_ copia3.png",
    "../img/4. Marcadores/green/Life/60_ copia3.png",
    "../img/4. Marcadores/green/Life/80_ copia3.png",
    "../img/4. Marcadores/green/Life/100_ copia2.png",
  ];
  currentImage = 0;

  constructor(keyboard, world) {
    super();
    this.world = world;
    this.keyboard = keyboard;
    this.loadImage("../img/4. Marcadores/green/Life/100_ copia2.png");
  }
}
