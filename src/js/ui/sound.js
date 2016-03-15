/**
 * Sounds object
 * @type {{}}
 */
mokou.ui.sound = {};

/**
 * Loaded sound
 * @type {{}}
 */
mokou.ui.sound.list = {};

/**
 * Init sounds (load)
 * @param sounds
 */
mokou.ui.sound.init = function (sounds) {
    for (var i = 0; i < sounds.length; i++) {
        mokou.ui.sound.list[sounds[i].name] = new Audio(sounds[i].src);
    }
};

/**
 * Play sound
 * @param name
 */
mokou.ui.sound.play = function (name) {
    try {
        mokou.ui.sound.list[name].play();
    }
    catch (e) {
        console.log(e);
    }
};