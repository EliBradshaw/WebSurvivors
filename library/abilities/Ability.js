export default class Ability {
    static _registeredAbilities = [];
    static DEBUG = true;
    static registerAbility(ability) {
        Ability._registeredAbilities.push(ability);
        if (Ability.DEBUG)
            console.log(`Registered "${ability.name}"!`);
    }

    constructor(name, isCycle = false, maxCooldown = Infinity) {
        this.name = name;
        this.isCycle = isCycle;
        this.maxCooldown = maxCooldown;
        this.cooldown = 0;
    }

    tick() {
        if (!this.isCycle)
            return;
        if (this.cooldown <= 0) {
            this.cooldown = this.maxCooldown;
            return this.onCycle();
        }
        this.cooldown--;
    }

    onAbilityReceive() {

    }

    onCycle() {

    }
}