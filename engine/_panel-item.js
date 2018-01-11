var PanelItem = function(id, itemName) {
    this.id = id;
    this.itemName = itemName;
    this.getName = function() {
        return this.itemName;
    }
    this.getTemplate = function() {
        var node = document.createElement("div");
        node.classList.add("gui-panel__item");
        node.appendChild(document.createTextNode(this.itemName));
        return node;
    }
}