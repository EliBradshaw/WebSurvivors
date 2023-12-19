import PlayerStats from "./PlayerStats.js";
import Vector from "./Vector.js";

export default class Player {
    constructor(name, id = Math.random()) {
        this.name = name;
        this.position = new Vector();
        this.id = id;
        this.abilities = [];
        this.stats = new PlayerStats();
    }
}