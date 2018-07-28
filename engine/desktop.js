var Desktop = function() {
    this.wholeScreenObj;
    this.DOMObj;
    this.currentBgrDOM;
    this.snapIndicatorTop;
    this.snapIndicatorLeft;
    this.snapIndicatorRight;
    this.width;
    this.height;

    this.createDOMObject = function() {
        this.wholeScreenObj = document.createElement("div");
        this.wholeScreenObj.classList.add("gui-desktop");
        this.DOMObj = document.createElement("div");
        this.DOMObj.classList.add("gui-desktop");
        this.DOMObj.classList.add("gui-desktop--only-desktop");
        this.snapIndicatorTop = document.createElement("div");    
        this.snapIndicatorLeft = document.createElement("div");
        this.snapIndicatorRight = document.createElement("div");
        this.snapIndicatorTop.classList.add("gui-desktop__window-snap-indicator-top");
        this.snapIndicatorLeft.classList.add("gui-desktop__window-snap-indicator-left");
        this.snapIndicatorRight.classList.add("gui-desktop__window-snap-indicator-right");
        this.DOMObj.appendChild(this.snapIndicatorTop);
        this.DOMObj.appendChild(this.snapIndicatorLeft);
        this.DOMObj.appendChild(this.snapIndicatorRight);
        this.wholeScreenObj.appendChild(this.DOMObj);
        this.currentBgrDOM = this.DOMObj;
    }

    this.getDOMObject = function() {
        return this.wholeScreenObj;
    }

    this.getDesktopDOMObject = function() {
        return this.DOMObj;
    }

    this.shouldBackgroundCoverWholeViewport = function shouldBackgroundCoverWholeViewport(option) {
        if(option == true) {
            this.currentBgrDOM = this.wholeScreenObj;
            var bottomValue = document.body.clientHeight-this.DOMObj.clientHeight;
            this.snapIndicatorLeft.style.bottom = bottomValue+"px";
            this.snapIndicatorRight.style.bottom = bottomValue+"px";
        } else {
            this.currentBgrDOM = this.DOMObj;
            this.snapIndicatorLeft.style.bottom = 0;
            this.snapIndicatorRight.style.bottom = 0;
        }
    }

    this.changeBackgroundColor = function(newColor) {
        this.currentBgrDOM.style.backgroundColor = newColor;
    }

    this.changeBackgroundImage = function(imageUrl) {
        this.currentBgrDOM.style.backgroundImage = "url('" + imageUrl + "')";
        this.currentBgrDOM.style.backgroundSize = "cover";
    }
    
    this.setBackgroundSize = function(value) {
        this.currentBgrDOM.style.backgroundSize = value;
    }

    this.setBackgroundRepeat = function(value) {
        this.currentBgrDOM.style.backgroundRepeat = value;
    }

    this.setBackgroundPosition = function(a, b) {
        this.currentBgrDOM.style.backgroundPosition = a;
        if(b) {
            this.currentBgrDOM.style.backgroundPosition += " " + b;
        }
    }

    this.createDOMObject();
}