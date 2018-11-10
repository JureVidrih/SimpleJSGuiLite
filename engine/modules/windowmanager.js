class WindowManager {
    constructor() {
        this.windows = [];
        this.windowIDS = [];
        this.lastWindowID = 0;
        this.windowListDisplays = [];
    }
    
    registerWindowListDisplay(newDisplay) {
        this.windowListDisplays.push(newDisplay);
    }
    
    generateANewWindowID() {
        let newID = ++this.lastWindowID;
        this.windowIDS.push(newID);
    }
    
    notifyListDisplays() {
        this.windowListDisplays.forEach(function(list) {
            list.notifyListChanged();
        });
    }
    
    addAWindow(newWindow) {
        this.generateANewWindowID();
        newWindow.setID(this.windowIDS[this.windowIDS.length-1]);
        newWindow.setZIndex(this.windows.length+1);
        
        document.body.appendChild(newWindow.getDOMObject());
        newWindow.focusWindow();
        
        this.windows.push(newWindow);
        this.notifyListDisplays();
    }
    
    windowAction(actionToDo, newWindow) {
        // console.log("windowmanager: windowAction enters..");
        let newWindowActualDOMObject = newWindow.getDOMObject().querySelector(".gui-window");
        if(actionToDo == "minimize") {
            let status = newWindow.getStatus();
            if(status == "onscreen") {
                // console.log("Minimizing window.");
                if(newWindow.isFocused) {
                    // console.log("Window is focused, now minimizing.")
                    newWindow.status = "minimized";
                    newWindow.isFocused = false;
                    newWindowActualDOMObject.classList.remove("window-applyanimation-unminimize");
                    newWindowActualDOMObject.classList.add("window-applyanimation-minimize");
                } else {
                    // console.log("Window gained focus.");
                    newWindow.unfocusAllWindows();
                    newWindow.isFocused = true;
                    newWindow.focusWindow();
                }
            } else if(status == "minimized") {
                // console.log("Unminimizing window.");
                newWindow.unfocusAllWindows();
                newWindow.status = "onscreen";
                newWindow.isFocused = true;
                newWindowActualDOMObject.classList.remove("window-applyanimation-minimize");
                newWindowActualDOMObject.classList.add("window-applyanimation-unminimize");
                
                window.setTimeout(function() {
                    newWindowActualDOMObject.classList.remove("window-applyanimation-unminimize");
                }, this.getAnimationDuration(newWindowActualDOMObject));
            }
        } else if(actionToDo == "maximize") {
            newWindow.status = "onscreen";
            newWindow.focusWindow();
            newWindow.getDOMObject().style.display = "block";
            newWindow.isFocused = true;
        } else if(actionToDo == "close") {
            newWindowActualDOMObject.classList.add("window-applyanimation-close");
            this.windows.splice(this.getWindowOrderNumber(newWindow), 1);

            window.setTimeout(function() {
                newWindow.getDOMObject().remove()
                newWindow = null;
            }.bind(this), this.getAnimationDuration(newWindowActualDOMObject));
        }
        this.notifyListDisplays();
    }
    
    sortWindowsByZIndex(newTopWindowIndex) {
        let currentWindow = this.windows[newTopWindowIndex];
        let currentIndex = currentWindow.getZIndex();
        currentWindow.setZIndex(this.windows.length);
        for(let i = 0; i < this.windows.length; i++) {
            let zIndex = Number(this.windows[i].getZIndex());
            if(zIndex > 1 && this.windows[i] != currentWindow) {
                this.windows[i].setZIndex(zIndex-1);
            }
        }
    }
    
    getWindows() {
        return this.windows;
    }
    
    getWindowOrderNumber(window) {
        let orderNumber = 0;
        this.windows.forEach(function(elem, id) {
            if(elem === window) {
                orderNumber = id;
            }
        });
        
        // console.log("order: " + orderNumber);
        return orderNumber;
    }
    
    // AUXILIARY METHODS
    getAnimationDuration(obj) {
        let duration = window.getComputedStyle(obj).getPropertyValue("animation-duration");
        duration = duration.substring(0, duration.indexOf('s'));
        if(duration.charAt(0) == '.') {
            duration = "0" + duration;
        }
        duration = new Number(duration);
        
        return duration * 1000;
    }
}

export default WindowManager;