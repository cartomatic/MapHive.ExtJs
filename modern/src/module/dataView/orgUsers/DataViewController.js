//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.module.dataView.orgUsers.DataViewController', {
        extend: 'mh.module.dataView.users.DataViewController',
        alias: 'controller.mh-org-users-data-view',

        requires: [
            'mh.module.dataView.orgUsers.DataViewLocalization',
            'mh.data.dictionaries.OrganizationRoles',
            'mh.module.dataView.orgUsers.Icons',
            'mh.module.dataView.usersCatalogue.UsersCatalogue'

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
         * @private {mh.module.dataView.usersCatalogue.UsersCatalogue} usersCatalogue
         */
        usersCatalogue: null,

        /**
         * gets an instance of a user links picker
         * @returns {mh.module.dataView.usersCatalogue.UsersCatalogue}
         */
        getUsersCatalogue: function(btn){
            //need to display a window with a standard users links picker.
            if(!this.usersCatalogue){
                this.usersCatalogue = Ext.create('mh.module.dataView.usersCatalogue.UsersCatalogue', {});

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
        },



        /**
         * renderer of the external user info
         * @param value
         * @param record
         * @returns {string}
         */
        externalUserRenderer: function(value, record) {

            var isOwn = this.isOrgsOwnUser(record),
                tip = this.getTranslation(isOwn ? 'orgUser' : 'externalUser'),
                icon = mh.FontIconsDictionary.getIcon(isOwn ? 'mhOrgUsersOwnUser' : 'mhOrgUsersExtUser');

            return '<div class="' + icon + '" data-qtip="' + tip + '"></div>';
        },

        /**
         * renders user role within an organization
         * @param value
         * @param record
         * @returns {string}
         */
        orgRoleRenderer: function(value, record) {
            this.prepareOrgRoles();

            var orgRole = record.get('organizationRole'),
                tip = this.orgRoles[orgRole].name,
                icon = this.orgRoles[orgRole].icon;

            return '<div class="' + icon + '" data-qtip="' + tip + '"></div>';
        },

        /**
         * prepares org roles map for the renderer
         */
        prepareOrgRoles: function(){
            if(!this.orgRoles){
                this.orgRoles = {};
                Ext.Array.each(mh.data.dictionaries.OrganizationRoles.getOrgRolesStoreData(), function(r){
                    this.orgRoles[r.id] = {
                        key: r.key,
                        name: r.name,
                        icon: mh.FontIconsDictionary.getIcon(r.icon)
                    };
                }, this);
            }
        }

    });

}());