//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){

    //Make sure strict mode is on
    'use strict';
    Ext.define('mh.module.dataView.phone.EditViewWizardController', {
        extend: 'mh.module.dataView.phone.EditViewController',
        alias: 'controller.mh-phone-edit-view-wizard',

        requires: [
            'Ext.History',
            'mh.module.dataView.DataViewLocalization'
        ],

        mixins: [
            'mh.mixin.CallMeParent',
            'mh.module.dataView.phone.EditViewWizardSharedController'
        ],

        init: function(){
            this.callMeParent(arguments);
            this.setUpWizardMode();

            this.setUpSwipe();
        },

        /**
         * avoid setting up the default edit btns!
         */
        setUpActionBtns: Ext.emptyFn,

        /**
         * view activate handler
         */
        onViewActivate: function() {
            //this method is mixed in, not inherited, hence cannot call parent directly
            this.callMeParent(arguments);

            //Note: this is buggy, when the first view or all the views are dict list pickers and they have no entries set up yet
            //in such scenario automated jump to next view kicks in and the vies start spinning back and forth.
            //adding a first non-auto-skip view is a temporary solution
            //making a dict only skip when flagged as set up could be an option too
            this.rewindToFirstView();
        },

        /**
         * always valid as wizard forms perform own per form validation!
         * @returns {boolean}
         */
        isValid: function(){
            return true;
        },

        onBtnSaveTap: function(){
            if(this.validateWizardForms()){
                this.callMeParent(arguments);
                return;
            }

            //if not valid - validation has already taken care of the view behavior, msgs, etc.
        }

    });
}());