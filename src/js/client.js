/**
 * Client object, contains functions
 * @type {{}}
 */
mokou.client = {};

/**
 * Init websocket connection
 */
mokou.client.init = function () {
    if (window.location.hash === "")
        mokou.client.ws = new WebSocket("ws://" + window.location.hostname + ":8090");
    else
        mokou.client.ws = new WebSocket("ws://" + window.location.hash.substr(1));

    mokou.client.ws.onmessage = function (e) {
        var data = JSON.parse(e.data);
        if (Array.isArray(data))
            for (var i = 0; i < data.length; i++)
                mokou.client.handle(data[i]);
        else
            mokou.client.handle(data);
    };

    /**
     * Error/close events
     */
    mokou.client.ws.onerror =
        mokou.client.ws.onclose = function (e) {
            mokou.ui.event.connection(0);
    };

    /**
     * Open event
     */
    mokou.client.ws.onopen = function (e) {
        mokou.ui.event.connection(1);
    };
};

/**
 * Chat actions
 * @type {{}}
 */
mokou.client.act = {};
/**
 * Login with given username
 * @param {string} username
 */
mokou.client.act.login = function (username) {
    if (!username)return;
    mokou.client.ws.send(JSON.stringify({
        act: "login",
        name: username
    }));
};
/**
 * Logout
 */
mokou.client.act.logout = function () {
    mokou.client.ws.send(JSON.stringify({
        act: "logout"
    }));
};
/**
 * Send given message
 * @param {string} message
 */
mokou.client.act.message = function (message) {
    if (!message)return;
    mokou.client.ws.send(JSON.stringify({
        act: "msg",
        msg: message
    }));
};

/**
 * Handle given data
 * @param {{}} data
 * @param {string} data.t
 */
mokou.client.handle = function (data) {
    //try{
    mokou.client.handlers[data.t](data);
    /*}
    catch(e){
        console.log(e);
     }*/
};
/**
 * Handlers
 * @type {{}}
 */
mokou.client.handlers = {};
/**
 * Handle logged in event
 */
mokou.client.handlers["loggedIn"] = function () {
    mokou.ui.event.login();
};
/**
 * Handle logged out event
 * @param data
 */
mokou.client.handlers["loggedOut"] = function (data) {
    mokou.ui.event.logout();
};
/**
 * Handle user in/out events
 * @param data
 */
mokou.client.handlers["user"] = function (data) {
    mokou.ui.event.user(data);
};
/**
 * Handle message or event
 * @param data
 * @param data.fl
 * @param data.from
 */
mokou.client.handlers["msg"] = function (data) {
    if(data.from === "" || data.fl==="sys"){
        mokou.ui.event.event(data);
    }
    else{
        mokou.ui.event.message(data);
    }
};