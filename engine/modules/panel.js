import PanelItem from './panel-item';
import PanelMenu from './panel-menu';
import PanelItemClock from './panel-clock';
import TaskBar from './task-bar';

class Panel {
    constructor() {
        this.windows = [];
        this.leftContainer = document.createElement("div");
        this.leftContainer.classList.add("gui-panel__left-container");
        this.rightContainer = document.createElement("div");
        this.rightContainer.classList.add("gui-panel__right-container");
        this.panelMenu = new PanelMenu();
        this.panelMenu.addAnIcon("themes/newtheme/assets/icons/default.png", function() { alert("You've clicked on a dummy icon!"); }).addAnIcon("themes/newtheme/assets/icons/default.png", function() { alert("You've clicked on a dummy icon!"); }).addAnIcon("themes/newtheme/assets/icons/default.png", function() { alert("You've clicked on a dummy icon!"); }).addAnItem("Dummy Menu Item #1", () => window.alert("You've clicked on the dummy menu item #1!")).addASeparator().addAnItem("Dummy Menu Item #2", () => window.alert("You've clicked on the dummy menu item #2!"));
        
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
        this.taskBar.attachToPanel(this);
        this.leftContainer.appendChild(this.taskBar.getDOMObject());
        
        SimpleJSGui.getWindowManager().registerWindowListDisplay(this);
    }
    
    notifyListChanged() {
        this.DOMObj.style.zIndex = SimpleJSGui.getWindowManager().getWindows().length+1;
    }
    
    selectInstance(instanceId) {
        this.panelInstance = instanceId;
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

    getMenu() {
        return this.panelMenu;
    }

    getClock() {
        return this.panelClock;
    }

    getTaskBar() {
        return this.taskBar;
    }

    getLeftContainer() {
        return this.leftContainer;
    }
    
    getRightContainer() {
        return this.rightContainer;
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
        let dummyPanelItem = new PanelItem(null, "DUMMY_ID", "DummyText");
        return this.panelMenu.getDOMObject().clientWidth+2 + dummyPanelItem.getItemDefaultWidth() + this.taskBar.getLineSwitcher().getDOMObject().clientWidth + this.rightContainer.clientWidth;
    }
}

export default Panel;