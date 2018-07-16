//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict'
    
    Ext.define('mh.module.mainViewDesktop.AppSwitcherController', {
        extend: 'Ext.app.ViewController',
        alias: 'controller.mh-app-switcher',

        requires:[
            'mh.module.mainViewDesktop.AppSwitcherIcons',
        ],

        mixins: [
            'mh.mixin.Localization'
        ],

        /**
         * Called when the view is created
         */
        init: function() {
            var vw = this.getView(),
                navModule = vw.getNavModule();

            if(Ext.isFunction(navModule.addAppSwitcherBtn)){
                this.appSwitcherBtn = Ext.create('Ext.Button', {
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

        appSwitcherBtn: null,

        appsMenu: null,

        ensureAppsMenu: function(){
            if(this.appsMenu){
                return;
            }

            this.appsMenu = Ext.create('Ext.ActionSheet', {
                layout: 'fit',
                bodyPadding: 0,
                width: 300,
                items: [
                    this.getView()
                ]
            });

            Ext.Viewport.setMenu(this.appsMenu, {
                side: 'left'
            });
        },

        onAppSwitcherBtnTap: function(btn){
            this.ensureAppsMenu();

            Ext.Viewport.toggleMenu('left');
        },
    });
}());
