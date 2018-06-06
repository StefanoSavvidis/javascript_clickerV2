import Defender from '../defender'

class Army extends Defender {
  constructor(x, y) {
    super(x, y, 'Army', '@ @ @|-|-|', 10, 200, 15000, 1.08);
  }
}

export default Army