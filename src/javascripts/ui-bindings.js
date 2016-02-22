jQuery(function ($) {
    $('.users_button')[0].onclick = mokou_client_ui.showUsersList;
    $("#loginForm")[0].onsubmit = function (e) {
        event.preventDefault();
        mokou_client_ui.login();
    };
    $("#chatLoginButton").onclick = function (e) {
        event.preventDefault();
        mokou_client_ui.login();
    };
    $("#new_messages")[0].onclick = function () {
        mokou_client_ui.scrollToBottom();
    };
    $('.chat').on('scroll', function () {
        if ($('.chat').scrollTop() + $('.chat').innerHeight() >= $('.chat')[0].scrollHeight) {
            $("#new_messages").addClass("hide");
            mokou_client_ui.scrolledToBottom = true;
        }
        else {
            mokou_client_ui.scrolledToBottom = false;
        }
    });
    $(window).on('resize', function () {
        if ($('.chat').scrollTop() + $('.chat').innerHeight() >= $('.chat')[0].scrollHeight) {
            $("#new_messages").addClass("hide");
            mokou_client_ui.scrolledToBottom = true;
        }
        else {
            mokou_client_ui.scrolledToBottom = false;
        }
    });
});