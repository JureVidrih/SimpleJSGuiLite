/*
    SimpleJSGui v0.0.1(alpha)
*/

var myPanel = new Panel();

var myWindow = new Window(myPanel, "MyWindowNo1");
var myWindow2 = new Window(myPanel, "MyWindowNo2");

myWindow.initialize();
myWindow2.initialize();

myPanel.addAWindow(myWindow);
// myPanel.addAWindow(myWindow2);

myWindow.setWidth(1024);
myWindow.setHeight(768);
myWindow.setBackgroundColor("white");
myWindow.setTitle("My first window's title!");
myWindow.setContent("It works!");

myWindow.getPanelItem().getContextMenu().addAnItem("Spremeni ozadje", function() {
    document.body.style.backgroundColor = "pink";
});
myWindow.getPanelItem().getContextMenu().addASeparator();
myWindow.getPanelItem().getContextMenu().addAnItem("Spremeni ozadje v rumeno barvo", function() {
    document.body.style.backgroundColor = "yellow";
});