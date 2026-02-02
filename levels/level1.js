function createLevel1(canvas) {
  return new Level(
    [new PufferFish(), new PufferFish(), new PufferFish()],
    [
      new BackgroundObject("../img/3. Background/Light/1.png", 0, canvas),
      new BackgroundObject(
        "../img/3. Background/Light/2.png",
        canvas.width,
        canvas,
      ),
    ],
  );
}
