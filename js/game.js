const GAME_WIDTH = 720;
const GAME_HEIGHT = 480;

let canvas;
let world;


function init() {
  canvas = document.getElementById("canvas");
  resizeCanvas();

  world = new World(canvas);

  requestAnimationFrame(gameLoop);

  window.addEventListener("resize", resizeCanvas);
}


function gameLoop() {
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