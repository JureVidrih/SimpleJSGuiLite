SimpleJSGui.init();

SimpleJSGui.getDesktop().shouldBackgroundCoverWholeViewport(true);
SimpleJSGui.getDesktop().changeBackgroundColor("#ffffff");
SimpleJSGui.getDesktop().changeBackgroundImage("backgrounds/pablo-acevedo-359265-unsplash.jpg");

var myPanel = new Panel();

var myWindow = new Window(myPanel, "MyWindowNo1");
var myWindow2 = new Window(myPanel, "MyWindowNo2");

myWindow.initialize();
myWindow2.initialize();

myPanel.addAWindow(myWindow);
myPanel.addAWindow(myWindow2);

var myWindow3 = new Window(myPanel, "MyWindowNo3");
var myWindow4 = new Window(myPanel, "MyWindowNo4");
var myWindow5 = new Window(myPanel, "MyWindowNo5");

myWindow3.initialize();
myWindow4.initialize();
myWindow5.initialize();

myPanel.addAWindow(myWindow3);
myPanel.addAWindow(myWindow4);
myPanel.addAWindow(myWindow5);

myWindow.setWidth(1024);
myWindow.setHeight(768);
myWindow.setWindowX(500);
myWindow.setTitle("My first window's title!");
myWindow.setWindowIcon("themes/newtheme/assets/icons/default.png");
myWindow.setContent("<p>It works!</p>");

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

myWindow2.setWindowX(50);
myWindow2.setTitle("My second window.");
myWindow2.setWindowIcon("themes/newtheme/assets/icons/default.png");

myWindow.getPanelItem().getContextMenu().addAnItem("Spremeni ozadje", function() {
    document.body.style.backgroundColor = "pink";
}).addAnItem("Spremeni ozadje v rumeno barvo", function() {
    document.body.style.backgroundColor = "yellow";
});

myWindow2.getPanelItem().getContextMenu().addAnItem("Spremeni ozadje", function() {
    document.body.style.backgroundColor = "pink";
}).addAnItem("Spremeni ozadje v rumeno barvo", function() {
    document.body.style.backgroundColor = "yellow";
});