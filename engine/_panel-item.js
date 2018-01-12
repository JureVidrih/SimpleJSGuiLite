var PanelItem = function(id, itemName) {
    this.id = id;
    this.itemName = itemName;
    this.getName = function() {
        return this.itemName;
    }
    this.getId = function() {
        return this.id;
    }
    this.getTemplate = function() {
        var node = document.createElement("div");
        node.classList.add("gui-panel__item");
        this.nameObj = document.createTextNode(this.itemName);
        node.appendChild(this.nameObj);
        return node;
    }
    this.setTitle = function(newtitle) {
        this.itemName = newtitle;
        this.nameObj.textContent = this.itemName;
    }
}