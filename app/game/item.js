//import Miner from './miner'

class Item {
  
  constructor(x, y, title, ascii, type) {
    this.x = x;
    this.y = y;
    this.title = title;
    this.ascii = ascii;
    this.type = type

    this.totalInvested = 0;
  }

}

export default Item;