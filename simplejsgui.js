/*
    SimpleJSGui v0.0.1(alpha)
*/

var myPanel = new Panel();

var myWindow = new Window(myPanel, "MyWindowNo1");

myWindow.initialize();
myWindow.setWidth(1024);
myWindow.setHeight(768);
myWindow.setBackgroundColor("lightgray");
myWindow.setTitle("My first window's title!");
myWindow.setContent("It works!");

myPanel.addAWindow(myWindow);