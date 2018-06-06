import Game from './game/game'

let game


try {
  const savegame = JSON.parse(localStorage.getItem('save'));
  if (savegame == null) {
    game = new Game()
  } else {
    game = new Game()
    //game = savegame.game
    console.log(savegame.game)
  }
} catch (error) {
  console.error(error)
}



setInterval(function() {
  game.update();
}, 16);
