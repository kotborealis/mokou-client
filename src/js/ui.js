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


mokou_client_ui.chatAddMessage = function (id, name, text, time, icon, color) {
    console.log("Ебаный аутизм!11");
    if (text.indexOf(mokou_client.cur_name) >= 0) {
        console.log("ТЫ ПИДОР ЧТО ЛИ", text);
        text = text.replace(new RegExp(mokou_client.cur_name + ",", "g"), "<span class='userName'>" + mokou_client.cur_name + ",</span>");
        console.log(text);
        $("#snd_beep")[0].play();
    }
    else {
        $("#snd_click")[0].play();
    }
    var msg = mokou_client_ui.createFromTemplate("chat_message");
    var date = new Date(time * 1000);
    msg.id = "msg_" + id;
    msg.getElementsByClassName("user")[0].onclick = function () {
        mokou_client_ui.insertName(name)
    };
    msg.getElementsByClassName("time")[0].appendChild(document.createTextNode(date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()));
    msg.getElementsByClassName("user")[0].appendChild(document.createTextNode(name + ":"));
    if (icon !== "" && icon !== null && icon !== undefined) {
        $(msg.getElementsByClassName("user")[0]).css("background", "url(http://chatadelic.net" + icon + ") left center no-repeat");
        $(msg.getElementsByClassName("user")[0]).addClass("hasIcon");
    }
    msg.getElementsByClassName("text")[0].innerHTML = text;
    $(msg.getElementsByClassName("text")[0]).css("color", color === null ? "" : "#" + color);
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
    console.log("Ебаный аутизм!11");
    if (text.indexOf(mokou_client.cur_name) >= 0) {
        console.log("ТЫ ПИДОР ЧТО ЛИ", text);
        text = text.replace(new RegExp(mokou_client.cur_name + ",", "g"), "<span class='userName'>" + mokou_client.cur_name + ",</span>");
        console.log(text);
        $("#snd_beep")[0].play();
    }
    else {
        $("#snd_click")[0].play();
    }
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
    user.getElementsByClassName("user")[0].onclick = function () {
        mokou_client_ui.insertName(name)
    };
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

mokou_client_ui.insertName = function (name) {
    if ($("#chatInputMessage")[0].value.indexOf(name) === -1)
        $("#chatInputMessage")[0].value = name + ", " + $("#chatInputMessage")[0].value;
    $("#chatInputMessage")[0].focus();

};

function handleImgSize(img) {
    try {
        img.onclick = function (i) {
            window.open(i.target.src, '_blank').focus();
        }
    }
    catch (e) {
        img.onload = function () {
            handleImgSize(img);
        }
    }
}