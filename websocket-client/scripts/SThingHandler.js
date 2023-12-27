import SThing from "./Sthing.js";
export default class SThingHandler {
    /** @type {SThing[]} */
    static things = [];
    static tagMap = {};
    static tick() {
        for (let thing of SThingHandler.things)
            thing._tick();
    }
    static add(thing) {
        SThingHandler.things.push(thing);
        SThingHandler.tagMap[thing.tag] = thing;
    }

    static remove(thing) {
        SThingHandler.things = SThingHandler.things.filter(t => t != thing);
    }

    /** @type {function(string): SThing|null} */
    static get(tag) {
        return SThingHandler.tagMap[tag];
    }
}