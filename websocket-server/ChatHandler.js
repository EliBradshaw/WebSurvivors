import Handler from "./Handler.js";

export default class ChatHandler extends Handler {
    constructor() {
        super("chat");
        this.messages = "";
    }
}