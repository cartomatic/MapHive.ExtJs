/**
 * Test runner for Phantom JS 1.9+ and Jasmine 2.x
 * based on
 * http://lorenzoplanas.com/blog/20140302-headless-javascript-testing-with-jasmine-20
 * https://github.com/qindio/headless-jasmine-sample
 * @ignore
 */
(function() {
    //Make sure strict mode is on
    'use strict';

    var system = require('system');

    if (system.args.length !== 2) {
        console.log('[Phantom JS Test Runner] - Usage: run-jasmine.js URL');
        phantom.exit(1);
    }

    //TODO - exceptions dump path and param


    // Check for console message indicating jasmine is finished running
    var doneRegEx = /^\d+ specs, (\d+) failure/;
    var noReallyDoneRegEx = /^Finished in \d[\d\.]* second/;
    var rc;

    var page = require('webpage').create();

    //spec results as output by the console reporter
    //this is . * F or same with ANSI color codes
    var specResults = [
        '.', '*', 'F',
        '\x1B[32m.\x1B[0m', '\x1B[33m*\x1B[0m', '\x1B[31mF\x1B[0m'
    ];

    var tempmsgs = [];
    var exceptions = [];

    var dumpExceptions = function(){
        //TODO - dump exceptions to console or a file
        //if(exceptions.length > 0){
        //    console.log('[Phantom JS Test Runner] - encountered exceptions')
        //    while(exceptions.length > 0){
        //        console.log(exceptions.shift());
        //    }
        //}
    }

    /**
     * writes the temp messages to console
     */
    var writeTempMessages = function(){
        while(tempmsgs.length > 0){
            console.log(tempmsgs.shift());
        }
    }

    // Route "console.log()" calls from within the Page context
    // to the main Phantom context (i.e. current "this")

    page.onConsoleMessage = function (msg) {

        //try to customise output based on what's being logged
        //this is so the potential console warns / logs are also printed in separate lines
        //
        //if a message is . * or F print it using write, so extra lines are avoided
        if(specResults.indexOf(msg) > -1){

            //since got to the next test output can write temp msgs
            writeTempMessages();

            system.stdout.write(msg);
        }
        //otherwise just write a line
        else {

            //check if there were any failures reported in a string like '13 specs, 1 failure, 3 pending specs'
            var match = doneRegEx.exec(msg);
            if (match) {

                //since got to the test summary can write temp msgs
                writeTempMessages();

                //if there were failures make the return code 1
                rc = match[1] === "0" ? 0 : 1;
                system.stdout.writeLine("");
                system.stdout.writeLine(msg);
                return;
            }

            //check if jasmine spec runner has finished
            var match1 = noReallyDoneRegEx.exec(msg);
            if (match1) {

                //since got to the test time summary can write temp msgs. there shouldn't be any
                writeTempMessages();

                system.stdout.writeLine(msg);
                system.stdout.writeLine("");
                console.log('[Phantom JS Test Runner] - return code: ', rc, rc === 1 ? '(BOOOOOM!!!)' : '(We\'re good to go dude ;)');

                //before exiting dump exceptions if required
                dumpExceptions();

                phantom.exit(rc);
            }

            //avoid printing exceptions to console
            if(!match && !match1){

                //this is something that is either a log or an exception.
                if(msg !== '' && msg !== '\n') {

                    //keep it as a temp msg for the time being

                    tempmsgs.push(msg);

                    //if this is a stack trace, then transfer the temp msgs to the exceptions arr and clean tempmsgs arr
                    if(msg.indexOf('at stack (http') > -1){
                        while(tempmsgs.length > 0){
                            exceptions.push(tempmsgs.shift());
                        }
                        exceptions.push('');
                    }
                }
            }
        }
    };



    system.stdout.writeLine("");
    page.open(system.args[1], function (status) {
        if (status !== "success") {
            console.log("[Phantom JS Test Runner] - Couldn't load the page");
        }
        else {
            console.log("[Phantom JS Test Runner] - Page loaded");
        }
        system.stdout.writeLine("");

        //Do not exit here!
        //if there are tests that are async, then page will finish loading before the tests complete
    });

})();