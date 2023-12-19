let heldKeys = {};

window.onkeydown = e => {
    heldKeys[e.key] = true;
}

window.onkeyup = e => {
    heldKeys[e.key] = false;
}