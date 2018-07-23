//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';
    Ext.define('mh.module.dataView.EditViewController', {
        extend: 'mh.module.dataView.RecordViewController',
        alias: 'controller.mh-edit-view',

        requires: [
            'Ext.History',
            'mh.module.dataView.DataViewLocalization',
            'mh.mixin.ResponseValidationErrorReader'
        ],

        mixins: [
            'mh.mixin.CallMeParent',
            'mh.module.dataView.RecordLoader'
        ],

        init: function(){
            this.callMeParent('init', arguments);
        },

        /**
         * record load success handler
         * @param record
         */
        onRecordLoadSuccess: function(record){
            this.callMeParent('onRecordLoadSuccess', arguments);
            this.resetValidationErrs();
        },

        /**
         * cancel btn tap
         */
        onBtnCancelTap: function() {
            this.getView().fireEvent('editview::savecancelled');
            this.cleanNClose();
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
            //TODO - auto validation???
            //perfield validate() / isValid calls
            //return validations as expected by the mh.mixin.ResponseValidationErrorReader mixin!!!

            return true;
        },

        /**
         * resets form validation errors visual indicators
         */
        resetValidationErrs: function(){

            Ext.Array.each(this.getView().getItems().items, function(form){
                //fixme
                // Ext.Array.each(form.getFields(false, true), function(fld){
                //     fld.setError(null); //aka clearInvalid
                // });
            });
        },

        /**
         * save btn tap handler - initiates save procedure
         */
        onBtnSaveTap: function() {

            var valid = this.isValid(),
                rec = this.getViewModel().get('record');

            if(valid !== true){
                this.showValidationMsgClientErr(valid);
                return;
            }
            else {
                this.resetValidationErrs();
            }

            //check if record is dirty. if not, nothing's changed
            if (!rec.isDirty()) {
                this.cleanNClose();
                return;
            }


            //Note:
            //basically it is assumed the view binds to the record via view model,
            //so all the view changes are expressed at the record level straight away;
            //customised binding (stuff like arrays to grids, custom json data, etc.) can also be done transparently as required;
            //therefore the default functionality is to grab a record and perform a save on it.


            var me = this,

                exceptionMsg = rec.get('uuid') ?

                    //try to obtain the translation from a derived class first, but make the call return null if not found instead of the standard
                    //'translation not found msg', then look at the 'mh.module.dataView.DataViewLocalization' namespace that indeed provides a standard localization
                    this.getTranslation('failedCreate', null, true) || this.getTranslation('failedCreate', 'mh.module.dataView.DataViewLocalization')
                    :
                    this.getTranslation('failedUpdate', null, true) || this.getTranslation('failedUpdate', 'mh.module.dataView.DataViewLocalization'),

                loadMaskMsg = rec.get('uuid') ?

                    //try to obtain the translation from a derived class first, but make the call return null if not found instead of the standard
                    //'translation not found msg', then look at the 'mh.module.dataView.DataViewLocalization' namespace that indeed provides a standard localization
                    this.getTranslation('createLoadMask', null, true) || this.getTranslation('createLoadMask', 'mh.module.dataView.DataViewLocalization')
                    :
                    this.getTranslation('updateLoadMask', null, true) || this.getTranslation('updateLoadMask', 'mh.module.dataView.DataViewLocalization'),

                //save op cfg
                cfg = {
                    scope: this,
                    success: this.onSaveSuccess,
                    failure: this.onSaveFailure,
                    exceptionMsg: exceptionMsg,
                    autoIgnore404: false, //this is required to show msg on 404 which will often be the case in dev mode!
                    suppress400: true//so can handle 400 here
                },

                //request callback
                callback = this.generateModelRequestCallback(cfg),

                op = function() {

                    me.showLoadMask(loadMaskMsg);

                    var saveCfg = {
                        callback: callback
                    };
                    //customise save url for the proxy!
                    if(me.getView().getCustomUrl()){
                        saveCfg.url = me.getView().getCustomUrl();
                    }
                    rec.save(saveCfg);
                };

            //retry fn
            cfg.retry = op;

            op();

        },

        /**
         * @event recordsaved
         * fired when record gets saved
         * @param record
         */

        /**
         * save success handler
         * @param record
         */
        onSaveSuccess: function(record){
            this.getView().fireEvent('editview::savecomplete', record);
            this.afterRecordSave(record);
            this.cleanNClose();
        },

        /**
         * save failure handler
         */
        onSaveFailure: function(response, validationOutput){
            this.hideLoadMask();

            //uhuh, looks like it's a server err...
            this.showValidationMsgServerErr(
                validationOutput.handled
                    ? null
                    : this.getFriendlyServerValidationFeedback(response.responseText)
            );
        },

        /**
         * after rec save tpl for custom logic
         * @template
         * @param record
         */
        afterRecordSave: Ext.emptyFn,

        /**
         * Adds a diff with links to the record
         * @param diff1
         * @param diff2
         * @param diff3
         * @param etc...
         * @param {boolean} [reset=false]; whether or not the original links collection should be replaced with the incoming data
         */
        addLinksDiff: function(){
            var rec = this.getViewModel().get('record'),
                links, a = 0, alen = arguments.length, diff,

                reset = false;

            if(!rec || alen === 0){
                return;
            }

            //last param tells if the original links object should be reset
            if(Ext.isBoolean(arguments[alen - 1])){
                reset = arguments[alen - 1];
                alen -= 1; //decrease the bounds, as last param is a switch
            }


            links = reset ? {} : rec.get('links') || {};

            for(a; a < alen; a++){
                diff = arguments[a] || {};

                if(diff.upsert && diff.upsert.length > 0){
                    links.upsert = Ext.Array.merge(links.upsert || [], diff.upsert);
                }

                if(diff.destroy && diff.destroy.length > 0){
                    links.destroy = Ext.Array.merge(links.destroy || [], diff.destroy);
                }
            }

            rec.set('links', links);
        }
    });
}());