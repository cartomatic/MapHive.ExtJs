//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict'
    
    Ext.define('mh.module.dataView.phone.ModalEditViewWizardController', {
        extend: 'Ext.app.ViewController',
        alias: 'controller.mh-phone-modal-edit-view-wizard',

        requires: [

        ],

        mixins: [
            'mh.module.dataView.phone.EditViewWizardSharedController'
        ],

        /**
         * Called when the view is created
         */
        init: function() {
            this.setUpWizardMode();
        },

        /**
         * view activate handler
         */
        onViewActivate: function() {
            //Note: this is buggy, when the first view or all the views are dict list pickers and they have no entries set up yet
            //in such scenario automated jump to next view kicks in and the vies start spinning back and forth.
            //adding a first non-auto-skip view is a temporary solution
            //making a dict only skip when flagged as set up could be an option too
            this.rewindToFirstView();
        }
    });
}());
