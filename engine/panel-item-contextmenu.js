var PanelItemContextMenu = function() {
    this.DOMobj = "";
    this.menuContent = "";

    this.createAnEmptyContextMenu = function() {
        this.DOMobj = document.createElement("div");
        this.DOMobj.classList.add("gui-panel__item__context-menu");
        this.DOMobj.innerHTML = '<div class="gui-panel__item__context-menu__content"></div>';
        this.menuContent = this.DOMobj.querySelector(".gui-panel__item__context-menu__content");

        document.addEventListener('mousedown', function(event) {
            if(event.button == 0) {
                if(!event.target.classList.contains("gui-panel__item")) {
                    this.DOMobj.classList.remove("context-menu-fadein");
                }
            }
        }.bind(this));
    }

    this.getDOMObject = function() {
        return this.DOMobj;
    }

    this.addAnItem = function(itemName, elementListener) {
        newElement = document.createElement("p");
        newElement.classList.add("gui-panel__item__context-menu__content__menu-item");
        newElement.textContent = itemName;
        newElement.addEventListener('mousedown', function() {
            elementListener();
            this.DOMobj.classList.toggle("context-menu-fadein");
        }.bind(this));
        if(this.menuContent.length == 0) {
            this.menuContent.appendChild(newElement);
        } else {
            this.menuContent.insertBefore(newElement, this.menuContent.querySelector("*"));
        }

        return this;
    }

    this.addASeparator = function() {
        newElement = document.createElement("div");
        newElement.classList.add("gui-panel__item__context-menu__content__item-separator");
        if(this.menuContent.length == 0) {
            console.log("Didn't append the separator because the content of the menu is empty.");
        } else {
            this.menuContent.insertBefore(newElement, this.menuContent.querySelector("p"));
        }

        return this;
    }

    this.createAnEmptyContextMenu();
}