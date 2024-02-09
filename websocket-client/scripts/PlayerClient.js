import SThingHandler from "./SThingHandler.js";
import SThing from "./Sthing.js";
import Vector from "./Vector.js";

export default class PlayerClient extends SThing {
    constructor(serPlr, isMain = false) {
        super("player", isMain?"main":"");
        this.serPlr = serPlr;
        this.isMain = isMain;
        this.id = serPlr.id;
        this.html.id = `player-${serPlr.name}`;
        this.usernameHTML = document.createElement("div");
        this.usernameHTML.innerText = serPlr.name;
        this.html.appendChild(this.usernameHTML);
        this.position.x += 500;
        this.position.y += 500;
        this.velocity = new Vector();
        this.offPutting = new Vector();
        this.offPuttingVel = new Vector();
    }

    main() {
        this.velocity.x = 0;
        if (heldKeys["a"])
            this.velocity.x -= 1;
        if (heldKeys["d"])
            this.velocity.x += 1;
        if (heldKeys[" "] && this.velocity.y == 0)
            this.velocity.y -= this.serPlr.stats?.baseJump || 1;
        else if (!heldKeys[" "] && this.velocity.y < 0)
            this.velocity.y += 0.1;
        this.velocity.x *= this.serPlr.stats?.baseSpeed || 1;
        this.velocity.y += 0.1;
        let cpy = this.position.scaled(1);
        this.position.x += this.velocity.x;
        if (this.checkCols()) {
            this.position.x -= this.velocity.x;
            this.velocity.x = 0;
        }
        this.position.y += this.velocity.y
        if (this.checkCols())
            this.velocity.y = 0;
        this.position.take(cpy);
    }

    checkCols() {
        for (let rect of SThingHandler.get("rects")) {
            let collided = rect.isColliding({
                position: this.position,
                rect: this.dimensions
            });
            if (collided) {
                this.position.sub(this.velocity);
                return true;
            }
        }
        return false;
    }

    off() {
        this.offPutting.add(this.offPuttingVel);
    }

    tick() {
        if (this.isMain)
            this.main();
        else
            this.off();
        this.position.add(this.velocity);
    }

    camCoords() {
        let center = new Vector(window.innerWidth/2, window.innerHeight/2);
        center.add(this.offPutting);
        center.sub(this.dimensions.scaled(0.5)).add(this.position).sub(SThingHandler.get("cmr").position);
        return center.sub(new Vector(30, 4));
    }
}