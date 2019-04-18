class DropdownMenuItem {
    constructor(title, action) {
        this.DOMObj = document.createElement("div");
        if(action instanceof DropdownMenu) {
            this.DOMObj.classList.add("dropdown-menu__item--menu-item");
            this.DOMObj.addEventListener('click', function() {
                let coords = this.DOMObj.getBoundingClientRect();
                let parentWidth = window.getComputedStyle(this.DOMObj).getPropertyValue("width");
                if(!action.hasBeenRendered) {
                    action.render(this.DOMObj, coords.left + parseInt(parentWidth), coords.top);
                    action.isOnScreen = true;
                } else {
                    if(action.isOnScreen) {
                        action.toggleMenu();
                    } else {
                        action.updateCoords(coords.left + parseInt(parentWidth), coords.top);
                        action.toggleMenu();
                    }
                }
            }.bind(this));
        } else {
            this.DOMObj.classList.add("dropdown-menu__item");
            this.DOMObj.addEventListener('mousedown', action);
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
        
        this.toggleListener = function(event) {
            if(event.target != this.parent && !event.target.classList.contains("dropdown-menu__item--menu-item")) {
                this.toggleMenu();
            }
        }.bind(this);
        
        return this;
    }
    
    addAnItem(title, action) {
        let newItem = new DropdownMenuItem(title, action);
        if(!(action instanceof DropdownMenu)) {
            newItem.addEventListener('click', function() {
                this.toggleMenu();
            }.bind(this));
        }
        this.items.push(newItem);
        this.DOMObj.appendChild(newItem);
    }
    
    render(parent, x, y) {
        this.DOMObj.style.left = x + "px";
        this.DOMObj.style.top = y + "px";
        this.DOMObj.style.zIndex = SimpleJSGui.getWindowManager().getWindows().length+2;
        this.parent = parent;
        document.body.appendChild(this.DOMObj);
        this.hasBeenRendered = true;
        this.toggleMenu();
    }
    
    updateCoords(newX, newY) {
        this.DOMObj.style.left = newX + "px";
        this.DOMObj.style.top = newY + "px";
    }
    
    toggleMenu() {
        if(this.isOnScreen) {
            this.DOMObj.style.visibility = "hidden";
            this.isOnScreen = false;
            document.body.removeEventListener('mousedown', this.toggleListener);
        } else {
            this.DOMObj.style.visibility = "visible";
            this.isOnScreen = true;
            document.body.addEventListener('mousedown', this.toggleListener);
        }
    }
}

export default DropdownMenu;