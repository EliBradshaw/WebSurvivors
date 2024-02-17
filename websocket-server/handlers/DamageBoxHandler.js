import Handler from "./Handler.js";
import CollisionRect from "../library/CollisionBox.js";

export default class CollisionHandler extends Handler {
    constructor() {
        super("collision");
        /** @type {CollisionRect[]} */
        this.rects = [];
        /** @type {Map<number, CollisionRect>} */
        this.rectMap = {};
    }
    /** @type {function(CollisionRect)} */
    addRect(rect) {
        this.rects.push(rect);
        this.rectMap[rect.id] = rect;
    }
    /** @type {function(number): CollisionRect} */
    getRect(id) {
        return this.rectMap[id];
    }
    /** @type {function(number): CollisionRect} */
    removeRect(id) {
        let rrect = null;
        let unremrects = [];
        for (let rect of this.rects) {
            if (rect.id != id) 
                unremrects.push(rect);
            else
                rrect = rect;
        }
        this.rects = unremrects;
        return rrect;
    }
}