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

let testDialog = new DropdownMenu();
testDialog.addAnItem("Item 111111111111111111111111111111", () => window.alert("Item was clicked!"));
let testSubMenu = new DropdownMenu();
testSubMenu.addAnItem("New item", () => window.alert("New item was clicked!"));
let testSubSubMenu = new DropdownMenu();
testSubSubMenu.addAnItem("New item #2", () => window.alert("New item was clicked!"));
testSubMenu.addAnItem("Menu", testSubSubMenu);
testDialog.addAnItem("Menu", testSubMenu);

myWindow.addAMenuItem("Menu #1", testDialog);

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