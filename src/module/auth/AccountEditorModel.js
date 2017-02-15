
(function(){
    //Make sure strict mode is on
    'use strict';
    
    /**
     * Created by domin on 15.02.2017.
     */
    Ext.define('mh.module.auth.AccountEditorModel', {
        extend: 'Ext.app.ViewModel',
        alias: 'viewmodel.mh-auth-account-editor',
    
        stores: {
        },
    
        data: {
            rec: null
        },

        formulas: {
            profileGlyph: {
                bind: {
                    bindTo: '{rec}',
                    deep: true
                },
                get: function(userProfile){
                    //TODO - check gravatar and profile image too
                    return userProfile ? '\eeda@icon54com' : '\edd9@icon54com';
                }
            }
        }
    });
    
}());

    