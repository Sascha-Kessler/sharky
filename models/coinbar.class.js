class Coinbar extends MovableObject {
  x = 0;
  y = 80;
  height = 50;
  width = 170;
  IMAGES_COINBAR = [
    "../img/4. Marcadores/green/Coin/0_  copia 4.png",
    "../img/4. Marcadores/green/Coin/20_  copia 2.png",
    "../img/4. Marcadores/green/Coin/40_  copia 4.png",
    "../img/4. Marcadores/green/Coin/60_  copia 4.png",
    "../img/4. Marcadores/green/Coin/80_  copia 4.png",
    "../img/4. Marcadores/green/Coin/100_ copia 4.png",
  ];
  currentImage = 0;

  constructor() {
    super();
    this.loadImages(this.IMAGES_COINBAR);
    this.img = this.imageCache[this.IMAGES_COINBAR[0]];
  }

  coinbarUpdate(coins) {
    let index = Math.max(0, Math.min(5, coins));
    this.img = this.imageCache[this.IMAGES_COINBAR[index]];
  }
}
