import SThingHandler from "../library/SThingHandler.js";
import SThing from "../library/SThing.js";
import Utils from "../library/Utils.js";
import Vector from "../library/Vector.js";
import Synchronizer from "../Synchronizer.js";
import Server from "../Server.js";

export default class PlayerClient extends SThing {
    constructor(serPlr, isMain = false) {
        super("player", isMain?"main":"");
        this.initHtml(serPlr, isMain);
        this.position.x += 500;
        this.position.y += 500;
        this.initVelocities();
        this.faceRight = true;
        this.colFlags = new Vector();
        this.lastCol = null;
        this.initTappers();
    }

    initHtml(serPlr, isMain) {
        this.serPlr = serPlr;
        this.isMain = isMain;
        this.id = serPlr.id;
        this.html.id = `player-${serPlr.name}`;
        this.usernameHTML = document.createElement("div");
        this.usernameHTML.innerText = serPlr.name;
        this.healthHTML = document.createElement("div");
        this.healthHTML.classList.add("player-health");
        this.innerHealthHTML = document.createElement("div");
        this.innerHealthHTML.classList.add("player-health-inner");
        this.html.appendChild(this.innerHealthHTML);
        this.html.appendChild(this.healthHTML);
        this.html.appendChild(this.usernameHTML);
    }H

    initTappers() {
        this.wasCon = false;
        this.holJum = false;
        this.boost = 0;
        this.cooldown = 0;
    }

    initVelocities() {
        this.movementBias = 0;
        this.velocity = new Vector();
        this.offPutting = new Vector();
        this.offPuttingVel = new Vector();
    }

    /// MOVEMENT

    mainMovement() {
        this.velocity.x = 0;
        if (heldKeys["d"]) {
            if (!heldKeys["a"] || this.faceRight) {  
                this.movementBias += this.movementBias < 0 ? 0.1 : 0.05;
                this.faceRight = true;
                if (this.movementBias < 0)
                    this.boost = 0;
                if (!this.wasCon)
                    this.boost += 1;
                this.wasCon = true;
            }
        }
        else if (heldKeys["a"]) {
            if (!heldKeys["d"] || !this.faceRight) {  
                this.movementBias -= this.movementBias > 0 ? 0.1 : 0.05;
                this.faceRight = false;
                if (this.movementBias > 0)
                    this.boost = 0;
                if (!this.wasCon)
                    this.boost += 1.5;
                this.wasCon = true;
            }
        }
        else {
            this.movementBias *= 0.9;
            this.boost *= 0.95;
            this.wasCon = false;
        }
        this.movementBias = Utils.clamp(this.movementBias, -1, 1);
        this.velocity.x = this.movementBias;
        this.velocity.x *= (this.serPlr.stats?.baseSpeed || 1) + this.boost;
    }

    mainJumpCheck() {
        if (heldKeys[" "] && this.colFlags.y == 1) {
            this.velocity.y -= this.serPlr.stats?.baseJump || 1;
            this.holJum = true;
        }
        else if (heldKeys[" "] && !this.holJum) {
            this.velocity.y -= 0.45;
            this.holJum = true;
        }
        else {
            if (!heldKeys[" "])
                this.holJum = false;
        }

        if (heldKeys["s"]) {
            if (this.velocity.y < 0)
                this.velocity.y = 0;
            this.velocity.y += 0.1;
        }
    }

    mainCheckVelForCol(against = "boxes") {
        let cpy = this.position.scaled(1);
        this.position.x += this.velocity.x;
        this.colFlags.scale(0);
        if (this.checkCols(against)) {
            this.colFlags.x = this.velocity.x > 0 ? 1 : -1;
            this.velocity.x = 0;
        }
        
        this.position.take(cpy);
        this.position.y += this.velocity.y;
        if (this.checkCols(against)) {
            this.colFlags.y = this.velocity.y > 0 ? 1 : -1;
            this.velocity.y = 0;
        }
        this.position.take(cpy);
    }

    /// SHOOT
    spawnDamageBox() {
        this.cooldown--;
        if (heldKeys["leftMouse"] && this.cooldown <= 0) {
            this.cooldown = 10;
            let center = new Vector(window.innerWidth/2, window.innerHeight/2);
            let dir = mousePos.subbed(center);
            dir.normalize();
            dir.add(this.velocity.scaled(1/20));
            Server.call("damage", [this.id, dir, 5]);
        }

        if (heldKeys["rightMouse"] && this.cooldown < 10) {
            this.cooldown = 100;
            let center = new Vector(window.innerWidth/2, window.innerHeight/2);
            let dir = mousePos.subbed(center);
            dir.normalize();
            dir.add(this.velocity.scaled(1/20));
            Server.call("damage", [this.id, dir, 50]);
            heldKeys["rightMouse"] = false;
        }
    }

    checkCols(against) {
        for (let box of Synchronizer.get(against)) {
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
        let flip = this.faceRight;
        if (this.isMain) {
            this.main();
        }
        else {
            this.off();
        }
        this.position.add(this.velocity);
        this.healthHTML.style.transform =   
        this.innerHealthHTML.style.transform =
        this.usernameHTML.style.transform = " translateX(-50%) " +
        (this.html.style.transform = "scaleX(" + (flip*2-1) + ")");

        this.innerHealthHTML.style.width = `
            ${this.serPlr?.health*1.2||0}%
        `
        this.innerHealthHTML.innerText = Math.floor(this.serPlr?.health||0);
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
        this.spawnDamageBox();
        this.velocity.y += 0.1; // Apply Gravity
        this.mainCheckVelForCol();
    }
}