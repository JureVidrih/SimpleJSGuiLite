class Overlay {
    constructor() {
        this.DOMObj = document.createElement("div");
        this.DOMObj.classList.add("gui-overlay");

        this.centerContainer = document.createElement("div");
        this.centerContainer.classList.add("gui-overlay__center-container");

        this.DOMObj.appendChild(this.centerContainer);
    }

    getDOMObject() {
        return this.DOMObj;
    }

    getCenterContainer() {
        return this.centerContainer;
    }

    notifyListChanged() {
        this.DOMObj.style.zIndex = SimpleJSGui.getWindowManager().getWindows().length+2;
    }
}

export default Overlay;