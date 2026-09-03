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
 * Sets up event listeners and initial UI elements
 */
function init() {
  canvas = document.getElementById("canvas");
  keyboard = new Keyboard();
  inputManager = new InputManager(keyboard);
  uiManager = new UIManager();
  soundManager = new SoundManager();

  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  showRotateHint();
}

/**
 * Resets game control states and managers
 * Used when restarting the game or creating a new world
 */
function resetGameControls() {
  isPaused = false;

  soundManager.reset();
  uiManager.updateSoundIcon(false);
  uiManager.updatePauseIcon(false);
  uiManager.setButtonDisabled("sound-btn", false);
}

/**
 * Creates a new game world with level 1
 * Resets game controls and initializes the world
 */
function createGameWorld() {
  resetGameControls();

  const level1 = createLevel1();
  world = new World(canvas, keyboard, level1, soundManager);

  uiManager.showGameScreen();
}

/**
 * Starts the game if not already started
 * Plays sound effect, hides imprint button, creates world and starts game loop
 */
function startGame() {
  soundManager.play("buttonKlick");

  if (gameStarted) return;

  gameStarted = true;

  document.getElementById("imprint-btn").classList.add("d-none");

  createGameWorld();
  requestAnimationFrame(gameLoop);
}

/**
 * Restarts the game completely
 * Resets game state flags and creates a new game world
 */
function restartGame() {
  gameOver = false;
  winGame = false;
  gameOverSoundPlayed = false;

  createGameWorld();
  uiManager.showGameScreen();
}

/**
 * Main game loop that runs continuously
 * Handles game updates and rendering
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
 * Updates the game world if game is active and not paused
 * Only updates when game is running and not in pause state
 */
function updateGame() {
  if (!isPaused && !gameOver && !winGame) {
    world.update();
  }
}

/**
 * Checks if the character death animation has finished
 * Shows game over screen when character dies
 */
function checkGameOver() {
  if (world.character.deadAnimationFinished && !gameOver) {
    gameOver = true;
    uiManager.showGameOverScreen();
  }
}

/**
 * Checks if the endboss death animation has finished
 * Shows win screen when endboss is defeated
 */
function checkWinGame() {
  const boss = world.enemies.find((enemy) => enemy instanceof Endboss);

  if (boss?.deadAnimationFinished && !winGame) {
    winGame = true;
    uiManager.showWinScreen();
  }
}

/**
 * Plays the game over sound effect once when game ends
 * @param {boolean} gameOver - Whether the game is over
 * @param {boolean} gameOverSoundPlayed - Flag to track if sound was played
 * @param {SoundManager} soundManager - The sound manager instance
 */
function playGameOverSound() {
  if (gameOver && !gameOverSoundPlayed && soundManager.soundOn) {
    soundManager.pauseMusic();
    soundManager.play("gameOver");
    gameOverSoundPlayed = true;
  }
}

/**
 * Handles canvas resizing and responsive layout adjustments
 * Updates both internal resolution and display size
 */
function resizeCanvas() {
  const viewport = getViewportSize();
  const isMobile = isTouchDevice();

  setCanvasResolution();

  const displaySize = calculateDisplaySize(viewport, isMobile);

  applyCanvasStyles(displaySize);
}

/**
 * Gets the current viewport size considering different browser APIs
 * @returns {{width: number, height: number}} The viewport dimensions
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
 * Sets the internal canvas resolution to the game's base resolution
 * This defines the game's logical coordinate system
 */
function setCanvasResolution() {
  canvas.width = GAME_WIDTH;
  canvas.height = GAME_HEIGHT;
}

/**
 * Calculates the display size for the canvas based on viewport and device type
 * @param {{width: number, height: number}} viewport - The viewport dimensions
 * @param {boolean} isMobile - Whether the device is a mobile/touch device
 * @returns {{width: number, height: number}} The calculated display size
 */
function calculateDisplaySize(viewport, isMobile) {
  if (isMobile) {
    return {
      width: Math.floor(viewport.width),
      height: Math.floor(viewport.height),
    };
  }
  const scale = calculateScale(viewport);
  return {
    width: Math.floor(GAME_WIDTH * scale),
    height: Math.floor(GAME_HEIGHT * scale),
  };
}

