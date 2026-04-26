class Coinbar extends Statusbar {
  IMAGES_COINBAR = [
    "../img/4. Marcadores/green/Coin/0_  copia 4.png",
    "../img/4. Marcadores/green/Coin/20_  copia 2.png",
    "../img/4. Marcadores/green/Coin/40_  copia 4.png",
    "../img/4. Marcadores/green/Coin/60_  copia 4.png",
    "../img/4. Marcadores/green/Coin/80_  copia 4.png",
    "../img/4. Marcadores/green/Coin/100_ copia 4.png",
  ];

  constructor() {
    super([], 0, 80);

    this.images = this.IMAGES_COINBAR;

    this.loadImages(this.images);
    this.setPercentage(0);
  }

  coinbarUpdate(coins) {
    this.setPercentage(coins * 20);
  }
}
