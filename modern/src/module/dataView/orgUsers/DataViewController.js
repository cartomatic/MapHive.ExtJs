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
            'mh.module.dataView.orgUsers.Icons'
        ],

        mixins: [
            'mh.mixin.CallMeParent',
            'mh.mixin.ApiMap'
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
         * whether or not user is an own org user
         * @param rec
         * @returns {boolean}
         */
        isOwnUser: function(rec){
            return rec.get('isOrgUser') && rec.get('parentOrganisationId') === this.getCurrentOrgId();
        },

        /**
         * initiates a procedure of adding a new organisation user
         */
        onAddNewOrgUser: function(){
            //new org user - redirect to the standard editor!
            this.onBtnCreateTap();
        },

        /**
         * @private {mh.module.dataView.LinksPicker} userLinksPicker
         */
        userLinksPicker: null,

        /**
         * gets an instance of a user links picker
         * @returns {mh.module.dataView.LinksPicker}
         */
        getUserLinksPicker: function(btn){
            //need to display a window with a standard users links picker.
            if(!this.userLinksPicker){
                this.userLinksPicker = Ext.create('mh.module.dataView.users.Catalogue', {});

                //need to get the data, huh?
                this.userLinksPicker.on('linkspicked', this.onLinksPicked, this);
            }

            if(btn){
                this.userLinksPicker.animateTarget = btn;
            }

            return this.userLinksPicker;
        },

        /**
         * initiates adding a user from a catalogue
         * @param btn
         */
        onAddUserFromCatalogue: function(btn){
            this.getUserLinksPicker(btn).show();
        },

        /**
         * linkspicked callback
         * @param records
         */
        onLinksPicked: function(records){
            this.getUserLinksPicker().hide();
            this.fireGlobal('loadmask::show', this.getTranslation('linkUserMask'));

            //note: there should be only one rec for a starter.

            var cfg = {
                    url: this.getApiEndPoint('organisationUsersLink').replace(this.getApiMapOrgIdentifier(), this.getCurrentOrgId()),
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
            this.reloadGrid();
        },

        /**
         * handles user failed link
         */
        onLinkUserFailure: function(){
            this.fireGlobal('loadmask::hide');
        },

        /**
         * customises the behavior of delete so can handle both - own and external users
         * @param btn
         */
        onBtnDeleteClick: function(btn){
            var recs = this.lookupReference('grid').getSelection() || [],
                rec,
                me = this;

            if(recs.length === 1){
                rec = recs[0];
                if(this.isOwnUser(rec)){
                    //own user, so just use the default
                    this.callMeParent('onBtnDeleteClick', arguments);
                }
                else {
                    //just ask a user to confirm an external user will be removed from an org.
                    //prompt user if he is sure to delete a record
                    Ext.Msg.show({
                        title: this.getTranslation('unlinkExternalUserTitle'),
                        message: this.getTranslation('unlinkExternalUserMsg'),
                        width: 300,
                        buttons: Ext.MessageBox.OKCANCEL,
                        amimateTarget: btn,
                        icon: Ext.MessageBox.WARNING,
                        fn: function(msgBtn){
                            if(msgBtn === 'ok'){
                                me.unlinkUser(rec);
                            }
                        }
                    });
                }
            }
        },

        /**
         * unlinks a user from an organisation
         * @param user
         */
        unlinkUser: function(user){
            this.fireGlobal('loadmask::show', this.getTranslation('unlinkUserMask'));

            //note: there should be only one rec for a starter.

            var me = this,
                cfg = {
                    scope: me,
                    success: me.onUnLinkUserSuccess,
                    failure: me.onUnLinkUserFailure,
                    exceptionMsg: me.getTranslation('unlinkUserFailure')
                },
                callback = me.generateModelRequestCallback(cfg),

                op = function(){
                    user.erase({
                        callback: callback,
                        url: me.getApiEndPoint('organisationUsersLink').replace(me.getApiMapOrgIdentifier(), me.getCurrentOrgId())
                    });
                };

            cfg.retry = op;

            op();
        },

        /**
         * unlink ext user success handler
         */
        onUnLinkUserSuccess: function(){
            this.fireGlobal('loadmask::hide');
            this.reloadGrid();
        },

        /**
         * unlink ext user failure handler
         */
        onUnLinkUserFailure: function(){
            this.fireGlobal('loadmask::hide');
            this.reloadGrid();
        },


        /**
         * renderer of the external user info
         * @param value
         * @param record
         * @returns {string}
         */
        externalUserRenderer: function(value, record) {

            var isOwn = this.isOwnUser(record),
                tip = this.getTranslation(isOwn ? 'orgUser' : 'externalUser'),
                icon = mh.FontIconsDictionary.getIcon(isOwn ? 'mhOrgUsersOwnUser' : 'mhOrgUsersExternalUser');

            return '<div class="' + icon + '" data-qtip="' + tip + '"></div>';
        },

        /**
         * renders user role within an organisation
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
                Ext.Array.each(mh.data.dictionaries.OrganizationRoles.getOrgRolesStore().data, function(r){
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