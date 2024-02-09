export default class CollisionRect {
    constructor(position, rect , id = Math.random()) {
        this.position = position;
        this.rect = rect;
        this.id = id;
    }

    isColliding(col2) {
        let [pos, pos2, rec, rec2] = [
            this.position,
            col2.position,
            this.rect,
            col2.rect,
        ]
        let xcol = pos.x + rec.x > pos2.x &&
                   pos2.x + rec2.x > pos.x;
        let ycol = pos.y + rec.y > pos2.y &&
                   pos2.y + rec2.y > pos.y;
        let collide = xcol && ycol;
        if (collide) {
            let xval = (pos.x < pos2.x) ? // If I am encroaching from the left
                pos2.x - pos.x + rec.x // Shove back to the left
                : // Otherwise I must be from the right
                pos.x - pos2.x + rec2.x; // Shove back to the right

            let yval = (pos.y < pos2.y) ?
                pos2.y - pos.y + rec.y
                :
                pos.y - pos2.y + rec2.y;
            
            return [xval * xcol, yval * ycol, xcol, ycol];
        }
        return [0, 0];
    }
}