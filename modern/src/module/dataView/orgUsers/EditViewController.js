//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict'
    
    Ext.define('mh.module.dataView.orgUsers.EditViewController', {
        extend: 'mh.module.dataView.EditViewController',
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

        onRecordLoadSuccess: function(record){
            this.callMeParent(arguments);

            if(this.isOrgsOwnUser(record)){

            }
            else {
                //not own user, so need to disable all the fields BUT org roles combo
            }
        }
    });
}());
