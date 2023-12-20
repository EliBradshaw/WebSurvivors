import Player from "./library/Player.js";

export default class PlayerHandler {
    /** @type {Player[]} */
    static players = [];
    /** @type {Map<number, Player>} */
    static playerMap = {};
    /** @type {function(Player)} */
    static addPlayer(player) {
        PlayerHandler.players.push(player);
        PlayerHandler.playerMap[player.id] = player;
    }
    /** @type {function(number): Player} */
    static getPlayer(id) {
        return PlayerHandler.playerMap[id];
    }
    /** @type {function(number): Player} */
    static removePlayer(id) {
        let rplayer = null;
        let unremPlayers = [];
        for (let player of PlayerHandler.players) {
            if (player.id !== id) 
                unremPlayers.push(player);
            else
                rplayer = player;
        }
        PlayerHandler.players = unremPlayers;
        return rplayer;
    }
}