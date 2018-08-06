class Desktop {
    constructor() {
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
        this.width;
        this.height;
    }

    getDOMObject() {
        return this.wholeScreenObj;
    }

    getDesktopDOMObject() {
        return this.DOMObj;
    }

    shouldBackgroundCoverWholeViewport(option) {
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

    changeBackgroundColor(newColor) {
        this.currentBgrDOM.style.backgroundColor = newColor;
    }

    changeBackgroundImage(imageUrl) {
        this.currentBgrDOM.style.backgroundImage = "url('" + imageUrl + "')";
        this.currentBgrDOM.style.backgroundSize = "cover";
    }
    
    setBackgroundSize(value) {
        this.currentBgrDOM.style.backgroundSize = value;
    }

    setBackgroundRepeat(value) {
        this.currentBgrDOM.style.backgroundRepeat = value;
    }

    setBackgroundPosition(a, b) {
        this.currentBgrDOM.style.backgroundPosition = a;
        if(b) {
            this.currentBgrDOM.style.backgroundPosition += " " + b;
        }
    }
}

export default Desktop;