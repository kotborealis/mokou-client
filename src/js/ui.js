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
};
mokou_client_ui.onLogin = function () {
    $(".loginBox").addClass("hide");
    $(".messageBox").removeClass("hide");
    $("#chatInputMessage")[0].focus();
};

mokou_client_ui.logout = function () {
    mokou_client.logout();
};
mokou_client_ui.onLogout = function () {
    $(".loginBox").removeClass("hide");
    $(".messageBox").addClass("hide");
};

mokou_client_ui.scrolledToBottom = true;
mokou_client_ui.scrollToBottom = function () {
    $('.chat').scrollTop($('.chat')[0].scrollHeight);
};


mokou_client_ui.chatAddMessage = function (name, text, time, icon) {
    var msg = mokou_client_ui.createFromTemplate("chat_message");
    var date = new Date(time * 1000);
    msg.getElementsByClassName("time")[0].appendChild(document.createTextNode(date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()));
    msg.getElementsByClassName("user")[0].appendChild(document.createTextNode(name + ":"));
    if (icon !== "" && icon !== null && icon !== undefined) {
        $(msg.getElementsByClassName("user")[0]).css("background", "url(" + icon + ") left center no-repeat");
        $(msg.getElementsByClassName("user")[0]).addClass("hasIcon");
    }
    msg.getElementsByClassName("text")[0].innerHTML = text;
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
mokou_client_ui.chatAddEvent = function (text, time) {
    var msg = mokou_client_ui.createFromTemplate("chat_event");
    var date = new Date(time * 1000);
    msg.getElementsByClassName("time")[0].appendChild(document.createTextNode(date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()));
    msg.getElementsByClassName("text")[0].innerHTML = text;
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

mokou_client_ui.userListAddUser = function (id, name, icon) {
    var user = mokou_client_ui.createFromTemplate("userListItem");
    user.getElementsByClassName("user")[0].appendChild(document.createTextNode(name));
    if (icon !== "" && icon !== null && icon !== undefined) {
        $(user.getElementsByClassName("user")[0]).css("background", "url(" + icon + ") left center no-repeat");
        $(user.getElementsByClassName("user")[0]).addClass("hasIcon");
    }
    $(user).attr("id", "id_" + id);
    $(".userList")[0].appendChild(user);
};
mokou_client_ui.userListRemoveUser = function (id) {
    for (var i = 0; i < $(".userList>.userListItem").length; i++)
        if ($($(".userList>.userListItem")[i]).attr("id") == "id_" + id) {
            $($(".userList>.userListItem")[i]).remove();
            return true;
        }
    return false;
};

function handleImgSize(img){
    console.log("imgsize");
    img.onload=function(){
        console.log("ONLOAD");
        console.log(img.width);
        console.log(img.height);
        if(img.width>200){
            img.width=200;
            img.height="";
        }
        else if(img.height>200){
            img.height=200;
            img.width="";
        }
    }
}