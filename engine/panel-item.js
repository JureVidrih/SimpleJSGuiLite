var PanelItem = function(id, itemName) {
    this.item;
    this.wrapper;
    this.id = id;
    this.itemName = itemName;
    this.nameObj;
    this.contextMenu = new PanelItemContextMenu();
    this.getName = function() {
        return this.itemName;
    }
    this.getId = function() {
        return this.id;
    }
    this.getItem = function() {
        return this.item;
    }
    this.getTemplate = function() {
        this.wrapper = document.createElement("div");
        this.wrapper.classList.add("gui-panel__item-wrapper");
        this.item = document.createElement("div");
        this.item.classList.add("gui-panel__item");
        this.nameObj = document.createElement("p");
        this.nameObj.textContent = this.itemName;
        this.item.appendChild(this.nameObj);
        this.wrapper.appendChild(this.item);
        this.wrapper.appendChild(this.contextMenu.getDOMObject());
        return this.wrapper;
    }

    this.getDOMObject = function() {
        return this.wrapper;
    }

    this.getContextMenu = function() {
        return this.contextMenu;
    }

    this.getTitleObj = function() {
        return this.nameObj;
    }

    this.setTitle = function(newtitle) {
        this.itemName = newtitle;
        this.nameObj.textContent = this.itemName;
    }
}