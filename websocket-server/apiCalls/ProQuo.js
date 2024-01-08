import ChatHandler from "../ChatHandler.js";
import EnemyHandler from "../EnemyHandler.js";
import HandlerHandler from "../HandlerHandler.js";
import PlayerHandler from "../PlayerHandler.js";
import Caller from "./Caller.js";

export default class ProQuo extends Caller {
    constructor() {
        super("proQuo");
    }

    onCall(data) {
        let client = data[0];
        const [eh, ch, ph] = HandlerHandler.get("enemy", "chat", "player");
        if (client) {
            let serv = ph.getPlayer(client.id);
            serv.position.take(client.position);
        }
        return {
            messages: ch.messages,
            players: ph.players,
            enemies: eh.enemies
        };
    }
}