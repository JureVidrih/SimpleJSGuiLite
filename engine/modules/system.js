import Desktop from './desktop';
import Overlay from './overlay';
import WindowManager from './windowmanager';

class System {
    constructor() {
        this.started = false;
        this.minimumLoadingTime = 250;
        this.desktop = new Desktop();
        this.smallScreenMsg = new Overlay();
        this.loadingOverlay = new Overlay();
        this.windowManager = new WindowManager();
        document.body.appendChild(this.desktop.getDOMObject());
        document.body.appendChild(this.smallScreenMsg.getDOMObject());
        var overLayMessage = document.createElement("p");
        overLayMessage.textContent = "The browser window is too small to fit the necessary SimpleJSGui components.";
        this.smallScreenMsg.getDOMObject().appendChild(overLayMessage);
        document.body.appendChild(this.loadingOverlay.getDOMObject());
        var loadingMsg = document.createElement("p");
        loadingMsg.textContent = "Loading...";
        loadingMsg.style.left = "50%";
        loadingMsg.style.transform = "translate(-50%, -50%)";
        this.loadingOverlay.getDOMObject().appendChild(loadingMsg);
        this.loadingOverlay.getDOMObject().style.display = "block";
        
        window.addEventListener('resize', function(event) {
            if(this.panel) {
                this.minimalWidth = this.panel.calculateMinimalWidth();
                if(window.innerWidth < this.minimalWidth) {
                    this.smallScreenMsg.getDOMObject().style.display = "block";
                } else {
                    this.smallScreenMsg.getDOMObject().style.display = "none";
                }
            }
        }.bind(this));
    }
    
    getDesktop() {
        return this.desktop;
    }

    getWindowManager() {
        return this.windowManager;
    }

    addAWindow(newWindow) {
        this.windowManager.addAWindow(newWindow);
    }
    
    registerPanel(newPanel) {
        this.panel = newPanel;
    }
    
    start() {
        if(!this.started) {
            window.setTimeout(function() {
                var intervalId = window.setInterval(function() {
                    if(document.readyState === "complete") {
                        this.started = true;
                        this.loadingOverlay.getDOMObject().style.display = "none";
                    }
                    window.cancelInterval(intervalId);
                }.bind(this), 100);
            }.bind(this), this.minimumLoadingTime);
        }
    }
}

export default System;