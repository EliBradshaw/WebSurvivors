import CollisionRect from "./CollisionBox.js";
import PlayerStats from "./PlayerStats.js";
import Vector from "./Vector.js";

export default class Player {
    constructor(name, id = Math.random()) {
        this.name = name+"";
        this.position = new Vector(); // DO NOT SET THE POSITION ANYWHERE.
        // The proper thing to do is this.position.take(otherVector)
        this.size = new Vector(20, 60);
        this.colRect = new CollisionRect(
            this.position,
            this.size,
        ); // because we are passing by reference, this should dynamically update.
        this.id = id;
        this.abilities = [];
        this.wasKicked = false;
        this.stats = new PlayerStats();
    }
}