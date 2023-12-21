import EnemyStats from "./EnemyStats.js";
import Vector from "./Vector.js";

export default class Enemy {
    constructor(name, stats = new EnemyStats(), id = Math.random()) {
        this.name = name;
        this.position = new Vector();
        this.id = id;
        this.stats = stats;
        this.health = this.stats.health;
    }
}