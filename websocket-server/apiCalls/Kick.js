import HandlerHandler from "../HandlerHandler.js";
import Caller from "./Caller.js";

export default class Kick extends Caller {
    constructor() {
        super("kick");
    }

    onCall(playerName) {
        playerName = ""+playerName;
        const [ch, ph] = HandlerHandler.get("chat", "player");
        for (let player of ph.players) {
            if (playerName == player.name) {
                ph.removePlayer(player.id);
                ch.messages += playerName + " got kicked!\n";
            }
        }
    }
}