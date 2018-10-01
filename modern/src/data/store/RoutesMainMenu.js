//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.data.store.RoutesMainMenu', {
        extend: 'Ext.data.Store',

        requires: [
        ],

        mixins: [
            'mh.mixin.CallMeParent'
        ],

        model: 'mh.data.model.Route',

        storeId: 'routes-main-menu'
    });

}());