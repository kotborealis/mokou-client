/**
 * Main app object
 * @type {{}}
 */
var mokou = {};

jQuery(function ($) {
    /**
     * Init UI templates and client connection
     */
    mokou.ui.template.init();
    mokou.client.init();

    /**
     * Set focus on username field
     */
    $("#loginInputNick")[0].focus();

    /**
     * Bind functions to UI elements
     */
    $('.users_button')[0].onclick = mokou.ui.userList.toggle();

    $("#loginForm")[0].onsubmit = function () {
        event.preventDefault();
        mokou.ui.act.login();
    };

    $("#messageForm")[0].onsubmit = function (e) {
        event.preventDefault();
        mokou.ui.act.message();
    };

    $("#chatExitButton")[0].onclick = function (e) {
        e.preventDefault();
        mokou.ui.act.logout();
    };

    $("#new_messages")[0].onclick = function () {
        e.preventDefault();
        mokou.ui.chat.scroll();
    };

    $('.chat').on('scroll', mokou.ui.chat.onscroll);

    $(window).on('resize', mokou.ui.chat.onscroll);

    window.onhashchange = mokou.client.init;

    mokou.ui.chat.scroll();
});