import Miner from "../miner";

class Pickaxe extends Miner {
  constructor(x, y) {
    super(x, y, 'Pickaxe', '[-] | ', 1, 5, 25, 1.20);
  }

}

export default Pickaxe
