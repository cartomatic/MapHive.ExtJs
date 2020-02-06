//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function(){
    //Make sure strict mode is on
    'use strict';

    var consoleHdr = '[ROUTER@Main]_s::,orange,';

    Ext.define('mh.module.mainView.MainViewDesktopController', {
        extend: 'mh.module.mainView.MainViewController',
        alias: 'controller.mh-main-view-desktop',

        mixins: [
            'mh.mixin.Localization',
            'mh.communication.MsgBus',
            'mh.data.Ajax',
            'mh.mixin.Router',
            'mh.mixin.ModalMode',
            'mh.util.console.Formatters'
        ],

        requires: [
            'Ext.data.Model',
            'mh.util.AliasMapper'
        ],


        /**
         * @event route::register
         * @param route
         * watched event, registers a submitted route
         */
        init: function() {

            this.callMeParent(arguments);

            var vw = this.getView(),
                navMenu = vw.getNavMenu(),
                appSwitcher = vw.getAppSwitcher(),
                orgSwitcher = vw.getOrgContextSwitcher(),
                navMenuLogOffReload = !!vw.getNavMenuLogOffReload(),
                navMenuhideSettingsBtn = !!vw.getNavMenuHideSettingsBtn();

            if(navMenu){
                navMenu.zIndex = 4;
                navMenu.reference = 'navmenu';
                navMenu.logOffReload = navMenuLogOffReload;
                navMenu.hideSettingsBtn = navMenuhideSettingsBtn;

                vw.setLbar(navMenu);
            }

            //create app switcher if provided
            if(appSwitcher){
                Ext.create(appSwitcher, {
                    navModule: vw.getLbar()
                });
            }

            //create org ctx switcher if provided
            if(orgSwitcher){
                Ext.create(orgSwitcher, {
                    navModule: vw.getLbar()
                });
            }
        },

        handleNavigationRoute: function(routeParams){

            var navRouteHandleOut = this.callMeParent(arguments);

            //mark main menu if it contains an entry for the current path
            if(navRouteHandleOut && navRouteHandleOut.registeredRouteRec){
                this.lookup('navmenu').setSelection(navRouteHandleOut.registeredRouteRec);
            }
        }

    });
    
}());