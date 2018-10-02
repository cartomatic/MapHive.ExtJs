//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict'
    
    /**
     * Created by domin on 02.10.2018.
     */
    Ext.define('mh.module.navMenu.NavMenuMobileController', {
        extend: 'mh.module.navMenu.NavMenuController',
        alias: 'controller.mh-main-view-nav-menu-mobile',

        requires: [
            'mh.module.navMenu.NavMenuMobileLocalization',
            'Ext.ActionSheet'
        ],

        mixins: [
            'mh.mixin.Localization',
            'mh.communication.MsgBus'
        ],

        /**
         * Called when the view is created
         */
        init: function() {
            this.injectLocalizationToViewModel();

            this.watchGlobal('mainview::itemcreated', this.onMainViewItemChanged, this);

        },

        navMenu: null,

        /**
         * creates nav menu switcher items
         */
        ensureNavMenu: function(){

            if(this.navMenu){
                return;
            }

            var vw = this.getView(),
                items = [],
                cfg = {
                        items: items
                },
                menuStore = Ext.StoreManager.lookup(vw.getMenuStore());


            //user info + picture...
            items.push(this.getUserProfileDisplay());
            //logon btn
            items.push(this.getLogInMenuBtn());

            //the actual, registered menu items
            menuStore.each(function(r){

                items.push({
                    xtype: 'button',
                    text: this.getMenuItemText(r),
                    iconCls: mh.FontIconsDictionary.getIcon(r.get('iconCls')),
                    routeRec: r,
                    listeners: {
                        tap: Ext.bind(this.onRouteBtnTap, this)
                    }
                });
            }, this);

            //log off spacer, so log off btn on the bottom
            items.push({
                xtype: 'container',
                flex: 1
            });

            //log off btn
            items.push(this.getLogOffMenuBtn());


            //hide animation, so winphone does not go nuts!
            if(Ext.isIE){
                cfg.hideAnimation = null;
                cfg.showAnimation = null;
            }

            this.navMenu = Ext.create('Ext.ActionSheet', cfg);


            Ext.Viewport.setMenu(this.navMenu, {
                side: vw.getMenuSide()
                // omitting the reveal config defaults the animation to 'cover'
                //reveal: true
            });

        },

        /**
         * tries to obtain a title for a menu entry
         * @returns {*}
         */
        getMenuItemText: function(routeRec) {
            var cls = Ext.ClassManager.getByAlias('widget.' + routeRec.get('xtype')),
                className = Ext.getClassName(cls),
                menuItemText = this.getTranslation('viewName', className, true),
                inst;

            if(!menuItemText){
                try {
                    //try to init a class
                    inst = Ext.create(className);

                    //does it have a title getter?
                    if(Ext.isFunction(inst.getTitle)){
                        menuItemText = inst.getTitle();
                    }

                    //maybe set explicitly
                    if(!menuItemText){
                        if(inst.title){
                            menuItemText = inst.title;
                        }
                    }

                    //maybe set via bindings
                    if(!menuItemText){
                        if(inst._title){
                            menuItemText = inst._title;
                        }
                    }
                }
                catch(e){
                    //<debug>
                    console.warn('failed to obtain a title for xtype ' + routeRec.get('xtype'), e);
                    //</debug>
                }
            }

            //<debug>
            if(!menuItemText){
                menuItemText = routeRec.get('xtype');
            }
            //</debug>

            return menuItemText || '';
        },

        /**
         * hides navigation menu
         */
        hideNavMenu: function(){
            if(this.navMenu){
                this.navMenu.hide();
            }
        },

        onRouteBtnTap: function(btn){
            this.redirectTo(btn.routeRec.get('navigationRoute'));
            this.hideNavMenu();
        },

        userProfileDisplay: null,
        getUserProfileDisplay: function(){
            if(!this.userProfileDisplay){
                this.userProfileDisplay = Ext.create('Ext.Container',{
                    html: 'this is gonna be a fancy user info...'
                });

                //register nav route for the user profile view!
                this.fireGlobal('route::register', {route: this.getView().getUserProfileRoute() || 'unknown', type: 'nav'});
            }
            return this.userProfileDisplay;
        },


        logInMenuBtn: null,
        getLogInMenuBtn: function(){
            if(!this.logInMenuBtn){
                this.logInMenuBtn = Ext.create('Ext.Button',{
                    iconCls: mh.FontIconsDictionary.getIcon('mhNavMenuUserAnonymous'),
                    text: this.getTranslation('logIn'),
                    listeners: {
                        tap: Ext.bind(this.onLogInBtnTap, this)
                    }
                });
            }
            return this.logInMenuBtn;
        },



        logOffMenuBtn: null,
        getLogOffMenuBtn: function(){
            if(!this.logOffMenuBtn){
                this.logOffMenuBtn = Ext.create('Ext.Button',{
                    iconCls: mh.FontIconsDictionary.getIcon('mhNavMenuLogOff'),
                    text: this.getTranslation('logOff'),
                    listeners: {
                        tap: Ext.bind(this.onLogOffBtnTap, this)
                    }
                });
            }
            return this.logOffMenuBtn;
        },

        onLogOffBtnTap: function(){
            this.hideNavMenu();
            this.callMeParent(arguments);
        },

        onLogInBtnTap: function(){
            this.hideNavMenu();
            //just let the global Auth controller know user wants to authenticate
            this.fireGlobal('auth::requestuserauth');
        },

        updateUserInfo: function(){
            if(this.userProfile){
                this.getLogInMenuBtn().hide();
                this.getLogOffMenuBtn().show();
                this.getUserProfileDisplay().show();

                //TODO - the actual user info update!!!
            }
            else {
                this.getLogInMenuBtn().show();
                this.getUserProfileDisplay().hide();
                this.getLogOffMenuBtn().hide();
            }
        },


        /**
         * main view item changed evt handler. takes care of adjusting titles, icons & such
         * @param newItem
         */
        onMainViewItemChanged: function(newView){
            console.warn('NEW VIEW DUDE!', newView);
        },

        /**
         * back btn tap handler
         */
        onBackBtnTap: function(){

        },

        /**
         * menu btn tap handler
         */
        onMenuBtnTap: function(){
            this.ensureNavMenu();
            Ext.Viewport.toggleMenu(this.getView().getMenuSide());
        }


    });
}());
