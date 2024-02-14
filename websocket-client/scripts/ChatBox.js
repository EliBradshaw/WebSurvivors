import Server from "./Server.js";
import SThing from "./Sthing.js";
import Vector from "./Vector.js";

export default class ChatBox extends SThing {
    constructor() {
        super("chatbox");
        this.ping = document.createElement("div");
        this.messages = document.createElement("div");
        this.messages.classList.add("chatbox-messages");
        this.input = document.createElement("input");
        this.input.onchange = _ => {
            if (this.commandChecker(this.input.value)) {
                return this.input.value = "";
            }
            let message = `<${Server.USERNAME}> ${this.input.value}\n`;
            this.input.value = "";
            Server.call("chatMessage", message).then(msgs => {
                this.messages.innerText = msgs.split("\\n").join("\n");
            });
        };
        this.html.appendChild(this.ping);
        this.html.appendChild(this.messages);
        this.html.appendChild(this.input);
    }

    commandChecker(text) {
        if (text[0] != "/")
            return false;
        let [command, ...args] = text.split(" ");
        switch (command) {
            case "/kick":
                Server.call("kick", args[0]);
                return true;
        }
    }

    camCoords() {
        return new Vector(window.innerWidth - 310, window.innerHeight - 410);
    }
}