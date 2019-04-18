import Desktop from './desktop';
import Overlay from './overlay';
import WindowManager from './windowmanager';

class System {
    constructor() {
        this.started = false;
        this.minimumLoadingTime = 500;
        this.desktop = new Desktop()
        this.windowManager = new WindowManager();
        this.smallScreenMsg = new Overlay();
        this.loadingOverlay = new Overlay();
        this.windowManager.registerWindowListDisplay(this.smallScreenMsg);
        this.windowManager.registerWindowListDisplay(this.loadingOverlay);
        document.body.appendChild(this.desktop.getDOMObject());
        document.body.appendChild(this.smallScreenMsg.getDOMObject());
        var overLayMessage = document.createElement("p");
        overLayMessage.textContent = "The browser window is too small to fit the necessary SimpleJSGui components.";
        this.smallScreenMsg.getCenterContainer().appendChild(overLayMessage);
        document.body.appendChild(this.loadingOverlay.getDOMObject());
        var loadingSpinner = document.createElement("div");
        loadingSpinner.classList.add("gui-overlay__spinner");
        var loadingMsg = document.createElement("p");
        loadingMsg.style.fontSize = "1.5rem";
        loadingMsg.textContent = "SimpleJSGuiLite v0.9-beta";

        this.loadingOverlay.getCenterContainer().appendChild(loadingSpinner);
        this.loadingOverlay.getCenterContainer().appendChild(loadingMsg);
        this.loadingOverlay.getDOMObject().style.visibility = "visible";
        
        window.addEventListener('resize', function(event) {
            this.checkForSmallWindowSize();
        }.bind(this));
    }
    
    checkForSmallWindowSize() {
        if(this.panel) {
            this.minimalWidth = this.panel.calculateMinimalWidth();
            if(window.innerWidth < this.minimalWidth) {
                this.smallScreenMsg.getDOMObject().style.visibility = "visible";
            } else {
                this.smallScreenMsg.getDOMObject().style.visibility = "hidden";
            }
        }
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
    
    // NOT NEEDED AT THIS TIME, REMOVE IF OBSOLETE IN THE FUTURE
    registerPanel(newPanel) {
        this.panel = newPanel;
    }
    
    start() {
        // console.log("System.start() method called..");
        if(!this.started) {
            // console.log("Starting the timeout..");
            window.setTimeout(function() {
                // console.log("Starting the interval..");
                var intervalId = window.setInterval(function() {
                    // console.log("new interval cycle..");
                    if(document.readyState === "complete") {
                        // console.log("All the resources loaded, starting..");
                        this.started = true;
                        this.loadingOverlay.getDOMObject().style.opacity = "0";
                        let duration = window.getComputedStyle(this.loadingOverlay.getDOMObject()).getPropertyValue("transition-duration");
                        duration = duration.substring(0, duration.indexOf('s'));
                        if(duration.charAt(0) == '.') {
                            duration = "0" + duration;
                        }
                        duration = new Number(duration);
                        duration *= 1000;
                        window.setTimeout(function() {
                            this.loadingOverlay.getDOMObject().style.visibility = "hidden";
                        }.bind(this), duration);
                        // console.log("Clearing the interval..");
                        window.clearInterval(intervalId);
                        this.checkForSmallWindowSize();
                    }
                }.bind(this), 100);
            }.bind(this), this.minimumLoadingTime);
        }
    }
}

export default System;