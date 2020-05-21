export async function getWeek(time) {
    // let x = await getCalendarStates(1,2,123)
    // console.log(x, "xxx")
    let datetime = new Date(time)
    let weekdays = new Array();
    let weekId = "";
    // Starting Monday not Sunday
    datetime.setDate((datetime.getDate() - datetime.getDay() + 1));
    for (var i = 0; i < 7; i++) {
        let date = new Date(datetime).getDate();
        let day = new Date(datetime).getDay();
        let weekday = ""
        switch (day) {
            case 0:
                weekday = "SUN"
                break;
            case 1:
                weekday = "MON"
                break;
            case 2:
                weekday = "TUE"
                break;
            case 3:
                weekday = "WED"
                break
            case 4:
                weekday = "THU"
                break;
            case 5:
                weekday = "FRI"
                break;
            case 6:
                weekday = "SAT"
                break;
        }
        let active = false
        // let now = new Date().getTime();
        let now = new Date();
        let currentDate = now.getDate();
        let currentMonth = now.getMonth() + 1;
        let currentYear = now.getFullYear();
        let dateOfDay = datetime.getDate();
        let monthOfDay = datetime.getMonth() + 1;
        let yearOfDay = datetime.getFullYear();
        if (dateOfDay.toString().length == 1) {
            dateOfDay = "0" + dateOfDay;
        }

        if (monthOfDay.toString().length == 1) {
            monthOfDay = "0" + monthOfDay;
        }
        if (currentDate == dateOfDay && currentMonth == monthOfDay && currentYear == yearOfDay) {
            active = true
        }
        let fullDate = "" + dateOfDay + "-" + monthOfDay + "-" + yearOfDay;
        let fullDateE = "" + yearOfDay + "-" + monthOfDay + "-" + dateOfDay;
        if (weekday == "MON") {
            weekId = fullDate;
        }
        weekdays.push(
            { date, weekday, active, fullDate, fullDateE }
        );
        datetime.setDate(datetime.getDate() + 1);
    }
    const week = {
        weekId,
        weekdays
    }
    return week;
}
export async function getCalendar(time) {
    let moment = time.getTime().toString().slice(0, 8) * 100000;
    let now = new Date(moment)
    console.log(now)
    let calendar = [];
    // let lastWeek = await getWeek(now.setDate(now.getDate() - 7));
    let currentWeek = await getWeek(now.setDate(now.getDate()));
    let nextWeek = await getWeek(now.setDate(now.getDate() + 7));
    // let lastWeek = getWeek(now.getDate() - 7);
    // let currentWeek = getWeek(now.getDate());
    // let nextWeek = getWeek(now.getDate() + 7);
    calendar.push(
        // lastWeek,
        currentWeek,
        nextWeek
    );
    return calendar
}

async function getCalendarStates(start, end, _) {
    try {
        let response = await fetch('http://localhost:1998/api/timesheet/getCalendarStates', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                start: start,
                end: end,
                _: _,
            }),
        });
        const listDay = await response.json();
        let calendar = []
        for (let i = 0; i < listDay.data.length; i = i + 2) {
            let date = listDay.data[i].start.slice(0, 10);
            let checkinstatus = listDay.data[i].className;
            let logWorkStatus = listDay.data[i + 1].className;

            let logWork = {
                date, checkinstatus, logWorkStatus
            }
            calendar.push(logWork);
        }
        return calendar

    } catch (err) {
        console.log(err, "err")
    }
}

function findProjectNameinString(str) {
    console.log(str)
    let start = 0;
    let end = 0;
    for (let i = 1; i < str.length - 1; i++) {
        if (str[i] == ">") {
            start = i;
        }
        if (str[i] == "<") {
            end = i;
        }
    }
    return str.slice(start + 1, end)
}
