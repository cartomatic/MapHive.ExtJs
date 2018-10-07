
(function(){
    //Make sure strict mode is on
    'use strict';
    
    Ext.define('mh.module.dataView.desktop.usersCatalogue.UsersCatalogueModel', {
        extend: 'mh.module.dataView.desktop.users.DataViewModel',
        alias: 'viewmodel.mh-desktop-users-catalogue',
    
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
                ]
            }
        }
    });
    
}());

    