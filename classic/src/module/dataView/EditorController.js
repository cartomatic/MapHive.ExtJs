//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.module.dataView.EditorController', {
        extend: 'Ext.app.ViewController',
        alias: 'controller.mh-editor',

        requires: [
            'mh.module.dataView.EditorLocalisation'
        ],

        mixins: [
            'mh.mixin.ModalMode',
            'mh.mixin.Localisation',
            'mh.mixin.PublishApi',
            'mh.mixin.CustomComponentConfig',
            'mh.mixin.ResponseValidationErrorReader'
        ],

        /**
         * @event savecomplete
         * Fired whenever the save completes and the form closes. when success is false it pretty much means the form was dismissed by a user
         * @param {boolean} success
         * @param {Ext.data.Model} record
         */

        /**
         * Called when the view is created
         */
        init: function() {
            this.injectLocalisationToViewModel()
            this.trackModalModeStatus();
            this.publishApi(['setRecord', 'getRecord', 'setForm', 'getForm']);

            //apply custom configurations
            this.applyCustomViewConfig();

            //Note: the editor window is designed to adjust its size to the size of the child components (it hs its min width though). because of that (the editor window does not enforce the dimensions) there are some layout related errors that happen to popout: [E] Layout run failed; This is caused by the child components not declaring theit width explicitly but relying on the parent to enforce it. Also some layout rendering problems may happen - invalid sizing and such - that seem to be fixed once the editor window is resized - this causes layout reflow. Because of that on the very first show editor is forced to resize itself and trigger layout reflow
            this.getView().on(
                'show',
                function(vw){
                    vw.setWidth(vw.getWidth() + 1);
                    //vw.setWidth(vw.getWidth() - 1);
                },
                this,
                {
                    single: true
                }
            );
        },

        onBtnCancelClick: function(){
            //clear all the changes on a record
            var vm = this.getViewModel(),
                rec = vm.get('rec');

            //wipe out all the rec changes
            rec.reject();

            //bind null to self and also to form
            vm.set('rec', null);

            this.editorForm.setRecord(null);

            this.editMode = null;

            //and hide itself
            this.getView().hide();


            //since cancelled, the success of the savecomplete is false (on success, the form closes itself, so there is no chance user exits edit manually after saving)
            //this is so the editor always fires savecomplete on dismiss
            this.getView().fireEvent('savecomplete', false, null);
        },

        /**
         * editor editMode - either new or edit
         */
        editMode: null,

        /**
         * Sets a record that is about to be edited / created
         * @param rec
         */
        setRecord: function(rec){
            var vw = this.getView(),
                btnSave = this.lookupReference('btnSave');

            if(rec.get('uuid')){
                //edit as id is present and in this case the record must have been provided by the server in some way
                vw.setTitle(this.getTranslation('titleEdit'));
                vw.setIconCls(vw.getIconClsEdit());
                btnSave.setText(this.getTranslation('btnSaveEdit'));
                btnSave.setIconCls(vw.getIconClsBtnSaveEdit());
                this.editMode = 'edit';
            }
            else {
                //looks like this is a new record
                vw.setTitle(this.getTranslation('titleNew'));
                vw.setIconCls(vw.getIconClsNew());
                btnSave.setText(this.getTranslation('btnSaveNew'));
                btnSave.setIconCls(vw.getIconClsBtnSaveNew());
                this.editMode = 'new';
            }

            this.bindRecord(rec);
        },

        /**
         * a getter for the bound record
         * @returns {*}
         */
        getRecord: function(){
            return this.getViewModel().get('rec');
        },

        /**
         * Binds a record to the appropriate viewmodels
         * @param rec
         */
        bindRecord: function(rec){
            //Set the rec on own viewmodel too, so can handle it properly on cancel or error
            this.getViewModel().set('rec', rec);

            //Note: edit form can be instantiated anywhere, so there is no guarantee it will be instantiated by this view. therefore it is more than likely the viewmodels will not be connected at all! Because of that it is required to pass the record further, so the edit form can properly bind itself to it
            this.editorForm.setRecord(rec);
        },

        /**
         * unbinds the record
         */
        unbindRecord: function(){
            this.getViewModel().set('rec', null);
            this.editorForm.setRecord(null);
        },

        /**
         * edit form; it is expected that this form exposes API as defined in mh.module.dataView.GenericEditFormController
         * @private
         */
        editorForm: null,

        /**
         * Sets the edit form to be used by the editor
         * @param form
         */
        setForm: function(form){
            this.editorForm = this.getView().add(form);
        },

        /**
         * gets configured editor form
         * @returns {null}
         */
        getForm: function(){
            return this.editorForm;
        },

        /**
         * checks if a hosted form is valid; this depends on the isValid method being available on the hosted form.
         * if such method is not available then it is assumed the form is valid.
         * If a form is not valid, the expected output is a msg or a collection of msgs that should be displayed to a user; alternatively returning false should trigger
         * displaying a default msg;
         * it's on a discretion of a form to decide whether to show a msg with a single field err or a combined one
         */
        isValid: function(){
            var isValid = true;
            if(Ext.isFunction(this.editorForm.isValid)){
                isValid = this.editorForm.isValid();
            }
            return isValid;
        },


        /**
         * Save btn click callback
         * @param btn
         */
        onBtnSaveClick: function(btn){

            var valid = this.isValid();

            if(valid !== true){
                this.showValidationMsgClientErr(valid, btn);
                return;
            }

            //about to save, so need to mask itself
            this.getView().mask(
                this.getTranslation('saveMask' + this.editMode.substring(0,1).toUpperCase() + this.editMode.substring(1))
            );

            //hook to savecomplete
            this.editorForm.on('savecomplete', this.onSaveComplete, this, {single: true});

            //and save...
            //btw save is delegated to the editor form, so devs can decide if they want to use a standard model save or some custom procedure
            this.editorForm.save();
        },

        /**
         *
         * @param success
         * @param record
         * @param validationFeedback
         */
        onSaveComplete: function(success, record, validationFeedback){
            var vw = this.getView();

            //unmask
            vw.unmask();

            //if save ok, then just hide itself
            if(success){

                vw.hide();

                //rebroadcast the evt
                vw.fireEvent('savecomplete', success, record);

                //and reset rec bound to editor form
                this.unbindRecord();
            }
            else {
                //uhuh, looks like it's a server err...
                this.showValidationMsgServerErr(validationFeedback);
            }
        }
    });

}());