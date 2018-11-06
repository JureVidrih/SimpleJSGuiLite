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
        console.log("windowmanager: windowAction enters..");
        if(actionToDo == "minimize") {
            let status = newWindow.getStatus();
            if(status == "onscreen") {
                console.log("Minimizing window.");
                if(newWindow.isFocused) {
                    console.log("Window is focused, now minimizing.")
                    newWindow.status = "minimized";
                    newWindow.isFocused = false;
                    newWindow.getDOMObject().style.display = "none";
                } else {
                    console.log("Window gained focus.");
                    newWindow.unfocusAllWindows();
                    newWindow.isFocused = true;
                }
            } else if(status == "minimized") {
                console.log("Unminimizing window.");
                newWindow.unfocusAllWindows();
                newWindow.status = "onscreen";
                newWindow.isFocused = true;
                newWindow.getDOMObject().style.display = "block";
            }
        } else if(actionToDo == "maximize") {
            newWindow.status = "onscreen";
            newWindow.focusWindow();
            newWindow.getDOMObject().style.display = "block";
            newWindow.isFocused = true;
        } else if(actionToDo == "close") {
            newWindow.getDOMObject().remove()
            this.windows.splice(this.getWindowOrderNumber(newWindow), 1);
            newWindow = null;
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

        return orderNumber;
    }
}

export default WindowManager;