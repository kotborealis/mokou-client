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
    mokou.client.info.username_ = username;
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