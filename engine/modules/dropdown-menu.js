class DropdownMenuItem {
    constructor(title, action) {
        this.isANestedMenu = (action instanceof DropdownMenu);
        this.DOMObj = document.createElement("div");
        if(this.isANestedMenu) {
            this.menu = action;
            this.DOMObj.classList.add("dropdown-menu__item--menu-item");
            this.DOMObj.addEventListener('click', function() {
                let coords = this.DOMObj.getBoundingClientRect();
                let minWidth = window.getComputedStyle(this.DOMObj.parentNode).getPropertyValue("min-width");
                let documentCoords = document.body.getBoundingClientRect();
                if(!this.menu.hasBeenRendered) {
                    if((coords.right + parseInt(minWidth)) > documentCoords.right) {
                        this.menu.render(this.DOMObj, "left");
                    } else {
                        this.menu.render(this.DOMObj, "right");
                    }
                    this.menu.isOnScreen = true;
                } else {
                    if(this.menu.isOnScreen) {
                        this.menu.toggleMenu();
                    } else {
                        let updatedAlignment;
                        if((coords.right + parseInt(minWidth)) > documentCoords.right) {
                            updatedAlignment = "left";
                        } else {
                            updatedAlignment = "right";
                        }
                        this.menu.updateCoords(updatedAlignment);
                        this.menu.toggleMenu();
                    }
                }
            }.bind(this));
        } else {
            this.DOMObj.classList.add("dropdown-menu__item");
            this.DOMObj.addEventListener('mousedown', action);
        }
        this.DOMObj.textContent = title;
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
        if(!newItem.isANestedMenu) {
            newItem.DOMObj.addEventListener('click', function() {
                this.toggleMenu();
            }.bind(this));
        }
        this.items.push(newItem);
        this.DOMObj.appendChild(newItem.DOMObj);
    }
    
    render(parent, alignment) {
        this.parent = parent;
        this.alignment = alignment;
        this.updateCoords(this.alignment);
        this.DOMObj.style.zIndex = SimpleJSGui.getWindowManager().getWindows().length+2;
        document.body.appendChild(this.DOMObj);
        this.hasBeenRendered = true;
        if(this.alignment == "left") {
            this.DOMObj.style.left = (this.coords.left - parseInt(this.DOMObj.offsetWidth)) + "px";
        }
        this.toggleMenu();
    }
    
    updateCoords(alignment) {
        this.alignment = alignment;
        this.coords = this.parent.getBoundingClientRect();
        this.parentWidth = window.getComputedStyle(this.parent).getPropertyValue("width");
        this.parentHeight = window.getComputedStyle(this.parent).getPropertyValue("height");
        if(this.alignment) {
            if(this.alignment == "left") {
                if(this.hasBeenRendered) {
                    this.DOMObj.style.left = (this.coords.left - parseInt(this.DOMObj.offsetWidth)) + "px";
                    this.DOMObj.style.top = this.coords.top + "px";
                } else {
                    this.DOMObj.style.left = this.coords.left + "px";
                    this.DOMObj.style.top = this.coords.top + "px";
                }
                
            } else if(this.alignment == "right") {
                this.DOMObj.style.left = (this.coords.left + parseInt(this.parentWidth)) + "px";
                this.DOMObj.style.top = this.coords.top + "px";
            }
        } else {
            this.DOMObj.style.left = this.coords.left + "px";
            this.DOMObj.style.top = (this.coords.top + parseInt(this.parentHeight)) + "px";
        }
        
    }
    
    toggleMenu() {
        if(this.isOnScreen) {
            this.DOMObj.style.visibility = "hidden";
            this.isOnScreen = false;
            document.body.removeEventListener('mousedown', this.toggleListener);
            for(let i = 0; i < this.items.length; i++) {
                if(this.items[i].isANestedMenu && this.items[i].menu.isOnScreen) {
                    this.items[i].menu.toggleMenu();
                }
            }
        } else {
            this.DOMObj.style.visibility = "visible";
            this.isOnScreen = true;
            document.body.addEventListener('mousedown', this.toggleListener);
        }
    }
}

export default DropdownMenu;