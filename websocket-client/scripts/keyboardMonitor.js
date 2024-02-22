let heldKeys = {};
let mousePos = {x: 0, y: 0}

window.onkeydown = e => {
    heldKeys[e.key] = true;
}

window.onkeyup = e => {
    heldKeys[e.key] = false;
}


window.onmousemove = e => {
    mousePos.x = e.clientX;
    mousePos.y = e.clientY;
}

window.onmousedown = e => {
    heldKeys["leftMouse"] = true;
}

window.onmouseup = e => {
    heldKeys["leftMouse"] = false;
}