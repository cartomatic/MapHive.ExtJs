//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.data.model.EmailTemplate', {
        extend: 'Ext.data.Model',

        requires: [
        ],

        fields: [
            {name: 'title', type: 'string'},
            {name: 'body', type: 'string'}
        ]
    });

}());