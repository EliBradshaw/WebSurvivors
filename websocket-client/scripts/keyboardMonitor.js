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
    if (e.button != 0)
        return;
    mousePos.x = e.clientX;
    mousePos.y = e.clientY;
    heldKeys["leftMouse"] = true;
}

window.oncontextmenu = e => {
    e.preventDefault();
    heldKeys["rightMouse"] = true;
}

window.onmouseup = e => {
    heldKeys["leftMouse"] = false;
    heldKeys["rightMouse"] = false;
}