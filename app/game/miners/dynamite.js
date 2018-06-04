import Miner from "../miner";

class Dynamite extends Miner {
  constructor(x, y) {
    super(x, y, 'Dynamite', '*%* | ', 5, 25, 100, 1.10);
  }

}

export default Dynamite
