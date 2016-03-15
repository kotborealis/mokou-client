/**
 * UI acts (-> client acts)
 * @type {{}}
 */
mokou.ui.act = {};

/**
 * Call client login function with username from ui
 */
mokou.ui.act.login = function () {
    var username = $("#loginInputNick").get(0).value;
    if (username === "" || username.length > 50)return;
    localStorage.setItem("username", username);
    mokou.client.act.login(username);
};

/**
 * Call client logout function
 */
mokou.ui.act.logout = mokou.client.act.logout;

/**
 * Call client function message with value from input and clear input
 */
mokou.ui.act.message = function () {
    var input = $("#chatInputMessage").get(0);
    if (input.value.length === 0)return;
    mokou.client.act.message(input.value);
    input.value = "";
};