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
                    plr.health -= box.velocity.length();
                }
                this.removeBox(box.id);
            }
        }
    }
}