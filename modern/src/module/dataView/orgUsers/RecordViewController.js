//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.module.dataView.orgUsers.RecordViewController', {
        extend: 'mh.module.dataView.RecordViewController',
        alias: 'controller.mh-org-users-record-view',

        requires: [
            'mh.data.model.OrganizationUser',
            'mh.module.dataView.orgUsers.RecordViewLocalization'
        ],

        mixins: [
            'mh.mixin.CallMeParent',
            'mh.mixin.UserUtils',
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

            console.warn('CO JEST KURWA????', this.getViewModel().get('record'));

            this.getView().setIconCls(
                mh.FontIconsDictionary.getIcon(this.isOwnUser(record) ? 'mhOrgUsersOwnUser' : 'mhOrgUsersExtUser')
            );
        }
    });
}());