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
            var content = this.guiWindow.getElementsByClassName("gui-window__content")[0];
            if(content.style.display == "none") {
                content.style.display = "block";
            } else {
                content.style.display = "none";
            }
        }.bind(this));

        this.nwResize.addEventListener('mousedown', function(event) {
            this.isBeingResized = true;
            this.cachedResizeX = event.clientX;
            this.cachedResizeY = event.clientY;
        }.bind(this));

        this.neResize.addEventListener('mousedown', function(event) {
            this.isBeingResized = true;
            this.cachedResizeX = event.clientX;
            this.cachedResizeY = event.clientY;
        }.bind(this));

        this.swResize.addEventListener('mousedown', function(event) {
            this.isBeingResized = true;
            this.cachedResizeX = event.clientX;
            this.cachedResizeY = event.clientY;
        }.bind(this));

        this.seResize.addEventListener('mousedown', function(event) {
            this.isBeingResized = true;
            this.cachedResizeX = event.clientX;
            this.cachedResizeY = event.clientY;
        }.bind(this));

        this.nwResize.addEventListener('mouseup', function(event) {
            this.isBeingResized = false;
        }.bind(this));

        this.neResize.addEventListener('mouseup', function(event) {
            this.isBeingResized = false;
        }.bind(this));

        this.swResize.addEventListener('mouseup', function(event) {
            this.isBeingResized = false;
        }.bind(this));

        this.seResize.addEventListener('mouseup', function(event) {
            this.isBeingResized = false;
        }.bind(this));

        this.nwResize.addEventListener('mousemove', function(event) {
            if(this.isBeingResized) {
                var change = this.cachedResizeX-event.clientX;
                var changeToApply = this.getWindowX() - change;
                this.guiWindow.style.left = changeToApply+"px";
                this.setWidth(this.getWidth()+change);
                change = this.cachedResizeY-event.clientY;
                changeToApply = this.getWindowY() - change;
                this.guiWindow.style.top = changeToApply+"px";
                this.setHeight(this.getHeight()+change);

                this.cachedResizeX = event.clientX;
                this.cachedResizeY = event.clientY;
            } 
        }.bind(this));

        this.neResize.addEventListener('mousemove', function(event) {
            if(this.isBeingResized) {
                var change = event.clientX-this.cachedResizeX;
                var changeToApply = (this.getWindowX()+this.getWidth()) + change;
                this.guiWindow.style.right = changeToApply+"px";
                this.setWidth(this.getWidth()+change);
                change = this.cachedResizeY-event.clientY;
                changeToApply = this.getWindowY() - change;
                this.guiWindow.style.top = changeToApply+"px";
                this.setHeight(this.getHeight()+change);

                this.cachedResizeX = event.clientX;
                this.cachedResizeY = event.clientY;
            } 
        }.bind(this));

        this.swResize.addEventListener('mousemove', function(event) {
            if(this.isBeingResized) {
                var change = this.cachedResizeX-event.clientX;
                var changeToApply = this.getWindowX() - change;
                this.guiWindow.style.left = changeToApply+"px";
                this.setWidth(this.getWidth()+change);
                change = event.clientY-this.cachedResizeY;
                changeToApply = (this.getWindowY()+this.getHeight()) - change;
                this.guiWindow.style.bottom = changeToApply+"px";
                this.setHeight(this.getHeight()+change);

                this.cachedResizeX = event.clientX;
                this.cachedResizeY = event.clientY;
            } 
        }.bind(this));

        this.seResize.addEventListener('mousemove', function(event) {
            if(this.isBeingResized) {
                var change = event.clientX-this.cachedResizeX;
                var changeToApply = (this.getWindowX()+this.getWidth()) + change;
                this.guiWindow.style.right = changeToApply+"px";
                this.setWidth(this.getWidth()+change);
                change = event.clientY-this.cachedResizeY;
                changeToApply = (this.getWindowY()+this.getHeight()) - change;
                this.guiWindow.style.bottom = changeToApply+"px";
                this.setHeight(this.getHeight()+change);

                this.cachedResizeX = event.clientX;
                this.cachedResizeY = event.clientY;
            } 
        }.bind(this));

        this.nwResize.addEventListener('mouseout', function(event) {
            this.isBeingResized = false;
        }.bind(this));

        this.neResize.addEventListener('mouseout', function(event) {
            this.isBeingResized = false;
        }.bind(this));

        this.swResize.addEventListener('mouseout', function(event) {
            this.isBeingResized = false;
        }.bind(this));

        this.seResize.addEventListener('mouseout', function(event) {
            this.isBeingResized = false;
        }.bind(this));

        this.guiWindow.addEventListener('mousedown', function(event) {

        });

        this.titleBar.addEventListener('mousedown', function(event) {
            this.isBeingDragged = true;
            this.cachedX = event.clientX;
            this.cachedY = event.clientY;
            if(!this.guiWindow.classList.contains("window-effect-transparency")) {
                this.guiWindow.classList.add("window-effect-transparency");
            }
        }.bind(this));

        this.guiWindow.addEventListener('mouseup', function(event) {
            this.isBeingDragged = false;
            this.guiWindow.classList.remove("window-effect-transparency");
        }.bind(this));

        this.guiWindow.addEventListener('mouseout', function(event) {
            this.isBeingDragged = false;
            this.guiWindow.classList.remove("window-effect-transparency");
        }.bind(this));

        this.guiWindow.addEventListener('mousemove', function(event) {
            if(this.isBeingDragged) {
                var coord = this.guiWindow.getBoundingClientRect();
                this.guiWindow.style.left = (((event.clientX)-this.cachedX)+coord.left)+"px";
                this.guiWindow.style.top = (((event.clientY)-this.cachedY)+coord.top)+"px";
                if(this.guiWindow.getBoundingClientRect().top < 0) {
                    this.guiWindow.style.top = 0+"px";
                    this.cachedX = event.clientX;
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