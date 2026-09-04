/**
 * Manages all game sounds and music
 */
class SoundManager {
  /**
   * Creates a new sound manager and loads all audio files
   */
  constructor() {
    this.soundOn = false;
    this.soundWasOn = false;
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

  /**
   * Sets volume and loop settings for all sounds
   */
  setupVolumes() {
    const config = {
      levelMusic: { volume: 0.2, loop: true },
      bubblePop: { volume: 0.4 },
      coinPickup: { volume: 0.4 },
      buttonKlick: { volume: 0.2 },
      bottlePickup: { volume: 0.4 },
      getsHit: { volume: 0.4 },
      gameOver: { volume: 0.4 },
    };

    Object.entries(config).forEach(([key, settings]) => {
      const sound = this.sounds[key];
      if (!sound) return;

      sound.volume = settings.volume ?? 1;
      if (settings.loop) sound.loop = true;
    });
  }

  /**
   * Plays a sound by name
   * @param {string} name
   */
  play(name) {
    if (!this.soundOn) return;

    const sound = this.sounds[name];

    if (!sound) return;

    sound.currentTime = 0;

    sound.play();
  }

  /**
   * Starts background music
   */
  playMusic() {
    if (this.soundOn) {
      this.sounds.levelMusic.play();
    }
  }

  /**
   * Pauses background music
   */
  pauseMusic() {
    this.sounds.levelMusic.pause();
  }

  /**
   * Toggles sound on/off
   * @param {boolean} isPaused
   * @returns {boolean}
   */
  toggleSound(isPaused) {
    this.soundOn = !this.soundOn;

    if (this.soundOn && !isPaused) {
      this.playMusic();
    } else {
      this.pauseMusic();
    }

    return this.soundOn;
  }

  /**
   * Pauses music when the game is paused
   */
  pauseForGamePause() {
    this.wasMusicPlayingBeforePause = this.soundOn;
    this.pauseMusic();
  }

  /**
   * Resumes music after pause if it was playing before
   */
  resumeFromGamePause() {
    if (this.wasMusicPlayingBeforePause && this.soundOn) {
      this.playMusic();
    }
  }

  reset() {
    this.soundOn = false;
    this.wasMusicPlayingBeforePause = false;

    this.pauseMusic();

    this.sounds.levelMusic.currentTime = 0;
  }
}
