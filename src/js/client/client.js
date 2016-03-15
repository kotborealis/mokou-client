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