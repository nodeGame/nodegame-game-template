/**
 * # Game setup
 * Copyright(c) {YEAR} {AUTHOR} <{AUTHOR_EMAIL}>
 * MIT Licensed
 *
 * This file includes settings that are shared amongst all client types
 *
 * Setup settings are passed by reference and can be modified globally
 * by any instance executing on the server (but not by remote instances).
 *
 * http://www.nodegame.org
 * ---
 */
module.exports = function(settings, stages) {

    var setup = {};

    //auto: true = automatic run, auto: false = user input
    setup.env = {
        auto: false
    };

    setup.debug = true;

    setup.verbosity = 1;

    setup.window = {
        promptOnleave: !setup.debug
    }

    // Metadata. Taken from package.json. Can be overwritten.
    // setup.metadata = {
    //    name: 'another name',
    //    version: 'another version',
    //    description: 'another descr'
    // };

    return setup;
};
