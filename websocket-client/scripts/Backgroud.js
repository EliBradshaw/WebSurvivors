import SThing from "./SThing.js";
import SThingHandler from "./SThingHandler.js";
import Vector from "./Vector.js";

export default class Background extends SThing {
    constructor() {
        super("background", "bg");
    }

    tick() {
        
    }

    camCoords() {
        let center = new Vector(window.innerWidth/2, window.innerHeight/2);
        let camera = SThingHandler.get("cmr").position;
        center.sub(this.dimensions.scaled(0.5)); // Offsets this to put this things center in center
        center.add(this.position).sub(camera); // Places this in relative space based on absolute coords
        return center;
    }
}