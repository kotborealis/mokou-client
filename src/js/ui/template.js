/**
 * UI template object
 * @type {{}}
 */
mokou.ui.template = {};
/**
 * Init UI templates
 */
mokou.ui.template.init = function () {
    mokou.ui.template._ = {};
    mokou.ui.template._["chat_message"] = $("#templates").find(">.chat_message").get(0);
    mokou.ui.template._["chat_event"] = $("#templates").find(">.chat_event").get(0);
    mokou.ui.template._["userListItem"] = $("#templates").find(">.userListItem").get(0);
};

/**
 * Create element from template
 * @param type
 */
mokou.ui.template.element = function (type) {
    return mokou.ui.template._.hasOwnProperty(type) ? mokou.ui.template._[type].cloneNode(true) : null;
};