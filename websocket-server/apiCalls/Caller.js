export default class Caller {
    /** @type {Caller[]} */
    static _registeredCalls = [];
    static DEBUG = false;
    static registerCall(apiCall) {
        Caller._registeredCalls.push(apiCall);
        if (Caller.DEBUG)
            console.log(`Registered "${apiCall.name}"!`);
    }
    constructor(name) {
        this.name = name;
    }

    onCall(data) {

    }
}