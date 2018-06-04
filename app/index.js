import Game from './game/game'

let game = new Game()

setInterval(function() {
  game.update();
}, 16);