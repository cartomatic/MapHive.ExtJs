(function(){
    //Make sure strict mode is on
    'use strict';

    var userCfg,
        currentOrg,

        staticInstance = null,

        getStaticInstance = function(){
            if(!staticInstance){
                staticInstance = Ext.create('mh.mixin.UserCfg');
            }
            return staticInstance;
        };

    /**
     * Utils for handling user related configurations; user related app configuration initially comes from the userconfig call, then it is dynamically updated against the current context
     * Created by domin on 02.02.2017.
     */
    Ext.define('mh.mixin.UserCfg', {


        requires: [
            'mh.communication.MsgBus'
        ],

        statics: {
            getUserOrgRole: function(){
                getStaticInstance().getUserOrgRole();
            }
        },

        /**
         * Gets details of a currently authenticated user
         * @returns {*|{}}
         */
        getCurrentUser: function(){
            return userCfg.user || {};
        },

        /**
         * Gets identifier of a currently authenticated user
         */
        getCurrentUserUuid: function(){
            return this.getCurrentUser().uuid;

            //TODO - perhaps should also observe auth evts as some apps that do not require auth may want to use this info too
        },

        /**
         * gets a user role within an organization
         * @param callback
         */
        getUserOrgRole: function(callback){
            //make sure user is authenticated and the org context is known
            if(!this.getCurrentUserUuid() || !currentOrg){
                return callback(null);
            }

            //looks like have all that is needed to get the data off the server
            this.doGet({

            })
        },

    }, function(){
        var msgBus = Ext.create('mh.communication.MsgBus');
        msgBus.watchGlobal('root::getuserconfigend', function(cfg){
            userCfg = cfg;
        });
        msgBus.watchGlobal('org::change', function(org){
            currentOrg = org;
        });
    });
    
}());