import SThing from "./SThing.js";
import SThingHandler from "./SThingHandler.js";
import Thing from "./Thing.js";

export default class Camera extends SThing {
    static SPEED = 0.1;
    constructor() {
        super("camera", "cmr");
    }

    tick() {
        let dif = SThingHandler.get("main").position.subbed(this.position);
        dif.scale(Camera.SPEED);
        this.position.add(dif);
    }
}