import SThing from "./SThing.js";
import Vector from "./Vector.js";

export default class EnemyClient extends SThing {
    constructor() {
        super("enemy");
        this.offPutting = new Vector();
        this.offPuttingVel = new Vector();
    }

    tick() {
        this.offPutting.add(this.offPuttingVel);
    }
}