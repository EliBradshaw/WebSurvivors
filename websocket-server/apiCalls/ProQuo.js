import HandlerHandler from "../HandlerHandler.js";
import Caller from "./Caller.js";

export default class ProQuo extends Caller {
    constructor() {
        super("proQuo");
    }

    onCall(data) {
        let client = data[0];
        const [ch, ph, coh, db] = HandlerHandler.get("chat", "player", "collision", "damageBox");
        if (client) {
            let serv = ph.getPlayer(client.id);
            serv.position.take(client.position);
        }
        return {
            messages: ch.messages,
            players: ph.players,
            boxes: coh.boxes,
            damageBoxes: db.boxes,
        };
    }
}