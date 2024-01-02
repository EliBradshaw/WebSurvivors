export default class Vector {
    static random() {
        return new Vector(
            Math.random() - 0.5,
            Math.random() - 0.5
        ).normalize();
    }

    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    scaled(scalar) {
        return new Vector(this.x * scalar, this.y * scalar);
    }

    scale(scalar) {
        this.x *= scalar;
        this.y *= scalar;
        return this;
    }

    added(vector) {
        return new Vector(this.x + vector.x, this.y + vector.y);
    }

    add(vector) {
        this.x += vector.x;
        this.y += vector.y;
        return this;
    }

    subbed(vector) {
        return new Vector(this.x - vector.x, this.y - vector.y);
    }

    sub(vector) {
        this.x -= vector.x;
        this.y -= vector.y;
        return this;
    }

    length() {
        return Math.sqrt(this.x*this.x + this.y*this.y) + 0.0001;
    }

    normalized() {
        return this.scaled(1/this.length());
    }

    normalize() {
        this.scale(1/this.length());
        return this;
    }

    take(vector) {
        this.x = vector.x;
        this.y = vector.y;
        return this;
    }
}