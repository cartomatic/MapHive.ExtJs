//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict'
    
    Ext.define('mh.module.dataView.orgUsers.EditViewController', {
        extend: 'mh.module.dataView.EditViewDesktopController',
        alias: 'controller.mh-org-users-edit-view',

        requires: [
            'mh.module.dataView.orgUsers.EditViewLocalization'
        ],

        mixins: [
            'mh.mixin.CallMeParent',
            'mh.mixin.OrganizationUtils',
            'mh.mixin.ApiMap'
        ],

        init: function(){
            this.callMeParent(arguments);

            this.getView().on('activate', this.onViewActivate, this);
        },

        onViewActivate: function(){
            mh.data.model.OrganizationUser.getProxy().setUrl(this.getApiEndPointUrl('organizationUsers'));
        },

        saveRecord: function(record, success, failure){
            if(this.isOrgsOwnUser(record)){
                //own user, so a regular save
                this.callMeParent(arguments);
            }
            else {
                //not own user, so need to disable all the fields BUT org roles combo
                var me = this,
                    exceptionMsg = this.getTranslation('failedUpdate', null, true) || this.getTranslation('failedUpdate', 'mh.module.dataView.DataViewLocalization'),
                    loadMaskMsg = this.getTranslation('updateLoadMask', null, true) || this.getTranslation('updateLoadMask', 'mh.module.dataView.DataViewLocalization'),

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
                            callback: callback,
                            url: me.getApiEndPointUrl('organizationUsersLink')
                        };

                        record.save(saveCfg);
                    };

                //retry fn
                cfg.retry = op;

                op();
            }
        }
    });
}());
