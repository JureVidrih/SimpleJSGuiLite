class Overlay {
    constructor() {
        this.DOMObj = document.createElement("div");
        this.DOMObj.classList.add("gui-overlay");
    }

    getDOMObject() {
        return this.DOMObj;
    }
}