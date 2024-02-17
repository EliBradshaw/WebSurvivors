export class DamageBox {
    constructor(position, box , id = Math.random()) {
        this.position = position;
        this.box = box;
        this.id = id;
    }
}