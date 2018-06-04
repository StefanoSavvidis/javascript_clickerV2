import Item from './item';
import Miner from './miner';

import Orc from './attackers/orc'

import Hobo from './defenders/hobo'

import Pickaxe from './miners/pickaxe'
import Dynamite from './miners/dynamite'
import RailCart from './miners/railcart'
import Quarry from './miners/quarry'

import Box from './box'

class Game {

  constructor() {
    this.attackWidth = 4;
    this.defenseWidth = 1;
    this.mineWidth = 1;
    this.width = this.attackWidth + this.defenseWidth + this.mineWidth + 1;
    this.height = 7;
    this.gold = 250000;

    this.minerOptions = [new Pickaxe(), new Dynamite(), new RailCart(), new Quarry()]
    this.defenderOptions = [new Hobo()]


    this.items = []

    this.boxes = new Array(this.width)

    for (let i = 0; i < this.width; i++) {
      this.boxes[i] = new Array(this.height)
    }

    for (let i = 0; i < this.width; i++) {
      for (let j = 0; j < this.height; j++) {
        this.boxes[i][j] = new Box(i, j, 'type')
        this.assignBoxTypes(this.boxes[i][j])
      }
    }

    this.gridSection = document.getElementById('grid');
    this.topUISection = document.getElementById('topUI');
    this.bottomUISection = document.getElementById('bottomUI');
    this.sideUISection = document.getElementById('sideUI');
    
    this.gridSection.addEventListener('mouseover', this.mouseChanger)

    let self = this
    this.gridSection.addEventListener('click', function(){
      self.boxClicked()
    })

    this.sideUISection.addEventListener('click', function() {
      self.minerAction()
    })

    this.goldPerSecond = 0

    this.buildGrid()
    this.setupBottomUI()

    this.spawnWave()
    this.checkpoint = 15;
  }

  buildGrid() {
    // save game every time grid is updated
    //this.saveGame();
    let gridString = '';

    // row reperesent the coordinate height while i represent the actual height
    let row = -1;
    let column = 0;


    for (let i = 0; i < ((this.height *3) + 1); i++) {
      if (i % 3 == 0) {
        gridString += '+';
        row += 1;
        for (let j = 0; j < this.width; j++) {
          gridString += '-----+';
        }
        gridString += '\n';
      } else {
        gridString += '|';
        for( let j = 0; j < this.width; j++) {
          column = j;
          if(i % 3 == 1) {
            gridString += `<div id="${column}, ${row}A" class="gridTile">     </div>`
          }

          if (i % 3 == 2) {
            gridString += `<div id="${column}, ${row}B" class="gridTile">     </div>`
          }
  
          gridString += '|';
        }
        gridString += '\n';
      }
    }
    this.gridSection.innerHTML = '<pre id="grid">' + gridString + '</pre>';

    
    
    for (let i = 0; i < this.width; i++) {
      for (let j = 0; j < this.height; j++) {
        let builtGrid = document.getElementById(`${i}, ${j}A`)
        //console.log(builtGrid)
        this.boxBackgroundColor(this.boxes[i][j], builtGrid)
        builtGrid = document.getElementById(`${i}, ${j}B`)
        this.boxBackgroundColor(this.boxes[i][j], builtGrid)
      }
    }
    
   
  }

  boxClicked() {

    if (event.target.id != 'grid') {
      let x = parseInt(event.target.id[0])
      let y = parseInt(event.target.id[3])


      console.log(this.boxes[x][y])
      if (this.boxes[x][y].item) {
        this.itemChosen = this.boxes[x][y].item
        this.updateSideUI()
        
      } else {
        if (this.selectedItem) {

          if (this.buyItem(this.selectedItem, this.boxes[x][y])) {
            
            this.boxes[x][y].item = this.selectedItem
            this.itemChosen = this.boxes[x][y].item
            this.updateSideUI()
            
            this.selectedItem.x = x;
            this.selectedItem.y = y;
            this.items.push(this.selectedItem)
            this.selectedItem = null;
          }
          

        } else {
          this.itemChosen = null
          this.sideUISection.innerHTML = ''
        }
      }
    }

  }

  buyItem(item, box) {
    console.log(item.type)
    console.log(box.type)
    if (this.gold >= item.costBase && box.type == item.type) {
      this.gold -= item.costBase;
      return true
    } else {
      return false;
    }
  }

