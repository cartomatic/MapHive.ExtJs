
(function(){
    //Make sure strict mode is on
    'use strict';
    
    Ext.define('mh.module.dataView.usersCatalogue.UsersCatalogueModel', {
        extend: 'mh.module.dataView.users.DataViewModel',
        alias: 'viewmodel.mh-users-catalogue',
    
        stores: {
            gridstore:{
                model: 'mh.data.model.User',
                data: [],
                //Note: autoLoad, remoteSort, remoteFilter is automatically set to true in the dataview base and override whatever may be set here
                //initially sort users on accountClosed
                sorters: [
                    {
                        property: 'isAccountClosed', direction: 'ASC'
                    }
                ],
                filters: [
                    {
                        //ignore org users
                        property: 'isOrgUser',
                        operator: '==',
                        value: false,
                        exactMatch: true,
                        andJoin: false, //default, will use OR join
                        nestedFilters: [
                            //unless they are set to be visible in the users catalogue
                            {
                                property: 'isOrgUser',
                                operator: '==',
                                value: true,
                                andJoin: true,
                                nestedFilters: [
                                    {
                                        property: 'visibleInCatalogue',
                                        operator: '==',
                                        value: true
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        }
    });
    
}());

    