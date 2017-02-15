
(function(){
    //Make sure strict mode is on
    'use strict';
    
    /**
     * Created by domin on 15.02.2017.
     */
    Ext.define('mh.module.appBar.OrgSwitcherButtonModel', {
        extend: 'Ext.app.ViewModel',
        alias: 'viewmodel.mh-org-switcher-button',
    
        stores: {
        },
    
        data: {
            currentOrg: null
        },

        formulas: {
            currentOrgName: {
                bind: {
                    bindTo: '{currentOrg}',
                    deep: true
                },
                get: function(currentOrg){
                    return currentOrg ? currentOrg.get('displayName') || currentOrg.get('slug') : '';
                }
            }
        }
    });
    
}());