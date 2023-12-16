import Ability from "./abilities/Ability.js";

export default class AbilityHandler {
    static registerAbility() {
        Ability.registerAbility(Speed);
    }
}