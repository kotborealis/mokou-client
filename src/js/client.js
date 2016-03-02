var mokou_client = {};

//init
mokou_client.init = function () {
    if (window.location.hash === "")return;
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
    mokou_client.ws.send('{"act":"msg","msg":"' + message + '"}');
};

//handlers
mokou_client.handle = function (data) {
    mokou_client.handlers[data.t](data);
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