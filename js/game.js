const GAME_WIDTH = 720;
const GAME_HEIGHT = 480;

let canvas;
let world;
let keyboard;

window.addEventListener("keydown", (event) => {
  keyboard.key[event.code] = true;
});

window.addEventListener("keyup", (event) => {
  keyboard.key[event.code] = false;
});

function init() {
  canvas = document.getElementById("canvas");
  resizeCanvas();

  keyboard = new Keyboard();
  const level1 = createLevel1();
  world = new World(canvas, keyboard, level1);
  window.addEventListener("resize", resizeCanvas);
  requestAnimationFrame(gameLoop);
}

function gameLoop() {
  world.update();
  world.draw();
  requestAnimationFrame(gameLoop);
}

function resizeCanvas() {
  const scaleX = window.innerWidth / GAME_WIDTH;
  const scaleY = (window.innerHeight - 60) / GAME_HEIGHT;

  const scale = Math.min(scaleX, scaleY);

  canvas.width = GAME_WIDTH;
  canvas.height = GAME_HEIGHT;

  canvas.style.width = GAME_WIDTH * scale + "px";
  canvas.style.height = GAME_HEIGHT * scale + "px";
}
