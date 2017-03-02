(function(){
    //Make sure strict mode is on
    'use strict';
    
    /**
     * Created by domin on 28.02.2017.
     */
    Ext.define('mh.module.dataView.users.Catalogue', {
        extend: 'mh.module.dataView.LinksPicker',
    
        xtype: 'mh-userscatalogue',

        requires: [
            'mh.module.dataView.users.CatalogueController'
        ],

        controller: 'mh-userscatalogue',

        iconCls: 'x-li li-users'
    });
    
}());

    