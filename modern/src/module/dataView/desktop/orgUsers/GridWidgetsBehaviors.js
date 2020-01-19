//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function(){
    //Make sure strict mode is on
    'use strict'

    let me, //scope for unscoped renderer calls
        l = 'mh.module.dataView.desktop.orgUsers.GridWidgetsBehaviorsLocalization';

    /**
     * Created by domin on 01.10.2018.
     */
    Ext.define('mh.module.dataView.desktop.orgUsers.GridWidgetsBehaviors', {

        singleton: true,

        requires: [
            'mh.module.dataView.desktop.orgUsers.Icons',
            'mh.FontIconsDictionary',
            'mh.data.dictionaries.OrganizationRoles',
            'mh.module.dataView.desktop.orgUsers.GridWidgetsBehaviorsLocalization'
        ],

        mixins: [
            'mh.mixin.OrganizationUtils',
            'mh.mixin.Localization',
            'mh.communication.MsgBus',
            'mh.data.Ajax',
            'mh.mixin.ApiMap'
        ],

        constructor: function(){
            me = this;
        },

        /**
         * customizes dynamic behavior of account verification status btn
         * @param widgetCell
         * @param rec
         */
        verifiedAccountIndicatorBehavior: function(widgetCell, rec){
            let widget = widgetCell.getWidget(),
                value,
                icon,
                color,
                tip;

            if(!rec){
                widget.hide();
                return;
            }

            value = rec.get('isAccountVerified');

            tip = me.getTranslation(value ? 'accountVerifiedTip' : 'accountNotVerifiedTip');
            icon = mh.FontIconsDictionary.getIcon(value ? 'mhUserAccountVerified' : 'mhUserAccountNotVerified');


            widget.setTooltip(tip);
            widget.setIconCls(icon);
            widget.setUi(value ? 'mh-data-view-btn-icon-soft-blue' : 'mh-data-view-btn-icon-soft-red');


            widget.rec = rec;

            widget.show();
        },

        /**
         * handles clicks on the active account btn
         * @param btn
         */
        verifiedAccountBtnHandler: function(btn){
            if(!btn.rec.get('isAccountVerified')){

                var w = Ext.create('Ext.Dialog', {
                    title: me.getTranslation('resendActivationTitle'),
                    html: me.getTranslation('resendActivationMsg'),
                    buttons: [
                        '->',
                        {
                            text: me.getTranslation('forceActivateBtn'),
                            handler: () => {
                                me.forceActivate(btn.rec);
                                w.close();
                            }
                        },
                        {
                            text: me.getTranslation('resendEmailBtn'),
                            handler: () => {
                                me.resendActivationEmail(btn.rec);
                                w.close();
                            }
                        },
                        {
                            text: me.getTranslation('cancelBtn'),
                                handler: () => {
                                w.close();
                            }
                        },
                        '->'
                    ]
                });
                w.show();

            }
            else {
                Ext.Msg.show({
                    title: me.getTranslation('accountActiveTitle'),
                    message: me.getTranslation('accountActiveMsg'),
                    buttons: Ext.MessageBox.OK
                });
            }
        },

        /**
         * resends an activation email for a user
         * @param rec
         */
        resendActivationEmail: function(rec){
            me.fireGlobal('loadmask::show', this.getTranslation('resendingActivationEmailLoadMask'));

            me.doPost({
                url: me.getApiEndPointUrl('resendActivation').replace(this.getApiMapResourceIdentifier(), rec.get('uuid')),
                autoHandleExceptions: true,
                success: function(){
                    me.fireGlobal('loadmask::hide');
                },
                failure: function(){
                    me.fireGlobal('loadmask::hide');
                }
            });
        },

        /**
         * force activates a user account
         * @param rec
         */
        forceActivate: function(rec){
            me.fireGlobal('loadmask::show', this.getTranslation('forceAccountActivateLoadMask'));

            me.doPut({
                url: me.getApiEndPointUrl('forceAccountActivate'),
                autoHandleExceptions: true,
                params: {
                    userId: rec.get('uuid')
                },
                success: function(){
                    me.fireGlobal('loadmask::hide');
                    rec.store.reload();
                },
                failure: function(){
                    me.fireGlobal('loadmask::hide');
                }
            });
        },

        /**
         * customizes dynamic behavior of account closed status btn
         * @param widgetCell
         * @param rec
         */
        closedAccountIndicatorBehavior: function(widgetCell, rec){
            let widget = widgetCell.getWidget(),
                value,
                icon,
                color,
                tip;

            if(!rec){
                widget.hide();
                return;
            }

            value = rec.get('isAccountClosed');

            tip = me.getTranslation(value ? 'accountClosedTip' : 'accountActiveTip');
            icon = mh.FontIconsDictionary.getIcon(value ? 'mhUserAccountClosed' : 'mhUserAccountActive');

            widget.setTooltip(tip);
            widget.setIconCls(icon);
            widget.setUi(value ? 'mh-data-view-btn-icon-soft-red' : 'mh-data-view-btn-icon-soft-blue');

            widget.show();
        },

        externalUserIndicatorBehavior: function(widgetCell, rec){
            let widget = widgetCell.getWidget(),
                isOwn,
                tip,
                icon;

            if(!rec){
                widget.hide();
                return;
            }

            isOwn = me.isOrgsOwnUser(rec);
            tip = me.getTranslation(isOwn ? 'orgUser' : 'externalUser', l);
            icon = mh.FontIconsDictionary.getIcon(isOwn ? 'mhOrgUsersOwnUser' : 'mhOrgUsersExtUser');

            if(!rec){
                widget.hide();
                return;
            }

            widget.setTooltip(tip);
            widget.setIconCls(icon);

            //widget.setUi(value ? 'mh-data-view-btn-icon-soft-red' : 'mh-data-view-btn-icon-soft-blue');

            widget.show();
        },

        orgRoleIndicatorBehavior: function(widgetCell, rec){
            let widget = widgetCell.getWidget(),
                orgRole,
                tip,
                icon;

            if(!rec){
                widget.hide();
                return;
            }

            me.prepareOrgRoles();

            orgRole = rec.get('organizationRole');
            tip = me.orgRoles[orgRole].name;
            icon =  me.orgRoles[orgRole].icon;

            if(!rec){
                widget.hide();
                return;
            }

            widget.setTooltip(tip);
            widget.setIconCls(icon);

            //widget.setUi(value ? 'mh-data-view-btn-icon-soft-red' : 'mh-data-view-btn-icon-soft-blue');

            widget.show();
        },


        orgRoles: null,

        /**
         * prepares org roles map for the renderer
         */
        prepareOrgRoles: function(){
            if(!me.orgRoles){
                me.orgRoles = {};
                Ext.Array.each(mh.data.dictionaries.OrganizationRoles.getOrgRolesStoreData(), function(r){
                    me.orgRoles[r.id] = {
                        key: r.key,
                        name: r.name,
                        icon: mh.FontIconsDictionary.getIcon(r.icon)
                    };
                }, me);
            }
        }
    });
}());
