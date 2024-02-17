import Camera from "./SThings/Camera.js";
import ChatBox from "./ChatBox.js";
import PlayerClient from "./PlayerClient.js";
import SThingHandler from "./library/SThingHandler.js";
import Server from "./Server.js";
import Box from "./library/Box.js";
import Synchronizer from "./Synchronizer.js";

function getCookieOrSet(name, setter) {
    let value = localStorage.getItem(name);
    if (value)
        return value;
    value = setter();
    localStorage.setItem(name, value);
    return value;
}

Synchronizer.addSyncItem(
    "players",
    server => new PlayerClient(server, server.id == Server.ID),
    (client, server) => {
        client.dimensions.take(server.size);
        client.serPlr = server;
        if (server.id == Server.ID || server.isMain)
            return;
        client.offPutting.scale(0);
        client.offPuttingVel.scale(0).sub(client.position.subbed(server.position));
        client.offPuttingVel.normalize().scale(ping/TARGET_MS);
        client.position.take(server.position);
    }
);

Synchronizer.addSyncItem(
    "boxes",
    server => {
        let newBox = new Box(server);
        newBox.position.take(serBox.position);
        return newBox;
    },
    (client, server) => {
        // Don't need anything
    }
)

function serverUpdateLoop() {
    let before = performance.now();
    Server.call("proQuo", main).then(res => {
        res = JSON.parse(res);
        let after = performance.now();
        let ping = Math.round(after - before);
        chatbox.ping.innerText = `Ping: ${ping}`;
        chatbox.messages.innerText = `${res.messages?.split("\\n").join("\n")}`;
        Synchronizer.sync(res);
        serverUpdateLoop();
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
window.onbeforeunload = async _ => {
    await Server.call("playerLeave", Server.ID);
}

//let background = new Background()
let main = new PlayerClient({
    name: Server.USERNAME,
    id: -1,
}, true);
Synchronizer.get("players").data.push(main);
let camera = new Camera(main);
let boxes = [];
SThingHandler.tagMap["boxes"] = boxes;
let chatbox = new ChatBox();