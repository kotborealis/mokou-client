/**
 * Main app object
 * @type {{}}
 */
var mokou = {};

jQuery(function ($) {
    /**
     * Init UI templates, sounds and client connection
     */
    mokou.ui.template.init();
    mokou.client.init();
    mokou.ui.sound.init([{name: "beep", src: "snd/beeps.mp3"}, {name: "click", src: "snd/click.mp3"}]);

    /**
     * Bind UI functions to client events
     */
    mokou.client.ws.onerror = mokou.client.ws.onclose = function () {
        mokou.ui.event.connection(0);
    };
    mokou.client.ws.onopen = function () {
        mokou.ui.event.connection(1);
    };

    /**
     * Set focus on username field
     */
    $("#loginInputNick")[0].focus();

    /**
     * Bind functions to UI elements
     */
    $('.users_button')[0].onclick = mokou.ui.userList.toggle();
    $("#loginForm")[0].onsubmit = function (e) {
        e.preventDefault();
        mokou.ui.act.login();
    };
    $("#messageForm")[0].onsubmit = function (e) {
        e.preventDefault();
        mokou.ui.act.message();
    };
    $("#chatExitButton")[0].onclick = function (e) {
        e.preventDefault();
        mokou.ui.act.logout();
    };
    $("#new_messages")[0].onclick = function (e) {
        e.preventDefault();
        mokou.ui.chat.scroll();
    };
    $('.chat').on('scroll', mokou.ui.chat.onscroll);
    $(window).on('resize', mokou.ui.chat.onscroll);
    window.onhashchange = mokou.client.init;

    $("#loginInputNick").get(0).value = localStorage.getItem("username") || "";
});