class DropdownMenuItem {
    constructor(title, action) {
        this.DOMObj = document.createElement("div");
        this.DOMObj.classList.add("dropdown-menu__item");

        this.DOMObj.textContent = title;
        this.DOMObj.addEventListener('click', action);

        return this.DOMObj;
    }
}

class DropdownMenu {
    constructor() {
        this.DOMObj = document.createElement("div");
        this.DOMObj.classList.add("dropdown-menu");

        this.items = [];

        return this;
    }

    addAnItem(title, action) {
        let newItem = new DropdownMenuItem(title, action);
        this.DOMObj.appendChild(newItem);
    }

    render(x, y) {
        this.DOMObj.style.left = x + "px";
        this.DOMObj.style.top = y + "px";
        document.body.appendChild(this.DOMObj);
    }
}

export default DropdownMenu;