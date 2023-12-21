import Thing from "./Thing.js";
import SThing from "./SThing.js";
import Background from "./Backgroud.js";
import Camera from "./Camera.js";
import ChatBox from "./ChatBox.js";
import PlayerClient from "./PlayerClient.js";
import SThingHandler from "./SThingHandler.js";
import Server from "./Server.js";
import EnemyClient from "./EnemyClient.js";

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
        inspectPlayers(res.players);
        // inspectEnemies(res.enemies);
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
            if (serPlr.id == Server.ID)
                continue;
            let client = cliPlrMap[serPlr.id];
            client.offPutting.scale(0);
            client.offPuttingVel.scale(0).sub(client.position.subbed(serPlr.position));
            client.offPuttingVel.normalize();
            client.position.take(serPlr.position);
            continue;
        }
        players.push(new PlayerClient(serPlr.name, serPlr.id, false));
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
        serEnemyMap[serEnemy.id] = true;
        if (cliEnemyMap[serEnemy.id]) {
            let client = cliEnemyMap[serEnemy.id];
            client.offPutting.scale(0);
            client.offPuttingVel.scale(0).sub(client.position.subbed(serEnemy.position));
            client.offPuttingVel.normalize();
            client.position.take(serEnemy.position);
            continue;
        }
        enemies.push(new EnemyClient(serEnemy.name, serEnemy.id));
    }
    for (let cliEnemy of enemies) {
        if (!serEnemyMap[cliEnemy.id]) {
            cliEnemy.remove();
        }
    }
}

window.onbeforeunload = async _ => {
    await Server.call("playerLeave", Server.ID);
}

let background = new Background()
let main = new PlayerClient(Server.USERNAME, -1, true);
let camera = new Camera(main);
let players = [main];
let enemies = [];
let chatbox = new ChatBox();