//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.data.model.EmailTemplateTranslation', {
        extend: 'Ext.data.Model',

        requires: [
        ],

        fields: [
            {name: 'langCode', type: 'string'},
            {name: 'title', type: 'string'},
            {name: 'body', type: 'string'}
        ]
    });

}());