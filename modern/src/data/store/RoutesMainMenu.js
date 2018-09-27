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

        constructor: function(){
            //register self with the store manager, so can grab the routes store in a generic way regardless the app
            Ext.StoreManager.add('routes-main-menu', this);
            this.callMeParent(arguments);
        }
    });

}());