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
        return Math.sqrt(this.x*this.x + this.y*this.y) + 0.00001;
    }

    normalized() {
        return this.scaled(1/this.length());
    }

    normalize() {
        this.scale(1/this.length());
        return this;
    }

    take(vector) {
        this.x = vector.x;
        this.y = vector.y;
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
    constructor(playerName, id = -1) {
        super("player");
        this.id = id;
        this.html.id = `player-${playerName}`;
        this.velocity = new Vector();
        this.offPutting = new Vector();
        this.offPuttingVel = new Vector();
    }

    main() {
        this.velocity.scale(0);
        if (heldKeys["a"])
            this.velocity.x -= 1;
        if (heldKeys["d"])
            this.velocity.x += 1;
        if (heldKeys["w"])
            this.velocity.y -= 1;
        if (heldKeys["s"])
            this.velocity.y += 1;
        this.velocity.normalize();
        this.position.add(this.velocity);
    }

    off() {
        this.offPutting.add(this.offPuttingVel);
    }

    tick() {
        if (this.id == ID)
            this.main();
        else
            this.off();
        this.position.add(this.velocity);
    }

    camCoords() {
        let center = new Vector(window.innerWidth/2, window.innerHeight/2);
        center.add(this.offPutting);
        center.sub(this.dimensions.scaled(0.5)).add(this.position).sub(camera.position);
        return center;
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
        this.messages = document.createElement("div");
        this.input = document.createElement("input");
        this.input.onchange = e => {
            let message = `<${USERNAME}> ${this.input.value}\n`;
            this.input.value = "";
            callServer("chatMessage", message).then(msgs => {
                this.messages.innerText = msgs.split("\\n").join("\n");
            });
        };
        this.html.appendChild(this.messages);
        this.html.appendChild(this.input);
    }

    camCoords() {
        return new Vector(window.innerWidth - 310, window.innerHeight - 410);
    }
}

function getCookieOrSet(name, setter) {
    let value = localStorage.getItem(name);
    if (value)
        return value;
    value = setter();
    localStorage.setItem(name, value);
    return value;
}

function serverUpdateLoop() {
    let before = performance.now();
    callServer("proQuo", main).then(res => {
        res = JSON.parse(res);
        let after = performance.now();
        let ping = Math.round(after - before);
        chatbox.messages.innerText = `Ping: ${ping}\n${res.messages?.split("\\n").join("\n")}`;
        inspectPlayers(res.players, ping);
        setTimeout(serverUpdateLoop, 0);
    });
}

const TARGET_FPS = 60;
const TARGET_MS = 1000/TARGET_FPS;
const CAMERA_SPEED = 0.1;
const USERNAME = getCookieOrSet("name", _ => prompt("Please enter your username"));
let ID; 
callServer("playerJoin", USERNAME).then(id => {
    ID = id;
    main.id = id;
    serverUpdateLoop();
});

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

function inspectPlayers(plrs, ping) {
    let plrMap = {};
    for (let player of players)
        plrMap[player.id] = player;

    for (let player of plrs) {
        if (plrMap[player.id]) {
            if (player.id == ID)
                continue;
            let client = plrMap[player.id];
            client.offPutting.scale(0);
            client.offPuttingVel.scale(0).sub(client.position.subbed(player.position));
            client.offPuttingVel.normalize();
            client.position.take(player.position);
            continue;
        }
        players.push(new PlayerClient(player.name, player.id));
        console.log("Adding new player '" + player.name + "' with id " + player.id);
        console.log(players);
    }
}

let background = new Background()
let camera = new Camera();
let main = new PlayerClient("main");
let players = [main];
main.html.style.background = "blue";
let second = new TestEnemy();
let chatbox = new ChatBox();