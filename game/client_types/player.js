/**
 * # Player type implementation of the game stages
 * Copyright(c) {YEAR} {AUTHOR} <{AUTHOR_EMAIL}>
 * MIT Licensed
 *
 * Each client type must extend / implement the stages defined in `game.stages`.
 * Upon connection each client is assigned a client type and it is automatically
 * setup with it.
 *
 * http://www.nodegame.org
 * ---
 */

"use strict";

module.exports = function(treatmentName, settings, stager, setup, gameRoom) {

    stager.setOnInit(function() {

        // Initialize the client.

        var header, frame;

        // Bid is valid if it is a number between 0 and 100.
        this.isValidBid = function(n) {
            return node.JSUS.isInt(n, -1, 101);
        };

        // Setup page: header + frame.
        header = W.generateHeader();
        frame = W.generateFrame();

        // Add widgets.
        this.visualRound = node.widgets.append('VisualRound', header);
        this.visualTimer = node.widgets.append('VisualTimer', header);
        this.doneButton = node.widgets.append('DoneButton', header);

        // Additional debug information while developing the game.
        // this.debugInfo = node.widgets.append('DebugInfo', header)
    });

    stager.extendStep('instructions', {
        frame: 'instructions.htm',
        cb: function() {
            // Replace variables in the instructions.
            W.setInnerHTML('coins', node.game.settings.COINS);
            W.setInnerHTML('rounds', node.game.settings.ROUNDS);
        }
    });

    stager.extendStep('quiz', {
        cb: function() {
            // Modify CSS rules on the fly.
            W.cssRule('.choicetable-left, .choicetable-right ' +
                      '{ width: 200px !important; }');

            W.cssRule('table.choicetable td { text-align: left !important; ' +
                      'font-weight: normal; padding-left: 10px; }');
        },

        widget: {
            name: 'ChoiceManager',
            id: 'quiz',
            options: {
                mainText: 'Answer the following questions to check ' +
                          'your understanding of the game.',
                forms: [
                    {
                        name: 'ChoiceTable',
                        id: 'howmany',
                        mainText: 'How many players are there in this game? ',
                        choices: [ 1, 2, 3 ],
                        correctChoice: 1
                    },
                    {
                        name: 'ChoiceTable',
                        id: 'coins',
                        mainText: 'How many coins do you divide each round?',
                        choices: [
                            settings.COINS,
                            settings.COINS + 100,
                            settings.COINS + 25,
                            'Not known'
                        ],
                        correctChoice: 0
                    }
                ],
                formsOptions: {
                    shuffleChoices: true
                },
                className: 'centered'
            }
        }
    });

    stager.extendStep('game', {
        donebutton: false,
        frame: 'game.htm',
        roles: {
            DICTATOR: {
                timer: settings.bidTime,
                cb: function() {
                    var div;

                    // Make the dictator display visible and returns it.
                    div = W.show('dictator');

                    // Add widget to validate numeric input.
                    node.game.bid = node.widgets.append('CustomInput', div, {
                        type: 'int',
                        min: 0,
                        // Note: we need to specify node.game.settings,
                        // and not simply settings, because this code is
                        // executed on the client.
                        max: node.game.settings.COINS,
                        requiredChoice: true,
                        className: 'centered',
                        root: 'container',
                        mainText: 'Make an offer between 0 and ' +
                            settings.COINS + ' to another player'
                    });
                },

                timeup: function() {
                    node.game.bid.setValues();
                    node.done();
                }
            },
            OBSERVER: {
                cb: function() {
                    var div, dotsObj;

                    // Make the observer display visible.
                    div = W.show('observer');

                    dotsObj = W.addLoadingDots(W.gid('dots'));

                    node.on.data('decision', function(msg) {
                        dotsObj.stop();
                        W.setInnerHTML('waitingFor', 'Decision arrived: ');
                        W.setInnerHTML('decision',
                                       'The dictator offered: ' +
                                       msg.data + ' ECU.');

                        // Leave the decision visible for 5 seconds.
                        node.timer.wait(5000).done();
                    });
                }
            }
        }
    });

    stager.extendStep('end', {
        init: function() {
            node.game.doneButton.destroy();
            node.game.visualTimer.setToZero();
        },
        frame: 'end.htm'
    });
};
