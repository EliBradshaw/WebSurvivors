import API from "./API.js";
import ChatHandler from "./ChatHandler.js";
import EnemyHandler from "./EnemyHandler.js";
import Handler from "./Handler.js";
import PlayerHandler from "./PlayerHandler.js";

export default class HandlerHandler { // Yes. I named this.
    static registeredHandlers() {
        Handler.registeredHandler(new EnemyHandler());
        Handler.registeredHandler(new API());
        Handler.registeredHandler(new PlayerHandler());
        Handler.registeredHandler(new ChatHandler());
    }
    
    static get(...names) {
        if (names.length == 1)
            return Handler._handlerMap[names[0]];
        let hands = [];
        for (let name of names)
            hands.push(Handler._handlerMap[name]);
        return hands;
    }

    static tick() {
        for (let hand of Handler._registeredHandlers)
            hand.tick();
    }
}