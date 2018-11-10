class Window {
    constructor() {
        this.status = "onscreen";
        this.isFocused = true;
        this.maxTitleLength = 3000;
        this.titleText;
        this.remInPixels;
        this.DOMObj;
        this.zIndex = 1;

        this.contextMenuContents = [];

        this.isPinnable = true;

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
        this.isResizingN = false;
        this.isResizingS = false;
        this.isResizingW = false;
        this.isResizingE = false;
        this.cachedResizeX = 0;
        this.cachedResizeY = 0;
        this.resizeListenerFullHD;
        this.resizeListenerHD;
        this.resizeListenerVGA;
        this.resizeListenerQVGA;
        this.wasListenerFullHDCalled = false;
        this.wasListenerHDCalled = false;
        this.wasListenerVGACalled = false;
        this.wasListenerQVGACalled = false;

        this.isMaximized = false;
        this.cachedXBeforeMax;
        this.cachedYBeforeMax;
        this.cachedWidth = 0;
        this.cachedHeight = 0;
        this.isSnapped = false;
        this.snapEffectsToggled = false;
        this.cachedXBeforeSnap;
        this.isAtTop;
        this.isAtLeft;
        this.isAtRight;
        this.createDOMObject();
        this.setTitle("M");
        this.remInPixels = parseInt(getComputedStyle(this.DOMObj).fontSize);
        this.setTitle("Window Title");
        this.setWindowIcon("themes/newtheme/assets/icons/default.png");
        this.guiWindow.style.top = "50px";
        this.guiWindow.style.left = "300px";
        this.setWidth(350);
        this.setHeight(400);
        this.registerEvents();
    }

    getDOMObject() {
        return this.DOMObj;
    }

    getStatus() {
        return this.status;
    }

    setID(newID) {
        this.id = newID;
    }

    getID() {
        return this.id;
    }

    createDOMObject() {
        this.DOMObj = document.createElement("div");
        this.DOMObj.id = this.id;
        this.DOMObj.innerHTML =  '<div class="gui-window">'
        +'<div id="nw-resize"></div>'+'<div id="ne-resize"></div>'+'<div id="sw-resize"></div>'+'<div id="se-resize"></div>'+'<div id="n-resize"></div>'+'<div id="s-resize"></div>'+'<div id="w-resize"></div>'+'<div id="e-resize"></div>'
        +'<div class="gui-window__titlebar">'
        +'<div class="gui-window__titlebar__buttons"><a class="window-btn window-btn-close" href="#"></a><a class="window-btn window-btn-minimize" href="#"></a><a class="window-btn window-btn-maximize" href="#"></a></div><div class="gui-window__titlebar__title">Window Title</div><img class="gui-window__titlebar__icon"></img>'
        +'</div>'
        +'<div class="gui-window__content">Window content.</div>'
        +'</div>';
        this.guiWindow = this.DOMObj.querySelector(".gui-window");
        this.nwResize = this.DOMObj.querySelector("#nw-resize");
        this.neResize = this.DOMObj.querySelector("#ne-resize");
        this.swResize = this.DOMObj.querySelector("#sw-resize");
        this.seResize = this.DOMObj.querySelector("#se-resize");
        this.nResize = this.DOMObj.querySelector("#n-resize");
        this.sResize = this.DOMObj.querySelector("#s-resize");
        this.wResize = this.DOMObj.querySelector("#w-resize");
        this.eResize = this.DOMObj.querySelector("#e-resize");
        this.titleBar = this.DOMObj.querySelector(".gui-window__titlebar");
        this.close = this.DOMObj.getElementsByClassName("window-btn-close")[0];
        this.min = this.DOMObj.getElementsByClassName("window-btn-minimize")[0];
        this.max = this.DOMObj.getElementsByClassName("window-btn-maximize")[0];
        this.icon = this.DOMObj.querySelector(".gui-window__titlebar__icon");
        this.title = this.DOMObj.querySelector(".gui-window__titlebar__title");
        this.windowIcon = this.DOMObj.querySelector(".gui-window__titlebar__icon");
        this.windowContent = this.DOMObj.querySelector(".gui-window__content");
    }

    registerEvents() {
        this.close.addEventListener('click', function() {
            SimpleJSGui.getWindowManager().windowAction("close", this);
        }.bind(this));

        this.min.addEventListener('click', function() {
            SimpleJSGui.getWindowManager().windowAction("minimize", this);
        }.bind(this));

        this.max.addEventListener('click', function() {
            // let content = this.guiWindow.getElementsByClassName("gui-window__content")[0];
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

        this.nResize.addEventListener('mousedown', function(event) {
            this.isBeingResized = true;
            this.isResizingN = true;
            this.cachedResizeX = event.clientX;
            this.cachedResizeY = event.clientY;
        }.bind(this));

        this.sResize.addEventListener('mousedown', function(event) {
            this.isBeingResized = true;
            this.isResizingS = true;
            this.cachedResizeX = event.clientX;
            this.cachedResizeY = event.clientY;
        }.bind(this));

        this.wResize.addEventListener('mousedown', function(event) {
            this.isBeingResized = true;
            this.isResizingW = true;
            this.cachedResizeX = event.clientX;
            this.cachedResizeY = event.clientY;
        }.bind(this));

        this.eResize.addEventListener('mousedown', function(event) {
            this.isBeingResized = true;
            this.isResizingE = true;
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
                this.isResizingN = false;
                this.isResizingS = false;
                this.isResizingW = false;
                this.isResizingE = false;
            }
        }.bind(this));

        document.addEventListener('mousemove', function(event) {
            if(this.isBeingResized) {
                if(this.isResizingNW) {
                    let change = this.cachedResizeX-event.clientX;
                    let changeToApply = this.getWindowX() - change;
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
                    let change = event.clientX-this.cachedResizeX;
                    let changeToApply = this.getWindowX() - change;
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
                    let change = this.cachedResizeX-event.clientX;
                    let changeToApply = this.getWindowX() - change;
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
                    let change = event.clientX-this.cachedResizeX;
                    let changeToApply = this.getWindowX() - change;
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
                } else if(this.isResizingN) {
                    let change = this.cachedResizeY-event.clientY;
                    let changeToApply = this.getWindowY() - change;
                    if(this.getHeight() > this.minHeight) {
                        this.guiWindow.style.top = changeToApply+"px";
                        this.setHeight(this.getHeight()+change);
                    } else {
                        if(change > 0) {
                            this.guiWindow.style.top = changeToApply+"px";
                            this.setHeight(this.getHeight()+change);
                        }
                    }

                    this.cachedResizeY = event.clientY;
                } else if(this.isResizingS) {
                    let change = event.clientY-this.cachedResizeY;
                    let changeToApply = this.getWindowY() - change;
                    if(this.getHeight() > this.minHeight) {
                        this.guiWindow.style.bottom = changeToApply+"px";
                        this.setHeight(this.getHeight()+change);
                    } else {
                        if(change > 0) {
                            this.guiWindow.style.bottom = changeToApply+"px";
                            this.setHeight(this.getHeight()+change);
                        }
                    }

                    this.cachedResizeY = event.clientY;
                } else if(this.isResizingW) {
                    let change = this.cachedResizeX-event.clientX;
                    let changeToApply = this.getWindowX() - change;
                    if(this.getWidth() > this.minWidth) {
                        this.guiWindow.style.left = changeToApply+"px";
                        this.setWidth(this.getWidth()+change);
                    } else {
                        if(change > 0) {
                            this.guiWindow.style.left = changeToApply+"px";
                            this.setWidth(this.getWidth()+change);
                        }
                    }

                    this.cachedResizeX = event.clientX;
                } else if(this.isResizingE) {
                    let change = event.clientX-this.cachedResizeX;
                    let changeToApply = this.getWindowX() - change;
                    if(this.getWidth() > this.minWidth) {
                        this.guiWindow.style.right = changeToApply+"px";
                        this.setWidth(this.getWidth()+change);
                    } else {
                        if(change > 0) {
                            this.guiWindow.style.right = changeToApply+"px";
                            this.setWidth(this.getWidth()+change);
                        }
                    }

                    this.cachedResizeX = event.clientX;
                }

                this.calculateNewTitleLimits();
            }
        }.bind(this));

        this.guiWindow.addEventListener('mousedown', function(event) {
            if(event.button == 0) {
                this.focusWindow();
                let presentWindow = SimpleJSGui.getWindowManager().getWindowOrderNumber(this);
                SimpleJSGui.getWindowManager().sortWindowsByZIndex(presentWindow);
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

        this.titleBar.addEventListener('dblclick', function(event) {
            this.maximizeWindow();
        }.bind(this));

        document.addEventListener('mouseup', function(event) {
            if(this.isBeingDragged) {
                this.isBeingDragged = false;
                if(!this.isMaximized && (this.isAtTop || this.isAtLeft || this.isAtRight)) {
                    this.snapWindow();
                }
                this.guiWindow.classList.remove("window-effect-transparency");
            }
        }.bind(this));

        document.addEventListener('mousemove', function(event) {
            if(this.isBeingDragged) {
                let coord = this.guiWindow.getBoundingClientRect();
                let resizeChangeHorizontal = (((event.clientX)-this.cachedX)+coord.left);
                let resizeChangeVertical = (((event.clientY)-this.cachedY)+coord.top);
                this.guiWindow.style.left = resizeChangeHorizontal+"px";
                this.guiWindow.style.top = resizeChangeVertical+"px";
                coord = this.guiWindow.getBoundingClientRect();
                if(coord.top < 0) {
                    this.guiWindow.style.top = 0+"px";
                    this.cachedX = event.clientX;
                    this.setWindowY(0);
                } else {
                    this.cachedX = event.clientX;
                    this.cachedY = event.clientY;
                }
                this.checkForEnterCorners(event);
                this.checkForLeaveCorners(event);
            }
        }.bind(this));
    }

    checkForEnterCorners(event) {
        if(!this.isAtTop && this.getWindowY() <= 0) {
            if(this.getWindowX() > 10 && ((this.getWindowX() + this.getWidth()) < (document.body.clientWidth-10))) {
                this.isAtTop = true;
                this.toggleWindowSnapVisualEffects("top");
            }
        }
        if(!this.isMaximized) {
            if(!this.isAtLeft && this.getWindowX() < 10) {
                this.isAtLeft = true;
                this.toggleWindowSnapVisualEffects("left");
            }
            if(!this.isAtRight && (this.getWindowX() + this.getWidth()) > (document.body.clientWidth-10)) {
                this.isAtRight = true;
                this.toggleWindowSnapVisualEffects("right");
            }
        }
    }

    checkForLeaveCorners() {
        if(this.isAtTop) {
            if(this.getWindowY() >= 10 || this.getWindowX() < 10 || ((this.getWindowX() + this.getWidth()) > (document.body.clientWidth-10))) {
                this.isAtTop = false;
                this.leaveCornerAction("top");
            }
        }
        if(this.isAtLeft) {
            if(this.getWindowX() > 10) {
                this.isAtLeft = false;
                this.leaveCornerAction("left");
            }
        }
        if(this.isAtRight) {
            if((this.getWindowX() + this.getWidth()) < (document.body.clientWidth-10)) {
                this.isAtRight = false;
                this.leaveCornerAction("right");
            }
        }
    }

    leaveCornerAction(indicator) {
        if(this.isSnapped) {
            this.snapWindow();
        }

        if(this.snapEffectsToggled) {
            this.toggleWindowSnapVisualEffects(indicator);
        }
    }

    toggleWindowSnapVisualEffects(indicator) {
        let desktop = SimpleJSGui.getDesktop().getDOMObject();
        let visualEffectTop = desktop.querySelector(".gui-desktop__window-snap-indicator-top");
        let visualEffectLeft = desktop.querySelector(".gui-desktop__window-snap-indicator-left");
        let visualEffectRight = desktop.querySelector(".gui-desktop__window-snap-indicator-right");

        if(indicator == "top") {
            visualEffectTop.classList.toggle("window-snap-indicator-fade-in");
        }
        if(indicator == "left") {
            visualEffectLeft.classList.toggle("window-snap-indicator-fade-in");
        }
        if(indicator == "right") {
            visualEffectRight.classList.toggle("window-snap-indicator-fade-in");
        }

        let checkTop = visualEffectTop.classList.contains("window-snap-indicator-fade-in");
        let checkLeft = visualEffectLeft.classList.contains("window-snap-indicator-fade-in");
        let checkRight = visualEffectRight.classList.contains("window-snap-indicator-fade-in");

        if(checkTop || checkLeft || checkRight) {
            this.snapEffectsToggled = true;
        } else {
            this.snapEffectsToggled = false;
        }
    }
    
    turnWindowSnapEffectsOff() {
        let visualEffectTop = desktop.querySelector(".gui-desktop__window-snap-indicator-top");
        let visualEffectLeft = desktop.querySelector(".gui-desktop__window-snap-indicator-left");
        let visualEffectRight = desktop.querySelector(".gui-desktop__window-snap-indicator-right");

        if(visualEffectTop.classList.contains("window-snap-indicator-fade-in")) {
            visualEffectTop.classList.remove("window-snap-indicator-fade-in");
        }
        if(visualEffectLeft.classList.contains("window-snap-indicator-fade-in")) {
            visualEffectLeft.classList.remove("window-snap-indicator-fade-in");
        }
        if(visualEffectRight.classList.contains("window-snap-indicator-fade-in")) {
            visualEffectRight.classList.remove("window-snap-indicator-fade-in");
        }

        this.snapEffectsToggled = false;
    }

    snapWindow() {
        if(!this.isSnapped) {
            if(!this.getDOMObject().querySelector(".gui-window").classList.contains("gui-window--no-borders") && !this.getDOMObject().querySelector(".gui-window__titlebar").classList.contains("gui-window__titlebar--no-borders")) {
                this.getDOMObject().querySelector(".gui-window").classList.add("gui-window--no-borders");
                this.getDOMObject().querySelector(".gui-window__titlebar").classList.add("gui-window__titlebar--no-borders");
            }
            if(this.isAtTop && !this.isMaximized) {
                this.maximizeWindow();
                this.toggleWindowSnapVisualEffects("top");
                this.isSnapped = true;
            } else if(this.isAtLeft) {
                this.cachedWidth = this.getWidth();
                this.cachedHeight = this.getHeight();
                this.cachedXBeforeSnap = 0;
                this.guiWindow.style.left = "0px";
                this.guiWindow.style.top = "0px";
                this.setWidth("50%");
                this.setHeight(SimpleJSGui.getDesktop().getDesktopDOMObject().clientHeight);
                this.toggleWindowSnapVisualEffects("left");
            } else if(this.isAtRight) {
                this.cachedWidth = this.getWidth();
                this.cachedHeight = this.getHeight();
                this.cachedXBeforeSnap = document.body.clientWidth-this.getWidth();
                this.setWidth("50%");
                this.setHeight(SimpleJSGui.getDesktop().getDesktopDOMObject().clientHeight);
                let temp = (document.body.clientWidth - this.getWidth());
                this.guiWindow.style.left = temp + "px";
                this.guiWindow.style.top = "0px";
                this.toggleWindowSnapVisualEffects("right");
            }
            if((this.isAtTop && !this.isMaximized) || this.isAtLeft || this.isAtRight) {
                this.isSnapped = true;
            }
            if(this.getDOMObject().querySelector(".gui-window").classList.contains("window-effect-transparency")) {
                this.getDOMObject().querySelector(".gui-window").classList.remove("window-effect-transparency");
            }
            this.turnWindowSnapEffectsOff();
        } else {
            if(this.getDOMObject().querySelector(".gui-window").classList.contains("gui-window--no-borders") && this.getDOMObject().querySelector(".gui-window__titlebar").classList.contains("gui-window__titlebar--no-borders")) {
                this.getDOMObject().querySelector(".gui-window").classList.remove("gui-window--no-borders");
                this.getDOMObject().querySelector(".gui-window__titlebar").classList.remove("gui-window__titlebar--no-borders");
            }
            if(!this.isAtTop && this.isMaximized) {
                this.maximizeWindow();
            } else if(!this.isAtLeft || !this.isAtRight) {
                this.setWidth(this.cachedWidth);
                this.setHeight(this.cachedHeight);
                this.setWindowX(this.cachedXBeforeSnap);
            }
            this.isSnapped = false;
            this.turnWindowSnapEffectsOff();
        }
    }

    maximizeWindow() {
        if(this.isMaximized) {
            this.isMaximized = false;
            this.isSnapped = false;
            this.isAtTop = false;
            this.setWindowX(this.cachedXBeforeMax);
            if(!this.isBeingDragged) {
                this.setWindowY(this.cachedYBeforeMax);
            }
            this.setWidth(this.cachedWidth);
            this.setHeight(this.cachedHeight);
            this.getDOMObject().querySelector(".gui-window").classList.remove("gui-window--no-borders");
            this.getDOMObject().querySelector(".gui-window__titlebar").classList.remove("gui-window__titlebar--no-borders");
        } else {
            this.cachedXBeforeMax = this.getWindowX();
            this.cachedYBeforeMax = this.getWindowY();
            this.cachedWidth = this.getWidth();
            this.cachedHeight = this.getHeight();
            this.guiWindow.style.left = "0";
            this.guiWindow.style.top = "0";
            this.setWidth("100%");
            this.setHeight(SimpleJSGui.getDesktop().getDesktopDOMObject().clientHeight);
            this.getDOMObject().querySelector(".gui-window").classList.add("gui-window--no-borders");
            this.getDOMObject().querySelector(".gui-window__titlebar").classList.add("gui-window__titlebar--no-borders");
            this.isMaximized = true;
            this.isSnapped = true;
            this.isAtTop = true;
        }
    }

    setResizeListenerFullHD(newListener) {
        this.resizeListenerFullHD = newListener;
    }

    setResizeListenerHD(newListener) {
        this.resizeListenerHD = newListener;
    }

    setResizeListenerVGA(newListener) {
        this.resizeListenerVGA = newListener;
    }

    setResizeListenerQVGA(newListener) {
        this.resizeListenerQVGA = newListener;
    }

    removeDimensionFlags() {
        this.guiWindow.classList.remove("gui-window--size-fullhd");
        this.guiWindow.classList.remove("gui-window--size-hd");
        this.guiWindow.classList.remove("gui-window--size-vga");
        this.guiWindow.classList.remove("gui-window--size-qvga");
    }

    applyNewDimensionFlags(width) {
        if(width.indexOf("%") != -1) {
            width = width.substring(0, width.length-1);
            width = window.innerWidth * (width/100);
        }
        this.removeDimensionFlags();
        if(width >= 1920) {
            if(this.resizeListenerFullHD && !this.wasListenerFullHDCalled) {
                this.resizeListenerFullHD();
                this.wasListenerFullHDCalled = true;
                this.wasListenerHDCalled = false;
                this.wasListenerVGACalled = false;
                this.wasListenerQVGACalled = false;
            }
            this.guiWindow.classList.add("gui-window--size-fullhd");
        } else if(width >= 1280) {
            if(this.resizeListenerHD && !this.wasListenerHDCalled) {
                this.resizeListenerHD();
                this.wasListenerHDCalled = true;
                this.wasListenerFullHDCalled = false;
                this.wasListenerVGACalled = false;
                this.wasListenerQVGACalled = false;
            }
            this.guiWindow.classList.add("gui-window--size-hd");
        } else if(width >= 640) {
            if(this.resizeListenerVGA && !this.wasListenerVGACalled) {
                this.resizeListenerVGA();
                this.wasListenerVGACalled = true;
                this.wasListenerFullHDCalled = false;
                this.wasListenerHDCalled = false;
                this.wasListenerQVGACalled = false;
            }
            this.guiWindow.classList.add("gui-window--size-vga");
        } else if(width < 640) {
            if(this.resizeListenerQVGA && !this.wasListenerQVGACalled) {
                this.resizeListenerQVGA();
                this.wasListenerQVGACalled = true;
                this.wasListenerFullHDCalled = false;
                this.wasListenerHDCalled = false;
                this.wasListenerVGACalled = false;
            }
            this.guiWindow.classList.add("gui-window--size-qvga");
        }
    }

    unfocusAllWindows() {
        // console.log("unfocusAllWindows enters...");
        let allWindows = SimpleJSGui.getWindowManager().getWindows();
        for(let i = 0; i < allWindows.length; i++) {
            let aWindow = allWindows[i].getDOMObject().querySelector(".gui-window");
            if(!aWindow.classList.contains("window-effect-shade")) {
                aWindow.classList.add("window-effect-shade");
            }
            allWindows[i].isFocused = false;
        }
        SimpleJSGui.getWindowManager().notifyListDisplays();
    }

    focusWindow() {
        // console.log("focusWindow enters...");
        this.unfocusAllWindows();
        this.guiWindow.classList.remove("window-effect-shade");
        this.isFocused = true;
        SimpleJSGui.getWindowManager().notifyListDisplays();
    }

    setWidth(width) {
        if(width < this.minWidth) {
            return;
        }
        width = width + "";
        this.applyNewDimensionFlags(width);
        if(width.indexOf('%') != -1) {
            this.guiWindow.style.width = width;
        } else {
            this.guiWindow.style.width = width+"px";
        }
        this.calculateNewTitleLimits();
    }

    setHeight(height) {
        if(height < this.minHeight) {
            return;
        }
        height = height + "";
        if(height.indexOf('%') != -1) {
            this.guiWindow.style.height = height;
        } else {
            this.guiWindow.style.height = height+"px";
        }
        this.calculateNewTitleLimits();
    }

    setBackgroundColor(bgrcolor) {
        this.guiWindow.querySelector(".gui-window__content").style.background = bgrcolor;
    }

    setTitle(title) {
        this.titleText = title;
        if(title.length > this.maxTitleLength) {
            title = title.substring(0, (this.maxTitleLength-3)) + "...";
        }
        this.title.textContent = title;
        this.calculateNewTitleLimits();

        SimpleJSGui.getWindowManager().notifyListDisplays();
    }

    calculateNewTitleLimits() {
        let width = this.getWidth();
        let leftLimit = this.DOMObj.querySelector(".window-btn-maximize").getBoundingClientRect().right - this.getWindowX();
        let rightLimit = this.getWidth() - (this.DOMObj.querySelector(".gui-window__titlebar__icon").getBoundingClientRect().left-this.getWindowX());
        let appliableWidth = width - (leftLimit + rightLimit);
        let numOfChars = Math.floor(appliableWidth / this.remInPixels);
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

    setWindowIcon(path) {
        this.windowIcon.setAttribute("src", path);
        SimpleJSGui.getWindowManager().notifyListDisplays();
    }

    enableContentPadding(value) {
        if(value && this.windowContent.classList.contains("gui-window__content--no-padding")) {
            this.windowContent.classList.remove("gui-window__content--no-padding");
        } else if(!value && !this.windowContent.classList.contains("gui-window__content--no-padding")) {
            this.windowContent.classList.add("gui-window__content--no-padding");
        }
    }

    setContent(content) {
        if(content instanceof Object) {
            this.content = content;
            this.windowContent.innerHTML = "";
            this.windowContent.appendChild(this.content);
        } else if (!(content instanceof Object)) {
            this.content = content;
            this.windowContent.innerHTML = this.content;
        }
    }

    setZIndex(z) {
        this.zIndex = z;
        this.guiWindow.style.zIndex = this.zIndex;
    }

    getZIndex() {
        return this.zIndex;
    }

    setWindowX(x) {
        this.guiWindow.style.left = x+"px";
    }

    setWindowY(y) {
        this.guiWindow.style.top = y+"px";
    }

    getWindowX() {
        return Number(this.guiWindow.style.left.split("px")[0]);
    }

    getWindowY() {
        return Number(this.guiWindow.style.top.split("px")[0]);
    }

    getWidth() {
        if(this.guiWindow.style.width.indexOf("%") != -1) {
            return document.body.clientWidth * (Number(this.guiWindow.style.width.split("%")[0])/100);
        } else {
            return Number(this.guiWindow.style.width.split("px")[0]);
        }
    }

    getHeight() {
        if(this.guiWindow.style.height.indexOf("%") != -1) {
            return document.body.clientHeight * (Number(this.guiWindow.style.height.split("%")[0])/100);
        } else {
            return Number(this.guiWindow.style.height.split("px")[0]);
        }
    }

    getBackgroundColor() {
        return this.guiWindow.querySelector(".gui-window__content").style.background;
    }

    getTitle() {
        return this.title.textContent;
    }

    getContent() {
        return this.content;
    }

    getContextMenuContents() {
        return this.contextMenuContents;
    }

    addAnItem(item, listener) {
        this.contextMenuContents.push({name: item, action: listener});

        SimpleJSGui.getWindowManager().notifyListDisplays();

        return this;
    }

    addASeparator() {
        this.contextMenuContents.push("Separator");

        SimpleJSGui.getWindowManager().notifyListDisplays();

        return this;
    }

    isWindowPinnable() {
        return this.isPinnable;
    }

    isMaximized() {
        return this.isMaximized;
    }

    isSnapped() {
        return this.isSnapped;
    }
}

export default Window;