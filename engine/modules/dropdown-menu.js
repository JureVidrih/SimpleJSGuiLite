class DropdownMenuItem {
    constructor(title, action) {
        this.DOMObj = document.createElement("div");
        this.DOMObj.classList.add("dropdown-menu__item");
        if(action instanceof DropdownMenu) {
            this.DOMObj.addEventListener('click', function() {
                if(!action.hasBeenRendered) {
                    let coords = this.DOMObj.getBoundingClientRect();
                    let parentWidth = window.getComputedStyle(this.DOMObj).getPropertyValue("width");
                    action.render(coords.left + parseInt(parentWidth), coords.top);
                } else {
                    if(!action.isOnScreen) {
                        action.DOMObj.style.visibility = "visible";
                        action.isOnScreen = true;
                    } else {
                        action.DOMObj.style.visibility = "hidden";
                        action.isOnScreen = false;
                    }
                }
            }.bind(this));
        } else {
            this.DOMObj.addEventListener('click', action);
        }
        this.DOMObj.textContent = title;
        
        return this.DOMObj;
    }
}

class DropdownMenu {
    constructor() {
        this.DOMObj = document.createElement("div");
        this.DOMObj.classList.add("dropdown-menu");
        
        this.items = [];
        this.isOnScreen = false;
        
        return this;
    }
    
    addAnItem(title, action) {
        let newItem = new DropdownMenuItem(title, action);
        this.items.push(newItem);
        this.DOMObj.appendChild(newItem);
    }
    
    render(x, y) {
        this.DOMObj.style.left = x + "px";
        this.DOMObj.style.top = y + "px";
        document.body.appendChild(this.DOMObj);
        this.hasBeenRendered = true;
        this.isOnScreen = true;
    }
}

export default DropdownMenu;