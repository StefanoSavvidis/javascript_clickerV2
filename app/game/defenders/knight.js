import Defender from '../defender'

class Knight extends Defender {
  constructor(x, y) {
    super(x, y, 'Knight', ' ^ @  \\-|-', 5, 75, 3750, 1.09);
  }
}

export default Knight