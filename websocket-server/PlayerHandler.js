export default class PlayerHandler {
    static players = [];
    static addPlayer(player) {
        PlayerHandler.players.push(player);
    }
    static removePlayer(player) {
        PlayerHandler.players.splice(PlayerHandler.players.indexOf(player), 1);
    }
}