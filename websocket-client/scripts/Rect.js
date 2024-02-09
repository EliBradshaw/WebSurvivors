import SThingHandler from "./SThingHandler.js";
import SThing from "./Sthing.js";
import Vector from "./Vector.js";

export default class Rect extends SThing {
    constructor(ser) {
        super("rect");
        console.log(ser);
        this.id = ser.id;
        this.html.id = `rect-${this.id}`;
        
        this.html.style.position = "absolute";
        this.rect = new Vector(ser.rect.x, ser.rect.y);
        this.html.style.width = ser.rect.x + 'px';
        this.html.style.height = ser.rect.y + 'px';
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

    isColliding(col2) {
        let [pos, pos2, rec, rec2] = [
            this.position,
            col2.position,
            this.rect,
            col2.rect,
        ]
        let xcol = pos.x + rec.x > pos2.x &&
                   pos2.x + rec2.x > pos.x;
        let ycol = pos.y + rec.y > pos2.y &&
                   pos2.y + rec2.y > pos.y;
        return xcol && ycol;
    }
}