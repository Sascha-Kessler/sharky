class Coinbar extends MovableObject {
  x = 80;
  y = 80;
  height = 60;
  width = 180;
  IMAGES_COINBAR = [
    "../img/4. Marcadores/green/Coin/0_  copia 4.png",
    "../img/4. Marcadores/green/Coin/20_  copia 2.png",
    "../img/4. Marcadores/green/Coin/40_  copia 4.png",
    "../img/4. Marcadores/green/Coin/60_  copia 4.png",
    "../img/4. Marcadores/green/Coin/80_  copia 4.png",
    "../img/4. Marcadores/green/Coin/100_  copia 4.png",
  ];
  currentImage = 0;

  constructor(keyboard, world) {
    super();
    this.world = world;
    this.keyboard = keyboard;
    this.loadImage("../img/4. Marcadores/green/Coin/0_  copia 4.png");
  }
}
