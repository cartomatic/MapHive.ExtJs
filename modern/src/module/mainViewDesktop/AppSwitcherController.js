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
            'mh.module.mainViewDesktop.Icons',
            'mh.module.mainViewDesktop.AppSwitcherLocalization'
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
                        text: this.getTranslation('appSwitcherBtn'),
                        tooltip: this.getTranslation('appSwitcherBtn')
                    },
                    iconCls: mh.FontIconsDictionary.getIcon('mhAppSwitcherApps'),
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

            //load apps to the store
            this.getViewModel().get('apps').loadRecords(apps);
        },

        menuSide: 'left',

        /**
         * makes sure app switcher menu is present
         */
        ensureAppsMenu: function(){
            Ext.Viewport.setMenu(this.getView(), {
                side: this.menuSide
            });
        },

        /**
         * app switcher btn tap - shows app switcheer
         * @param btn
         */
        onAppSwitcherBtnTap: function(btn){
            this.ensureAppsMenu();
            Ext.Viewport.toggleMenu(this.menuSide);
        },


        /**
         * filter change callback
         * @param field
         * @param newV
         * @param oldV
         */
        onFilterChange: function(field, newV, oldV){
            var store = this.getViewModel().get('apps');

            store.clearFilter();
            if(newV){
                store.addFilter([
                    {
                        property: 'name',
                        value: newV,
                        operator: 'like',
                        disableOnEmpty: true,
                        anyMatch: true
                    }
                ]);
            }
        },

        /**
         * @private {mh.data.model.Application}
         * app to be switched to after async logon is finalised
         */
        appToBeSwitchedTo: null,


        /**
         * app picked -  initiates app change procedure by firing the root::reloadapp that should be handled by mh.controller.AppLoader
         * @param dataview
         * @param location
         * @param eOpts
         */
        onAppPicked: function(dataview, location, eOpts){

            Ext.Viewport.hideMenu(this.menuSide);

            var newApp = location.record,
                currentApp = this.getCurrentApp();

            if(!currentApp || newApp.get('uuid') !== currentApp.get('uuid')){

                if(newApp.get('requiresAuth') && !userAuthenticated){

                    this.watchGlobal('auth::userauthenticated', this.onContinueAppSwitchAfterLogonCompleted, this);
                    this.watchGlobal('auth::userauthcancel', this.onCancelAppSwitchAfterLogonCancelation, this);

                    this.appToBeSwitchedTo = newApp;

                    this.fireGlobal('auth::requestuserauth');
                }
                else {
                    //load the new url
                    this.fireGlobal('root::reloadapp', newApp);
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
