import Caller from "./Caller.js";

export default class Fuzz extends Caller {
    constructor() {
        super("fuzz");
    }

    onCall(data) {
        return JSON.stringify(data);
    }
}