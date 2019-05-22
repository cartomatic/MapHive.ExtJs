//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';
    Ext.define('mh.module.dataView.EditViewController', {
        extend: 'mh.module.dataView.RecordViewController',

        requires: [
            'Ext.History',
            'mh.module.dataView.DataViewLocalization'
        ],

        mixins: [
            'mh.mixin.CallMeParent',
            'mh.module.dataView.RecordLoader',
            'mh.mixin.ResponseValidationErrorReader',
            'mh.mixin.DirtyMode',
            'mh.mixin.PublishApi'
        ],

        init: function(){
            this.callMeParent(arguments);

            this.publishApi('setLocalSaveMode', 'loadCompleteRecord');
        },

        /**
         * whether or not record reload should be prevented
         * @param id
         * @returns {boolean|*}
         */
        shouldPreventReload: function(id, route){

            var previousRoute = this.getPreviousRoute(),
                previousRouteParams = this.getDataRouteParamsForRoute(previousRoute) || [],
                currentRouteParams = (route ? this.getDataRouteParamsForRoute(route) : this.getDataRouteParamsForCurrentRoute()),
                rp = 1,
                //when create mode is on, route is a bit different, hence need to inspect less params
                rplen = id === 'create' ? currentRouteParams.length - 1 : currentRouteParams.length,
                prevent;

            for(rp; rp < rplen; rp ++){

                if(rp === rplen - 1){
                    prevent = previousRouteParams[rp] && previousRouteParams[rp].split('/')[0] === currentRouteParams[rp].split('/')[0];
                }
                else {
                    prevent = previousRouteParams[rp] === currentRouteParams[rp];
                }

                if(!prevent){
                    break;
                }
            }

            return !!prevent || this.isDirtyModeActive();
        },

        /**
         * whether or not a local save mode is on
         */
        localSaveMode: false,

        /**
         * sets local save mode; local save mode means a remote record save does not happen. instead a modified record is returned via event
         * @param localSaveMode
         */
        setLocalSaveMode: function(localSaveMode){
            this.localSaveMode = localSaveMode;
        },

        /**
         * record load success handler
         * @param record
         */
        onRecordLoadSuccess: function(record){
            this.callMeParent(arguments);
            this.resetValidationErrs();
        },

        /**
         * @evt editview::savedismissed
         * fired when a view is dismissed
         */

        /**
         * cancel btn tap
         */
        onBtnCancelTap: function() {
            this.getView().fireEvent('editview::savedismissed', this.getViewModel().get('record'));
            this.cleanNClose();
        },

        /**
         * cleans up view and closes it; special handling for floating / windowed editors
         */
        cleanNClose: function(){
            //not unbinding so when going back is dismissed rec does not clean up!
            //moved to loadRecord method
            //this.getViewModel().set('record', null);
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

            //before testing rec dirty, do custom data collection as it may actually make the rec dirty
            this.collectComplexData();

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

            if(this.localSaveMode){
                //do not save remotely. go straight to save success handler
                this.onSaveSuccess(rec);
            }
            else {
                this.saveRecord(rec, this.onSaveSuccess,this.onSaveFailure);
            }
        },

        /**
         * saves a single record and returns control to provided callbacks
         * @param record
         * @param success
         * @param failure
         */
        saveRecord: function(record, success, failure){
            var me = this,

                exceptionMsg = record.get('uuid') ?

                    //try to obtain the translation from a derived class first, but make the call return null if not found instead of the standard
                    //'translation not found msg', then look at the 'mh.module.dataView.DataViewLocalization' namespace that indeed provides a standard localization
                    this.getTranslation('failedCreate', null, true) || this.getTranslation('failedCreate', 'mh.module.dataView.DataViewLocalization')
                    :
                    this.getTranslation('failedUpdate', null, true) || this.getTranslation('failedUpdate', 'mh.module.dataView.DataViewLocalization'),

                loadMaskMsg = record.get('uuid') ?

                    //try to obtain the translation from a derived class first, but make the call return null if not found instead of the standard
                    //'translation not found msg', then look at the 'mh.module.dataView.DataViewLocalization' namespace that indeed provides a standard localization
                    this.getTranslation('updateLoadMask', null, true) || this.getTranslation('updateLoadMask', 'mh.module.dataView.DataViewLocalization')
                    :
                    this.getTranslation('createLoadMask', null, true) || this.getTranslation('createLoadMask', 'mh.module.dataView.DataViewLocalization'),

                //save op cfg
                cfg = {
                    scope: this,
                    success: success,
                    failure: failure,
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

                    record.save(saveCfg);
                };

            //retry fn
            cfg.retry = op;

            op();
        },

        /**
         * @event editview::savecompleted
         * fired when record gets saved
         * @param record
         */

        /**
         * save success handler
         * @param record
         */
        onSaveSuccess: function(record){
            this.getView().fireEvent('editview::savecompleted', record);
            this.afterRecordSave(record);
            this.hideLoadMask();
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
                    : this.getFriendlyServerValidationFeedback(response.responseText || response.responseJson)
            );
        },

        /**
         * after rec save tpl for custom logic
         * @template
         * @param record
         */
        afterRecordSave: Ext.emptyFn,

        /**
         * a hook for collecting data that require custom processing
         * @template
         */
        collectComplexData: Ext.emptyFn,


        /**
         * Adds a diff with links to the record
         * @param diff1
         * @param diff2
         * @param diff3
         * @param etc...
         * @param {boolean} [reset=false]; whether or not the original links collection should be replaced with the incoming data
         */
        addLinksDiff: function(){
            var links = [], a = 0, alen = arguments.length,
                reset = false;

            if(alen === 0){
                return;
            }

            //last param tells if the original links object should be reset
            if(Ext.isBoolean(arguments[alen - 1])){
                reset = arguments[alen - 1];
                alen -= 1; //decrease the bounds, as last param is a switch
            }

            for(a; a < alen; a++){
                links.push(arguments[a]);
            }

            this.addLinksDiffBulk(links, reset);
        },

        /**
         * add links to record in a bulk
         * @param linkDiffs
         * @param reset
         */
        addLinksDiffBulk: function(linkDiffs, reset){
            var rec = this.getViewModel().get('record'),
                links, ld = 0, ldlen = linkDiffs.length, diff;

            if(!rec || ldlen === 0){
                return;
            }

            links = reset ? {} : rec.get('links') || {};

            for(ld; ld < ldlen; ld++){
                diff = linkDiffs[ld] || {};

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