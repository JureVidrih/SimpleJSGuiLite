this.OverLay = function OverLay() {
    this.initialize = function initialize() {
        this.DOMObj = document.createElement("div");
        this.DOMObj.classList.add("gui-overlay");
    }

    this.getDOMObject = function getDOMObject() {
        return this.DOMObj;
    }
    
    this.initialize();
}