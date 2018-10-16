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

    addAWindow(newWindow) {
        newWindow.setID(this.generateANewWindowID());
        this.windows.push(newWindow);
        this.windowListDisplays.forEach(function(list) {
            list.notifyListChanged();
        });
    }

    sortWindowsByZIndex(newTopWindowIndex) {
        let currentWindow = this.windows[newTopWindowIndex];
        let currentIndex = currentWindow.style.zIndex;
        this.windows[newTopWindowIndex].style.zIndex = 0;
        for(let i = 0; i < this.windows.length; i++) {
            let zIndex = this.windows[i].getDOMObject().style.zIndex;
            if(!(zIndex < currentIndex)) {
                zIndex = Number(zIndex) - 1;
                this.windows[i].getDOMObject().style.zIndex = zIndex;
            }
        }
    }

    getWindows() {
        return this.windows;
    }
}

export default WindowManager;