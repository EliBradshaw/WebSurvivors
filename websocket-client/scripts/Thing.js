import Vector from "./Vector.js";

export default class Thing {
    constructor(position = new Vector(), dimensions = new Vector(50, 50)) {
        this.position = position;
        this.dimensions = dimensions;
    }
}