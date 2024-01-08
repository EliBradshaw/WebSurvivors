import Handler from "./Handler.js";
import Caller from "./apiCalls/Caller.js";
import ChatMessage from "./apiCalls/ChatMessage.js";
import PlayerJoin from "./apiCalls/PlayerJoin.js";
import PlayerLeave from "./apiCalls/PlayerLeave.js";
import ProQuo from "./apiCalls/ProQuo.js";
import Fuzz from "./apiCalls/fuzz.js";

export default class API extends Handler {
    constructor() {
        super("api");
        this.registerCalls();
    }
    registerCalls() {
        Caller.registerCall(new Fuzz());
        Caller.registerCall(new ChatMessage());
        Caller.registerCall(new ProQuo());
        Caller.registerCall(new PlayerJoin());
        Caller.registerCall(new PlayerLeave())
    }
    encodeArgs(args) {
        return args.map(JSON.stringify).map(str => btoa(str));
    }
    decodeArgs(encodedArgs) {
        return encodedArgs.map(arg => atob(arg)).map(str => JSON.parse(str));
    }
      
    receive(det, data) {
        for (let caller of Caller._registeredCalls) {
            if (caller.name == det)
                return caller.onCall(data);
        }

        return "Unknown call '" + det + "'";
    }
}