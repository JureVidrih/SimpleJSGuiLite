class DropdownMenuItem {
    constructor(title, action) {
        this.isANestedMenu = (action instanceof DropdownMenu);
        this.DOMObj = document.createElement("div");
        if(this.isANestedMenu) {
            this.menu = action;
            this.menu.isRootMenu = false;
            this.DOMObj.classList.add("dropdown-menu__item--menu-item");
            this.DOMObj.addEventListener('mouseleave', function(evt) {
                if(evt.relatedTarget.parentNode == this.DOMObj.parentNode) {
                    if(this.menu.isOnScreen) {
                       this.menu.toggleMenu(); 
                    }
                }
            }.bind(this));
            this.DOMObj.addEventListener('mouseenter', function() {
                let coords = this.DOMObj.getBoundingClientRect();
                let minWidth = window.getComputedStyle(this.DOMObj.parentNode).getPropertyValue("min-width");
                let documentCoords = document.body.getBoundingClientRect();
                if(!this.menu.hasBeenRendered) {
                    if((coords.right + parseInt(minWidth)) > documentCoords.right || this.menu.parentMenu.alignment == "left") {
                        if(this.menu.parentMenu.alignment == "left") {
                            this.menu.render("left", this.DOMObj);
                        } else {
                            this.menu.render("left", this.DOMObj, this.getRootMenu().DOMObj);
                        }
                    } else {
                        this.menu.render("right", this.DOMObj);
                    }
                    this.menu.isOnScreen = true;
                } else {
                    let updatedAlignment;
                    let rootParent;
                    if((coords.right + parseInt(minWidth)) > documentCoords.right || this.menu.parentMenu.alignment == "left") {
                        updatedAlignment = "left";
                        if(this.menu.parentMenu.alignment != "left") {
                            rootParent = this.getRootMenu().DOMObj;
                        }
                    } else {
                        updatedAlignment = "right";
                    }
                    this.menu.updateCoords(updatedAlignment, rootParent);
                    this.menu.toggleMenu();
                }
                // let coords = this.DOMObj.getBoundingClientRect();
                // let minWidth = window.getComputedStyle(this.DOMObj.parentNode).getPropertyValue("min-width");
                // let documentCoords = document.body.getBoundingClientRect();
                // if(!this.menu.hasBeenRendered) {
                //     if((coords.right + parseInt(minWidth)) > documentCoords.right || this.menu.parentMenu.alignment == "left") {
                //         if(this.menu.parentMenu.alignment == "left") {
                //             this.menu.render("left", this.DOMObj);
                //         } else {
                //             this.menu.render("left", this.DOMObj, this.getRootMenu().DOMObj);
                //         }
                //     } else {
                //         this.menu.render("right", this.DOMObj);
                //     }
                //     this.menu.isOnScreen = true;
                // } else {
                //     if(this.menu.isOnScreen) {
                //         this.menu.toggleMenu();
                //     } else {
                //         let updatedAlignment;
                //         let rootParent;
                //         if((coords.right + parseInt(minWidth)) > documentCoords.right || this.menu.parentMenu.alignment == "left") {
                //             updatedAlignment = "left";
                //             if(this.menu.parentMenu.alignment != "left") {
                //                 rootParent = this.getRootMenu().DOMObj;
                //             }
                //         } else {
                //             updatedAlignment = "right";
                //         }
                //         this.menu.updateCoords(updatedAlignment, rootParent);
                //         this.menu.toggleMenu();
                //     }
                // }
            }.bind(this));
        } else {
            this.DOMObj.classList.add("dropdown-menu__item");
            this.DOMObj.addEventListener('mousedown', action);
        }
        this.DOMObj.textContent = title;
    }
    
    getRootMenu() {
        let menu = this.menu;
        
        while(!menu.isRootMenu && menu.parentMenu) {
            menu = menu.parentMenu;
        }
        
        return menu;
    }
}

class DropdownMenu {
    constructor() {
        this.DOMObj = document.createElement("div");
        this.DOMObj.classList.add("dropdown-menu");
        
        this.isRootMenu = true;
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
        } else {
            newItem.menu.parentMenu = this;
        }
        this.items.push(newItem);
        this.DOMObj.appendChild(newItem.DOMObj);
    }
    
    render(alignment, parent, rootParent) {
        this.alignment = alignment;
        this.parent = parent;
        document.body.appendChild(this.DOMObj);
        this.updateCoords(this.alignment, rootParent);
        this.DOMObj.style.zIndex = SimpleJSGui.getWindowManager().getWindows().length+2;
        this.hasBeenRendered = true;
        if(this.alignment == "left") {
            this.DOMObj.style.left = (this.coordsLeft - parseInt(this.DOMObj.offsetWidth)) + "px";
        }
        this.toggleMenu();
    }
    
    updateCoords(alignment, rootParent) {
        this.alignment = alignment;
        this.coords = this.parent.getBoundingClientRect();
        let top = this.coords.top;
        let left = this.coords.left;
        if(rootParent) {
            let parentCoords = rootParent.getBoundingClientRect();
            left = parentCoords.left;
        }
        this.coordsLeft = left;
        this.parentWidth = this.parent.offsetWidth;
        this.parentHeight = this.parent.offsetHeight;
        
        // CHECK IF THERE IS ROOM TO THE LEFT
        if(this.alignment != "left") {
            if(left + this.DOMObj.offsetWidth > document.body.offsetWidth) {
                left = document.body.offsetWidth - this.DOMObj.offsetWidth;
            }
        }
        
        // CHECK IF THERE IS ROOM BELOW
        if(this.alignment) {
            if((top + this.DOMObj.offsetHeight) > document.body.offsetHeight) {
                top = document.body.offsetHeight - this.DOMObj.offsetHeight;
            }
        } else {
            if((top + this.DOMObj.offsetHeight + this.parentHeight) > document.body.offsetHeight) {
                top = this.coords.top - this.DOMObj.offsetHeight - this.parentHeight;
            }
        }
        
        
        if(this.alignment) {
            if(this.alignment == "left") {
                if(this.hasBeenRendered) {
                    this.DOMObj.style.left = (left - parseInt(this.DOMObj.offsetWidth)) + "px";
                    this.DOMObj.style.top = top + "px";
                } else {
                    this.DOMObj.style.left = left + "px";
                    this.DOMObj.style.top = top + "px";
                }
                
            } else if(this.alignment == "right") {
                this.DOMObj.style.left = (left + parseInt(this.parentWidth)) + "px";
                this.DOMObj.style.top = top + "px";
            }
        } else {
            this.DOMObj.style.left = left + "px";
            this.DOMObj.style.top = (top + parseInt(this.parentHeight)) + "px";
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