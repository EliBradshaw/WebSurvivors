import Vector from "./Vector.js";

export default class Enemy {
    constructor(name, id = Math.random()) {
        this.name = name;
        this.position = new Vector();
        this.id = id;
        this.stats = new EnemyStats();
    }
}