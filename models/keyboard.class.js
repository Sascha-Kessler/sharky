class Keyboard {
    key = {};

    isPressed(code) {
        return !!this.key[code];
    }
}