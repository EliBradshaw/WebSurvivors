import ChatHandler from "../ChatHandler.js";
import Caller from "./Caller.js";

export default class ProQuo extends Caller {
    constructor() {
        super("proQuo");
    }

    onCall(data) {
        return {
            messages: ChatHandler.messages
        };
    }
}