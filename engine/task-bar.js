var FreeSpaceWidget = function(taskBar) {
    this.DOMObj;
    this.taskBar = taskBar;
    
    this.initialize = function() {
        this.DOMObj = document.createElement("div");
        
        this.DOMObj.classList.add("gui-panel__task-bar__free-space");
    }
    
    this.getDOMObject = function() {
        return this.DOMObj;
    }
    
    this.getWidth = function() {
        return this.DOMObj.clientWidth;
    }
    
    this.calculateWidth = function(panel, leftContainer, rightContainer) {
        var panelWidth = panel.clientWidth;
        var leftContainerWidth = leftContainer.clientWidth;
        var rightContainerWidth = rightContainer.clientWidth;
        // console.log("panel " + panelWidth);
        // console.log("left " + leftContainerWidth);
        // console.log("right " + rightContainerWidth);
        switcherWidth = 0;
        if(this.taskBar && this.taskBar.getLineContainer() && this.taskBar.getLineSwitcher()) {
            switcherWidth = this.taskBar.getLineSwitcher().getDOMObject().clientWidth;
        }
        var width = panelWidth-((leftContainerWidth-this.DOMObj.clientWidth)+rightContainerWidth);
        // console.log("width is at: " + width + "px");
        if(width > 0) {
            this.DOMObj.style.width = width+"px";
        } else {
            this.DOMObj.style.width = "0px";
            
            width = panelWidth - (rightContainerWidth + (leftContainerWidth-this.taskBar.getLineContainer().getDOMObject().clientWidth));
            this.taskBar.getLineContainer().getDOMObject().style.width = width+"px";
        }
    }
    
    this.initialize();
}

var LineSwitcher = function(taskBar) {
    this.taskBar = taskBar;
    
    this.initialize = function() {
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
    
    this.getDOMObject = function() {
        return this.DOMObj;
    }
    
    this.setCurrentLineText = function(text) {
        this.currentLevel.textContent = text;
    }
    
    this.initialize();
}

var LineContainer = function(taskBar) {
    this.taskBar = taskBar;
    this.lines = [];
    this.currentLine = 0;
    
    this.initialize = function() {
        this.wrapper = document.createElement("div");
        this.wrapper.classList.add("gui-panel__task-bar__wrapper");
        
        this.DOMObj = document.createElement("div");
        this.DOMObj.classList.add("gui-panel__task-bar__wrapper__line-container");
        
        this.wrapper.appendChild(this.DOMObj);
    }
    
    this.addALine = function(line) {
        this.lines.push(line);
        this.DOMObj.appendChild(line.getDOMObject());
    }
    
    this.empty = function() {
        for(i = 0; i < this.lines.length; i++) {
            this.DOMObj.removeChild(this.DOMObj.firstChild);
        }
        
        this.lines = [];
    }
    
    this.getLines = function() {
        return this.lines;
    }
    
    this.getCurrentLine = function() {
        return this.currentLine;
    }
    
    this.switchLine = function(newLine) {
        this.currentLine = newLine;
        // console.log("currentLine is now: " + newLine);
        // console.log("Line height of first line is: " + this.lines[0].getLineHeight());
        // console.log("New top is: " + -(newLine)*this.lines[0].getLineHeight());
        this.taskBar.getLineSwitcher().setCurrentLineText(newLine+1);
        this.DOMObj.style.top = -(newLine)*this.lines[0].getLineHeight()+"px";
    }
    
    this.getWrapperDOM = function() {
        return this.wrapper;
    }
    
    this.getDOMObject = function() {
        return this.DOMObj;
    }
    
    this.initialize();
}

var Line = function(taskBar) {
    this.taskBar = taskBar;
    this.items = [];
    this.height = 0;
    
    this.initialize = function() {
        this.DOMObj = document.createElement("div");
        this.DOMObj.classList.add("gui-panel__task-bar__wrapper__line-container__line");
        height = window.getComputedStyle(this.DOMObj).getPropertyValue("height");
        this.height = Number(height.substring(0, height.indexOf("px")));
    }
    
    this.putAnItem = function(item) {
        this.items.push(item);
        this.DOMObj.appendChild(item.getItem());
    }
    
    this.getDOMObject = function() {
        return this.DOMObj;
    }
    
    this.getLineHeight = function() {
        return this.height;
    }
    
    this.initialize();
}

var TaskBar = function() {
    this.DOMObj;
    this.mode = "icons text";
    this.items = [];
    this.panel = document.querySelector(".gui-panel");
    this.leftContainer = document.querySelector(".gui-panel__left-container");
    this.rightContainer = document.querySelector(".gui-panel__right-container");
    
    this.lineContainer = new LineContainer(this);
    this.lineContainer.addALine(new Line(this));
    
    this.lineSwitcher = new LineSwitcher(this);
    
    this.initialize = function() {
        this.DOMObj = document.createElement("div");
        this.DOMObj.classList.add("gui-panel__task-bar");
        this.DOMObj.appendChild(this.lineContainer.getWrapperDOM());
        this.DOMObj.appendChild(this.lineSwitcher.getDOMObject());
        this.freeSpaceWidget = new FreeSpaceWidget(this);
        this.DOMObj.appendChild(this.freeSpaceWidget.getDOMObject());
        this.calculateFreeSpace();
        
        window.addEventListener('resize', function() {
            this.calculateFreeSpace();
        }.bind(this));
    }
    
    this.getDOMObject = function() {
        return this.DOMObj;
    }
    
    this.getLineContainer = function() {
        return this.lineContainer;
    }
    
    this.getLineSwitcher = function() {
        return this.lineSwitcher;
    }
    
    this.addAnItem = function(newItem) {
        this.items.push(newItem);
        this.lineContainer.getLines()[0].putAnItem(newItem);
        this.freeSpaceWidget.getDOMObject().style.width = "0px";
        this.calculateFreeSpace();
    }
    
    this.getItems = function() {
        return this.items;
    }
    
    this.rearrangeItems = function() {
        if(this.items.length > 0) {
            // console.log("Rearranging items...");
            var itemsInALine = Math.floor((this.DOMObj.clientWidth-this.lineSwitcher.getDOMObject().clientWidth) / this.items[0].getItemDefaultWidth());
            if(itemsInALine == 0) {
                itemsInALine = 1;
            }
            numOfItems = itemsInALine;
            shouldEmptyLineContainer = false;
            if(this.cachedNumOfItems != numOfItems) {
                shouldEmptyLineContainer = true;
            }
            this.cachedNumOfItems = numOfItems;
            if(this.items.length < itemsInALine) {
                numOfItems = this.items.length;
            }
            // console.log("items: " + numOfItems);
            amount = (numOfItems*this.items[0].getItemDefaultWidth());
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
                
                for(i = 0; i < numOfLines; i++) {
                    this.lineContainer.addALine(new Line(this));
                    newLine = this.lines[this.lines.length-1];
                }
                
                // console.log(this.lines.length);
                
                for(i = 0, j = 0, ij = 0; i < this.items.length; i++, ij++) {
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
    
    this.calculateFreeSpace = function() {
        this.freeSpaceWidget.calculateWidth(this.panel, this.leftContainer, this.rightContainer);
        this.rearrangeItems();
        // if(this.freeSpaceWidget.getWidth() <= 0) {
        //     this.rearrangeItems();
        // }
    }
    
    this.initialize();
}