export default class CollisionBox {
    constructor(position, box , id = Math.random()) {
        this.position = position;
        this.box = box;
        this.id = id;
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