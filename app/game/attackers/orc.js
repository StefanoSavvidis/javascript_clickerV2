import Attacker from '../attacker'

class Orc extends Attacker {
  constructor(x, y) {
    super(x, y, 'Orc', '##########', 1, 10, 10);

    this.activated = false
  }

  get asciiTop() {
    return this.ascii.substr(0, 5)
  }

  get asciiBot() {
    return this.ascii.substr(5, 10)
  }

}

export default Orc