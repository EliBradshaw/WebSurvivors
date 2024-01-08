import Handler from "./Handler.js";
import Player from "./library/Player.js";
import Vector from "./library/Vector.js";

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

    randomPlayer() {
        return this.players[Math.floor(this.players.length * Math.random())];
    }

    /** @type {function(Vector): Vector} */
    targetPoint(vec) {
        return this.players[0]?.position;
        let point = new Vector();
        let totalWeight = 0;
        let weightedSum = new Vector();

        // Assuming there's an 'enemy' variable representing the enemy position
        for (let player of this.players) {
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