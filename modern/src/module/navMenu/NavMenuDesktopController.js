//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.module.navMenu.NavMenuDesktopController', {
        extend: 'mh.module.navMenu.NavMenuController',

        alias: 'controller.mh-main-view-nav-menu-desktop',

        requires: [
            'Ext.data.StoreManager',
            'Ext.menu.Item',
            'Ext.menu.Menu',
            'mh.FontIconsDictionary',
            'mh.data.model.User',
            'mh.module.navMenu.Icons',
            'mh.module.navMenu.NavMenuDesktopLocalization'
        ],

        mixins: [
            'mh.mixin.Localization',
            'mh.mixin.UserCfg',
            'mh.communication.MsgBus',
            'mh.mixin.UserAppsUtils',
            'mh.mixin.ApiMap',
            'mh.data.Ajax'
        ],

        init: function() {
            this.injectLocalizationToViewModel();

            this.publishApi('addAppSwitcherBtn', 'addOrgContextSwitcherBtn', 'getExpanded', 'hideUserProfileBtn', 'showUserProfileBtn');

            var vw = this.getView();

            vw.on('initialize', this.onViewInitialize, this);

            if(vw.getHideLogOffBtn()){
                this.lookupReference('logOffBtn').hide();
            }
            if(vw.getHideProfileBtn()){
                this.lookupReference('profileBtn').hide();
            }
            if(vw.getHideSettingsBtn()){
                this.lookupReference('settingsBtn').hide();
            }

            this.callMeParent(arguments);

            this.watchGlobal('userprofile::changed', this.onUserProfileChanged, this);
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

            this.lookup('navMenuExpanderBtn').setIconCls(
                value ? mh.FontIconsDictionary.getIcon('mhNavMenuCollapse') : mh.FontIconsDictionary.getIcon('mhNavMenuExpand'));
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
        updateUserInfo: function() {

            var profileBtn = this.lookup('profileBtn');

            if(this.userProfile){
                var pp = this.userProfile.get('profilePicture');

                if(pp) {
                    profileBtn.setIcon(this.userProfile.get('profilePictureGeneric'));
                    profileBtn.setIconCls('nav-menu-round-image');
                }
                else {
                    profileBtn.setIcon(null);
                    profileBtn.setIconCls(mh.FontIconsDictionary.getIcon('mhNavMenuUser'));
                }

            }
            else {
                profileBtn.setIconCls(mh.FontIconsDictionary.getIcon('mhNavMenuUserAnonymous'));
            }

            profileBtn.setText(
                this.userProfile && this.userProfile.get('uuid')
                    ? this.userProfile.get('email')
                    : this.getTranslation('anonymous')
            );

        },

        onUserProfileChanged: function(userProfile){
            this.userProfile =  userProfile;
            this.updateUserInfo();
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
        onNavMenuExpanderBtnTap: function() {
            this.updateExpanded(!this.sliderExpanded);
        },

        /**
         * child menu btn tap
         * @param menu
         * @param location
         */
        onMenuItemTap: function(menu, location) {
            var record = location.record;
            if (record) {
                this.redirectTo(record.get('navigationRoute'));
                this.collapse();
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

                var cls = Ext.ClassManager.getByAlias('widget.' + rec.get('xtype'));

                rec.set('text', this.getTranslation('viewName', Ext.getClassName(cls)));
                rec.set('icon', rec.get('iconCls'));

                //menu & non-meu routes registered by the main view!

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

            if(!this.getView().getHideSettingsBtn()){
                this.fireGlobal('route::register', {route: this.getView().getUserSettingsRoute() || 'unknown', type: 'nav'});
            }
        },

        /**
         * log off btn tap handler
         */
        onLogOffBtnTap: function() {
            this.callMeParent(arguments);
            this.updateExpanded(false);
        },

        /**
         * inserts app switcher btn
         * @param appSwitcher
         */
        addAppSwitcherBtn: function(appSwitcherBtn){

            //nav bar specific styling
            appSwitcherBtn.setUi('navmenu-flat navmenu-dark navmenu-large');
            appSwitcherBtn.setTextAlign('left');
            //appSwitcherBtn.setWeight(1);

            this.getView().insert(0, appSwitcherBtn);
        },

        /**
         * inserts org context switcher btn
         * @param orgContextSwitcherBtn
         */
        addOrgContextSwitcherBtn: function(orgContextSwitcherBtn){
            //nav bar specific styling
            orgContextSwitcherBtn.setUi('navmenu-flat navmenu-dark navmenu-large');
            orgContextSwitcherBtn.setTextAlign('left');
            //orgContextSwitcherBtn.setWeight(10);

            var totalBtnCount = this.getView().items.items.length - 1; //-1 for the expander

            this.getView().insert(totalBtnCount - 1, orgContextSwitcherBtn); //-1 so above log off && user btns - 0 based index!
        },

        /**
         * whether or not slider is expanded
         * @returns {boolean}
         */
        getExpanded: function(){
            return this.sliderExpanded;
        },

        hideUserProfileBtn: function(){
            this.lookupReference('profileBtn').hide();
        },

        showUserProfileBtn: function(){
            this.lookupReference('profileBtn').show();
        }

    });
    
}());