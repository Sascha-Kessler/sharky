const GAME_WIDTH = 720;
const GAME_HEIGHT = 480;

let gameStarted = false;
let gameOver = false;
let winGame = false;
let gameOverSoundPlayed = false;
window.DEBUG = {
  hitbox: false,
};

let canvas;
let world;
let keyboard;
let isPaused = false;
let startingScreenBackground = ["../img/3. Background/Mesa de trabajo 1.png"];
let soundManager;
let inputManager;
let uiManager;

function init() {
  canvas = document.getElementById("canvas");
  keyboard = new Keyboard();
  inputManager = new InputManager(keyboard);
  uiManager = new UIManager();
  soundManager = new SoundManager();

  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);
}

function gameLoop() {
  if (!world) return;

  if (!isPaused && !gameOver) {
    world.update();
  }

  if (gameOver && !gameOverSoundPlayed && soundManager.soundOn) {
    soundManager.pauseMusic();
    soundManager.play("gameOver");
    gameOverSoundPlayed = true;
  }
  if (world.character.deadAnimationFinished && !gameOver) {
    gameOver = true;
    uiManager.showGameOverScreen();
  }

  const boss = world.enemies.find((enemy) => enemy instanceof Endboss);

  if (boss?.deadAnimationFinished && !winGame) {
    winGame = true;
    uiManager.showWinScreen();
  }

  world.draw();
  requestAnimationFrame(gameLoop);
}

function isTouchDevice() {
  return (
    window.matchMedia("(pointer: coarse)").matches ||
    window.matchMedia("(hover: none)").matches ||
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0
  );
}

function resizeCanvas() {
  const gameContainer = document.getElementById("gameContainer");
  const viewportWidth = window.visualViewport
    ? window.visualViewport.width
    : window.innerWidth;
  const viewportHeight = window.visualViewport
    ? window.visualViewport.height
    : window.innerHeight;

  canvas.width = GAME_WIDTH;
  canvas.height = GAME_HEIGHT;

  const isMobile = isTouchDevice();

  let displayWidth;
  let displayHeight;

  if (isMobile) {
    displayWidth = Math.floor(viewportWidth);
    displayHeight = Math.floor(viewportHeight);
  } else {
    const scaleX = (viewportWidth - 2) / GAME_WIDTH;
    const scaleY = (viewportHeight - 2) / GAME_HEIGHT;
    const scale = Math.min(scaleX, scaleY);

    displayWidth = Math.floor(GAME_WIDTH * scale);
    displayHeight = Math.floor(GAME_HEIGHT * scale);
  }

  canvas.style.width = `${displayWidth}px`;
  canvas.style.height = `${displayHeight}px`;

  gameContainer.style.width = `${displayWidth}px`;
  gameContainer.style.height = `${displayHeight}px`;

  if (world) {
    world.healthbar?.setResponsivePosition();
    world.coinbar?.setResponsivePosition();
    world.poisonbar?.setResponsivePosition();
  }
}

function startGame() {
  soundManager.play("buttonKlick");
  document.getElementById("gameName").classList.add("dnone");

  if (gameStarted) return;
  gameStarted = true;

  document.getElementById("gameContainer").classList.remove("dnone");
  document.getElementById("startscreen").classList.add("dnone");
  document.getElementById("game-ui").classList.remove("dnone");

  const level1 = createLevel1();
  world = new World(canvas, keyboard, level1, soundManager);

  requestAnimationFrame(gameLoop);
}

function togglePause() {
  soundManager.play("buttonKlick");
  isPaused = !isPaused;

  uiManager.updatePauseIcon(isPaused);

  if (isPaused) {
    soundManager.pauseForGamePause();
  } else {
    soundManager.resumeFromGamePause();
  }

  uiManager.blurButton("pauseBtn");
}

function toggleSound() {
  soundManager.play("buttonKlick");

  const soundOn = soundManager.toggleSound(isPaused);

  uiManager.updateSoundIcon(soundOn);
  uiManager.blurButton("soundBtn");
}

function endGame() {
  location.reload();
}

function openOptions() {
  uiManager.openOptions();
}

function closeOptions() {
  uiManager.closeOptions();
}
