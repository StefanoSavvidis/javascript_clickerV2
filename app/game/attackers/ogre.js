import Attacker from '../attacker'

class Ogre extends Attacker {
  constructor(x, y) {
    super(x, y, 'Ogre', '  ʌ  <0_0>', 2, 10, 10);

    this.activated = false
  }

}

export default Ogre