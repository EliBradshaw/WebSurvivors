import PlayerHandler from "./PlayerHandler.js";
import Enemy from "./library/Enemy.js";

export default class EnemyHandler {
    /** @type {Enemy[]} */
    static enemies = [];
    static addEnemy(enemy) {
        EnemyHandler.enemies.push(enemy);
    }
    static removeEnemy(id) {
        let unremEnemies = [];
        for (let enemy of EnemyHandler.enemies)
            if (enemy.id !== id) 
                unremEnemies.push(enemy);
        EnemyHandler.enemies = unremEnemies;
    }

    static spawn() {
        let enemy = new Enemy();
        EnemyHandler.addEnemy(enemy);
    }

    static tick() {
        for (let enemy of EnemyHandler.enemies) {
            let point = PlayerHandler.targetPoint(enemy.position);
        }
    }
}