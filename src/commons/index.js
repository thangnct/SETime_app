export function convertDatatoFormData(data) {

    const formData = new FormData();
    Object.keys(data).forEach(item => {
        formData.append([item], data[item]);
    })
    return formData;
}
export function convertDataToxUrlencoded(data) {
    var str = [];
    for (var key in data) {
        if (data.hasOwnProperty(key)) {
            str.push(encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
            console.log(key + " -> " + data[key]);
        }
    }
    return str.join("&");
}

export function getDatetime() {
    Number.prototype.padLeft = function (base, chr) {
        var len = (String(base || 10).length - String(this).length) + 1;
        return len > 0 ? new Array(len).join(chr || '0') + this : this;
    }
    var d = new Date,
        dformat = [
            d.getFullYear(),
            (d.getMonth() + 1).padLeft(),
            d.getDate().padLeft(),
        ].join('-') + ' ' +
            [d.getHours().padLeft(),
            d.getMinutes().padLeft(),
                '00'].join(':');
    return dformat;
}

export function getTimeUseTimezone(timezone) {
    // create Date object for current location
    var d = new Date();

    // convert to msec
    // subtract local time zone offset
    // get UTC time in msec
    var utc = d.getTime() + (d.getTimezoneOffset() * 60000);

    // create new Date object for different city
    // using supplied offset
    var nd = new Date(utc + (3600000 * timezone));

    Number.prototype.padLeft = function (base, chr) {
        var len = (String(base || 10).length - String(this).length) + 1;
        return len > 0 ? new Array(len).join(chr || '0') + this : this;
    }
    var d = nd,
        dformat = [
            d.getFullYear(),
            (d.getMonth() + 1).padLeft(),
            d.getDate().padLeft(),
        ].join('-') + ' ' +
            [d.getHours().padLeft(),
            d.getMinutes().padLeft(),
                '00'].join(':');
    return dformat;

}


