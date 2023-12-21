import Player from "../library/Player.js";
import ChatHandler from "../ChatHandler.js";
import PlayerHandler from "../PlayerHandler.js";
import Caller from "./Caller.js";

export default class PlayerLeave extends Caller {
    constructor() {
        super("playerLeave");
    }

    onCall(data) {
        let id = data[0];
        let player = PlayerHandler.getPlayer(id);
        ChatHandler.messages += player.name + " has left the game!\n";
        console.log(player.name + " has left the game!\n");
        PlayerHandler.removePlayer(id);
        console.log("Player count: " + PlayerHandler.players.length);
        return "";
    }
}