//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict'
    
    /**
     * Created by domin on 09.10.2018.
     */
    Ext.define('mh.module.dataView.phone.EditViewWizard', {
        extend: 'mh.module.dataView.phone.EditView',
        xtype: 'mh-mobile-edit-view-wizard',
        controller: 'mh-mobile-edit-view-wizard',

        viewModel: {
            type: 'mh-edit-view'
        },

        layout: {
            type: 'card',
            animation: 'fade'
        },

        items: [

        ],

        bbar: {
            xtype: 'toolbar',
            docked: 'bottom'
        }

    });
}());
