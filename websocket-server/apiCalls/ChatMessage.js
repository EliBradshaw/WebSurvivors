import HandlerHandler from "../HandlerHandler.js";
import Caller from "./Caller.js";

export default class ChatMessage extends Caller {
    constructor() {
        super("chatMessage");
    }

    onCall(data) {
        const ch = HandlerHandler.get("chat");
        ch.messages += data;
        return ch.messages;
    }
}