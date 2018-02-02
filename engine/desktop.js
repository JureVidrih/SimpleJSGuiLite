var Desktop = function() {
    this.DOMObj;
    this.snapIndicatorTop;
    this.snapIndicatorLeft;
    this.snapIndicatorRight;
    this.width;
    this.height;

    this.createDOMObject = function() {
        this.DOMObj = document.createElement("div");
        this.DOMObj.classList.add("gui-desktop");
        this.snapIndicatorTop = document.createElement("div");    
        this.snapIndicatorLeft = document.createElement("div");
        this.snapIndicatorRight = document.createElement("div");
        this.snapIndicatorTop.classList.add("gui-desktop__window-snap-indicator-top");
        this.snapIndicatorLeft.classList.add("gui-desktop__window-snap-indicator-left");
        this.snapIndicatorRight.classList.add("gui-desktop__window-snap-indicator-right");
        this.DOMObj.appendChild(this.snapIndicatorTop);
        this.DOMObj.appendChild(this.snapIndicatorLeft);
        this.DOMObj.appendChild(this.snapIndicatorRight);
    }

    this.getDOMObject = function() {
        return this.DOMObj;
    }

    this.createDOMObject();
}