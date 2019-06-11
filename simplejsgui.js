SimpleJSGui.getDesktop().shouldBackgroundCoverWholeViewport(true);
SimpleJSGui.getDesktop().changeBackgroundColor("#ffffff");
SimpleJSGui.getDesktop().changeBackgroundImage("backgrounds/pablo-acevedo-359265-unsplash.png");

var myPanel = new Panel();

SimpleJSGui.registerPanel(myPanel);

var myWindow = new Window();
var myWindow2 = new Window();
var myWindow3 = new Window();

SimpleJSGui.addAWindow(myWindow);
SimpleJSGui.addAWindow(myWindow2);
SimpleJSGui.addAWindow(myWindow3);

myWindow.setWidth(1);
myWindow.setHeight(1);
myWindow.setWindowX(50);
myWindow.setTitle("My first window's title!");
myWindow.setWindowIcon("themes/newtheme/assets/icons/default.png");
myWindow.setContent("<p>This is a paragraph.</p>");

let menuBarItem1 = new DropdownMenu();
menuBarItem1.addAnItem("Item 111111111111111111111111111111", () => window.alert("Item was clicked!"));
let subMenu1 = new DropdownMenu();
subMenu1.addAnItem("New item", () => window.alert("New item was clicked!"));
let subMenu2 = new DropdownMenu();
subMenu2.addAnItem("New item #2", () => window.alert("New item was clicked!"));
subMenu1.addAnItem("Menu", subMenu2);
let subMenu3 = new DropdownMenu();
subMenu3.addAnItem("New item #2", () => window.alert("New item was clicked!"));
subMenu2.addAnItem("Menu", subMenu3);
menuBarItem1.addAnItem("Menu", subMenu1);

let menuBarItem2 = new DropdownMenu();

for(let i = 0; i < 80; i++) {
    let title = "Item #" + i;
    let action = function() {
        window.alert("Item #" + i + " was clicked!");
    };
    
    menuBarItem2.addAnItem(title, action);
}

myWindow.addAMenuItem("Menu #1", menuBarItem1);
myWindow.addAMenuItem("Menu #2", menuBarItem2);

// myWindow.getDOMObject().addEventListener("click", function() {
//     document.documentElement.mozRequestFullScreen();
// });

// myWindow.setResizeListenerFullHD(function() {
//     alert("Listener FullHD toggled");
// });

// myWindow.setResizeListenerHD(function() {
//     alert("Listener HD toggled");
// });

// myWindow.setResizeListenerVGA(function() {
//     alert("Listener VGA toggled");
// });

// myWindow.setResizeListenerQVGA(function() {
//     alert("Listener QVGA toggled");
// });

var myObj = document.createElement("p");
myObj.textContent = "A DOM Object";
myWindow2.setWindowX(500);
myWindow2.setTitle("My second window.");
myWindow2.setWindowIcon("themes/newtheme/assets/icons/default.png");
myWindow2.setContent(myObj);

myWindow3.setWindowX(1000);
myWindow3.setTitle("My third window.");
myWindow3.setWindowIcon("themes/newtheme/assets/icons/default.png");

// myWindow.getPanelItem().getContextMenu().addAnItem("Option 1", function() {
//     document.body.style.backgroundColor = "pink";
// }).addAnItem("Option 2", function() {
//     document.body.style.backgroundColor = "yellow";
// });

// myWindow2.getPanelItem().getContextMenu().addAnItem("Option 1", function() {
//     document.body.style.backgroundColor = "pink";
// }).addAnItem("Option 2", function() {
//     document.body.style.backgroundColor = "yellow";
// });

SimpleJSGui.start();