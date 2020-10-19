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
    let channel = gameRoom.channel;
    let memory = node.game.memory;

    // Make the logic independent from players position in the game.
    stager.setDefaultStepRule(ngc.stepRules.SOLO);

    // Must implement the stages here.

    stager.setOnInit(function() {

        // Feedback.
        memory.view('feedback').save('feedback.csv', {
            header: [ 'time', 'timestamp', 'player', 'feedback' ],
            keepUpdated: true
        });

        // Email.
        memory.view('email').save('email.csv', {
            header: [ 'timestamp', 'player', 'email' ],
            keepUpdated: true
        });

        // Win.
        memory.view('win').save('guess.csv', {
            header: [
                'session', 'player', 'round', 'guess', 'number', 'win'
            ],
            adapter: { number: 'randomnumber' },
            keepUpdated: true
        });

        node.on.data('done', function(msg) {

            let step = node.game.getStepId(msg.stage);

            console.log('STEP: ', step);
            console.log('ROUND: ', msg.stage.round);
            console.log('-------------------')


            if (step === 'guess') {
                let greater = msg.data.greater;
                let r = J.randomInt(0, 10);
                let win = (r > 5 && greater) || (r <= 5 && !greater);
                if (win) gameRoom.updateWin(msg.from, settings.COINS);
                let res = {
                    guess: greater,
                    randomnumber: r,
                    win: win
                };
                // Give some time to the client to update.
                setTimeout(function() {
                    node.say('RESULT', msg.from, res);
                    res.player = msg.from;
                    res.stage = msg.stage,
                    memory.add(res);
                });

            }
            else if (step === 'results') {

                // If player finished the last step of the game stage,
                // send the bonus.
                if (msg.stage.round === settings.ROUNDS) {
                    // Saves bonus file, and notifies player.
                    gameRoom.computeBonus({
                        clients: [ msg.from ]
                    });

                    let db = memory.player[msg.from];

                    // Select all 'done' items and save its time.
                    db.select('done').save('times.csv', {
                        header: [
                            'session', 'player', 'stage', 'step', 'round',
                            'time', 'timeup'
                        ]
                    });
                }
            }
        });
    });

    stager.setOnGameOver(function() {
        // Something to do.
    });
};
