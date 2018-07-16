//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.module.mainView.NavMenuController', {
        extend: 'Ext.app.ViewController',

        alias: 'controller.mh-main-view-nav-menu',

        requires: [
            'Ext.data.StoreManager',
            'Ext.menu.Item',
            'Ext.menu.Menu',
            'mh.FontIconsDictionary',
            'mh.data.model.User',
            'mh.module.mainView.Icons',
            'mh.module.mainView.NavMenuLocalization'
        ],

        mixins: [
            'mh.mixin.Localization',
            'mh.mixin.UserCfg',
            'mh.communication.MsgBus',
            'mh.mixin.UserAppsUtils'
        ],

        init: function() {
            this.injectLocalizationToViewModel();

            var vw = this.getView();

            vw.on('initialize', this.onViewInitialize, this);

            if(vw.getHideLogOffBtn()){
                this.lookupReference('logOffBtn').hide();
            }
            if(vw.getHideProfileBtn()){
                this.lookupReference('profileButton').hide();
            }

            this.setUserIconAndEmail();

            this.watchGlobal('user::profilepicturechanged', this.setUserIconAndEmail, this);
        },

        /**
         * view initialize handler
         * @param vw
         */
        onViewInitialize: function(vw){

            //'this' here is the controller

            vw.el.insertFirst({
                cls: vw.getBaseCls() + '-mask',
                tag: 'div'
            }).on({
                tap: 'onMaskTap',
                scope: this
            });
        },

        /**
         * updates expanded cls
         * @param value
         */
        updateExpanded: function(value) {
            this.sliderExpanded = value;
            this.getView().toggleCls('expanded', value);

            this.lookup('navMenuExpander').setIconCls(
                value ? mh.FontIconsDictionary.getIcon('navMenuCollapse') : mh.FontIconsDictionary.getIcon('navMenuExpand'));
        },

        /**
         * slider menu state
         */
        sliderExpanded: false,

        /**
         * toggles vie expanded state
         */
        toggleExpanded: function() {
            this.updateExpanded(!this.sliderExpanded);
        },

        /**
         * view mask tap handler
         * @param ev
         */
        onMaskTap: function(ev) {
            this.updateExpanded(false);
            ev.preventDefault();
        },

        /**
         * sets user img in the profile btn
         */
        setUserIconAndEmail: function() {
            var user = Ext.create('mh.data.model.User', this.getCurrentUser());

            var profileButton = this.lookup('profileButton');

            if(user.get('profilePicture')) {
                profileButton.setIcon(user.get('profilePicture'));
                profileButton.setIconCls('roundImage');
            }
            else {
                profileButton.setIcon(null);
                profileButton.setIconCls(mh.FontIconsDictionary.getIcon('navMenuUser'));
            }

            profileButton.setText(
                user.get('uuid')
                    ? user.get('email')
                    : this.getTranslation('anonymous')
            );

        },

        /**
         * collapses menu
         */
        collapse: function() {
            this.updateExpanded(false);
        },

        /**
         * expander btn tap handler
         */
        onNavMenuExpanderTap: function() {
            this.updateExpanded(!this.sliderExpanded);
        },

        /**
         * child menu btn tap
         * @param menu
         * @param location
         */
        onMenuChildTap: function(menu, location) {
            var record = location.record;
            if (record) {
                this.redirectTo(record.get('navigationRoute'));
                this.collapse();
            }
        },

        /**
         * profile btn tap handler
         */
        onProfileButtonTap: function() {
            if(this.getCurrentUser().uuid){
                this.redirectTo(this.getView().getUserProfileRoute() || 'unknown');
                this.collapse();
            }
            else {
                //just let the global Auth controller know user wants to authenticate
                this.fireGlobal('auth::requestuserauth');
            }
        },

        /**
         * menu initialize - sets up the stores, texts, icons, etc.
         * @param menu
         * @param location
         */
        onMenuInitialize: function(menu, location) {

            var store = Ext.StoreManager.lookup(this.getView().getMenuStore());

            store.each(function(rec) {

                var cls = Ext.ClassManager.getByAlias('widget.' + rec.get('xtype'))

                rec.set('text', this.getTranslation('viewName', Ext.getClassName(cls)));
                rec.set('icon', rec.get('iconCls'));

                //also fire global to register routes!
                if(rec.get('navigationRoute')){
                    this.fireGlobal('route::register', {route: rec.get('navigationRoute'), type: 'nav'});
                }
                if(rec.get('dataRoute')){
                    this.fireGlobal('route::register', {route: rec.get('dataRoute'), type: 'data'});
                }

            }, this);

            //set the store for the items data view
            //need a little defer, so the view can initialize properly
            Ext.defer(function(){
                //digging a bit deep here, so can blow up sometime when extjs version changes
                this.getView().items.map.navigator.setStore(store);
            }, 100, this);

            //also register user settings route
            if(!this.getView().getHideProfileBtn()){
                this.fireGlobal('route::register', {route: this.getView().getUserProfileRoute() || 'unknown', type: 'nav'});
            }
        },


        /**
         * log off btn tap handler
         */
        onLogOffTap: function() {
            var currentApp = this.getCurrentApp(),
                msg = currentApp && currentApp.get('requiresAuth') ?
                    this.getTranslation('logOffConfirmMsgWithReload') :
                    this.getTranslation('logOffConfirmMsgNoReload');

            var me = this,
                dialog = Ext.create({
                    xtype: 'dialog',
                    title: me.getTranslation('logOffConfirmTitle'),
                    html: msg,
                    bodyPadding: 20,
                    width: 350,
                    buttons: {
                        yes: {
                            ui: 'base',
                            text: me.getTranslation('yes'),
                            handler: function() {
                                dialog.destroy();

                                me.fireGlobal('loadmask::show', me.getTranslation('logOffMask'));

                                //let the auth controller do the work for us
                                me.fireGlobal('auth::requestuserlogoff');

                                //wait a bit and finalise
                                Ext.defer(function(){
                                    me.fireGlobal('loadmask::hide');
                                    if(currentApp && currentApp.get('requiresAuth')){
                                        //need to reload to home as the current app requires auth!
                                        me.fireGlobal('root::reloadapp', me.getHomeApp());
                                    }
                                }, 1000);
                            }
                        },
                        no: {
                            ui: 'base',
                            text: me.getTranslation('no'),
                            handler: function() {
                                dialog.destroy();
                            }
                        }
                    }

                });

            dialog.show();

            this.updateExpanded(false);
        }
    });
    
}());