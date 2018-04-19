var PanelMenu = function() {
    this.DOMObj = "";
    this.menuContent = "";

    this.createAnEmptyMenu = function() {
        this.DOMObj = document.createElement("div");
        this.DOMObj.classList.add("gui-panel__menu");
        this.DOMObj.innerHTML = '<div class="gui-panel__menu__icon"></div><div class="gui-panel__menu__content"><h1>Menu</h1></div>';
        this.menuIcon = this.DOMObj.querySelector(".gui-panel__menu__icon");
        this.menuContent = this.DOMObj.querySelector(".gui-panel__menu__content");

        this.DOMObj.addEventListener('mousedown', function(event) {
            this.menuContent.classList.toggle("menu-fadein");
        }.bind(this));

        document.addEventListener('mousedown', function(event) {
            if(event.button == 0) {
                if(event.target != this.menuIcon && event.target != this.menuContent) {
                    this.close();
                }
            }
        }.bind(this));
    }

    this.getDOMObject = function() {
        return this.DOMObj;
    }

    this.close = function() {
        this.menuContent.classList.remove("menu-fadein");
    }

    this.addAnItem = function(itemName, elementListener) {
        newElement = document.createElement("p");
        newElement.classList.add("gui-panel__menu__content__menu-item");
        newElement.textContent = itemName;
        newElement.addEventListener('mousedown', function() {
            elementListener();
            this.DOMObj.classList.toggle("menu-fadein");
        }.bind(this));
        this.menuContent.appendChild(newElement);

        return this;
    }

    this.addASeparator = function() {
        newElement = document.createElement("div");
        newElement.classList.add("gui-panel__menu__content__item-separator");
        if(this.menuContent.length == 0) {
            console.log("Didn't append the separator because the content of the menu is empty.");
        } else {
            this.menuContent.appendChild(newElement);
        }

        return this;
    }

    this.createAnEmptyMenu();
}