var PanelItem = function(id, itemName) {
    this.item;
    this.id = id;
    this.itemName = itemName;
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
        this.item = document.createElement("div");
        this.item.classList.add("gui-panel__item");
        this.nameObj = document.createTextNode(this.itemName);
        this.item.appendChild(this.nameObj);
        return this.item;
    }
    this.setTitle = function(newtitle) {
        this.itemName = newtitle;
        this.nameObj.textContent = this.itemName;
    }
}