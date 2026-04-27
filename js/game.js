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
let soundManager;
let inputManager;
let uiManager;

/**
 * Initializes game systems and canvas setup
 */
function init() {
  canvas = document.getElementById("canvas");
  keyboard = new Keyboard();
  inputManager = new InputManager(keyboard);
  uiManager = new UIManager();
  soundManager = new SoundManager();

  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);
}

/**
 * Starts the game and creates the world
 */
function startGame() {
  soundManager.play("buttonKlick");

  if (gameStarted) return;

  gameStarted = true;
  uiManager.showGameScreen();

  const level1 = createLevel1();
  world = new World(canvas, keyboard, level1, soundManager);

  requestAnimationFrame(gameLoop);
}

/**
 * Main game loop
 */
function gameLoop() {
  if (!world) return;

  updateGame();
  checkGameOver();
  checkWinGame();
  playGameOverSound();

  world.draw();
  requestAnimationFrame(gameLoop);
}

/**
 * Updates the world if the game is active
 */
function updateGame() {
  if (!isPaused && !gameOver && !winGame) {
    world.update();
  }
}

/**
 * Checks if the character death animation finished
 */
function checkGameOver() {
  if (world.character.deadAnimationFinished && !gameOver) {
    gameOver = true;
    uiManager.showGameOverScreen();
  }
}

/**
 * Checks if the endboss death animation finished
 */
function checkWinGame() {
  const boss = world.enemies.find((enemy) => enemy instanceof Endboss);

  if (boss?.deadAnimationFinished && !winGame) {
    winGame = true;
    uiManager.showWinScreen();
  }
}

/**
 * Plays the game over sound once
 */
function playGameOverSound() {
  if (gameOver && !gameOverSoundPlayed && soundManager.soundOn) {
    soundManager.pauseMusic();
    soundManager.play("gameOver");
    gameOverSoundPlayed = true;
  }
}

/**
 * Resizes canvas and game container responsively
 */
function resizeCanvas() {
  const viewport = getViewportSize();
  const isMobile = isTouchDevice();

  setCanvasResolution();

  const displaySize = calculateDisplaySize(viewport, isMobile);

  applyCanvasStyles(displaySize);
  updateStatusbarPositions();
}

/**
 * Returns the current viewport size
 * @returns {{width: number, height: number}}
 */
function getViewportSize() {
  return {
    width: window.visualViewport
      ? window.visualViewport.width
      : window.innerWidth,
    height: window.visualViewport
      ? window.visualViewport.height
      : window.innerHeight,
  };
}

/**
 * Sets the internal canvas resolution
 */
function setCanvasResolution() {
  canvas.width = GAME_WIDTH;
  canvas.height = GAME_HEIGHT;
}

/**
 * Calculates displayed canvas size
 * @param {{width: number, height: number}} viewport
 * @param {boolean} isMobile
 * @returns {{width: number, height: number}}
 */
function calculateDisplaySize(viewport, isMobile) {
  if (isMobile) {
    return {
      width: Math.floor(viewport.width),
      height: Math.floor(viewport.height),
    };
  }

  const scaleX = (viewport.width - 2) / GAME_WIDTH;
  const scaleY = (viewport.height - 2) / GAME_HEIGHT;
  const scale = Math.min(scaleX, scaleY);

  return {
    width: Math.floor(GAME_WIDTH * scale),
    height: Math.floor(GAME_HEIGHT * scale),
  };
}

/**
 * Applies display size to canvas and game container
 * @param {{width: number, height: number}} size
 */
function applyCanvasStyles(size) {
  const gameContainer = document.getElementById("game-container");

  canvas.style.width = `${size.width}px`;
  canvas.style.height = `${size.height}px`;

  gameContainer.style.width = `${size.width}px`;
  gameContainer.style.height = `${size.height}px`;
}

/**
 * Updates responsive positions for status bars
 */
function updateStatusbarPositions() {
  if (!world) return;

  world.healthbar?.setResponsivePosition();
  world.coinbar?.setResponsivePosition();
  world.poisonbar?.setResponsivePosition();
}

/**
 * Checks if the device likely uses touch input
 * @returns {boolean}
 */
function isTouchDevice() {
  return (
    window.matchMedia("(pointer: coarse)").matches ||
    window.matchMedia("(hover: none)").matches ||
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0
  );
}

/**
 * Toggles pause state
 */
function togglePause() {
  soundManager.play("buttonKlick");

  isPaused = !isPaused;

  uiManager.updatePauseIcon(isPaused);
  uiManager.setButtonDisabled("sound-btn", isPaused);

  if (isPaused) {
    soundManager.pauseForGamePause();
  } else {
    soundManager.resumeFromGamePause();
  }

  uiManager.blurButton("pause-btn");
}

/**
 * Toggles sound state
 */
function toggleSound() {
  soundManager.play("buttonKlick");

  const soundOn = soundManager.toggleSound(isPaused);

  uiManager.updateSoundIcon(soundOn);
  uiManager.blurButton("sound-btn");
}

/**
 * Reloads the game
 */
function endGame() {
  location.reload();
}

/**
 * Opens the options overlay
 */
function openOptions() {
  uiManager.openOptions();
}

/**
 * Closes the options overlay
 */
function closeOptions() {
  uiManager.closeOptions();
}
