import Defender from '../defender'

class Hobo extends Defender {
  constructor(x, y) {
    super(x, y, 'Hobo', '**********', 1, 4, 100, 1.15);
  }
}

export default Hobo