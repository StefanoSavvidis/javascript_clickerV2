import Item from "./item";

class Attacker extends Item {
  constructor(x, y, title, ascii, timeToTile, health, theftAmount) {
    super(x, y, title, ascii, 'Attacker');

    this.timeToTile = timeToTile;
    this.health = health;
    this.theftAmount = theftAmount;
    this.activated = false
    this.timeElapsed = 0;
  }

  countDown(frameRate) {

    if (this.timeElapsed == 0) {
      this.updateGrid = true;
    }
    this.timeElapsed += frameRate
    
    if (this.timeElapsed >= this.timeToTile) {
      this.timeElapsed = 0;
      this.activated = true;
      return true;
    }
    
  }

}

export default Attacker