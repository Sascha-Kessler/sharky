function createCoinRow(x, y, count, spacing) {
  let coins = [];

  for (let i = 0; i < count; i++) {
    let coin = new Coin();
    coin.x = x + i * spacing;
    coin.y = y;
    coins.push(coin);
  }

  return coins;
}

function createCoinArc(x, y, count, spacing) {
  let coins = [];

  for (let i = 0; i < count; i++) {
    let coin = new Coin();
    coin.x = x + i * spacing;
    coin.y = y - Math.sin(i * 0.5) * 80;
    coins.push(coin);
  }

  return coins;
}

function createLevel1() {
  const TILE_WIDTH = GAME_WIDTH;
  return new Level(
    [
      new PufferFish(600, 200, "green"),
      new PufferFish(1000, 250, "red"),
      new PufferFish(1400, 180, "orange"),
      new PufferFish(1800, 220, "red"),
      new JellyFish(600, 400, "green"),
      new JellyFish(1200, 200, "pink"),
      new Endboss(),
    ],

    [
      new BackgroundObject("../img/3. Background/Light/1.png", 0),
      new BackgroundObject("../img/3. Background/Light/2.png", TILE_WIDTH),
      new BackgroundObject("../img/3. Background/Light/1.png", 2 * TILE_WIDTH),
      new BackgroundObject("../img/3. Background/Light/2.png", 3 * TILE_WIDTH),
      new BackgroundObject("../img/3. Background/Light/1.png", 4 * TILE_WIDTH),
      new BackgroundObject("../img/3. Background/Light/2.png", 5 * TILE_WIDTH),
    ],

    [
      ...createCoinRow(600, 200, 5, 60),
      ...createCoinRow(1200, 180, 4, 60),
      ...createCoinArc(1600, 250, 6, 70),
    ],

    [
      new PoisonBottle(400, 300),
      new PoisonBottle(600, 350),
      new PoisonBottle(1005, 235),
      new PoisonBottle(1385, 295),
      new PoisonBottle(1685, 295),
    ],
  );
}
