import PlayerStats from "./PlayerStats.js";
import Vector from "./Vector.js";

export default class Player {
    constructor(id = Math.random()) {
        this.position = new Vector();
        this.id = id;
        this.abilities = [];
        this.stats = new PlayerStats();
    }
}