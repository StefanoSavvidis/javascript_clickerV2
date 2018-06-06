import Item from './item';
import Miner from './miner';

import Orc from './attackers/orc'
import Ogre from './attackers/ogre'
import Goblin from './attackers/goblin'

import Hobo from './defenders/hobo'
import Villager from './defenders/villager'
import Archer from './defenders/archer'
import Knight from './defenders/knight'
import Army from './defenders/army'


import Pickaxe from './miners/pickaxe'
import Dynamite from './miners/dynamite'
import RailCart from './miners/railcart'
import Quarry from './miners/quarry'

import Box from './box'


const longLine = '+---------------------------------------------------+'
const shortLine = '+-------------------------------+'
class Game {

  constructor() {
    this.attackWidth = 4;
    this.defenseWidth = 1;
    this.mineWidth = 1;
    this.width = this.attackWidth + this.defenseWidth + this.mineWidth + 1;
    this.height = 7;
    this.gold = 2500000;

    

    this.enemyOptions = [new Orc()]
    this.minerOptions = [new Pickaxe(), new Dynamite(), new RailCart(), new Quarry()]
    this.defenderOptions = [new Hobo(), new Villager(), new Archer(), new Knight(), new Army()]


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
    this.waveSection = document.getElementById('waveUI');
    this.placeSection = document.getElementById('placeUI');
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

    this.checkpoint = 20;
    this.checkpointCounter = 0;
    this.checkpointGrowthRate = 1.14;

    
    this.goldChanged = false;
    this.goldChangedPositiveAmount = 0;
    this.goldChangedNegativeAmount = 0;
    this.goldChangedAmount = 0;
    this.goldChangedCounter = 0;

    this.sellPercent = 0.65;

    this.saveGame()
  }

