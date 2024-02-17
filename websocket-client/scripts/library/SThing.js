import SThingHandler from "./SThingHandler.js";
import Thing from "./Thing.js";
import Vector from "./Vector.js";

export default class SThing extends Thing {
    constructor(className, tag = "") {
        super();
        this.tag = tag;
        this.html = document.createElement("div");
        this.html.classList.add(className);
        document.getElementById("canvas").appendChild(this.html);
        SThingHandler.add(this);
    }

    _tick() {
        this.tick();
        this.updateHtml();
    }

    tick() {

    }

    remove() {
        this.html.remove();
    }

    updateHtml() {
        let camPos = this.camCoords();
        this.html.style.left = camPos.x + "px";
        this.html.style.top = camPos.y + "px";
    }

    remove() {
        SThingHandler.remove(this);
        this.html.remove();
    }
    
    camCoords() {
        let center = new Vector(window.innerWidth/2, window.innerHeight/2);
        let camera = SThingHandler.get("cmr").position;
        center.sub(this.dimensions.scaled(0.5)); // Offsets this to put this things center in center
        center.add(this.position).sub(camera); // Places this in relative space based on absolute coords
        return center;
    }
}