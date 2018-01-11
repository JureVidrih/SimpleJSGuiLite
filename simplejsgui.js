var vrstica = new Panel();
vrstica.selectInstance("pult");

var okno = new Window(vrstica, "okno");
var okno_dve = new Window(vrstica, "okno_dve");
okno.initialize();
okno_dve.initialize();

vrstica.addAWindow(okno);
vrstica.addAWindow(okno_dve);