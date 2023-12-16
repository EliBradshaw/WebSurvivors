import PlayerStats from "./PlayerStats.js";

export default class Player {
    constructor(id = Math.random()) {
        this.id = id;
        this.abilities = [];
        this.stats = new PlayerStats();
    }
}