  drawItemBox(x, y, item) {
    let areaA = document.getElementById(`${x}, ${y}A`)
    let areaB = document.getElementById(`${x}, ${y}B`)

 
    let color = 'black'
    if (item.activated) {
      if (item.type == 'Miner') {
        color = '#ff6f00'
      } else if (item.type == 'Defender') {
        color = '#0d47a1'
      } else if (item.type == 'Attacker') {

      }
      
    }

    areaA.style.color = color
    areaB.style.color = color
    areaA.innerHTML = item.asciiTop
    areaB.innerHTML = item.asciiBot
  }

  emtptyBox(x, y) {
    let areaA = document.getElementById(`${x}, ${y}A`)
    let areaB = document.getElementById(`${x}, ${y}B`)
    areaA.innerHTML = '     '
    areaB.innerHTML = '     '
  }

  spawnWave() {
    let ySpawn = Math.floor(Math.random() * 8)
    this.boxes[0][ySpawn].item = new Orc(0, ySpawn)
    this.items.push(this.boxes[0][ySpawn].item)
  }

  moveAttackerForward(item) {
    if (item.x < this.attackWidth - 1) {
      let oldX = item.x
      let oldY = item.y
      item.x += 1
      this.boxes[oldX][oldY].item = null
      this.emtptyBox(oldX, oldY)
      this.boxes[item.x][item.y].item = item
    } else if (item.x = this.attackWidth - 1) {
      //console.log(this.items)
      //console.log(item)

      let removeItemIndex = null

      this.items.forEach(function (removeItem, i) {
        if (removeItem.x == item.x && removeItem.y == item.y) {
          removeItemIndex = i
        }
      });

      this.items.splice(removeItemIndex, 1)

      //console.log(tempList)
      //this.items.pop(item)
      this.boxes[item.x][item.y].item = null
      this.emtptyBox(item.x, item.y)
      this.gold -= item.theftAmount;
    }

  }

  update() {
    this.updateGold()

    

    let miners = this.items.filter(item => item.type == 'Miner')

    this.goldPerSecond = miners.reduce(function(sum, miner){
      return sum + miner.goldPerSecond
    }, 0);

    if (this.checkpoint < this.goldPerSecond) {
      this.checkpoint *= 2;
      this.spawnWave()
    }

    this.items.forEach((item) => {
      this.drawItemBox(item.x, item.y, item)
      if (item.type == 'Miner') {
        
        this.gold += item.countDown(1 / 60);      
        

      } else if (item.type == 'Defender') {

        item.countDown(1 / 60);
        if (item.activated) {
          let attackers = this.items.filter(item => item.type == 'Attacker')
          if (attackers.length > 0) {
            console.log(attackers[0])
            attackers[0].health -= item.defenseBase
            item.reset()
          }
          //console.log(attackers.length)
        }
      } else if (item.type == 'Attacker') {
        if (item.countDown(1/60)){
          this.moveAttackerForward(item)
          
      
        }
      }
    })

    if (this.itemChosen) {
      this.updateTracker(this.itemChosen)
      if (this.itemChosen.updateUI) {
        this.updateSideUI()
        this.itemChosen.updateUI = false;
      }
    }

  }

  updateGold() {
    this.topUISection.innerHTML = Math.round(this.gold)
  }

  assignBoxTypes(box) {
    if (box.x < this.attackWidth) {
      box.type = 'Attacker'
    } else if (box.x < this.attackWidth + 1) {
      box.type = 'Gold'
    } else if (box.x < this.attackWidth + this.defenseWidth + 1) {
      box.type = 'Defender'
    } else {
      box.type = 'Miner'
    }
  }

  boxBackgroundColor(box, area) {

    let color = null
    if (box.type == 'Attacker') {
      color = '#ffebee'
    } else if (box.type == 'Defender') {
      color = '#e3f2fd'
    } else if (box.type == 'Gold') {

    } else if (box.type == 'Miner') {
      color = '#fff3e0'
    }
    area.style.background = color
  }

  updateBox(x, y) {
    let box = document.getElementById(`${x}, ${y}`);
  }

  updateTracker() {
    let progress = Math.round(10 * this.itemChosen.percentProgress)
    let tracker = "+".repeat(progress) + "-".repeat(10 - progress)
    let trackerArea = document.getElementById('trackerTimer')
    trackerArea.innerHTML = '[' + tracker + ']'
  }

