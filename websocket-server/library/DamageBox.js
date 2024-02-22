import Vector from "./Vector.js";
import HandlerHandler from "../HandlerHandler.js";

export class DamageBox {
    constructor(position, box, owner, tickFun = _ => {}, lifetime = 20, id = Math.random()) {
        this.position = position;
        this.box = box;
        this.owner = owner;
        this.tickFun = tickFun;
        this.lifetime = lifetime;
        this.velocity = new Vector();
        this.id = id;
        this.colFlags = new Vector();
    }

    
    checkVelForCol(against) {
        let didCol = false;
        let cpy = this.position.scaled(1);
        this.position.x += this.velocity.x;
        if (this.checkCols(against)) {
            didCol = true;
            this.colFlags.x = this.velocity.x > 0 ? 1 : -1;
            this.position.x -= this.velocity.x;
        }
        this.position.y += this.velocity.y
        if (this.checkCols(against)) {
            didCol = true;
            this.colFlags.y = this.velocity.y > 0 ? 1 : -1;
        }
        this.position.take(cpy);
        if (!didCol)
            this.colFlags.scale(0);
    }

    checkCols(against = "collision") {
        let cmp = HandlerHandler.get(against);
        if (against == "player")
            cmp = cmp.players;
        else
            cmp = cmp.boxes;
        for (let box2 of cmp) {
            let box;
            if (against == "player")
                box = box2.colRect;
            else
                box = box2;
            if (box == this)
                continue;
            let collided = this.isColliding(box);
            if (collided) {
                this.position.sub(this.velocity);
                return box2;
            }
        }
        return null;
    }

    isColliding(col2) {
        let [pos, pos2, rec, rec2] = [
            this.position,
            col2.position,
            this.box,
            col2.box,
        ]
        let xcol = pos.x + rec.x > pos2.x &&
                   pos2.x + rec2.x > pos.x;
        let ycol = pos.y + rec.y > pos2.y &&
                   pos2.y + rec2.y > pos.y;
        return xcol && ycol;
    }
}