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
            if (!point)
                return;
            let dir = point.subbed(enemy.position);
            dir.normalize();
            for (let enemy2 of EnemyHandler.enemies) {
                let dist = 35;
                let dif = enemy.position.subbed(enemy2.position);
                if (dif.length() < dist) {
                    dir.add(dif.scale(2));
                    dir.normalize();
                }
            }
            enemy.position.add(dir.scale(enemy.stats.speed));
        }
    }
}