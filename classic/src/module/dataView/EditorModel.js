//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.module.dataView.EditorModel', {
        extend: 'Ext.app.ViewModel',
        alias: 'viewmodel.mh-editor',
    
        stores: {
        },
    
        data: {
            //need an empty placeholder, so when property is applied by a child, it does not end up in the root view model
            //https://www.sencha.com/forum/showthread.php?305387
            localization: null,

            /**
             * the record the form should bind to
             */
            rec: null
        }
    });

}());