     var Panel = function() {
        this.windows = [];
        this.windowsStatus = new Map();
        this.leftContainer = document.createElement("div");
        this.leftContainer.classList.add("gui-panel__left-container");
        this.rightContainer = document.createElement("div");
        this.rightContainer.classList.add("gui-panel__right-container");
        this.panelMenu = new PanelMenu();
        this.panelMenu.addAnItem("Test #1", () => console.log("test 1")).addASeparator().addAnItem("Test #2", () => console.log("test 2"));
        this.panelClock = new PanelItemClock(this);
        this.desktop = SimpleJSGui.getDesktop();
    
        this.initialize = function() {
            this.DOMObj = document.createElement("div");
            this.DOMObj.classList.add("gui-panel");
            this.DOMObj.id = "panelInstance1";
            this.panelInstance = this.DOMObj.id;
            this.leftContainer.appendChild(this.panelMenu.getDOMObject());
            this.rightContainer.appendChild(this.panelClock.getTemplate());
            this.DOMObj.appendChild(this.leftContainer);
            this.DOMObj.appendChild(this.rightContainer);
            this.panelClock.startTheClock();
            document.body.appendChild(this.DOMObj);
            this.taskBar = new TaskBar();
            this.leftContainer.appendChild(this.taskBar.getDOMObject());
            SimpleJSGui.registerPanel(this);

            document.addEventListener('mousedown', function(event) {
                if(event.button == 0 && this.windows.length > 0) {
                    element = event.target;
                    isAChild = false;
                    do {
                        if(element.classList && element.classList.contains("gui-window")) {
                            isAChild = true;
                            break;
                        }
                        element = element.parentNode;
                    } while(element);
                    if(!isAChild) {
                        this.windows[0].unfocusAllWindows();
                    }
                }
            }.bind(this));
        }

        this.addAWindow = function(newWindow) {
            this.windows.push(newWindow);
            this.windowsStatus.set(newWindow.getId(), "active");
            this.taskBar.addAnItem(new PanelItem(newWindow.getId(), newWindow.getTitle()));
            var node = this.taskBar.getItems()[this.taskBar.getItems().length-1];
            var nodeElem = node.getDOMObject();
            nodeElem.classList.add("gui-panel__task-bar__item--active");
            nodeElem.addEventListener('click', function(event) {
                var status = this.windowsStatus.get(newWindow.getId());
                if(status == "active") {
                    this.windowAction("minimize", newWindow.getId());
                    contextMenu = nodeElem.querySelector(".gui-panel__task-bar__item__context-menu");
                    if(contextMenu.style.display == "inline-block") {
                        contextMenu.style.display = "none";
                    }
                } else if(status == "unactive") {
                    this.windowAction("maximize", newWindow.getId());
                    contextMenu = nodeElem.querySelector(".gui-panel__task-bar__item__context-menu");
                    if(contextMenu.style.display == "inline-block") {
                        contextMenu.style.display = "none";
                    }
                }
            }.bind(this));
            nodeElem.addEventListener('contextmenu', function(event) {
                event.preventDefault();
                contextMenu = nodeElem.querySelector(".gui-panel__task-bar__item__context-menu");
                items = this.taskBar.getItems();
                for(i = 0; i < items.length; i++) {
                    if(items[i].getId() != newWindow.getId()) {
                        anItem = items[i].getDOMObject().querySelector(".gui-panel__task-bar__item__context-menu");
                        if(anItem.classList.contains("context-menu-fadein")) {
                            anItem.classList.remove("context-menu-fadein");
                        }
                    }
                }
                this.panelMenu.close();
                // if(contextMenu.style.display == "none") {
                //     contextMenu.style.display = "block";
                //     contextMenu.classList.add("context-menu-fadein");
                // } else {
                //     contextMenu.classList.remove("context-menu-fadein");
                //     contextMenu.style.display = "none";
                node.getContextMenu().setBottomY((window.innerHeight-this.DOMObj.getBoundingClientRect().top));
                contextMenu.classList.toggle("context-menu-fadein");
                var status = this.windowsStatus.get(newWindow.getId());
                if(status == "unactive") {
                    this.windowAction("minimize", newWindow.getId());
                }
                return false;
            }.bind(this), false);
            if(newWindow.isWindowPinnable()) {
                var items = this.taskBar.getItems();
                items[items.length-1].getContextMenu().addAnItem("Pin this app", function() {}).addASeparator();
            }
            document.body.appendChild(newWindow.getDOMObject());
            newWindow.focusWindow();
        }
        this.panelInstance = null;
        this.selectInstance = function(instanceId) {
            this.panelInstance = instanceId;
        }
    
        this.windowAction = function(actionToDo, id) {
            if(actionToDo == "minimize") {
                var status = this.windowsStatus.get(id);
                if(status == "active") {
                    var windowId = this.getWindowOrderNumberById(id);
                    var node = document.getElementsByClassName("gui-panel__task-bar__item")[windowId];
                    this.windowsStatus.set(id, "unactive");
                    node.classList.remove("gui-panel__task-bar__item--active");
                    document.getElementById(this.windows[windowId].getId()).style.display = "none";
                } else if(status == "unactive") {
                    var windowId = this.getWindowOrderNumberById(id);
                    var node = document.getElementsByClassName("gui-panel__task-bar__item")[windowId];
                    this.windowsStatus.set(id, "active");
                    node.classList.add("gui-panel__task-bar__item--active");
                    document.getElementById(this.windows[windowId].getId()).style.display = "block";
                }
            } else if(actionToDo == "maximize") {
                var windowId = this.getWindowOrderNumberById(id);
                var node = document.getElementsByClassName("gui-panel__task-bar__item")[windowId];
                this.windowsStatus.set(id, "active");
                node.classList.add("gui-panel__task-bar__item--active");
                this.windows[windowId].focusWindow();
                document.getElementById(this.windows[windowId].getId()).style.display = "block";
            } else if(actionToDo == "close") {
                var windowId = this.getWindowOrderNumberById(id);
                var windownode = document.getElementsByClassName("gui-window")[windowId];
                var itemnode = document.getElementsByClassName("gui-panel__task-bar__item")[windowId];
                windownode.remove();
                itemnode.remove();
                this.windows.splice(windowId, 1);
                this.windowsStatus.delete(windowId);
                this.taskBar.getItems().splice(windowId, 1);
            }
        }

        this.getWindows = function() {
            return this.windows;
        }

        this.getWindowOrderNumberById = function(id) {
            for(i = 0; i < this.windows.length; i++) {
                if(this.windows[i].getId() == id) {
                    return i;
                }
            }
        }
    
        this.getPanelItem = function(windowId) {
            var items = this.taskBar.getItems();
            for(i = 0; i < items.length; i++) {
                if(items[i].getId() == windowId) {
                    return items[i];
                }
            }
            return null;
        }

        this.calculateMinimalWidth = function() {
            var dummyPanelItem = new PanelItem("DUMMY_ID", "DummyText");
            return this.panelMenu.getDOMObject().clientWidth+2 + dummyPanelItem.getItemDefaultWidth() + this.taskBar.getLineSwitcher().getDOMObject().clientWidth + this.rightContainer.clientWidth;
        }

        this.initialize();
    }