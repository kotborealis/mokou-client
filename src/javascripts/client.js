var mokou_client = {};
mokou_client.login = function (login) {
    console.log("Logging in: " + login);
    return true;
};
mokou_client.logout = function () {
    console.log("Logging out");
    return true;
};
