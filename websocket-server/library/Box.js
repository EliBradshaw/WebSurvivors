import Vector from "./Vector.js";

export default class Box {
    /** @type {function(number|Vector, number|Vector, number|null, number|null)} */
    constructor(...args) {
        if (typeof args[0] == 'object')
            return this.constVV(...args);
        return this.constXYWH(...args);
    }

    constXYWH(x, y, w, h) {
        this.position = new Vector(x, y);
        this.bounds = new Vector(w, h);
    }

    constVV(pos, bou) {
        this.position = pos;
        this.bounds = bou;
    }
}