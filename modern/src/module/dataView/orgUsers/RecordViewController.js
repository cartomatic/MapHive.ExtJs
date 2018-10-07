//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.module.dataView.orgUsers.RecordViewController', {
        extend: 'mh.module.dataView.RecordViewDesktopController',
        alias: 'controller.mh-org-users-record-view',

        requires: [
            'mh.data.model.OrganizationUser',
            'mh.module.dataView.orgUsers.RecordViewLocalization'
        ],

        mixins: [
            'mh.mixin.CallMeParent',
            'mh.mixin.OrganizationUtils',
            'mh.mixin.ApiMap'
        ],

        init: function(){
            this.callMeParent('init', arguments);

            this.getView().on('activate', this.onViewActivate, this);
        },

        onViewActivate: function(){
            mh.data.model.OrganizationUser.getProxy().setUrl(this.getApiEndPointUrl('organizationUsers'));
        },

        onRecordLoadSuccess: function(record){
            this.callMeParent(arguments);

            this.getView().setIconCls(
                mh.FontIconsDictionary.getIcon(this.isOrgsOwnUser(record) ? 'mhOrgUsersOwnUser' : 'mhOrgUsersExtUser')
            );
        }
    });
}());