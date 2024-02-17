import Player from "../library/Player.js";
import ChatHandler from "../handlers/ChatHandler.js";
import PlayerHandler from "../handlers/PlayerHandler.js";
import Caller from "./Caller.js";
import HandlerHandler from "../HandlerHandler.js";

export default class PlayerLeave extends Caller {
    constructor() {
        super("playerLeave");
    }

    onCall(data) {
        let id = data[0];
        const [ch, ph] = HandlerHandler.get("chat", "player");
        let player = ph.getPlayer(id);
        if (!player)
            return "";
        ch.messages += player.name + " has left the game!\n";
        console.log(player.name + " has left the game!");
        ph.removePlayer(id);
        console.log("Player count: " + ph.players.length);
        return "";
    }
}