import { timingSafeEqual } from "crypto";

class DropdownMenuItem {
    constructor(title, action) {
        this.isANestedMenu = (action instanceof DropdownMenu);
        this.DOMObj = document.createElement("div");
        this.title = title;
        this.action = action;
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
            this.DOMObj.addEventListener('mouseenter', function(evt) {
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
            this.DOMObj.addEventListener('mousedown', this.action);
        }
        this.DOMObj.textContent = this.title;
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
        
        this.hasBeenSplit = false;
        this.isRootMenu = true;
        this.items = [];
        this.isOnScreen = false;

        this.dummyMenuItem = new DropdownMenuItem("dummy title", function() { console.log("dummy callback"); })
        this.dummyMenuItem.DOMObj.style.display = "none";
        document.body.appendChild(this.dummyMenuItem.DOMObj);
        this.cachedItemHeight = Number.parseInt(window.getComputedStyle(this.dummyMenuItem.DOMObj).getPropertyValue("height"));
        document.body.removeChild(this.dummyMenuItem.DOMObj);
        console.log("this.cachedItemHeight: " + this.cachedItemHeight);
        
        this.toggleListener = function(event) {
            if(event.target != this.parent && !event.target.classList.contains("dropdown-menu__item--menu-item")) {
                this.toggleMenu();
            }
        }.bind(this);
        
        this.DOMObj.addEventListener('mouseenter', function(evt) {
            for(let i = 0; i < this.items.length; i++) {
                let isInsideTheCurrentMenuItem = false;
                if(this.items[i].menu.isOnScreen) {
                    let itemCoords = this.items[i].DOMObj.getBoundingClientRect();
                    isInsideTheCurrentMenuItem = (evt.clientY >= itemCoords.top && evt.clientY <= itemCoords.bottom);
                }
                if(this.items[i].isANestedMenu && !isInsideTheCurrentMenuItem && this.items[i].menu.isOnScreen) {
                    this.items[i].menu.toggleMenu();
                }
            }
        }.bind(this));
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
        this.cachedHeight = this.DOMObj.offsetHeight;
        this.updateCoords(this.alignment, rootParent);
        this.DOMObj.style.zIndex = SimpleJSGui.getWindowManager().getWindows().length+2;
        this.hasBeenRendered = true;
        if(this.alignment == "left") {
            this.DOMObj.style.left = (this.coordsLeft - parseInt(this.DOMObj.offsetWidth)) + "px";
        }
        this.toggleMenu();
    }
    
    updateCoords(alignment, rootParent) {
        if(this.menuArr && this.menuArr.length > 1) {
            for(let i = 0; i < this.menuArr.length; i++) {
                if(i > 0) {
                    this.menuArr[i].updateCoords("right", this.menuArr[0].DOMObj);
                } else {
                    this.menuArr[i].updateCoords(null, this.menuArr[0].DOMObj);
                }
            }
        }
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
        
        // CHECK IF THE MENU WILL FIT ON THE SCREEN WHILE BEING DISPLAYED UPSIDE DOWN
        
        if(!this.hasBeenSplit) {
            console.log(this.cachedHeight + " vs " + (document.body.offsetHeight - top - this.parentHeight));
        }
        
        if(!this.hasBeenSplit && (this.cachedHeight) > (document.body.offsetHeight - top - this.parentHeight)) {
            console.log("Condition true, proceeding...");
            this.splitMenuItems();
            return;
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
    
    splitMenuItems() {
        this.menuArr = [];
        console.log("this.DOMObj.offsetHeight: " + this.DOMObj.offsetHeight + ", this.cachedHeight: " + this.cachedHeight);
        let numOfNewMenus = (this.cachedHeight / document.body.offsetHeight);
        
        let numOfItemsInMenu = [];
        console.log(this.cachedItemHeight + ", " + this.coords.top + ", " + this.parentHeight);
        let maxItemsOnScreen = Math.floor(document.body.offsetHeight / this.cachedItemHeight);
        console.log("maxItemsOnScreen: " + maxItemsOnScreen);
        let firstMenuNumOfItems = Math.floor((document.body.offsetHeight - (this.coords.top + this.parentHeight)) / this.cachedItemHeight);
        console.log("firstMenuNumOfItems: " + firstMenuNumOfItems);
        let lastMenuNumOfItems = Math.floor(((numOfNewMenus % 1) * maxItemsOnScreen) - firstMenuNumOfItems);
        console.log("lastMenuNumOfItems: " + lastMenuNumOfItems);
        if(numOfNewMenus % 1 != 0) {
            numOfNewMenus = Math.floor(numOfNewMenus) + 1;
        }
        if(firstMenuNumOfItems != 0 && (lastMenuNumOfItems > 0) && (firstMenuNumOfItems - lastMenuNumOfItems > 0)) {
            numOfNewMenus += 1;
        }
        console.log("Number of new menus: " + numOfNewMenus);
        let remainingItems = this.items.length;
        console.log("remainingItems: " + remainingItems);
        for(let i = 0; i < numOfNewMenus; i++) {
            console.log("Allocating menu sizes: " + i + " of " + numOfNewMenus);
            if(i == 0) {
                numOfItemsInMenu[0] = firstMenuNumOfItems;
                remainingItems -= numOfItemsInMenu[0];
            } else if(i == numOfNewMenus - 1) {
                numOfItemsInMenu[numOfNewMenus - 1] = remainingItems;
                remainingItems -= numOfItemsInMenu[numOfNewMenus - 1];
            } else {
                numOfItemsInMenu[i] = maxItemsOnScreen;
                remainingItems -= numOfItemsInMenu[i];
            }
            console.log("remainingItems: " + remainingItems);
        }
        
        console.log("numOfNewMenus: " + numOfNewMenus);
        for(let i = 0, items = 0; i < numOfNewMenus; i++) {
            let newMenu = new DropdownMenu();
            console.log("numOfItemsInMenu: " + numOfItemsInMenu[i]);
            for(let j = 0; j < numOfItemsInMenu[i]; j++, items++) {
                console.log(i + ", " + j + ": Adding an item #" + items + " with title: " + this.items[items].DOMObj.textContent);
                newMenu.addAnItem(this.items[items].title, this.items[items].action);
            }
            newMenu.hasBeenSplit = true;
            this.menuArr.push(newMenu);
        }
        
        if(document.body.contains(this.DOMObj)) {
            document.body.removeChild(this.DOMObj);
        } else {
            if(this.menuArr.length > 0) {
                for(let i = 0; i < this.menuArr.length; i++) {
                    if(document.body.contains(this.menuArr[i].DOMObj)) {
                        document.body.removeChild(this.menuArr[i].DOMObj);
                    }
                }
            }
        }
        
        for(let i = 0; i < this.menuArr.length; i++) {
            if(i == 0) {
                this.menuArr[0].render(null, this.parent);
            } else {
                this.menuArr[i].render("right", this.menuArr[i-1].DOMObj);
            }
        }
    }
    
    toggleMenu() {
        if(this.isOnScreen) {
            if(this.menuArr && this.menuArr.length > 1) {
                for(let i = 0; i < this.menuArr.length; i++) {
                    this.menuArr[i].DOMObj.style.visibility = "hidden";
                    this.isOnScreen = false;
                    document.body.removeEventListener('mousedown', this.menuArr[i].toggleListener);
                    for(let j = 0; j < this.menuArr[i].items.length; j++) {
                        if(this.menuArr[i].items[j].isANestedMenu && this.menuArr[i].items[j].menu.isOnScreen) {
                            this.menuArr[i].items[j].menu.toggleMenu();
                        }
                    }
                }
            } else {
                this.DOMObj.style.visibility = "hidden";
                this.isOnScreen = false;
                document.body.removeEventListener('mousedown', this.toggleListener);
                for(let i = 0; i < this.items.length; i++) {
                    if(this.items[i].isANestedMenu && this.items[i].menu.isOnScreen) {
                        this.items[i].menu.toggleMenu();
                    }
                }
            }
        } else {
            if(this.menuArr && this.menuArr.length > 1) {
                for(let i = 0; i < this.menuArr.length; i++) {
                    this.menuArr[i].DOMObj.style.visibility = "visible";
                    this.menuArr[i].isOnScreen = true;
                    this.isOnScreen = true;
                    document.body.addEventListener('mousedown', this.menuArr[i].toggleListener);
                }
            } else {
                this.DOMObj.style.visibility = "visible";
                this.isOnScreen = true;
                document.body.addEventListener('mousedown', this.toggleListener);
            }
        }
    }
}

export default DropdownMenu;