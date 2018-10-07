//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';
    Ext.define('mh.module.dataView.desktop.EditViewController', {
        extend: 'mh.module.dataView.EditViewSharedController',
        alias: 'controller.mh-desktop-edit-view',

        requires: [
            'Ext.History',
            'mh.module.dataView.DataViewLocalization'
        ],

        mixins: [
            'mh.mixin.CallMeParent',
            'mh.module.dataView.RecordLoader',
            'mh.mixin.ResponseValidationErrorReader'
        ],

        init: function(){
            //when view kicks in, make sure to add its items
            this.getView().on('initialize', this.onViewInitialize, this);
            this.callMeParent(arguments);
        },

        /**
         * handles view initialization setup - this is where the screens cfg gets processed
         * @param vw
         * @param eOpts
         */
        onViewInitialize: function(vw, eOpts){
            vw.lookup('tabPanel').add(vw.getScreens());

            this.configureActionBtns();
        },

        /**
         * cleans up view and closes it; special handling for floating / windowed editors
         */
        cleanNClose: function(){
            this.hideLoadMask();
            if(this.getView().getFloated()){
                this.getView().close();
            }
            else{
                Ext.History.back();
            }
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

            Ext.Array.each(this.getView().down('panel'), function(panel){
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

            Ext.Array.each(this.getView().down('panel'), function(panel){
                Ext.Array.each(panel.items.items, function(fld){
                    if(Ext.isFunction(fld.setError)){
                        fld.setError(null); //aka clearInvalid
                    }
                });
            });
        }
    });
}());