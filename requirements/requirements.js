/**
 * # Requirements functions
 * Copyright(c) {YEAR} {AUTHOR} <{AUTHOR_EMAIL}>
 * MIT Licensed
 *
 * Processes the settings and sets the requirements for accessing the channel.
 *
 * http://nodegame.org
 * ---
 */
module.exports = function(requirements, settings) {

    var ngr = require('nodegame-requirements');

    var errBegin;
    errBegin = 'An error occurred while loading the requirements for game ' +
        requirements.gameName + '. Err: ';

    if (settings.nodegameBasic !== false) {
        requirements.add(ngr.nodegameBasic);
    }

    if (settings.loadFrameTest !== false) {
        requirements.add(ngr.loadFrameTest);
    }

    if (settings.cookieSupport) {
        requirements.add(ngr.cookieSupport, settings.cookieSupport);
    }

    if ('object' === typeof settings.speedTest) {
        requirements.add(ngr.speedTest, settings.speedTest);
    }
    else if ('undefined' !== typeof settings.speedTest) {
        throw new TypeError(errBegin + 'speedTest must be object ' +
                            'or undefined. Found: ' + settings.speedTest);
    }

    if ('object' === typeof settings.viewportSize) {
        requirements.add(ngr.viewportSize, settings.viewportSize);
    }
    else if ('undefined' !== typeof settings.viewportSize) {
        throw new TypeError(errBegin + 'viewportSize must be object ' +
                            'or undefined. Found: ' + settings.viewportSize);
    }

    if ('number' !== typeof settings.maxExecTime && settings.maxExecTime > 0) {
        requirements.setMaxExecutionTime(settings.maxExecTime);
    }
    else if ('number' !== typeof settings.maxExecTime) {
        throw new TypeError(errBegin + 'maxExecTime must be number > 0 ' +
                            'or undefined. Found: ' + settings.maxExecTime);
    }

    // Experimental.
    if ('undefined' !== typeof settings.excludeBrowsers) {
        requirements.add(ngr.browserDetect, settings.excludeBrowsers);
    }

    // requirements.add(ngr.testFail);
    // requirements.add(ngr.testSuccess);

    requirements.onFailure(function() {
        var str, args;
        console.log('failed');
        str = '%spanYou are NOT allowed to take the HIT. If you ' +
            'have already taken it, you must return it.%span';
        args = {
            '%span': {
                'class': 'requirements-fail'
            }
        };
        W.sprintf(str, args, this.summaryResults);

        // You can leave a feedback using the form below.
        // window.feedback = node.widgets.append('Feedback', div);
    });

    requirements.onSuccess(function() {
        var str, args;
        str = '%spanYou are allowed to take the HIT.%span';
        args = {
            '%span': {
                'class': 'requirements-success'
            }
        };
        W.sprintf(str, args, this.summaryResults);
    });

    // Either success or failure.
    // requirements.onComplete(function() {
    // ...something.
    // });

};
