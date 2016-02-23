var mokou_client = {};
mokou_client.init = function () {
    if (window.location.hash === "")return;
    mokou_client.ws = new WebSocket("ws://" + window.location.hash.substr(1));
    mokou_client.ws.onmessage = function (e) {
        var data = JSON.parse(e.data);
        if (data.t === "loggedIn")mokou_client_ui.onLogin();
        else if (data.t === "loggedOut")mokou_client_ui.onLogout();
        else if (data.t === "user") {
            if (data.event === "in")
                mokou_client_ui.chatAddEvent("В чат входит <b>" + data.user.name + "</b>");
            else if (data.event === "out")
                mokou_client_ui.chatAddEvent("<b>" + data.user.name + "</b> выходит из чата");
        }
        else if (data.t === "msg")
            mokou_client_ui.chatAddMessage(data.from, data.text, data.ts);
    };
};
mokou_client.login = function (login) {
    mokou_client.ws.send('{"act":"login","name":"' + login + '"}');
};
mokou_client.logout = function () {
    mokou_client.ws.send('{"act":"logout"}');
};
mokou_client.sendMessage = function (message) {
    mokou_client.ws.send('{"act":"msg","msg":"' + message + '"}');
};