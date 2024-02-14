import HandlerHandler from "../HandlerHandler.js";
import Caller from "./Caller.js";

export default class ProQuo extends Caller {
    constructor() {
        super("proQuo");
    }

    onCall(data) {
        let client = data[0];
        const [eh, ch, ph, coh] = HandlerHandler.get("enemy", "chat", "player", "collision");
        if (client) {
            let serv = ph.getPlayer(client.id);
            serv.position.take(client.position);
        }
        return {
            messages: ch.messages,
            players: ph.players,
            rects: coh.rects,
        };
    }
}