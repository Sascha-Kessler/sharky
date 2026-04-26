class UIManager {
  showGameUI() {
    document.getElementById("game-ui").classList.remove("dnone");
  }

  hideStartscreen() {
    document.getElementById("startscreen").classList.add("dnone");
  }

  hideGameName() {
    document.getElementById("gameName").classList.add("dnone");
  }

  updatePauseIcon(isPaused) {
    document.getElementById("pauseIcon").src = isPaused
      ? "./img/play.png"
      : "./img/pause.png";
  }

  updateSoundIcon(soundOn) {
    document.getElementById("soundIcon").src = soundOn
      ? "./img/volume-off.png"
      : "./img/sound.png";
  }

  openOptions() {
    document.getElementById("options-overlay").classList.remove("dnone");
  }

  closeOptions() {
    document.getElementById("options-overlay").classList.add("dnone");
  }

  blurButton(id) {
    document.getElementById(id)?.blur();
  }

  showGameOverScreen() {
    const screen = document.getElementById("gameOverScreen");
    screen.classList.remove("dnone");
    screen.classList.add("slide-in");
  }

  showWinScreen() {
    const screen = document.getElementById("winScreen");
    screen.classList.remove("dnone");
    screen.classList.add("slide-in");
  }
}
