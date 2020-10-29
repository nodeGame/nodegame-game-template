/**
 * # nodegame-game-template
 * Copyright(c) 2018 Stefano Balietti
 * MIT Licensed
 *
 * Handles paths to game templates files.
 *
 * http://www.nodegame.org
 */

const path = require('path');

// Return the required template.
exports.require = function(file) {
    if (file === 'package.json') file = 'package.template.json';
    else if (file === 'LICENSE') file = 'LICENSE.template';
    else if (file === 'README.md') file = 'README.template.md';
    else if (file === '.gitignore') file = '.gitignore.template';
    return require(path.resolve(__dirname, file));
};

// Return the path to the required template.
exports.resolve = function(file) {
    if (file === 'package.json') {
        file = 'package.template.json';
    }
    else if (file === 'LICENSE') {
        file = 'LICENSE.template';
    }
    else if (file === 'README.md') {
        file = 'README.template.md';
    }
    else if (file === '.gitignore') {
        file = '.gitignore.template';
    }
    else if (file === path.join('private', 'README.md')) {
        file = path.join('private.template', 'README.md');
    }
    else if (file === path.join('private', '.gitkeep')) {
        file = path.join('private.template', '.gitkeep');
    }
    return path.resolve(__dirname, file);
};
