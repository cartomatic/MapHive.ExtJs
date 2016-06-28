//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';

            /**
     * Created by domin on 5/18/2016.
     */
    Ext.define('mh.module.data.EditorModel', {
        extend: 'Ext.app.ViewModel',
        alias: 'viewmodel.mh-editor',
    
        stores: {
        },
    
        data: {
            //need an empty placeholder, so when property is applied by a child, it does not end up in the root view model
            //https://www.sencha.com/forum/showthread.php?305387
            localisation: null,

            /**
             * the record the form should bind to
             */
            rec: null
        }
    });

}());