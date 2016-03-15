/**
 * Client events handler
 * @type {{}}
 */
mokou.ui.event = {};

/**
 * Logged in event
 */
mokou.ui.event.login = function () {
    $(".loginBox").addClass("hide");
    $(".messageBox").removeClass("hide");
    $("#chatInputMessage").focus();
};

/**
 * Logged out event
 */
mokou.ui.event.logout = function () {
    $(".loginBox").removeClass("hide");
    $(".messageBox").addClass("hide");
};

/**
 * User login/logout event
 * @param data
 */
mokou.ui.event.user = function (data) {
    if (data.event === "in")
        mokou.ui.userList.add(data);
    else
        mokou.ui.userList.remove(data);
};

/**
 * Event on new event (>:C)
 */
mokou.ui.event.event = mokou.ui.chat.addEvent;
/**
 * Event on new message
 */
mokou.ui.event.message = mokou.ui.chat.addMessage;
/**
 * Event on connection change
 */
mokou.ui.event.connection = mokou.ui.chat.connection;