import PanelItemContextMenu from './panel-item-contextmenu';

class PanelItem {
    constructor(newWindow, id, itemName) {
        this.itemWidth = 0;
        this.id = id;
        this.maxTitleLength = 18;
        this.withText = true;
        this.itemName = itemName;
        this.contextMenu = new PanelItemContextMenu(this);
        this.contextMenuContents = [];
        this.item = document.createElement("div");
        this.item.classList.add("gui-panel__task-bar__item");
        this.nameObj = document.createElement("p");
        if(this.itemName.length > this.maxTitleLength) {
            this.itemName = this.itemName.substring(0, (this.maxTitleLength-3)) + "...";
        }
        this.nameObj.textContent = this.itemName;
        this.itemIcon = document.createElement("img");
        this.itemIcon.classList.add("gui-panel__task-bar__item__icon");
        this.item.appendChild(this.itemIcon);
        this.item.appendChild(this.nameObj);
        this.item.appendChild(this.contextMenu.getDOMObject());
        this.changeMode();
        if(newWindow) {
            if(newWindow.isFocused) {
                this.item.classList.add("gui-panel__task-bar__item--active");
            }
            this.itemIcon.setAttribute("src", newWindow.windowIcon.getAttribute("src"));
            this.attachEvents(newWindow);
        }
    }
    
    attachToTaskBar(taskBar) {
        this.taskBar = taskBar;
    }
    
    attachEvents(newWindow) {
        let node = this;
        let nodeElem = this.getDOMObject();
        nodeElem.addEventListener('click', function(event) {
            // console.log("(click) event on a PanelItem...");
            let status = newWindow.getStatus();
            let dummyNode = event.target;
            let isContextMenu = false;
            while(dummyNode != document.body) {
                if(dummyNode == this.contextMenu.getDOMObject()) {
                    isContextMenu = true;
                    break;
                } else {
                    dummyNode = dummyNode.parentNode;
                }
            }
            if(status == "onscreen" && !isContextMenu) {
                nodeElem.classList.remove("gui-panel__task-bar__item--active");
                SimpleJSGui.getWindowManager().windowAction("minimize", newWindow);
                let contextMenu = nodeElem.querySelector(".gui-panel__task-bar__item__context-menu");
                if(contextMenu.style.display == "inline-block") {
                    contextMenu.style.display = "none";
                }
            } else if(status == "minimized") {
                nodeElem.classList.add("gui-panel__task-bar__item--active");
                SimpleJSGui.getWindowManager().windowAction("minimize", newWindow);
                let contextMenu = nodeElem.querySelector(".gui-panel__task-bar__item__context-menu");
                if(contextMenu.style.display == "inline-block") {
                    contextMenu.style.display = "none";
                }
            }
        }.bind(this));
        nodeElem.addEventListener('contextmenu', function(event) {
            event.preventDefault();
            let contextMenu = nodeElem.querySelector(".gui-panel__task-bar__item__context-menu");
            let items = this.taskBar.getItems();
            for(let i = 0; i < items.length; i++) {
                if(items[i].getID() != newWindow.getID()) {
                    let anItem = items[i].getDOMObject().querySelector(".gui-panel__task-bar__item__context-menu");
                    if(anItem.classList.contains("context-menu-fadein")) {
                        anItem.classList.remove("context-menu-fadein");
                    }
                }
            }
            this.taskBar.panelInstance.panelMenu.close();
            // if(contextMenu.style.display == "none") {
            //     contextMenu.style.display = "block";
            //     contextMenu.classList.add("context-menu-fadein");
            // } else {
            //     contextMenu.classList.remove("context-menu-fadein");
            //     contextMenu.style.display = "none";
            node.getContextMenu().setBottomY((window.innerHeight-this.item.getBoundingClientRect().top));
            contextMenu.classList.toggle("context-menu-fadein");
            let status = newWindow.getStatus();
            if(status == "minimized") {
                SimpleJSGui.getWindowManager().windowAction("minimize", newWindow);
            }
            return false;
        }.bind(this), false);
    }
    
    getItem() {
        return this.item;
    }
    getName() {
        return this.itemName;
    }
    getID() {
        return this.id;
    }
    getItem() {
        return this.item;
    }
    getItemDefaultWidth() {
        this.item.style.display = "block";
        document.body.appendChild(this.item);
        var width = window.getComputedStyle(this.item).getPropertyValue("width");
        document.body.removeChild(this.item);
        var value = width;
        value = value.substring(0, value.indexOf("px"));
        
        return Number(value);
    }
    
    getDOMObject() {
        return this.item;
    }
    
    getContextMenu() {
        return this.contextMenu;
    }
    
    getTitleObj() {
        return this.nameObj;
    }
    
    setTitle(newTitle) {
        this.itemName = newTitle;
        if(this.itemName.length > this.maxTitleLength) {
            this.itemName = this.itemName.substring(0, (this.maxTitleLength-3)) + "...";
        }
        this.nameObj.textContent = this.itemName;
    }
    
    setIcon(path) {
        this.itemIcon.setAttribute("src", path);
        // console.log("actual width: " +  this.itemIcon.clientWidth);
    }
    
    setContextMenuContents(newContents) {
        // console.log("setContextMenuContents starts with length of " + newContents.length);
        // console.log("a: " + this.contextMenuContents.length + ", b: " + newContents.length);
        if(this.contextMenuContents.length != 0) {
            let isSame = true;
            // console.log("a: " + this.contextMenuContents.length + ", b: " + newContents.length);
            if(this.contextMenuContents.length == newContents.length) {
                // console.log("Same size");
                for(let i = 0; i < newContents.length; i++) {
                    console.log("i: " + i + " a[]: " + this.contextMenuContents[i] + " b[]: " + newContents[i]);
                    if(this.contextMenuContents[i] !== newContents[i]) {
                        // console.log("Item mismatch!");
                        isSame = false;
                    }
                }
            } else {
                // console.log("Bigger size");
                isSame = false;
            }
            if(isSame) {
                // console.log("New contents of length " + newContents.length + " are the same as the old ones! Returning..");
                return;
            }
        }
        
        if(newContents.length == 0) {
            // console.log("New contents are of length 0. Returning..");
            return;
        }
        
        this.contextMenuContents = newContents.slice();
        this.contextMenu.clear();
        
        // console.log("Adding " + newContents.length + " new contents to the context menu..");
        for(let i = 0; i < this.contextMenuContents.length; i++) {
            // console.log("Contents: " + this.contextMenuContents[i]);
            if(this.contextMenuContents[i] != "Separator") {
                this.contextMenu.addAnItem(this.contextMenuContents[i].name, this.contextMenuContents[i].action);
            } else {
                this.contextMenu.addASeparator();
            }
        }
        
        // console.log("Exiting, length now at: " + this.contextMenuContents.length);
    }
    
    changeMode() {
        if(!this.withText) {
            this.nameObj.style.display = "none";
            this.item.classList.add("gui-panel__task-bar__item--without-text")
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
}

export default PanelItem;