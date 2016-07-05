(function(){
    //Make sure strict mode is on
    'use strict';
    
    /**
     * Created by info_000 on 05-Jul-16.
     */
    Ext.define('mh.data.model.Translation', {
        extend: 'Ext.data.Model',
    
        fields: [
            { name: 'langCode', type: 'string', useNull: true },
            { name: 'translation', type: 'string', useNull: true }
        ]
    });
}());