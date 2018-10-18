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
        let leftContainerWidth = leftContainer.clientWidth;
        let rightContainerWidth = rightContainer.clientWidth;
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
            currentLine = this.taskBar.getLineContainer().getCurrentLine();
            // console.log("Going down, line is " + currentLine);
            if(currentLine > 0) {
                currentLine -= 1;
                this.taskBar.getLineContainer().switchLine(currentLine);
                // console.log("Line Down! #" + currentLine);
            }
        }.bind(this));
        
        this.moveUp.addEventListener("click", function() {
            currentLine = this.taskBar.getLineContainer().getCurrentLine();
            // console.log("Going up, line is " + currentLine + " " + this.taskBar.getLineContainer().getLines().length);
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
    
    switchLine(newLine) {
        this.currentLine = newLine;
        // console.log("currentLine is now: " + newLine);
        // console.log("Line height of first line is: " + this.lines[0].getLineHeight());
        // console.log("New top is: " + -(newLine)*this.lines[0].getLineHeight());
        this.taskBar.getLineSwitcher().setCurrentLineText(newLine+1);
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
        let height = window.getComputedStyle(this.DOMObj).getPropertyValue("height");
        this.height = Number(height.substring(0, height.indexOf("px")));
    }
    
    putAnItem(item) {
        this.items.push(item);
        this.DOMObj.appendChild(item.getItem());
    }
    
    getDOMObject() {
        return this.DOMObj;
    }
    
    getLineHeight() {
        return this.height;
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
        this.windows = SimpleJSGui.getWindowManager().getWindows();
        this.items.forEach(function(elem) {
            elem.getDOMObject().remove();
        });
        this.items = [];
        this.windows.forEach(function(elem) {
            this.addAnItem(elem);
        }.bind(this));
    }
    
    addAnItem(window) {
        let node = new PanelItem(window, window.getID(), window.getTitle());
        this.items.push(node);
        this.lineContainer.getLines()[0].putAnItem(node);
        this.freeSpaceWidget.getDOMObject().style.width = "0px";
        this.calculateFreeSpace();
    }
    
    getItems() {
        return this.items;
    }
    
    rearrangeItems() {
        if(this.items.length > 0) {
            // console.log("Rearranging items...");
            let itemsInALine = Math.floor((this.DOMObj.clientWidth-this.lineSwitcher.getDOMObject().clientWidth) / this.items[0].getItemDefaultWidth());
            if(itemsInALine == 0) {
                itemsInALine = 1;
            }
            let numOfItems = itemsInALine;
            let shouldEmptyLineContainer = false;
            if(this.cachedNumOfItems != numOfItems) {
                shouldEmptyLineContainer = true;
            }
            this.cachedNumOfItems = numOfItems;
            if(this.items.length < itemsInALine) {
                numOfItems = this.items.length;
            }
            // console.log("items: " + numOfItems);
            let amount = (numOfItems*this.items[0].getItemDefaultWidth());
            this.lineContainer.getDOMObject().style.width = amount + "px";
            let reduce = this.freeSpaceWidget.getDOMObject().clientWidth - amount;
            this.freeSpaceWidget.getDOMObject().style.width = 0 + "px";
            this.freeSpaceWidget.calculateWidth(this.panel, this.leftContainer, this.rightContainer);
            // if(this.freeSpaceWidget.getWidth() <= 0) {
            //     itemsInALine--;
            // }
            // console.log("width is at: " + this.DOMObj.clientWidth);
            // console.log("panel is at: " + this.panel.clientWidth + ", and right is at: " + this.rightContainer.clientWidth);
            let numOfLines = Math.floor(this.items.length / itemsInALine);
            if(this.items.length % itemsInALine != 0) {
                numOfLines++;
            }
            
            if(!numOfLines) {
                numOfLines = 0;
            }
            
            if(numOfLines <= 1) {
                this.lineSwitcher.getDOMObject().style.visibility = "hidden";
            } else {
                this.lineSwitcher.getDOMObject().style.visibility = "visible";
            }
            
            if(this.lineContainer.getCurrentLine() > numOfLines-1) {
                this.lineContainer.switchLine(numOfLines-1);
            }
            
            // console.log("length: " + this.items.length);
            // console.log("inaline: " + itemsInALine);
            // console.log("numOfLines: " + numOfLines);
            // console.log("lines: " + numOfLines);
            
            if(shouldEmptyLineContainer) {
                this.lineContainer.empty();
                this.lines = this.lineContainer.getLines();
                
                // console.log(this.lines.length);
                
                for(let i = 0; i < numOfLines; i++) {
                    this.lineContainer.addALine(new Line(this));
                    // newLine = this.lines[this.lines.length-1];
                }
                
                // console.log(this.lines.length);
                
                for(let i = 0, j = 0, ij = 0; i < this.items.length; i++, ij++) {
                    if(ij >= itemsInALine) {
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
    
    calculateFreeSpace() {
        this.freeSpaceWidget.calculateWidth(this.panel, this.leftContainer, this.rightContainer);
        this.rearrangeItems();
        // if(this.freeSpaceWidget.getWidth() <= 0) {
        //     this.rearrangeItems();
        // }
    }
}

export default TaskBar;