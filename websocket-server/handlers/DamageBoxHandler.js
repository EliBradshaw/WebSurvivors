import { DamageBox } from "../library/DamageBox.js";
import Handler from "./Handler.js";

export default class DamageBoxHandler extends Handler {
    constructor() {
        super("damageBox");
        /** @type {DamageBox[]} */
        this.boxes = [];
        /** @type {Map<number, DamageBox>} */
        this.boxMap = {};
    }
    /** @type {function(DamageBox)} */
    addBox(box) {
        this.boxes.push(box);
        this.boxMap[box.id] = box;
    }
    /** @type {function(number): CollisionBox} */
    getBox(id) {
        return this.boxMap[id];
    }
    /** @type {function(number): CollisionBox} */
    removeBox(id) {
        let rbox = null;
        let unremboxes = [];
        for (let box of this.boxes) {
            if (box.id != id) 
                unremboxes.push(box);
            else
                rbox = box;
        }
        this.boxes = unremboxes;
        return rbox;
    }

    tick() {
        for (let i = 0; i < this.boxes.length; i++) {
            let box = this.boxes[i];
            box.position.add(box.velocity);
            box.tickFun(box);
            box.lifetime--;
            if (box.lifetime == 0)
                this.removeBox(box.id);

            let plr = box.checkCols("player");
            if (plr) {
                if (plr == box.owner) {
                    plr.health +=  box.velocity.length()/5;
                    if (plr.health > 100)
                        plr.health = 100;
                }
                else {
                    plr.health -= box.velocity.length() + box.box.y/5;
                }
                this.removeBox(box.id);
                continue;
            }

            box.checkVelForCol("damageBox");
            let ob = box.lastHit;
            if (ob && ob.owner) {
                if (ob == box)
                    continue;
                if (box.box.y == 50) {
                    if (ob.box.y == 50)
                        this.removeBox(box.id);
                    this.removeBox(ob.id);
                    box.velocity.scale(0.75);
                    continue;
                }
                if (ob.box.y == 50) {
                    if (box.box.y == 50)
                        this.removeBox(ob.id);
                    this.removeBox(box.id);
                    continue;
                }
                if (box.colFlags.y != 0) {
                    box.velocity.y *= -1;
                    ob.velocity.y *= -1;
                }
                if (box.colFlags.x != 0) {
                    box.velocity.x *= -1;
                    ob.velocity.x *= -1;
                }
                box.lastHit = null;
                ob.lastHit = null;
            }
        }
    }
}