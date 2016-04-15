//Disable some of the JSLint warnings
/*global Ext,console,MapHive,mh*/
(function(){
    //Make sure strict mode is on
    'use strict';

    /**
     * Responsible for handling the uer authentication related functionality. The UI is toolkit specific; this controller uses the default modules
     */
    Ext.define('mh.controller.Auth', {
        extend: 'Ext.app.Controller',

        mixins: [
            'mh.msgBus.Global',
            'mh.util.console.Formatters'
        ],

        /**
         * @event auth::userauthenticated
         */

        init: function(){
            //<debug>
            console.log(this.cStdIcon('info'), this.cDbgHdr('auth ctrl'), 'initialised');
            //</debug>

            //setup the required evt listeners
            this.watchGlobal('root::authenticateuser', this.onAuthenticateUser, this, {single: true});

        },

        onLaunch: function(){
            //<debug>
            console.log(this.cStdIcon('info'), this.cDbgHdr('auth ctrl'), 'launched');
            //</debug>

            //so far nothing to do here
        },

        onAuthenticateUser: function(evtData){
            console.log('Received root::authenticateuser evt with the following data: ', evtData);
            console.log('Faking authentication...');

            //Note:
            //Authentication will require some UI. So it is crucial, there is a the same login view entry point for both toolkits.
            //otherwise requires will cause problems!

            var me = this;
            // setTimeout(
            //     function(){
            //         me.fireGlobal('auth::userauthenticated', 'some auth feedback data');
            //     },
            //     1000
            // );
            me.fireGlobal('auth::userauthenticated', 'some auth feedback data');
        }
    });

}());