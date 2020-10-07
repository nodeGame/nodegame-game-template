/**
 * # Logic type implementation of the game stages
 * Copyright(c) {YEAR} {AUTHOR} <{AUTHOR_EMAIL}>
 * MIT Licensed
 *
 * http://www.nodegame.org
 * ---
 */

"use strict";

const ngc = require('nodegame-client');
const J = ngc.JSUS;

module.exports = function(treatmentName, settings, stager, setup, gameRoom) {

    let node = gameRoom.node;
    let channel =  gameRoom.channel;

    // Must implement the stages here.

    stager.setOnInit(function() {
        // Initialize the client.
    });

    stager.extendStep('game', {
        matcher: {
            roles: [ 'DICTATOR', 'OBSERVER' ],
            match: 'round_robin',
            cycle: 'mirror_invert',
            // sayPartner: false
            // skipBye: false,

        },
        cb: function() {
            node.once.data('done', function(msg) {
                let offer = msg.data.offer;
                let observer = node.game.matcher.getMatchFor(msg.from);
                // Send the decision to the other player.
                node.say('decision', observer, msg.data.offer);

            });
            console.log('Game round: ' + node.player.stage.round);
        }
    });

    stager.extendStep('end', {
        cb: function() {

            // Save data in the data/roomXXX directory.
            node.game.memory.save('data.json');
        }
    });

    stager.setOnGameOver(function() {
        // Something to do.
    });
};
