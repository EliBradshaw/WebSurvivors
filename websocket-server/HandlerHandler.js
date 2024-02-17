import API from "./handlers/API.js";
import ChatHandler from "./handlers/ChatHandler.js";
import CollisionHandler from "./handlers/CollisionHandler.js";
import DamageBoxHandler from "./handlers/DamageBoxHandler.js";
import Handler from "./handlers/Handler.js";
import PlayerHandler from "./handlers/PlayerHandler.js";

// THE HAND HAND ITSELF!

export default class HandlerHandler { // Yes. I named this.
    static registeredHandlers() {
        Handler.registerHandler(new API());
        Handler.registerHandler(new PlayerHandler());
        Handler.registerHandler(new ChatHandler());
        Handler.registerHandler(new CollisionHandler());
        Handler.registerHandler(new DamageBoxHandler());
    }
    
    /** @type {function(...string): Handler|Handler[]} */
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