import Handler from "./Handler.js";
import HandlerHandler from "../HandlerHandler.js";
import Player from "../library/Player.js";
import Vector from "../library/Vector.js";

export default class PlayerHandler extends Handler {
    constructor() {
        super("player");
        /** @type {Player[]} */
        this.players = [];
        /** @type {Map<number, Player>} */
        this.playerMap = {};
    }
    /** @type {function(Player)} */
    addPlayer(player) {
        this.players.push(player);
        this.playerMap[player.id] = player;
    }
    /** @type {function(number): Player} */
    getPlayer(id) {
        return this.playerMap[id];
    }
    /** @type {function(number): Player} */
    removePlayer(id) {
        let rplayer = null;
        let unremPlayers = [];
        for (let player of this.players) {
            if (player.id != id) 
                unremPlayers.push(player);
            else
                rplayer = player;
        }
        this.players = unremPlayers;
        return rplayer;
    }

    tick() {
        for (let plr of this.players) {
            if (plr.health <= 0)
                this.removePlayer(plr.id);
        }
    }
}