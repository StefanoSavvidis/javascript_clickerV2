import Attacker from '../attacker'

class Ogre extends Attacker {
  constructor(x, y) {
    super(x, y, 'Ogre', '  ʌ  <0_0>', 5, 100, 1000);

    this.activated = false
  }

}

export default Ogre