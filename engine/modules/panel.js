import PanelMenu from './panel-menu';
import PanelItemClock from './panel-clock';
import TaskBar from './task-bar';
     
     class Panel {
            constructor() {
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
            this.DOMObj = document.createElement("div");
            this.DOMObj.classList.add("gui-panel");
            this.DOMObj.id = "panelInstance1";
            this.panelInstance = this.DOMObj.id;
            this.leftContainer.appendChild(this.panelMenu.getDOMObject());
            this.rightContainer.appendChild(this.panelClock.getDOMObject());
            this.DOMObj.appendChild(this.leftContainer);
            this.DOMObj.appendChild(this.rightContainer);
            this.panelClock.startTheClock();
            document.body.appendChild(this.DOMObj);
            this.taskBar = new TaskBar();
            this.leftContainer.appendChild(this.taskBar.getDOMObject());
            SimpleJSGui.getWindowManager().registerWindowListDisplay(this);

            document.addEventListener('mousedown', function(event) {
                if(event.button == 0 && this.windows.length > 0) {
                    let element = event.target;
                    let isAChild = false;
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

        notifyListChanged() {
            this.windows = SimpleJSGui.getWindowManager().getWindows();
        }

        addAWindow(newWindow) {
            this.windows.push(newWindow);
            this.windowsStatus.set(newWindow.getId(), "active");
            this.taskBar.addAnItem(new PanelItem(newWindow.getId(), newWindow.getTitle()));
            let node = this.taskBar.getItems()[this.taskBar.getItems().length-1];
            let nodeElem = node.getDOMObject();
            nodeElem.classList.add("gui-panel__task-bar__item--active");
            nodeElem.addEventListener('click', function(event) {
                let status = this.windowsStatus.get(newWindow.getId());
                if(status == "active") {
                    this.windowAction("minimize", newWindow.getId());
                    let contextMenu = nodeElem.querySelector(".gui-panel__task-bar__item__context-menu");
                    if(contextMenu.style.display == "inline-block") {
                        contextMenu.style.display = "none";
                    }
                } else if(status == "unactive") {
                    this.windowAction("maximize", newWindow.getId());
                    let contextMenu = nodeElem.querySelector(".gui-panel__task-bar__item__context-menu");
                    if(contextMenu.style.display == "inline-block") {
                        contextMenu.style.display = "none";
                    }
                }
            }.bind(this));
            nodeElem.addEventListener('contextmenu', function(event) {
                event.preventDefault();
                let contextMenu = nodeElem.querySelector(".gui-panel__task-bar__item__context-menu");
                let items = this.taskBar.getItems();
                for(let i = 0; i < items.length; i++) {
                    if(items[i].getId() != newWindow.getId()) {
                        let anItem = items[i].getDOMObject().querySelector(".gui-panel__task-bar__item__context-menu");
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
                let status = this.windowsStatus.get(newWindow.getId());
                if(status == "unactive") {
                    this.windowAction("minimize", newWindow.getId());
                }
                return false;
            }.bind(this), false);
            if(newWindow.isWindowPinnable()) {
                let items = this.taskBar.getItems();
                items[items.length-1].getContextMenu().addAnItem("Pin this app", function() {}).addASeparator();
            }
            document.body.appendChild(newWindow.getDOMObject());
            newWindow.focusWindow();
        }
        selectInstance(instanceId) {
            this.panelInstance = instanceId;
        }
    
        windowAction(actionToDo, id) {
            if(actionToDo == "minimize") {
                let status = this.windowsStatus.get(id);
                if(status == "active") {
                    let windowId = this.getWindowOrderNumberById(id);
                    let node = document.getElementsByClassName("gui-panel__task-bar__item")[windowId];
                    this.windowsStatus.set(id, "unactive");
                    node.classList.remove("gui-panel__task-bar__item--active");
                    document.getElementById(this.windows[windowId].getId()).style.display = "none";
                } else if(status == "unactive") {
                    let windowId = this.getWindowOrderNumberById(id);
                    let node = document.getElementsByClassName("gui-panel__task-bar__item")[windowId];
                    this.windowsStatus.set(id, "active");
                    node.classList.add("gui-panel__task-bar__item--active");
                    document.getElementById(this.windows[windowId].getId()).style.display = "block";
                }
            } else if(actionToDo == "maximize") {
                let windowId = this.getWindowOrderNumberById(id);
                let node = document.getElementsByClassName("gui-panel__task-bar__item")[windowId];
                this.windowsStatus.set(id, "active");
                node.classList.add("gui-panel__task-bar__item--active");
                this.windows[windowId].focusWindow();
                document.getElementById(this.windows[windowId].getId()).style.display = "block";
            } else if(actionToDo == "close") {
                let windowId = this.getWindowOrderNumberById(id);
                let windownode = document.getElementsByClassName("gui-window")[windowId];
                let itemnode = document.getElementsByClassName("gui-panel__task-bar__item")[windowId];
                windownode.remove();
                itemnode.remove();
                this.windows.splice(windowId, 1);
                this.windowsStatus.delete(windowId);
                this.taskBar.getItems().splice(windowId, 1);
            }
        }

        getWindows() {
            return this.windows;
        }

        getWindowOrderNumberById(id) {
            for(let i = 0; i < this.windows.length; i++) {
                if(this.windows[i].getId() == id) {
                    return i;
                }
            }
        }
    
        getPanelItem(windowId) {
            let items = this.taskBar.getItems();
            for(let i = 0; i < items.length; i++) {
                if(items[i].getId() == windowId) {
                    return items[i];
                }
            }
            return null;
        }

        calculateMinimalWidth() {
            let dummyPanelItem = new PanelItem("DUMMY_ID", "DummyText");
            return this.panelMenu.getDOMObject().clientWidth+2 + dummyPanelItem.getItemDefaultWidth() + this.taskBar.getLineSwitcher().getDOMObject().clientWidth + this.rightContainer.clientWidth;
        }
    }

    export default Panel;