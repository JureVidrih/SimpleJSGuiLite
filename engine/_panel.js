    var Panel = function() {
        this.windows = [];
        this.windowsStatus = new Map();
        this.items = [];
    
        this.initialize = function() {
            var domObj = document.createElement("div");
            domObj.classList.add("gui-panel");
            domObj.id = "panelInstance1";
            this.panelInstance = domObj.id;
            document.body.appendChild(domObj);
        }
    
        this.addAWindow = function(newWindow) {
            this.windows.push(newWindow);
            this.windowsStatus.set(newWindow.getId(), "active");
            this.items.push(new PanelItem(newWindow.getId(), newWindow.getTitle()));
            var node = this.items[this.items.length-1].getTemplate();
            node.classList.add("gui-panel__item--active");
            node.addEventListener('click', function() {
                var status = this.windowsStatus.get(newWindow.getId());
                this.windowAction("minimize", newWindow.getId());
            }.bind(this));
            document.getElementById(this.panelInstance).appendChild(node);
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
                    var node = document.getElementsByClassName("gui-panel__item")[windowId];
                    this.windowsStatus.set(id, "unactive");
                    node.classList.remove("gui-panel__item--active");
                    document.getElementById(this.windows[windowId].getId()).style.display = "none";
                } else if(status == "unactive") {
                    var windowId = this.getWindowOrderNumberById(id);
                    var node = document.getElementsByClassName("gui-panel__item")[windowId];
                    this.windowsStatus.set(id, "active");
                    node.classList.add("gui-panel__item--active");
                    document.getElementById(this.windows[windowId].getId()).style.display = "block";
                }
            } else if(actionToDo == "maximize") {
                var windowId = this.getWindowOrderNumberById(id);
                var node = document.getElementsByClassName("gui-panel__item")[windowId];
                this.windowsStatus.set(id, "active");
                node.classList.add("gui-panel__item--active");
                document.getElementById(this.windows[windowId].getId()).style.display = "block";
            } else if(actionToDo == "close") {
                var windowId = this.getWindowOrderNumberById(id);
                var windownode = document.getElementsByClassName("gui-window")[windowId];
                var itemnode = document.getElementsByClassName("gui-panel__item")[windowId];
                windownode.remove();
                itemnode.remove();
                this.windows.splice(windowId, 1);
                this.windowsStatus.splice(windowId, 1);
                this.items.splice(windowId, 1);
                
            }
        }
    
        this.getWindowOrderNumberById = function(id) {
            for(i = 0; i < this.windows.length; i++) {
                if(this.windows[i].getId() == id) {
                    return i;
                }
            }
        }
    
        this.getPanelItem = function(windowId) {
            for(i = 0; i < this.items.length; i++) {
                if(this.items[i].getId() == windowId) {
                    return this.items[i];
                }
            }
            return null;
        }

        this.initialize();
    }