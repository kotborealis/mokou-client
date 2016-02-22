var mokou_client = {};
mokou_client.init = function () {
    if (window.location.hash === "")return;
    mokou_client.ws = new WebSocket("ws://" + window.location.hash.substr(1));
    mokou_client.ws.onmessage = function (e) {
        var data = JSON.parse(e.data);
        if (data.t === "loggedIn")mokou_client_ui.onLogin();
        if (data.t === "loggedOut")mokou_client_ui.onLogout();
        if (data.t === "user") {
            if (data.event === "in")
                mokou_client_ui.chatAddEvent("В чат входит <b>" + data.user.name + "</b>");
            else if (data.event === "out")
                mokou_client_ui.chatAddEvent("<b>" + data.user.name + "</b> выходит из чата");
        }
    };
};
mokou_client.login = function (login) {
    mokou_client.ws.send('{"act":"login","name":"' + login + '"}');
};
mokou_client.logout = function () {
    mokou_client.ws.send('{"act":"logout"}');
};
