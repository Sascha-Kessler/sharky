class Poisonbar extends Statusbar {
  IMAGES_POISONBAR = [
    "../img/4. Marcadores/green/poisoned bubbles/0_ copia 2.png",
    "../img/4. Marcadores/green/poisoned bubbles/20_ copia 3.png",
    "../img/4. Marcadores/green/poisoned bubbles/40_ copia 2.png",
    "../img/4. Marcadores/green/poisoned bubbles/60_ copia 2.png",
    "../img/4. Marcadores/green/poisoned bubbles/80_ copia 2.png",
    "../img/4. Marcadores/green/poisoned bubbles/100_ copia 3.png",
  ];

  constructor() {
    super([], 0, 40);

    this.images = this.IMAGES_POISONBAR;

    this.loadImages(this.images);
    this.setPercentage(0);
  }

  poisonbarUpdate(poisonBottles) {
    this.setPercentage(poisonBottles * 20);
  }
}
