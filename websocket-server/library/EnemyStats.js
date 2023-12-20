export default class EnemyStats {
    static DEFAULTS = {
        BASE_SPEED: 1/3,
        BASE_ATK: 1/3,
        BASE_HEALTH: 1/3,
    }

    constructor() {
        this.speed = EnemyStats.DEFAULTS.BASE_SPEED;
        this.atk = EnemyStats.DEFAULTS.BASE_ATK;
        this.health = EnemyStats.DEFAULTS.BASE_HEALTH;
    }
}