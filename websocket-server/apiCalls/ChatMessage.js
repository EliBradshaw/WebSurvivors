import ChatHandler from "../ChatHandler.js";
import Caller from "./Caller.js";

export default class ChatMessage extends Caller {
    constructor() {
        super("chatMessage");
    }

    onCall(data) {
        ChatHandler.messages += data;
        return ChatHandler.messages;
    }
}