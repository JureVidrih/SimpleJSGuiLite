var Window = function(panelInstance, windowId) {
    this.maxTitleLength = 3000;
    this.titleText;
    this.remInPixels;
    this.domObj;
    this.getDOMObject = function() {
        return this.domObj;
    }
    this.panelInstance = panelInstance;
    this.isPinnable = true;
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
    this.minWidth = 350;
    this.minHeight = 400;
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
    this.snapEffectsToggled = false;
    this.isAtTop;
    this.isAtLeft;
    this.isAtRight;
    
    this.initialize = function() {
        this.createDOMObject();
        this.setTitle("M");
        this.remInPixels = parseInt(getComputedStyle(this.domObj).fontSize);
        this.setTitle("Window Title");
        this.guiWindow.style.top = "50px";
        this.guiWindow.style.left = "300px";
        this.setWidth(350);
        this.setHeight(400);
        this.registerEvents();
    }
    
    this.createDOMObject = function() {
        this.domObj = document.createElement("div");
        this.domObj.id = this.id;
        this.domObj.innerHTML =  '<div class="gui-window">'
        +'<div id="nw-resize-wrapper"><div id="nw-resize"></div></div>'+'<div id="ne-resize-wrapper"><div id="ne-resize"></div></div>'+'<div id="sw-resize-wrapper"><div id="sw-resize"></div></div>'+'<div id="se-resize-wrapper"><div id="se-resize"></div></div>'
        +'<div class="gui-window__titlebar">'
        +'<div class="gui-window__titlebar__buttons"><a class="window-btn window-btn-close" href="#"></a><a class="window-btn window-btn-minimize" href="#"></a><a class="window-btn window-btn-maximize" href="#"></a></div><div class="gui-window__titlebar__title">Window Title</div><img class="gui-window__titlebar__icon"></img>'
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
        this.windowIcon = this.domObj.querySelector(".gui-window__titlebar__icon");
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
                    change = this.cachedResizeX-event.clientX;
                    changeToApply = this.getWindowX() - change;
                    if(this.getWidth() > this.minWidth) {
                        this.guiWindow.style.left = changeToApply+"px";
                        this.setWidth(this.getWidth()+change);
                    } else {
                        if(change > 0) {
                            this.guiWindow.style.left = changeToApply+"px";
                            this.setWidth(this.getWidth()+change);
                        }
                    }
                    change = this.cachedResizeY-event.clientY;
                    changeToApply = this.getWindowY() - change;
                    if(this.getHeight() > this.minHeight) {
                        this.guiWindow.style.top = changeToApply+"px";
                        this.setHeight(this.getHeight()+change);
                    } else {
                        if(change > 0) {
                            this.guiWindow.style.top = changeToApply+"px";
                            this.setHeight(this.getHeight()+change);
                        }
                    }
                    
                    this.cachedResizeX = event.clientX;
                    this.cachedResizeY = event.clientY;
                } else if(this.isResizingNE) {
                    change = event.clientX-this.cachedResizeX;
                    changeToApply = this.getWindowX() - change;
                    if(this.getWidth() > this.minWidth) {
                        this.guiWindow.style.right = changeToApply+"px";
                        this.setWidth(this.getWidth()+change);
                    } else {
                        if(change > 0) {
                            this.guiWindow.style.right = changeToApply+"px";
                            this.setWidth(this.getWidth()+change);
                        }
                    }
                    change = this.cachedResizeY-event.clientY;
                    changeToApply = this.getWindowY() - change;
                    if(this.getHeight() > this.minHeight) {
                        this.guiWindow.style.top = changeToApply+"px";
                        this.setHeight(this.getHeight()+change);
                    } else {
                        if(change > 0) {
                            this.guiWindow.style.top = changeToApply+"px";
                            this.setHeight(this.getHeight()+change);
                        }
                    }
                    
                    this.cachedResizeX = event.clientX;
                    this.cachedResizeY = event.clientY;
                } else if(this.isResizingSW) {
                    change = this.cachedResizeX-event.clientX;
                    changeToApply = this.getWindowX() - change;
                    if(this.getWidth() > this.minWidth) {
                        this.guiWindow.style.left = changeToApply+"px";
                        this.setWidth(this.getWidth()+change);
                    } else {
                        if(change > 0) {
                            this.guiWindow.style.left = changeToApply+"px";
                            this.setWidth(this.getWidth()+change);
                        }
                    }
                    change = event.clientY-this.cachedResizeY;
                    changeToApply = this.getWindowY() - change;
                    if(this.getHeight() > this.minHeight) {
                        this.guiWindow.style.bottom = changeToApply+"px";
                        this.setHeight(this.getHeight()+change);
                    } else {
                        if(change > 0) {
                            this.guiWindow.style.bottom = changeToApply+"px";
                            this.setHeight(this.getHeight()+change);
                        }
                    }
                    
                    this.cachedResizeX = event.clientX;
                    this.cachedResizeY = event.clientY;
                } else if(this.isResizingSE) {
                    change = event.clientX-this.cachedResizeX;
                    changeToApply = this.getWindowX() - change;
                    if(this.getWidth() > this.minWidth) {
                        this.guiWindow.style.right = changeToApply+"px";
                        this.setWidth(this.getWidth()+change);
                    } else {
                        if(change > 0) {
                            this.guiWindow.style.right = changeToApply+"px";
                            this.setWidth(this.getWidth()+change);
                        }
                    }
                    change = event.clientY-this.cachedResizeY;
                    changeToApply = this.getWindowY() - change;
                    if(this.getHeight() > this.minHeight) {
                        this.guiWindow.style.bottom = changeToApply+"px";
                        this.setHeight(this.getHeight()+change);
                    } else {
                        if(change > 0) {
                            this.guiWindow.style.bottom = changeToApply+"px";
                            this.setHeight(this.getHeight()+change);
                        }
                    }
                    
                    this.cachedResizeX = event.clientX;
                    this.cachedResizeY = event.clientY;
                }
                
                this.calculateNewTitleLimits();
            }
        }.bind(this));
        
        this.guiWindow.addEventListener('mousedown', function(event) {
            if(event.button == 0) {
                this.focusWindow();
            }
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
                if(this.isAtTop || this.isAtLeft || this.isAtRight) {
                    this.toggleWindowSnapVisualEffects();
                }
                this.snapWindow();
                this.guiWindow.classList.remove("window-effect-transparency");
            }
        }.bind(this));
        
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
                this.checkForEnterCorners(event);
                this.checkForLeaveCorners(event);
            }
        }.bind(this));
    }
    
    this.checkForEnterCorners = function(event) {
        if(!this.isAtTop && event.clientY <= 0 && event.clientX > 10 && event.clientX < (document.body.clientWidth - 10)) {
            if(this.isAtLeft || this.isAtRight) {
                this.toggleWindowSnapVisualEffects();
            }
            this.isAtTop = true;
            this.toggleWindowSnapVisualEffects();
        } else if(!this.isAtLeft && event.clientX <= 10) {
            if(this.isAtTop) {
                this.toggleWindowSnapVisualEffects();
            }
            this.isAtLeft = true;
            this.toggleWindowSnapVisualEffects();
        } else if(!this.isAtRight && event.clientX >= (document.body.clientWidth-10)) {
            if(this.isAtTop) {
                this.toggleWindowSnapVisualEffects();
            }
            this.isAtRight = true;
            this.toggleWindowSnapVisualEffects();
        }
    }
    
    this.leaveCornerAction = function() {
        if(this.isSnapped) {
            this.snapWindow();
        }
        
        if(this.snapEffectsToggled) {
            this.toggleWindowSnapVisualEffects();
        }
    }
    
    this.checkForLeaveCorners = function() {
        if(this.isAtTop) {
            if(this.getWindowY() >= 10) {
                if(this.isAtLeft || this.isAtRight) {
                    this.toggleWindowSnapVisualEffects();
                }
                this.leaveCornerAction();
                this.isAtTop = false;
            }
        }
        if(this.isAtLeft) {
            if(this.getWindowX() >= 10) {
                if(this.isAtTop) {
                    this.toggleWindowSnapVisualEffects();
                }
                this.leaveCornerAction();
                this.isAtLeft = false;
            }
        }
        if(this.isAtRight) {
            if((this.getWindowX() + this.getWidth()) <= document.body.clientWidth - 10) {
                if(this.isAtTop) {
                    this.toggleWindowSnapVisualEffects();
                }
                this.leaveCornerAction();
                this.isAtRight = false;
            }
        }
    }
    
    this.toggleWindowSnapVisualEffects = function() {
        desktop = this.panelInstance.getDesktop().getDOMObject();
        visualEffect = null;
        
        // visualEffect = desktop.querySelector(".gui-desktop__window-snap-indicator-top");
        // visualEffect.classList.remove("window-snap-indicator-fade-in");
        // visualEffect = desktop.querySelector(".gui-desktop__window-snap-indicator-left");
        // visualEffect.classList.remove("window-snap-indicator-fade-in");
        // visualEffect = desktop.querySelector(".gui-desktop__window-snap-indicator-right");
        // visualEffect.classList.remove("window-snap-indicator-fade-in");
        
        if(this.isAtTop) {
            visualEffect = desktop.querySelector(".gui-desktop__window-snap-indicator-top");
            visualEffect.classList.toggle("window-snap-indicator-fade-in");
        }
        if(this.isAtLeft) {
            visualEffect = desktop.querySelector(".gui-desktop__window-snap-indicator-left");
            visualEffect.classList.toggle("window-snap-indicator-fade-in");
        }
        if(this.isAtRight) {
            visualEffect = desktop.querySelector(".gui-desktop__window-snap-indicator-right");
            visualEffect.classList.toggle("window-snap-indicator-fade-in");
        }
        
        if(visualEffect.classList.contains("window-snap-indicator-fade-in")) {
            this.snapEffectsToggled = true;
        } else {
            this.snapEffectsToggled = false;
        }
    }
    
    this.snapWindow = function() {
        if(!this.isSnapped) {
            if(this.isAtTop && !this.isMaximized) {
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
            if(this.isAtTop && this.isMaximized) {
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
            this.isSnapped = false;
            this.isAtTop = false;
            this.guiWindow.style.left = this.cachedXBeforeMax;
            // this.guiWindow.style.top = this.cachedYBeforeMax;
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
            this.isSnapped = true;
            this.isAtTop = true;
        }
    }
    
    this.removeDimensionFlags = function() {
        this.guiWindow.classList.remove("gui-window--size-fullhd");
        this.guiWindow.classList.remove("gui-window--size-hd");
        this.guiWindow.classList.remove("gui-window--size-vga");
        this.guiWindow.classList.remove("gui-window--size-qvga");
    }
    
    this.applyNewDimensionFlags = function(width) {
        if(width.indexOf("%") != -1) {
            width = width.substring(0, width.length-1);
            width = window.innerWidth * (width/100);
        }
        this.removeDimensionFlags();
        if(width >= 1920) {
            this.guiWindow.classList.add("gui-window--size-fullhd");
        } else if(width >= 1280) {
            this.guiWindow.classList.add("gui-window--size-hd");
        } else if(width >= 640) {
            this.guiWindow.classList.add("gui-window--size-vga");
        } else if(width >= 320) {
            this.guiWindow.classList.add("gui-window--size-qvga");
        }
    }
    
    this.unfocusAllWindows = function() {
        allWindows = panelInstance.getWindows();
        for(i = 0; i < allWindows.length; i++) {
            aWindow = allWindows[i].getDOMObject().querySelector(".gui-window");
            if(!aWindow.classList.contains("window-effect-shade")) {
                aWindow.classList.add("window-effect-shade");
            }
        }
    }

    this.focusWindow = function() {
        this.unfocusAllWindows();
        this.guiWindow.classList.remove("window-effect-shade");
    }
    
    this.setWidth = function(width) {
        width = width + "";
        this.applyNewDimensionFlags(width);
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
        this.titleText = title;
        if(title.length > this.maxTitleLength) {
            title = title.substring(0, (this.maxTitleLength-3)) + "...";
        }
        this.title.textContent = title;
        this.calculateNewTitleLimits();
        if(panelInstance.getPanelItem(this.id) != null) {
            panelInstance.getPanelItem(this.id).setTitle(title);
        }
    }
    
    this.calculateNewTitleLimits = function() {
        width = this.getWidth();
        leftLimit = this.domObj.querySelector(".window-btn-maximize").getBoundingClientRect().right - this.getWindowX();
        rightLimit = this.getWidth() - (this.domObj.querySelector(".gui-window__titlebar__icon").getBoundingClientRect().left-this.getWindowX());
        appliableWidth = width - (leftLimit + rightLimit);
        numOfChars = Math.floor(appliableWidth / this.remInPixels);
        if(this.titleText.length > numOfChars) {
            if(this.titleText[numOfChars-4] == " ") {
                this.title.textContent = this.titleText.substring(0, numOfChars-4)+"...";
            } else {
                this.title.textContent = this.titleText.substring(0, numOfChars-3)+"...";
            }
        } else {
            this.title.textContent = this.titleText;
        }
    }
    
    this.setWindowIcon = function(path) {
        this.windowIcon.setAttribute("src", path);
        this.panelInstance.getPanelItem(this.id).setIcon(path);
    }
    
    this.setContent = function(content) {
        this.windowContent.innerHTML = content;
    }
    
    this.setWindowX = function(x) {
        this.guiWindow.style.left = x+"px";
    }
    
    this.setWindowY = function(y) {
        this.guiWindow.style.top = y+"px";
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
    
    this.isWindowPinnable = function() {
        return this.isPinnable;
    }
}