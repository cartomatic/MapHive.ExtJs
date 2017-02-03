(function(){
    //Make sure strict mode is on
    'use strict';
    
    /**
     * Created by domin on 03.02.2017.
     */
    Ext.define('mh.module.appBar.UserProfileButtonController', {
        extend: 'Ext.app.ViewController',
        alias: 'controller.mh-user-profile-button',

    requires: [
        'mh.data.model.User',
        'mh.module.appBar.UserProfileButtonLocalisation'
    ],

    mixins: [
            'mh.mixin.Localisation',
            'mh.communication.MsgBus'
        ],

        /**
         * Called when the view is created
         */
        init: function() {
            this.injectLocalisationToViewModel();

            this.watchGlobal('auth::userauthenticated', this.onUserAuthenticated, this);

            //try to obtain user profile
            this.getUserProfile();
        },

        /**
         * authenticated user profile
         */
        userProfile: null,

        /**
         * user authenticated callback
         */
        onUserAuthenticated: function(){
            //obtain user info!
            this.userProfile = null;
            this.getUserProfile();
        },

        /**
         * initiates a procedure of obtaining user info
         */
        getUserProfile: function(){
            //disable the button?

            //set waiting icon...

            //wire up the auth::userprofileretrieved listener - whenever user profile becomes available it will be returned!
            var tunnel = this.getTunnelId();
            this.watchGlobal('auth::userprofileretrieved', this.onUserProfileRetrieved, this, {single: true, tunnel: tunnel});
            this.fireGlobal('auth::getuserprofile', null, {tunnel: tunnel});
        },


        /**
         * user profile retrieved callback
         * @param userProfile
         */
        onUserProfileRetrieved: function(userProfile){
            this.userProfile = userProfile;
            this.updateState();
        },

        /**
         * updates the state based on the current user - anonymous vs authenticated
         */
        updateState: function(){

            var btn = this.getView(),
                userInfo = this.findMenuItem('userInfo'),
                btnIcon = this.userProfile ? 'x-i54 i54-male-circle-1 i54-2x' : 'x-i54c i54c-anonymous-2 i54c-2x',
                userMenuIcon = this.userProfile ? 'x-i54 i54-male-circle-1' : 'x-i54c i54c-anonymous-2',
                //TODO - when user profile has user icon, or gravatar, try set it instead!
                userName = this.userProfile ?
                    this.userProfile.get('username') :
                    this.getTranslation('tooltipAnonymous');

            btn.setIconCls(btnIcon);

            userInfo.setIconCls(userMenuIcon);
            userInfo.setText(userName);
        },

        /**
         * btn click callback - customises the menu and shows it
         * @param btn
         */
        onUserProfileBtnClick: function(btn){
            this.customiseMenu();
            btn.showMenu();
        },

        /**
         * customises menu so it adjusts its state to match the current context
         */
        customiseMenu: function(){
            var authenticated = !!this.userProfile;

            //authenticated user
            this.findMenuItem('btnLogOff').setVisible(authenticated);

            //anonymous user
            this.findMenuItem('btnLogOn').setVisible(!authenticated);
        },

        /**
         * private
         */
        menuItemsCache: null,

        /**
         * finds a menu item by ref. used as a btn cannot lookup ref...
         * @param item
         */
        findMenuItem: function(itemRefName){
            this.menuItemsCache = this.menuItemsCache || {};

            if(this.menuItemsCache[itemRefName]){
                return this.menuItemsCache[itemRefName];
            }

            var items = this.getView().getMenu().items.items,
                i = 0, len = items.length, item;
            for(i; i < len; i++){
                if(items[i].reference === itemRefName){
                    item = items[i];
                    this.menuItemsCache[itemRefName] = item;
                    break;
                }
            }
            return item;
        },

        /**
         *
         * @param btn
         */
        onBtnLogOnClick: function(btn){
            //just let the global Auth controller know user wants to authenticate
            this.fireGlobal('auth::requestuserauth');
        }


        //logoff - prompt user if really so, and if an app does not require auth then do nothing,
        //otherwise let user know this app requires auth and user will be redirected to maphive home!

    });
    
}());
    