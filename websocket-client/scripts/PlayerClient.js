import SThing from "./SThing.js";
import SThingHandler from "./SThingHandler.js";
import Vector from "./Vector.js";

export default class PlayerClient extends SThing {
    constructor(playerName, id = -1, isMain = false) {
        super("player", isMain?"main":"");
        this.id = id;
        this.html.id = `player-${playerName}`;
        this.usernameHTML = document.createElement("div");
        this.usernameHTML.innerText = playerName;
        this.html.appendChild(this.usernameHTML);
        this.velocity = new Vector();
        this.offPutting = new Vector();
        this.offPuttingVel = new Vector();
    }

    main() {
        this.velocity.scale(0);
        if (heldKeys["a"])
            this.velocity.x -= 1;
        if (heldKeys["d"])
            this.velocity.x += 1;
        if (heldKeys["w"])
            this.velocity.y -= 1;
        if (heldKeys["s"])
            this.velocity.y += 1;
        this.velocity.normalize();
        this.position.add(this.velocity);
    }

    off() {
        this.offPutting.add(this.offPuttingVel);
    }

    tick() {
        if (this == SThingHandler.get("main"))
            this.main();
        else
            this.off();
        this.position.add(this.velocity);
    }

    camCoords() {
        let center = new Vector(window.innerWidth/2, window.innerHeight/2);
        center.add(this.offPutting);
        center.sub(this.dimensions.scaled(0.5)).add(this.position).sub(SThingHandler.get("cmr").position);
        return center;
    }
}