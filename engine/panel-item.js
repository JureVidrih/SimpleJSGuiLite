var PanelItem = function(id, itemName) {
    this.item;
    this.id = id;
    this.itemName = itemName;
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
        this.item = document.createElement("div");
        this.item.classList.add("gui-panel__item");
        this.nameObj = document.createElement("p");
        this.nameObj.textContent = this.itemName;
        this.item.appendChild(this.nameObj);
        this.item.appendChild(this.contextMenu.getDOMObject());
        this.contextMenu.addAnItem("Spremeni ozadje", function() {
            document.body.style.backgroundColor = "pink";
        });
        this.contextMenu.addASeparator();
        this.contextMenu.addAnItem("Spremeni ozadje v rumeno barvo", function() {
            document.body.style.backgroundColor = "yellow";
        });
        return this.item;
    }
    this.setTitle = function(newtitle) {
        this.itemName = newtitle;
        this.nameObj.textContent = this.itemName;
    }
}