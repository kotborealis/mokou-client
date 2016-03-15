/**
 * Chat object
 * @type {{}}
 */
mokou.ui.chat = {};

/**
 * Add event to chat
 * @param data
 */
mokou.ui.chat.addEvent = function (data) {
    var element = $(mokou.ui.template.element("chat_event"));
    element.find(".time").get(0).innerHTML = util.getTimeString(data.ts);
    element.find(".text").get(0).innerHTML = data.text;
    mokou.ui.chat.addElement(element[0]);
};
/**
 * Add message to chat
 * @param data
 */
mokou.ui.chat.addMessage = function (data) {
    var element = $(mokou.ui.template.element("chat_message"));
    var user = element.find(".user");
    element.find(".time").get(0).innerHTML = util.getTimeString(data.ts);
    element.find(".text").get(0).innerHTML = data.text;
    user.get(0).innerHTML = data.from + ":";
    if (data.icon !== "" && data.icon !== null && data.icon !== undefined) {
        user.css("background", "url(" + data.user.hpic + ") left center no-repeat");
        user.addClass("hasIcon");
    }
    mokou.ui.chat.addElement(element[0]);
};

/**
 * Add element to chat considering scroll state
 * @param element
 */
mokou.ui.chat.addElement = function (element) {
    if (mokou.ui.chat.scrolled) {
        $(".chat")[0].appendChild(element);
        mokou.ui.chat.scroll();
        $("#new_messages").addClass("hide");
    }
    else {
        $(".chat")[0].appendChild(element);
        $("#new_messages").removeClass("hide");
    }
};

/**
 * Scroll chat to bottom
 */
mokou.ui.chat.scroll = function () {
    var element = $('.chat');
    element.scrollTop(element[0].scrollHeight);
};
/**
 * On chat scroll
 */
mokou.ui.chat.onscroll = function () {
    var element = $('.chat');
    if (element.scrollTop() + element.innerHeight() >= element[0].scrollHeight) {
        $("#new_messages").addClass("hide");
        mokou.ui.chat.scrolled = true;
    }
    else {
        mokou.ui.chat.scrolled = false;
    }
};

mokou.ui.chat.connection = function (connection) {
    if (connection)
        $("#no_connection").removeClass("hide");
    else
        $("#no_connection").addClass("hide");
};