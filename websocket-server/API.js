import Caller from "./apiCalls/Caller.js";
import Fuzz from "./apiCalls/fuzz.js";

export default class API {
    static registerCalls() {
        Caller.registerCall(new Fuzz());
    }
    static receive(det, data) {
        for (let caller of Caller._registeredCalls) {
            if (caller.name == det)
                return caller.onCall(data);
        }

        return "Unknown call '" + det + "'";
    }
}