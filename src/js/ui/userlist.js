/**
 * Users list object
 * @type {{}}
 */
mokou.ui.userList = {};

/**
 * Toggle user list on small screens
 */
mokou.ui.userList.toggle = function () {
    $(".userList").toggleClass("sm_hide");
};

/**
 * Add user to users list
 * @param data
 * @param data.user
 * @param [data.user.hpic]
 */
mokou.ui.userList.add = function (data) {
    var element = mokou.ui.template.element("userListItem");
    var user = $(element).find(".user");
    user[0].appendChild(document.createTextNode(data.user.name));
    if (data.user.hpic !== "" && data.user.hpic !== null && data.user.hpic !== undefined) {
        user.css("background", "url(" + data.user.hpic + ") left center no-repeat");
        user.addClass("hasIcon");
    }
    $(element).attr("id", "id_" + data.user.id);
    $(".userList").get(0).appendChild(element);
};

/**
 * Remove user from
 * @param data
 */
mokou.ui.userList.remove = function (data) {
    var userListItems = $(".userList").find(".userListItem");
    for (var i = 0; i < userListItems.length; i++)
        if ($(userListItems.get(i)).attr("id") == "id_" + data.user.id) {
            userListItems.get(i).remove();
            return;
        }
};