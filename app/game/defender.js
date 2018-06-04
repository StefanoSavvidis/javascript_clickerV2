import Item from "./item";

class Defender extends Item {
  constructor(x, y, title, ascii, timeToDefend, defenseBase, costBase, growthRate) {
    super(x, y, title, ascii, 'Defender');
    this.timeToDefend = timeToDefend
    this.defenseBase = defenseBase
    this.costBase = costBase
    this.growthRate = growthRate
  
    this.timeElapsed = 0;

    this.activated = false
  }

  get asciiTop() {
   return this.ascii.substr(0, 5)
  }

  get asciiBot() {
    return this.ascii.substr(5, 10)
  }

  get percentProgress() {
    return this.timeElapsed / this.timeToDefend;
  }

  reset() {
    this.timeElapsed = 0
    this.activated = false
  }

  countDown(frameRate) {
    if (this.activated == false) {
      if (this.timeElapsed == 0) {
        this.updateGrid = true;
      }
      this.timeElapsed += frameRate
      
      if (this.timeElapsed >= this.timeToDefend) {
        this.activated = true;
        this.updateGrid = true;
      }
    }
  }
}

export default Defender;