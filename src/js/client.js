var mokou_client = {};

//init
mokou_client.init = function () {
    //mokou_client_ui.set_no_connection(1);
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
    mokou_client.ws.onopen = function (e) {
        mokou_client_ui.set_no_connection(0);
    };
    mokou_client.ws.onerror = function (e) {
        mokou_client_ui.set_no_connection(1);
    };
    mokou_client.ws.onclose = function (e) {
        mokou_client_ui.set_no_connection(1);
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
    mokou_client.ws.send('{"act":"msg","msg":"' + message + '"}');
};

//handlers
mokou_client.handle = function (data) {
    try{
        mokou_client.handlers[data.t](data);
    }
    catch(e){
        console.log(e);
    }
};
mokou_client.handlers={};
mokou_client.handlers["loggedIn"]=function(data){
    mokou_client_ui.onLogin();
};
mokou_client.handlers["loggedOut"]=function(data){
    mokou_client_ui.onLogout();
};
mokou_client.handlers["user"]=function(data){
    if (data.event === "in")
            mokou_client_ui.userListAddUser(data.user.id, data.user.name);
    if (data.event === "out")
        mokou_client_ui.userListRemoveUser(data.user.id);
};
mokou_client.handlers["msg"]=function(data){
    if(data.from === "" || data.fl==="sys"){
        mokou_client_ui.chatAddEvent(data.text, data.ts);
    }
    else{
        mokou_client_ui.chatAddMessage(data.from, data.text, data.ts);
    }
};