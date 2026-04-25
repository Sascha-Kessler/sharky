const GAME_WIDTH = 720;
const GAME_HEIGHT = 480;

let gameStarted = false;
let gameOver = false;
let winGame = false;
window.DEBUG = {
  hitbox: false,
};

let gameOverSoundPlayed = false;
let canvas;
let world;
let keyboard;
let isPaused = false;
let startingScreenBackground = ["../img/3. Background/Mesa de trabajo 1.png"];
window.soundOn = false;
window.wasMusicPlayingBeforePause = false;

window.sounds = {
  levelMusic: new Audio("../audio/Bubble Bounce Bay.mp3"),
  bubblePop: new Audio("../audio/bubble pop.mp3"),
  coinPickup: new Audio("../audio/coin pickup.mp3"),
  buttonKlick: new Audio("../audio/button klick.mp3"),
  bottlePickup: new Audio("../audio/glass bottle.mp3"),
  getsHit: new Audio("../audio/character get hit.wav"),
  gameOver: new Audio("../audio/game over sound.mp3"),
};

window.sounds.levelMusic.loop = true;
window.sounds.levelMusic.volume = 0.2;
window.sounds.bubblePop.volume = 0.4;
window.sounds.coinPickup.volume = 0.4;
window.sounds.buttonKlick.volume = 0.2;
window.sounds.bottlePickup.volume = 0.4;
window.sounds.getsHit.volume = 0.4;
window.sounds.gameOver.volume = 0.4;

window.addEventListener("keyup", (event) => {
  const blockedKeys = [
    "ArrowUp",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "Space",
  ];

  if (blockedKeys.includes(event.code)) {
    event.preventDefault();
  }

  if (keyboard) {
    keyboard.key[event.code] = false;
  }

  console.log("keyup:", event.code, event.key);
});

window.addEventListener("keydown", (event) => {
  const blockedKeys = [
    "ArrowUp",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "Space",
  ];

  if (blockedKeys.includes(event.code)) {
    event.preventDefault();
  }

  if (keyboard) {
    keyboard.key[event.code] = true;
  }

  console.log("keydown:", event.code, event.key);
});

function init() {
  canvas = document.getElementById("canvas");
  keyboard = new Keyboard();

  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);
}

function gameLoop() {
  if (!world) return;

  if (!isPaused && !gameOver) {
    world.update();
  }

  if (gameOver && !gameOverSoundPlayed && soundOn) {
    window.sounds.levelMusic.pause();
    window.sounds.gameOver.play();
    gameOverSoundPlayed = true;
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
    world.bottlebar?.setResponsivePosition();
  }
}

function startGame() {
  window.sounds.buttonKlick.play();
  document.getElementById("gameName").classList.add("dnone");

  if (gameStarted) return;
  gameStarted = true;

  document.getElementById("gameContainer").classList.remove("dnone");
  document.getElementById("startscreen").classList.add("dnone");
  document.getElementById("pauseBtn").style.display = "block";

  const level1 = createLevel1();
  world = new World(canvas, keyboard, level1);

  requestAnimationFrame(gameLoop);
}

function togglePause() {
  window.sounds.buttonKlick.play();
  const button = document.getElementById("pauseBtn");
  const icon = document.getElementById("pauseIcon");
  isPaused = !isPaused;
  button.blur();

  icon.src = isPaused ? "./img/play.png" : "./img/pause.png";

  if (isPaused) {
    window.wasMusicPlayingBeforePause = window.soundOn;
    window.sounds.levelMusic.pause();
  } else {
    if (window.wasMusicPlayingBeforePause && window.soundOn) {
      window.sounds.levelMusic.play();
    }
  }
}

function toggleSound() {
  window.sounds.buttonKlick.play();

  window.soundOn = !window.soundOn;

  const icon = document.getElementById("soundIcon");

  icon.src = window.soundOn ? "./img/volume-off.png" : "./img/sound.png";

  if (window.soundOn && !isPaused) {
    window.sounds.levelMusic.play();
  } else {
    window.sounds.levelMusic.pause();
  }
  soundBtn.blur();
}

function endGame() {
  location.reload();
}

function openOptions() {
  document.getElementById("options-overlay").classList.remove("dnone");
}

function closeOptions() {
  document.getElementById("options-overlay").classList.add("dnone");
}

function enterFullscreen(element) {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen();
  }
}

function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
}

function fullscreen() {
  let fullscreen = document.getElementById("fullscreen");
  enterFullscreen(fullscreen);
}
