class Vector {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    scaled(scalar) {
        return new Vector(this.x * scalar, this.y * scalar);
    }

    scale(scalar) {
        this.x *= scalar;
        this.y *= scalar;
        return this;
    }

    added(vector) {
        return new Vector(this.x + vector.x, this.y + vector.y);
    }

    add(vector) {
        this.x += vector.x;
        this.y += vector.y;
        return this;
    }

    subbed(vector) {
        return new Vector(this.x - vector.x, this.y - vector.y);
    }

    sub(vector) {
        this.x -= vector.x;
        this.y -= vector.y;
        return this;
    }

    length() {
        return Math.sqrt(this.x*this.x + this.y*this.y) + 0.0001;
    }

    normalized() {
        return this.scaled(1/this.length());
    }

    normalize() {
        this.scale(1/this.length());
        return this;
    }
}

class Thing {
    constructor(position = new Vector(), dimensions = new Vector(50, 50)) {
        this.position = position;
        this.dimensions = dimensions;
    }

    camCoords() {
        let center = new Vector(window.innerWidth/2, window.innerHeight/2);
        center.sub(this.dimensions.scaled(0.5)).add(this.position).sub(camera.position);
        return center;
    }
}

class ScreenThing extends Thing {
    constructor(className) {
        super();
        this.html = document.createElement("div");
        this.html.classList.add(className);
        document.getElementById("canvas").appendChild(this.html);
        hookTask(_=>this._tick());
    }

    _tick() {
        this.tick();
        this.updateHtml();
    }

    tick() {

    }

    remove() {
        this.html.remove();
    }

    updateHtml() {
        let camPos = this.camCoords();
        this.html.style.left = camPos.x + "px";
        this.html.style.top = camPos.y + "px";
    }
}

class Camera extends ScreenThing {
    constructor() {
        super("camera");
    }

    tick() {
        let dif = main.position.subbed(this.position);
        dif.scale(CAMERA_SPEED);
        this.position.add(dif);
    }
}

class PlayerClient extends ScreenThing {
    constructor(playerName) {
        super("player");
        this.html.id = `player-${playerName}`;
    }

    tick() {
        let vel = new Vector();
        if (heldKeys["a"])
            vel.x = -1;
        if (heldKeys["d"])
            vel.x = 1;
        if (heldKeys["w"])
            vel.y = -1;
        if (heldKeys["s"])
            vel.y = 1;
        this.position.add(vel);
    }
}

class TestEnemy extends ScreenThing {
    constructor() {
        super("enemy");
    }

    tick() {
        // Go towards the player 'main'
        let dif = main.position.subbed(this.position);
        dif.normalize().scale(0.2);
        this.position.add(dif);
    }
}

class Background extends ScreenThing {
    constructor() {
        super("background");
    }

    tick() {
        
    }
}

class ChatBox extends ScreenThing {
    constructor() {
        super("chatbox");
    }

    camCoords() {
        return new Vector(window.innerWidth - 310, window.innerHeight - 410);
    }
}


const TARGET_FPS = 60;
const TARGET_MS = 1000/TARGET_FPS;
const CAMERA_SPEED = 0.1;

let timing = TARGET_MS;
let fade = 0.1;

function gameLoop() {
    let before = performance.now();
    gameTick();
    let after = performance.now();
    let delta = after - before;
    let diff = TARGET_MS - delta;
    timing = timing * (1-fade) + diff * fade;
    setTimeout(gameLoop, timing);
}
window.onload = gameLoop;

let tasks = [];
let hookTask = task => tasks.push(task);

function gameTick() {
    for (let task of tasks)
        task();
}


let background = new Background()
let camera = new Camera();
let main = new PlayerClient("main");
main.html.style.background = "blue";
let second = new TestEnemy();
let chatbox = new ChatBox();