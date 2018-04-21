var System = function() {
    this.desktop = new Desktop();
    
    this.getDesktop = function() {
        return this.desktop;
    }
}

var SimpleJSGui = new System();