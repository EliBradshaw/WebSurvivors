import Ability from "./Ability.js";

export default class Speed extends Ability {
    static AMOUNT = 0.2;
    constructor() {
        super("Speed", false);
    }

    onAbilityReceive(data) {
        data.player.stats.baseSpeed += Speed.AMOUNT;
    }
}