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

                // Update earnings counts, so that it can be saved
                // with GameRoom.computeBonus.
                gameRoom.updateWin(msg.from, settings.COINS - offer);
                gameRoom.updateWin(observer, offer);

            });
            console.log('Game round: ' + node.player.stage.round);
        }
    });

    stager.extendStep('end', {
        init: function() {

            // Feedback.
            node.game.memory.view('feedback').save('feedback.csv', {
                headers: [ 'time', 'timestamp', 'player', 'feedback' ],
                recurrent: true,
                recurrentInterval: 50000
            });

            // Email.
            node.game.memory.view('email').save('email.csv', {
                headers: [ 'timestamp', 'player', 'email' ],
                recurrent: true,
                recurrentInterval: 50000
            });

        },
        cb: function() {
            gameRoom.computeBonus({
                say: true,   // default false
                dump: true,  // default false
                print: true,  // default false
                addDisconnected: true, // default false
                amt: true, // default false (auto-detect)
            });

            // Dump all memory.
            node.game.memory.save('memory_all.json');
        }
    });

    stager.setOnGameOver(function() {
        // Something to do.
    });
};
