import Defender from '../defender'

class Villager extends Defender {
  constructor(x, y) {
    super(x, y, 'Villager', ' | @  \\-|-', 2, 12, 420, 1.10);
  }
}

export default Villager