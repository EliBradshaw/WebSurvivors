import SThing from "./Sthing.js";
import Vector from "./Vector.js";

export default class EnemyClient extends SThing {
    constructor(id = -1) {
        super("enemy");
        this.id = id;
        this.offPutting = new Vector();
        this.offPuttingVel = new Vector();
    }

    tick() {
        this.offPutting.add(this.offPuttingVel);
    }
}