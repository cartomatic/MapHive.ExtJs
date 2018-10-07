(function(){
    //Make sure strict mode is on
    'use strict';
    
    Ext.define('mh.module.dataView.desktop.usersCatalogue.UsersCatalogue', {
        extend: 'mh.module.dataView.desktop.links.LinksPicker',
    
        xtype: 'mh-desktop-users-catalogue',

        requires: [
            'mh.module.dataView.desktop.usersCatalogue.UsersCatalogueController'
        ],

        controller: 'mh-desktop-users-catalogue',

        iconCls: 'x-li li-users'
    });
    
}());

    