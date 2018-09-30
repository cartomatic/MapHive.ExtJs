//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.module.dataView.orgUsers.RecordViewModel', {
        extend: 'mh.module.dataView.RecordViewModel',
        alias: 'viewmodel.mh-org-users-record-view',



        formulas: {
            organizationRole:{
                bind: {
                    bindTo: '{record}',
                    deep: true
                },
                get: function(rec){
                    if(!rec){
                        return '';
                    }
                    return mh.data.dictionaries.OrganizationRoles.getRoleData(rec.get('organizationRole')).name;
                }
            }
        }
    });

}());