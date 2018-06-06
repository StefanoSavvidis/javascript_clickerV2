import Attacker from '../attacker'

class Orc extends Attacker {
  constructor(x, y) {
    super(x, y, 'Orc', '(@_@)VVVVV', 3, 25, 45);

    this.activated = false
  }

}

export default Orc