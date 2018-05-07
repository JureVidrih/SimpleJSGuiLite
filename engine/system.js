var System = function() {
    this.desktop = new Desktop();

    this.init = function init() {
        document.body.appendChild(this.desktop.getDOMObject());
    }

    this.getDesktop = function() {
        return this.desktop;
    }
}

var SimpleJSGui = new System();