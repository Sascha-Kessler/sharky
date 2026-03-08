const GAME_WIDTH = 720;
const GAME_HEIGHT = 480;
let gameStarted = false;

let canvas;
let world;
let keyboard;
let isPaused = false;
let startingScreenBackground = ["../img/3. Background/Mesa de trabajo 1.png"];

window.addEventListener("keydown", (event) => {
  if (keyboard) {
    keyboard.key[event.code] = true;
  }

  console.log("keydown:", event.code, event.key);
});

window.addEventListener("keyup", (event) => {
  if (keyboard) {
    keyboard.key[event.code] = false;
  }

  console.log("keyup:", event.code, event.key);
});

function init() {
  canvas = document.getElementById("canvas");
  resizeCanvas();

  keyboard = new Keyboard();

  window.addEventListener("resize", resizeCanvas);
}

function gameLoop() {
  if (!world) return;

  if (!isPaused) {
    world.update();
  }

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

function startGame() {
  if (gameStarted) return;
  gameStarted = true;

  document.getElementById("canvas").classList.remove("dnone");
  document.getElementById("startscreen").classList.add("dnone");
  document.getElementById("pauseBtn").style.display = "block";
  const level1 = createLevel1();
  world = new World(canvas, keyboard, level1);
  requestAnimationFrame(gameLoop);
}

function togglePause() {
  const button = document.getElementById("pauseBtn");

  isPaused = !isPaused;
  button.blur();

  button.innerText = isPaused ? "Resume" : "Pause";
}
