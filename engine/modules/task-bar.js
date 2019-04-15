class FreeSpaceWidget {
    constructor(taskBar) {
        this.taskBar = taskBar;
        this.DOMObj = document.createElement("div");
        this.DOMObj.classList.add("gui-panel__task-bar__free-space");
    }
    
    getDOMObject() {
        return this.DOMObj;
    }
    
    getWidth() {
        return this.DOMObj.clientWidth;
    }
    
    calculateWidth(panel, leftContainer, rightContainer) {
        let panelWidth = panel.clientWidth;
        let leftContainerWidth = leftContainer.offsetWidth;
        let rightContainerWidth = rightContainer.offsetWidth;
        // console.log("panel " + panelWidth);
        // console.log("left " + leftContainerWidth);
        // console.log("right " + rightContainerWidth);
        let switcherWidth = 0;
        if(this.taskBar && this.taskBar.getLineContainer() && this.taskBar.getLineSwitcher()) {
            switcherWidth = this.taskBar.getLineSwitcher().getDOMObject().clientWidth;
        }
        let width = panelWidth-((leftContainerWidth-this.DOMObj.clientWidth)+rightContainerWidth);

        // console.log("width is at: " + width + "px");
        if(width > 0) {
            this.DOMObj.style.width = width+"px";
        } else {
            this.DOMObj.style.width = "0px";
            
            width = panelWidth - (rightContainerWidth + (leftContainerWidth-this.taskBar.getLineContainer().getDOMObject().clientWidth));
            this.taskBar.getLineContainer().getDOMObject().style.width = width+"px";
        }
    }
}

class LineSwitcher {
    constructor(taskBar) {
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
        
        this.moveDown.addEventListener("click", function() {
            let currentLine = this.taskBar.getLineContainer().getCurrentLine();
            // console.log("Going down, line is " + currentLine);
            if(currentLine > 0) {
                currentLine -= 1;
                this.taskBar.getLineContainer().switchLine(currentLine);
                // console.log("Line Down! #" + currentLine);
            }
        }.bind(this));
        
        this.moveUp.addEventListener("click", function() {
            let currentLine = this.taskBar.getLineContainer().getCurrentLine();
            // console.log("Going up, line is " + currentLine + " of " + this.taskBar.getLineContainer().getLines().length);
            if(currentLine < this.taskBar.getLineContainer().getLines().length-1) {
                currentLine += 1;
                this.taskBar.getLineContainer().switchLine(currentLine);
                // console.log("Line Up! #" + currentLine);
            }
        }.bind(this));
        
        this.DOMObj.appendChild(this.moveDown);
        this.DOMObj.appendChild(this.currentLevel);
        this.DOMObj.appendChild(this.moveUp);
    }
    
    getDOMObject() {
        return this.DOMObj;
    }
    
    setCurrentLineText(text) {
        this.currentLevel.textContent = text;
    }
}

class LineContainer {
    constructor(taskBar) {
        this.taskBar = taskBar;
        this.lines = [];
        this.currentLine = 0;
        this.wrapper = document.createElement("div");
        this.wrapper.classList.add("gui-panel__task-bar__wrapper");
        
        this.DOMObj = document.createElement("div");
        this.DOMObj.classList.add("gui-panel__task-bar__wrapper__line-container");
        
        this.wrapper.appendChild(this.DOMObj);
    }
    
    addALine(line) {
        this.lines.push(line);
        this.DOMObj.appendChild(line.getDOMObject());
    }
    
    empty() {
        for(let i = 0; i < this.lines.length; i++) {
            this.DOMObj.removeChild(this.DOMObj.firstChild);
        }
        
        this.lines = [];
    }
    
    getLines() {
        return this.lines;
    }
    
    getCurrentLine() {
        return this.currentLine;
    }
    
    switchLine(newLine, shouldDisableEffect) {
        this.currentLine = newLine;
        // console.log("currentLine is now: " + newLine);
        // console.log("Line height of first line is: " + this.lines[0].getLineHeight());
        // console.log("New top is: " + -(newLine)*this.lines[0].getLineHeight());
        this.taskBar.getLineSwitcher().setCurrentLineText(newLine+1);
        if(shouldDisableEffect) {
            this.cachedStyle = this.DOMObj.style;
            this.DOMObj.style.transition = "top ease-out 0s";
        } else {
            if(this.DOMObj.style.transition) {
                let style = this.DOMObj.getAttribute("style");
                this.DOMObj.setAttribute("style", style.substring(0, style.indexOf("transition")));
            }         
        }
        this.DOMObj.style.top = -(newLine)*this.lines[0].getLineHeight()+"px";
    }
    
