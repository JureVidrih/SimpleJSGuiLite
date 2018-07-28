var PanelItemClock = function(panelInstance) {
    this.panelInstance = panelInstance;
    this.time;
    this.displayedTime = "00:00";
    this.DOMObj;
    this.clockIntervalID;

    this.getTemplate = function() {
        this.DOMObj = document.createElement("div");
        this.DOMObj.classList.add("gui-panel__clock");
        this.DOMObj.innerHTML = "<p>"+this.displayedTime+"</p><div class='gui-panel__clock__clock-widget'></div>";
        this.clockValue = this.DOMObj.querySelector("p");
        this.clockWidget = this.DOMObj.querySelector(".gui-panel__clock__clock-widget");
        this.clockWidget.appendChild(this.createTheClockWidget());
        this.clockWidgetDate;

        this.clockValue.addEventListener('mousedown', function() {
            this.clockWidget.classList.toggle("clock-widget-fadein");
        }.bind(this));

        document.addEventListener('mousedown', function(event) {
            if(event.button == 0) {
                if(!this.isAClockWidget(event.target) && event.target != this.clockValue) {
                    this.clockWidget.classList.remove("clock-widget-fadein");
                }
            }
        }.bind(this));

        return this.DOMObj;
    }

    this.isAClockWidget = function(evt_target) {
        while(evt_target != document.body) {
            if(evt_target == this.clockWidget) {
                return true;
            }

            evt_target = evt_target.parentNode;
        }

        return false;
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
            this.clockValue.textContent = this.displayedTime;
            if(this.panelInstance.taskBar) {
                this.panelInstance.taskBar.calculateFreeSpace();
            }
        }.bind(this), 25);
    }

    this.createTheClockWidget = function() {
        tableTop = document.createElement("div");
        tableTop.classList.add("gui-panel__clock__clock-widget__table-top");

        testDate = new Date();
        currYear = testDate.getFullYear();
        currMonth = testDate.getMonth();
        currDay = testDate.getDate();

        prevMonth = document.createElement("img");
        prevMonth.classList.add("gui-panel__clock__clock-widget__table-top__prevMonth");
        prevMonth.addEventListener('mousedown', function() {
            currYear = this.clockWidgetDate.getFullYear();
            currMonth = this.clockWidgetDate.getMonth();
            this.renderMonth(currYear, currMonth-1);
        }.bind(this));

        nextMonth = document.createElement("img");
        nextMonth.classList.add("gui-panel__clock__clock-widget__table-top__nextMonth");
        nextMonth.addEventListener('mousedown', function() {
            currYear = this.clockWidgetDate.getFullYear();
            currMonth = this.clockWidgetDate.getMonth();
            this.renderMonth(currYear, currMonth+1);
        }.bind(this));

        tableTop.appendChild(prevMonth);

        this.monthTextSpan = document.createElement("span");
        this.monthTextSpan.setAttribute('id', 'clock-widget-month-name');

        tableTop.appendChild(this.monthTextSpan);
        tableTop.appendChild(nextMonth);
        this.clockContent = document.createElement("div");
        this.clockContent.appendChild(tableTop);
        this.table = document.createElement("table");
        this.table.setAttribute('border', 1);
        this.table.setAttribute('id', 'clock-widget-table');
        this.clockContent.appendChild(this.table);

        this.renderMonth(currYear, currMonth, currDay);

        return this.clockContent;
    }

    this.renderMonth = function(year, month) {
        var currDate = new Date();
        var isCurrentMonth = (month == currDate.getMonth()) && (year == currDate.getFullYear());
        if(!isCurrentMonth) {
            currDate = new Date(year, month);
        }

        this.clockWidgetDate = currDate;

        var currYear = currDate.getFullYear();
        var currMonth = currDate.getMonth();
        if(isCurrentMonth) {
            var currDay = currDate.getDate();
            var currDayOfWeek = currDate.getDay();
        }
        var dayOfWeekOfTheFirstDay = (new Date(year, month, 0).getDay())+1;
        var daysInTheMonth = this.daysInTheMonth(year, month);
        var daysInThePreviousMonth = this.daysInTheMonth(year, (month-1));

        var monthInText = "";

        switch(currMonth+1) {
            case 1: monthInText = "January"; break;
            case 2: monthInText = "February"; break;
            case 3: monthInText = "March"; break;
            case 4: monthInText = "April"; break;
            case 5: monthInText = "May"; break;
            case 6: monthInText = "June"; break;
            case 7: monthInText = "July"; break;
            case 8: monthInText = "August"; break;
            case 9: monthInText = "September"; break;
            case 10: monthInText = "October"; break;
            case 11: monthInText = "November"; break;
            case 12: monthInText = "December"; break;
        }

        this.monthTextSpan.textContent = monthInText;

        this.table.innerHTML = "<thead><tr><td>Mon</td><td>Tue</td><td>Wed</td><td>Thu</td><td>Fri</td><td>Sat</td><td>Sun</td></tr></thead>";
        
        data = "";

        var isInPreviousMonth = true;
        var dayValue;
        if(dayOfWeekOfTheFirstDay == 1) {
            dayValue = 1;
            isInPreviousMonth = false;
        } else {
            dayValue = daysInThePreviousMonth-(dayOfWeekOfTheFirstDay-2);
        }

        for(i = 0, index = 0, isInNextMonth = false; i < 6; i++) {
            row = document.createElement("tr");
            for(j = 0; j < 7; j++, index++) {
                data = document.createElement("td");
                data.classList.add("table-data" + index);
                data.textContent = dayValue;
                if(isCurrentMonth && (dayValue == currDay) && (!isInPreviousMonth && !isInNextMonth)) {
                    data.classList.add("today");
                }
                if(isInPreviousMonth || isInNextMonth) {
                    data.classList.add("not-this-month");
                }
                row.appendChild(data);
                dayValue++;
                if(isInPreviousMonth) {
                    if(dayValue > daysInThePreviousMonth) {
                        dayValue = 1;
                        isInPreviousMonth = false;
                    }
                } else {
                    if(dayValue > daysInTheMonth) {
                        dayValue = 1;
                        isInNextMonth = true;
                    }
                }
            }
            this.table.appendChild(row);
        }
    }

    this.daysInTheMonth = function(year, month) {
        var num = 0;

        if(month < 0) {
            year--;
            month = 11;
        } else if(month > 11) {
            year++;
            month = 0;
        }

        while(true) {
            testDate = new Date(year, month, (num+1));

            if(testDate.getMonth() != month) {
                break;
            }

            num++;
        }

        return num;
    }
}