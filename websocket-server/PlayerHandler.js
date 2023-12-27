import Player from "./library/Player.js";
import Vector from "./library/Vector.js";

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
            if (player.id != id) 
                unremPlayers.push(player);
            else
                rplayer = player;
        }
        PlayerHandler.players = unremPlayers;
        return rplayer;
    }

    /** @type {function(Vector): Vector} */
    static targetPoint(vec) {
        return PlayerHandler.players[0]?.position;
        let point = new Vector();
        let totalWeight = 0;
        let weightedSum = new Vector();

        // Assuming there's an 'enemy' variable representing the enemy position
        for (let player of PlayerHandler.players) {
            let distanceToEnemy = player.position.sub(vec).length(); // Calculate distance to the enemy

            // The closer the player is to the enemy, the higher the weight
            let weight = 1 / (distanceToEnemy + 1); // Adding 1 to avoid division by zero and to prevent extreme weights

            // Update weighted sum using vector operations
            weightedSum.add(player.position.scale(weight));

            // Accumulate total weight
            totalWeight += weight;
        }

        // Calculate the weighted average point
        if (totalWeight > 0) {
            point = weightedSum.scale(1 / totalWeight);
        }

        return point;
    }

}