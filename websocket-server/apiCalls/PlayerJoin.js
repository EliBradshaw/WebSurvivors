import Player from "../library/Player.js";
import ChatHandler from "../ChatHandler.js";
import PlayerHandler from "../PlayerHandler.js";
import Caller from "./Caller.js";

export default class PlayerJoin extends Caller {
    constructor() {
        super("playerJoin");
    }

    onCall(data) {
        ChatHandler.messages += data + " has joined the game!\n";
        console.log(data + " has joined the game!\n");
        let player = new Player(data);
        PlayerHandler.addPlayer(player);
        return player.id+"";
    }
}