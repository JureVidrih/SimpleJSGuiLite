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

    this.changeBackgroundColor = function(newColor) {
        this.DOMObj.style.backgroundColor = newColor;
    }

    this.changeBackgroundImage = function(imageUrl) {
        this.DOMObj.style.backgroundImage = "url('" + imageUrl + "')";
        this.DOMObj.style.backgroundSize = "cover";
    }
    
    this.setBackgroundSize = function(value) {
        this.DOMObj.style.backgroundSize = value;
    }

    this.setBackgroundRepeat = function(value) {
        this.DOMObj.style.backgroundRepeat = value;
    }

    this.setBackgroundPosition = function(a, b) {
        this.DOMObj.style.backgroundPosition = a;
        if(b) {
            this.DOMObj.style.backgroundPosition += " " + b;
        }
    }

    this.createDOMObject();
}