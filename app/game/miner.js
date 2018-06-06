import Item from "./item";
import Operator from "./operator";
//import Pickaxe from "./miners/pickaxe"

class Miner extends Item {
  constructor(x, y, title, ascii, timeToComplete, revenueBase, costBase, growthRate) {
    super(x, y, title, ascii, 'Miner');
    this.timeToComplete = timeToComplete;
    this.baseTimeToComplete = timeToComplete
    this.revenueBase = revenueBase;

    this.revenue = this.revenueBase;

    this.costBase = costBase;
    this.cost = costBase;
    this.growthRate = growthRate;

    this.timeElapsed = 0;
    this.activated = true;

    this.upgradeCount = 1;

    this.operatorCost = this.costBase * 10;

    this.updateUI = false;
  }

  get asciiTop() {
    if (this.operator == null) {
      return this.ascii.substr(0, 3) + '  '
    } else {
      return this.ascii.substr(0, 3) + ' 0'
    }
  }

  get asciiBot() {
    if (this.operator == null) {
      return this.ascii.substr(3, 6) + '  '
    } else {
      return this.ascii.substr(3, 6) + '-|'
    }
  }
  countDown(frameRate) {

    if (this.operator) {
      if (this.operator.upgraded) {

        this.timeToComplete = this.baseTimeToComplete * this.operator.speedMultiplier;
        this.operator.upgraded = false;
        this.updateUI = true;
      }
    }

    if (this.activated) {
      if (this.timeElapsed == 0) {
        this.updateGrid = true;
      }
      this.timeElapsed += frameRate
      if (this.timeElapsed >= this.timeToComplete) {
        this.timeElapsed = 0;
        if (this.operator == null) {
          this.activated = false;
          this.updateGrid = true;
        }
        return this.revenue;
      }
    }
    return 0;
  }

  get upgradeCost() {
    return (this.costBase * (Math.pow(this.growthRate, this.upgradeCount)))
  }

  get goldPerSecond() {
    return (this.revenue / this.timeToComplete)
  }
  buyOperator() {
    this.operator = new Operator(this.costBase);
    this.activated = true
  }

  upgrade() {
    this.upgradeCount += 1;
    this.cost = this.upgradeCost
    this.revenue = this.revenueBase * this.upgradeCount;
    this.upgraded = true;
  }

  get percentProgress() {
    return this.timeElapsed / this.timeToComplete;
  }

}

export default Miner;