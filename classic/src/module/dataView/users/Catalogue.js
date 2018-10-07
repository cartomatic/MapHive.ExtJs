(function(){
    //Make sure strict mode is on
    'use strict';
    
    /**
     * Created by domin on 28.02.2017.
     */
    Ext.define('mh.module.dataView.desktop.users.Catalogue', {
        extend: 'mh.module.dataView.desktop.linksPicker',
    
        xtype: 'mh-userscatalogue',

        requires: [
            'mh.module.dataView.desktop.users.CatalogueController'
        ],

        controller: 'mh-userscatalogue',

        iconCls: 'x-li li-users'
    });
    
}());

    