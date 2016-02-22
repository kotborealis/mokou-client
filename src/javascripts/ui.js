/*jshint -W069 */
var mokou_client_ui = {};
mokou_client_ui.initTemplate = function () {
    mokou_client_ui.template = {};
    mokou_client_ui.template["chat_message"] = $("#templates>.chat_message")[0];
    mokou_client_ui.template["chat_event"] = $("#templates>.chat_event")[0];
    mokou_client_ui.template["userListItem"] = $("#templates>.userListItem")[0];
};
mokou_client_ui.createFromTemplate = function (name) {
    return mokou_client_ui.template.hasOwnProperty(name) ? mokou_client_ui.template[name].cloneNode(true) : null;
};

mokou_client_ui.showUsersList = function () {
    $(".userList").toggleClass("sm_hide");
};

mokou_client_ui.login = function () {
    var login = $("#loginInputNick")[0].value;
    if (login === "" || login.length > 50)return;
    var res = mokou_client.login(login);
    if (res === true) {
        $(".loginBox").addClass("hide");
        $(".messageBox").removeClass("hide");
    }
    else {
        alert(res.reason);
    }
};

mokou_client_ui.scrolledToBottom = true;
mokou_client_ui.scrollToBottom = function () {
    $('.chat').scrollTop($('.chat')[0].scrollHeight);
};


mokou_client_ui.chatAddMessage = function (name, text, time) {
    var msg = mokou_client_ui.createFromTemplate("chat_message");
    var date = new Date(time * 1000);
    msg.getElementsByClassName("time")[0].appendChild(document.createTextNode(date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()));
    msg.getElementsByClassName("user")[0].appendChild(document.createTextNode(name + ":"));
    msg.getElementsByClassName("text")[0].appendChild(document.createTextNode(text));
    if (mokou_client_ui.scrolledToBottom) {
        $(".chat")[0].appendChild(msg);
        mokou_client_ui.scrollToBottom();
        $("#new_messages").addClass("hide");
    }
    else {
        $(".chat")[0].appendChild(msg);
        $("#new_messages").removeClass("hide");
    }
};