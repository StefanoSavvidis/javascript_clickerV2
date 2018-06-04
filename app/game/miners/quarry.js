import Miner from "../miner";

class Quarry extends Miner {
  constructor(x, y) {
    super(x, y, 'Quarry', '/ \\\\ /', 60, 500, 6000, 1.08);
  }

}

export default Quarry
