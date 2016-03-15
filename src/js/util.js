var util = {};
util.getTimeString = function (ts) {
    var date = new Date(ts * 1000);
    return ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2) + ":" + ("0" + date.getSeconds()).slice(-2);
};