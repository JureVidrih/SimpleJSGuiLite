var Window = function(panelInstance, windowId) {
    this.panelInstance = panelInstance;
    this.id = windowId;
    this.getId = function() {
        return this.id;
    }
    this.isBeingDragged = false;
    this.cachedX = 0;
    this.cachedY = 0;
    
    this.isBeingResized = false;
    this.isResizingNW = false;
    this.isResizingNE = false;
    this.isResizingSW = false;
    this.isResizingSE = false;
    this.cachedResizeX = 0;
    this.cachedResizeY = 0;
    
    this.initialize = function() {
        this.createDOMObject();
        this.registerEvents();
    }
    
    this.createDOMObject = function() {
        var domObj = document.createElement("div");
        domObj.id = this.id;
        domObj.innerHTML =  '<div class="gui-window">'
        +'<div id="nw-resize-wrapper"><div id="nw-resize"></div></div>'+'<div id="ne-resize-wrapper"><div id="ne-resize"></div></div>'+'<div id="sw-resize-wrapper"><div id="sw-resize"></div></div>'+'<div id="se-resize-wrapper"><div id="se-resize"></div></div>'
        +'<div class="gui-window__titlebar">'
        +'<div class="gui-window__titlebar__buttons"><a class="window-btn window-btn-close" href="#"></a><a class="window-btn window-btn-minimize" href="#"></a><a class="window-btn window-btn-maximize" href="#"></a></div><div class="gui-window__titlebar__title">Window Title</div>'
        +'</div>'
        +'<div class="gui-window__content">Window content.</div>'
        +'</div>';
        this.panel = domObj.getElementsByClassName("gui-panel")[0];
        this.guiWindow = domObj.querySelector(".gui-window");
        this.nwResize = domObj.querySelector("#nw-resize");
        this.neResize = domObj.querySelector("#ne-resize");
        this.swResize = domObj.querySelector("#sw-resize");
        this.seResize = domObj.querySelector("#se-resize");
        this.titleBar = domObj.querySelector(".gui-window__titlebar");
        this.close = domObj.getElementsByClassName("window-btn-close")[0];
        this.min = domObj.getElementsByClassName("window-btn-minimize")[0];
        this.max = domObj.getElementsByClassName("window-btn-maximize")[0];
        this.title = domObj.querySelector(".gui-window__titlebar__title");
        this.windowContent = domObj.querySelector(".gui-window__content");
        document.body.appendChild(domObj);
    }
    
    this.registerEvents = function() {
        this.close.addEventListener('click', function() {
            this.panelInstance.windowAction("close", this.id);
        }.bind(this));
        
        this.min.addEventListener('click', function() {
            this.panelInstance.windowAction("minimize", this.id);
        }.bind(this));
        
        this.max.addEventListener('click', function() {
            // var content = this.guiWindow.getElementsByClassName("gui-window__content")[0];
            // if(content.style.display == "none") {
            //     content.style.display = "block";
            // } else {
            //     content.style.display = "none";
            // }
            this.guiWindow.setWidth("100%");
            this.guiWindow.setHeight("100%");
        }.bind(this));
        
        this.nwResize.addEventListener('mousedown', function(event) {
            this.isBeingResized = true;
            this.isResizingNW = true;
            this.cachedResizeX = event.clientX;
            this.cachedResizeY = event.clientY;
        }.bind(this));
        
        this.neResize.addEventListener('mousedown', function(event) {
            this.isBeingResized = true;
            this.isResizingNE = true;
            this.cachedResizeX = event.clientX;
            this.cachedResizeY = event.clientY;
        }.bind(this));
        
        this.swResize.addEventListener('mousedown', function(event) {
            this.isBeingResized = true;
            this.isResizingSW = true;
            this.cachedResizeX = event.clientX;
            this.cachedResizeY = event.clientY;
        }.bind(this));
        
        this.seResize.addEventListener('mousedown', function(event) {
            this.isBeingResized = true;
            this.isResizingSE = true;
            this.cachedResizeX = event.clientX;
            this.cachedResizeY = event.clientY;
        }.bind(this));
        
        document.addEventListener('mouseup', function(event) {
            if(this.isBeingResized) {
                this.isBeingResized = false;
                this.isResizingNW = false;
                this.isResizingNE = false;
                this.isResizingSW = false;
                this.isResizingSE = false;
            }
        }.bind(this));
        
        document.addEventListener('mousemove', function(event) {
            if(this.isBeingResized) {
                if(this.isResizingNW) {
                    console.log("test!");
                    change = this.cachedResizeX-event.clientX;
                    changeToApply = this.getWindowX() - change;
                    this.guiWindow.style.left = changeToApply+"px";
                    this.setWidth(this.getWidth()+change);
                    change = this.cachedResizeY-event.clientY;
                    changeToApply = this.getWindowY() - change;
                    this.guiWindow.style.top = changeToApply+"px";
                    this.setHeight(this.getHeight()+change);
                    
                    this.cachedResizeX = event.clientX;
                    this.cachedResizeY = event.clientY;
                } else if(this.isResizingNE) {
                    change = event.clientX-this.cachedResizeX;
                    changeToApply = (this.getWindowX()+this.getWidth()) + change;
                    this.guiWindow.style.right = changeToApply+"px";
                    this.setWidth(this.getWidth()+change);
                    change = this.cachedResizeY-event.clientY;
                    changeToApply = this.getWindowY() - change;
                    this.guiWindow.style.top = changeToApply+"px";
                    this.setHeight(this.getHeight()+change);
                    
                    this.cachedResizeX = event.clientX;
                    this.cachedResizeY = event.clientY;
                } else if(this.isResizingSW) {
                    change = this.cachedResizeX-event.clientX;
                    changeToApply = this.getWindowX() - change;
                    this.guiWindow.style.left = changeToApply+"px";
                    this.setWidth(this.getWidth()+change);
                    change = event.clientY-this.cachedResizeY;
                    changeToApply = (this.getWindowY()+this.getHeight()) - change;
                    this.guiWindow.style.bottom = changeToApply+"px";
                    this.setHeight(this.getHeight()+change);
                    
                    this.cachedResizeX = event.clientX;
                    this.cachedResizeY = event.clientY;
                } else if(this.isResizingSE) {
                    change = event.clientX-this.cachedResizeX;
                    changeToApply = (this.getWindowX()+this.getWidth()) + change;
                    this.guiWindow.style.right = changeToApply+"px";
                    this.setWidth(this.getWidth()+change);
                    change = event.clientY-this.cachedResizeY;
                    changeToApply = (this.getWindowY()+this.getHeight()) - change;
                    this.guiWindow.style.bottom = changeToApply+"px";
                    this.setHeight(this.getHeight()+change);
                    
                    this.cachedResizeX = event.clientX;
                    this.cachedResizeY = event.clientY;
                }
            }
        }.bind(this));
        
        // this.guiWindow.addEventListener('mousedown', function(event) {
        
        // });
        
        this.titleBar.addEventListener('mousedown', function(event) {
            this.isBeingDragged = true;
            this.cachedX = event.clientX;
            this.cachedY = event.clientY;
            if(!this.guiWindow.classList.contains("window-effect-transparency")) {
                this.guiWindow.classList.add("window-effect-transparency");
            }
        }.bind(this));
        
        document.addEventListener('mouseup', function(event) {
            if(this.isBeingDragged) {
                this.isBeingDragged = false;
                this.guiWindow.classList.remove("window-effect-transparency");
            }
        }.bind(this));
        
        // this.titleBar.addEventListener('mouseleave', function(event) {
        //     this.isBeingDragged = false;
        //     this.guiWindow.classList.remove("window-effect-transparency");
        // }.bind(this));
        
        document.addEventListener('mousemove', function(event) {
            if(this.isBeingDragged) {
                coord = this.guiWindow.getBoundingClientRect();
                resizeChangeHorizontal = (((event.clientX)-this.cachedX)+coord.left);
                resizeChangeVertical = (((event.clientY)-this.cachedY)+coord.top);
                this.guiWindow.style.left = resizeChangeHorizontal+"px";
                this.guiWindow.style.top = resizeChangeVertical+"px";
                coord = this.guiWindow.getBoundingClientRect();
                if(coord.top < 0) {
                    this.guiWindow.style.top = 0+"px";
                    this.cachedX = event.clientX;
                    this.cachedY = 0;
                } else {
                    this.cachedX = event.clientX;
                    this.cachedY = event.clientY;
                }
            }
        }.bind(this));
    }
    
    this.setWidth = function(width) {
        this.guiWindow.style.width = width+"px";
    }
    
    this.setHeight = function(height) {
        this.guiWindow.style.height = height+"px";
    }
    
    this.setBackgroundColor = function(bgrcolor) {
        this.guiWindow.querySelector(".gui-window__content").style.background = bgrcolor;
    }
    
    this.setTitle = function(title) {
        this.title.textContent = title;
        panelInstance.getPanelItem(this.id).setTitle(title);
    }
    
    this.setContent = function(content) {
        this.windowContent.textContent = content;
    }
    
    this.getWindowX = function() {
        return Number(this.guiWindow.style.left.split("px")[0]);
    }
    
    this.getWindowY = function() {
        return Number(this.guiWindow.style.top.split("px")[0]);
    }
    
    
    this.getWidth = function() {
        return Number(this.guiWindow.style.width.split("px")[0]);
    }
    
    this.getHeight = function() {
        return Number(this.guiWindow.style.height.split("px")[0]);
    }
    
    this.getBackgroundColor = function() {
        return this.guiWindow.querySelector(".gui-window__content").style.background;
    }
    
    this.getTitle = function() {
        return this.title.textContent;
    }
    
    this.getContent = function() {
        return this.windowContent.textContent;
    }
}