  updateSideUI() {

    
    this.sideUISection.innerHTML = '+---------------------------------------------------+'
    this.sideUISection.innerHTML += '<p>' + this.itemChosen.title + '</p><p id="trackerTimer"></p><br>'
    if (this.itemChosen.type == 'Miner') {
      this.sideUISection.innerHTML += `<p>Time: ${Math.round(this.itemChosen.timeToComplete * 100) /100}s</p>`
      this.sideUISection.innerHTML += `<p>Revenue: ${Math.round(this.itemChosen.revenue)}</p>`
      this.sideUISection.innerHTML += `<p>Upgrade Count: ${this.itemChosen.upgradeCount-1}</p>`
      if (this.itemChosen.operator == null) {
        this.sideUISection.innerHTML += '<br>+-------------------------------+<br>'
        this.sideUISection.innerHTML += '<br><div><button class="sideUI">Mine</button></div>'
      }
      this.sideUISection.innerHTML += '<br>+-------------------------------+<br>'
      this.sideUISection.innerHTML += `<div id="upgradeButton"><button class="sideUI">Upgrade</button><p class="sideUI">Get more gold per mine (${Math.round(this.itemChosen.cost)} Gold)</p></div>`
      if (this.itemChosen.operator == null) {
        this.sideUISection.innerHTML += `<div><button class="sideUI">Operator</button><p class="sideUI">Automatically mines for you (${Math.round(this.itemChosen.operatorCost)} Gold)</p></div>`
      } else {
        this.sideUISection.innerHTML += '<br>+-------------------------------+<br>'
        this.sideUISection.innerHTML += '<p>Operator</p>'
        this.sideUISection.innerHTML += `<div id="upgradeButton"><button class="sideUI">Upgrade Op</button><p class="sideUI">Speed up mining time (${Math.round(this.itemChosen.operator.cost)} Gold)</p></div>`
      }

      this.updateTracker(this.itemChosen)
    }
  }

  setupBottomUI() {
    this.bottomUISection.innerHTML += '<div id="buttonArea"></div><div id="listArea"></div>'
    this.buttonSection = document.getElementById('buttonArea');
    this.listSection = document.getElementById('listArea');
    
    let self = this
    this.buttonSection.addEventListener('click', function(){
      self.titleButtonPressed()
    });
    this.listSection.addEventListener('click', function () {
      self.itemSelected()
    });
    this.buttonSection.innerHTML += '<button>Defenders</button><button>Miners</button>'
  }

  titleButtonPressed(){
    if (event.target.textContent == 'Miners') {
      this.listSection.innerHTML = '+---------------------------------------------------+<br>'
      this.minerOptions.forEach((option) => {
        this.listSection.innerHTML += `<button>${option.title}</button>`
      })
    } else if (event.target.textContent == 'Defenders') {
      this.listSection.innerHTML = '+---------------------------------------------------+<br>'
      this.defenderOptions.forEach((option) => {
        this.listSection.innerHTML += `<button>${option.title}</button>`
      })
    }
  }

  itemSelected() {

    
    this.selectedItem = this.minerOptions.filter(option => option.title == event.target.textContent)
    if (this.selectedItem[0]) {
      this.selectedItem = this.selectedItem[0]
      this.selectedItem = new this.selectedItem.constructor()
      console.log(this.selectedItem)
    } else {
      this.selectedItem = this.defenderOptions.filter(option => option.title == event.target.textContent)
      if (this.selectedItem[0]) {
        this.selectedItem = this.selectedItem[0]
        this.selectedItem = new this.selectedItem.constructor()
        console.log(this.selectedItem)
      }
    }

  }

  mouseChanger() {
    if (event.target.id != 'grid') {
      document.body.style.cursor = "pointer";
    } else {
      document.body.style.cursor = "default";
    }
  }

  minerAction() {
    console.log(event.target)
    if (event.target.textContent == 'Upgrade') {
      if (this.gold >= this.itemChosen.cost) {
        this.gold -= this.itemChosen.cost
        this.itemChosen.upgrade()
        this.updateSideUI()
      }
      
    } else if (event.target.textContent == 'Mine') {
      this.itemChosen.activated = true
    } else if (event.target.textContent == 'Operator') {
      if (this.gold >= this.itemChosen.operatorCost) {
        this.itemChosen.buyOperator()
        this.updateSideUI()
      }
    } else if (event.target.textContent == 'Upgrade Op') {
      if (this.gold >= this.itemChosen.operator.cost) {
        this.gold -= this.itemChosen.operator.cost
        this.itemChosen.operator.upgrade()
      }
    }
  }

}

export default Game