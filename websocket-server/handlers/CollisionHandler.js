import Handler from "./Handler.js";
import CollisionBox from "../library/CollisionBox.js";

export default class CollisionHandler extends Handler {
    constructor() {
        super("collision");
        /** @type {CollisionBox[]} */
        this.boxes = [];
        /** @type {Map<number, CollisionBox>} */
        this.boxMap = {};
    }
    /** @type {function(CollisionBox)} */
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
}