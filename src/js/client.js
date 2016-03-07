var mokou_client = {};
mokou_client.cur_name = "Рейму";
//init
mokou_client.init = function () {
    if (window.location.hash === "")
        mokou_client.ws = new WebSocket("ws://" + window.location.hostname + ":8090");
    else
        mokou_client.ws = new WebSocket("ws://" + window.location.hash.substr(1));
    mokou_client.ws.onmessage = function (e) {
        var data = JSON.parse(e.data);
        if (Array.isArray(data))
            for (var i = 0; i < data.length; i++)
                mokou_client.handle(data[i]);
        else
            mokou_client.handle(data);
    };
};

//send
mokou_client.login = function (login) {
    mokou_client.ws.send('{"act":"login","name":"' + login + '"}');
};
mokou_client.logout = function () {
    mokou_client.ws.send('{"act":"logout"}');
};
mokou_client.sendMessage = function (message) {
    if (message === "" || message === undefined || message === null)return;
    message = message.replace(/"/g, '\\"');
    mokou_client.ws.send('{"act":"msg","msg":"' + message + '"}');
};

//handlers
mokou_client.handle = function (data) {
    try{
        mokou_client.handlers[data.t](data);
    }
    catch(e){
        console.log(e, data);
    }
};
mokou_client.handlers={};
mokou_client.handlers["loggedIn"] = function () {
    mokou_client_ui.onLogin();
};
mokou_client.handlers["loggedOut"] = function () {
    mokou_client_ui.onLogout();
};
mokou_client.handlers["user"]=function(data){
    if (data.event.toLowerCase() === "in")
        mokou_client_ui.userListAddUser(data.user.id ? data.user.id : data.user.regId, data.user.name);
    if (data.event.toLowerCase() === "out")
        mokou_client_ui.userListRemoveUser(data.user.id ? data.user.id : data.user.regId);
};
mokou_client.handlers["msg"]=function(data){
    if (data.from === "" || data.fl === "sys" || data.type === "system") {
        mokou_client_ui.chatAddEvent(data.text, data.ts);
    }
    else{
        mokou_client_ui.chatAddMessage(data.id, data.from, data.text, data.ts, data.icon, data.tc);
    }
};
mokou_client.handlers["reset"] = function () {
    $(".chat")[0].innerHTML = "";
};