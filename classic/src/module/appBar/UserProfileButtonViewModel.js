
(function(){
    //Make sure strict mode is on
    'use strict';
    
    /**
     * Created by domin on 03.02.2017.
     */
    Ext.define('mh.module.appBar.UserProfileButtonViewModel', {
        extend: 'Ext.app.ViewModel',
        alias: 'viewmodel.mh-user-profile-button',

        requires: [
            'mh.module.appBar.UserProfileButtonLocalisation'
        ],

        mixins: [
            'mh.mixin.Localisation'
        ],

        stores: {
        },
    
        data: {
            userProfile: null
        },

        formulas: {
            profileName: {
                bind: {
                    bindTo: '{userProfile}',
                    deep: true
                },
                get: function(userProfile){
                    return userProfile ? userProfile.get('username') : this.getTranslation('anonymous', 'mh.module.appBar.UserProfileButtonLocalisation');
                }
            },
            menuUserIconCls: {
                bind: {
                    bindTo: '{userProfile}',
                    deep: true
                },
                get: function(userProfile){
                    return userProfile ? 'x-i54 i54-male-circle-1' : 'x-i54c i54c-anonymous-2';
                }
            },
            mainBtnIconCls: {
                bind: {
                    bindTo: '{userProfile}',
                    deep: true
                },
                get: function(userProfile){
                    return userProfile ? 'x-i54 i54-male-circle-1 i54-2x' : 'x-i54c i54c-anonymous-2 i54c-2x';
                }
            }
        }

    });
    
}());

    