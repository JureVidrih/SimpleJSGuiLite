import { timingSafeEqual } from "crypto";

class PanelMenu {
    constructor() {
        this.DOMObj = document.createElement("div");
        this.DOMObj.classList.add("gui-panel__menu");
        this.DOMObj.innerHTML = '<div class="gui-panel__menu__icon"></div><div class="gui-panel__menu__content"><div class="gui-panel__menu__titleArea"></div><div class="gui-panel__menu__content__titleArea__text"><h1>Menu</h1></div><div class="gui-panel__menu__content__items"></div></div>';
        this.visibleContent = this.DOMObj.querySelector(".gui-panel__menu__content");
        this.menuIcon = this.DOMObj.querySelector(".gui-panel__menu__icon");
        this.menuContent = this.DOMObj.querySelector(".gui-panel__menu__content__items");
        this.items = [];

        this.menuContent.innerHTML = "<p style='position: absolute; width: 100%; text-align: center; top: 50%; transform: translateY(-50%);'>The menu is empty.</p>";

        this.menuIcon.addEventListener('mousedown', function(event) {
            this.visibleContent.classList.toggle("menu-fadein");
        }.bind(this));

        document.addEventListener('mousedown', function(event) {
            if(event.button == 0) {
                if(event.target != this.menuIcon && event.target != this.menuContent) {
                    this.close();
                }
            }
        }.bind(this));
    }

    getDOMObject() {
        return this.DOMObj;
    }

    close() {
        this.visibleContent.classList.remove("menu-fadein");
    }

    addAnItem(itemName, elementListener) {
        let newElement = document.createElement("p");
        newElement.classList.add("gui-panel__menu__content__menu-item");
        newElement.textContent = itemName;
        newElement.addEventListener('mousedown', function() {
            elementListener();
            this.visibleContent.classList.toggle("menu-fadein");
        }.bind(this));

        this.items.push(newElement);
        if(this.items.length > 0) {
            this.menuContent.innerHTML = "";
        }
        this.menuContent.appendChild(newElement);

        return this;
    }

    addASeparator() {
        let newElement = document.createElement("div");
        newElement.classList.add("gui-panel__menu__content__item-separator");
        if(this.items.length == 0) {
            console.log("Didn't append the separator because the content of the menu is empty.");
        } else {
            this.menuContent.appendChild(newElement);
        }

        return this;
    }
}

export default PanelMenu;