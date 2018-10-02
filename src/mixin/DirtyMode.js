//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';


    var dirtyModeActive = false,
        dirtyModeRouteSnapshot = null,

        logHdr = '[DIRTY MODE],_s::,olive,',

        startDirtyMode = function(){
            dirtyModeRouteSnapshot = window.location.hash.replace('#', '');
            dirtyModeActive = true;
        },

        endDirtyMode = function(supressRouteRestore){
            dirtyModeActive = false;

            //bring back the pre-dirty hash and reset it
            //In a case route has been changed but not fixed because of some reason this will fix things
            //WARNING - this may be potentially problematic when working with piped routes. They'd have to be applied prior to entering dirty mode 'officially'

            if(!supressRouteRestore){
                //<debug>
                console.log(logHdr, 'current href:', window.location.href);
                console.log(logHdr, '', 'dirty mode route snapshot:', dirtyModeRouteSnapshot);
                //</debug>

                window.location.hash = dirtyModeRouteSnapshot;
                dirtyModeRouteSnapshot = null;
            }
        };

    /**
     * Mixin used to provide router blocking functionality; if there are components in use that should be saved prior to leaving it
     */
    Ext.define('mh.mixin.DirtyMode', {

        mixins: [
            'mh.communication.MsgBus',
            'mh.mixin.Localization'
        ],

        requires: [
            'mh.communication.MsgBus',
            'mh.mixin.DirtyModeLocalization'
        ],

        statics: {
            onDirtyModeStart: function(){
                startDirtyMode();
                //<debug>
                console.log(logHdr, 'Started');
                //</debug>
            },
            onDirtyModeEnd: function(){
                endDirtyMode();
                //<debug>
                console.log(logHdr, 'Ended');
                //</debug>
            }
        },

        /**
         * modalMode started
         */
        startDirtyMode: function(){
            startDirtyMode();
            //<debug>
            console.log(logHdr, 'started');
            //</debug>

            //fire xWindow, so can have a 'shared' dirty mode; firing only to host
            this.fireGlobal('dirtymode::start', null, {suppressLocal: true, host: true});
        },

        /**
         * modal mode finished
         * @param supressRouteRestore whether or not the default route restore should be supressed
         */
        endDirtyMode: function(supressRouteRestore){
            endDirtyMode(supressRouteRestore);
            //<debug>
            console.log(logHdr, 'ended');
            //</debug>

            //fire xWindow, so can have a 'shared' dirty mode; firing only to host
            this.fireGlobal('dirtymode::end', null, {suppressLocal: true, host: true});
        },

        /**
         * whether or not dirty mode is active for a route that is being set
         * @returns {boolean}
         */
        getDirtyModeActive: function(){
            return dirtyModeActive && window.location.hash.replace('#', '') !== dirtyModeRouteSnapshot;
        },

        /**
         * gets a dirty mode route snapshot so it can be restored
         * @returns {*}
         */
        getDirtyModeRouteSnapshot: function(){
            return dirtyModeRouteSnapshot;
        },

        /**
         * gets dirt mode info title
         * @returns {*}
         */
        getDirtyModeTitle: function(){
            return this.getTranslation('dirtyModeTitle', 'mh.mixin.DirtyModeLocalization');
        },

        /**
         * gets dirt mode info msg
         * @returns {*}
         */
        getDirtyModeMsg: function(){
            return this.getTranslation('dirtyModeMsg', 'mh.mixin.DirtyModeLocalization');
        }
    },
    function(){
        //we're not instance based here, so the access to the mixed in MsgBus is not possible. but wiring up events to statics is...
        //because of that, need to instantiate the MsgBus - even though MsgBus is meant to be used as a mixin it is save to do so
        //since communication is mixed into this class, it should be available here
        Ext.create('mh.communication.MsgBus').watchGlobal('dirtymode::start', this.onDirtyModeStart, this);
        Ext.create('mh.communication.MsgBus').watchGlobal('dirtymode::end', this.onDirtyModeEnd, this);
    });

}());