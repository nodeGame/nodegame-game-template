/**
 * # nodegame-game-template
 * Copyright(c) 2016 Stefano Balietti
 * MIT Licensed
 *
 * Game files.
 *
 * http://www.nodegame.org
 */

var path = require('path');

// Return the required template.
exports.require = function(file) {
    if (file === 'package.json') file = 'package.template.json';
    return require(path.resolve(__dirname, file));
};

// Return the path to the required template.
exports.resolve = function(file) {
    if (file === 'package.json') file = 'package.template.json';
    return path.resolve(__dirname, file);
};
