import Background from "./Background.js";
import Camera from "./Camera.js";
import ChatBox from "./ChatBox.js";
import PlayerClient from "./PlayerClient.js";
import SThingHandler from "./SThingHandler.js";
import Server from "./Server.js";
import EnemyClient from "./EnemyClient.js";
import Rect from "./Rect.js";

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
    Server.call("proQuo", main).then(res => {
        res = JSON.parse(res);
        let after = performance.now();
        let ping = Math.round(after - before);
        chatbox.ping.innerText = `Ping: ${ping}`;
        chatbox.messages.innerText = `${res.messages?.split("\\n").join("\n")}`;
        inspectRects(res.rects);
        inspectPlayers(res.players);
        inspectEnemies(res.enemies);
        setTimeout(serverUpdateLoop, 0);
    });
}

const TARGET_FPS = 60;
const TARGET_MS = 1000/TARGET_FPS;
Server.USERNAME = getCookieOrSet("name", _ => prompt("Please enter your username")); 
Server.call("playerJoin", Server.USERNAME).then(id => {
    Server.ID = id;
    main.id = id;
    serverUpdateLoop();
});

let timing = TARGET_MS;
let fade = 0.1;

function gameLoop() {
    let before = performance.now();
    SThingHandler.tick();
    let after = performance.now();
    let delta = after - before;
    let diff = TARGET_MS - delta;
    timing = timing * (1-fade) + diff * fade;
    setTimeout(gameLoop, timing);
}
window.onload = gameLoop;

function inspectPlayers(serPlrs) {
    let cliPlrMap = {};
    let serPlrMap = {};
    for (let cliPlr of players)
        cliPlrMap[cliPlr.id] = cliPlr;

    for (let serPlr of serPlrs) {
        serPlrMap[serPlr.id] = true;
        if (cliPlrMap[serPlr.id]) {
            let client = cliPlrMap[serPlr.id];
            client.dimensions.take(serPlr.size);
            client.serPlr = serPlr;
            if (serPlr.id == Server.ID || serPlr.isMain)
                continue;
            client.offPutting.scale(0);
            client.offPuttingVel.scale(0).sub(client.position.subbed(serPlr.position));
            client.offPuttingVel.normalize();
            client.position.take(serPlr.position);
            continue;
        }
        players.push(new PlayerClient(serPlr, false));
    }
    for (let cliPlr of players) {
        if (!serPlrMap[cliPlr.id]) {
            cliPlr.remove();
        }
    }
}

function inspectEnemies(serEnemies) {
    let cliEnemyMap = {};
    let serEnemyMap = {};
    for (let cliEnemy of enemies)
        cliEnemyMap[cliEnemy.id] = cliEnemy;

    for (let serEnemy of serEnemies) {
        serEnemyMap[serEnemy.id] = serEnemy;
        if (cliEnemyMap[serEnemy.id]) {
            let client = cliEnemyMap[serEnemy.id];
            client.offPutting.scale(0);
            client.offPuttingVel.scale(0).sub(client.position.subbed(serEnemy.position));
            client.offPuttingVel.normalize();
            client.position.take(serEnemy.position);
            client.flip = serEnemy.flip;
            client.stack = serEnemy.stack;
            continue;
        }
        let newEnemy = new EnemyClient(serEnemy.id);
        newEnemy.position.take(serEnemy.position);
        enemies.push(newEnemy);
    }
    for (let cliEnemy of enemies) {
        if (!serEnemyMap[cliEnemy.id]) {
            cliEnemy.remove();
        }
    }
}

function inspectRects(serRects) {
    let cliRectMap = {};
    let serRectMap = {};
    for (let cliRect of rects)
        cliRectMap[cliRect.id] = cliRect;

    for (let serRect of serRects) {
        serRectMap[serRect.id] = serRect;
        if (cliRectMap[serRect.id]) {
            
            continue;
        }
        let newRect = new Rect(serRect);
        newRect.position.take(serRect.position);
        rects.push(newRect);
    }
    for (let cliRect of rects) {
        if (!serRectMap[cliRect.id]) {
            cliRect.remove();
        }
    }
}

window.onbeforeunload = async _ => {
    await Server.call("playerLeave", Server.ID);
}

let background = new Background()
let main = new PlayerClient({
    name: Server.USERNAME,
    id: -1,
}, true);
let camera = new Camera(main);
let players = [main];
let enemies = [];
let rects = [];
SThingHandler.tagMap["rects"] = rects;
let chatbox = new ChatBox();