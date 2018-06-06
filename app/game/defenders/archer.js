import Defender from '../defender'

class Archer extends Defender {
  constructor(x, y) {
    super(x, y, 'Archer', '/| @ \\|-|-', 3, 32, 1440, 1.09);
  }
}

export default Archer