class SoundManager {
  constructor() {
    this.soundOn = false;
    this.wasMusicPlayingBeforePause = false;

    this.sounds = {
      levelMusic: new Audio("./audio/Bubble Bounce Bay.mp3"),
      bubblePop: new Audio("./audio/bubble pop.mp3"),
      coinPickup: new Audio("./audio/coin pickup.mp3"),
      buttonKlick: new Audio("./audio/button klick.mp3"),
      bottlePickup: new Audio("./audio/glass bottle.mp3"),
      getsHit: new Audio("./audio/character get hit.wav"),
      gameOver: new Audio("./audio/game over sound.mp3"),
    };

    this.setupVolumes();
  }

  setupVolumes() {
    this.sounds.levelMusic.loop = true;
    this.sounds.levelMusic.volume = 0.2;
    this.sounds.bubblePop.volume = 0.4;
    this.sounds.coinPickup.volume = 0.4;
    this.sounds.buttonKlick.volume = 0.2;
    this.sounds.bottlePickup.volume = 0.4;
    this.sounds.getsHit.volume = 0.4;
    this.sounds.gameOver.volume = 0.4;
  }

  play(name) {
    if (!this.soundOn && name !== "buttonKlick") return;

    const sound = this.sounds[name];
    if (!sound) return;

    sound.currentTime = 0;
    sound.play();
  }

  playMusic() {
    if (this.soundOn) {
      this.sounds.levelMusic.play();
    }
  }

  pauseMusic() {
    this.sounds.levelMusic.pause();
  }

  toggleSound(isPaused) {
    this.soundOn = !this.soundOn;

    if (this.soundOn && !isPaused) {
      this.playMusic();
    } else {
      this.pauseMusic();
    }

    return this.soundOn;
  }

  pauseForGamePause() {
    this.wasMusicPlayingBeforePause = this.soundOn;
    this.pauseMusic();
  }

  resumeFromGamePause() {
    if (this.wasMusicPlayingBeforePause && this.soundOn) {
      this.playMusic();
    }
  }
}
