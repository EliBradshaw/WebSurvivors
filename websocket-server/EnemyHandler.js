export default class EnemyHandler {
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

    spawnEnemy() {
        
    }
}