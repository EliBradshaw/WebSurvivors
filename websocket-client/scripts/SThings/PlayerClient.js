import SThingHandler from "../library/SThingHandler.js";
import SThing from "../library/SThing.js";
import Utils from "../library/Utils.js";
import Vector from "../library/Vector.js";
import Synchronizer from "../Synchronizer.js";

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
        this.movementBias = 0;
        this.faceRight = true;
        this.offPutting = new Vector();
        this.offPuttingVel = new Vector();
        this.colFlags = new Vector();
    }

    mainMovement() {
        this.velocity.x = 0;
        if (heldKeys["d"]) {
            if (!heldKeys["a"] || this.faceRight) {  
                this.movementBias += this.movementBias < 0 ? 0.1 : 0.05;
                this.faceRight = true;
            }
        }
        else if (heldKeys["a"]) {
            if (!heldKeys["d"] || !this.faceRight) {  
                this.movementBias -= this.movementBias > 0 ? 0.1 : 0.05;
                this.faceRight = false;
            }
        }
        else {
            this.movementBias *= 0.9;
        }
        this.movementBias = Utils.clamp(this.movementBias, -1, 1);
        this.velocity.x = this.movementBias;
        this.velocity.x *= this.serPlr.stats?.baseSpeed || 1;
    }

    mainJumpCheck() {
        if (heldKeys[" "] && this.colFlags.y == 1)
            this.velocity.y -= this.serPlr.stats?.baseJump || 1;
        else if (!heldKeys[" "] && this.velocity.y < 0)
            this.velocity.y += 0.1;
    }

    mainCheckVelForCol() {
        let didCol = false;
        let cpy = this.position.scaled(1);
        this.position.x += this.velocity.x;
        if (this.checkCols()) {
            didCol = true;
            this.colFlags.x = this.velocity.x > 0 ? 1 : -1;
            this.position.x -= this.velocity.x;
            this.velocity.x = 0;
        }
        this.position.y += this.velocity.y
        if (this.checkCols()) {
            didCol = true;
            this.colFlags.y = this.velocity.y > 0 ? 1 : -1;
            this.velocity.y = 0;
        }
        this.position.take(cpy);
        if (!didCol)
            this.colFlags.scale(0);
    }

    checkCols() {
        for (let box of Synchronizer.get("boxes")) {
            let collided = box.isColliding({
                position: this.position,
                box: this.dimensions
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
        let flip;
        if (this.isMain) {
            flip = this.faceRight;
            this.main();
        }
        else {
            flip = this.offPuttingVel.x > 0;
            this.off();
        }
        this.position.add(this.velocity);
        if (this.velocity.x == 0)
            return;
        this.usernameHTML.style.transform = " translateX(-50%) " +
        (this.html.style.transform = "scaleX(" + (flip*2-1) + ")");
    }

    camCoords() {
        let center = new Vector(window.innerWidth/2, window.innerHeight/2);
        center.add(this.offPutting);
        center.sub(this.dimensions.scaled(0.5)).add(this.position).sub(SThingHandler.get("cmr").position);
        return center.sub(new Vector(30, 4));
    }

    main() {
        this.mainMovement();
        this.mainJumpCheck();
        this.velocity.y += 0.1; // Apply Gravity

        this.mainCheckVelForCol();
    }
}