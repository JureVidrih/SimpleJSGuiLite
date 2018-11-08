class PanelItemClock {
    constructor(panelInstance) {
        this.panelInstance = panelInstance;
        this.time;
        this.displayedTime = "00:00";
        this.clockIntervalID;
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
    }

    getDOMObject() {
        return this.DOMObj;
    }

    isAClockWidget(evt_target) {
        while(evt_target != document.body && !evt_target.classList.contains("gui-panel__task-bar__item")) {
            if(evt_target == this.clockWidget) {
                return true;
            }

            evt_target = evt_target.parentNode;
        }

        return false;
    }

    startTheClock() {
        this.clockIntervalID = setInterval(function() {
            this.time = new Date();
            let hours = this.time.getHours();
            let minutes = this.time.getMinutes();
            if(hours < 10) {
                hours = "0" + hours;
            }
            if(minutes < 10) {
                minutes = "0" + minutes;
            }
            this.displayedTime = hours + ":" + minutes;
            this.clockValue.textContent = this.displayedTime;
            this.clockValue.style.width = Math.floor(this.clockValue.offsetWidth)+"px";
            if(this.panelInstance.taskBar) {
                this.panelInstance.taskBar.calculateFreeSpace();
            }
        }.bind(this), 25);
    }

    createTheClockWidget() {
        let tableTop = document.createElement("div");
        tableTop.classList.add("gui-panel__clock__clock-widget__table-top");

        let testDate = new Date();
        let currYear = testDate.getFullYear();
        let currMonth = testDate.getMonth();
        let currDay = testDate.getDate();

        let prevMonth = document.createElement("img");
        prevMonth.classList.add("gui-panel__clock__clock-widget__table-top__prevMonth");
        prevMonth.setAttribute("src", "engine/assets/clockWidget/empty_16x16.png");
        prevMonth.addEventListener('mousedown', function() {
            currYear = this.clockWidgetDate.getFullYear();
            currMonth = this.clockWidgetDate.getMonth();
            this.renderMonth(currYear, currMonth-1);
        }.bind(this));

        let nextMonth = document.createElement("img");
        nextMonth.classList.add("gui-panel__clock__clock-widget__table-top__nextMonth");
        nextMonth.setAttribute("src", "engine/assets/clockWidget/empty_16x16.png");
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

    renderMonth(year, month) {
        let currDate = new Date();
        let isCurrentMonth = (month == currDate.getMonth()) && (year == currDate.getFullYear());
        if(!isCurrentMonth) {
            currDate = new Date(year, month);
        }

        this.clockWidgetDate = currDate;

        let currYear = currDate.getFullYear();
        let currMonth = currDate.getMonth();
        let currDay, currDayOfWeek;
        if(isCurrentMonth) {
            currDay = currDate.getDate();
            currDayOfWeek = currDate.getDay();
        }
        let dayOfWeekOfTheFirstDay = (new Date(year, month, 0).getDay())+1;
        let daysInTheMonth = this.daysInTheMonth(year, month);
        let daysInThePreviousMonth = this.daysInTheMonth(year, (month-1));

        let monthInText = "";

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

        this.monthTextSpan.textContent = monthInText + " " + currYear;

        this.table.innerHTML = "<thead><tr><td>Mon</td><td>Tue</td><td>Wed</td><td>Thu</td><td>Fri</td><td>Sat</td><td>Sun</td></tr></thead>";
        
        let data = "";

        let isInPreviousMonth = true;
        let dayValue;
        if(dayOfWeekOfTheFirstDay == 1) {
            dayValue = 1;
            isInPreviousMonth = false;
        } else {
            dayValue = daysInThePreviousMonth-(dayOfWeekOfTheFirstDay-2);
        }

        for(let i = 0, index = 0, isInNextMonth = false; i < 6; i++) {
            let row = document.createElement("tr");
            for(let j = 0; j < 7; j++, index++) {
                let data = document.createElement("td");
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

    daysInTheMonth(year, month) {
        let num = 0;

        if(month < 0) {
            year--;
            let month = 11;
        } else if(month > 11) {
            year++;
            let month = 0;
        }

        while(true) {
            let testDate = new Date(year, month, (num+1));

            if(testDate.getMonth() != month) {
                break;
            }

            num++;
        }

        return num;
    }
}

export default PanelItemClock;