/**
 * Manages all UI-related actions and DOM updates
 */
class UIManager {
  /**
   * Shows the in-game UI
   */
  showGameUI() {
    document.getElementById("game-ui").classList.remove("d-none");
  }

  /**
   * Hides the start screen
   */
  hideStartScreen() {
    document.getElementById("start-screen").classList.add("d-none");
  }

  /**
   * Hides the game title
   */
  hideGameName() {
    document.getElementById("game-name").classList.add("d-none");
  }

  /**
   * Updates the pause button icon
   * @param {boolean} isPaused
   */
  updatePauseIcon(isPaused) {
    document.getElementById("pause-icon").src = isPaused
      ? "./img/play.png"
      : "./img/pause.png";
  }

  /**
   * Updates the sound button icon
   * @param {boolean} soundOn
   */
  updateSoundIcon(soundOn) {
    document.getElementById("sound-icon").src = soundOn
      ? "./img/volume-off.png"
      : "./img/sound.png";
  }

  /**
   * Opens the options overlay
   */
  openOptions() {
    document.getElementById("options-overlay").classList.remove("d-none");
  }

  /**
   * Closes the options overlay
   */
  closeOptions() {
    document.getElementById("options-overlay").classList.add("d-none");
  }

  /**
   * Removes focus from a button
   * @param {string} id
   */
  blurButton(id) {
    document.getElementById(id)?.blur();
  }

  /**
   * Shows the game over screen
   */
  showGameOverScreen() {
    const screen = document.getElementById("game-over-screen");
    screen.classList.remove("d-none");
    screen.classList.add("slide-in");
  }

  /**
   * Shows the win screen
   */
  showWinScreen() {
    const screen = document.getElementById("win-screen");
    screen.classList.remove("d-none");
    screen.classList.add("slide-in");
  }

  /**
   * Switches from start screen to game screen
   */
  showGameScreen() {
    document.getElementById("game-name").classList.add("d-none");
    document.getElementById("game-container").classList.remove("d-none");
    document.getElementById("start-screen").classList.add("d-none");
    document.getElementById("game-ui").classList.remove("d-none");
  }

  /**
   * Enables or disables a button
   * @param {string} id
   * @param {boolean} disabled
   */
  setButtonDisabled(id, disabled) {
    document.getElementById(id).disabled = disabled;
  }
}
