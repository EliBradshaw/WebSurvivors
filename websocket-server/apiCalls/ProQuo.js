import ChatHandler from "../ChatHandler.js";
import EnemyHandler from "../EnemyHandler.js";
import PlayerHandler from "../PlayerHandler.js";
import Caller from "./Caller.js";

export default class ProQuo extends Caller {
    constructor() {
        super("proQuo");
    }

    onCall(data) {
        let client = data[0];
        if (client) {
            let serv = PlayerHandler.getPlayer(client.id);
            serv.position.take(client.position)
        }
        return {
            messages: ChatHandler.messages,
            players: PlayerHandler.players,
            enemies: EnemyHandler.enemies
        };
    }
}