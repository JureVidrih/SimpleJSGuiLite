var System = function() {
    this.desktop = new Desktop();
    this.overLay = new OverLay();

    this.init = function init() {
        document.body.appendChild(this.desktop.getDOMObject());
        document.body.appendChild(this.overLay.getDOMObject());
        var overLayMessage = document.createElement("p");
        overLayMessage.textContent = "The browser window is too small to fit the neccessary SimpleJSGui components.";
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

    this.getDesktop = function() {
        return this.desktop;
    }

    this.registerPanel = function registerPanel(newPanel) {
        this.panel = newPanel;
    }
}

var SimpleJSGui = new System();