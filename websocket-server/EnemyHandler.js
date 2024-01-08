import Handler from "./Handler.js";
import HandlerHandler from "./HandlerHandler.js";
import PlayerHandler from "./PlayerHandler.js";
import Enemy from "./library/Enemy.js";
import Vector from "./library/Vector.js";

export default class EnemyHandler extends Handler{
    constructor() {
        super("enemy");
        /** @type {Enemy[]} */
        this.enemies = [];
        this.change = 0;
        this.cap = 1000;
    }
    addEnemy(enemy) {
        this.enemies.push(enemy);
    }
    removeEnemy(id) {
        let unremEnemies = [];
        for (let enemy of this.enemies)
            if (enemy.id !== id)
                unremEnemies.push(enemy);
        this.enemies = unremEnemies;
    }

    count() {
        let out = 0;
        for (let enemy of this.enemies)
            out += 1 + enemy.stack;
        return out;
    }

    spawn() {
        if (this.count() >= this.cap)
            return;
        let enemy = new Enemy();
        const ph = HandlerHandler.get("player");
        let player = ph.randomPlayer();
        if (!player)
            return;
        enemy.position.take(player.position.added(Vector.random().scale(500)))
        this.addEnemy(enemy);
    }

    tick() {
        if (Math.random() < 1/10) {
            this.spawn();
        }
        const ph = HandlerHandler.get("player");
        for (let enemy of this.enemies) {
            let point = ph.targetPoint(enemy.position);
            if (!point)
                return;
            let dir = point.subbed(enemy.position);
            enemy.flip = (dir.x > -10)
            dir.normalize();
            for (let i = this.change % 10; i < this.enemies.length; i+=10) {
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
        this.change++;
    }
}