import PlayerHandler from "./PlayerHandler.js";
import Enemy from "./library/Enemy.js";
import Vector from "./library/Vector.js";

export default class EnemyHandler {
    /** @type {Enemy[]} */
    static enemies = [];
    static change = 0;
    static cap = 1000;
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

    static count() {
        let out = 0;
        for (let enemy of EnemyHandler.enemies)
            out += 1 + enemy.stack;
        return out;
    }

    static spawn() {
        if (EnemyHandler.count() >= EnemyHandler.cap)
            return;
        let enemy = new Enemy();
        let player = PlayerHandler.players[
            Math.floor(Math.random() * PlayerHandler.players.length)
        ];
        if (!player)
            return;
        enemy.position.take(player.position.added(Vector.random().scale(500)))
        EnemyHandler.addEnemy(enemy);
    }

    static tick() {
        for (let enemy of EnemyHandler.enemies) {
            let point = PlayerHandler.targetPoint(enemy.position);
            if (!point)
                return;
            let dir = point.subbed(enemy.position);
            enemy.flip = (dir.x > -10)
            dir.normalize();
            for (let i = EnemyHandler.change % 10; i < this.enemies.length; i+=10) {
                let enemy2 = this.enemies[i];
                if (!enemy2 || enemy2 == enemy)
                    continue;
                let dif = enemy.position.subbed(enemy2.position);
                if (dif.length() < 10) {
                    enemy.merge(enemy2);
                    continue;
                }
                enemy.position.add(dif.scale(-0.1/(dif.length()**2)));
                enemy.position.add(dif.scale((enemy2.stack * 0.01) / dif.length()));
            }
            dir.normalize();
            let vel = dir.scale(enemy.stats.speed);
            enemy.position.add(vel);
        }
        EnemyHandler.change++;
    }
}