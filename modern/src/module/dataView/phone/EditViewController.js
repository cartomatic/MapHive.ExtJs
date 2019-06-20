//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function(){
    //Make sure strict mode is on
    'use strict';
    Ext.define('mh.module.dataView.phone.EditViewController', {
        extend: 'mh.module.dataView.EditViewController',
        alias: 'controller.mh-phone-edit-view',

        requires: [
            'Ext.History',
            'mh.module.dataView.DataViewLocalization'
        ],

        mixins: [
            'mh.mixin.CallMeParent',
            'mh.module.dataView.RecordLoader',
            'mh.mixin.ResponseValidationErrorReader',
            'mh.mixin.DirtyMode'
        ],

        init: function(){
            this.callMeParent(arguments);

            this.setUpActionBtns();

            var vw = this.getView(),
                viewItems = vw.getViewItems(),
                viewItemsHolder = this.lookupReference('viewItemsHolder');

            if(viewItemsHolder && viewItems && viewItems.length > 0){
                viewItemsHolder.add(viewItems);
            }
        },

        onRecordLoadSuccess: function(record){
            this.callMeParent(arguments);

            //mark self as clean
            this.endDirtyMode(true);
        },

        /**
         * sets up action btns for this view
         */
        setUpActionBtns: function(){
            var vw = this.getView(),
                enableSave = vw.getEnableSave(),
                enableDismiss = vw.getEnableDismiss();

            if(enableSave){
                this.lookupReference('saveBtn').show();
            }

            if(enableDismiss){
                this.lookupReference('dismissBtn').show();
            }
        },

        /**
         * btn dismiss tap handler
         */
        onBtnDismissTap: function(){
            //simply navigate back from this view
            Ext.History.back();
        },

        /**
         * Provides a hook into a validation logic for the handled form; by default always returns true.
         * When invalid either a msg or a collection of msgs should be returned; alternatively can return false, so an editor displays its default msg
         * when valid boolean true should be returned;
         * example output;
         *  return false; //this should trigger a default msg
         *  return ['test validation msg 1', 'test validation msg 2']; //this should display a list of msgs
         *  return 'test validation msg 1'; //this will display one msg
         *  return true; //this means a form is valid as far as its controller is concerned
         *
         * To customise the feedback msg, have a look at mh.module.dataView.EditorController.showValidationMsg
         * @template
         * @returns {boolean}
         */
        isValid: function(){
            var invalidFields = [];

            Ext.Array.each(this.getView().down('panel[reference=viewItemsHolder]'), function(panel){
                Ext.Array.each(panel.items.items, function(fld){
                    if(Ext.isFunction(fld.validate)){
                        fld.validate(); //aka clearInvalid
                        if(!fld.isValid()){
                            invalidFields.push(fld.getLabel())
                        }
                    }
                });
            });

            if(invalidFields.length > 0){
                return (this.getTranslation('invalidFieldsMsg', null, true) || this.getTranslation('invalidFieldsMsg', 'mh.module.dataView.DataViewLocalization')) + invalidFields.join(', ');
            }

            return true;
        },

        /**
         * resets form validation errors visual indicators
         */
        resetValidationErrs: function(){

            //forms are placed in a tabpanel, so tabpanel's children should be panels/ forms
            //find all panels inside
            //with default maphive's data handling approach, form panel is not used, as the data is bound to a record
            //and then posted directly to the server.

            Ext.Array.each(this.getView().down('container'), function(panel){
                Ext.Array.each(panel.items.items, function(fld){
                    if(Ext.isFunction(fld.setError)){
                        fld.setError(null); //aka clearInvalid
                    }
                });
            });
        },

        /**
         * marks self as clean prior to finalising save
         * @param record
         */
        onSaveSuccess: function(record){
            //waive off dirty mode
            this.endDirtyMode(true); //silent end - do not restore route!!!;

            this.callMeParent(arguments);
        },

        /**
         * shows loadmask for this module
         * @param msg
         */
        showLoadMask: function(msg){
            this.fireGlobal('loadmask::show', msg);
        },

        /**
         * hides loadmask for this module
         */
        hideLoadMask: function(){
            this.fireGlobal('loadmask::hide');
        },

        /**
         * whether or not the view is currently active
         */
        isActive: false,

        __onViewActivate: function() {
            this.isActive = true;
        },

        __onViewDeactivate: function(){
            this.isActive = false;
        }
    });
}());