    getWrapperDOM() {
        return this.wrapper;
    }
    
    getDOMObject() {
        return this.DOMObj;
    }
}

class Line {
    constructor(taskBar) {
        this.taskBar = taskBar;
        this.items = [];
        this.height = 0;
        this.DOMObj = document.createElement("div");
        this.DOMObj.classList.add("gui-panel__task-bar__wrapper__line-container__line");
    }
    
    putAnItem(item) {
        this.items.push(item);
        this.DOMObj.appendChild(item.getItem());
    }
    
    getDOMObject() {
        return this.DOMObj;
    }
    
    getLineHeight() {
        this.height = window.getComputedStyle(this.DOMObj).getPropertyValue("height");
        this.height = Number(this.height.substring(0, this.height.indexOf("px")));
        return this.height;
    }
    getItems() {
        return this.items;
    }
}

class TaskBar {
    constructor() {
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
        
        SimpleJSGui.getWindowManager().registerWindowListDisplay(this);
        
        window.addEventListener('resize', function() {
            this.calculateFreeSpace();
        }.bind(this));
    }
    
    getDOMObject() {
        return this.DOMObj;
    }
    
    getLineContainer() {
        return this.lineContainer;
    }
    
    getLineSwitcher() {
        return this.lineSwitcher;
    }
    
    attachToPanel(panel) {
        this.panelInstance = panel;
    }
    
    notifyListChanged() {
        // console.log("notifyListChanged enters...");
        this.windows = SimpleJSGui.getWindowManager().getWindows();
        // console.log("Number of windows: " + this.windows.length + " and number of items: " + this.items.length);
        
        for(let i = 0; i < this.items.length; i++) {
            let isAbsent = true;
            if(this.windows.length != 0) {
                for(let j = 0; j < this.windows.length; j++) {
                    // console.log(i + " | " + j);
                    // console.log(this.items[i].id + " | " + this.windows[j].id);
                    if(this.items[i].id == this.windows[j].id) {
                        // console.log("Matches!");
                        isAbsent = false;
                    }
                }
            }
            
            
            if(isAbsent) {
                // console.log("Item #" + i + " is absent!");
                this.items[i].getDOMObject().remove();
                this.items.splice(i, 1);
            }
        }

        if(this.windows.length == 0) {
            return;
        }

        for(let j = 0; j < this.items.length; j++) {
            for(let i = 0; i < this.windows.length; i++) {
                if(this.items[j].id == this.windows[i].id) {
                    // console.log("Updating a panel item!");
                    this.items[j].setTitle(this.windows[i].getTitle());
                    this.items[j].setIcon(this.windows[i].windowIcon.getAttribute("src"));
                    if(this.windows[i].getContextMenuContents().length != 0) {
                        this.items[j].setContextMenuContents(this.windows[i].getContextMenuContents());
                    }
                    let itemDOMObj = this.items[j].getDOMObject();
                    if(this.windows[i].isFocused) {
                        if(!itemDOMObj.classList.contains("gui-panel__task-bar__item--active")) {
                            itemDOMObj.classList.add("gui-panel__task-bar__item--active");
                        }
                    } else {
                        if(itemDOMObj.classList.contains("gui-panel__task-bar__item--active")) {
                            itemDOMObj.classList.remove("gui-panel__task-bar__item--active");
                        }
                    }
                    break;
                }
            }
        }
        
        let newWindowsArr = [];
        for(let j = 0; j < this.windows.length; j++) {
            let alreadyKnown = false;
            for(let i = 0; i < this.items.length; i++) {
                if(this.windows[j].id == this.items[i].id) {
                    alreadyKnown = true;
                    break;
                }
            }
            if(!alreadyKnown) {
                newWindowsArr.push(this.windows[j]);
            }
        }
        
        
        newWindowsArr.forEach(function(elem) {
            // console.log("Adding a window!");
            this.addAnItem(elem);
        }.bind(this));
    }
    
    addAnItem(newWindow) {
        let node = new PanelItem(newWindow, newWindow.getID(), newWindow.getTitle());
        node.attachToTaskBar(this);
        this.items.push(node);
        newWindow.focusWindow();
        this.lineContainer.getLines()[0].putAnItem(node);
        this.freeSpaceWidget.getDOMObject().style.width = "0px";
        this.calculateFreeSpace();
    }
    
    getItems() {
        return this.items;
    }
    
