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
            'Ext.ActionSheet',
            'Ext.Label'
        ],

        mixins: [
            'mh.mixin.Localization',
            'mh.communication.MsgBus'
        ],

        /**
         * Called when the view is created
         */
        init: function() {
            this.callMeParent(arguments);

            this.watchGlobal('mainview::itemchanged', this.onMainViewItemChanged, this);

            this.updateUserInfo();
        },


        /**
         * instance of navigation menu drawer
         */
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
                    items: items,
                    width: '75%',
                    defaults: {
                        iconAlign: 'left',
                        textAlign: 'left'
                    }
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
                    text: this.getViewTitle(r),
                    iconCls: this.getViewIconCls(r),
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

            this.navMenu.on('hide', this.onMenuHide, this);
        },


        /**
         * hides navigation menu
         */
        hideNavMenu: function(){
            if(this.navMenu){
                this.navMenu.hide();
            }
        },

        /**
         * menu hide - cleans up menu so it does not react to swipes
         */
        onMenuHide: function(){
            Ext.Viewport.removeMenu(this.getView().getMenuSide());
        },

        /**
         * menu btn tap handler
         */
        onMenuBtnTap: function(){
            this.ensureNavMenu();

            Ext.Viewport.setMenu(this.navMenu, {
                side: this.getView().getMenuSide()
                // omitting the reveal config defaults the animation to 'cover'
                //reveal: true
            });

            //defer a bit so tap ends before action dialog mask pops out. this is to avoid tapping on the dialog mask as it will hide otherwise
            Ext.defer(function(){
                Ext.Viewport.toggleMenu(this.getView().getMenuSide());
            }, 250, this);
        },

        /**
         * tries to obtain a title for a view - either from a route record OR from a view instance if provided; if a view instance is not provided it tries to instantiate it for title retrieval
         * @param routeRec
         * @param viewInstance
         * @returns {*|string}
         */
        getViewTitle: function(routeRec, viewInstance) {

            var xtype = routeRec ? routeRec.get('xtype') : viewInstance ? viewInstance.xtype : 'unknown-xtype',
                cls = Ext.ClassManager.getByAlias('widget.' + xtype),
                className = Ext.getClassName(cls),

                title;

            try {
                //try to init a class
                if(!viewInstance){
                    viewInstance = Ext.create(className);
                }

                //try to grab a title from the 'conventional places'
                //this should account for the dynamic titles too

                //does it have a title getter?
                if(Ext.isFunction(viewInstance.getTitle)){
                    title = viewInstance.getTitle();
                }

                //maybe set explicitly
                if(!title){
                    if(viewInstance.title){
                        title = viewInstance.title;
                    }
                }

                //maybe set via bindings
                if(!title){
                    if(viewInstance._title){
                        title = viewInstance._title;
                    }
                }

                //finally check if there is an explicit viewName localization property for this class
                if(!title){
                    title = this.getTranslation('viewName', className, true);
                }
            }
            catch(e){
                //<debug>
                console.warn('failed to obtain a title for xtype ' + xtype, e);
                //</debug>
            }

            //<debug>
            if(!title){
                title = xtype;
            }
            //</debug>

            return title || '';
        },

        /**
         * gets an icon cls for a view - either from a route record OR from a view instance if provided; if a view instance is not provided it tries to instantiate it for icon cls retrieval
         * @param routeRec
         * @param viewInstance
         * @returns {*|string}
         */
        getViewIconCls: function(routeRec, viewInstance) {

            var xtype = routeRec ? routeRec.get('xtype') : viewInstance ? viewInstance.xtype : 'unknown-xtype',
                cls = Ext.ClassManager.getByAlias('widget.' + xtype),
                className = Ext.getClassName(cls),

                iconCls;

            if(routeRec && routeRec.get('iconCls')){
                iconCls = mh.FontIconsDictionary.getIcon(routeRec.get('iconCls'));
            }

            if(!iconCls){
                try {
                    //try to init a class
                    if(!viewInstance){
                        viewInstance = Ext.create(className);
                    }

                    //does it have a title getter?
                    if(Ext.isFunction(viewInstance.getIconCls)){
                        iconCls = viewInstance.getIconCls();
                    }

                    //maybe set explicitly
                    if(!iconCls){
                        if(viewInstance.iconCls){
                            iconCls = viewInstance.iconCls;
                        }
                    }

                    //maybe set via bindings
                    if(!iconCls){
                        if(viewInstance._iconCls){
                            iconCls = viewInstance._iconCls;
                        }
                    }
                }
                catch(e){
                    //<debug>
                    console.warn('failed to obtain an iconCls for xtype ' + xtype, e);
                    //</debug>
                }
            }

            return iconCls || '';
        },





        /**
         * generic route menu btn handler
         * @param btn
         */
        onRouteBtnTap: function(btn){
            this.redirectTo(btn.routeRec.get('navigationRoute'));
            this.hideNavMenu();
        },

        /**
         * user info display widget instance
         */
        userProfileDisplay: null,

        /**
         * user picture display
         */
        userPictureDisplay: null,

        /**
         * user name display
         */
        userNameDisplay: null,

        /**
         * gets a user info widget instance
         * @returns {null}
         */
        getUserProfileDisplay: function(){
            if(!this.userProfileDisplay){

                this.userPictureDisplay = Ext.create('Ext.Label', {
                    encodeHtml: false
                });
                this.userNameDisplay = Ext.create('Ext.Label', {
                    encodeHtml: false
                });

                this.userProfileDisplay = Ext.create('Ext.Container',{
                    layout: {
                        type: 'vbox',
                        align: 'center'
                    },
                    items: [
                        this.userPictureDisplay,
                        this.userNameDisplay
                    ],
                    style: {
                        borderBottom: '1px solid gray'
                    }
                });

                //register nav route for the user profile view!
                this.fireGlobal('route::register', {route: this.getView().getUserProfileRoute() || 'unknown', type: 'nav'});
            }
            return this.userProfileDisplay;
        },


        /**
         * menu login btn instance
         */
        logInMenuBtn: null,

        /**
         * gets an instance of menu login btn
         * @returns {null}
         */
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


        /**
         * menu log off btn instance
         */
        logOffMenuBtn: null,

        /**
         * gets an instance of a menu log off btn
         * @returns {null}
         */
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

        /**
         * log off handler
         */
        onLogOffBtnTap: function(){
            this.hideNavMenu();
            this.callMeParent(arguments);
        },

        /**
         * log in handler
         */
        onLogInBtnTap: function(){
            this.hideNavMenu();
            //just let the global Auth controller know user wants to authenticate
            this.fireGlobal('auth::requestuserauth');
        },

        /**
         * updates user info
         */
        updateUserInfo: function(){

            if(this.userProfile){
                this.getLogInMenuBtn().hide();
                this.getLogOffMenuBtn().show();
                this.getUserProfileDisplay().show();

                //TODO - picture - mind this is not yet decided how it's gonna be stored
                if(this.userProfile.get('profilePicture')){
                    //FIXME - at this stage will not be there!
                    //TODO - make it a nice round image!!!!
                }
                else {
                    //no picture, just make it an faceless icon
                    this.userPictureDisplay.setHtml('<div style="padding-top:10px; height:45px;" class="' + mh.FontIconsDictionary.getIcon('mhNavMenuUserLarge3x') + '"></div>')
                }

                //user name
                this.userNameDisplay.setHtml('<strong>' + this.userProfile.get('username') + '</strong>');
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

            var viewTitle = this.getViewTitle(null, newView),
                iconCls = this.getViewIconCls(null, newView), //null, as no route rec here
                html = '';

            if(iconCls){
                html = '<span style="text-align: center; vertical-align: center; margin-right: 5px;" class="' + iconCls + '"></span>';
            }

            html += '<span style="text-align: center; vertical-align: center;">' + viewTitle + '</span>';

            this.lookupReference('activeViewTitle').setHtml(html);
        },

        /**
         * back btn tap handler
         */
        onBackBtnTap: function(){
            //simply go back
            Ext.History.back();
        }


    });
}());
