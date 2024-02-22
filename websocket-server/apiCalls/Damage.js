import HandlerHandler from "../HandlerHandler.js";
import { DamageBox } from "../library/DamageBox.js";
import Vector from "../library/Vector.js";
import Caller from "./Caller.js";

export default class Damage extends Caller {
    constructor() {
        super("damage");
    }

    onCall([[playerId, dir, height]]) {
        let db = HandlerHandler.get("damageBox");
        let player = HandlerHandler.get("player").getPlayer(playerId);
        dir = new Vector(dir.x, dir.y);
        let spawn = player.position.scaled(1);
        spawn.y += player.size.y / 2 - height;
        spawn.add(dir.scaled(50));
        let dmgBox = new DamageBox(spawn, new Vector(20, height), player, box => {
            box.checkVelForCol();
            if (box.colFlags.y != 0)
                box.velocity.y *= -1;
            if (box.colFlags.x != 0)
                box.velocity.x *= -1;
        }, 100);
        dmgBox.velocity.take(dir.scaled(10));
        db.addBox(dmgBox);
    }
}