var PanelItem = function(id, itemName) {
    this.item;
    this.itemWidth = 0;
    this.id = id;
    this.maxTitleLength = 25;
    this.withText = true;
    this.itemName = itemName;
    this.nameObj;
    this.contextMenu = new PanelItemContextMenu(this);
    this.getName = function() {
        return this.itemName;
    }
    this.getId = function() {
        return this.id;
    }
    this.getItem = function() {
        return this.item;
    }
    this.getItemDefaultWidth = function() {
        var width = window.getComputedStyle(this.item).getPropertyValue("width");
        var value = width;
        value = value.substring(0, value.indexOf("px"));

        return Number(value);
    }
    this.initialize = function() {
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
        return this.item;
    }

    this.getDOMObject = function() {
        return this.item;
    }

    this.getContextMenu = function() {
        return this.contextMenu;
    }

    this.getTitleObj = function() {
        return this.nameObj;
    }

    this.setTitle = function(newtitle) {
        this.itemName = newtitle;
        if(this.itemName.length > this.maxTitleLength) {
            this.itemName = this.itemName.substring(0, (this.maxTitleLength-3)) + "...";
        }
        this.nameObj.textContent = this.itemName;
    }

    this.setIcon = function(path) {
        this.itemIcon.setAttribute("src", path);
        // console.log("actual width: " +  this.itemIcon.clientWidth);
    }

    this.changeMode = function() {
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

    this.initialize();
}