export default class PlayerStats {
    static DEFAULTS = {
        BASE_SPEED: 1,
        SPEED_PERC_UP: 0,

        BASE_ATK_SPEED: 1,
        ATK_SPEED_PERC_UP: 0,

        BASE_ATK_DMG: 1,
        ATK_DMG_PERC_UP: 0,
    }

    constructor() {
        this.baseSpeed = PlayerStats.DEFAULTS.BASE_SPEED;
        this.speedPercUp = PlayerStats.DEFAULTS.SPEED_PERC_UP;

        this.baseAtkSpeed = PlayerStats.DEFAULTS.BASE_ATK_SPEED;
        this.atkSpeedPercUp = PlayerStats.DEFAULTS.ATK_SPEED_PERC_UP;

        this.baseAtkDmg = PlayerStats.DEFAULTS.BASE_ATK_DMG;
        this.atkDmgPercUp = PlayerStats.DEFAULTS.ATK_DMG_PERC_UP;
    }

    get speed() {
        return this.baseSpeed + this.speedPercUp * this.baseSpeed;
    }

    get atkSpeed() {
        return this.baseAtkSpeed + this.atkSpeedPercUp * this.baseAtkSpeed;
    }

    get atkDmg() {
        return this.baseAtkDmg + this.atkDmgPercUp * this.baseAtkDmg;
    }
}