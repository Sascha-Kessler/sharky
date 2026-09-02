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

  showRotateHint();
}

function resetGameControls() {
  isPaused = false;

  soundManager.reset();
  uiManager.updateSoundIcon(false);
  uiManager.updatePauseIcon(false);
  uiManager.setButtonDisabled("sound-btn", false);
}

function createGameWorld() {
  resetGameControls();

  const level1 = createLevel1();
  world = new World(canvas, keyboard, level1, soundManager);

  uiManager.showGameScreen();
}

/**
 * Starts the game and creates the world
 */
function startGame() {
  soundManager.play("buttonKlick");

  if (gameStarted) return;

  gameStarted = true;

  document.getElementById("imprint-btn").classList.add("d-none");

  createGameWorld();
  requestAnimationFrame(gameLoop);
}

function restartGame() {
  gameOver = false;
  winGame = false;
  gameOverSoundPlayed = false;

  createGameWorld();
  uiManager.showGameScreen();
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
  const scale = calculateScale(viewport);
  return {
    width: Math.floor(GAME_WIDTH * scale),
    height: Math.floor(GAME_HEIGHT * scale),
  };
}

function calculateScale(viewport) {
  const scaleX = (viewport.width - 2) / GAME_WIDTH;
  const scaleY = (viewport.height - 2) / GAME_HEIGHT;
  const scale = Math.min(scaleX, scaleY);
  return scale;
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

  isPaused
    ? soundManager.pauseForGamePause()
    : soundManager.resumeFromGamePause();

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
 * Resets the game state and returns to the start screen without reloading the page
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
 */
function openOptions() {
  uiManager.openOptions();
  document.getElementById("imprint-btn").classList.add("d-none");
}

/**
 * Closes the options overlay
 */
function closeOptions() {
  uiManager.closeOptions();
  document.getElementById("imprint-btn").classList.remove("d-none");
}

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

function openImprint() {
  document.getElementById("imprint").classList.remove("d-none");
  document.getElementById("imprint-btn").classList.add("d-none");
}

function closeImprint() {
  document.getElementById("imprint").classList.add("d-none");
  document.getElementById("imprint-btn").classList.remove("d-none");
}
window.addEventListener("resize", showRotateHint);
window.addEventListener("load", showRotateHint);

function saveAllKeyBindings() {
  // 1. Alle Input-Felder auswählen (für alle Keybindings)
  const keyInputs = document.querySelectorAll(".keybind-input");

  // 2. Durch jedes Input-Feld iterieren
  keyInputs.forEach((input) => {
    // 3. Aktuellen Tastenwert aus dem Input-Feld auslesen
    const currentKey = input.value.trim().toUpperCase();

    // 4. Zugehörigen Container (parent <li>) finden, um die Aktion zu ermitteln
    const container = input.closest("[data-action]");
    const action = container.getAttribute("data-action");

    // 5. Taste in die keyMap eintragen (je nach Tastentyp)
    if (currentKey === "SPACE") {
      inputManager.keyMap["Space"] = action.toUpperCase();
    } else if (currentKey.length === 1) {
      // Für Buchstaben wie "D", "W", etc.
      inputManager.keyMap[`Key${currentKey}`] = action.toUpperCase();
    } else if (currentKey === "ARROWLEFT") {
      inputManager.keyMap["ArrowLeft"] = action.toUpperCase();
    } else if (currentKey === "ARROWRIGHT") {
      inputManager.keyMap["ArrowRight"] = action.toUpperCase();
    } else if (currentKey === "ARROWUP") {
      inputManager.keyMap["ArrowUp"] = action.toUpperCase();
    } else if (currentKey === "ARROWDOWN") {
      inputManager.keyMap["ArrowDown"] = action.toUpperCase();
    }

    // 6. Den zugehörigen Span mit der neuen Taste aktualisieren
    const currentKeySpan = container.querySelector(".current-key");
    currentKeySpan.textContent = currentKey;
  });

  // Optional: Rückmeldung geben
  alert("Alle Keybindings wurden gespeichert!");
}
