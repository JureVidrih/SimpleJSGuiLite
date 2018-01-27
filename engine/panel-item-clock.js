var PanelItemClock = function() {
    this.time;
    this.displayedTime = "00:00";
    this.DOMObj;
    this.clockIntervalID;

    this.getTemplate = function() {
        this.DOMObj = document.createElement("p");
        this.DOMObj.classList.add("gui-panel__clock");
        this.DOMObj.textContent = this.displayedTime;
        
        return this.DOMObj
    }

    this.startTheClock = function() {
        this.clockIntervalID = setInterval(function() {
            this.time = new Date();
            hours = this.time.getHours();
            minutes = this.time.getMinutes();
            if(hours < 10) {
                hours = "0" + hours;
            }
            if(minutes < 10) {
                minutes = "0" + minutes;
            }
            this.displayedTime = hours + ":" + minutes;
            this.DOMObj.textContent = this.displayedTime;
        }.bind(this), 1);
    }
}