/**
 * Handle given data
 * @param {{}} data
 * @param {string} data.t
 */
mokou.client.handle = function (data) {
    try {
        mokou.client.handlers[data.t](data);
    }
    catch (e) {
        console.log(e);
    }
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
    mokou.client.info.username = mokou.client.info.username_;
    mokou.client.info.username_ = "";
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
    if (data.from === "" || data.fl === "sys") {
        mokou.ui.event.event(data);
    }
    else {
        mokou.ui.event.message(data);
    }
};