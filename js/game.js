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
  window.sounds.buttonKlick.play();
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

  isPaused = !isPaused;
  button.blur();

  button.innerText = isPaused ? "Resume" : "Pause";

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
  const soundButton = document.getElementById("soundBtn");

  if (window.soundOn) {
    soundButton.innerText = "Sound Off";

    if (!isPaused) {
      window.sounds.levelMusic.play();
    }
  } else {
    soundButton.innerText = "Sound On";
    window.sounds.levelMusic.pause();
  }

  soundButton.blur();
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
    // for IE11 (remove June 15, 2022)
    element.msRequestFullscreen();
  }
}

function exitFullscreen() {
  console.log("exit");
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
