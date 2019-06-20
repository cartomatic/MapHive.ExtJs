//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function(){
    //Make sure strict mode is on
    'use strict';

    /**
     * User model
     */
    Ext.define('mh.data.model.Team', {
        extend: 'mh.data.model.Base',

        requires: [
            'mh.data.proxy.Rest',
            'mh.mixin.ApiMap'
        ],

        fields: [
            { name: 'name', type: 'string', useNull: true },
            { name: 'description', type: 'string' }
        ],
        //Note: no proxy URL as teams are org specific, so url is always adjusted as needed; this happens on a store lvl
        //proxy is needed though, so all the model ops use the Ajax utils and auth related headers!
        proxy: {
            type: 'mhrest',
            //this is at the Ext.define level so no access to instance based stuff. need to talk to a static method
            url: 'NO-URL'
        }
    });

}());