    rearrangeItems() {
        // console.log("rearrangeItmes enters...");
        if(this.items.length > 0) {
            // console.log("Rearranging items...");
            let dummyPanelItem = new PanelItem(null, "Dummy ID", "Dummy item");
            let itemsInALine = Math.floor((this.DOMObj.clientWidth-this.lineSwitcher.getDOMObject().clientWidth) / dummyPanelItem.getItemDefaultWidth());
            // console.log("itemsInALine: " + itemsInALine);
            if(itemsInALine == 0) {
                itemsInALine = 1;
            }
            let numOfItems = itemsInALine;
            let shouldEmptyLineContainer = false;
            if(this.cachedNumOfItems != numOfItems || (this.lineContainer.getLines().length == 1 && numOfItems < this.items.length) || (this.lineContainer.getLines().length > 1)) {
                shouldEmptyLineContainer = true;
            }
            this.cachedNumOfItems = numOfItems;
            if(this.items.length < itemsInALine) {
                numOfItems = this.items.length;
            }
            // console.log("items: " + numOfItems);
            let amount = (numOfItems*dummyPanelItem.getItemDefaultWidth());
            this.lineContainer.getDOMObject().style.width = amount + "px";
            let reduce = this.freeSpaceWidget.getDOMObject().clientWidth - amount;
            this.freeSpaceWidget.getDOMObject().style.width = 0 + "px";
            this.freeSpaceWidget.calculateWidth(this.panel, this.leftContainer, this.rightContainer);
            if(this.freeSpaceWidget.getWidth() <= 0) {
                numOfItems--;
            }
            // console.log("width is at: " + this.DOMObj.clientWidth);
            // console.log("panel is at: " + this.panel.clientWidth + ", and right is at: " + this.rightContainer.clientWidth);
            let numOfLines = Math.floor(this.items.length / numOfItems);
            if(this.items.length % numOfItems != 0) {
                numOfLines++;
            }
            
            if(!numOfLines || numOfLines == Infinity) {
                numOfLines = 0;
                shouldEmptyLineContainer = false;
            }
            
            if(numOfLines <= 1) {
                this.lineSwitcher.getDOMObject().style.visibility = "hidden";
            } else {
                this.lineSwitcher.getDOMObject().style.visibility = "visible";
            }
            
            if(this.lineContainer.getCurrentLine() != 0 && numOfLines != this.cachedNumOfLines) {
                if(numOfLines < this.cachedNumOfLines) {
                    this.lineContainer.switchLine(numOfLines-((numOfLines+1)-this.lineContainer.getCurrentLine()));
                }    
            }
            
            this.cachedCurrentLine = this.lineContainer.getLines()[this.lineContainer.getCurrentLine()];
            this.cachedNumOfItemsInCurrentLine = this.cachedCurrentLine.getItems().length;

            // console.log("length: " + this.items.length);
            // console.log("inaline: " + itemsInALine);
            // console.log("numOfLines: " + numOfLines);
            
            if(shouldEmptyLineContainer) {
                // console.log("shouldEmptyLineContainer!");
                this.lineContainer.empty();
                this.lines = this.lineContainer.getLines();
                
                // console.log("this.lines.length: " + this.lines.length);
                // console.log("numOfLines: " + numOfLines);
                for(let i = 0; i < numOfLines; i++) {
                    this.lineContainer.addALine(new Line(this));
                    // let newLine = this.lines[this.lines.length-1];
                }
                
                // console.log(this.lines.length);
                // console.log("this.items.length: " + this.items.length);

                for(let i = 0, j = 0, ij = 0; i < this.items.length; i++, ij++) {
                    if(ij >= itemsInALine) {
                        j++;
                        ij = 0;
                    }
                    // console.log("Line is: " + j + " and item is: " + i);
                    
                    // console.log(this.items[i]);
                    // console.log("Putting an item into a line!");
                    this.lines[j].putAnItem(this.items[i]);
                }
                
                this.freeSpaceWidget.calculateWidth(this.panel, this.leftContainer, this.rightContainer);
            }

            if(numOfLines > this.cachedNumOfLines) {
                if(this.cachedNumOfItemsInCurrentLine == 1) {
                    this.lineContainer.switchLine(this.lineContainer.getCurrentLine()+1, true);
                }
            }
            this.cachedNumOfLines = numOfLines;
            // console.log("Num of lines: " + this.lines.length);
            // console.log("Done rearranging!");
            // console.log(" ");
        }
    }
    
    calculateFreeSpace() {
        // console.log("calculateFreeSpace enters...");
        this.freeSpaceWidget.calculateWidth(this.panel, this.leftContainer, this.rightContainer);
        this.rearrangeItems();
        // if(this.freeSpaceWidget.getWidth() <= 0) {
        //     this.rearrangeItems();
        // }
    }
}

export default TaskBar;