(function(){
    //Make sure strict mode is on
    'use strict';

    var userCfg;

    /**
     * Utils for handling user related configurations
     * Created by domin on 02.02.2017.
     */
    Ext.define('mh.mixin.UserCfg', {


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
        }

    }, function(){
        Ext.create('mh.communication.MsgBus').watchGlobal('root::getuserconfigend', function(cfg){
            userCfg = cfg;
        });
    });
    
}());