import SThingHandler from "../library/SThingHandler.js";
import SThing from "../library/SThing.js";
import Thing from "../library/Thing.js";

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