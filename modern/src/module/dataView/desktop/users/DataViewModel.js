//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.module.dataView.desktop.users.DataViewModel', {
        extend: 'mh.module.dataView.DataViewModel',
        alias: 'viewmodel.mh-desktop-users-data-view',

        stores: {
            gridstore: {
                model: 'mh.data.model.User'
            }
        }
    });

}());