/**
 * Calculates the scale factor to maintain aspect ratio
 * @param {{width: number, height: number}} viewport - The viewport dimensions
 * @returns {number} The scale factor
 */
function calculateScale(viewport) {
  const scaleX = (viewport.width - 2) / GAME_WIDTH;
  const scaleY = (viewport.height - 2) / GAME_HEIGHT;
  const scale = Math.min(scaleX, scaleY);
  return scale;
}

/**
 * Applies the calculated display size to canvas and game container elements
 * @param {{width: number, height: number}} size - The display size to apply
 */
function applyCanvasStyles(size) {
  const gameContainer = document.getElementById("game-container");

  canvas.style.width = `${size.width}px`;
  canvas.style.height = `${size.height}px`;

  gameContainer.style.width = `${size.width}px`;
  gameContainer.style.height = `${size.height}px`;
}

/**
 * Detects if the device is likely using touch input
 * @returns {boolean} True if the device appears to be touch-based
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
 * Toggles the pause state of the game
 * Updates UI and sound accordingly
 */
function togglePause() {
  soundManager.play("buttonKlick");
  isPaused = !isPaused;

  uiManager.updatePauseIcon(isPaused);
  uiManager.setButtonDisabled("sound-btn", isPaused);

  isPaused
    ? soundManager.pauseForGamePause()
    : soundManager.resumeFromGamePause();

  uiManager.blurButton("pause-btn");
}

/**
 * Toggles the sound on/off state
 * Updates UI and sound manager accordingly
 */
function toggleSound() {
  soundManager.play("buttonKlick");

  const soundOn = soundManager.toggleSound(isPaused);

  uiManager.updateSoundIcon(soundOn);
  uiManager.blurButton("sound-btn");
}

/**
 * Resets the game state and returns to the start screen
 * Cleans up game state and hides game UI elements
 */
function endGame() {
  gameStarted = false;
  gameOver = false;
  winGame = false;
  gameOverSoundPlayed = false;
  isPaused = false;
  soundManager.pauseMusic();
  soundManager.soundOn = false;
  showStartScreen();

  world = null;
}

/**
 * Shows the start screen and hides all other game screens
 * Resets UI elements to their initial state
 */
function showStartScreen() {
  document.getElementById("imprint-btn").classList.remove("d-none");
  document.getElementById("game-container").classList.add("d-none");
  document.getElementById("game-over-screen").classList.add("d-none");
  document.getElementById("win-screen").classList.add("d-none");
  document.getElementById("game-ui").classList.add("d-none");
  document.getElementById("start-screen").classList.remove("d-none");
}

/**
 * Opens the options overlay
 * Hides the imprint button while options are shown
 */
function openOptions() {
  uiManager.openOptions();
  document.getElementById("imprint-btn").classList.add("d-none");
}

/**
 * Closes the options overlay
 * Restores the imprint button visibility
 */
function closeOptions() {
  uiManager.closeOptions();
  document.getElementById("imprint-btn").classList.remove("d-none");
}

/**
 * Shows a rotate hint for mobile portrait orientation
 * Automatically hides after 3 seconds if in portrait mode
 */
function showRotateHint() {
  if (!isTouchDevice()) return;

  const warning = document.getElementById("rotate-warning");
  const isPortrait = window.innerHeight > window.innerWidth;

  if (isPortrait) {
    warning.classList.remove("d-none");
    setTimeout(() => {
      warning.classList.add("d-none");
    }, 3000);
  }
}

/**
 * Opens the imprint overlay
 * Hides the imprint button while imprint is shown
 */
function openImprint() {
  document.getElementById("imprint").classList.remove("d-none");
  document.getElementById("imprint-btn").classList.add("d-none");
}

/**
 * Closes the imprint overlay
 * Restores the imprint button visibility
 */
function closeImprint() {
  document.getElementById("imprint").classList.add("d-none");
  document.getElementById("imprint-btn").classList.remove("d-none");
}
