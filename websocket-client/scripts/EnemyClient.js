import SThing from "./Sthing.js";
import Vector from "./Vector.js";

export default class EnemyClient extends SThing {
    constructor(id = -1) {
        super("enemy");
        this.id = id;
        this.offPutting = new Vector();
        this.offPuttingVel = new Vector();
        this.flip = false;
        this.stack = 1;
    }

    tick() {
        this.offPutting.add(this.offPuttingVel);
        // Flip based on offPuttingVel
        this.html.style.transform = "scaleX(" + (this.flip*2-1) + ")";
        this.html.style.scale = 1 + this.stack/40;
    }
}