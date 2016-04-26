//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';


    var modalModeActive = false,
        modalModeRouteSnapshot = null,

        startModalMode = function(){
            modalModeRouteSnapshot = window.location.hash.replace('#', '');
            modalModeActive = true;
        },

        endModalMode = function(){
            modalModeActive = false;

            //bring back the pre-modal hash and reset it
            //In a case route has been changed but not fixed because of some reason this will fix things
            //WARNING - this may be potentially problematic when working with piped routes. They'd have to be applied prior to entering modal mode 'officially'

            window.location.hash = modalModeRouteSnapshot;
            modalModeRouteSnapshot = null;
        };


    /**
     * Mixin used to provide router blocking functionality; if there are modal components in use that should ignore route changes while being shown,
     * just use this mixin and
     */
    Ext.define('mh.mixin.ModalMode', {

        mixins: [
            'mh.communication.MsgBus'
        ],

            requires: [
        'mh.communication.MsgBus'
    ],

        statics: {
            onModalModeStart: function(){
                //<debug>
                console.log('[MODAL MODE] - Started at child level.');
                //</debug>
                startModalMode();
            },
            onModalModeEnd: function(){
                //<debug>
                console.log('[MODAL MODE] - Ended at child level.');
                //</debug>
                endModalMode();
            }
        },

    /**
         * @property {boolean}
         * whether or not any component has entered a modal mode;
         * has a meaning only when watching the modal mode
         * @private
         */


        /**
         * @property {string}
         * @private
         * a route snapshot taken when modal mode was started
         * used to restore it if one tries to navigate using back/forth buttons
         * or by directly modifying the hash while in modal mode
         */

        /**
         * modalMode started
         */
        startModalMode: function(){
            //<debug>
            console.log('[MODAL MODE] - started.');
            //</debug>
            startModalMode();

            //fire xWindow, so can have a 'shared' modal mode; firing only to host, pretty much because if a host is in modal mode
            //it is likely to handle own modal mode anyway!
            this.fireGlobal('modalmode::start', null, {suppressLocal: true, host: true});
        },

        /**
         * modal mode finished
         */
        endModalMode: function(){
            //<debug>
            console.log('[MODAL MODE] - etarted.');
            //</debug>
            endModalMode();

            //fire xWindow, so can have a 'shared' modal mode; firing only to host, pretty much because if a host is in modal mode
            //it is likely to handle own modal mode anyway!
            this.fireGlobal('modalmode::end', null, {suppressLocal: true, host: true});
        },

        getModalModeActive: function(){
            return modalModeActive;
        },

        getModalModeRouteSnapshot: function(){
            return modalModeRouteSnapshot;
        },

        /**
         * wires up modal mode status tracking to the show/hide/close events of the handled view
         * should be used by the controllers of modal components in order to automatically handle modal mode broadcasting events
         */
        trackModalModeStatus: function(){
            this.getView().on({
                show: this.startModalMode,
                hide: this.endModalMode,
                close: this.endModalMode,
                scope: this
            });
        },

        /**
         * unwires modal mode status tracking from the show/hide/close events of the handled view
         * should be used by the controllers of modal components in order to automatically disable handling modal mode broadcasting events
         */
        untrackModalModeStatus: function(){
            this.getView().un({
                show: this.startModalMode,
                hide: this.endModalMode,
                close: this.endModalMode,
                scope: this
            });
        }
    },
    function(){
        //we're not instance based here, so the access to the mixed in MsgBus is not possible. but wiring up events to statics is...
        //because of that, need to instantiate the MsgBus - even though MsgBus is meant to be used as a mixin it is save to do so
        //since communication is mixed into this class, it should be available here
        Ext.create('mh.communication.MsgBus').watchGlobal('modalmode::start', this.onModalModeStart, this);
        Ext.create('mh.communication.MsgBus').watchGlobal('modalmode::end', this.onModalModeEnd, this);
    });

}());