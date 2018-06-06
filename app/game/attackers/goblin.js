import Attacker from '../attacker'

class Goblin extends Attacker {
  constructor(x, y) {
    super(x, y, 'Goblin', '(@_@)VVVVV', 1.2, 10, 35);

    this.activated = false
  }

}

export default Goblin