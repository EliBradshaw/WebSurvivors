import HandlerHandler from "../HandlerHandler.js";
import { DamageBox } from "../library/DamageBox.js";
import Vector from "../library/Vector.js";
import Caller from "./Caller.js";

export default class Damage extends Caller {
    constructor() {
        super("damage");
    }

    onCall(playerId) {
        console.log(playerId);
        let db = HandlerHandler.get("damageBox");
        let player = HandlerHandler.get("player").getPlayer(playerId);
        let dmgBox = new DamageBox(player.position.scaled(1), new Vector(20, 20));
        console.log(dmgBox);
        db.addBox(dmgBox);
    }
}