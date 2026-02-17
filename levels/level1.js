function createLevel1() {
  const TILE_WIDTH = GAME_WIDTH;
  return new Level(
    [new PufferFish(), new PufferFish(), new PufferFish(), new Endboss()],

    [
      new BackgroundObject("../img/3. Background/Light/1.png", 0),
      new BackgroundObject("../img/3. Background/Light/2.png", TILE_WIDTH),
      new BackgroundObject("../img/3. Background/Light/1.png", 2 * TILE_WIDTH),
      new BackgroundObject("../img/3. Background/Light/2.png", 3 * TILE_WIDTH),
    ],

    [new Coin(), new Coin(), new Coin(), new Coin()],
  );
}
