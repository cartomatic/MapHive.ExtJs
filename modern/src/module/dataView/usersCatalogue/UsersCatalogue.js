(function(){
    //Make sure strict mode is on
    'use strict';
    
    Ext.define('mh.module.dataView.usersCatalogue.UsersCatalogue', {
        extend: 'mh.module.dataView.links.LinksPicker',
    
        xtype: 'mh-users-catalogue',

        requires: [
            'mh.module.dataView.usersCatalogue.UsersCatalogueController'
        ],

        controller: 'mh-users-catalogue',

        iconCls: 'x-li li-users'
    });
    
}());

    