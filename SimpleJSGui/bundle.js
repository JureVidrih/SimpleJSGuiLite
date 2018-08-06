/******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _desktop = __webpack_require__(1);

var _desktop2 = _interopRequireDefault(_desktop);

var _overlay = __webpack_require__(2);

var _overlay2 = _interopRequireDefault(_overlay);

var _system = __webpack_require__(3);

var _system2 = _interopRequireDefault(_system);

var _taskBar = __webpack_require__(4);

var _taskBar2 = _interopRequireDefault(_taskBar);

var _panelMenu = __webpack_require__(5);

var _panelMenu2 = _interopRequireDefault(_panelMenu);

var _panelClock = __webpack_require__(6);

var _panelClock2 = _interopRequireDefault(_panelClock);

var _panelItemContextmenu = __webpack_require__(7);

var _panelItemContextmenu2 = _interopRequireDefault(_panelItemContextmenu);

var _panelItem = __webpack_require__(8);

var _panelItem2 = _interopRequireDefault(_panelItem);

var _panel = __webpack_require__(9);

var _panel2 = _interopRequireDefault(_panel);

var _window = __webpack_require__(10);

var _window2 = _interopRequireDefault(_window);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.SimpleJSGui = new _system2.default();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Desktop = function () {
    function Desktop() {
        _classCallCheck(this, Desktop);

        this.wholeScreenObj = document.createElement("div");
        this.wholeScreenObj.classList.add("gui-desktop");
        this.DOMObj = document.createElement("div");
        this.DOMObj.classList.add("gui-desktop");
        this.DOMObj.classList.add("gui-desktop--only-desktop");
        this.snapIndicatorTop = document.createElement("div");
        this.snapIndicatorLeft = document.createElement("div");
        this.snapIndicatorRight = document.createElement("div");
        this.snapIndicatorTop.classList.add("gui-desktop__window-snap-indicator-top");
        this.snapIndicatorLeft.classList.add("gui-desktop__window-snap-indicator-left");
        this.snapIndicatorRight.classList.add("gui-desktop__window-snap-indicator-right");
        this.DOMObj.appendChild(this.snapIndicatorTop);
        this.DOMObj.appendChild(this.snapIndicatorLeft);
        this.DOMObj.appendChild(this.snapIndicatorRight);
        this.wholeScreenObj.appendChild(this.DOMObj);
        this.currentBgrDOM = this.DOMObj;
        this.width;
        this.height;
    }

    _createClass(Desktop, [{
        key: "getDOMObject",
        value: function getDOMObject() {
            return this.wholeScreenObj;
        }
    }, {
        key: "getDesktopDOMObject",
        value: function getDesktopDOMObject() {
            return this.DOMObj;
        }
    }, {
        key: "shouldBackgroundCoverWholeViewport",
        value: function shouldBackgroundCoverWholeViewport(option) {
            if (option == true) {
                this.currentBgrDOM = this.wholeScreenObj;
                var bottomValue = document.body.clientHeight - this.DOMObj.clientHeight;
                this.snapIndicatorLeft.style.bottom = bottomValue + "px";
                this.snapIndicatorRight.style.bottom = bottomValue + "px";
            } else {
                this.currentBgrDOM = this.DOMObj;
                this.snapIndicatorLeft.style.bottom = 0;
                this.snapIndicatorRight.style.bottom = 0;
            }
        }
    }, {
        key: "changeBackgroundColor",
        value: function changeBackgroundColor(newColor) {
            this.currentBgrDOM.style.backgroundColor = newColor;
        }
    }, {
        key: "changeBackgroundImage",
        value: function changeBackgroundImage(imageUrl) {
            this.currentBgrDOM.style.backgroundImage = "url('" + imageUrl + "')";
            this.currentBgrDOM.style.backgroundSize = "cover";
        }
    }, {
        key: "setBackgroundSize",
        value: function setBackgroundSize(value) {
            this.currentBgrDOM.style.backgroundSize = value;
        }
    }, {
        key: "setBackgroundRepeat",
        value: function setBackgroundRepeat(value) {
            this.currentBgrDOM.style.backgroundRepeat = value;
        }
    }, {
        key: "setBackgroundPosition",
        value: function setBackgroundPosition(a, b) {
            this.currentBgrDOM.style.backgroundPosition = a;
            if (b) {
                this.currentBgrDOM.style.backgroundPosition += " " + b;
            }
        }
    }]);

    return Desktop;
}();

exports.default = Desktop;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Overlay = function () {
    function Overlay() {
        _classCallCheck(this, Overlay);

        this.DOMObj = document.createElement("div");
        this.DOMObj.classList.add("gui-overlay");
    }

    _createClass(Overlay, [{
        key: "getDOMObject",
        value: function getDOMObject() {
            return this.DOMObj;
        }
    }]);

    return Overlay;
}();

exports.default = Overlay;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _desktop = __webpack_require__(1);

var _desktop2 = _interopRequireDefault(_desktop);

var _overlay = __webpack_require__(2);

var _overlay2 = _interopRequireDefault(_overlay);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var System = function () {
    function System() {
        _classCallCheck(this, System);

        this.desktop = new _desktop2.default();
        this.overLay = new _overlay2.default();
        document.body.appendChild(this.desktop.getDOMObject());
        document.body.appendChild(this.overLay.getDOMObject());
        var overLayMessage = document.createElement("p");
        overLayMessage.textContent = "The browser window is too small to fit the necessary SimpleJSGui components.";
        this.overLay.getDOMObject().appendChild(overLayMessage);

        window.addEventListener('resize', function (event) {
            if (this.panel) {
                this.minimalWidth = this.panel.calculateMinimalWidth();
                if (window.innerWidth < this.minimalWidth) {
                    this.overLay.getDOMObject().style.display = "block";
                } else {
                    this.overLay.getDOMObject().style.display = "none";
                }
            }
        }.bind(this));
    }

    _createClass(System, [{
        key: 'getDesktop',
        value: function getDesktop() {
            return this.desktop;
        }
    }, {
        key: 'registerPanel',
        value: function registerPanel(newPanel) {
            this.panel = newPanel;
        }
    }]);

    return System;
}();

exports.default = System;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FreeSpaceWidget = function () {
    function FreeSpaceWidget(taskBar) {
        _classCallCheck(this, FreeSpaceWidget);

        this.taskBar = taskBar;
        this.DOMObj = document.createElement("div");
        this.DOMObj.classList.add("gui-panel__task-bar__free-space");
    }

    _createClass(FreeSpaceWidget, [{
        key: "getDOMObject",
        value: function getDOMObject() {
            return this.DOMObj;
        }
    }, {
        key: "getWidth",
        value: function getWidth() {
            return this.DOMObj.clientWidth;
        }
    }, {
        key: "calculateWidth",
        value: function calculateWidth(panel, leftContainer, rightContainer) {
            var panelWidth = panel.clientWidth;
            var leftContainerWidth = leftContainer.clientWidth;
            var rightContainerWidth = rightContainer.clientWidth;
            // console.log("panel " + panelWidth);
            // console.log("left " + leftContainerWidth);
            // console.log("right " + rightContainerWidth);
            switcherWidth = 0;
            if (this.taskBar && this.taskBar.getLineContainer() && this.taskBar.getLineSwitcher()) {
                switcherWidth = this.taskBar.getLineSwitcher().getDOMObject().clientWidth;
            }
            var width = panelWidth - (leftContainerWidth - this.DOMObj.clientWidth + rightContainerWidth);
            // console.log("width is at: " + width + "px");
            if (width > 0) {
                this.DOMObj.style.width = width + "px";
            } else {
                this.DOMObj.style.width = "0px";

                width = panelWidth - (rightContainerWidth + (leftContainerWidth - this.taskBar.getLineContainer().getDOMObject().clientWidth));
                this.taskBar.getLineContainer().getDOMObject().style.width = width + "px";
            }
        }
    }]);

    return FreeSpaceWidget;
}();

var LineSwitcher = function () {
    function LineSwitcher(taskBar) {
        _classCallCheck(this, LineSwitcher);

        this.taskBar = taskBar;
        this.DOMObj = document.createElement("div");
        this.DOMObj.classList.add("gui-panel__task-bar__line-switcher");

        this.moveUp = document.createElement("img");
        this.moveUp.classList.add("gui-panel__task-bar__line-switcher__move-up");
        this.moveDown = document.createElement("img");
        this.moveDown.classList.add("gui-panel__task-bar__line-switcher__move-down");
        this.currentLevel = document.createElement("p");
        this.currentLevel.classList.add("gui-panel__task-bar__line-switcher__current-level");
        this.currentLevel.textContent = "1";

        this.moveDown.addEventListener("click", function () {
            currentLine = this.taskBar.getLineContainer().getCurrentLine();
            // console.log("Going down, line is " + currentLine);
            if (currentLine > 0) {
                currentLine -= 1;
                this.taskBar.getLineContainer().switchLine(currentLine);
                // console.log("Line Down! #" + currentLine);
            }
        }.bind(this));

        this.moveUp.addEventListener("click", function () {
            currentLine = this.taskBar.getLineContainer().getCurrentLine();
            // console.log("Going up, line is " + currentLine + " " + this.taskBar.getLineContainer().getLines().length);
            if (currentLine < this.taskBar.getLineContainer().getLines().length - 1) {
                currentLine += 1;
                this.taskBar.getLineContainer().switchLine(currentLine);
                // console.log("Line Up! #" + currentLine);
            }
        }.bind(this));

        this.DOMObj.appendChild(this.moveDown);
        this.DOMObj.appendChild(this.currentLevel);
        this.DOMObj.appendChild(this.moveUp);
    }

    _createClass(LineSwitcher, [{
        key: "getDOMObject",
        value: function getDOMObject() {
            return this.DOMObj;
        }
    }, {
        key: "setCurrentLineText",
        value: function setCurrentLineText(text) {
            this.currentLevel.textContent = text;
        }
    }]);

    return LineSwitcher;
}();

var LineContainer = function () {
    function LineContainer(taskBar) {
        _classCallCheck(this, LineContainer);

        this.taskBar = taskBar;
        this.lines = [];
        this.currentLine = 0;
        this.wrapper = document.createElement("div");
        this.wrapper.classList.add("gui-panel__task-bar__wrapper");

        this.DOMObj = document.createElement("div");
        this.DOMObj.classList.add("gui-panel__task-bar__wrapper__line-container");

        this.wrapper.appendChild(this.DOMObj);
    }

    _createClass(LineContainer, [{
        key: "addALine",
        value: function addALine(line) {
            this.lines.push(line);
            this.DOMObj.appendChild(line.getDOMObject());
        }
    }, {
        key: "empty",
        value: function empty() {
            for (i = 0; i < this.lines.length; i++) {
                this.DOMObj.removeChild(this.DOMObj.firstChild);
            }

            this.lines = [];
        }
    }, {
        key: "getLines",
        value: function getLines() {
            return this.lines;
        }
    }, {
        key: "getCurrentLine",
        value: function getCurrentLine() {
            return this.currentLine;
        }
    }, {
        key: "switchLine",
        value: function switchLine(newLine) {
            this.currentLine = newLine;
            // console.log("currentLine is now: " + newLine);
            // console.log("Line height of first line is: " + this.lines[0].getLineHeight());
            // console.log("New top is: " + -(newLine)*this.lines[0].getLineHeight());
            this.taskBar.getLineSwitcher().setCurrentLineText(newLine + 1);
            this.DOMObj.style.top = -newLine * this.lines[0].getLineHeight() + "px";
        }
    }, {
        key: "getWrapperDOM",
        value: function getWrapperDOM() {
            return this.wrapper;
        }
    }, {
        key: "getDOMObject",
        value: function getDOMObject() {
            return this.DOMObj;
        }
    }]);

    return LineContainer;
}();

var Line = function () {
    function Line(taskBar) {
        _classCallCheck(this, Line);

        this.taskBar = taskBar;
        this.items = [];
        this.height = 0;
        this.DOMObj = document.createElement("div");
        this.DOMObj.classList.add("gui-panel__task-bar__wrapper__line-container__line");
        height = window.getComputedStyle(this.DOMObj).getPropertyValue("height");
        this.height = Number(height.substring(0, height.indexOf("px")));
    }

    _createClass(Line, [{
        key: "putAnItem",
        value: function putAnItem(item) {
            this.items.push(item);
            this.DOMObj.appendChild(item.getItem());
        }
    }, {
        key: "getDOMObject",
        value: function getDOMObject() {
            return this.DOMObj;
        }
    }, {
        key: "getLineHeight",
        value: function getLineHeight() {
            return this.height;
        }
    }]);

    return Line;
}();

var TaskBar = function () {
    function TaskBar() {
        _classCallCheck(this, TaskBar);

        this.mode = "icons text";
        this.items = [];
        this.panel = document.querySelector(".gui-panel");
        this.leftContainer = document.querySelector(".gui-panel__left-container");
        this.rightContainer = document.querySelector(".gui-panel__right-container");

        this.lineContainer = new LineContainer(this);
        this.lineContainer.addALine(new Line(this));

        this.lineSwitcher = new LineSwitcher(this);
        this.DOMObj = document.createElement("div");
        this.DOMObj.classList.add("gui-panel__task-bar");
        this.DOMObj.appendChild(this.lineContainer.getWrapperDOM());
        this.DOMObj.appendChild(this.lineSwitcher.getDOMObject());
        this.freeSpaceWidget = new FreeSpaceWidget(this);
        this.DOMObj.appendChild(this.freeSpaceWidget.getDOMObject());
        this.calculateFreeSpace();

        window.addEventListener('resize', function () {
            this.calculateFreeSpace();
        }.bind(this));
    }

    _createClass(TaskBar, [{
        key: "getDOMObject",
        value: function getDOMObject() {
            return this.DOMObj;
        }
    }, {
        key: "getLineContainer",
        value: function getLineContainer() {
            return this.lineContainer;
        }
    }, {
        key: "getLineSwitcher",
        value: function getLineSwitcher() {
            return this.lineSwitcher;
        }
    }, {
        key: "addAnItem",
        value: function addAnItem(newItem) {
            this.items.push(newItem);
            this.lineContainer.getLines()[0].putAnItem(newItem);
            this.freeSpaceWidget.getDOMObject().style.width = "0px";
            this.calculateFreeSpace();
        }
    }, {
        key: "getItems",
        value: function getItems() {
            return this.items;
        }
    }, {
        key: "rearrangeItems",
        value: function rearrangeItems() {
            if (this.items.length > 0) {
                // console.log("Rearranging items...");
                var itemsInALine = Math.floor((this.DOMObj.clientWidth - this.lineSwitcher.getDOMObject().clientWidth) / this.items[0].getItemDefaultWidth());
                if (itemsInALine == 0) {
                    itemsInALine = 1;
                }
                numOfItems = itemsInALine;
                shouldEmptyLineContainer = false;
                if (this.cachedNumOfItems != numOfItems) {
                    shouldEmptyLineContainer = true;
                }
                this.cachedNumOfItems = numOfItems;
                if (this.items.length < itemsInALine) {
                    numOfItems = this.items.length;
                }
                // console.log("items: " + numOfItems);
                amount = numOfItems * this.items[0].getItemDefaultWidth();
                this.lineContainer.getDOMObject().style.width = amount + "px";
                reduce = this.freeSpaceWidget.getDOMObject().clientWidth - amount;
                this.freeSpaceWidget.getDOMObject().style.width = 0 + "px";
                this.freeSpaceWidget.calculateWidth(this.panel, this.leftContainer, this.rightContainer);
                // if(this.freeSpaceWidget.getWidth() <= 0) {
                //     itemsInALine--;
                // }
                // console.log("width is at: " + this.DOMObj.clientWidth);
                // console.log("panel is at: " + this.panel.clientWidth + ", and right is at: " + this.rightContainer.clientWidth);
                var numOfLines = Math.floor(this.items.length / itemsInALine);
                if (this.items.length % itemsInALine != 0) {
                    numOfLines++;
                }

                if (!numOfLines) {
                    numOfLines = 0;
                }

                if (numOfLines <= 1) {
                    this.lineSwitcher.getDOMObject().style.visibility = "hidden";
                } else {
                    this.lineSwitcher.getDOMObject().style.visibility = "visible";
                }

                if (this.lineContainer.getCurrentLine() > numOfLines - 1) {
                    this.lineContainer.switchLine(numOfLines - 1);
                }

                // console.log("length: " + this.items.length);
                // console.log("inaline: " + itemsInALine);
                // console.log("numOfLines: " + numOfLines);
                // console.log("lines: " + numOfLines);

                if (shouldEmptyLineContainer) {
                    this.lineContainer.empty();
                    this.lines = this.lineContainer.getLines();

                    // console.log(this.lines.length);

                    for (i = 0; i < numOfLines; i++) {
                        this.lineContainer.addALine(new Line(this));
                        newLine = this.lines[this.lines.length - 1];
                    }

                    // console.log(this.lines.length);

                    for (i = 0, j = 0, ij = 0; i < this.items.length; i++, ij++) {
                        if (ij >= itemsInALine) {
                            j++;
                            ij = 0;
                        }
                        // console.log("Line is: " + j + " and item is: " + i);

                        // console.log(this.items[i]);
                        this.lines[j].putAnItem(this.items[i]);
                    }

                    this.freeSpaceWidget.calculateWidth(this.panel, this.leftContainer, this.rightContainer);
                }

                // console.log("Num of lines: " + this.lines.length);
                // console.log("Done rearranging!");
                // console.log(" ");
            }
        }
    }, {
        key: "calculateFreeSpace",
        value: function calculateFreeSpace() {
            this.freeSpaceWidget.calculateWidth(this.panel, this.leftContainer, this.rightContainer);
            this.rearrangeItems();
            // if(this.freeSpaceWidget.getWidth() <= 0) {
            //     this.rearrangeItems();
            // }
        }
    }]);

    return TaskBar;
}();

exports.default = TaskBar;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PanelMenu = function () {
    function PanelMenu() {
        _classCallCheck(this, PanelMenu);

        this.DOMObj = document.createElement("div");
        this.DOMObj.classList.add("gui-panel__menu");
        this.DOMObj.innerHTML = '<div class="gui-panel__menu__icon"></div><div class="gui-panel__menu__content"><h1>Menu</h1></div>';
        this.menuIcon = this.DOMObj.querySelector(".gui-panel__menu__icon");
        this.menuContent = this.DOMObj.querySelector(".gui-panel__menu__content");

        this.DOMObj.addEventListener('mousedown', function (event) {
            this.menuContent.classList.toggle("menu-fadein");
        }.bind(this));

        document.addEventListener('mousedown', function (event) {
            if (event.button == 0) {
                if (event.target != this.menuIcon && event.target != this.menuContent) {
                    this.close();
                }
            }
        }.bind(this));
    }

    _createClass(PanelMenu, [{
        key: "getDOMObject",
        value: function getDOMObject() {
            return this.DOMObj;
        }
    }, {
        key: "close",
        value: function close() {
            this.menuContent.classList.remove("menu-fadein");
        }
    }, {
        key: "addAnItem",
        value: function addAnItem(itemName, elementListener) {
            newElement = document.createElement("p");
            newElement.classList.add("gui-panel__menu__content__menu-item");
            newElement.textContent = itemName;
            newElement.addEventListener('mousedown', function () {
                elementListener();
                this.DOMObj.classList.toggle("menu-fadein");
            }.bind(this));
            this.menuContent.appendChild(newElement);

            return this;
        }
    }, {
        key: "addASeparator",
        value: function addASeparator() {
            newElement = document.createElement("div");
            newElement.classList.add("gui-panel__menu__content__item-separator");
            if (this.menuContent.length == 0) {
                console.log("Didn't append the separator because the content of the menu is empty.");
            } else {
                this.menuContent.appendChild(newElement);
            }

            return this;
        }
    }]);

    return PanelMenu;
}();

exports.default = PanelMenu;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PanelItemClock = function () {
    function PanelItemClock(panelInstance) {
        _classCallCheck(this, PanelItemClock);

        this.panelInstance = panelInstance;
        this.time;
        this.displayedTime = "00:00";
        this.clockIntervalID;
        this.DOMObj = document.createElement("div");
        this.DOMObj.classList.add("gui-panel__clock");
        this.DOMObj.innerHTML = "<p>" + this.displayedTime + "</p><div class='gui-panel__clock__clock-widget'></div>";
        this.clockValue = this.DOMObj.querySelector("p");
        this.clockWidget = this.DOMObj.querySelector(".gui-panel__clock__clock-widget");
        this.clockWidget.appendChild(this.createTheClockWidget());
        this.clockWidgetDate;

        this.clockValue.addEventListener('mousedown', function () {
            this.clockWidget.classList.toggle("clock-widget-fadein");
        }.bind(this));

        document.addEventListener('mousedown', function (event) {
            if (event.button == 0) {
                if (!this.isAClockWidget(event.target) && event.target != this.clockValue) {
                    this.clockWidget.classList.remove("clock-widget-fadein");
                }
            }
        }.bind(this));

        return this.DOMObj;
    }

    _createClass(PanelItemClock, [{
        key: "isAClockWidget",
        value: function isAClockWidget(evt_target) {
            while (evt_target != document.body) {
                if (evt_target == this.clockWidget) {
                    return true;
                }

                evt_target = evt_target.parentNode;
            }

            return false;
        }
    }, {
        key: "startTheClock",
        value: function startTheClock() {
            this.clockIntervalID = setInterval(function () {
                this.time = new Date();
                hours = this.time.getHours();
                minutes = this.time.getMinutes();
                if (hours < 10) {
                    hours = "0" + hours;
                }
                if (minutes < 10) {
                    minutes = "0" + minutes;
                }
                this.displayedTime = hours + ":" + minutes;
                this.clockValue.textContent = this.displayedTime;
                if (this.panelInstance.taskBar) {
                    this.panelInstance.taskBar.calculateFreeSpace();
                }
            }.bind(this), 25);
        }
    }, {
        key: "createTheClockWidget",
        value: function createTheClockWidget() {
            tableTop = document.createElement("div");
            tableTop.classList.add("gui-panel__clock__clock-widget__table-top");

            testDate = new Date();
            currYear = testDate.getFullYear();
            currMonth = testDate.getMonth();
            currDay = testDate.getDate();

            prevMonth = document.createElement("img");
            prevMonth.classList.add("gui-panel__clock__clock-widget__table-top__prevMonth");
            prevMonth.addEventListener('mousedown', function () {
                currYear = this.clockWidgetDate.getFullYear();
                currMonth = this.clockWidgetDate.getMonth();
                this.renderMonth(currYear, currMonth - 1);
            }.bind(this));

            nextMonth = document.createElement("img");
            nextMonth.classList.add("gui-panel__clock__clock-widget__table-top__nextMonth");
            nextMonth.addEventListener('mousedown', function () {
                currYear = this.clockWidgetDate.getFullYear();
                currMonth = this.clockWidgetDate.getMonth();
                this.renderMonth(currYear, currMonth + 1);
            }.bind(this));

            tableTop.appendChild(prevMonth);

            this.monthTextSpan = document.createElement("span");
            this.monthTextSpan.setAttribute('id', 'clock-widget-month-name');

            tableTop.appendChild(this.monthTextSpan);
            tableTop.appendChild(nextMonth);
            this.clockContent = document.createElement("div");
            this.clockContent.appendChild(tableTop);
            this.table = document.createElement("table");
            this.table.setAttribute('border', 1);
            this.table.setAttribute('id', 'clock-widget-table');
            this.clockContent.appendChild(this.table);

            this.renderMonth(currYear, currMonth, currDay);

            return this.clockContent;
        }
    }, {
        key: "renderMonth",
        value: function renderMonth(year, month) {
            var currDate = new Date();
            var isCurrentMonth = month == currDate.getMonth() && year == currDate.getFullYear();
            if (!isCurrentMonth) {
                currDate = new Date(year, month);
            }

            this.clockWidgetDate = currDate;

            var currYear = currDate.getFullYear();
            var currMonth = currDate.getMonth();
            if (isCurrentMonth) {
                var currDay = currDate.getDate();
                var currDayOfWeek = currDate.getDay();
            }
            var dayOfWeekOfTheFirstDay = new Date(year, month, 0).getDay() + 1;
            var daysInTheMonth = this.daysInTheMonth(year, month);
            var daysInThePreviousMonth = this.daysInTheMonth(year, month - 1);

            var monthInText = "";

            switch (currMonth + 1) {
                case 1:
                    monthInText = "January";break;
                case 2:
                    monthInText = "February";break;
                case 3:
                    monthInText = "March";break;
                case 4:
                    monthInText = "April";break;
                case 5:
                    monthInText = "May";break;
                case 6:
                    monthInText = "June";break;
                case 7:
                    monthInText = "July";break;
                case 8:
                    monthInText = "August";break;
                case 9:
                    monthInText = "September";break;
                case 10:
                    monthInText = "October";break;
                case 11:
                    monthInText = "November";break;
                case 12:
                    monthInText = "December";break;
            }

            this.monthTextSpan.textContent = monthInText;

            this.table.innerHTML = "<thead><tr><td>Mon</td><td>Tue</td><td>Wed</td><td>Thu</td><td>Fri</td><td>Sat</td><td>Sun</td></tr></thead>";

            data = "";

            var isInPreviousMonth = true;
            var dayValue;
            if (dayOfWeekOfTheFirstDay == 1) {
                dayValue = 1;
                isInPreviousMonth = false;
            } else {
                dayValue = daysInThePreviousMonth - (dayOfWeekOfTheFirstDay - 2);
            }

            for (i = 0, index = 0, isInNextMonth = false; i < 6; i++) {
                row = document.createElement("tr");
                for (j = 0; j < 7; j++, index++) {
                    data = document.createElement("td");
                    data.classList.add("table-data" + index);
                    data.textContent = dayValue;
                    if (isCurrentMonth && dayValue == currDay && !isInPreviousMonth && !isInNextMonth) {
                        data.classList.add("today");
                    }
                    if (isInPreviousMonth || isInNextMonth) {
                        data.classList.add("not-this-month");
                    }
                    row.appendChild(data);
                    dayValue++;
                    if (isInPreviousMonth) {
                        if (dayValue > daysInThePreviousMonth) {
                            dayValue = 1;
                            isInPreviousMonth = false;
                        }
                    } else {
                        if (dayValue > daysInTheMonth) {
                            dayValue = 1;
                            isInNextMonth = true;
                        }
                    }
                }
                this.table.appendChild(row);
            }
        }
    }, {
        key: "daysInTheMonth",
        value: function daysInTheMonth(year, month) {
            var num = 0;

            if (month < 0) {
                year--;
                month = 11;
            } else if (month > 11) {
                year++;
                month = 0;
            }

            while (true) {
                testDate = new Date(year, month, num + 1);

                if (testDate.getMonth() != month) {
                    break;
                }

                num++;
            }

            return num;
        }
    }]);

    return PanelItemClock;
}();

exports.default = PanelItemClock;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PanelItemContextMenu = function () {
    function PanelItemContextMenu(panelItem) {
        _classCallCheck(this, PanelItemContextMenu);

        this.panelITem = panelItem;
        this.DOMObj = document.createElement("div");
        this.DOMObj.classList.add("gui-panel__task-bar__item__context-menu");
        this.DOMObj.innerHTML = '<div class="gui-panel__task-bar__item__context-menu__content"></div>';
        this.menuContent = this.DOMObj.querySelector(".gui-panel__task-bar__item__context-menu__content");

        document.addEventListener('mousedown', function (event) {
            if (event.button == 0) {
                if (!event.target.classList.contains("gui-panel__task-bar__item")) {
                    this.DOMObj.classList.remove("context-menu-fadein");
                }
            }
        }.bind(this));
    }

    _createClass(PanelItemContextMenu, [{
        key: "getDOMObject",
        value: function getDOMObject() {
            return this.DOMObj;
        }
    }, {
        key: "setBottomY",
        value: function setBottomY(newY) {
            console.log(newY);
            this.DOMObj.style.bottom = newY + "px";
        }
    }, {
        key: "addAnItem",
        value: function addAnItem(itemName, elementListener) {
            newElement = document.createElement("p");
            newElement.classList.add("gui-panel__task-bar__item__context-menu__content__menu-item");
            newElement.textContent = itemName;
            newElement.addEventListener('mousedown', function () {
                elementListener();
                this.DOMObj.classList.toggle("context-menu-fadein");
            }.bind(this));
            if (this.menuContent.length == 0) {
                this.menuContent.appendChild(newElement);
            } else {
                this.menuContent.insertBefore(newElement, this.menuContent.querySelector("*"));
            }

            return this;
        }
    }, {
        key: "addASeparator",
        value: function addASeparator() {
            newElement = document.createElement("div");
            newElement.classList.add("gui-panel__task-bar__item__context-menu__content__item-separator");
            if (this.menuContent.length == 0) {
                console.log("Didn't append the separator because the content of the menu is empty.");
            } else {
                this.menuContent.insertBefore(newElement, this.menuContent.querySelector("p"));
            }

            return this;
        }
    }]);

    return PanelItemContextMenu;
}();

exports.default = PanelItemContextMenu;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PanelItem = function () {
    function PanelItem(id, itemName) {
        _classCallCheck(this, PanelItem);

        this.itemWidth = 0;
        this.id = id;
        this.maxTitleLength = 25;
        this.withText = true;
        this.itemName = itemName;
        this.contextMenu = new PanelItemContextMenu(this);
        this.item = document.createElement("div");
        this.item.classList.add("gui-panel__task-bar__item");
        this.nameObj = document.createElement("p");
        if (this.itemName.length > this.maxTitleLength) {
            this.itemName = this.itemName.substring(0, this.maxTitleLength - 3) + "...";
        }
        this.nameObj.textContent = this.itemName;
        this.itemIcon = document.createElement("img");
        this.itemIcon.classList.add("gui-panel__task-bar__item__icon");
        this.item.appendChild(this.itemIcon);
        this.item.appendChild(this.nameObj);
        this.item.appendChild(this.contextMenu.getDOMObject());
        this.changeMode();
        return this.item;
    }

    _createClass(PanelItem, [{
        key: "getName",
        value: function getName() {
            return this.itemName;
        }
    }, {
        key: "getId",
        value: function getId() {
            return this.id;
        }
    }, {
        key: "getItem",
        value: function getItem() {
            return this.item;
        }
    }, {
        key: "getItemDefaultWidth",
        value: function getItemDefaultWidth() {
            var width = window.getComputedStyle(this.item).getPropertyValue("width");
            var value = width;
            value = value.substring(0, value.indexOf("px"));

            return Number(value);
        }
    }, {
        key: "getDOMObject",
        value: function getDOMObject() {
            return this.item;
        }
    }, {
        key: "getContextMenu",
        value: function getContextMenu() {
            return this.contextMenu;
        }
    }, {
        key: "getTitleObj",
        value: function getTitleObj() {
            return this.nameObj;
        }
    }, {
        key: "setTitle",
        value: function setTitle(newtitle) {
            this.itemName = newtitle;
            if (this.itemName.length > this.maxTitleLength) {
                this.itemName = this.itemName.substring(0, this.maxTitleLength - 3) + "...";
            }
            this.nameObj.textContent = this.itemName;
        }
    }, {
        key: "setIcon",
        value: function setIcon(path) {
            this.itemIcon.setAttribute("src", path);
            // console.log("actual width: " +  this.itemIcon.clientWidth);
        }
    }, {
        key: "changeMode",
        value: function changeMode() {
            if (!this.withText) {
                this.nameObj.style.display = "none";
                this.item.classList.add("gui-panel__task-bar__item--without-text");
                // iconWidth = window.getComputedStyle(this.itemIcon).getPropertyValue("width");
                // iconWidth = Number(iconWidth.substring(0, iconWidth.indexOf("px")));
                // console.log(iconWidth);
                // sidesMargin = window.getComputedStyle(this.itemIcon).getPropertyValue("margin-left");
                // sidesMargin = Number(sidesMargin.substring(0, sidesMargin.indexOf("px")))*2;
                // console.log(sidesMargin);
                // totalWidth = iconWidth + sidesMargin;
                // console.log("width: " + totalWidth);
                // this.item.style.width = totalWidth+"px";
            }
        }
    }]);

    return PanelItem;
}();

exports.default = PanelItem;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Panel = function () {
    function Panel() {
        _classCallCheck(this, Panel);

        this.windows = [];
        this.windowsStatus = new Map();
        this.leftContainer = document.createElement("div");
        this.leftContainer.classList.add("gui-panel__left-container");
        this.rightContainer = document.createElement("div");
        this.rightContainer.classList.add("gui-panel__right-container");
        this.panelMenu = new PanelMenu();
        this.panelMenu.addAnItem("Test #1", function () {
            return console.log("test 1");
        }).addASeparator().addAnItem("Test #2", function () {
            return console.log("test 2");
        });
        this.panelClock = new PanelItemClock(this);
        this.desktop = SimpleJSGui.getDesktop();
        this.DOMObj = document.createElement("div");
        this.DOMObj.classList.add("gui-panel");
        this.DOMObj.id = "panelInstance1";
        this.panelInstance = this.DOMObj.id;
        this.leftContainer.appendChild(this.panelMenu.getDOMObject());
        this.rightContainer.appendChild(this.panelClock.getTemplate());
        this.DOMObj.appendChild(this.leftContainer);
        this.DOMObj.appendChild(this.rightContainer);
        this.panelClock.startTheClock();
        document.body.appendChild(this.DOMObj);
        this.taskBar = new TaskBar();
        this.leftContainer.appendChild(this.taskBar.getDOMObject());
        SimpleJSGui.registerPanel(this);

        document.addEventListener('mousedown', function (event) {
            if (event.button == 0 && this.windows.length > 0) {
                element = event.target;
                isAChild = false;
                do {
                    if (element.classList && element.classList.contains("gui-window")) {
                        isAChild = true;
                        break;
                    }
                    element = element.parentNode;
                } while (element);
                if (!isAChild) {
                    this.windows[0].unfocusAllWindows();
                }
            }
        }.bind(this));
    }

    _createClass(Panel, [{
        key: "addAWindow",
        value: function addAWindow(newWindow) {
            this.windows.push(newWindow);
            this.windowsStatus.set(newWindow.getId(), "active");
            this.taskBar.addAnItem(new PanelItem(newWindow.getId(), newWindow.getTitle()));
            var node = this.taskBar.getItems()[this.taskBar.getItems().length - 1];
            var nodeElem = node.getDOMObject();
            nodeElem.classList.add("gui-panel__task-bar__item--active");
            nodeElem.addEventListener('click', function (event) {
                var status = this.windowsStatus.get(newWindow.getId());
                if (status == "active") {
                    this.windowAction("minimize", newWindow.getId());
                    contextMenu = nodeElem.querySelector(".gui-panel__task-bar__item__context-menu");
                    if (contextMenu.style.display == "inline-block") {
                        contextMenu.style.display = "none";
                    }
                } else if (status == "unactive") {
                    this.windowAction("maximize", newWindow.getId());
                    contextMenu = nodeElem.querySelector(".gui-panel__task-bar__item__context-menu");
                    if (contextMenu.style.display == "inline-block") {
                        contextMenu.style.display = "none";
                    }
                }
            }.bind(this));
            nodeElem.addEventListener('contextmenu', function (event) {
                event.preventDefault();
                contextMenu = nodeElem.querySelector(".gui-panel__task-bar__item__context-menu");
                items = this.taskBar.getItems();
                for (i = 0; i < items.length; i++) {
                    if (items[i].getId() != newWindow.getId()) {
                        anItem = items[i].getDOMObject().querySelector(".gui-panel__task-bar__item__context-menu");
                        if (anItem.classList.contains("context-menu-fadein")) {
                            anItem.classList.remove("context-menu-fadein");
                        }
                    }
                }
                this.panelMenu.close();
                // if(contextMenu.style.display == "none") {
                //     contextMenu.style.display = "block";
                //     contextMenu.classList.add("context-menu-fadein");
                // } else {
                //     contextMenu.classList.remove("context-menu-fadein");
                //     contextMenu.style.display = "none";
                node.getContextMenu().setBottomY(window.innerHeight - this.DOMObj.getBoundingClientRect().top);
                contextMenu.classList.toggle("context-menu-fadein");
                var status = this.windowsStatus.get(newWindow.getId());
                if (status == "unactive") {
                    this.windowAction("minimize", newWindow.getId());
                }
                return false;
            }.bind(this), false);
            if (newWindow.isWindowPinnable()) {
                var items = this.taskBar.getItems();
                items[items.length - 1].getContextMenu().addAnItem("Pin this app", function () {}).addASeparator();
            }
            document.body.appendChild(newWindow.getDOMObject());
            newWindow.focusWindow();
        }
    }, {
        key: "selectInstance",
        value: function selectInstance(instanceId) {
            this.panelInstance = instanceId;
        }
    }, {
        key: "windowAction",
        value: function windowAction(actionToDo, id) {
            if (actionToDo == "minimize") {
                var status = this.windowsStatus.get(id);
                if (status == "active") {
                    var windowId = this.getWindowOrderNumberById(id);
                    var node = document.getElementsByClassName("gui-panel__task-bar__item")[windowId];
                    this.windowsStatus.set(id, "unactive");
                    node.classList.remove("gui-panel__task-bar__item--active");
                    document.getElementById(this.windows[windowId].getId()).style.display = "none";
                } else if (status == "unactive") {
                    var windowId = this.getWindowOrderNumberById(id);
                    var node = document.getElementsByClassName("gui-panel__task-bar__item")[windowId];
                    this.windowsStatus.set(id, "active");
                    node.classList.add("gui-panel__task-bar__item--active");
                    document.getElementById(this.windows[windowId].getId()).style.display = "block";
                }
            } else if (actionToDo == "maximize") {
                var windowId = this.getWindowOrderNumberById(id);
                var node = document.getElementsByClassName("gui-panel__task-bar__item")[windowId];
                this.windowsStatus.set(id, "active");
                node.classList.add("gui-panel__task-bar__item--active");
                this.windows[windowId].focusWindow();
                document.getElementById(this.windows[windowId].getId()).style.display = "block";
            } else if (actionToDo == "close") {
                var windowId = this.getWindowOrderNumberById(id);
                var windownode = document.getElementsByClassName("gui-window")[windowId];
                var itemnode = document.getElementsByClassName("gui-panel__task-bar__item")[windowId];
                windownode.remove();
                itemnode.remove();
                this.windows.splice(windowId, 1);
                this.windowsStatus.delete(windowId);
                this.taskBar.getItems().splice(windowId, 1);
            }
        }
    }, {
        key: "getWindows",
        value: function getWindows() {
            return this.windows;
        }
    }, {
        key: "getWindowOrderNumberById",
        value: function getWindowOrderNumberById(id) {
            for (i = 0; i < this.windows.length; i++) {
                if (this.windows[i].getId() == id) {
                    return i;
                }
            }
        }
    }, {
        key: "getPanelItem",
        value: function getPanelItem(windowId) {
            var items = this.taskBar.getItems();
            for (i = 0; i < items.length; i++) {
                if (items[i].getId() == windowId) {
                    return items[i];
                }
            }
            return null;
        }
    }, {
        key: "calculateMinimalWidth",
        value: function calculateMinimalWidth() {
            var dummyPanelItem = new PanelItem("DUMMY_ID", "DummyText");
            return this.panelMenu.getDOMObject().clientWidth + 2 + dummyPanelItem.getItemDefaultWidth() + this.taskBar.getLineSwitcher().getDOMObject().clientWidth + this.rightContainer.clientWidth;
        }
    }]);

    return Panel;
}();

exports.default = Panel;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Window = function () {
    function Window(panelInstance, windowId) {
        _classCallCheck(this, Window);

        this.maxTitleLength = 3000;
        this.titleText;
        this.remInPixels;
        this.DOMObj;

        this.panelInstance = panelInstance;
        this.isPinnable = true;
        this.id = windowId;

        this.panelItem = this.panelInstance.getPanelItem(this.id);

        this.isBeingDragged = false;
        this.cachedX = 0;
        this.cachedY = 0;

        this.isBeingResized = false;
        this.minWidth = 350;
        this.minHeight = 400;
        this.isResizingNW = false;
        this.isResizingNE = false;
        this.isResizingSW = false;
        this.isResizingSE = false;
        this.isResizingN = false;
        this.isResizingS = false;
        this.isResizingW = false;
        this.isResizingE = false;
        this.cachedResizeX = 0;
        this.cachedResizeY = 0;
        this.resizeListenerFullHD;
        this.resizeListenerHD;
        this.resizeListenerVGA;
        this.resizeListenerQVGA;
        this.wasListenerFullHDCalled = false;
        this.wasListenerHDCalled = false;
        this.wasListenerVGACalled = false;
        this.wasListenerQVGACalled = false;

        this.isMaximized = false;
        this.cachedXBeforeMax;
        this.cachedYBeforeMax;
        this.cachedWidth = 0;
        this.cachedHeight = 0;
        this.isSnapped = false;
        this.snapEffectsToggled = false;
        this.cachedXBeforeSnap;
        this.isAtTop;
        this.isAtLeft;
        this.isAtRight;
        this.createDOMObject();
        this.setTitle("M");
        this.remInPixels = parseInt(getComputedStyle(this.DOMObj).fontSize);
        this.setTitle("Window Title");
        this.guiWindow.style.top = "50px";
        this.guiWindow.style.left = "300px";
        this.setWidth(350);
        this.setHeight(400);
        this.registerEvents();
    }

    _createClass(Window, [{
        key: "getDOMObject",
        value: function getDOMObject() {
            return this.DOMObj;
        }
    }, {
        key: "getId",
        value: function getId() {
            return this.id;
        }
    }, {
        key: "getPanelItem",
        value: function getPanelItem() {
            return this.panelInstance.getPanelItem(this.id);
        }
    }, {
        key: "createDOMObject",
        value: function createDOMObject() {
            this.DOMObj = document.createElement("div");
            this.DOMObj.id = this.id;
            this.DOMObj.innerHTML = '<div class="gui-window">' + '<div id="nw-resize"></div>' + '<div id="ne-resize"></div>' + '<div id="sw-resize"></div>' + '<div id="se-resize"></div>' + '<div id="n-resize"></div>' + '<div id="s-resize"></div>' + '<div id="w-resize"></div>' + '<div id="e-resize"></div>' + '<div class="gui-window__titlebar">' + '<div class="gui-window__titlebar__buttons"><a class="window-btn window-btn-close" href="#"></a><a class="window-btn window-btn-minimize" href="#"></a><a class="window-btn window-btn-maximize" href="#"></a></div><div class="gui-window__titlebar__title">Window Title</div><img class="gui-window__titlebar__icon"></img>' + '</div>' + '<div class="gui-window__content">Window content.</div>' + '</div>';
            this.guiWindow = this.DOMObj.querySelector(".gui-window");
            this.nwResize = this.DOMObj.querySelector("#nw-resize");
            this.neResize = this.DOMObj.querySelector("#ne-resize");
            this.swResize = this.DOMObj.querySelector("#sw-resize");
            this.seResize = this.DOMObj.querySelector("#se-resize");
            this.nResize = this.DOMObj.querySelector("#n-resize");
            this.sResize = this.DOMObj.querySelector("#s-resize");
            this.wResize = this.DOMObj.querySelector("#w-resize");
            this.eResize = this.DOMObj.querySelector("#e-resize");
            this.titleBar = this.DOMObj.querySelector(".gui-window__titlebar");
            this.close = this.DOMObj.getElementsByClassName("window-btn-close")[0];
            this.min = this.DOMObj.getElementsByClassName("window-btn-minimize")[0];
            this.max = this.DOMObj.getElementsByClassName("window-btn-maximize")[0];
            this.icon = this.DOMObj.querySelector(".gui-window__titlebar__icon");
            this.title = this.DOMObj.querySelector(".gui-window__titlebar__title");
            this.windowIcon = this.DOMObj.querySelector(".gui-window__titlebar__icon");
            this.windowContent = this.DOMObj.querySelector(".gui-window__content");
        }
    }, {
        key: "registerEvents",
        value: function registerEvents() {
            this.close.addEventListener('click', function () {
                this.panelInstance.windowAction("close", this.id);
            }.bind(this));

            this.min.addEventListener('click', function () {
                this.panelInstance.windowAction("minimize", this.id);
            }.bind(this));

            this.max.addEventListener('click', function () {
                // var content = this.guiWindow.getElementsByClassName("gui-window__content")[0];
                // if(content.style.display == "none") {
                //     content.style.display = "block";
                // } else {
                //     content.style.display = "none";
                // }
                this.maximizeWindow();
            }.bind(this));

            this.nwResize.addEventListener('mousedown', function (event) {
                this.isBeingResized = true;
                this.isResizingNW = true;
                this.cachedResizeX = event.clientX;
                this.cachedResizeY = event.clientY;
            }.bind(this));

            this.neResize.addEventListener('mousedown', function (event) {
                this.isBeingResized = true;
                this.isResizingNE = true;
                this.cachedResizeX = event.clientX;
                this.cachedResizeY = event.clientY;
            }.bind(this));

            this.swResize.addEventListener('mousedown', function (event) {
                this.isBeingResized = true;
                this.isResizingSW = true;
                this.cachedResizeX = event.clientX;
                this.cachedResizeY = event.clientY;
            }.bind(this));

            this.seResize.addEventListener('mousedown', function (event) {
                this.isBeingResized = true;
                this.isResizingSE = true;
                this.cachedResizeX = event.clientX;
                this.cachedResizeY = event.clientY;
            }.bind(this));

            this.nResize.addEventListener('mousedown', function (event) {
                this.isBeingResized = true;
                this.isResizingN = true;
                this.cachedResizeX = event.clientX;
                this.cachedResizeY = event.clientY;
            }.bind(this));

            this.sResize.addEventListener('mousedown', function (event) {
                this.isBeingResized = true;
                this.isResizingS = true;
                this.cachedResizeX = event.clientX;
                this.cachedResizeY = event.clientY;
            }.bind(this));

            this.wResize.addEventListener('mousedown', function (event) {
                this.isBeingResized = true;
                this.isResizingW = true;
                this.cachedResizeX = event.clientX;
                this.cachedResizeY = event.clientY;
            }.bind(this));

            this.eResize.addEventListener('mousedown', function (event) {
                this.isBeingResized = true;
                this.isResizingE = true;
                this.cachedResizeX = event.clientX;
                this.cachedResizeY = event.clientY;
            }.bind(this));

            document.addEventListener('mouseup', function (event) {
                if (this.isBeingResized) {
                    this.isBeingResized = false;
                    this.isResizingNW = false;
                    this.isResizingNE = false;
                    this.isResizingSW = false;
                    this.isResizingSE = false;
                    this.isResizingN = false;
                    this.isResizingS = false;
                    this.isResizingW = false;
                    this.isResizingE = false;
                }
            }.bind(this));

            document.addEventListener('mousemove', function (event) {
                if (this.isBeingResized) {
                    if (this.isResizingNW) {
                        change = this.cachedResizeX - event.clientX;
                        changeToApply = this.getWindowX() - change;
                        if (this.getWidth() > this.minWidth) {
                            this.guiWindow.style.left = changeToApply + "px";
                            this.setWidth(this.getWidth() + change);
                        } else {
                            if (change > 0) {
                                this.guiWindow.style.left = changeToApply + "px";
                                this.setWidth(this.getWidth() + change);
                            }
                        }
                        change = this.cachedResizeY - event.clientY;
                        changeToApply = this.getWindowY() - change;
                        if (this.getHeight() > this.minHeight) {
                            this.guiWindow.style.top = changeToApply + "px";
                            this.setHeight(this.getHeight() + change);
                        } else {
                            if (change > 0) {
                                this.guiWindow.style.top = changeToApply + "px";
                                this.setHeight(this.getHeight() + change);
                            }
                        }

                        this.cachedResizeX = event.clientX;
                        this.cachedResizeY = event.clientY;
                    } else if (this.isResizingNE) {
                        change = event.clientX - this.cachedResizeX;
                        changeToApply = this.getWindowX() - change;
                        if (this.getWidth() > this.minWidth) {
                            this.guiWindow.style.right = changeToApply + "px";
                            this.setWidth(this.getWidth() + change);
                        } else {
                            if (change > 0) {
                                this.guiWindow.style.right = changeToApply + "px";
                                this.setWidth(this.getWidth() + change);
                            }
                        }
                        change = this.cachedResizeY - event.clientY;
                        changeToApply = this.getWindowY() - change;
                        if (this.getHeight() > this.minHeight) {
                            this.guiWindow.style.top = changeToApply + "px";
                            this.setHeight(this.getHeight() + change);
                        } else {
                            if (change > 0) {
                                this.guiWindow.style.top = changeToApply + "px";
                                this.setHeight(this.getHeight() + change);
                            }
                        }

                        this.cachedResizeX = event.clientX;
                        this.cachedResizeY = event.clientY;
                    } else if (this.isResizingSW) {
                        change = this.cachedResizeX - event.clientX;
                        changeToApply = this.getWindowX() - change;
                        if (this.getWidth() > this.minWidth) {
                            this.guiWindow.style.left = changeToApply + "px";
                            this.setWidth(this.getWidth() + change);
                        } else {
                            if (change > 0) {
                                this.guiWindow.style.left = changeToApply + "px";
                                this.setWidth(this.getWidth() + change);
                            }
                        }
                        change = event.clientY - this.cachedResizeY;
                        changeToApply = this.getWindowY() - change;
                        if (this.getHeight() > this.minHeight) {
                            this.guiWindow.style.bottom = changeToApply + "px";
                            this.setHeight(this.getHeight() + change);
                        } else {
                            if (change > 0) {
                                this.guiWindow.style.bottom = changeToApply + "px";
                                this.setHeight(this.getHeight() + change);
                            }
                        }

                        this.cachedResizeX = event.clientX;
                        this.cachedResizeY = event.clientY;
                    } else if (this.isResizingSE) {
                        change = event.clientX - this.cachedResizeX;
                        changeToApply = this.getWindowX() - change;
                        if (this.getWidth() > this.minWidth) {
                            this.guiWindow.style.right = changeToApply + "px";
                            this.setWidth(this.getWidth() + change);
                        } else {
                            if (change > 0) {
                                this.guiWindow.style.right = changeToApply + "px";
                                this.setWidth(this.getWidth() + change);
                            }
                        }
                        change = event.clientY - this.cachedResizeY;
                        changeToApply = this.getWindowY() - change;
                        if (this.getHeight() > this.minHeight) {
                            this.guiWindow.style.bottom = changeToApply + "px";
                            this.setHeight(this.getHeight() + change);
                        } else {
                            if (change > 0) {
                                this.guiWindow.style.bottom = changeToApply + "px";
                                this.setHeight(this.getHeight() + change);
                            }
                        }

                        this.cachedResizeX = event.clientX;
                        this.cachedResizeY = event.clientY;
                    } else if (this.isResizingN) {
                        change = this.cachedResizeY - event.clientY;
                        changeToApply = this.getWindowY() - change;
                        if (this.getHeight() > this.minHeight) {
                            this.guiWindow.style.top = changeToApply + "px";
                            this.setHeight(this.getHeight() + change);
                        } else {
                            if (change > 0) {
                                this.guiWindow.style.top = changeToApply + "px";
                                this.setHeight(this.getHeight() + change);
                            }
                        }

                        this.cachedResizeY = event.clientY;
                    } else if (this.isResizingS) {
                        change = event.clientY - this.cachedResizeY;
                        changeToApply = this.getWindowY() - change;
                        if (this.getHeight() > this.minHeight) {
                            this.guiWindow.style.bottom = changeToApply + "px";
                            this.setHeight(this.getHeight() + change);
                        } else {
                            if (change > 0) {
                                this.guiWindow.style.bottom = changeToApply + "px";
                                this.setHeight(this.getHeight() + change);
                            }
                        }

                        this.cachedResizeY = event.clientY;
                    } else if (this.isResizingW) {
                        change = this.cachedResizeX - event.clientX;
                        changeToApply = this.getWindowX() - change;
                        if (this.getWidth() > this.minWidth) {
                            this.guiWindow.style.left = changeToApply + "px";
                            this.setWidth(this.getWidth() + change);
                        } else {
                            if (change > 0) {
                                this.guiWindow.style.left = changeToApply + "px";
                                this.setWidth(this.getWidth() + change);
                            }
                        }

                        this.cachedResizeX = event.clientX;
                    } else if (this.isResizingE) {
                        change = event.clientX - this.cachedResizeX;
                        changeToApply = this.getWindowX() - change;
                        if (this.getWidth() > this.minWidth) {
                            this.guiWindow.style.right = changeToApply + "px";
                            this.setWidth(this.getWidth() + change);
                        } else {
                            if (change > 0) {
                                this.guiWindow.style.right = changeToApply + "px";
                                this.setWidth(this.getWidth() + change);
                            }
                        }

                        this.cachedResizeX = event.clientX;
                    }

                    this.calculateNewTitleLimits();
                }
            }.bind(this));

            this.guiWindow.addEventListener('mousedown', function (event) {
                if (event.button == 0) {
                    this.focusWindow();
                }
            }.bind(this));

            this.titleBar.addEventListener('mousedown', function (event) {
                this.isBeingDragged = true;
                this.cachedX = event.clientX;
                this.cachedY = event.clientY;
                if (!this.guiWindow.classList.contains("window-effect-transparency")) {
                    this.guiWindow.classList.add("window-effect-transparency");
                }
            }.bind(this));

            this.titleBar.addEventListener('dblclick', function (event) {
                this.maximizeWindow();
            }.bind(this));

            document.addEventListener('mouseup', function (event) {
                if (this.isBeingDragged) {
                    this.isBeingDragged = false;
                    if (!this.isMaximized && (this.isAtTop || this.isAtLeft || this.isAtRight)) {
                        this.snapWindow();
                    }
                    this.guiWindow.classList.remove("window-effect-transparency");
                }
            }.bind(this));

            document.addEventListener('mousemove', function (event) {
                if (this.isBeingDragged) {
                    coord = this.guiWindow.getBoundingClientRect();
                    resizeChangeHorizontal = event.clientX - this.cachedX + coord.left;
                    resizeChangeVertical = event.clientY - this.cachedY + coord.top;
                    this.guiWindow.style.left = resizeChangeHorizontal + "px";
                    this.guiWindow.style.top = resizeChangeVertical + "px";
                    coord = this.guiWindow.getBoundingClientRect();
                    if (coord.top < 0) {
                        this.guiWindow.style.top = 0 + "px";
                        this.cachedX = event.clientX;
                        this.setWindowY(0);
                    } else {
                        this.cachedX = event.clientX;
                        this.cachedY = event.clientY;
                    }
                    this.checkForEnterCorners(event);
                    this.checkForLeaveCorners(event);
                }
            }.bind(this));
        }
    }, {
        key: "checkForEnterCorners",
        value: function checkForEnterCorners(event) {
            if (!this.isAtTop && this.getWindowY() <= 0) {
                if (this.getWindowX() > 10 && this.getWindowX() + this.getWidth() < document.body.clientWidth - 10) {
                    this.isAtTop = true;
                    this.toggleWindowSnapVisualEffects("top");
                }
            }
            if (!this.isMaximized) {
                if (!this.isAtLeft && this.getWindowX() < 10) {
                    this.isAtLeft = true;
                    this.toggleWindowSnapVisualEffects("left");
                }
                if (!this.isAtRight && this.getWindowX() + this.getWidth() > document.body.clientWidth - 10) {
                    this.isAtRight = true;
                    this.toggleWindowSnapVisualEffects("right");
                }
            }
        }
    }, {
        key: "checkForLeaveCorners",
        value: function checkForLeaveCorners() {
            if (this.isAtTop) {
                if (this.getWindowY() >= 10 || this.getWindowX() < 10 || this.getWindowX() + this.getWidth() > document.body.clientWidth - 10) {
                    this.isAtTop = false;
                    this.leaveCornerAction("top");
                }
            }
            if (this.isAtLeft) {
                if (this.getWindowX() > 10) {
                    this.isAtLeft = false;
                    this.leaveCornerAction("left");
                }
            }
            if (this.isAtRight) {
                if (this.getWindowX() + this.getWidth() < document.body.clientWidth - 10) {
                    this.isAtRight = false;
                    this.leaveCornerAction("right");
                }
            }
        }
    }, {
        key: "leaveCornerAction",
        value: function leaveCornerAction(indicator) {
            if (this.isSnapped) {
                this.snapWindow();
            }

            if (this.snapEffectsToggled) {
                this.toggleWindowSnapVisualEffects(indicator);
            }
        }
    }, {
        key: "toggleWindowSnapVisualEffects",
        value: function toggleWindowSnapVisualEffects(indicator) {
            desktop = SimpleJSGui.getDesktop().getDOMObject();
            visualEffectTop = desktop.querySelector(".gui-desktop__window-snap-indicator-top");
            visualEffectLeft = desktop.querySelector(".gui-desktop__window-snap-indicator-left");
            visualEffectRight = desktop.querySelector(".gui-desktop__window-snap-indicator-right");

            if (indicator == "top") {
                visualEffectTop.classList.toggle("window-snap-indicator-fade-in");
            }
            if (indicator == "left") {
                visualEffectLeft.classList.toggle("window-snap-indicator-fade-in");
            }
            if (indicator == "right") {
                visualEffectRight.classList.toggle("window-snap-indicator-fade-in");
            }

            checkTop = visualEffectTop.classList.contains("window-snap-indicator-fade-in");
            checkLeft = visualEffectLeft.classList.contains("window-snap-indicator-fade-in");
            checkRight = visualEffectRight.classList.contains("window-snap-indicator-fade-in");

            if (checkTop || checkLeft || checkRight) {
                this.snapEffectsToggled = true;
            } else {
                this.snapEffectsToggled = false;
            }
        }
    }, {
        key: "snapWindow",
        value: function snapWindow() {
            if (!this.isSnapped) {
                if (this.isAtTop && !this.isMaximized) {
                    this.maximizeWindow();
                    this.isSnapped = true;
                } else if (this.isAtLeft) {
                    this.cachedWidth = this.getWidth();
                    this.cachedHeight = this.getHeight();
                    this.cachedXBeforeSnap = 0;
                    this.guiWindow.style.left = "0px";
                    this.guiWindow.style.top = "0px";
                    this.setWidth("50%");
                    this.setHeight(SimpleJSGui.getDesktop().getDesktopDOMObject().clientHeight);
                } else if (this.isAtRight) {
                    this.cachedWidth = this.getWidth();
                    this.cachedHeight = this.getHeight();
                    this.cachedXBeforeSnap = document.body.clientWidth - this.getWidth();
                    this.setWidth("50%");
                    this.setHeight(SimpleJSGui.getDesktop().getDesktopDOMObject().clientHeight);
                    temp = document.body.clientWidth - this.getWidth();
                    this.guiWindow.style.left = temp + "px";
                    this.guiWindow.style.top = "0px";
                }
                if (this.isAtTop && !this.isMaximized || this.isAtLeft || this.isAtRight) {
                    this.isSnapped = true;
                }
            } else {
                if (!this.isAtTop && this.isMaximized) {
                    this.maximizeWindow();
                } else if (!this.isAtLeft || !this.isAtRight) {
                    this.setWidth(this.cachedWidth);
                    this.setHeight(this.cachedHeight);
                    this.setWindowX(this.cachedXBeforeSnap);
                }
                this.isSnapped = false;
            }
        }
    }, {
        key: "maximizeWindow",
        value: function maximizeWindow() {
            if (this.isMaximized) {
                this.isMaximized = false;
                this.isSnapped = false;
                this.isAtTop = false;
                this.setWindowX(this.cachedXBeforeMax);
                if (!this.isBeingDragged) {
                    this.setWindowY(this.cachedYBeforeMax);
                }
                this.setWidth(this.cachedWidth);
                this.setHeight(this.cachedHeight);
            } else {
                this.cachedXBeforeMax = this.getWindowX();
                this.cachedYBeforeMax = this.getWindowY();
                this.cachedWidth = this.getWidth();
                this.cachedHeight = this.getHeight();
                this.guiWindow.style.left = "0";
                this.guiWindow.style.top = "0";
                this.setWidth("100%");
                this.setHeight(SimpleJSGui.getDesktop().getDesktopDOMObject().clientHeight);
                this.isMaximized = true;
            }
        }
    }, {
        key: "setResizeListenerFullHD",
        value: function setResizeListenerFullHD(newListener) {
            this.resizeListenerFullHD = newListener;
        }
    }, {
        key: "setResizeListenerHD",
        value: function setResizeListenerHD(newListener) {
            this.resizeListenerHD = newListener;
        }
    }, {
        key: "setResizeListenerVGA",
        value: function setResizeListenerVGA(newListener) {
            this.resizeListenerVGA = newListener;
        }
    }, {
        key: "setResizeListenerQVGA",
        value: function setResizeListenerQVGA(newListener) {
            this.resizeListenerQVGA = newListener;
        }
    }, {
        key: "removeDimensionFlags",
        value: function removeDimensionFlags() {
            this.guiWindow.classList.remove("gui-window--size-fullhd");
            this.guiWindow.classList.remove("gui-window--size-hd");
            this.guiWindow.classList.remove("gui-window--size-vga");
            this.guiWindow.classList.remove("gui-window--size-qvga");
        }
    }, {
        key: "applyNewDimensionFlags",
        value: function applyNewDimensionFlags(width) {
            if (width.indexOf("%") != -1) {
                width = width.substring(0, width.length - 1);
                width = window.innerWidth * (width / 100);
            }
            this.removeDimensionFlags();
            if (width >= 1920) {
                if (this.resizeListenerFullHD && !this.wasListenerFullHDCalled) {
                    this.resizeListenerFullHD();
                    this.wasListenerFullHDCalled = true;
                    this.wasListenerHDCalled = false;
                    this.wasListenerVGACalled = false;
                    this.wasListenerQVGACalled = false;
                }
                this.guiWindow.classList.add("gui-window--size-fullhd");
            } else if (width >= 1280) {
                if (this.resizeListenerHD && !this.wasListenerHDCalled) {
                    this.resizeListenerHD();
                    this.wasListenerHDCalled = true;
                    this.wasListenerFullHDCalled = false;
                    this.wasListenerVGACalled = false;
                    this.wasListenerQVGACalled = false;
                }
                this.guiWindow.classList.add("gui-window--size-hd");
            } else if (width >= 640) {
                if (this.resizeListenerVGA && !this.wasListenerVGACalled) {
                    this.resizeListenerVGA();
                    this.wasListenerVGACalled = true;
                    this.wasListenerFullHDCalled = false;
                    this.wasListenerHDCalled = false;
                    this.wasListenerQVGACalled = false;
                }
                this.guiWindow.classList.add("gui-window--size-vga");
            } else if (width < 640) {
                if (this.resizeListenerQVGA && !this.wasListenerQVGACalled) {
                    this.resizeListenerQVGA();
                    this.wasListenerQVGACalled = true;
                    this.wasListenerFullHDCalled = false;
                    this.wasListenerHDCalled = false;
                    this.wasListenerVGACalled = false;
                }
                this.guiWindow.classList.add("gui-window--size-qvga");
            }
        }
    }, {
        key: "unfocusAllWindows",
        value: function unfocusAllWindows() {
            allWindows = panelInstance.getWindows();
            for (i = 0; i < allWindows.length; i++) {
                aWindow = allWindows[i].getDOMObject().querySelector(".gui-window");
                if (!aWindow.classList.contains("window-effect-shade")) {
                    aWindow.classList.add("window-effect-shade");
                }
            }
        }
    }, {
        key: "focusWindow",
        value: function focusWindow() {
            this.unfocusAllWindows();
            this.guiWindow.classList.remove("window-effect-shade");
        }
    }, {
        key: "setWidth",
        value: function setWidth(width) {
            width = width + "";
            this.applyNewDimensionFlags(width);
            if (width.indexOf('%') != -1) {
                this.guiWindow.style.width = width;
            } else {
                this.guiWindow.style.width = width + "px";
            }
            this.calculateNewTitleLimits();
        }
    }, {
        key: "setHeight",
        value: function setHeight(height) {
            height = height + "";
            if (height.indexOf('%') != -1) {
                this.guiWindow.style.height = height;
            } else {
                this.guiWindow.style.height = height + "px";
            }
            this.calculateNewTitleLimits();
        }
    }, {
        key: "setBackgroundColor",
        value: function setBackgroundColor(bgrcolor) {
            this.guiWindow.querySelector(".gui-window__content").style.background = bgrcolor;
        }
    }, {
        key: "setTitle",
        value: function setTitle(title) {
            this.titleText = title;
            if (title.length > this.maxTitleLength) {
                title = title.substring(0, this.maxTitleLength - 3) + "...";
            }
            this.title.textContent = title;
            this.calculateNewTitleLimits();
            if (panelInstance.getPanelItem(this.id) != null) {
                panelInstance.getPanelItem(this.id).setTitle(title);
            }
        }
    }, {
        key: "calculateNewTitleLimits",
        value: function calculateNewTitleLimits() {
            width = this.getWidth();
            leftLimit = this.DOMObj.querySelector(".window-btn-maximize").getBoundingClientRect().right - this.getWindowX();
            rightLimit = this.getWidth() - (this.DOMObj.querySelector(".gui-window__titlebar__icon").getBoundingClientRect().left - this.getWindowX());
            appliableWidth = width - (leftLimit + rightLimit);
            numOfChars = Math.floor(appliableWidth / this.remInPixels);
            if (this.titleText.length > numOfChars) {
                if (this.titleText[numOfChars - 4] == " ") {
                    this.title.textContent = this.titleText.substring(0, numOfChars - 4) + "...";
                } else {
                    this.title.textContent = this.titleText.substring(0, numOfChars - 3) + "...";
                }
            } else {
                this.title.textContent = this.titleText;
            }
        }
    }, {
        key: "setWindowIcon",
        value: function setWindowIcon(path) {
            this.windowIcon.setAttribute("src", path);
            this.panelInstance.getPanelItem(this.id).setIcon(path);
        }
    }, {
        key: "setContent",
        value: function setContent(content) {
            if (content instanceof Object) {
                this.content = content;
                this.windowContent.appendChild(this.content);
                content.remove();
            } else if (!(content instanceof Object)) {
                this.content = content;
                this.windowContent.innerHTML = this.content;
            }
        }
    }, {
        key: "setWindowX",
        value: function setWindowX(x) {
            this.guiWindow.style.left = x + "px";
        }
    }, {
        key: "setWindowY",
        value: function setWindowY(y) {
            this.guiWindow.style.top = y + "px";
        }
    }, {
        key: "getWindowX",
        value: function getWindowX() {
            return Number(this.guiWindow.style.left.split("px")[0]);
        }
    }, {
        key: "getWindowY",
        value: function getWindowY() {
            return Number(this.guiWindow.style.top.split("px")[0]);
        }
    }, {
        key: "getWidth",
        value: function getWidth() {
            if (this.guiWindow.style.width.indexOf("%") != -1) {
                return document.body.clientWidth * (Number(this.guiWindow.style.width.split("%")[0]) / 100);
            } else {
                return Number(this.guiWindow.style.width.split("px")[0]);
            }
        }
    }, {
        key: "getHeight",
        value: function getHeight() {
            if (this.guiWindow.style.height.indexOf("%") != -1) {
                return document.body.clientHeight * (Number(this.guiWindow.style.height.split("%")[0]) / 100);
            } else {
                return Number(this.guiWindow.style.height.split("px")[0]);
            }
        }
    }, {
        key: "getBackgroundColor",
        value: function getBackgroundColor() {
            return this.guiWindow.querySelector(".gui-window__content").style.background;
        }
    }, {
        key: "getTitle",
        value: function getTitle() {
            return this.title.textContent;
        }
    }, {
        key: "getContent",
        value: function getContent() {
            return this.content;
        }
    }, {
        key: "isWindowPinnable",
        value: function isWindowPinnable() {
            return this.isPinnable;
        }
    }]);

    return Window;
}();

exports.default = Window;

/***/ })
/******/ ]);