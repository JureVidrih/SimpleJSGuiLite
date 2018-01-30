var Window = function(panelInstance, windowId) {
    this.domObj;
    this.getDOMObject = function() {
        return this.domObj;
    }
    this.panelInstance = panelInstance;
    this.id = windowId;
    this.getId = function() {
        return this.id;
    }
    this.panelItem = this.panelInstance.getPanelItem(this.id);
    this.getPanelItem = function() {
        return this.panelInstance.getPanelItem(this.id);
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

    this.isMaximized = false;
    this.cachedXBeforeMax;
    this.cachedYBeforeMax;
    this.cachedWidth = 0;
    this.cachedHeight = 0;
    this.isSnapped = false;
    this.isAtTop;
    this.isAtLeft;
    this.isAtRight;
    
    this.initialize = function() {
        this.createDOMObject();
        this.guiWindow.style.top = "50px";
        this.guiWindow.style.left = "300px";
        this.registerEvents();
    }
    
    this.createDOMObject = function() {
        this.domObj = document.createElement("div");
        this.domObj.id = this.id;
        this.domObj.innerHTML =  '<div class="gui-window">'
        +'<div id="nw-resize-wrapper"><div id="nw-resize"></div></div>'+'<div id="ne-resize-wrapper"><div id="ne-resize"></div></div>'+'<div id="sw-resize-wrapper"><div id="sw-resize"></div></div>'+'<div id="se-resize-wrapper"><div id="se-resize"></div></div>'
        +'<div class="gui-window__titlebar">'
        +'<div class="gui-window__titlebar__buttons"><a class="window-btn window-btn-close" href="#"></a><a class="window-btn window-btn-minimize" href="#"></a><a class="window-btn window-btn-maximize" href="#"></a></div><div class="gui-window__titlebar__title">Window Title</div>'
        +'</div>'
        +'<div class="gui-window__content">Window content.</div>'
        +'</div>';
        this.guiWindow = this.domObj.querySelector(".gui-window");
        this.nwResize = this.domObj.querySelector("#nw-resize");
        this.neResize = this.domObj.querySelector("#ne-resize");
        this.swResize = this.domObj.querySelector("#sw-resize");
        this.seResize = this.domObj.querySelector("#se-resize");
        this.titleBar = this.domObj.querySelector(".gui-window__titlebar");
        this.close = this.domObj.getElementsByClassName("window-btn-close")[0];
        this.min = this.domObj.getElementsByClassName("window-btn-minimize")[0];
        this.max = this.domObj.getElementsByClassName("window-btn-maximize")[0];
        this.title = this.domObj.querySelector(".gui-window__titlebar__title");
        this.windowContent = this.domObj.querySelector(".gui-window__content");
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
            this.maximizeWindow();
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
        
        this.guiWindow.addEventListener('mousemove', function(event) {

        }.bind(this));
        
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
                this.checkForCorners(event);
            }
        }.bind(this));
    }
    
    this.checkForCorners = function(event) {
        if(!this.isAtTop && event.clientY <= 0 && event.clientX >= 10 && event.clientX <= (document.body.clientWidth - 10)) {
            this.isAtTop = true;
            this.snapWindow();
        } else if(!this.isAtLeft && event.clientX <= 0) {
            this.isAtLeft = true;
            this.snapWindow();
        } else if(!this.isAtRight && event.clientX >= document.body.clientWidth) {
            this.isAtRight = true;
            this.snapWindow();
        }
        if(this.isAtTop) {
            if(event.clientY >= 10) {
                this.snapWindow();
                this.isAtTop = false;
            }
        }
        if(this.isAtLeft) {
            if(event.clientX >= 10) {
                this.snapWindow();
                this.isAtLeft = false;
            }
        }
        if(this.isAtRight) {
            if(event.clientX <= document.body.clientWidth - 10) {
                this.snapWindow();
                this.isAtRight = false;
            }
        }
    }

    this.snapWindow = function() {
        if(!this.isSnapped) {
            if(this.isAtTop) {
                this.maximizeWindow();
            } else if(this.isAtLeft) {
                this.cachedWidth = this.getWidth();
                this.cachedHeight = this.getHeight();
                this.guiWindow.style.left = "0px";
                this.guiWindow.style.top = "0px";
                this.setWidth("50%");
                this.setHeight("100%");
            } else if(this.isAtRight) {
                this.cachedWidth = this.getWidth();
                this.cachedHeight = this.getHeight();
                this.setWidth("50%");
                this.setHeight("100%");
                temp = (document.body.clientWidth - this.getWidth());
                this.guiWindow.style.left = temp + "px";
                this.guiWindow.style.top = "0px";
            }
            this.isSnapped = true;
        } else {
            if(this.isAtTop) {
                this.maximizeWindow();
            } else if(this.isAtLeft || this.isAtRight) {
                this.setWidth(this.cachedWidth);
                this.setHeight(this.cachedHeight);
            }
            this.isSnapped = false;
        }
    }

    this.maximizeWindow = function() {
        if(this.isMaximized) {
            this.isMaximized = false;
            this.guiWindow.style.left = this.cachedXBeforeMax;
            this.guiWindow.style.top = this.cachedYBeforeMax;
            this.setWidth(this.cachedWidth);
            this.setHeight(this.cachedHeight);
        } else {
            this.cachedXBeforeMax = this.guiWindow.style.left;
            this.cachedYBeforeMax = this.guiWindow.style.top;
            this.cachedWidth = this.getWidth();
            this.cachedHeight = this.getHeight();
            this.guiWindow.style.left = "0";
            this.guiWindow.style.top = "0";
            this.setWidth("100%");
            this.setHeight("100%");
            this.isMaximized = true;
        }
    }

    this.setWidth = function(width) {
        width = width + "";
        if(width.indexOf('%') != -1) {
            this.guiWindow.style.width = width;
        } else {
            this.guiWindow.style.width = width+"px";
        }
    }
    
    this.setHeight = function(height) {
        height = height + "";
        if(height.indexOf('%') != -1) {
            this.guiWindow.style.height = height;
        } else {
            this.guiWindow.style.height = height+"px";
        }
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
        if(this.guiWindow.style.width.indexOf("%") != -1) {
            return document.body.clientWidth * (Number(this.guiWindow.style.width.split("%")[0])/100);
        } else {
            return Number(this.guiWindow.style.width.split("px")[0]);
        }
    }
    
    this.getHeight = function() {
        if(this.guiWindow.style.height.indexOf("%") != -1) {
            return document.body.clientHeight * (Number(this.guiWindow.style.height.split("%")[0])/100);
        } else {
            return Number(this.guiWindow.style.height.split("px")[0]);
        }
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