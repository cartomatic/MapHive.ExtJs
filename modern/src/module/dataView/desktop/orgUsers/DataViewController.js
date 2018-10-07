//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.module.dataView.desktop.orgUsers.DataViewController', {
        extend: 'mh.module.dataView.desktop.users.DataViewController',
        alias: 'controller.mh-desktop-org-users-data-view',

        requires: [
            'mh.module.dataView.desktop.orgUsers.DataViewLocalization',
            'mh.data.dictionaries.OrganizationRoles',
            'mh.module.dataView.desktop.orgUsers.Icons',
            'mh.module.dataView.desktop.usersCatalogue.UsersCatalogue'

        ],

        mixins: [
            'mh.mixin.CallMeParent',
            'mh.mixin.ApiMap',
            'mh.mixin.OrganizationUtils'
        ],

        init: function(){
            this.callMeParent('init', arguments);
        },

        /**
         * customised view activate
         */
        onViewActivate: function() {
            //adjust the store url to the currently scoped org.
            this.getViewModel().getStore('gridstore').getProxy().setUrl(this.getApiEndPointUrl('organizationUsers'));
            this.callMeParent(arguments);
        },

        /**
         * initiates a procedure of adding a new organization user
         */
        onAddNewOrgUser: function(){
            //new org user - redirect to the standard editor!
            this.onBtnCreateTap();
        },

        /**
         * @private {mh.module.dataView.desktop.usersCatalogue.UsersCatalogue} usersCatalogue
         */
        usersCatalogue: null,

        /**
         * gets an instance of a user links picker
         * @returns {mh.module.dataView.desktop.usersCatalogue.UsersCatalogue}
         */
        getUsersCatalogue: function(btn){
            //need to display a window with a standard users links picker.
            if(!this.usersCatalogue){
                this.usersCatalogue = Ext.create('mh.module.dataView.desktop.usersCatalogue.UsersCatalogue', {});

                //need to get the data, huh?
                this.usersCatalogue.on('linkspicked', this.onLinksPicked, this);
            }

            if(btn){
                this.usersCatalogue.animateTarget = btn;
            }

            return this.usersCatalogue;
        },

        /**
         * initiates adding a user from a catalogue
         * @param btn
         */
        onAddUserFromCatalogue: function(btn){
            this.getUsersCatalogue(btn).show();
        },

        /**
         * linkspicked callback
         * @param records
         */
        onLinksPicked: function(records){
            this.getUsersCatalogue().hide();
            this.fireGlobal('loadmask::show', this.getTranslation('linkUserMask'));

            //note: there should be only one rec for a starter.

            var cfg = {
                    url: this.getApiEndPointUrl('organizationUsersLink'),
                    params: records[0].getData(),
                    success: this.onLinkUserSuccess,
                    failure: this.onLinkUserFailure,
                    scope: this,
                    exceptionMsg: this.getTranslation('linkUserFailure')
                },
                me = this,
                fn = function(){
                    me.doPost(cfg);
                };

            cfg.retry = fn;

            fn();
        },

        /**
         * user linked successfully
         * @param response
         */
        onLinkUserSuccess: function(response){
            this.fireGlobal('loadmask::hide');
            this.reloadStore();
        },

        /**
         * handles user failed link
         */
        onLinkUserFailure: function(){
            this.fireGlobal('loadmask::hide');
        },


        destroyRecord: function(record, success, failure){
            if(this.isOrgsOwnUser(record)){
                //std delete for own users
                this.callMeParent(arguments);
            }
            else {
                //external user - need to unlink it rather than destroy...
                var me = this,
                    cfg = {
                        scope: me,
                        success: success,
                        failure: failure,
                        exceptionMsg: me.getTranslation('unlinkUserFailure')
                    },
                    callback = me.generateModelRequestCallback(cfg),

                    op = function(){
                        record.erase({
                            callback: callback,
                            url: me.getApiEndPointUrl('organizationUsersLink')
                        });
                    };

                cfg.retry = op;

                op();
            }
        }

    });

}());