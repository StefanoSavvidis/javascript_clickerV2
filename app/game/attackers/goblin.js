import Attacker from '../attacker'

class Goblin extends Attacker {
  constructor(x, y) {
    super(x, y, 'Goblin', '(@_@)VVVVV', 2, 10, 10);

    this.activated = false
  }

}

export default Goblin