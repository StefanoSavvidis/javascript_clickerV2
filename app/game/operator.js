class Operator {
  constructor(cost) {
    this.costBase = cost * 50;
    this.cost = this.costBase;
    this.speedMultiplier = 1;
    this.growthRate = 1.1;
    this.reduceRate = 0.95;
    this.upgradeCount = 1; 
    this.upgraded = false;
  }

  upgrade() {
    this.upgradeCount += 1;
    this.cost = this.costBase * (Math.pow(this.growthRate, this.upgradeCount));
    this.speedMultiplier = this.speedMultiplier * this.reduceRate;
    this.upgraded = true;
  }

}

export default Operator