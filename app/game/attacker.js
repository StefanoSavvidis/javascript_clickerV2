import Item from "./item";

class Attacker extends Item {
  constructor(x, y, title, ascii, timeToTile, health, theftAmount) {
    super(x, y, title, ascii, 'Attacker');

    this.timeToTile = timeToTile;
    this.health = health;
    this.theftAmount = theftAmount;
    this.timeElapsed = 0;
    this.activated = false;
    this.damaged = false;
    this.damagedCounter = 0;
  }

  get asciiTop() {
    return this.ascii.substr(0, 5)
  }

  get asciiBot() {
    return this.ascii.substr(5, 10)
  }


  countDown(frameRate) {

    //console.log('THIS: ' + this.x + ', ' + this.y)
   
    if (this.x == 0) {

      this.activated = false;
    } else {
      
      this.activated = true;
    }

    if (this.timeElapsed == 0) {
      this.updateGrid = true;
    }
    this.timeElapsed += frameRate
    
    if (this.timeElapsed >= this.timeToTile) {
      this.timeElapsed = 0;
      return true;
    }
    
  }

}

export default Attacker