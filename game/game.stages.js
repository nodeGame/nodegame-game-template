/**
 * # Game stages definition file
 * Copyright(c) {YEAR} {AUTHOR} <{AUTHOR_EMAIL}>
 * MIT Licensed
 *
 * Stages are defined using the stager API
 *
 * http://www.nodegame.org
 * ---
 */

module.exports = function(stager, settings) {

     stager
        .stage('instructions')

        .stage('quiz')

        .repeatStage('game', settings.ROUNDS)

        .stage('end')

        .gameover();


    // Notice: here all stages have one step named after the stage.

    // Skip one stage.
    // stager.skip('instructions');

    // Skip multiple stages:
    // stager.skip([ 'instructions', 'quiz' ])

    // Skip a step within a stage:
    // stager.skip('stageName', 'stepName');

};
