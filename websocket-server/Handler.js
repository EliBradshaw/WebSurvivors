export default class Handler {
    /** @type {Handler[]} */
    static _registeredHandlers = [];
    static _handlerMap = {};
    static DEBUG = true;
    static registeredHandler(handler) {
        Handler._registeredHandlers.push(handler);
        Handler._handlerMap[handler.name] = handler;
        if (Handler.DEBUG)
            console.log(`Registered handler "${handler.name}"!`);
    }
    constructor(name) {
        this.name = name;
    }

    tick() {

    }
}