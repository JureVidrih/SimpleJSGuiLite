class PanelItemContextMenu {
    constructor(panelItem) {
        this.panelITem = panelItem;
        this.DOMObj = document.createElement("div");
        this.DOMObj.classList.add("gui-panel__task-bar__item__context-menu");
        this.DOMObj.innerHTML = '<div class="gui-panel__task-bar__item__context-menu__content"></div>';
        this.menuContent = this.DOMObj.querySelector(".gui-panel__task-bar__item__context-menu__content");
        this.emptyContextMenuMsg = document.createElement("p");
        this.emptyContextMenuMsg.classList.add("gui-panel__task-bar__item__context-menu__empty-message");
        this.emptyContextMenuMsg.textContent = "Context menu is empty.";
        this.DOMObj.appendChild(this.emptyContextMenuMsg);

        document.addEventListener('mousedown', function(event) {
            if(event.button == 0) {
                if(!event.target.classList.contains("gui-panel__task-bar__item")) {
                    this.DOMObj.classList.remove("context-menu-fadein");
                }
            }
        }.bind(this));
    }

    getDOMObject() {
        return this.DOMObj;
    }

    setBottomY(newY) {
        this.DOMObj.style.bottom = newY+"px";
    }

    addAnItem(itemName, elementListener) {
        this.DOMObj.removeChild(this.emptyContextMenuMsg);
        let newElement = document.createElement("p");
        newElement.classList.add("gui-panel__task-bar__item__context-menu__content__menu-item");
        newElement.textContent = itemName;
        newElement.addEventListener('mousedown', function() {
            elementListener();
            this.DOMObj.classList.toggle("context-menu-fadein");
        }.bind(this));
        if(this.menuContent.length == 0) {
            this.menuContent.appendChild(newElement);
        } else {
            this.menuContent.insertBefore(newElement, this.menuContent.querySelector("*"));
        }

        return this;
    }

    addASeparator() {
        let newElement = document.createElement("div");
        newElement.classList.add("gui-panel__task-bar__item__context-menu__content__item-separator");
        if(this.menuContent.length == 0) {
            console.log("Didn't append the separator because the content of the menu is empty.");
        } else {
            this.menuContent.insertBefore(newElement, this.menuContent.querySelector("p"));
        }

        return this;
    }
}

export default PanelItemContextMenu;