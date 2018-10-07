
(function(){
    //Make sure strict mode is on
    'use strict';
    
    /**
     * Created by domin on 02.03.2017.
     */
    Ext.define('mh.module.dataView.desktop.users.CatalogueUsersModel', {
        extend: 'mh.module.dataView.desktop.users.UsersModel',
        alias: 'viewmodel.mh-catalogueusers',
    
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

    