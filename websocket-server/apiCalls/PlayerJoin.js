import Player from "../library/Player.js";
import ChatHandler from "../handlers/ChatHandler.js";
import PlayerHandler from "../handlers/PlayerHandler.js";
import Caller from "./Caller.js";
import HandlerHandler from "../HandlerHandler.js";

export default class PlayerJoin extends Caller {
    constructor() {
        super("playerJoin");
    }

    onCall(data) {
        const [ch, ph] = HandlerHandler.get("chat", "player");
        ch.messages += data + " has joined the game!\n";
        console.log(data + " has joined the game!");
        let player = new Player(data);
        ph.addPlayer(player);
        console.log("Player count: " + ph.players.length);
        return player.id+"";
    }
}