  saveGame() {
    const save = {
      game: this
    }

    try {
      localStorage.setItem('save', JSON.stringify(save));
    } catch (error) {
      console.error(error);
    }
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
            this.setupBottomUI()
          }
          

        } else {
          
          this.itemChosen = null
          this.sideUISection.innerHTML = ''
        }
      }
      
    }

  }

  buyItem(item, box) {
    if (this.gold >= item.costBase && box.type == item.type) {
      item.totalInvested += item.costBase
      this.changeGold(item.costBase * -1)
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
        color = '#ffca28'
      } else if (item.type == 'Defender') {

        color = '#42a5f5'
      } else if (item.type == 'Attacker') {
        if (item.damaged == true) {
  
          item.damagedCounter += 1;
          
          if (item.damagedCounter > 15) {
            if (item.health <= 0) {

              if (this.itemChosen == item) {
                this.itemChosen = null
                this.sideUISection.innerHTML = ''

              }
              //this.updateSideUI()
              //this.boxes[item.x][item.y].item = null
              this.emptyBox(item.x, item.y)
              
              this.removeItem(item)
              this.boxes[item.x][item.y].item = null

              return;
            }
            item.damaged = false
            item.damagedCounter = 0;
          }
          color = '#ef5350'
        }
      }
      
    }

    areaA.style.color = color
    areaB.style.color = color
    areaA.innerHTML = item.asciiTop
    areaB.innerHTML = item.asciiBot
  }

  emptyBox(x, y) {
    let areaA = document.getElementById(`${x}, ${y}A`)
    let areaB = document.getElementById(`${x}, ${y}B`)
    areaA.innerHTML = '     '
    areaB.innerHTML = '     '
  }

  spawnWave() {

    let spawnAmount = this.checkpointCounter
    let strongSpawn = Math.floor(spawnAmount/20)
    spawnAmount -= (strongSpawn * 20)
    let normalSpawn = Math.floor(spawnAmount/5)
    spawnAmount -= (normalSpawn * 5)
    let weakSpawn = Math.floor(spawnAmount % 5)
  
    let ySpawn = 0;

    console.log('S: ' + strongSpawn + ', N: ' + normalSpawn + ', W: ' + weakSpawn)


    let spawnAtemptCounter = 0;
    for (let i = 0; i < strongSpawn; i++) {
      do {
        ySpawn = Math.floor(Math.random() * this.height)
        spawnAtemptCounter += 1;
      } while(this.boxes[0][ySpawn].item && spawnAtemptCounter < 9);
      let tempEnemy = new Ogre(0, ySpawn)
      this.boxes[0][ySpawn].item = tempEnemy;
      this.items.push(tempEnemy)
    }
    spawnAtemptCounter = 0;
    for (let i = 0; i < normalSpawn; i++) {
      do {
        ySpawn = Math.floor(Math.random() * this.height)
        spawnAtemptCounter += 1
      } while (this.boxes[0][ySpawn].item && spawnAtemptCounter < 9);
      let tempEnemy = new Orc(0, ySpawn)
      this.boxes[0][ySpawn].item = tempEnemy;
      this.items.push(tempEnemy)
    }

    spawnAtemptCounter = 0;
    for (let i = 0; i < weakSpawn; i++) {
      do {
        ySpawn = Math.floor(Math.random() * this.height)
        spawnAtemptCounter += 1
      } while (this.boxes[0][ySpawn].item && spawnAtemptCounter < 9);
      let tempEnemy = new Goblin(0, ySpawn)
      this.boxes[0][ySpawn].item = tempEnemy;
      this.items.push(tempEnemy)
    }

    //this.boxes[0][ySpawn + 1].item = enemy2;
    //this.items.push(enemy2)
  }

  removeItem(item) {
    let removeItemIndex = null

    this.items.forEach(function (removeItem, i) {
      if (removeItem.x == item.x && removeItem.y == item.y) {
        removeItemIndex = i
      }
    });

    this.items.splice(removeItemIndex, 1)

  }

  moveAttackerForward(item) {
    if (item.x < this.attackWidth - 1) {

      let oldX = item.x
      let oldY = item.y
      item.x += 1
      this.boxes[oldX][oldY].item = null
      this.emptyBox(oldX, oldY)
      this.boxes[item.x][item.y].item = item
    } else if (item.x = this.attackWidth - 1) {

      this.removeItem(item)

      this.boxes[item.x][item.y].item = null
      this.emptyBox(item.x, item.y)
      this.changeGold(item.theftAmount * -1)

    }

  }

  changeGold(amount) {
    this.gold += amount
    if (this.gold < 0) {
      this.gold = 0;
    }
    if (amount != 0) {
      this.goldChanged = true;
      this.goldChangedAmount = amount;
      if (amount > 0) {
        this.goldChangedPositiveAmount += amount
      } else {
        this.goldChangedNegativeAmount += amount
      }
    }
  }



  update() {

    this.updateGold()

    let miners = this.items.filter(item => item.type == 'Miner')

    this.goldPerSecond = miners.reduce(function(sum, miner){
      return sum + miner.goldPerSecond
    }, 0);

    if (this.checkpoint <= this.goldPerSecond) {
      this.checkpoint *= this.checkpointGrowthRate;
      this.checkpointCounter += 1;
      this.spawnWave()
    }

    this.items.forEach((item) => {
      this.drawItemBox(item.x, item.y, item)
      if (item.type == 'Miner') {
        
        this.changeGold(item.countDown(1 / 60));      
        

      } else if (item.type == 'Defender') {

        item.countDown(1 / 60);
        if (item.activated) {
          
          let attackers = this.items.filter(item => item.type == 'Attacker')
          
          if (attackers.length > 0) {
            
            let rightAttacker = this.findRightMost(attackers)
            
            if (rightAttacker.activated) {
              rightAttacker.health -= item.defenseBase
              if (this.itemChosen == rightAttacker) {
                this.updateSideUI()
              }
              rightAttacker.damaged = true;
              item.timeElapsed = 0;
              item.activated = false;
              
            }
          }
          
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

  findRightMost(attackers) {

    let rightMost = attackers[0]
    
    attackers.forEach((attacker) => {
      if (attacker.x > rightMost.x) {
        rightMost = attacker
      }
    })
    
    return rightMost

  }

  updateGold() {
    

    if (this.goldChanged) {
      this.topUISection.innerHTML = 'Gold: '
      if (this.goldChangedCounter < 30) {
        this.goldChangedCounter += 1
        if (this.goldChangedAmount < 0) {
          this.topUISection.innerHTML += '<font color="#d50000">' + Math.round(this.gold) + '  ' + Math.round(this.goldChangedAmount) + '<font>'
        } else {
          this.topUISection.innerHTML += '<font color="#64dd17">' + Math.round(this.gold) + '  +' + Math.round(this.goldChangedAmount) + '<font>'
        }
        
      } else {
        this.goldChanged = false
        this.goldChangedCounter = 0
      }
    } else {
      this.topUISection.innerHTML = 'Gold: ' + Math.round(this.gold)
    }

    this.waveSection.innerHTML = 'Wave: ' + this.checkpointCounter;
    this.placeSection.innerHTML = 'Place: '
    if (this.selectedItem) {
      this.placeSection.innerHTML += this.selectedItem.title
    }
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

    if (this.itemChosen.type != 'Attacker') {
      let progress = Math.round(10 * this.itemChosen.percentProgress)
      let tracker = "+".repeat(progress) + "-".repeat(10 - progress)
      let trackerArea = document.getElementById('trackerTimer')
      trackerArea.innerHTML = '[' + tracker + ']'
    }
    
  }

  updateSideUI() {
    this.sideUISection.innerHTML = longLine
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
      this.sideUISection.innerHTML += '<br>' + shortLine + '<br>'
      this.sideUISection.innerHTML += `<button class="sellButton">Sell</button><p class="itemDescription">${Math.round(this.itemChosen.totalInvested * this.sellPercent)} Gold</p><br>`
      this.updateTracker(this.itemChosen)
    } else if (this.itemChosen.type == 'Defender') {
      this.sideUISection.innerHTML += '<br>' + shortLine + '<br>'
      this.sideUISection.innerHTML += `<button class="sellButton">Sell</button><p class="itemDescription">${Math.round(this.itemChosen.totalInvested * this.sellPercent)} Gold</p><br>`
    } else if (this.itemChosen.type == 'Attacker') {
      this.sideUISection.innerHTML += `<p>Health: ${this.itemChosen.health}</p>`
    }
    this.sideUISection.innerHTML += longLine + '<br>'
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
    this.buttonSection.innerHTML = '+---------------------------------------------------+<br>'
    this.buttonSection.innerHTML += '<button>Defenders</button><button>Miners</button>'
    
    if (this.selectedItem) {
      this.buttonSection.innerHTML += '<button class="cancelButton">Cancel</button>'
    }
  }

  titleButtonPressed(){
    
    if (event.target.textContent == 'Miners') {
      this.listSection.innerHTML = '+---------------------------------------------------+<br>'
      this.minerOptions.forEach((option) => {
        this.listSection.innerHTML += `<button class="itemOption">${option.title}</button>`
        this.listSection.innerHTML += `<p class="itemDescription">Price: ${option.costBase}, Time: ${option.timeToComplete}s, Revenue: ${option.revenueBase} Gold</p>`
        this.listSection.innerHTML += '<br>'
      })
    } else if (event.target.textContent == 'Defenders') {
      this.listSection.innerHTML = '+---------------------------------------------------+<br>'
      this.defenderOptions.forEach((option) => {
        this.listSection.innerHTML += `<button class="itemOption">${option.title}</button>`
        this.listSection.innerHTML += `<p class="itemDescription">Price: ${option.costBase}, Time: ${option.timeToDefend}s, Defense: ${option.defenseBase}</p>`
        this.listSection.innerHTML += '<br>'
        
      })
    } else if (event.target.textContent == 'Cancel') {

      this.selectedItem = null
      this.setupBottomUI()
    }
  }

  itemSelected() {

    
    this.selectedItem = this.minerOptions.filter(option => option.title == event.target.textContent)
    if (this.selectedItem[0]) {
      this.selectedItem = this.selectedItem[0]
      this.selectedItem = new this.selectedItem.constructor()


    } else {
      this.selectedItem = this.defenderOptions.filter(option => option.title == event.target.textContent)
      if (this.selectedItem[0]) {
        this.selectedItem = this.selectedItem[0]
        this.selectedItem = new this.selectedItem.constructor()

      }
    }
    this.setupBottomUI()
  }

  mouseChanger() {
    if (event.target.id != 'grid') {
      document.body.style.cursor = "pointer";
    } else {
      document.body.style.cursor = "default";
    }
  }

  minerAction() {
    if (event.target.textContent == 'Upgrade') {
      if (this.gold >= this.itemChosen.cost) {
        this.itemChosen.totalInvested += this.itemChosen.cost
        this.changeGold(this.itemChosen.cost * -1)
        this.itemChosen.upgrade()
        this.updateSideUI()
      }
  
    } else if (event.target.textContent == 'Mine') {
      this.itemChosen.activated = true
    } else if (event.target.textContent == 'Operator') {
      if (this.gold >= this.itemChosen.operatorCost) {
        this.itemChosen.totalInvested += this.itemChosen.operatorCost
        this.changeGold(this.itemChosen.operatorCost * -1)
        this.itemChosen.buyOperator()
        this.updateSideUI()
      }
    } else if (event.target.textContent == 'Upgrade Op') {
      if (this.gold >= this.itemChosen.operator.cost) {
        this.itemChosen.totalInvested += this.itemChosen.operator.cost
        this.changeGold(this.itemChosen.operator.cost * -1)
        this.itemChosen.operator.upgrade()
      }
    } else if (event.target.textContent == 'Sell'){
      this.sideUISection.innerHTML = ''
      this.changeGold(Math.round(this.itemChosen.totalInvested * this.sellPercent))
      this.emptyBox(this.itemChosen.x, this.itemChosen.y)
      
      this.removeItem(this.itemChosen)
      this.boxes[this.itemChosen.x][this.itemChosen.y].item = null
      this.itemChosen = null
    }
  }

}

export default Game