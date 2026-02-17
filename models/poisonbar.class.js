class Poisonbar extends MovableObject {
  x = 80;
  y = 40;
  height = 60;
  width = 180;
  IMAGES_POISON = [
    "../img/4. Marcadores/green/poisoned bubbles/0_ copia 2.png",
    "../img/4. Marcadores/green/poisoned bubbles/20_ copia 3.png",
    "../img/4. Marcadores/green/poisoned bubbles/40_ copia 2.png",
    "../img/4. Marcadores/green/poisoned bubbles/60_ copia 2.png",
    "../img/4. Marcadores/green/poisoned bubbles/80_ copia 2.png",
    "../img/4. Marcadores/green/poisoned bubbles/100_ copia 3.png",
  ];
  currentImage = 0;

  constructor(keyboard, world) {
    super();
    this.world = world;
    this.keyboard = keyboard;
    this.loadImage(
      "../img/4. Marcadores/green/poisoned bubbles/0_ copia 2.png",
    );
  }
}
