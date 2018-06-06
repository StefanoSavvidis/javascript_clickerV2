(function(e, a) { for(var i in a) e[i] = a[i]; }(this, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _item = __webpack_require__(2);

var _item2 = _interopRequireDefault(_item);

var _operator = __webpack_require__(7);

var _operator2 = _interopRequireDefault(_operator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//import Pickaxe from "./miners/pickaxe"

var Miner = function (_Item) {
  _inherits(Miner, _Item);

  function Miner(x, y, title, ascii, timeToComplete, revenueBase, costBase, growthRate) {
    _classCallCheck(this, Miner);

    var _this = _possibleConstructorReturn(this, (Miner.__proto__ || Object.getPrototypeOf(Miner)).call(this, x, y, title, ascii, 'Miner'));

    _this.timeToComplete = timeToComplete;
    _this.baseTimeToComplete = timeToComplete;
    _this.revenueBase = revenueBase;

    _this.revenue = _this.revenueBase;

    _this.costBase = costBase;
    _this.cost = costBase;
    _this.growthRate = growthRate;

    _this.timeElapsed = 0;
    _this.activated = true;

    _this.upgradeCount = 1;

    _this.operatorCost = _this.costBase * 10;

    _this.updateUI = false;
    return _this;
  }

  _createClass(Miner, [{
    key: "countDown",
    value: function countDown(frameRate) {

      if (this.operator) {
        if (this.operator.upgraded) {

          this.timeToComplete = this.baseTimeToComplete * this.operator.speedMultiplier;
          this.operator.upgraded = false;
          this.updateUI = true;
        }
      }

      if (this.activated) {
        if (this.timeElapsed == 0) {
          this.updateGrid = true;
        }
        this.timeElapsed += frameRate;
        if (this.timeElapsed >= this.timeToComplete) {
          this.timeElapsed = 0;
          if (this.operator == null) {
            this.activated = false;
            this.updateGrid = true;
          }
          return this.revenue;
        }
      }
      return 0;
    }
  }, {
    key: "buyOperator",
    value: function buyOperator() {
      this.operator = new _operator2.default(this.costBase);
      this.activated = true;
    }
  }, {
    key: "upgrade",
    value: function upgrade() {
      this.upgradeCount += 1;
      this.cost = this.upgradeCost;
      this.revenue = this.revenueBase * this.upgradeCount;
      this.upgraded = true;
    }
  }, {
    key: "asciiTop",
    get: function get() {
      if (this.operator == null) {
        return this.ascii.substr(0, 3) + '  ';
      } else {
        return this.ascii.substr(0, 3) + ' 0';
      }
    }
  }, {
    key: "asciiBot",
    get: function get() {
      if (this.operator == null) {
        return this.ascii.substr(3, 6) + '  ';
      } else {
        return this.ascii.substr(3, 6) + '-|';
      }
    }
  }, {
    key: "upgradeCost",
    get: function get() {
      return this.costBase * Math.pow(this.growthRate, this.upgradeCount);
    }
  }, {
    key: "goldPerSecond",
    get: function get() {
      return this.revenue / this.timeToComplete;
    }
  }, {
    key: "percentProgress",
    get: function get() {
      return this.timeElapsed / this.timeToComplete;
    }
  }]);

  return Miner;
}(_item2.default);

exports.default = Miner;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _item = __webpack_require__(2);

var _item2 = _interopRequireDefault(_item);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Defender = function (_Item) {
  _inherits(Defender, _Item);

  function Defender(x, y, title, ascii, timeToDefend, defenseBase, costBase, growthRate) {
    _classCallCheck(this, Defender);

    var _this = _possibleConstructorReturn(this, (Defender.__proto__ || Object.getPrototypeOf(Defender)).call(this, x, y, title, ascii, 'Defender'));

    _this.timeToDefend = timeToDefend;
    _this.defenseBase = defenseBase;
    _this.costBase = costBase;
    _this.growthRate = growthRate;

    _this.timeElapsed = 0;
    _this.activated = false;
    return _this;
  }

  _createClass(Defender, [{
    key: "reset",
    value: function reset() {
      this.timeElapsed = 0;
      this.activated = false;
    }
  }, {
    key: "countDown",
    value: function countDown(frameRate) {
      if (this.activated == false) {
        if (this.timeElapsed == 0) {
          this.updateGrid = true;
        }
        this.timeElapsed += frameRate;

        if (this.timeElapsed >= this.timeToDefend) {
          this.activated = true;
          this.updateGrid = true;
        }
      }
    }
  }, {
    key: "asciiTop",
    get: function get() {
      return this.ascii.substr(0, 5);
    }
  }, {
    key: "asciiBot",
    get: function get() {
      return this.ascii.substr(5, 10);
    }
  }, {
    key: "percentProgress",
    get: function get() {
      return this.timeElapsed / this.timeToDefend;
    }
  }]);

  return Defender;
}(_item2.default);

exports.default = Defender;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//import Miner from './miner'

var Item = function Item(x, y, title, ascii, type) {
  _classCallCheck(this, Item);

  this.x = x;
  this.y = y;
  this.title = title;
  this.ascii = ascii;
  this.type = type;

  this.totalInvested = 0;
};

exports.default = Item;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _item = __webpack_require__(2);

var _item2 = _interopRequireDefault(_item);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Attacker = function (_Item) {
  _inherits(Attacker, _Item);

  function Attacker(x, y, title, ascii, timeToTile, health, theftAmount) {
    _classCallCheck(this, Attacker);

    var _this = _possibleConstructorReturn(this, (Attacker.__proto__ || Object.getPrototypeOf(Attacker)).call(this, x, y, title, ascii, 'Attacker'));

    _this.timeToTile = timeToTile;
    _this.health = health;
    _this.theftAmount = theftAmount;
    _this.timeElapsed = 0;
    _this.activated = false;
    _this.damaged = false;
    _this.damagedCounter = 0;
    return _this;
  }

  _createClass(Attacker, [{
    key: "countDown",
    value: function countDown(frameRate) {

      if (this.x == 0) {

        this.activated = false;
      } else {

        this.activated = true;
      }

      if (this.timeElapsed == 0) {
        this.updateGrid = true;
      }
      this.timeElapsed += frameRate;

      if (this.timeElapsed >= this.timeToTile) {
        this.timeElapsed = 0;
        return true;
      }
    }
  }, {
    key: "asciiTop",
    get: function get() {
      return this.ascii.substr(0, 5);
    }
  }, {
    key: "asciiBot",
    get: function get() {
      return this.ascii.substr(5, 10);
    }
  }]);

  return Attacker;
}(_item2.default);

exports.default = Attacker;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(5);


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _game = __webpack_require__(6);

var _game2 = _interopRequireDefault(_game);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var game = void 0;

try {
  var savegame = JSON.parse(localStorage.getItem('save'));
  if (savegame == null) {
    game = new _game2.default();
  } else {
    game = new _game2.default();
    //game = savegame.game
    console.log(savegame.game);
  }
} catch (error) {
  console.error(error);
}

setInterval(function () {
  game.update();
}, 16);

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _item = __webpack_require__(2);

var _item2 = _interopRequireDefault(_item);

var _miner = __webpack_require__(0);

var _miner2 = _interopRequireDefault(_miner);

var _orc = __webpack_require__(8);

var _orc2 = _interopRequireDefault(_orc);

var _ogre = __webpack_require__(9);

var _ogre2 = _interopRequireDefault(_ogre);

var _goblin = __webpack_require__(10);

var _goblin2 = _interopRequireDefault(_goblin);

var _hobo = __webpack_require__(11);

var _hobo2 = _interopRequireDefault(_hobo);

var _villager = __webpack_require__(12);

var _villager2 = _interopRequireDefault(_villager);

var _archer = __webpack_require__(13);

var _archer2 = _interopRequireDefault(_archer);

var _knight = __webpack_require__(14);

var _knight2 = _interopRequireDefault(_knight);

var _army = __webpack_require__(15);

var _army2 = _interopRequireDefault(_army);

var _pickaxe = __webpack_require__(16);

var _pickaxe2 = _interopRequireDefault(_pickaxe);

var _dynamite = __webpack_require__(17);

var _dynamite2 = _interopRequireDefault(_dynamite);

var _railcart = __webpack_require__(18);

var _railcart2 = _interopRequireDefault(_railcart);

var _quarry = __webpack_require__(19);

var _quarry2 = _interopRequireDefault(_quarry);

var _box = __webpack_require__(20);

var _box2 = _interopRequireDefault(_box);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var longLine = '+---------------------------------------------------+';
var shortLine = '+-------------------------------+';

var Game = function () {
  function Game() {
    _classCallCheck(this, Game);

    this.attackWidth = 4;
    this.defenseWidth = 1;
    this.mineWidth = 1;
    this.width = this.attackWidth + this.defenseWidth + this.mineWidth + 1;
    this.height = 7;
    this.gold = 2500000;

    this.enemyOptions = [new _orc2.default()];
    this.minerOptions = [new _pickaxe2.default(), new _dynamite2.default(), new _railcart2.default(), new _quarry2.default()];
    this.defenderOptions = [new _hobo2.default(), new _villager2.default(), new _archer2.default(), new _knight2.default(), new _army2.default()];

    this.items = [];

    this.boxes = new Array(this.width);

    for (var i = 0; i < this.width; i++) {
      this.boxes[i] = new Array(this.height);
    }

    for (var _i = 0; _i < this.width; _i++) {
      for (var j = 0; j < this.height; j++) {
        this.boxes[_i][j] = new _box2.default(_i, j, 'type');
        this.assignBoxTypes(this.boxes[_i][j]);
      }
    }

    this.gridSection = document.getElementById('grid');
    this.topUISection = document.getElementById('topUI');
    this.waveSection = document.getElementById('waveUI');
    this.placeSection = document.getElementById('placeUI');
    this.bottomUISection = document.getElementById('bottomUI');
    this.sideUISection = document.getElementById('sideUI');

    this.gridSection.addEventListener('mouseover', this.mouseChanger);

    var self = this;
    this.gridSection.addEventListener('click', function () {
      self.boxClicked();
    });

    this.sideUISection.addEventListener('click', function () {
      self.minerAction();
    });

    this.goldPerSecond = 0;

    this.buildGrid();
    this.setupBottomUI();

    this.checkpoint = 20;
    this.checkpointCounter = 0;
    this.checkpointGrowthRate = 1.14;

    this.goldChanged = false;
    this.goldChangedPositiveAmount = 0;
    this.goldChangedNegativeAmount = 0;
    this.goldChangedAmount = 0;
    this.goldChangedCounter = 0;

    this.sellPercent = 0.65;

    this.saveGame();
  }

  _createClass(Game, [{
    key: 'saveGame',
    value: function saveGame() {
      var save = {
        game: this
      };

      try {
        localStorage.setItem('save', JSON.stringify(save));
      } catch (error) {
        console.error(error);
      }
    }
  }, {
    key: 'buildGrid',
    value: function buildGrid() {
      // save game every time grid is updated
      //this.saveGame();
      var gridString = '';

      // row reperesent the coordinate height while i represent the actual height
      var row = -1;
      var column = 0;

      for (var i = 0; i < this.height * 3 + 1; i++) {
        if (i % 3 == 0) {
          gridString += '+';
          row += 1;
          for (var j = 0; j < this.width; j++) {
            gridString += '-----+';
          }
          gridString += '\n';
        } else {
          gridString += '|';
          for (var _j = 0; _j < this.width; _j++) {
            column = _j;
            if (i % 3 == 1) {
              gridString += '<div id="' + column + ', ' + row + 'A" class="gridTile">     </div>';
            }

            if (i % 3 == 2) {
              gridString += '<div id="' + column + ', ' + row + 'B" class="gridTile">     </div>';
            }

            gridString += '|';
          }
          gridString += '\n';
        }
      }
      this.gridSection.innerHTML = '<pre id="grid">' + gridString + '</pre>';

      for (var _i2 = 0; _i2 < this.width; _i2++) {
        for (var _j2 = 0; _j2 < this.height; _j2++) {
          var builtGrid = document.getElementById(_i2 + ', ' + _j2 + 'A');

          this.boxBackgroundColor(this.boxes[_i2][_j2], builtGrid);
          builtGrid = document.getElementById(_i2 + ', ' + _j2 + 'B');
          this.boxBackgroundColor(this.boxes[_i2][_j2], builtGrid);
        }
      }
    }
  }, {
    key: 'boxClicked',
    value: function boxClicked() {

      if (event.target.id != 'grid') {
        var x = parseInt(event.target.id[0]);
        var y = parseInt(event.target.id[3]);

        if (this.boxes[x][y].item) {
          this.itemChosen = this.boxes[x][y].item;
          this.updateSideUI();
        } else {
          if (this.selectedItem) {

            if (this.buyItem(this.selectedItem, this.boxes[x][y])) {

              this.boxes[x][y].item = this.selectedItem;
              this.itemChosen = this.boxes[x][y].item;
              this.updateSideUI();

              this.selectedItem.x = x;
              this.selectedItem.y = y;
              this.items.push(this.selectedItem);
              this.selectedItem = null;
              this.setupBottomUI();
            }
          } else {

            this.itemChosen = null;
            this.sideUISection.innerHTML = '';
          }
        }
      }
    }
  }, {
    key: 'buyItem',
    value: function buyItem(item, box) {
      if (this.gold >= item.costBase && box.type == item.type) {
        item.totalInvested += item.costBase;
        this.changeGold(item.costBase * -1);
        return true;
      } else {
        return false;
      }
    }
  }, {
    key: 'drawItemBox',
    value: function drawItemBox(x, y, item) {
      var areaA = document.getElementById(x + ', ' + y + 'A');
      var areaB = document.getElementById(x + ', ' + y + 'B');

      var color = 'black';
      if (item.activated) {
        if (item.type == 'Miner') {
          color = '#ffca28';
        } else if (item.type == 'Defender') {

          color = '#42a5f5';
        } else if (item.type == 'Attacker') {
          if (item.damaged == true) {

            item.damagedCounter += 1;

            if (item.damagedCounter > 15) {
              if (item.health <= 0) {

                if (this.itemChosen == item) {
                  this.itemChosen = null;
                  this.sideUISection.innerHTML = '';
                }
                //this.updateSideUI()
                //this.boxes[item.x][item.y].item = null
                this.emptyBox(item.x, item.y);

                this.removeItem(item);
                this.boxes[item.x][item.y].item = null;

                return;
              }
              item.damaged = false;
              item.damagedCounter = 0;
            }
            color = '#ef5350';
          }
        }
      }

      areaA.style.color = color;
      areaB.style.color = color;
      areaA.innerHTML = item.asciiTop;
      areaB.innerHTML = item.asciiBot;
    }
  }, {
    key: 'emptyBox',
    value: function emptyBox(x, y) {
      var areaA = document.getElementById(x + ', ' + y + 'A');
      var areaB = document.getElementById(x + ', ' + y + 'B');
      areaA.innerHTML = '     ';
      areaB.innerHTML = '     ';
    }
  }, {
    key: 'spawnWave',
    value: function spawnWave() {

      var spawnAmount = this.checkpointCounter;
      var strongSpawn = Math.floor(spawnAmount / 20);
      spawnAmount -= strongSpawn * 20;
      var normalSpawn = Math.floor(spawnAmount / 5);
      spawnAmount -= normalSpawn * 5;
      var weakSpawn = Math.floor(spawnAmount % 5);

      var ySpawn = 0;

      console.log('S: ' + strongSpawn + ', N: ' + normalSpawn + ', W: ' + weakSpawn);

      var spawnAtemptCounter = 0;
      for (var i = 0; i < strongSpawn; i++) {
        do {
          ySpawn = Math.floor(Math.random() * this.height);
          spawnAtemptCounter += 1;
        } while (this.boxes[0][ySpawn].item && spawnAtemptCounter < 9);
        var tempEnemy = new _ogre2.default(0, ySpawn);
        this.boxes[0][ySpawn].item = tempEnemy;
        this.items.push(tempEnemy);
      }
      spawnAtemptCounter = 0;
      for (var _i3 = 0; _i3 < normalSpawn; _i3++) {
        do {
          ySpawn = Math.floor(Math.random() * this.height);
          spawnAtemptCounter += 1;
        } while (this.boxes[0][ySpawn].item && spawnAtemptCounter < 9);
        var _tempEnemy = new _orc2.default(0, ySpawn);
        this.boxes[0][ySpawn].item = _tempEnemy;
        this.items.push(_tempEnemy);
      }

      spawnAtemptCounter = 0;
      for (var _i4 = 0; _i4 < weakSpawn; _i4++) {
        do {
          ySpawn = Math.floor(Math.random() * this.height);
          spawnAtemptCounter += 1;
        } while (this.boxes[0][ySpawn].item && spawnAtemptCounter < 9);
        var _tempEnemy2 = new _goblin2.default(0, ySpawn);
        this.boxes[0][ySpawn].item = _tempEnemy2;
        this.items.push(_tempEnemy2);
      }

      //this.boxes[0][ySpawn + 1].item = enemy2;
      //this.items.push(enemy2)
    }
  }, {
    key: 'removeItem',
    value: function removeItem(item) {
      var removeItemIndex = null;

      this.items.forEach(function (removeItem, i) {
        if (removeItem.x == item.x && removeItem.y == item.y) {
          removeItemIndex = i;
        }
      });

      this.items.splice(removeItemIndex, 1);
    }
  }, {
    key: 'moveAttackerForward',
    value: function moveAttackerForward(item) {
      if (item.x < this.attackWidth - 1) {

        var oldX = item.x;
        var oldY = item.y;
        item.x += 1;
        this.boxes[oldX][oldY].item = null;
        this.emptyBox(oldX, oldY);
        this.boxes[item.x][item.y].item = item;
      } else if (item.x = this.attackWidth - 1) {

        this.removeItem(item);

        this.boxes[item.x][item.y].item = null;
        this.emptyBox(item.x, item.y);
        this.changeGold(item.theftAmount * -1);
      }
    }
  }, {
    key: 'changeGold',
    value: function changeGold(amount) {
      this.gold += amount;
      if (this.gold < 0) {
        this.gold = 0;
      }
      if (amount != 0) {
        this.goldChanged = true;
        this.goldChangedAmount = amount;
        if (amount > 0) {
          this.goldChangedPositiveAmount += amount;
        } else {
          this.goldChangedNegativeAmount += amount;
        }
      }
    }
  }, {
    key: 'update',
    value: function update() {
      var _this = this;

      this.updateGold();

      var miners = this.items.filter(function (item) {
        return item.type == 'Miner';
      });

      this.goldPerSecond = miners.reduce(function (sum, miner) {
        return sum + miner.goldPerSecond;
      }, 0);

      if (this.checkpoint <= this.goldPerSecond) {
        this.checkpoint *= this.checkpointGrowthRate;
        this.checkpointCounter += 1;
        this.spawnWave();
      }

      this.items.forEach(function (item) {
        _this.drawItemBox(item.x, item.y, item);
        if (item.type == 'Miner') {

          _this.changeGold(item.countDown(1 / 60));
        } else if (item.type == 'Defender') {

          item.countDown(1 / 60);
          if (item.activated) {

            var attackers = _this.items.filter(function (item) {
              return item.type == 'Attacker';
            });

            if (attackers.length > 0) {

              var rightAttacker = _this.findRightMost(attackers);

              if (rightAttacker.activated) {
                rightAttacker.health -= item.defenseBase;
                if (_this.itemChosen == rightAttacker) {
                  _this.updateSideUI();
                }
                rightAttacker.damaged = true;
                item.timeElapsed = 0;
                item.activated = false;
              }
            }
          }
        } else if (item.type == 'Attacker') {
          if (item.countDown(1 / 60)) {
            _this.moveAttackerForward(item);
          }
        }
      });

      if (this.itemChosen) {
        this.updateTracker(this.itemChosen);
        if (this.itemChosen.updateUI) {
          this.updateSideUI();
          this.itemChosen.updateUI = false;
        }
      }
    }
  }, {
    key: 'findRightMost',
    value: function findRightMost(attackers) {

      var rightMost = attackers[0];

      attackers.forEach(function (attacker) {
        if (attacker.x > rightMost.x) {
          rightMost = attacker;
        }
      });

      return rightMost;
    }
  }, {
    key: 'updateGold',
    value: function updateGold() {

      if (this.goldChanged) {
        this.topUISection.innerHTML = 'Gold: ';
        if (this.goldChangedCounter < 30) {
          this.goldChangedCounter += 1;
          if (this.goldChangedAmount < 0) {
            this.topUISection.innerHTML += '<font color="#d50000">' + Math.round(this.gold) + '  ' + Math.round(this.goldChangedAmount) + '<font>';
          } else {
            this.topUISection.innerHTML += '<font color="#64dd17">' + Math.round(this.gold) + '  +' + Math.round(this.goldChangedAmount) + '<font>';
          }
        } else {
          this.goldChanged = false;
          this.goldChangedCounter = 0;
        }
      } else {
        this.topUISection.innerHTML = 'Gold: ' + Math.round(this.gold);
      }

      this.waveSection.innerHTML = 'Wave: ' + this.checkpointCounter;
      this.placeSection.innerHTML = 'Place: ';
      if (this.selectedItem) {
        this.placeSection.innerHTML += this.selectedItem.title;
      }
    }
  }, {
    key: 'assignBoxTypes',
    value: function assignBoxTypes(box) {
      if (box.x < this.attackWidth) {
        box.type = 'Attacker';
      } else if (box.x < this.attackWidth + 1) {
        box.type = 'Gold';
      } else if (box.x < this.attackWidth + this.defenseWidth + 1) {
        box.type = 'Defender';
      } else {
        box.type = 'Miner';
      }
    }
  }, {
    key: 'boxBackgroundColor',
    value: function boxBackgroundColor(box, area) {

      var color = null;
      if (box.type == 'Attacker') {
        color = '#ffebee';
      } else if (box.type == 'Defender') {
        color = '#e3f2fd';
      } else if (box.type == 'Gold') {} else if (box.type == 'Miner') {
        color = '#fff3e0';
      }
      area.style.background = color;
    }
  }, {
    key: 'updateBox',
    value: function updateBox(x, y) {
      var box = document.getElementById(x + ', ' + y);
    }
  }, {
    key: 'updateTracker',
    value: function updateTracker() {

      if (this.itemChosen.type != 'Attacker') {
        var progress = Math.round(10 * this.itemChosen.percentProgress);
        var tracker = "+".repeat(progress) + "-".repeat(10 - progress);
        var trackerArea = document.getElementById('trackerTimer');
        trackerArea.innerHTML = '[' + tracker + ']';
      }
    }
  }, {
    key: 'updateSideUI',
    value: function updateSideUI() {
      this.sideUISection.innerHTML = longLine;
      this.sideUISection.innerHTML += '<p>' + this.itemChosen.title + '</p><p id="trackerTimer"></p><br>';
      if (this.itemChosen.type == 'Miner') {
        this.sideUISection.innerHTML += '<p>Time: ' + Math.round(this.itemChosen.timeToComplete * 100) / 100 + 's</p>';
        this.sideUISection.innerHTML += '<p>Revenue: ' + Math.round(this.itemChosen.revenue) + '</p>';
        this.sideUISection.innerHTML += '<p>Upgrade Count: ' + (this.itemChosen.upgradeCount - 1) + '</p>';
        if (this.itemChosen.operator == null) {
          this.sideUISection.innerHTML += '<br>+-------------------------------+<br>';
          this.sideUISection.innerHTML += '<br><div><button class="sideUI">Mine</button></div>';
        }
        this.sideUISection.innerHTML += '<br>+-------------------------------+<br>';
        this.sideUISection.innerHTML += '<div id="upgradeButton"><button class="sideUI">Upgrade</button><p class="sideUI">Get more gold per mine (' + Math.round(this.itemChosen.cost) + ' Gold)</p></div>';
        if (this.itemChosen.operator == null) {
          this.sideUISection.innerHTML += '<div><button class="sideUI">Operator</button><p class="sideUI">Automatically mines for you (' + Math.round(this.itemChosen.operatorCost) + ' Gold)</p></div>';
        } else {
          this.sideUISection.innerHTML += '<br>+-------------------------------+<br>';
          this.sideUISection.innerHTML += '<p>Operator</p>';
          this.sideUISection.innerHTML += '<div id="upgradeButton"><button class="sideUI">Upgrade Op</button><p class="sideUI">Speed up mining time (' + Math.round(this.itemChosen.operator.cost) + ' Gold)</p></div>';
        }
        this.sideUISection.innerHTML += '<br>' + shortLine + '<br>';
        this.sideUISection.innerHTML += '<button class="sellButton">Sell</button><p class="itemDescription">' + Math.round(this.itemChosen.totalInvested * this.sellPercent) + ' Gold</p><br>';
        this.updateTracker(this.itemChosen);
      } else if (this.itemChosen.type == 'Defender') {
        this.sideUISection.innerHTML += '<br>' + shortLine + '<br>';
        this.sideUISection.innerHTML += '<button class="sellButton">Sell</button><p class="itemDescription">' + Math.round(this.itemChosen.totalInvested * this.sellPercent) + ' Gold</p><br>';
      } else if (this.itemChosen.type == 'Attacker') {
        this.sideUISection.innerHTML += '<p>Health: ' + this.itemChosen.health + '</p>';
      }
      this.sideUISection.innerHTML += longLine + '<br>';
    }
  }, {
    key: 'setupBottomUI',
    value: function setupBottomUI() {
      this.bottomUISection.innerHTML += '<div id="buttonArea"></div><div id="listArea"></div>';
      this.buttonSection = document.getElementById('buttonArea');
      this.listSection = document.getElementById('listArea');

      var self = this;
      this.buttonSection.addEventListener('click', function () {
        self.titleButtonPressed();
      });
      this.listSection.addEventListener('click', function () {
        self.itemSelected();
      });
      this.buttonSection.innerHTML = '+---------------------------------------------------+<br>';
      this.buttonSection.innerHTML += '<button>Defenders</button><button>Miners</button>';

      if (this.selectedItem) {
        this.buttonSection.innerHTML += '<button class="cancelButton">Cancel</button>';
      }
    }
  }, {
    key: 'titleButtonPressed',
    value: function titleButtonPressed() {
      var _this2 = this;

      if (event.target.textContent == 'Miners') {
        this.listSection.innerHTML = '+---------------------------------------------------+<br>';
        this.minerOptions.forEach(function (option) {
          _this2.listSection.innerHTML += '<button class="itemOption">' + option.title + '</button>';
          _this2.listSection.innerHTML += '<p class="itemDescription">Price: ' + option.costBase + ', Time: ' + option.timeToComplete + 's, Revenue: ' + option.revenueBase + ' Gold</p>';
          _this2.listSection.innerHTML += '<br>';
        });
      } else if (event.target.textContent == 'Defenders') {
        this.listSection.innerHTML = '+---------------------------------------------------+<br>';
        this.defenderOptions.forEach(function (option) {
          _this2.listSection.innerHTML += '<button class="itemOption">' + option.title + '</button>';
          _this2.listSection.innerHTML += '<p class="itemDescription">Price: ' + option.costBase + ', Time: ' + option.timeToDefend + 's, Defense: ' + option.defenseBase + '</p>';
          _this2.listSection.innerHTML += '<br>';
        });
      } else if (event.target.textContent == 'Cancel') {

        this.selectedItem = null;
        this.setupBottomUI();
      }
    }
  }, {
    key: 'itemSelected',
    value: function itemSelected() {

      this.selectedItem = this.minerOptions.filter(function (option) {
        return option.title == event.target.textContent;
      });
      if (this.selectedItem[0]) {
        this.selectedItem = this.selectedItem[0];
        this.selectedItem = new this.selectedItem.constructor();
      } else {
        this.selectedItem = this.defenderOptions.filter(function (option) {
          return option.title == event.target.textContent;
        });
        if (this.selectedItem[0]) {
          this.selectedItem = this.selectedItem[0];
          this.selectedItem = new this.selectedItem.constructor();
        }
      }
      this.setupBottomUI();
    }
  }, {
    key: 'mouseChanger',
    value: function mouseChanger() {
      if (event.target.id != 'grid') {
        document.body.style.cursor = "pointer";
      } else {
        document.body.style.cursor = "default";
      }
    }
  }, {
    key: 'minerAction',
    value: function minerAction() {
      if (event.target.textContent == 'Upgrade') {
        if (this.gold >= this.itemChosen.cost) {
          this.itemChosen.totalInvested += this.itemChosen.cost;
          this.changeGold(this.itemChosen.cost * -1);
          this.itemChosen.upgrade();
          this.updateSideUI();
        }
      } else if (event.target.textContent == 'Mine') {
        this.itemChosen.activated = true;
      } else if (event.target.textContent == 'Operator') {
        if (this.gold >= this.itemChosen.operatorCost) {
          this.itemChosen.totalInvested += this.itemChosen.operatorCost;
          this.changeGold(this.itemChosen.operatorCost * -1);
          this.itemChosen.buyOperator();
          this.updateSideUI();
        }
      } else if (event.target.textContent == 'Upgrade Op') {
        if (this.gold >= this.itemChosen.operator.cost) {
          this.itemChosen.totalInvested += this.itemChosen.operator.cost;
          this.changeGold(this.itemChosen.operator.cost * -1);
          this.itemChosen.operator.upgrade();
        }
      } else if (event.target.textContent == 'Sell') {
        this.sideUISection.innerHTML = '';
        this.changeGold(Math.round(this.itemChosen.totalInvested * this.sellPercent));
        this.emptyBox(this.itemChosen.x, this.itemChosen.y);

        this.removeItem(this.itemChosen);
        this.boxes[this.itemChosen.x][this.itemChosen.y].item = null;
        this.itemChosen = null;
      }
    }
  }]);

  return Game;
}();

exports.default = Game;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Operator = function () {
  function Operator(cost) {
    _classCallCheck(this, Operator);

    this.costBase = cost * 50;
    this.cost = this.costBase;
    this.speedMultiplier = 1;
    this.growthRate = 1.1;
    this.reduceRate = 0.95;
    this.upgradeCount = 1;
    this.upgraded = false;
  }

  _createClass(Operator, [{
    key: "upgrade",
    value: function upgrade() {
      this.upgradeCount += 1;
      this.cost = this.costBase * Math.pow(this.growthRate, this.upgradeCount);
      this.speedMultiplier = this.speedMultiplier * this.reduceRate;
      this.upgraded = true;
    }
  }]);

  return Operator;
}();

exports.default = Operator;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _attacker = __webpack_require__(3);

var _attacker2 = _interopRequireDefault(_attacker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Orc = function (_Attacker) {
  _inherits(Orc, _Attacker);

  function Orc(x, y) {
    _classCallCheck(this, Orc);

    var _this = _possibleConstructorReturn(this, (Orc.__proto__ || Object.getPrototypeOf(Orc)).call(this, x, y, 'Orc', '[0.0][> ]>', 3, 35, 100));

    _this.activated = false;
    return _this;
  }

  return Orc;
}(_attacker2.default);

exports.default = Orc;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _attacker = __webpack_require__(3);

var _attacker2 = _interopRequireDefault(_attacker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Ogre = function (_Attacker) {
  _inherits(Ogre, _Attacker);

  function Ogre(x, y) {
    _classCallCheck(this, Ogre);

    var _this = _possibleConstructorReturn(this, (Ogre.__proto__ || Object.getPrototypeOf(Ogre)).call(this, x, y, 'Ogre', '  ʌ  <0_0>', 5, 100, 1000));

    _this.activated = false;
    return _this;
  }

  return Ogre;
}(_attacker2.default);

exports.default = Ogre;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _attacker = __webpack_require__(3);

var _attacker2 = _interopRequireDefault(_attacker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Goblin = function (_Attacker) {
  _inherits(Goblin, _Attacker);

  function Goblin(x, y) {
    _classCallCheck(this, Goblin);

    var _this = _possibleConstructorReturn(this, (Goblin.__proto__ || Object.getPrototypeOf(Goblin)).call(this, x, y, 'Goblin', '(@_@)VVVVV', 1.2, 10, 35));

    _this.activated = false;
    return _this;
  }

  return Goblin;
}(_attacker2.default);

exports.default = Goblin;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defender = __webpack_require__(1);

var _defender2 = _interopRequireDefault(_defender);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Hobo = function (_Defender) {
  _inherits(Hobo, _Defender);

  function Hobo(x, y) {
    _classCallCheck(this, Hobo);

    return _possibleConstructorReturn(this, (Hobo.__proto__ || Object.getPrototypeOf(Hobo)).call(this, x, y, 'Hobo', ' * @  `-|-', 1, 4, 100, 1.15));
  }

  return Hobo;
}(_defender2.default);

exports.default = Hobo;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defender = __webpack_require__(1);

var _defender2 = _interopRequireDefault(_defender);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Villager = function (_Defender) {
  _inherits(Villager, _Defender);

  function Villager(x, y) {
    _classCallCheck(this, Villager);

    return _possibleConstructorReturn(this, (Villager.__proto__ || Object.getPrototypeOf(Villager)).call(this, x, y, 'Villager', ' | @  \\-|-', 2, 12, 420, 1.10));
  }

  return Villager;
}(_defender2.default);

exports.default = Villager;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defender = __webpack_require__(1);

var _defender2 = _interopRequireDefault(_defender);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Archer = function (_Defender) {
  _inherits(Archer, _Defender);

  function Archer(x, y) {
    _classCallCheck(this, Archer);

    return _possibleConstructorReturn(this, (Archer.__proto__ || Object.getPrototypeOf(Archer)).call(this, x, y, 'Archer', '/| @ \\|-|-', 3, 32, 1440, 1.09));
  }

  return Archer;
}(_defender2.default);

exports.default = Archer;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defender = __webpack_require__(1);

var _defender2 = _interopRequireDefault(_defender);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Knight = function (_Defender) {
  _inherits(Knight, _Defender);

  function Knight(x, y) {
    _classCallCheck(this, Knight);

    return _possibleConstructorReturn(this, (Knight.__proto__ || Object.getPrototypeOf(Knight)).call(this, x, y, 'Knight', ' ^ @  \\-|-', 5, 75, 3750, 1.09));
  }

  return Knight;
}(_defender2.default);

exports.default = Knight;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defender = __webpack_require__(1);

var _defender2 = _interopRequireDefault(_defender);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Army = function (_Defender) {
  _inherits(Army, _Defender);

  function Army(x, y) {
    _classCallCheck(this, Army);

    return _possibleConstructorReturn(this, (Army.__proto__ || Object.getPrototypeOf(Army)).call(this, x, y, 'Army', '@ @ @|-|-|', 10, 200, 15000, 1.08));
  }

  return Army;
}(_defender2.default);

exports.default = Army;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _miner = __webpack_require__(0);

var _miner2 = _interopRequireDefault(_miner);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Pickaxe = function (_Miner) {
  _inherits(Pickaxe, _Miner);

  function Pickaxe(x, y) {
    _classCallCheck(this, Pickaxe);

    return _possibleConstructorReturn(this, (Pickaxe.__proto__ || Object.getPrototypeOf(Pickaxe)).call(this, x, y, 'Pickaxe', '[-] | ', 1, 5, 25, 1.20));
  }

  return Pickaxe;
}(_miner2.default);

exports.default = Pickaxe;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _miner = __webpack_require__(0);

var _miner2 = _interopRequireDefault(_miner);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Dynamite = function (_Miner) {
  _inherits(Dynamite, _Miner);

  function Dynamite(x, y) {
    _classCallCheck(this, Dynamite);

    return _possibleConstructorReturn(this, (Dynamite.__proto__ || Object.getPrototypeOf(Dynamite)).call(this, x, y, 'Dynamite', '*%* | ', 5, 25, 100, 1.10));
  }

  return Dynamite;
}(_miner2.default);

exports.default = Dynamite;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _miner = __webpack_require__(0);

var _miner2 = _interopRequireDefault(_miner);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RailCart = function (_Miner) {
  _inherits(RailCart, _Miner);

  function RailCart(x, y) {
    _classCallCheck(this, RailCart);

    return _possibleConstructorReturn(this, (RailCart.__proto__ || Object.getPrototypeOf(RailCart)).call(this, x, y, 'Rail Cart', '_ _\\_/', 20, 125, 1000, 1.09));
  }

  return RailCart;
}(_miner2.default);

exports.default = RailCart;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _miner = __webpack_require__(0);

var _miner2 = _interopRequireDefault(_miner);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Quarry = function (_Miner) {
  _inherits(Quarry, _Miner);

  function Quarry(x, y) {
    _classCallCheck(this, Quarry);

    return _possibleConstructorReturn(this, (Quarry.__proto__ || Object.getPrototypeOf(Quarry)).call(this, x, y, 'Quarry', '/ \\\\ /', 60, 500, 6000, 1.08));
  }

  return Quarry;
}(_miner2.default);

exports.default = Quarry;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Box = function Box(x, y, type) {
  _classCallCheck(this, Box);

  this.x = x;
  this.y = y;
  this.type = type;
  this.item = null;
};

exports.default = Box;

/***/ })
/******/ ])));