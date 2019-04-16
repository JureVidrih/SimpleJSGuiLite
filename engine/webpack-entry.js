import Desktop from './modules/desktop';
import Overlay from './modules/overlay';
import System from './modules/system';
import TaskBar from './modules/task-bar';
import PanelMenu from './modules/panel-menu';
import PanelClock from './modules/panel-clock'
import PanelItemContextMenu from './modules/panel-item-contextmenu';
import PanelItem from './modules/panel-item';
import Panel from './modules/panel';
import Window from './modules/window';
import DropdownMenu from './modules/dropdown-menu';

window.SimpleJSGui = new System();

window.Desktop =  Desktop;
window.Overlay =  Overlay;
window.TaskBar =  TaskBar;
window.PanelMenu =  PanelMenu;
window.PanelClock =  PanelClock;
window.PanelItemContextMenu =  PanelItemContextMenu;
window.PanelItem =  PanelItem;
window.Panel =  Panel;
window.Window =  Window;
window.DropdownMenu = DropdownMenu;