import EnemyHandler from "../EnemyHandler.js";
import HandlerHandler from "../HandlerHandler.js";
import EnemyStats from "./EnemyStats.js";
import Vector from "./Vector.js";

export default class Enemy {
    constructor(name, stats = new EnemyStats(), id = Math.random()) {
        this.name = name;
        this.position = new Vector();
        this.flip = false;
        this.stack = 1;
        this.id = id;
        this.stats = stats;
        this.health = this.stats.health;
    }

    merge(e2) {
        if (this.stack != e2.stack || this.stack >= 5)
            return;
        HandlerHandler.get("enemy").removeEnemy(e2.id);
        this.stack += e2.stack;
    }
}