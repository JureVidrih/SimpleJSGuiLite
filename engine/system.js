class System {
    constructor() {
        this.desktop = new Desktop();
        this.overLay = new OverLay();
        document.body.appendChild(this.desktop.getDOMObject());
        document.body.appendChild(this.overLay.getDOMObject());
        var overLayMessage = document.createElement("p");
        overLayMessage.textContent = "The browser window is too small to fit the necessary SimpleJSGui components.";
        this.overLay.getDOMObject().appendChild(overLayMessage);

        window.addEventListener('resize', function(event) {
            if(this.panel) {
                this.minimalWidth = this.panel.calculateMinimalWidth();
                if(window.innerWidth < this.minimalWidth) {
                    this.overLay.getDOMObject().style.display = "block";
                } else {
                    this.overLay.getDOMObject().style.display = "none";
                }
            }
        }.bind(this));
    }

    getDesktop() {
        return this.desktop;
    }

    registerPanel(newPanel) {
        this.panel = newPanel;
    }
}

var SimpleJSGui = new System();