//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict'

    var userAuthenticated = false;

    Ext.define('mh.module.mainViewDesktop.AppSwitcherController', {
        extend: 'Ext.app.ViewController',
        alias: 'controller.mh-app-switcher',

        requires:[
            'mh.module.mainViewDesktop.AppSwitcherIcons',
        ],

        mixins: [
            'mh.util.console.Formatters',
            'mh.mixin.Localization',
            'mh.communication.MsgBus',
            'mh.mixin.UserAppsUtils'
        ],

        appSwitcherBtn: null,

        /**
         * Called when the view is created
         */
        init: function() {

            this.injectLocalizationToViewModel();

            var me = this,
                vw = this.getView(),
                navModule = vw.getNavModule();

            //check if the tbar is visible, or it should be suppressed
            //if toolbar should be hidden, there is no point in triggering the full setup here, as the toolbar is not there anyway!
            var tunnel = this.getTunnelId();

            this.watchGlobal(
                'root::customhashparam',
                function(value){
                    if(value !== 'true'){

                        //this.fireGlobal('root::getcustomhashparam', 'suppress-app-toolbar', {tunnel: tunnel});

                        //wire up some evt listeners
                        this.watchGlobal('auth::userauthenticated', this.onUserAuthenticated, this);
                        this.watchGlobal('auth::userloggedoff', this.onUserLoggedOff, this);
                        this.watchGlobal('org::changed', this.onOrgChanged, this);

                        //need to poke the root to get some apps
                        this.getApps();
                    }
                },
                this,
                {
                    single: true,
                    tunnel: tunnel
                }
            );
            this.fireGlobal('root::getcustomhashparam', 'suppress-app-toolbar', {tunnel: tunnel});

            if(Ext.isFunction(navModule.addAppSwitcherBtn)){
                this.appSwitcherBtn = Ext.create('Ext.Button', {
                    hidden: true,
                    bind: {
                        text: this.getTranslation('apSwitcherBtn'),
                        tooltip: this.getTranslation('apSwitcherBtn')
                    },
                    iconCls: mh.FontIconsDictionary.getIcon('appSwitcherApps'),
                    listeners: {
                        tap: Ext.bind(this.onAppSwitcherBtnTap, this)
                    }
                });
                navModule.addAppSwitcherBtn(this.appSwitcherBtn);
            }
        },

        /**
         * user authenticated - refresh the apps
         */
        onUserAuthenticated: function(){
            userAuthenticated = true;
            this.getApps();
        },

        /**
         * user logged off callback
         */
        onUserLoggedOff: function(){
            userAuthenticated = false;
            this.getApps();
        },

        /**
         * org changed callback
         */
        onOrgChanged: function(){
            this.getApps();
        },

        /**
         * Callback defined in mh.mixin.UserAppsUtils; if not present the mixin will not call it
         * @param {mh.data.model.Application[]} apps
         */
        onAppsRetrieved: function(apps){
            //success, so this should be an array of appDTO objects
            this.appSwitcherBtn.setVisibility((apps && apps.length > 0));

            this.reloadApps(apps);
        },

        reloadApps: function(apps){
            this.getViewModel().get('apps').loadRecords(apps);
        },

        /**
         * makes sure app switcher menu is present
         */
        ensureAppsMenu: function(){
            Ext.Viewport.setMenu(this.getView(), {
                side: 'left'
            });
        },

        /**
         * app switcher btn tap - shows app switcheer
         * @param btn
         */
        onAppSwitcherBtnTap: function(btn){
            this.ensureAppsMenu();
            Ext.Viewport.toggleMenu('left');
        },

        /**
         * @private {mh.data.model.Application}
         * app to be switched to after async logon is finalised
         */
        appToBeSwitchedTo: null,


        /**
         * App btn click callback - initiates app change procedure by firing the root::reloadapp that should be handled by mh.controller.AppLoader
         * @param btn
         * @param e
         * @param eOpts
         */
        onAppBtnClick: function(btn, e, eOpts){
            this.hideAppsPanel();

            //FIXME - no btn!

            var currentApp = this.getCurrentApp();

            if(!currentApp || btn.app.get('uuid') !== currentApp.get('uuid')){

                if(btn.app.get('requiresAuth') && !userAuthenticated){

                    this.watchGlobal('auth::userauthenticated', this.onContinueAppSwitchAfterLogonCompleted, this);
                    this.watchGlobal('auth::userauthcancel', this.onCancelAppSwitchAfterLogonCancelation, this);

                    //FIXME
                    this.appToBeSwitchedTo = btn.app;

                    this.fireGlobal('auth::requestuserauth');
                }
                else {
                    //load the new url
                    this.fireGlobal('root::reloadapp', btn.app);
                }
            }
        },

        /**
         * continues app switch after user logon
         */
        onContinueAppSwitchAfterLogonCompleted: function(){
            this.unwatchGlobal('auth::userauthcancel', this.onCancelAppSwitchAfterLogonCancelation, this);
            this.unwatchGlobal('auth::userauthenticated', this.onContinueAppSwitchAfterLogonCompleted, this);

            this.fireGlobal('root::reloadapp', this.appToBeSwitchedTo);

            this.appToBeSwitchedTo = null;
        },

        /**
         * cancels app switch after user logon
         */
        onCancelAppSwitchAfterLogonCancelation: function(){
            this.unwatchGlobal('auth::userauthcancel', this.onCancelAppSwitchAfterLogonCancelation, this);
            this.unwatchGlobal('auth::userauthenticated', this.onContinueAppSwitchAfterLogonCompleted, this);

            this.appToBeSwitchedTo = null;
        }
    }, function(){

        //silly as it may seem, but need msg bus mixed in and need to avoid auto requires via sencha plugin
        var msgBus = 'mh.communication.MsgBus';
        msgBus = Ext.create(msgBus);

        msgBus.watchGlobal('auth::userauthenticated', function(at){
            userAuthenticated = at !== null;
        }, this);

    });
}());
