import Attacker from '../attacker'

class Orc extends Attacker {
  constructor(x, y) {
    super(x, y, 'Orc', '[0.0][> ]>', 3, 35, 100);

    this.activated = false
  }

}

export default Orc